import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SERVICES, inr, type Pillar } from "./content";
import { Arrow, Reveal } from "./ui";

const anchor = (p: string) => `/services#${p.replace(/\W+/g, "-").toLowerCase()}`;
const from = (p: Pillar) => inr(Math.min(...SERVICES.filter(s => s.pillar === p).map(s => s.price)));
const names = (p: Pillar) => SERVICES.filter(s => s.pillar === p).map(s => s.name);

/* ---------- mini visuals ---------- */
function BuildVisual() {
  return (
    <div className="relative h-[220px] sm:h-[250px]" aria-hidden>
      {/* browser */}
      <div className="absolute left-0 top-2 w-[78%] overflow-hidden rounded-xl border border-ink bg-paper shadow-[5px_5px_0_0_var(--color-ink)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-1">
        <div className="flex items-center gap-1.5 border-b border-ink bg-paper-2 px-3 py-2"><i className="size-2 rounded-full bg-blaze" /><i className="size-2 rounded-full bg-ink/25" /><i className="size-2 rounded-full bg-ink/25" /><span className="ml-2 h-2 w-24 rounded-full bg-ink/10" /></div>
        <div className="space-y-2.5 p-4">
          <div className="h-3 w-2/3 rounded-full bg-ink [animation:grow_3.2s_ease-in-out_infinite]" />
          <div className="h-2 w-1/2 rounded-full bg-ink/20" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map(k => <div key={k} className="aspect-[4/3] rounded-md bg-violet/15 [animation:pulse-soft_2.4s_ease-in-out_infinite]" style={{ animationDelay: `${k * 0.25}s` }} />)}
          </div>
          <div className="flex items-center gap-2 pt-1"><div className="h-6 w-20 rounded-full bg-violet" /><div className="h-6 w-14 rounded-full border border-ink/30" /></div>
        </div>
      </div>
      {/* phone */}
      <div className="absolute bottom-0 right-1 w-[30%] min-w-[96px] rounded-[18px] border border-ink bg-ink p-1.5 shadow-[4px_4px_0_0_var(--color-blaze)] transition-transform duration-500 group-hover:translate-y-[-6px] group-hover:rotate-2">
        <div className="rounded-[13px] bg-paper p-2">
          <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-ink/20" />
          <div className="aspect-square rounded-lg bg-blaze/80" />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-ink/70" />
          <div className="mt-1 h-1.5 w-1/2 rounded-full bg-ink/20" />
          <div className="mt-2 h-4 rounded-full bg-violet text-center text-[8px] font-bold leading-4 text-paper">Add to cart</div>
        </div>
      </div>
      {/* code tag */}
      <div className="absolute right-[30%] top-0 rounded-md border border-ink bg-ink px-2 py-1 font-mono text-[11px] text-[#7CFFB2] shadow-[3px_3px_0_0_var(--color-violet)]">{"<shipped />"}</div>
    </div>
  );
}

function BrandVisual() {
  return (
    <div className="relative h-[220px]" aria-hidden>
      <div className="absolute inset-x-0 top-2 flex items-end justify-center gap-3">
        <span className="display text-[120px] leading-[.8] text-ink transition-transform duration-500 group-hover:-rotate-6">Aa</span>
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2">
        {["#121212", "#5d00ff", "#f3efe6", "#ffe2cc", "#e6dcff"].map((c, k) => (
          <span key={c} className="-ml-3 size-14 rounded-full border border-ink transition-transform duration-500 first:ml-0 group-hover:-translate-y-2" style={{ background: c, transitionDelay: `${k * 60}ms` }} />
        ))}
      </div>
      <div className="absolute right-2 top-4 rotate-6 rounded-md border border-ink bg-paper px-2 py-1 font-mono text-[10px]">#FF6B00</div>
      <div className="absolute left-2 top-16 -rotate-6 rounded-md border border-ink bg-paper px-2 py-1 font-mono text-[10px]">Logo v3 ✓</div>
    </div>
  );
}

function GrowVisual() {
  const bars = [28, 40, 34, 52, 61, 74, 92];
  return (
    <div className="relative h-[220px]" aria-hidden>
      <div className="absolute left-0 top-0 rounded-lg border border-paper/20 bg-paper/5 px-3 py-2">
        <p className="label text-paper/50">Sales this month</p>
        <p className="display text-[30px] text-[#7CFFB2]">Trending ↑</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[150px] items-end gap-2">
        {bars.map((h, k) => (
          <div key={k} className="flex-1 origin-bottom rounded-t-md bg-paper/15 transition-colors group-hover:bg-paper/25 [.in_&]:[animation:rise-bar_1.4s_cubic-bezier(.2,.7,.2,1)_both]" style={{ height: `${h}%`, animationDelay: `${k * 90}ms`, background: k === bars.length - 1 ? "var(--color-blaze)" : undefined }} />
        ))}
      </div>
      <svg viewBox="0 0 300 150" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[150px] w-full overflow-visible">
        <path d="M10 120 L55 95 L100 104 L145 74 L190 62 L235 38 L285 10" fill="none" stroke="#7CFFB2" strokeWidth="2.5" strokeDasharray="400" className="[.in_&]:[animation:draw_2.2s_ease-out_both]" />
        <circle cx="285" cy="10" r="5" fill="#7CFFB2" className="[animation:pulse-soft_1.6s_ease-in-out_infinite]" />
      </svg>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="relative flex h-[220px] flex-col justify-end gap-2.5 sm:h-[250px]" aria-hidden>
      <div className="flex items-center gap-2 self-start rounded-full border border-ink bg-paper px-3 py-1 text-[11px] font-semibold"><span className="size-2 rounded-full bg-[#25D366]" /> WhatsApp AI agent · online</div>
      <div className="max-w-[78%] self-start rounded-2xl rounded-bl-sm border border-ink bg-paper px-4 py-2.5 text-[14px] opacity-0 [.in_&]:opacity-100 [.in_&]:[animation:pop_.5s_ease-out_both]">Do you deliver to Pune? 📦</div>
      <div className="max-w-[82%] self-end rounded-2xl rounded-br-sm bg-violet px-4 py-2.5 text-[14px] text-paper opacity-0 [.in_&]:opacity-100 [.in_&]:[animation:pop_.5s_ease-out_.6s_both]">Yes! 2 to 3 days. Want me to hold the size M for you?</div>
      <div className="flex items-center gap-1 self-end rounded-2xl rounded-br-sm bg-violet/90 px-4 py-3 opacity-0 [.in_&]:opacity-100 [.in_&]:[animation:pop_.5s_ease-out_1.2s_both]">
        {[0, 1, 2].map(k => <span key={k} className="size-1.5 rounded-full bg-paper [animation:dot_1.2s_ease-in-out_infinite]" style={{ animationDelay: `${k * 0.15}s` }} />)}
      </div>
      <div className="absolute right-0 top-0 grid size-16 place-items-center rounded-2xl border border-ink bg-blaze text-[30px] shadow-[3px_3px_0_0_var(--color-ink)] transition-transform duration-500 group-hover:rotate-12">✦</div>
    </div>
  );
}

/* ---------- card ---------- */
function Card({ p, n, theme, visual, className = "", line }: { p: Pillar; n: string; theme: string; visual: ReactNode; className?: string; line: string }) {
  const list = names(p);
  const dark = theme.includes("text-paper");
  return (
    <Reveal as="article" className={`group relative overflow-hidden rounded-[28px] border border-ink ${theme} ${className}`}>
      <Link to={anchor(p)} className="flex h-full flex-col p-6 sm:p-8" aria-label={`${p}: ${list.join(", ")}`}>
        <div className="flex items-start justify-between gap-4">
          <span className={`label ${dark ? "text-paper/60" : "text-ink/60"}`}>{n} / 04</span>
          <span className={`grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:-rotate-45 ${dark ? "border-paper/40 group-hover:bg-paper group-hover:text-ink" : "border-ink group-hover:bg-ink group-hover:text-paper"}`}><Arrow /></span>
        </div>
        <div className="mt-4">{visual}</div>
        <h3 className="display mt-6 text-[clamp(44px,5vw,72px)]">{p}</h3>
        <p className={`mt-2 max-w-md text-[16px] leading-relaxed ${dark ? "text-paper/80" : "text-ink-2"}`}>{line}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {list.map(s => <span key={s} className={`rounded-full px-3 py-1 text-[12px] font-medium ${dark ? "bg-paper/10 text-paper" : "bg-ink/[.07]"}`}>{s}</span>)}
        </div>
        <p className={`mt-auto pt-6 font-mono text-[13px] ${dark ? "text-paper/70" : "text-ink/70"}`}>from <b className={dark ? "text-paper" : "text-ink"}>{from(p)}</b></p>
      </Link>
    </Reveal>
  );
}

export function PillarBento() {
  return (
    <div className="mt-16 grid gap-5 lg:grid-cols-5">
      <Card p="Build" n="01" theme="bg-violet text-paper" className="lg:col-span-3" visual={<BuildVisual />}
        line="Websites, Shopify stores, mobile apps and the internal tools that run your business." />
      <Card p="Brand" n="02" theme="bg-blaze text-ink" className="lg:col-span-2" visual={<BrandVisual />}
        line="Logo, identity, packaging and print that make you look as good as you are." />
      <Card p="Grow" n="03" theme="bg-ink text-paper" className="lg:col-span-2" visual={<GrowVisual />}
        line="Meta ads, influencers and email that bring buyers, not just likes." />
      <Card p="Content & AI" n="04" theme="bg-lilac text-ink" className="lg:col-span-3" visual={<AIVisual />}
        line="AI product shoots, AI ads, UGC, and AI agents that answer customers 24x7." />
    </div>
  );
}
