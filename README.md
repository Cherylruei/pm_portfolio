# Cheryl Li — PM Portfolio

> AI Product Manager portfolio site.  
> Live: https://pm-portfolio-gamma.vercel.app  
> Repo: https://github.com/Cherylruei/pm_portfolio

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4
- react-router-dom 7
- Vercel (hosting + serverless functions)
- Notion API (CMS for projects)

## Local Development

This project uses Vercel Serverless Functions under `/api`. Use `vercel dev` instead of `npm run dev` to run both the frontend and API together locally.

```bash
# Install Vercel CLI (once)
npm install -g vercel

# Link to Vercel project (once)
vercel link

# Set up environment variables
cp .env.example .env
# Fill in NOTION_API_KEY and NOTION_PROJECTS_DB_ID in .env

# Start local dev server (frontend + /api)
vercel dev
```

> **Note:** Without a valid `.env`, the app falls back to `src/data/projects.json` automatically.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NOTION_API_KEY` | Internal Integration Secret from notion.so/my-integrations |
| `NOTION_PROJECTS_DB_ID` | 32-character ID from your Notion database URL |

See `.env.example` for the format.

## Project Structure

```
pm_portfolio/
├── api/
│   └── projects.js        # GET /api/projects → Notion Projects DB
├── src/
│   ├── components/
│   │   ├── FlipCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProjectCard.jsx
│   ├── hooks/
│   │   └── useProjects.js  # Fetches /api/projects with JSON fallback
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── ProjectDetail.jsx
│   │   └── About.jsx
│   └── data/
│       └── projects.json   # Fallback data (used when API unavailable)
├── public/
│   └── cv.pdf
├── .env.example
└── vercel.json
```

## Build

```bash
npm run build
```
