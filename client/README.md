# Client

Vite + React 19 SPA for The Brophet. Package manager: npm.

## Run

```
npm install
npm run dev
```

Serves the SPA on the Vite dev port. Requests to `/api/*` are proxied to a FastAPI server expected at `http://localhost:8000` (see `vite.config.ts`) — not yet scaffolded, so the health check on the placeholder home page will show "unreachable" until `/server` exists.

## Build

```
npm run build
```
