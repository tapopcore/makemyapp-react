import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE, wa } from "./content";
import { fetchLive, type NewsItem } from "./news";
import { ArrowUR, track } from "./ui";

/* ------------------------------------------------------------------ */
/* Slide-in nudges (toasts). Small cards that slide in bottom-right    */
/* (desktop) or bottom (phones), stay a few seconds, then slide out.    */
/*                                                                     */
/* Rules:                                                              */
/*  - first one within 3s of landing, then back to back on a loop      */
/*  - closing one stops them for the visit                             */
/*  - pause on hover/touch; never while someone is typing in a form    */
/*  - not shown on Contact or Privacy; respects reduced motion         */
/* ------------------------------------------------------------------ */

type Nudge = {
  id: string;
  kicker: string;
  title: string;
  body?: string;
  cta: string;
  to?: string;       // internal link
  href?: string;     // external link
  tone: "news" | "call" | "proof" | "award" | "ai";
};

const FIRST_DELAY = 2500;   // first one within 3s of landing
const SHOW_FOR = 6000;      // each stays 6s
const GAP = 600;            // next one follows right after
const HIDDEN_ON = ["/contact", "/privacy-policy"];

const KEY_DISMISSED = "mma_nudges_off";
const ss = {
  get(k: string) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } },
};

// Short excerpts taken word for word from real client testimonials.
const PROOF: Nudge[] = [
  { id: "proof-dma", tone: "proof", kicker: "Dikshant Malhotra, DMA", title: "“They kept things simple, delivered on time, and made sure everything worked flawlessly.”", cta: "See our work", to: "/work" },
  { id: "proof-wedhaven", tone: "proof", kicker: "Rishika Agarwal, Wedhaven", title: "“They cared about the little details that matter to our users.”", cta: "See our work", to: "/work" },
  { id: "proof-deciwood", tone: "proof", kicker: "Ananya Meena, Deciwood", title: "“We wanted a website that felt as unique as our brand, and MakeMyApp absolutely nailed it.”", cta: "See our work", to: "/work" },
];
const AWARD: Nudge = { id: "award", tone: "award", kicker: "Award-winning studio", title: "Tech Startup of the Year 2023", body: "Bharat Ke Maharathi Awards. 300+ projects delivered since.", cta: "Meet the team", to: "/about" };
const AI: Nudge = { id: "ai", tone: "ai", kicker: "AI for your business", title: "Let AI answer your customers 24x7.", body: "AI agents and WhatsApp automation, set up for you.", cta: "See how", to: "/services/ai-automation" };

function newsNudge(n: NewsItem): Nudge {
  return { id: `news-${n.id}`, tone: "news", kicker: `New on the AI Desk · ${n.source}`, title: n.title, cta: "Read more AI news", to: "/news" };
}

function queueFor(path: string, news: NewsItem | null): Nudge[] {
  const proof = PROOF[Math.floor(Math.random() * PROOF.length)];
  // the floating button already carries the free call, so toasts carry everything else
  const n = news ? [newsNudge(news)] : [];
  if (path.startsWith("/news")) return [AI, proof, AWARD];
  if (path.startsWith("/services")) return [proof, ...n, AI, AWARD];
  if (path.startsWith("/work")) return [...n, AWARD, proof, AI];
  return [...n, proof, AI, AWARD];
}

/* ---------- never cover the page's own buttons ---------- */
const PAGE_BUTTONS = "main .btn-ink, main .btn-line, main .btn-blaze, main .btn-paper, main form button, main input, main textarea, main select";
function coversButtons(box: { left: number; right: number; top: number; bottom: number }) {
  const pad = 10;
  return [...document.querySelectorAll<HTMLElement>(PAGE_BUTTONS)].some(el => {
    if (el.closest("[data-floating]")) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.bottom > box.top - pad && r.top < box.bottom + pad && r.right > box.left - pad && r.left < box.right + pad;
  });
}
function useCovering(ref: RefObject<HTMLElement | null>, active: boolean) {
  const [covering, setCovering] = useState(false);
  useEffect(() => {
    if (!active) return;
    let last = 0, pending = 0, hits = 0;
    // hide only after two checks in a row agree (no flicker); come back straight away
    const check = () => { last = Date.now(); pending = 0; const el = ref.current; if (!el) return;
      if (coversButtons(el.getBoundingClientRect())) { hits++; if (hits >= 2) setCovering(true); else pending = window.setTimeout(check, 140); }
      else { hits = 0; setCovering(false); } };
    const on = () => { if (Date.now() - last > 120) check(); else if (!pending) pending = window.setTimeout(check, 130); };
    check();
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    const t = window.setInterval(check, 700);
    return () => { clearTimeout(pending); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); clearInterval(t); };
  }, [ref, active]);
  return covering;
}

/* ---------- visuals ---------- */
const TONE: Record<Nudge["tone"], { tile: string; bar: string; icon: ReactNode }> = {
  news: { tile: "bg-ink text-paper", bar: "bg-blaze", icon: <path d="M4 5h12v14H6a2 2 0 0 1-2-2V5Zm12 4h4v8a2 2 0 0 1-2 2M8 9h4M8 13h4" /> },
  call: { tile: "bg-[#25D366] text-ink", bar: "bg-[#25D366]", icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /> },
  proof: { tile: "bg-violet text-paper", bar: "bg-violet", icon: <path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6" /> },
  award: { tile: "bg-blaze text-ink", bar: "bg-blaze", icon: <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3Z" /> },
  ai: { tile: "bg-lilac text-violet", bar: "bg-violet", icon: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" /> },
};

function Card({ n, paused, onClose, onAction }: { n: Nudge; paused: boolean; onClose: () => void; onAction: () => void }) {
  const t = TONE[n.tone];
  const inner = (
    <>
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl border border-ink ${t.tile}`} aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="size-5">{t.icon}</svg>
      </span>
      <span className="min-w-0 flex-1 pr-6">
        <span className="label block truncate text-mute">{n.kicker}</span>
        <span className={`mt-1 text-[15px] font-semibold leading-snug text-ink ${n.tone === "news" ? "line-clamp-2" : "line-clamp-3"}`}>{n.title}</span>
        {n.body && <span className="mt-1 hidden text-[13px] leading-snug text-ink-2 sm:block">{n.body}</span>}
        <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-violet">{n.cta} <ArrowUR className="size-3.5" /></span>
      </span>
    </>
  );
  const cls = "flex items-start gap-3 p-3.5 sm:p-4";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink bg-paper shadow-[4px_4px_0_0_var(--color-ink)]">
      {n.to
        ? <Link to={n.to} onClick={onAction} className={cls}>{inner}</Link>
        : <a href={n.href} target="_blank" rel="noopener" onClick={onAction} className={cls}>{inner}</a>}
      <button onClick={onClose} aria-label="Dismiss" className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-mute transition-colors hover:bg-ink/10 hover:text-ink">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
        <span key={n.id} className={`block h-full origin-left ${t.bar}`} style={{ animation: `nudge-timer ${SHOW_FOR}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }} />
      </span>
    </div>
  );
}

/* ---------- controller ---------- */
export function Nudges() {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<NewsItem | null>(null);
  const [current, setCurrent] = useState<Nudge | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [off, setOff] = useState(false);
  const [tick, setTick] = useState(0);
  const slot = useRef<HTMLDivElement | null>(null);
  const idx = useRef(0);
  const shownOnce = useRef(false);
  const remaining = useRef(SHOW_FOR);
  const startedAt = useRef(0);

  useEffect(() => {
    setMounted(true);
    if (ss.get(KEY_DISMISSED)) setOff(true);
    const w = window as unknown as { __NEWS__?: { items: NewsItem[] } };
    if (w.__NEWS__?.items?.[0]) setNews(w.__NEWS__.items[0]);
    else fetchLive().then(d => d?.items?.[0] && setNews(d.items[0]));
  }, []);

  const hidden = HIDDEN_ON.some(p => pathname.startsWith(p));
  const queue = useMemo(() => queueFor(pathname, news), [pathname, news]);

  useEffect(() => { idx.current = 0; setCurrent(null); setLeaving(false); }, [pathname]);

  // show the next one: first within 3s, then back to back, looping
  useEffect(() => {
    if (!mounted || off || hidden || current || !queue.length) return;
    const t = window.setTimeout(() => {
      if (document.activeElement?.matches("input, textarea, select")) { setTick(x => x + 1); return; }
      const box = slot.current?.getBoundingClientRect();
      if (box && coversButtons({ left: box.left, right: box.right, bottom: box.bottom, top: box.bottom - 120 })) { setTick(x => x + 1); return; }
      const n = queue[idx.current % queue.length];
      idx.current++;
      shownOnce.current = true;
      remaining.current = SHOW_FOR; startedAt.current = Date.now();
      setLeaving(false); setCurrent(n);
      track("nudge_view", n.id);
    }, shownOnce.current || tick > 0 ? GAP : FIRST_DELAY);
    return () => clearTimeout(t);
  }, [mounted, off, hidden, current, queue, tick]);

  // auto-hide, pausable
  useEffect(() => {
    if (!current || leaving) return;
    if (paused) { remaining.current -= Date.now() - startedAt.current; return; }
    startedAt.current = Date.now();
    const t = window.setTimeout(() => setLeaving(true), Math.max(0, remaining.current));
    return () => clearTimeout(t);
  }, [current, paused, leaving]);

  // after the slide-out animation, clear (which schedules the next one)
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => { setCurrent(null); setLeaving(false); setPaused(false); }, 380);
    return () => clearTimeout(t);
  }, [leaving]);

  const slotCls = "fixed bottom-[92px] left-4 right-4 z-40 sm:bottom-[96px] sm:left-auto sm:right-6 sm:w-[370px]";
  if (!mounted || off || hidden) return null;
  if (!current) return <div ref={slot} aria-hidden data-floating className={`${slotCls} pointer-events-none h-0`} />;

  const close = () => { track("nudge_close", current.id); ss.set(KEY_DISMISSED, "1"); setLeaving(true); window.setTimeout(() => setOff(true), 380); };

  return (
    <div role="status" aria-live="polite" ref={slot} data-floating
      className={slotCls}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)} onTouchEnd={() => window.setTimeout(() => setPaused(false), 1500)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className={leaving ? "nudge-out" : "nudge-in"}>
        <Card n={current} paused={paused} onClose={close} onAction={() => track("nudge_click", current.id)} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Floating CTA button (bottom-left). Always on screen; the message    */
/* rolls to the next one every few seconds with a little wiggle.       */
/* ------------------------------------------------------------------ */
type Cta = { id: string; label: string; short: string; to?: string; href?: string; icon: ReactNode; tile: string };
const Ico = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" aria-hidden>{children}</svg>
);
const CTAS: Cta[] = [
  { id: "call", label: "Book a free 30 min call", short: "Free 30 min call", href: SITE.calendly, tile: "bg-blaze text-ink",
    icon: <Ico><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M9 15l2 2 4-4" /></Ico> },
  { id: "whatsapp", label: "Chat with us on WhatsApp", short: "WhatsApp us", href: wa("Hi MakeMyApp, I'd like to discuss a project."), tile: "bg-[#25D366] text-ink",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.41 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.23.54.77 1.88.84 2.02.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.13.25.09 1.59.75 1.86.88.27.14.45.2.52.32.07.11.07.66-.17 1.33Z" /></svg> },
  { id: "prices", label: "See our starting prices", short: "See prices", to: "/services", tile: "bg-lilac text-violet",
    icon: <Ico><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="7.5" r="1.5" /></Ico> },
  { id: "ai", label: "Put AI to work for you", short: "AI for your business", to: "/services/ai-automation", tile: "bg-paper text-violet",
    icon: <Ico><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /><circle cx="12" cy="12" r="3.5" /></Ico> },
];
const SWAP_EVERY = 3500;

export function CtaDock() {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const covering = useCovering(box, mounted && show);

  useEffect(() => { setMounted(true); const t = window.setTimeout(() => setShow(true), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!show || hover) return;
    const t = window.setInterval(() => setI(n => (n + 1) % CTAS.length), SWAP_EVERY);
    return () => clearInterval(t);
  }, [show, hover]);

  if (!mounted || HIDDEN_ON.some(p => pathname.startsWith(p))) return null;
  const c = CTAS[i];
  const body = (
    <>
      <span className={`relative grid size-10 shrink-0 place-items-center rounded-full border border-ink ${c.tile} transition-colors duration-300`}>
        <span aria-hidden className="absolute inset-0 rounded-full border-2 border-blaze [animation:cta-ring_2.2s_ease-out_infinite]" />
        {c.icon}
      </span>
      <span className="relative h-6 min-w-0 flex-1 overflow-hidden">
        <span key={c.id} className="cta-roll absolute inset-0 flex items-center whitespace-nowrap text-[15px] font-semibold">
          <span className="sm:hidden">{c.short}</span><span className="hidden sm:inline">{c.label}</span>
        </span>
      </span>
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-paper/10 transition-transform group-hover:translate-x-0.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"><span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent [animation:cta-shine_3.5s_ease-in-out_infinite]" /></span>
    </>
  );
  const cls = `group relative flex w-full items-center gap-3 rounded-full border border-ink bg-ink py-2 pl-2 pr-2 text-paper shadow-[4px_4px_0_0_var(--color-blaze)] transition-transform hover:-translate-y-0.5`;
  return (
    <div ref={box} data-floating className={`fixed bottom-5 left-4 z-40 w-[calc(100%-104px)] max-w-[270px] sm:bottom-6 sm:left-6 sm:w-[310px] sm:max-w-none ${show ? "cta-in" : "pointer-events-none opacity-0"}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={`transition-all duration-500 ${covering ? "pointer-events-none translate-y-[140%] opacity-0" : ""}`} aria-hidden={covering}>
      <div key={c.id} className="cta-wiggle">
        {c.to
          ? <Link to={c.to} onClick={() => track("cta_dock", c.id)} className={cls} aria-label={c.label}>{body}</Link>
          : <a href={c.href} target="_blank" rel="noopener" onClick={() => track("cta_dock", c.id)} className={cls} aria-label={c.label}>{body}</a>}
      </div>
      </div>
    </div>
  );
}
