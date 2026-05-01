# 知識庫：pm_portfolio 前後端架構筆記

---

## 事件紀錄：為什麼 `/api/projects` 回傳的是原始碼而非資料？

**問題**：用 `npm run dev` 啟動，fetch `/api/projects` 拿到的是 `projects.js` 的 JavaScript 原始碼，而非 Notion 資料庫的內容。

**根本原因**：Vite dev server 把 `api/projects.js` 當成 ES module 直接提供給瀏覽器（這是 Vite 的正常行為），它不會「執行」這個檔案。必須改用 `vercel dev` 才能讓 `/api/*.js` 作為 serverless function 被執行。

**解法**：停掉 `npm run dev`，改執行 `vercel dev`。

---

## 1. 專案裡 Vite 與 Vercel 的角色

這個專案同時用了兩個工具，各自負責不同層：

```
Vite        → 負責「前端」：React app 的開發、打包、HMR（熱更新）
Vercel      → 負責「部署平台 + 後端執行環境」：hosting、CDN、serverless functions
```

### Vite 是什麼？

Vite 是前端的**構建工具與開發伺服器**，專門處理 React/Vue/Svelte 這類前端框架。

- `npm run dev` → 啟動 Vite dev server，只服務前端 React app
- `npm run build` → 把 React app 打包成靜態 HTML/CSS/JS
- **Vite 對 `api/` 資料夾一無所知**，不會執行裡面的 handler，只是把它當成一般 JS 模組

### Vercel 是什麼？

Vercel 是**部署平台**，同時也提供：

- 靜態資源 hosting（部署 Vite 打包出來的前端）
- **Serverless Functions 執行環境**（執行 `api/` 資料夾裡的 `.js` 檔案）
- CDN、自動 HTTPS、preview deployments

### 本機開發的關係

| 指令 | 啟動的東西 | `/api/projects` 的行為 |
|------|------------|------------------------|
| `npm run dev` | 只有 Vite（前端） | 回傳 `projects.js` 原始碼（錯誤） |
| `vercel dev` | Vite（前端）+ Vercel Functions（後端） | 執行 handler，回傳 Notion 資料 |

---

## 2. `vercel.json` 和 `vite.config.js` 通常拿來做什麼？

### `vite.config.js`：前端的設定檔

主要設定項目：

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],   // 啟用哪些外掛
  server: {
    port: 3000,                         // dev server port
    proxy: { ... }                      // 本機 API 代理（見第3點）
  },
  build: {
    outDir: 'dist',                     // 打包輸出目錄
    sourcemap: true                     // 是否產生 source map
  },
  resolve: {
    alias: { '@': '/src' }             // 路徑別名（如 @/components）
  }
})
```

**一句話**：vite.config.js 管的是「前端的開發體驗和打包行為」。

### `vercel.json`：部署平台的設定檔

主要設定項目：

```json
{
  "functions": {
    "api/*.js": {
      "memory": 128,        // function 可用記憶體（MB）
      "maxDuration": 10     // 最長執行時間（秒），免費版最多 10s
    }
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "s-maxage=60" }]
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

常見用途：
- 設定 serverless function 的記憶體與逾時時間
- 設定 SPA routing 的 rewrite（讓重新整理不會 404）
- 設定 HTTP headers（快取、安全性）
- 設定環境變數

**一句話**：vercel.json 管的是「這個專案在 Vercel 平台上怎麼部署和執行」。

---

## 3. Proxy 是什麼？

Proxy（代理）是讓本機 dev server 在收到特定路徑的請求時，**悄悄轉發到另一個位址**，讓前端程式碼不用知道實際的 URL 是什麼。

### 使用情境

**情境 A：打線上 API（最常見）**

假設你的 API 跑在 `https://api.myapp.com`，你不想在前端 hardcode 這個網址：

```js
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'https://api.myapp.com',
      changeOrigin: true  // 讓 request header 的 origin 改成 target 的網域
    }
  }
}
```

這樣前端只需要 `fetch('/api/projects')`，Vite 會幫你轉發到 `https://api.myapp.com/api/projects`。

**情境 B：打本機另一個 server**

假設你另外開了一個 Node.js/Express server 在 port 3001：

```js
server: {
  proxy: {
    '/api': 'http://localhost:3001'
  }
}
```

前端的 `fetch('/api/projects')` 會被轉到 `http://localhost:3001/api/projects`。

### Proxy 不等於「模擬」

- **Proxy**：真的轉發請求到目標伺服器，目標伺服器要真的存在且能回應
- **Mock**：攔截請求然後直接回傳假資料，目標伺服器可以不存在（用 MSW、json-server 等工具）

### 這個專案為什麼不需要 Proxy？

因為用了 `vercel dev`，它已經幫你在本機啟動了 serverless function 的執行環境，`/api/projects` 會直接被執行，不需要再設定 proxy 轉發。

---

## 4. 為什麼這個專案把 API 寫在 `api/` 資料夾而非獨立後端？

**是的，API 數量少是主要考量之一，但更完整的決策理由是：**

### 選擇 Vercel Serverless Functions 的理由

| 考量 | 說明 |
|------|------|
| **API 數量少** | 目前只有串接 Notion 一個資料來源，不需要完整的後端框架 |
| **無狀態操作** | 每次請求都只是「問 Notion → 整理資料 → 回傳」，沒有 session、無需持久連線 |
| **維運成本低** | 不需要自己管 server，Vercel 自動 scaling、自動重啟 |
| **部署一體化** | 前端 + API 在同一個 repo、同一次部署，preview URL 也包含 API |
| **冷啟動可接受** | Portfolio 不需要毫秒級反應，serverless 的冷啟動延遲（~200ms）可以接受 |

### 什麼情況應該改用獨立後端（如 Express、FastAPI）？

- API 超過 10+ 個，邏輯複雜
- 需要 WebSocket（即時通訊）
- 需要背景執行長時間任務（超過 10-60 秒）
- 有資料庫連線池需求（PostgreSQL 等）
- 需要共享狀態（如 in-memory cache）

**結論**：對 portfolio 這個規模，`api/` 資料夾 + Vercel 是最輕量、最適合的架構。

---

## 5. `vercel dev` 是什麼？Serverless Function 是什麼？

### Serverless Function 的概念

「Serverless」**不是說沒有 server**，而是說**你不需要管理 server**。

傳統部署方式：
```
你 → 租一台 VPS/EC2 → 裝 Node.js → 跑 Express → 24小時在線 → 自己管
```

Serverless 方式：
```
你 → 寫一個 function → 上傳給平台 → 有請求才執行 → 執行完就消滅
```

### Serverless Function 的運作方式

```
用戶請求 /api/projects
      ↓
Vercel 平台接收請求
      ↓
啟動一個臨時容器（冷啟動約 200ms）
      ↓
執行 api/projects.js 的 handler(req, res)
      ↓
handler 打 Notion API，拿到資料
      ↓
res.json({ projects }) 回傳給用戶
      ↓
容器銷毀（或暫時保留給下次請求）
```

### 關鍵特性

| 特性 | 說明 |
|------|------|
| **按需執行** | 沒有請求就不執行，不佔資源 |
| **無狀態** | 每次呼叫都是全新的環境，不能存變數在記憶體 |
| **自動 scaling** | 同時 1000 個請求就開 1000 個容器，自動處理 |
| **執行時間限制** | 免費版最長 10 秒，超時就強制結束 |
| **冷啟動** | 長時間沒被呼叫後，第一次請求會慢一點（需要重新建立容器） |

### `vercel dev` 是什麼？

`vercel dev` 是 Vercel 提供的**本機開發模擬器**，它在你的電腦上模擬 Vercel 平台的行為：

```
vercel dev 啟動後：
  ├── 前端：呼叫 Vite，啟動 React dev server（有 HMR）
  └── 後端：監聽 api/ 資料夾，收到請求就執行對應的 .js 檔案
```

等同於你電腦上跑了一個縮小版的 Vercel 平台，讓你在部署前就能確認整個系統運作正常。

### 本機指令對照

```bash
npm run dev      # 只啟動 Vite 前端，/api 不能用
vercel dev       # 同時啟動前端 + serverless functions，完整模擬部署環境
vercel           # 實際部署到 Vercel 雲端（production）
vercel --prod    # 部署到 production 環境
```

### 類似的 Serverless 平台

| 平台 | 說明 |
|------|------|
| Vercel Functions | 本專案使用，針對前端框架優化 |
| AWS Lambda | Amazon 的 serverless，功能最完整 |
| Cloudflare Workers | 速度最快，用 V8 isolate 取代容器 |
| Netlify Functions | 類似 Vercel，適合靜態網站 |
| Supabase Edge Functions | 資料庫旁邊的 serverless，延遲極低 |

---

*最後更新：2026-05-01*
