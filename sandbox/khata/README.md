# Khata — Prototype UI (mock data only)

Ledger / accounting app prototype. React + Vite + Tailwind, no backend,
all data hardcoded in `src/mockData.js`. Built from `PROTOTYPE_PRD_khata.md`.

## Run locally
```bash
npm install
npm run dev
```
Open the printed localhost URL (default http://localhost:5173).
For mobile testing, use Chrome DevTools → iPhone 14 Pro viewport (393×852).

## What's built
- Bottom nav (Home / Txns / Parties / More) + floating "+" quick-add sheet
- Home dashboard: gradient balance card, quick actions, projects strip, recent txns
- All Transactions: filter chips + grouped-by-date list, expand-in-place detail
- Parties list + Party detail (filtered history, mark-settled toast)
- More: wallet grid + quick links (placeholder toasts)
- Projects list + project cards with profit calc

## What's NOT built (per PRD §7)
No Supabase, no auth, no persistence (state resets on refresh), no receipt
upload, no export, no shop/reports screens.

## Deploying to GitHub Pages subpath (optional)
To serve the built site at `/portfolio-test/sandbox/khata/`, set `base` in
`vite.config.js` to `"/portfolio-test/sandbox/khata/"`, run `npm run build`,
and push the `dist/` contents to that path in the repo.
