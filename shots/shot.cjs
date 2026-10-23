const puppeteer = require("puppeteer");
const fs = require("fs"); fs.mkdirSync("out", { recursive: true });
const sites = [["prayasa", "https://prayasa.in"], ["feeo", "https://feeobeauty.com"]];
const clean = async (p) => {
  await p.keyboard.press("Escape").catch(() => {});
  await p.evaluate(() => {
    const sel = '[aria-label*="close" i],[class*="close" i],button[class*="dismiss" i],.klaviyo-close-form,[data-close]';
    document.querySelectorAll(sel).forEach(b => { const r = b.getBoundingClientRect(); if (r.width && r.width < 80 && r.height < 80) try { b.click(); } catch {} });
  });
  await new Promise(r => setTimeout(r, 800));
  await p.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el); if (cs.position !== "fixed" && cs.position !== "sticky") continue;
      const r = el.getBoundingClientRect(); const isHeader = r.top <= 5 && r.height < 200 && r.width > innerWidth * 0.9;
      if (isHeader) continue;
      if (r.width * r.height > 0.02 * innerWidth * innerHeight || /popup|modal|newsletter|cookie|overlay|drawer|chat|whatsapp|klaviyo|privy|wiz/i.test(el.className + el.id)) el.style.setProperty("display", "none", "important");
    }
    document.documentElement.style.overflow = "auto"; document.body.style.overflow = "auto";
    document.body.classList.remove("overflow-hidden");
  });
};
(async () => {
  const b = await puppeteer.launch({ args: ["--no-sandbox"] });
  for (const [n, u] of sites) for (const [w, h, tag, mobile] of [[1440, 660, "d", false], [390, 844, "m", true]]) {
    const p = await b.newPage();
    await p.setUserAgent(mobile ? "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36");
    await p.setViewport({ width: w, height: h, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
    try { await p.goto(u, { waitUntil: "networkidle2", timeout: 60000 }); } catch (e) { console.log(n, e.message); }
    await new Promise(r => setTimeout(r, 7000));
    await p.screenshot({ path: `out/${n}-${tag}-raw.png` });
    await clean(p); await new Promise(r => setTimeout(r, 1500)); await clean(p);
    await p.screenshot({ path: `out/${n}-${tag}.png` });
    if (!mobile) { await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 }); await p.screenshot({ path: `out/${n}-full.png`, fullPage: true }); }
    await p.close();
  }
  await b.close();
})();
