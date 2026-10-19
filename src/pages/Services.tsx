import { Link } from "react-router-dom";
import { PILLARS, SERVICES, SERVICE_PAGES, inr, wa } from "../content";
import { Arrow, CtaBand, Faq, PageHero, Reveal, WaIcon, track } from "../ui";

const pillarBg: Record<string, string> = { Build: "bg-violet text-paper", Brand: "bg-blaze", Grow: "bg-ink text-paper", "Content & AI": "bg-lilac" };

export default function Services() {
  return (
    <>
      <PageHero kicker="Services & starting prices" title={<>Everything,<br />priced openly.</>}>
        19 services across build, brand, growth and AI. Every one shows what it starts at, so you can plan before we talk. Your final quote is fixed and milestone-based, after a free call.
      </PageHero>

      <nav aria-label="Service groups" className="wrap -mt-4 mb-6 flex flex-wrap gap-2">
        {PILLARS.map(p => <a key={p.name} href={`#${p.name.replace(/\W+/g, "-").toLowerCase()}`} className="chip !px-4 !py-2 !text-sm hover:bg-ink hover:text-paper">{p.name}</a>)}
      </nav>

      {PILLARS.map((p, pi) => {
        const list = SERVICES.filter(s => s.pillar === p.name);
        return (
          <section key={p.name} id={p.name.replace(/\W+/g, "-").toLowerCase()} className="wrap scroll-mt-24 py-12 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className={`sticky top-28 rounded-[22px] border border-ink p-8 ${pillarBg[p.name]}`}>
                  <span className="label opacity-60">0{pi + 1} / 04</span>
                  <h2 className="display mt-10 text-[clamp(48px,5vw,76px)]">{p.name}</h2>
                  <p className="mt-3 text-[17px] opacity-85">{p.line}</p>
                </div>
              </div>
              <ul className="border-t border-ink lg:col-span-8">
                {list.map((s, i) => (
                  <Reveal as="li" key={s.name} delay={i * 50} className="border-b border-ink">
                    <div className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:gap-10">
                      <div>
                        <h3 className="display text-[clamp(26px,2.8vw,36px)] tracking-[-0.03em]">{s.name}</h3>
                        <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-ink-2">{s.blurb}</p>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                          {s.slug && <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-violet underline-swipe">Details & FAQs <Arrow className="size-3.5" /></Link>}
                          <a href={wa(`Hi MakeMyApp, I'm interested in ${s.name}.`)} target="_blank" rel="noopener" onClick={() => track("whatsapp", `service_${s.name}`)} className="inline-flex items-center gap-1.5 underline-swipe"><WaIcon className="size-4" /> Ask about this</a>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <p className="label text-mute">Starts at</p>
                        <p className="display mt-1 text-[34px] tracking-[-0.03em]">{inr(s.price)}</p>
                        {(s.unit || s.note) && <p className="font-mono text-[12px] text-mute">{s.unit ?? s.note}</p>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="wrap py-16">
        <p className="label text-mute">Go deeper</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map(p => (
            <Link key={p.slug} to={`/services/${p.slug}`} className="group flex items-end justify-between rounded-[20px] border border-ink p-7 transition-colors hover:bg-ink hover:text-paper">
              <div><p className="label opacity-60">from {p.from}</p><p className="display mt-3 text-[28px] leading-tight tracking-[-0.03em]">{p.short}</p></div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-current transition-transform group-hover:-rotate-45"><Arrow /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="display text-[clamp(36px,4.4vw,60px)]">About pricing</h2>
        <div className="mt-8">
          <Faq items={[
            { q: "Why do you show prices when other agencies don't?", a: "Because it saves everyone time. You know if we fit your budget before the first call, and we never have to guess what you can spend." },
            { q: "Will my final price be higher than the starting price?", a: "It can be, if you need more pages, products, features or months. You'll get a fixed quote in writing before work starts, and it won't change unless the scope does." },
            { q: "How do payments work?", a: "Milestone-based. You pay in parts as work is delivered and approved, not everything up front." },
          ]} />
        </div>
      </section>

      <CtaBand title="Not sure what you need?" line="Tell us the problem, not the service. We'll suggest the smallest thing that solves it, even if that's less than you planned to spend." />
    </>
  );
}
