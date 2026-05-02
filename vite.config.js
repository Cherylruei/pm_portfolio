import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Intercept /index.html requests before vite:import-analysis (Vite 7 + vercel dev bug)
// vercel dev rewrites navigation routes to /index.html, but Vite 7's viteTransformMiddleware
// tries to parse it as a JS module instead of routing through the HTML pipeline.
function htmlFallbackPlugin() {
  return {
    name: 'html-fallback',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPath = req.url?.split('?')[0]
        if (urlPath !== '/index.html') return next()
        try {
          const rawHtml = readFileSync(resolve(server.config.root, 'index.html'), 'utf-8')
          const html = await server.transformIndexHtml(req.url, rawHtml)
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        } catch (e) {
          next(e)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [htmlFallbackPlugin(), react(), tailwindcss()],
})
