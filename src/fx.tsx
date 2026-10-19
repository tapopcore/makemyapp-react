import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Interactive tile grid: faint rounded tiles that light up around the */
/* cursor and twinkle on their own. Canvas, paused when off screen.    */
/* ------------------------------------------------------------------ */
export function TileGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLORS = ["93,0,255", "255,107,0"];
    let W = 0, H = 0, dpr = 1, size = 64, gap = 10, cols = 0, rows = 0, ox = 0, oy = 0;
    let raf = 0, visible = true, last = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    type Spark = { i: number; j: number; t0: number; dur: number; c: string };
    let sparks: Spark[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = W < 640 ? 46 : 64; gap = W < 640 ? 8 : 10;
      const step = size + gap;
      cols = Math.ceil(W / step) + 1; rows = Math.ceil(H / step) + 1;
      ox = (W - cols * step) / 2; oy = -step * 0.35;
      if (reduce) draw(0);
    };

    const rr = (x: number, y: number, s: number, r: number) => {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + s, y, x + s, y + s, r); ctx.arcTo(x + s, y + s, x, y + s, r);
      ctx.arcTo(x, y + s, x, y, r); ctx.arcTo(x, y, x + s, y, r); ctx.closePath();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      mouse.x += (mouse.tx - mouse.x) * 0.18; mouse.y += (mouse.ty - mouse.y) * 0.18;
      const step = size + gap, rad = size * 0.22, reach = W < 640 ? 150 : 230;
      // spawn twinkles
      if (!reduce && t - last > (W < 640 ? 260 : 340)) {
        last = t;
        sparks.push({ i: Math.floor(Math.random() * cols), j: Math.floor(Math.random() * rows), t0: t, dur: 2200 + Math.random() * 1800, c: COLORS[Math.random() < 0.62 ? 0 : 1] });
      }
      sparks = sparks.filter(s => t - s.t0 < s.dur);
      const active = new Map<string, Spark>(); for (const s of sparks) active.set(`${s.i},${s.j}`, s);

      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const x = ox + i * step, y = oy + j * step, cx = x + size / 2, cy = y + size / 2;
        const d = Math.hypot(cx - mouse.x, cy - mouse.y), near = Math.max(0, 1 - d / reach);
        rr(x + 0.5, y + 0.5, size, rad);
        const sp = active.get(`${i},${j}`);
        if (sp) {
          const p = (t - sp.t0) / sp.dur, a = Math.sin(p * Math.PI);
          ctx.fillStyle = `rgba(${sp.c},${0.16 * a})`; ctx.fill();
          ctx.strokeStyle = `rgba(${sp.c},${0.55 * a + 0.08})`; ctx.lineWidth = 1; ctx.stroke();
        } else if (near > 0) {
          ctx.fillStyle = `rgba(93,0,255,${0.09 * near * near})`; ctx.fill();
          ctx.strokeStyle = `rgba(93,0,255,${0.08 + 0.5 * near * near})`; ctx.lineWidth = 1; ctx.stroke();
        } else {
          ctx.strokeStyle = "rgba(18,18,18,0.075)"; ctx.lineWidth = 1; ctx.stroke();
        }
      }
    };

    const loop = (t: number) => { if (visible) draw(t); raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent)] ${className}`} />;
}

/* ------------------------------------------------------------------ */
/* Typewriter: types, holds, deletes, next. First phrase is in the SSR */
/* HTML so crawlers and no-JS visitors still read a full sentence.     */
/* ------------------------------------------------------------------ */
export function Typewriter({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [mode, setMode] = useState<"hold" | "del" | "type">("hold");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: number;
    if (mode === "hold") t = window.setTimeout(() => setMode("del"), 1900);
    else if (mode === "del") {
      if (text.length === 0) { setI(n => (n + 1) % phrases.length); setMode("type"); }
      else t = window.setTimeout(() => setText(s => s.slice(0, -1)), 28);
    } else {
      const target = phrases[i];
      if (text === target) setMode("hold");
      else t = window.setTimeout(() => setText(target.slice(0, text.length + 1)), 55 + Math.random() * 45);
    }
    return () => clearTimeout(t);
  }, [mode, text, i, phrases]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-0.5 inline-block w-[3px] translate-y-[3px] self-stretch bg-blaze align-baseline [animation:blink_1s_steps(1)_infinite]" style={{ height: "0.95em" }} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero badge                                                          */
/* ------------------------------------------------------------------ */
export function HeroBadge() {
  return (
    <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-ink bg-white/80 p-1 pr-4 shadow-[3px_3px_0_0_var(--color-ink)] backdrop-blur">
      <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-paper">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-[#25D366]" />
        </span>
        Booking new projects
      </span>
      <span className="truncate pl-2 text-[13px] font-medium text-ink-2">
        <span className="text-blaze">★</span> Award-winning<span className="hidden sm:inline"> studio, Delhi</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brand marquee: one calm row, edge fade, pauses on hover             */
/* ------------------------------------------------------------------ */
export function BrandMarquee({ names }: { names: string[] }) {
  const list = [...names, ...names];
  return (
    <section aria-label="Brands we've worked with" className="relative overflow-hidden border-y border-ink bg-ink text-paper">
      <p className="sr-only">Brands we've worked with include {names.join(", ")}.</p>
      <div className="wrap flex flex-col gap-4 py-8 lg:flex-row lg:items-center lg:gap-10">
        <div className="shrink-0 lg:w-[200px]">
          <p className="label text-paper/50">Trusted by</p>
          <p className="display mt-1 text-[28px] leading-[1.05] text-paper">brands that <span className="text-blaze">sell</span>.</p>
        </div>
        <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-hidden>
          <ul className="flex w-max animate-[marquee_70s_linear_infinite] items-center group-hover:[animation-play-state:paused]">
            {list.map((n, i) => (
              <li key={i} className="flex items-center whitespace-nowrap">
                <span className="px-7 text-[22px] font-semibold tracking-[-0.01em] text-paper/80 transition-colors hover:text-paper sm:text-[26px]" style={{ fontFamily: "var(--font-display)" }}>{n}</span>
                <span className="text-[13px] text-blaze/80">✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
