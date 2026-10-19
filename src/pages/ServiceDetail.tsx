import { Link, useParams } from "react-router-dom";
import { ALL_WORK, FEATURED, PROCESS, SERVICES, SERVICE_PAGES, SITE, inr, wa } from "../content";
import { Arrow, ArrowUR, BrowserShot, CtaBand, Faq, Reveal, WaIcon, track } from "../ui";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams();
  const page = SERVICE_PAGES.find(p => p.slug === slug);
  if (!page) return <NotFound />;

  const shots = FEATURED.filter(w => page.workTypes.includes(w.type) && w.img).slice(0, 4);
  const more = ALL_WORK.filter(w => page.workTypes.includes(w.type) && !shots.includes(w)).slice(0, 18);
  const priced = SERVICES.filter(s => s.slug === page.slug);

  return (
    <>
      <section className="wrap pt-36 pb-16 sm:pt-44">
        <div className="hero-in">
          <nav aria-label="Breadcrumb" className="label text-mute"><Link to="/services" className="underline-swipe">Services</Link> / {page.short}</nav>
          <h1 className="display mt-6 max-w-[16ch] text-[clamp(48px,8.4vw,124px)]">{page.h1}</h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="text-[19px] leading-relaxed text-ink-2 lg:col-span-7">{page.intro}</p>
            <div className="rounded-[20px] border border-ink bg-blaze p-6 lg:col-span-4 lg:col-start-9">
              <p className="label">Starts at</p>
              <p className="display mt-2 text-[44px]">{page.from}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={SITE.calendly} target="_blank" rel="noopener" onClick={() => track("book_call", page.slug)} className="btn-ink !px-5 !py-3 text-sm">Get a fixed quote <Arrow /></a>
                <a href={wa(`Hi MakeMyApp, I'm interested in ${page.short}.`)} target="_blank" rel="noopener" onClick={() => track("whatsapp", page.slug)} className="btn border border-ink !px-4 !py-3 text-sm hover:bg-ink hover:text-paper"><WaIcon className="size-4" /> WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {priced.length > 1 && (
        <section className="wrap pb-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {priced.map(s => (
              <div key={s.name} className="rounded-[18px] border border-ink p-6">
                <p className="display text-[24px] tracking-[-0.02em]">{s.name}</p>
                <p className="mt-2 text-[15px] text-ink-2">{s.blurb}</p>
                <p className="mt-4 font-mono text-sm">from {inr(s.price)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="wrap grid gap-12 py-16 lg:grid-cols-2">
        <Reveal>
          <p className="label text-mute">Good fit if you are</p>
          <ul className="mt-6 border-t border-ink">
            {page.forWho.map(f => <li key={f} className="display border-b border-ink py-5 text-[clamp(22px,2.2vw,28px)] tracking-[-0.02em]">{f}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <p className="label text-mute">What's included</p>
          <ul className="mt-6 grid gap-3">
            {page.includes.map(f => (
              <li key={f} className="flex items-start gap-3 text-[17px]">
                <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-violet text-paper" aria-hidden><svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg></span>{f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {shots.length > 0 && (
        <section className="bg-paper-2 py-20">
          <div className="wrap">
            <h2 className="display text-[clamp(36px,4.6vw,64px)]">Related work</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {shots.map(w => (
                <a key={w.name} href={w.url} target="_blank" rel="noopener" className="group block">
                  <BrowserShot img={w.img!} name={w.url.replace(/https?:\/\/(www\.)?/, "").replace(/\/$/, "")} />
                  <p className="display mt-4 text-[26px] tracking-[-0.02em]">{w.name} <span className="label ml-2 text-mute">{w.sector}</span></p>
                </a>
              ))}
            </div>
            {more.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2">
                {more.map(w => <li key={w.name}><a href={w.url} target="_blank" rel="noopener" className="chip bg-paper !py-2 hover:bg-ink hover:text-paper">{w.name} <ArrowUR className="ml-1 size-3" /></a></li>)}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className="wrap py-20">
        <h2 className="display text-[clamp(36px,4.6vw,64px)]">How it runs</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <li key={p.step} className="bg-paper p-7">
              <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
              <p className="display mt-3 text-[24px] tracking-[-0.02em]">{p.step}</p>
              <p className="mt-2 text-[15px] text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap pb-10">
        <h2 className="display text-[clamp(36px,4.6vw,64px)]">Questions</h2>
        <div className="mt-8"><Faq items={page.faqs} /></div>
      </section>

      <CtaBand title={`Let's talk ${page.short.toLowerCase()}.`} />
    </>
  );
}
