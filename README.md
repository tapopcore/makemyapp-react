# makemyapp.co

Vite + React 19 + Tailwind v4. Every route is prerendered to static HTML at build time, so Google, link previews and AI assistants see real content.

- `npm run dev` for local development
- `npm run build` builds the client, the SSR bundle, then `scripts/prerender.mjs` writes each page, `404.html`, `sitemap.xml`, `robots.txt` and `llms.txt` into `dist/`

## Editing content
Almost everything lives in `src/content.ts`: services and starting prices, portfolio, testimonials, team, FAQs and page titles. Add a portfolio screenshot as `public/img/work/<name>.webp` (1200px wide) plus `<name>-sm.webp` (640px) and reference it with `img: "<name>"`.

New pages need a route in `src/App.tsx` and an entry in `META` in `src/content.ts` (that adds them to the sitemap and prerender).
