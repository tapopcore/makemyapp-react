import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, ArrowUR, CtaBand, Reveal, SectionHead, track } from "./ui";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
export interface NewsItem { id: string; title: string; summary: string; link: string; source: string; sourceId: string; author?: string; published: string; topics: string[] }
export interface NewsData { updatedAt: string; sources: { id: string; name: string; ok: boolean }[]; items: NewsItem[] }

export const TOPIC_LABELS: Record<string, string> = {
  openai: "OpenAI", google: "Google", anthropic: "Anthropic", meta: "Meta", microsoft: "Microsoft",
  apple: "Apple", chips: "Chips", funding: "Funding", policy: "Policy", india: "India",
};
const SOURCE_DOT: Record<string, string> = {
  techcrunch: "#0a9e01", verge: "#e2127a", venturebeat: "#e5242c", ainews: "#1f6feb", mittr: "#121212", ars: "#ff4e00",
};

// Build-time snapshot: set by the prerender (server) or read from window (client).
let SNAPSHOT: NewsData | null = null;
export const setNewsSnapshot = (d: NewsData | null) => { SNAPSHOT = d; };
function initial(): NewsData | null {
  if (typeof window !== "undefined") {
    const w = window as unknown as { __NEWS__?: NewsData };
    if (w.__NEWS__) return w.__NEWS__;
  }
  return SNAPSHOT;
}

let inflight: Promise<NewsData | null> | null = null;
function fetchLive(): Promise<NewsData | null> {
  if (!inflight) {
    inflight = fetch("/api/news", { headers: { accept: "application/json" } })
      .then(r => (r.ok ? r.json() : null))
      .then(d => (d && Array.isArray(d.items) && d.items.length ? (d as NewsData) : null))
      .catch(() => null);
  }
  return inflight;
}

export function useNews() {
  const [data, setData] = useState<NewsData | null>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "error">(data ? "idle" : "loading");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    let alive = true;
    fetchLive().then(d => {
      if (!alive) return;
      if (d) { setData(d); setStatus("idle"); }
      else setStatus(s => (data ? "idle" : s === "loading" ? "error" : s));
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const retry = () => { inflight = null; setStatus("loading"); fetchLive().then(d => { if (d) { setData(d); setStatus("idle"); } else setStatus("error"); }); };
  return { data, status, mounted, retry };
}

/* ------------------------------------------------------------------ */
/* Time helpers. Server renders a fixed date; client switches to       */
/* relative time after mount so hydration matches.                     */
/* ------------------------------------------------------------------ */
const IST = "Asia/Kolkata";
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: IST });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: IST });
function ago(iso: string) {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 12) return `${h}h ago`;
  return fmtTime(iso);
}
const When = ({ iso, mounted }: { iso: string; mounted: boolean }) => (
  <time dateTime={iso} suppressHydrationWarning>{mounted ? ago(iso) : fmtDate(iso)}</time>
);
function dayKey(iso: string) { return new Date(iso).toLocaleDateString("en-CA", { timeZone: IST }); }
function dayLabel(key: string, mounted: boolean) {
  if (mounted) {
    const today = dayKey(new Date().toISOString());
    const yest = dayKey(new Date(Date.now() - 864e5).toISOString());
    if (key === today) return "Today";
    if (key === yest) return "Yesterday";
  }
  return new Date(key + "T12:00:00+05:30").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: IST });
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */
const Source = ({ item, mounted, light = false }: { item: NewsItem; mounted: boolean; light?: boolean }) => (
  <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] ${light ? "text-paper/70" : "text-mute"}`}>
    <span className="inline-flex items-center gap-1.5 font-semibold">
      <span className="size-2 rounded-full" style={{ background: light ? "var(--color-blaze)" : SOURCE_DOT[item.sourceId] ?? "var(--color-violet)" }} />
      <span className={light ? "text-paper" : "text-ink"}>{item.source}</span>
    </span>
    <span aria-hidden>·</span>
    <When iso={item.published} mounted={mounted} />
  </p>
);

const Tags = ({ topics, light = false }: { topics: string[]; light?: boolean }) => topics.length ? (
  <ul className="flex flex-wrap gap-1.5">
    {topics.slice(0, 3).map(t => <li key={t} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${light ? "bg-paper/10 text-paper" : "bg-ink/[.06] text-ink-2"}`}>{TOPIC_LABELS[t] ?? t}</li>)}
  </ul>
) : null;

function out(item: NewsItem) { return () => track("news_click", `${item.source}: ${item.title}`.slice(0, 100)); }

export function NewsCard({ item, mounted }: { item: NewsItem; mounted: boolean }) {
  return (
    <article className="group h-full">
      <a href={item.link} target="_blank" rel="noopener" onClick={out(item)}
        className="flex h-full flex-col rounded-[22px] border border-ink bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-ink)] sm:p-7">
        <Source item={item} mounted={mounted} />
        <h3 className="display mt-4 text-[22px] leading-[1.12] tracking-[-0.02em] sm:text-[24px]">{item.title}</h3>
        {item.summary && <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink-2">{item.summary}</p>}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <Tags topics={item.topics} />
          <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-violet">Read<span className="sr-only"> on {item.source}</span> <ArrowUR className="size-3.5 transition-transform group-hover:rotate-45" /></span>
        </div>
      </a>
    </article>
  );
}

function LeadCard({ item, mounted }: { item: NewsItem; mounted: boolean }) {
  return (
    <article className="group h-full">
      <a href={item.link} target="_blank" rel="noopener" onClick={out(item)}
        className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-ink bg-ink p-7 text-paper transition-transform duration-300 hover:-translate-y-1 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[320px] rounded-full bg-violet/60 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-10 size-[260px] rounded-full bg-blaze/40 blur-[90px]" />
        <div className="relative flex items-center justify-between gap-3">
          <span className="rounded-full bg-blaze px-3 py-1 text-[12px] font-bold text-ink">Top story</span>
          <Source item={item} mounted={mounted} light />
        </div>
        <h2 className="display relative mt-8 text-[clamp(30px,3.6vw,52px)] leading-[1.02]">{item.title}</h2>
        {item.summary && <p className="relative mt-5 max-w-2xl text-[17px] leading-relaxed text-paper/80">{item.summary}</p>}
        <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
          <Tags topics={item.topics} light />
          <span className="inline-flex items-center gap-2 font-semibold">Read on {item.source} <ArrowUR className="size-4 transition-transform group-hover:rotate-45" /></span>
        </div>
      </a>
    </article>
  );
}

const Skeleton = ({ n = 6 }: { n?: number }) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="h-[230px] animate-pulse rounded-[22px] border border-ink/15 bg-paper-2/70 p-7">
        <div className="h-3 w-28 rounded-full bg-ink/10" /><div className="mt-6 h-5 w-11/12 rounded-full bg-ink/10" /><div className="mt-2 h-5 w-3/4 rounded-full bg-ink/10" /><div className="mt-6 h-3 w-full rounded-full bg-ink/[.07]" /><div className="mt-2 h-3 w-5/6 rounded-full bg-ink/[.07]" />
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const PAGE = 18;

export default function NewsPage() {
  const { data, status, mounted, retry } = useNews();
  const [topic, setTopic] = useState<string>("all");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const items = useMemo(() => data?.items ?? [], [data]);
  const topics = useMemo(() => {
    const count: Record<string, number> = {};
    items.forEach(i => i.topics.forEach(t => { count[t] = (count[t] ?? 0) + 1; }));
    return Object.keys(TOPIC_LABELS).filter(t => count[t]).map(t => ({ id: t, label: TOPIC_LABELS[t], n: count[t] }));
  }, [items]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter(i => (topic === "all" || i.topics.includes(topic)) && (!s || `${i.title} ${i.summary} ${i.source}`.toLowerCase().includes(s)));
  }, [items, topic, q]);

  const browsing = topic === "all" && !q.trim();
  const lead = browsing ? filtered[0] : undefined;
  const side = browsing ? filtered.slice(1, 3) : [];
  const rest = browsing ? filtered.slice(3) : filtered;
  const visible = rest.slice(0, shown);
  const groups = useMemo(() => {
    const g: { key: string; items: NewsItem[] }[] = [];
    visible.forEach(i => { const k = dayKey(i.published); const last = g[g.length - 1]; if (last && last.key === k) last.items.push(i); else g.push({ key: k, items: [i] }); });
    return g;
  }, [visible]);


  return (
    <>
      <section className="hero-top wrap pb-10 sm:pb-14">
        <div className="hero-in">
          <p className="label flex items-center gap-2 text-mute">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-blaze opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-blaze" /></span>
            MakeMyApp AI Desk
          </p>
          <h1 className="display mt-5 max-w-[14ch] text-[clamp(52px,9vw,132px)]">AI news, <span className="text-violet">minus the noise.</span></h1>
          <p className="mt-7 max-w-2xl text-[19px] leading-relaxed text-ink-2">
            The AI updates worth your time, kept short and simple. Get the gist here, then read the full story from the original publisher.
          </p>
          {data && <p className="mt-4 text-sm text-mute" suppressHydrationWarning>Updated {mounted ? ago(data.updatedAt) : fmtDate(data.updatedAt)}</p>}
        </div>
      </section>

      {/* toolbar */}
      <div className="z-30 border-y border-ink bg-paper/90 backdrop-blur-md sm:sticky sm:top-[68px]">
        <div className="wrap flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]" role="tablist" aria-label="Filter by topic">
            {[{ id: "all", label: "All", n: items.length }, ...topics].map(t => (
              <button key={t.id} role="tab" aria-selected={topic === t.id} onClick={() => { setTopic(t.id); setShown(PAGE); track("news_filter", t.id); }}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${topic === t.id ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-[300px]">
            <span className="sr-only">Search news</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mute" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={q} onChange={e => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search stories" type="search"
              className="w-full rounded-full border border-ink/25 bg-paper py-2.5 pl-10 pr-4 text-[15px] outline-none transition focus:border-ink focus:bg-white focus:ring-4 focus:ring-violet/15" />
          </label>
        </div>
      </div>

      <section className="wrap sec-sm">
        {!data && status === "loading" && <Skeleton />}
        {!data && status === "error" && (
          <div className="rounded-[22px] border border-ink bg-peach p-10 text-center">
            <p className="display text-[36px]">The news desk is catching its breath.</p>
            <p className="mt-3 text-ink-2">We couldn't load the latest stories just now.</p>
            <button onClick={retry} className="btn-ink mt-6">Try again</button>
          </div>
        )}

        {data && (
          <>
            {lead && (
              <div className="grid gap-5 lg:grid-cols-5">
                <div className="lg:col-span-3"><LeadCard item={lead} mounted={mounted} /></div>
                <div className="grid gap-5 lg:col-span-2">{side.map(i => <NewsCard key={i.id} item={i} mounted={mounted} />)}</div>
              </div>
            )}

            {!browsing && (
              <p className="text-[15px] text-ink-2">
                {filtered.length ? <>{filtered.length} {filtered.length === 1 ? "story" : "stories"}{topic !== "all" && <> on <b>{TOPIC_LABELS[topic]}</b></>}{q.trim() && <> matching <b>“{q.trim()}”</b></>}</> : <>No stories match that yet. <button className="font-semibold text-violet underline" onClick={() => { setTopic("all"); setQ(""); }}>Show everything</button></>}
              </p>
            )}

            {groups.map(g => (
              <div key={g.key} className={lead || !browsing ? "mt-14" : ""}>
                <h2 className="flex items-center gap-4"><span className="display text-[28px] tracking-[-0.02em]" suppressHydrationWarning>{dayLabel(g.key, mounted)}</span><span className="h-px flex-1 bg-ink/20" /></h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map(i => <NewsCard key={i.id} item={i} mounted={mounted} />)}
                </div>
              </div>
            ))}

            {rest.length > shown && (
              <div className="mt-12 flex justify-center"><button onClick={() => setShown(s => s + PAGE)} className="btn-line">Load more stories</button></div>
            )}

            <p className="mt-14 max-w-3xl text-[13px] leading-relaxed text-mute">
              Headlines and summaries belong to their publishers, and every story links to the original. MakeMyApp is not affiliated with these publications.
            </p>
          </>
        )}
      </section>

      <CtaBand title="Want AI working in your business?" line="Reading about AI is the easy part. We build AI agents, WhatsApp automation and smart workflows that save Indian businesses real hours every week." />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Homepage strip                                                      */
/* ------------------------------------------------------------------ */
export function NewsStrip() {
  const { data, mounted } = useNews();
  const top = data?.items.slice(0, 3) ?? [];
  if (!data || top.length < 3) return null;
  return (
    <section className="wrap pb-20 sm:pb-28">
      <SectionHead kicker="From the AI desk" title={<>What's new<br />in AI today.</>}>
        We track the AI news that affects how businesses sell, build and work, so you don't have to.
        <Link to="/news" className="mt-5 flex w-fit items-center gap-2 font-semibold text-ink underline-swipe">Read all AI news <Arrow /></Link>
      </SectionHead>
      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {top.map((i, k) => <Reveal key={i.id} delay={k * 90}><NewsCard item={i} mounted={mounted} /></Reveal>)}
      </div>
    </section>
  );
}
