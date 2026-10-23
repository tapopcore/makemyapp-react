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

const ORG_ID = `${SITE.url}/#org`;
const SITE_ID = `${SITE.url}/#website`;
const { SERVICES: ALL_SERVICES, TEAM, inr: fmt } = server;
const AREAS = ["Delhi", "New Delhi", "Gurugram", "Noida", "Faridabad", "Ghaziabad", "India"].map((n) => n === "India" ? { "@type": "Country", name: n } : { "@type": "City", name: n });
const offer = (s) => ({ "@type": "Offer", name: s.name, price: s.price, priceCurrency: "INR",
  priceSpecification: { "@type": "PriceSpecification", minPrice: s.price, priceCurrency: "INR", ...(s.unit === "per month" ? { unitText: "MONTH" } : {}) },
  itemOffered: { "@type": "Service", name: s.name, description: s.blurb } });

const org = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "MakeMyApp",
  alternateName: ["Make My App", "makemyapp.co"],
  legalName: SITE.legal,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png`, width: 512, height: 512 },
  image: `${SITE.url}/og.png`,
  description: META["/"].description,
  slogan: "Build it. Brand it. Grow it.",
  email: SITE.email,
  telephone: SITE.phone.replace(/\s/g, ""),
  priceRange: "₹999 to ₹1,49,999+",
  currenciesAccepted: "INR",
  address: { "@type": "PostalAddress", streetAddress: "A-09, ITL Tower, 910-911, 9th Floor, Netaji Subhash Place, Pitampura", addressLocality: "New Delhi", postalCode: "110034", addressRegion: "Delhi", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.6925, longitude: 77.1520 },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`,
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "17:00" }],
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: SITE.phone.replace(/\s/g, ""), email: SITE.email, areaServed: "IN", availableLanguage: ["English", "Hindi"] }],
  areaServed: AREAS,
  knowsAbout: ["Website development", "Web design", "Shopify development", "Ecommerce website development", "Mobile app development", "Android app development", "iOS app development", "UI/UX design", "Branding", "Logo design", "Packaging design", "Performance marketing", "Meta ads", "AI agents", "WhatsApp automation", "Email automation"],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "MakeMyApp services and starting prices", itemListElement: ALL_SERVICES.map(offer) },
  sameAs: [SITE.instagram, SITE.qviq],
  award: ["Tech Startup of the Year, Bharat Ke Maharathi Awards 2023", "Emerging Tech Startup of the Year, India Startup Summit 2023"],
  foundingLocation: { "@type": "Place", name: "Delhi, India" },
  founder: TEAM.slice(0, 2).map((t) => ({ "@type": "Person", name: t.name, jobTitle: t.role, sameAs: Object.values(t.links) })),
};
const website = { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_ID, url: SITE.url, name: "MakeMyApp", inLanguage: "en-IN", publisher: { "@id": ORG_ID } };
const faq = (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
const crumbs = (list) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["Home", "/"], ...list].map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE.url + p })) });
const webpage = (type, route, m) => ({ "@context": "https://schema.org", "@type": type, "@id": `${SITE.url}${route}#webpage`, url: SITE.url + route, name: m.title, description: m.description, inLanguage: "en-IN", isPartOf: { "@id": SITE_ID }, about: { "@id": ORG_ID }, dateModified: today });
const CRUMB = { "/services": "Services", "/work": "Work", "/about": "About", "/contact": "Contact", "/news": "AI News", "/privacy-policy": "Privacy policy" };

function head(route) {
  const m = META[route];
  const url = route === "/404" ? SITE.url : SITE.url + (route === "/" ? "/" : route);
  const ld = [];
  if (route === "/") ld.push(org, website, webpage("WebPage", "/", m), faq(FAQS));
  if (CRUMB[route]) ld.push(crumbs([[CRUMB[route], route]]));
  if (route === "/about") ld.push(webpage("AboutPage", route, m), ...TEAM.map((t) => ({ "@context": "https://schema.org", "@type": "Person", name: t.name, jobTitle: t.role, worksFor: { "@id": ORG_ID }, image: `${SITE.url}/img/team/${t.img}.webp`, sameAs: Object.values(t.links) })));
  if (route === "/contact") ld.push(webpage("ContactPage", route, m), faq(FAQS));
  if (route === "/services") ld.push(webpage("CollectionPage", route, m), { "@context": "https://schema.org", "@type": "ItemList", name: "MakeMyApp services", itemListElement: SERVICE_PAGES.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${SITE.url}/services/${p.slug}` })) });
  if (route === "/work") ld.push(webpage("CollectionPage", route, m));
  const sp = SERVICE_PAGES.find((p) => route === `/services/${p.slug}`);
  if (sp) {
    const priced = ALL_SERVICES.filter((s) => s.slug === sp.slug);
    ld.push({ "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: sp.title, serviceType: sp.keyword.replace(/ (company|agency) in .*$/i, ""), description: sp.answer, url,
      provider: { "@id": ORG_ID }, areaServed: AREAS, audience: { "@type": "BusinessAudience", name: "Businesses and brands in India" },
      offers: { "@type": "Offer", url, priceCurrency: "INR", price: sp.minPrice, priceSpecification: { "@type": "PriceSpecification", minPrice: sp.minPrice, priceCurrency: "INR" }, availability: "https://schema.org/InStock", seller: { "@id": ORG_ID } },
      ...(priced.length ? { hasOfferCatalog: { "@type": "OfferCatalog", name: `${sp.short} packages`, itemListElement: priced.map(offer) } } : {}) },
      faq(sp.faqs),
      crumbs([["Services", "/services"], [sp.short, `/services/${sp.slug}`]]));
  }
  return [
    route !== "/404" ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    route !== "/404" ? `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />` : "",
    `<link rel="alternate" hreflang="en-IN" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="MakeMyApp" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE.url}/og.png" />`,
    `<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="MakeMyApp, full-stack agency in Delhi" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${SITE.url}/og.png" />`,
    ...ld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ].filter(Boolean).join("\n    ");
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
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"];
fs.writeFileSync(path.join(dist, "robots.txt"), [
  "# Search engines and AI assistants are welcome to read and cite this site.",
  "User-agent: *", "Allow: /", "",
  ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
  `Sitemap: ${SITE.url}/sitemap.xml`, "",
].join("\n"));

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
  "## Service pages",
  ...SERVICE_PAGES.map((p) => `### ${p.title}\n${SITE.url}/services/${p.slug}\n${p.answer}\n` + p.faqs.map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n")),
  "",
  "## Common questions",
  ...FAQS.map((f) => `- Q: ${f.q}\n  A: ${f.a}`),
  "",
  `## Areas served\nDelhi, New Delhi, Gurugram, Noida, Faridabad, Ghaziabad and clients across India and abroad. Office: ${SITE.address}. Hours: ${SITE.hours}.`,
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
