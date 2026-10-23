import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "react-router-dom";

export interface Brand {
  slug: string;
  name: string;
  sector?: string;
  bg: string;      // tile colour, taken from the brand itself
  ink: string;     // accent from the brand
  swatches: string[];
  span?: string;   // grid placement
  fit?: string;    // box the logo sits in
}

export const BRANDS: Brand[] = [
  { slug: "divya-bajaj", name: "Divya Bajaj", sector: "Astro-numerologist", bg: "#f4ede0", ink: "#a8843a", swatches: ["#c9a24a", "#2b2b28", "#f4ede0"],
    span: "col-span-2 row-span-2", fit: "inset-x-[16%] top-[12%] bottom-[16%]" },
  { slug: "aatmik", name: "Aatmik", bg: "#de8b3f", ink: "#fff3e6", swatches: ["#de8b3f", "#ffffff"], span: "col-span-2", fit: "inset-x-[20%] top-[27%] bottom-[31%]" },
  { slug: "heer-colors", name: "Heer Colors", bg: "#5c0000", ink: "#f2c9c9", swatches: ["#5c0000", "#ffffff"] },
  { slug: "nail-lobby", name: "The Nail Lobby", sector: "Nail salon", bg: "#120d07", ink: "#e0a526", swatches: ["#e0a526", "#f3cf6b", "#120d07"] },
  { slug: "rk-bhalla", name: "RK Bhalla & Co.", sector: "Chartered accountants", bg: "#e6eef4", ink: "#0b5e8a", swatches: ["#0b5e8a", "#ffffff"],
    span: "col-span-2", fit: "inset-x-[18%] top-[17%] bottom-[24%]" },
  { slug: "e-studio", name: "Elite Studio", bg: "#151515", ink: "#f7941d", swatches: ["#f7941d", "#ffffff", "#151515"] },
  { slug: "geeta-saar", name: "Geeta Saar", sector: "Mood cards", bg: "#fbf3e2", ink: "#0a7a6c", swatches: ["#0a7a6c", "#f2b100", "#fbf3e2"] },
  { slug: "bezza", name: "Bezza Beauty", sector: "Beauty", bg: "#ede2d9", ink: "#6b5a4d", swatches: ["#111111", "#ede2d9"] },
  { slug: "hidden-home", name: "The Hidden Home", sector: "Property", bg: "#edf3fa", ink: "#4a90d9", swatches: ["#0b1f4b", "#4a90d9", "#edf3fa"] },
  { slug: "nothing-before-nails", name: "Nothing Before Nails", sector: "Nail studio", bg: "#faf5ec", ink: "#d19a4a", swatches: ["#033356", "#d19a4a", "#faf5ec"],
    span: "col-span-2 row-span-2", fit: "inset-x-[22%] top-[11%] bottom-[16%]" },
  { slug: "ghar-badlo", name: "Ghar Badlo", bg: "#eef8fd", ink: "#2ea3d5", swatches: ["#2ea3d5", "#ffffff"] },
  { slug: "stories", name: "Stories by Kunal Sahni", bg: "#ffffff", ink: "#8a8a8a", swatches: ["#111111", "#ffffff"], fit: "inset-x-[12%] top-[28%] bottom-[32%]" },
];

/* One tile: its own brand colour, a light that follows the cursor, a slight 3D tilt,
   and a label with the palette that slides in. On touch screens the label shows
   while the tile sits in the middle of the screen. */
function Tile({ b, i, shown, plain }: { b: Brand; i: number; shown: boolean; plain?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "-35% 0px -35% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
  };
  const leave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave}
      className={`brand-tile group relative ${plain ? "" : b.span ?? ""} ${shown ? "is-in" : ""} ${active ? "is-active" : ""}`}
      style={{ "--bg": b.bg, "--d": `${(i % 6) * 70 + Math.floor(i / 6) * 120}ms` } as CSSProperties}>
      <div className="brand-face absolute inset-0 grid place-items-center overflow-hidden rounded-[22px]" style={{ background: b.bg }}>
        <div className={`absolute ${b.fit ?? "inset-x-[16%] top-[17%] bottom-[23%]"}`}>
          <img src={`/img/brands/${b.slug}.webp`} alt={`${b.name} logo`} loading="lazy" decoding="async"
            className="brand-logo size-full object-contain" />
        </div>
        <span aria-hidden className="brand-light pointer-events-none absolute inset-0" />
        <div className="brand-tag absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 rounded-full bg-ink/85 py-1.5 pl-3.5 pr-2 text-paper backdrop-blur-md sm:inset-x-3 sm:bottom-3">
          <p className="min-w-0 truncate text-[12px] font-semibold sm:text-[13px]">
            {b.name}{b.sector && <span className="font-normal text-paper/60"> · {b.sector}</span>}
          </p>
          <span className="flex shrink-0 -space-x-1">
            {b.swatches.map(c => <i key={c} className="brand-dot block size-3.5 rounded-full border border-paper/40 sm:size-4" style={{ background: c }} />)}
          </span>
        </div>
      </div>
    </div>
  );
}

const SNIPPET = ["divya-bajaj", "nail-lobby", "heer-colors", "geeta-saar", "nothing-before-nails", "e-studio", "bezza", "hidden-home"];

function useShown() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, shown] as const;
}

/* Compact version for the home page and the work page: a single even row of logos. */
export function BrandSnippet({ title = "Brands we've built identities for", className = "" }: { title?: string; className?: string }) {
  const [ref, shown] = useShown();
  const list = SNIPPET.map(s => BRANDS.find(b => b.slug === s)!);
  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-mute">Branding</p>
          <h3 className="display mt-3 text-[clamp(30px,3.6vw,48px)] tracking-[-0.03em]">{title}</h3>
        </div>
        <Link to="/services/branding" className="btn-line !py-3 text-sm">See all branding work <ArrowSmall /></Link>
      </div>
      <div ref={ref} className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-2.5 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-3">
        {list.map((b, i) => <Tile key={b.slug} b={b} i={i} shown={shown} plain />)}
      </div>
    </div>
  );
}

export function BrandWall({ cta = "quote" }: { cta?: "quote" | "service" }) {
  const [ref, shown] = useShown();

  return (
    <section className="sec-band bg-ink text-paper">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-blaze">Identity work</p>
            <h2 className="display mt-4 text-[clamp(44px,6.4vw,96px)]">Logos we've<br />brought to life.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[17px] leading-relaxed text-paper/70">
              From a chartered accountant to a nail studio to a Melbourne property brand. Each one starts with how the business talks, then the mark, the colours and the type follow.
            </p>
            <p className="label mt-4 text-paper/40"><span className="hidden [@media(hover:hover)]:inline">Hover</span><span className="[@media(hover:hover)]:hidden">Scroll</span> a logo to see its palette</p>
          </div>
        </div>

        <div ref={ref} className="mt-12 grid grid-flow-dense auto-rows-[170px] grid-cols-2 gap-2.5 sm:auto-rows-[200px] sm:gap-3 lg:auto-rows-[230px] lg:grid-cols-4">
          {BRANDS.map((b, i) => <Tile key={b.slug} b={b} i={i} shown={shown} />)}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-8">
          <p className="max-w-xl text-[17px] leading-relaxed text-paper/70">A few of the identities we can show. Many more sit under NDA.</p>
          {cta === "service"
            ? <Link to="/services/branding" className="btn-blaze">See branding packages <ArrowSmall /></Link>
            : <Link to="/contact" className="btn-blaze">Start your identity <ArrowSmall /></Link>}
        </div>
      </div>
    </section>
  );
}

const ArrowSmall = () => <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
