import { Link } from "react-router-dom";
import { AWARDS, FAQS, FEATURED, MORE_WORK, SITE, TESTIMONIALS } from "../content";
import { BrandSnippet } from "../brands";
import { Principles, ProcessSteps } from "../sections";
import { NewsStrip } from "../news";
import { BrandMarquee, HeroBadge, TileGrid, Typewriter } from "../fx";
import { PillarBento } from "../pillars";
import { Arrow, ArrowUR, BrowserShot, CtaBand, Faq, Reveal, SectionHead, track } from "../ui";

const names = [...FEATURED, ...MORE_WORK].filter(w => w.type !== "Content").map(w => w.name);
const PHRASES = ["Shopify stores that sell.", "websites that convert.", "apps people actually use.", "brands people remember.", "ads that bring buyers.", "AI that replies 24x7."];

function AwardSeal() {
  return (
    <div className="relative grid size-[132px] place-items-center rounded-full bg-blaze text-ink shadow-[4px_4px_0_0_var(--color-ink)] border border-ink">
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full" style={{ animation: "spin-slow 22s linear infinite" }} aria-hidden>
        <defs><path id="c" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text className="font-mono" fontSize="9.6" letterSpacing="2.2" fill="currentColor"><textPath href="#c">TECH STARTUP OF THE YEAR • 2023 • AWARD WINNING •</textPath></text>
      </svg>
      <span className="display text-[34px]">★</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-top relative overflow-hidden">
        <TileGrid />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-lilac/70 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-60 size-[420px] rounded-full bg-peach/80 blur-[120px]" />
        <div className="wrap relative grid gap-14 pb-20 sm:pb-28 lg:grid-cols-12 lg:gap-8">
          <div className="hero-in lg:col-span-7">
            <HeroBadge />
            <h1 className="display mt-8 text-[clamp(60px,10.4vw,156px)] sm:mt-10">
              Build it.<br /><span className="text-violet">Brand it.</span><br /><span className="relative inline-block">Grow it.<svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 h-4 w-full text-blaze" preserveAspectRatio="none" aria-hidden><path d="M2 14 C 80 2, 200 2, 298 12" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" /></svg></span>
            </h1>
            <p className="display mt-8 min-h-[2.3em] text-[clamp(24px,2.6vw,36px)] leading-[1.15] tracking-[-0.025em] sm:min-h-[1.2em]">
              We make <Typewriter phrases={PHRASES} className="block text-violet sm:inline" />
            </p>
            <p className="mt-5 max-w-[560px] text-[18px] leading-relaxed text-ink-2">
              One full-stack team in Delhi for your website, Shopify store, app, brand, ads and AI automation. 300+ projects delivered, with real prices up front and no upselling.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={SITE.calendly} target="_blank" rel="noopener" onClick={() => track("book_call", "hero")} className="btn-ink">Book a free 30 min call <Arrow /></a>
              <Link to="/work" className="btn-line">See our work</Link>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-mute">
              <div className="flex -space-x-2">
                {["dhruv", "sayaji", "ramprasad"].map(n => <img key={n} src={`/img/team/${n}.webp`} alt="" width={36} height={36} className="size-9 rounded-full border-2 border-paper object-cover" />)}
              </div>
              <p>Free call. Honest advice. No sales pitch.</p>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[460px] lg:col-span-5 lg:min-h-0" aria-label="Recent work">
            <div className="hero-in relative h-full">
              <div className="absolute left-0 top-0 w-[82%] -rotate-[3deg] lg:w-[92%]"><BrowserShot img="athlab" name="athlab.in" priority sizes="(min-width:1024px) 40vw, 80vw" /></div>
              <div className="absolute right-0 top-[34%] w-[76%] rotate-[2.5deg] lg:w-[84%]"><BrowserShot img="gossipconfetti" name="gossipconfetti.com" priority sizes="(min-width:1024px) 36vw, 76vw" /></div>
              <div className="absolute bottom-0 left-[6%] w-[66%] -rotate-[1deg] lg:w-[72%]"><BrowserShot img="dma" name="dmassociates.in" sizes="(min-width:1024px) 30vw, 66vw" /></div>
              <div className="absolute -right-1 -top-4 z-10 sm:right-2 lg:-right-4 lg:-top-8"><AwardSeal /></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <BrandMarquee names={names} />

      {/* NUMBERS */}
      <section className="wrap grid grid-cols-2 border-b border-ink lg:grid-cols-4">
        {[["300+", "projects delivered"], ["19", "services, one team"], ["100%", "in-house team"], ["2", "startup awards, 2023"]].map(([n, l], i) => (
          <Reveal key={l} delay={i * 80} className={`py-10 sm:py-14 ${i % 2 ? "pl-5 sm:pl-8" : "pr-5"} ${i > 0 ? "lg:border-l lg:border-ink lg:pl-8" : ""} ${i % 2 ? "border-l border-ink lg:border-l" : ""} ${i > 1 ? "border-t border-ink lg:border-t-0" : ""}`}>
            <p className="display text-[clamp(52px,7vw,96px)]">{n}</p>
            <p className="label mt-2 text-mute">{l}</p>
          </Reveal>
        ))}
      </section>

      {/* SERVICES */}
      <section className="wrap pt-10 pb-20 sm:pt-14 sm:pb-28">
        <SectionHead kicker="What we do" title={<>Four things,<br />done properly.</>}>
          Most agencies do one part and hand you off. We cover the whole journey, so your brand, store and ads actually work together.
        </SectionHead>
        <PillarBento />
      </section>

      {/* WORK */}
      <section className="bg-paper-2 sec">
        <div className="wrap">
          <SectionHead kicker="Selected work" title={<>Live, selling,<br />and real.</>}>
            A few public projects from 300+. Most of our work is under NDA, but everything here is live right now. Click through and judge for yourself.
          </SectionHead>
          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {FEATURED.slice(0, 6).map((w, i) => (
              <Reveal key={w.name} delay={(i % 2) * 120} className={i % 2 ? "md:mt-20" : ""}>
                <a href={w.url} target="_blank" rel="noopener" className="group block">
                  <BrowserShot img={w.img!} name={w.url.replace(/https?:\/\/(www\.)?/, "").replace(/\/$/, "")} />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="display text-[34px] tracking-[-0.03em]">{w.name}</h3>
                      <p className="mt-1 text-[16px] text-ink-2">{w.line}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="chip bg-paper">{w.type}</span>
                      <span className="label text-mute">{w.sector}</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <BrandSnippet className="mt-12 border-t border-ink/15 pt-10 sm:mt-20 sm:pt-14" />
          <div className="mt-16 flex justify-center"><Link to="/work" className="btn-ink">See more of our work <Arrow /></Link></div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="wrap sec">
        <SectionHead kicker="How we work" title={<>We'd rather lose a sale than <span className="text-violet">oversell</span> you.</>}>
          It sounds odd for an agency. It's also why clients keep coming back and sending their friends.
        </SectionHead>
        <Principles />
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-ink sec text-paper">
        <div className="wrap">
          <SectionHead light kicker="Client words" title={<>Don't take<br />our word for it.</>} />
          <Reveal className="mt-16 grid gap-10 lg:grid-cols-12">
            <figure className="lg:col-span-8">
              <span className="display block text-[120px] leading-[.6] text-blaze" aria-hidden>“</span>
              <blockquote className="display mt-4 text-[clamp(28px,3.4vw,46px)] leading-[1.12] tracking-[-0.025em]">{TESTIMONIALS[1].quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-paper/70"><span className="h-px w-10 bg-paper/40" /><span><b className="text-paper">{TESTIMONIALS[1].name}</b>, {TESTIMONIALS[1].role}</span></figcaption>
            </figure>
          </Reveal>
          <div className="mt-16 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {TESTIMONIALS.filter((_, i) => i !== 1).map(t => (
              <figure key={t.name} className="flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-[20px] border border-paper/20 p-7 sm:w-auto">
                <blockquote className="text-[16px] leading-relaxed text-paper/85">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-paper/15 pt-4 text-sm"><b>{t.name}</b><br /><span className="text-paper/55">{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="wrap sec">
        <SectionHead kicker="The process" title={<>No surprises.<br />Six clear steps.</>}>
          You'll always know what's happening, what's next and what it costs. Payments are tied to milestones, not promises.
        </SectionHead>
        <ProcessSteps />
      </section>

      {/* AI NEWS */}
      <NewsStrip />

      {/* AWARDS */}
      <section className="border-y border-ink bg-lilac">
        <div className="wrap sec grid gap-10 lg:grid-cols-12 lg:items-center">
          <p className="display text-[clamp(36px,4.6vw,64px)] lg:col-span-5">Recognised for what we build.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {AWARDS.map(a => (
              <Reveal key={a.title} className="rounded-[18px] border border-ink bg-paper p-6">
                <span className="label text-mute">{a.year}</span>
                <p className="display mt-3 text-[26px] leading-tight tracking-[-0.02em]">{a.title}</p>
                <p className="mt-2 text-sm text-ink-2">{a.event}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap grid gap-12 pt-20 pb-10 sm:pt-28 sm:pb-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-mute">FAQ</p>
          <h2 className="display mt-4 text-[clamp(40px,5vw,72px)]">Fair questions.</h2>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold underline-swipe">Ask us anything else <ArrowUR /></Link>
        </div>
        <div className="lg:col-span-8"><Faq items={FAQS} /></div>
      </section>

      <CtaBand />
    </>
  );
}
