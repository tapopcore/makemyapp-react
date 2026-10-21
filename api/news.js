// GET /api/news  ->  latest AI headlines for the MakeMyApp AI Desk.
// Cached at Vercel's edge for 30 minutes, served stale for up to a day while it refreshes.
import { getNews } from "../lib/news.mjs";

export default async function handler(req, res) {
  try {
    const data = await getNews({ timeoutMs: 7000 });
    if (!data.items.length) throw new Error("no items");
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify(data));
  } catch (e) {
    res.setHeader("Cache-Control", "public, s-maxage=60");
    res.status(502).json({ error: "Could not load news right now", detail: String(e && e.message || e) });
  }
}
