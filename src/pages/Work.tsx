import { useState } from "react";
import { FEATURED, MORE_WORK, TESTIMONIALS, type WorkType } from "../content";
import { ArrowUR, BrowserShot, CtaBand, PageHero, Reveal } from "../ui";

const FILTERS: ("All" | WorkType)[] = ["All", "Shopify", "Website", "App", "Content"];
const host = (u: string) => u.replace(/https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");

export default function Work() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const shots = FEATURED.filter(w => f === "All" || w.type === f);
  const rest = MORE_WORK.filter(w => f === "All" || w.type === f);

  return (
    <>
      <PageHero kicker="Selected work" title={<>300+ projects.<br /><span className="text-violet">A few we can show.</span></>}>
        Most of what we build sits behind NDAs, so this is a selection of public work: websites, Shopify stores, apps and content for brands across India. Every link goes to the live product, not a mockup.
      </PageHero>

      <div className="sticky top-[68px] z-30 border-y border-ink bg-paper/90 backdrop-blur-md">
        <div className="wrap flex gap-2 overflow-x-auto py-3" role="tablist" aria-label="Filter work">
          {FILTERS.map(t => (
            <button key={t} role="tab" aria-selected={f === t} onClick={() => setF(t)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${f === t ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {shots.length > 0 && (
        <section className="wrap sec-sm">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {shots.map((w, i) => (
              <Reveal key={w.name} delay={(i % 3) * 80}>
                <a href={w.url} target="_blank" rel="noopener" className="group block">
                  <BrowserShot img={w.img!} name={host(w.url)} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h2 className="display text-[28px] tracking-[-0.03em]">{w.name}</h2>
                    <span className="label shrink-0 text-mute">{w.type}</span>
                  </div>
                  <p className="mt-1 text-[15px] text-ink-2">{w.line ?? w.sector}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="wrap sec-sm">
          <h2 className="label text-mute">{f === "All" ? "More projects" : `More ${f.toLowerCase()} projects`}</h2>
          <ul className="mt-6 border-t border-ink">
            {rest.map(w => (
              <li key={w.name + w.url}>
                <a href={w.url} target="_blank" rel="noopener" className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-ink py-5 transition-colors hover:bg-ink hover:text-paper sm:grid-cols-12 sm:px-3">
                  <span className="display text-[clamp(24px,2.6vw,34px)] tracking-[-0.03em] sm:col-span-5">{w.name}</span>
                  <span className="hidden text-[15px] text-ink-2 group-hover:text-paper/70 sm:col-span-3 sm:block">{w.sector ?? ""}</span>
                  <span className="hidden font-mono text-[12px] text-mute group-hover:text-paper/60 sm:col-span-3 sm:block">{w.type === "App" ? "Play Store" : w.type === "Content" ? "Google Drive" : host(w.url)}</span>
                  <span className="flex items-center justify-end gap-3 sm:col-span-1"><span className="chip group-hover:border-paper/30 sm:hidden">{w.type}</span><ArrowUR className="size-5 transition-transform group-hover:rotate-45" /></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="wrap sec-sm">
        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map(t => (
            <figure key={t.name} className="rounded-[20px] border border-ink bg-paper-2 p-7">
              <blockquote className="text-[16px] leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm"><b>{t.name}</b>, <span className="text-mute">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand title="Want your brand on this page?" />
    </>
  );
}
