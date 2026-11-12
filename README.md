# Pollock's

Storefront for Pollock's (Berea, East London): one site, two worlds —
**Photography & Framing** and **Copy Design & Print** — sharing one cart, one
quote engine and Rob Pollock's Gallery. Built from the design prototype.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build into dist/
```

Vite + React + TypeScript + React Router. It is a single-page app, so the host
must serve `index.html` for unknown paths (SPA fallback).

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/photography`, `/photography/portraits`, `/photography/framing` | Photography & Framing, session booking, framing request |
| `/shop`, `/shop/:slug` | Camera & Instax shop, product with stock status |
| `/print` | Copy Design & Print |
| `/gifts`, `/gifts/:slug` | Catalogue and configurator; add `?for=business` for the business view |
| `/account` | Business account (demo) |
| `/cart` | Cart and checkout, grouped by world |
| `/gallery`, `/gallery/:slug` | Rob Pollock's Gallery |
| `/quote`, `/about`, `/contact` | Quote flow, about, contact |

## Where things live

- `src/data.ts` — all content, prices, tiers and navigation.
- `src/photos/` — photo slots. Drop in an image named after a slot id to replace its placeholder (see the README there).
- `src/store.tsx` — cart (saved in `localStorage`), cart drawer and toasts.
- `src/styles.css` — design tokens (dark default, light via the footer toggle) and components.

## Not wired up yet

There is no backend. Booking, framing requests, quotes, "ask us", newsletter
and checkout show their confirmation screens but send and charge nothing;
references are generated in the browser. Calendar availability, stock levels,
the business account and the WhatsApp buttons are placeholder data. Connect
these before taking the site live.
