// Renders every route to static HTML so Google, social previews and AI crawlers see real content.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const server = await import(pathToFileURL(path.join(root, "dist-server/entry-server.js")).href);
const { render, META, ROUTES, SITE, SERVICE_PAGES, FAQS, TESTIMONIALS } = server;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// News snapshot for /news and the homepage strip. Vercel's build can reach the feeds;
// if it can't (or we're offline), pages still build and the browser loads news live.
const { getNews } = await import(pathToFileURL(path.join(root, "lib/news.mjs")).href);
let news = null;
if (process.env.NEWS_FIXTURE) news = JSON.parse(fs.readFileSync(process.env.NEWS_FIXTURE, "utf8"));
else try {
  news = await Promise.race([getNews({ timeoutMs: 6000 }), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 12000))]);
  if (!news.items.length) news = null;
} catch { news = null; }
console.log(news ? `  news snapshot: ${news.items.length} stories from ${news.sources.filter(s => s.ok).length} sources` : "  news snapshot: unavailable, will load live in the browser");
const NEWS_ROUTES = new Set(["/", "/news"]);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const today = new Date().toISOString().slice(0, 10);

const org = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#org`,
  name: "MakeMyApp",
  legalName: SITE.legal,
  url: SITE.url,
  logo: `${SITE.url}/apple-touch-icon.png`,
  image: `${SITE.url}/og.png`,
  description: META["/"].description,
  email: SITE.email,
  telephone: SITE.phone.replace(/\s/g, ""),
  priceRange: "₹999 to ₹99,999+",
  address: { "@type": "PostalAddress", streetAddress: "A-09, ITL Tower, 910-911, 9th Floor, Netaji Subhash Place", addressLocality: "Delhi", postalCode: "110034", addressRegion: "Delhi", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.6925, longitude: 77.1520 },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "17:00" }],
  areaServed: "IN",
  sameAs: [SITE.instagram, SITE.qviq],
  award: ["Tech Startup of the Year, Bharat Ke Maharathi Awards 2023", "Emerging Tech Startup of the Year, India Startup Summit 2023"],
  founder: [{ "@type": "Person", name: "Dhruv Gupta" }, { "@type": "Person", name: "Sayaji Shirke" }],
  review: TESTIMONIALS.map((t) => ({ "@type": "Review", author: { "@type": "Person", name: t.name }, reviewBody: t.quote, reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 } })),
};
const faq = (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

function head(route) {
  const m = META[route];
  const url = route === "/404" ? SITE.url : SITE.url + (route === "/" ? "/" : route);
  const ld = [];
  if (route === "/") ld.push(org, faq(FAQS));
  if (route === "/contact") ld.push(faq(FAQS));
  const sp = SERVICE_PAGES.find((p) => route === `/services/${p.slug}`);
  if (sp) {
    ld.push({ "@context": "https://schema.org", "@type": "Service", name: sp.title, description: sp.metaDescription, provider: { "@id": `${SITE.url}/#org`, "@type": "ProfessionalService", name: "MakeMyApp" }, areaServed: "IN", url },
      faq(sp.faqs),
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 2, name: sp.short, item: url }] });
  }
  return [
    route !== "/404" ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="MakeMyApp" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE.url}/og.png" />`,
    `<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...ld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
}

function page(route, renderUrl = route) {
  const m = META[route];
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(m.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(m.description)}" />`)
    .replace("<!--head-->", head(route))
    .replace("<!--app-->", render(renderUrl, NEWS_ROUTES.has(route) ? news : null) + (NEWS_ROUTES.has(route) && news ? `<script>window.__NEWS__=${JSON.stringify(news).replace(/</g, "\\u003c")}</script>` : ""));
}

for (const route of ROUTES) {
  if (route === "/404") continue;
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route));
  console.log("  prerendered", route);
}
fs.writeFileSync(path.join(dist, "404.html"), page("/404", "/this-page-does-not-exist"));
console.log("  prerendered 404.html");

// sitemap.xml
const urls = ROUTES.filter((r) => r !== "/404");
fs.writeFileSync(path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((r) => `  <url><loc>${SITE.url}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod><priority>${r === "/" ? "1.0" : r.startsWith("/services") || r === "/work" ? "0.8" : "0.5"}</priority></url>`).join("\n") +
  `\n</urlset>\n`);

// robots.txt
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

// llms.txt: a plain summary for AI assistants
const { SERVICES, ALL_WORK, inr } = server;
fs.writeFileSync(path.join(dist, "llms.txt"), [
  "# MakeMyApp",
  "",
  `> ${META["/"].description}`,
  "",
  `MakeMyApp is a full-stack digital agency based at Netaji Subhash Place, Delhi, India, run by ${SITE.legal}. Founders: Dhruv Gupta (CEO) and Sayaji Shirke (CTO). Awards: Tech Startup of the Year (Bharat Ke Maharathi Awards 2023), Emerging Tech Startup of the Year (India Startup Summit 2023).`,
  "",
  `Contact: ${SITE.email}, ${SITE.phone} (WhatsApp). Book a call: ${SITE.calendly}`,
  "",
  "## Services and starting prices (INR)",
  ...SERVICES.map((x) => `- ${x.name} (${x.pillar}): from ${inr(x.price)}${x.unit ? " " + x.unit : ""}${x.note ? " (" + x.note + ")" : ""}. ${x.blurb}`),
  "",
  "## Selected clients",
  ALL_WORK.filter((w) => w.type !== "Content").map((w) => w.name).join(", "),
  "",
  "## Pages",
  ...urls.map((r) => `- [${META[r].title}](${SITE.url}${r === "/" ? "/" : r}): ${META[r].description}`),
  "",
].join("\n"));

console.log(`  wrote sitemap.xml (${urls.length} urls), robots.txt, llms.txt`);
fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
