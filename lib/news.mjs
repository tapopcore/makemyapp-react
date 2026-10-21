// MakeMyApp AI Desk: pulls AI headlines from public RSS/Atom feeds.
// Shared by the Vercel function (api/news.js) and the build-time prerender.
// No dependencies. We keep only the headline, a short publisher-provided summary,
// the source and the link back to the original story.

export const FEEDS = [
  { id: "techcrunch", name: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { id: "verge", name: "The Verge", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" },
  { id: "venturebeat", name: "VentureBeat", url: "https://venturebeat.com/category/ai/feed/" },
  { id: "ainews", name: "AI News", url: "https://www.artificialintelligence-news.com/feed/" },
  { id: "mittr", name: "MIT Technology Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed" },
  { id: "ars", name: "Ars Technica", url: "https://arstechnica.com/ai/feed/" },
];

// Topic tags, matched against headline + summary + publisher categories.
export const TOPICS = [
  { id: "openai", label: "OpenAI", re: /\b(openai|chatgpt|gpt-?\d|sora|sam altman)\b/i },
  { id: "google", label: "Google", re: /\b(google|gemini|deepmind|alphabet)\b/i },
  { id: "anthropic", label: "Anthropic", re: /\b(anthropic|claude)\b/i },
  { id: "meta", label: "Meta", re: /\b(meta|llama|zuckerberg|instagram|whatsapp)\b/i },
  { id: "microsoft", label: "Microsoft", re: /\b(microsoft|copilot|azure)\b/i },
  { id: "apple", label: "Apple", re: /\b(apple|siri|iphone)\b/i },
  { id: "chips", label: "Chips", re: /\b(nvidia|gpu|gpus|chips?|semiconductor|tpu|amd)\b/i },
  { id: "funding", label: "Funding", re: /\b(raises?|raised|funding|valuation|worth \$|acquires?|acquisition|ipo|series [a-f])\b/i },
  { id: "policy", label: "Policy", re: /\b(regulat\w*|policy|bill|law|government|federal|senate|congress|ban|eu ai act|court|lawsuit)\b/i },
  { id: "india", label: "India", re: /\b(india|indian|bengaluru|bangalore|mumbai|delhi|hyderabad|rupee)\b/i },
];

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "-", ndash: "-", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };
export function decode(s = "") {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
}
const stripTags = (s = "") => s.replace(/<[^>]*>/g, " ");
const clean = (s = "") => decode(stripTags(decode(s))).replace(/[​-‍⁠﻿]/g, "").replace(/\s+/g, " ").trim();

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1] : "";
}
function attr(block, name, a) {
  const m = block.match(new RegExp(`<${name}\\b[^>]*\\b${a}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : "";
}

// Trim to a sentence or word boundary so excerpts stay short.
export function excerpt(text, max = 220) {
  let t = text.replace(/\s*\[(?:…|\.\.\.)\]\s*$/, "").replace(/\s*(?:The post .* appeared first on .*)$/i, "").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (stop > max * 0.55) return cut.slice(0, stop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–]$/, "") + "…";
}

export function parseFeed(xml, feed) {
  const items = [];
  const isAtom = /<feed[\s>]/i.test(xml.slice(0, 600));
  const blocks = xml.split(isAtom ? /<entry[\s>]/i : /<item[\s>]/i).slice(1);
  for (const raw of blocks) {
    const b = raw.split(isAtom ? /<\/entry>/i : /<\/item>/i)[0];
    const title = clean(tag(b, "title"));
    let link = isAtom ? (attr(b, 'link(?=[^>]*rel="alternate")', "href") || attr(b, "link", "href")) : clean(tag(b, "link"));
    if (!link) link = clean(tag(b, "guid"));
    const date = clean(tag(b, isAtom ? "published" : "pubDate")) || clean(tag(b, "updated")) || clean(tag(b, "dc:date"));
    const summary = clean(tag(b, isAtom ? "summary" : "description")) || clean(tag(b, "content"));
    const cats = isAtom
      ? [...b.matchAll(/<category\b[^>]*term="([^"]*)"/gi)].map(m => decode(m[1]))
      : [...b.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/gi)].map(m => clean(m[1]));
    const author = clean(tag(b, "dc:creator")) || clean(tag(tag(b, "author"), "name"));
    const t = Date.parse(date);
    if (!title || !/^https?:\/\//.test(link) || Number.isNaN(t)) continue;
    const hay = `${title} ${summary} ${cats.join(" ")}`;
    items.push({
      id: `${feed.id}:${link.replace(/^https?:\/\/(www\.)?/, "").slice(0, 120)}`,
      title,
      summary: excerpt(summary),
      link,
      source: feed.name,
      sourceId: feed.id,
      author: author || undefined,
      published: new Date(t).toISOString(),
      topics: TOPICS.filter(x => x.re.test(hay)).map(x => x.id),
    });
  }
  return items;
}

async function fetchText(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": "MakeMyApp-AI-Desk/1.0 (+https://makemyapp.co/news)", accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally { clearTimeout(timer); }
}

const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

export async function getNews({ timeoutMs = 8000, limit = 80, maxAgeDays = 10 } = {}) {
  const results = await Promise.allSettled(FEEDS.map(f => fetchText(f.url, timeoutMs).then(x => parseFeed(x, f))));
  const sources = FEEDS.map((f, i) => ({ id: f.id, name: f.name, ok: results[i].status === "fulfilled" && results[i].value.length > 0 }));
  const cutoff = Date.now() - maxAgeDays * 864e5;
  const seen = new Set();
  const items = results
    .flatMap(r => (r.status === "fulfilled" ? r.value : []))
    .filter(x => Date.parse(x.published) >= cutoff && Date.parse(x.published) <= Date.now() + 36e5)
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
    .filter(x => { const k = norm(x.title).slice(0, 70); if (seen.has(k) || seen.has(x.link)) return false; seen.add(k); seen.add(x.link); return true; })
    .slice(0, limit);
  return { updatedAt: new Date().toISOString(), sources, items };
}
