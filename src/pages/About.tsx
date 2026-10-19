import { Link } from "react-router-dom";
import { AWARDS, PRINCIPLES, STACK, TEAM } from "../content";
import { ArrowUR, BrowserShot, CtaBand, PageHero, Reveal } from "../ui";

export default function About() {
  return (
    <>
      <PageHero kicker="About us" title={<>Builders first.<br /><span className="text-violet">Agency second.</span></>} />

      <section className="wrap grid gap-12 pb-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-6 text-[19px] leading-relaxed text-ink-2">
            <p className="display text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-0.025em] text-ink">
              We kept meeting good businesses stuck with slow developers, confusing tech jargon, and agencies that sold them more than they needed.
            </p>
            <p>We'd been on the other side of that table. Before MakeMyApp, we built and scaled our own products, including Qviq, a website platform paired with NFC smart cards. We learnt what actually moves a business forward, and what's just noise.</p>
            <p>So we built the agency we wished we could hire. One in-house team of designers, developers and marketers in Delhi, working on your brand, your store, your app and your ads together. Prices up front. Honest advice, even when it means a smaller invoice.</p>
            <p>That's taken us past 300 projects for brands like Athlab, Deciwood, DM Associates, Wedhaven and Shararat, and two startup awards along the way. Most of that work is under NDA, so you'll only see a slice of it here.</p>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5">
          <a href="https://qviq.io/" target="_blank" rel="noopener" className="group block">
            <BrowserShot img="qviq" name="qviq.io" />
            <p className="mt-4 flex items-center gap-2 font-semibold">Qviq, our own product <ArrowUR /></p>
            <p className="text-[15px] text-ink-2">We use what we sell. Qviq runs on the same stack and thinking we bring to client work.</p>
          </a>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="bg-ink py-24 text-paper">
        <div className="wrap">
          <p className="label text-paper/60">The people you'll work with</p>
          <h2 className="display mt-4 text-[clamp(44px,6vw,88px)]">Meet the team.</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} as="article">
                <div className="overflow-hidden rounded-[20px] border border-paper/20 bg-paper-2">
                  <img src={`/img/team/${t.img}.webp`} alt={t.name} width={480} height={480} loading="lazy" className="aspect-square w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
                </div>
                <h3 className="display mt-6 text-[34px] tracking-[-0.03em]">{t.name}</h3>
                <p className="label mt-1 text-blaze">{t.role}</p>
                <p className="mt-4 text-[16px] leading-relaxed text-paper/75">“{t.quote}”</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {Object.entries(t.links).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener" className="chip border-paper/25 hover:bg-paper hover:text-ink">{k}</a>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="wrap py-24">
        <h2 className="display text-[clamp(40px,5.6vw,80px)]">What we stand by.</h2>
        <div className="mt-12 grid gap-x-10 border-t border-ink sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80} className="border-b border-ink py-8">
              <div className="flex gap-6">
                <span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="display text-[28px] tracking-[-0.03em]">{p.title}</h3><p className="mt-2 text-[16px] leading-relaxed text-ink-2">{p.body}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AWARDS + STACK */}
      <section className="wrap grid gap-10 pb-16 lg:grid-cols-2">
        <div className="rounded-[22px] border border-ink bg-blaze p-8 sm:p-10">
          <p className="label">Awards</p>
          <ul className="mt-6 space-y-6">
            {AWARDS.map(a => <li key={a.title}><p className="display text-[30px] leading-tight tracking-[-0.03em]">{a.title}</p><p className="mt-1">{a.event}, {a.year}</p></li>)}
          </ul>
        </div>
        <div className="rounded-[22px] border border-ink p-8 sm:p-10">
          <p className="label text-mute">What we build with</p>
          <ul className="mt-6 flex flex-wrap gap-2">{STACK.map(s => <li key={s} className="chip !px-4 !py-2 !text-sm">{s}</li>)}</ul>
          <p className="mt-6 text-[15px] text-ink-2">We pick the tech that suits your project and budget, not whatever is trending. <Link to="/services" className="font-semibold underline-swipe">See services</Link></p>
        </div>
      </section>

      <CtaBand title="Work with us." />
    </>
  );
}
