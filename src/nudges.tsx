import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "./content";
import { fetchLive, type NewsItem } from "./news";
import { ArrowUR, track } from "./ui";

/* ------------------------------------------------------------------ */
/* Slide-in nudges (toasts). Small cards that slide in bottom-right    */
/* (desktop) or bottom (phones), stay a few seconds, then slide out.    */
/*                                                                     */
/* Rules so they never get in the way:                                 */
/*  - first one ~5s after landing, then one every ~25s                 */
/*  - max 4 per visit; closing one stops them for the visit            */
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

const FIRST_DELAY = 5000;
const SHOW_FOR = 9000;
const GAP = 25000;
const MAX_PER_VISIT = 4;
const HIDDEN_ON = ["/contact", "/privacy-policy"];

const KEY_DISMISSED = "mma_nudges_off";
const KEY_SEEN = "mma_nudges_seen";
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
const CALL: Nudge = { id: "call", tone: "call", kicker: "Free 30 min call", title: "Got an idea? Talk it through with us.", body: "Honest advice and a real price range. No sales pitch.", cta: "Book a slot", href: SITE.calendly };
const AWARD: Nudge = { id: "award", tone: "award", kicker: "Award-winning studio", title: "Tech Startup of the Year 2023", body: "Bharat Ke Maharathi Awards. 300+ projects delivered since.", cta: "Meet the team", to: "/about" };
const AI: Nudge = { id: "ai", tone: "ai", kicker: "AI for your business", title: "Let AI answer your customers 24x7.", body: "AI agents and WhatsApp automation, set up for you.", cta: "See how", to: "/services/ai-automation" };

function newsNudge(n: NewsItem): Nudge {
  return { id: `news-${n.id}`, tone: "news", kicker: `New on the AI Desk · ${n.source}`, title: n.title, cta: "Read more AI news", to: "/news" };
}

function queueFor(path: string, news: NewsItem | null): Nudge[] {
  const proof = PROOF[Math.floor(Math.random() * PROOF.length)];
  if (path.startsWith("/news")) return [AI, proof, CALL, AWARD];
  if (path.startsWith("/services")) return [proof, ...(news ? [newsNudge(news)] : []), CALL, AWARD];
  if (path.startsWith("/work")) return [CALL, ...(news ? [newsNudge(news)] : []), AWARD, proof];
  return [...(news ? [newsNudge(news)] : []), proof, CALL, AWARD];
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
  const idx = useRef(0);
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

  // reset the rotation on route change, keep the visit-wide cap
  useEffect(() => { idx.current = 0; setCurrent(null); setLeaving(false); }, [pathname]);

  // phones: hold the first nudge until the visitor has scrolled past the first screen
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(min-width: 640px)").matches || Number(ss.get(KEY_SEEN) || 0) > 0) { setReady(true); return; }
    const on = () => { if (window.scrollY > window.innerHeight * 0.8) { setReady(true); window.removeEventListener("scroll", on); } };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [mounted]);

  // schedule the next nudge
  useEffect(() => {
    if (!mounted || !ready || off || hidden || current) return;
    const seen = Number(ss.get(KEY_SEEN) || 0);
    if (seen >= MAX_PER_VISIT || idx.current >= queue.length) return;
    const first = idx.current === 0 && seen === 0;
    const t = window.setTimeout(() => {
      const typing = document.activeElement?.matches("input, textarea, select");
      if (typing) return;
      const n = queue[idx.current++];
      ss.set(KEY_SEEN, String(Number(ss.get(KEY_SEEN) || 0) + 1));
      remaining.current = SHOW_FOR; startedAt.current = Date.now();
      setLeaving(false); setCurrent(n);
      track("nudge_view", n.id);
    }, first ? (window.matchMedia("(min-width: 640px)").matches ? FIRST_DELAY : 1500) : idx.current === 0 ? 8000 : GAP);
    return () => clearTimeout(t);
  }, [mounted, ready, off, hidden, current, queue]);

  // auto-hide, pausable
  useEffect(() => {
    if (!current || leaving) return;
    if (paused) { remaining.current -= Date.now() - startedAt.current; return; }
    startedAt.current = Date.now();
    const t = window.setTimeout(() => setLeaving(true), Math.max(0, remaining.current));
    return () => clearTimeout(t);
  }, [current, paused, leaving]);

  // after the slide-out animation, clear
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => { setCurrent(null); setLeaving(false); setPaused(false); }, 380);
    return () => clearTimeout(t);
  }, [leaving]);

  if (!mounted || off || hidden || !current) return null;

  const close = () => { track("nudge_close", current.id); ss.set(KEY_DISMISSED, "1"); setLeaving(true); window.setTimeout(() => setOff(true), 380); };

  return (
    <div role="status" aria-live="polite"
      className="fixed bottom-5 left-4 right-[88px] z-40 sm:bottom-[96px] sm:left-auto sm:right-6 sm:w-[370px]"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)} onTouchEnd={() => window.setTimeout(() => setPaused(false), 1500)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className={leaving ? "nudge-out" : "nudge-in"}>
        <Card n={current} paused={paused} onClose={close} onAction={() => track("nudge_click", current.id)} />
      </div>
    </div>
  );
}
