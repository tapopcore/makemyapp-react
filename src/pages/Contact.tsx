import { useEffect, useState, type FormEvent } from "react";
import { FAQS, PILLARS, SERVICES, SITE, wa } from "../content";
import { Arrow, Faq, PageHero, Reveal, WaIcon, track } from "../ui";

type Status = "idle" | "sending" | "sent" | "fallback";
const BUDGETS = ["Under ₹25,000", "₹25,000 to ₹1 lakh", "₹1 lakh to ₹3 lakh", "Above ₹3 lakh", "Not sure yet"];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // The form backend sleeps when idle. Wake it as soon as someone opens this page.
  useEffect(() => { fetch(SITE.formEndpoint.replace("/connect/connect", "/"), { mode: "no-cors" }).catch(() => {}); }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!v.name?.trim()) errs.name = "Please add your name";
    if (!/^\S+@\S+\.\S+$/.test(v.email ?? "")) errs.email = "Please add a valid email";
    if (!v.phone?.trim() || v.phone.replace(/\D/g, "").length < 10) errs.phone = "Please add a phone or WhatsApp number";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const text = `Hi MakeMyApp, I'm ${v.name}${v.company ? ` from ${v.company}` : ""}.\nInterested in: ${v.service || "Not sure"}\nBudget: ${v.budget || "Not sure"}\n${v.message ? `\n${v.message}\n` : ""}\nEmail: ${v.email}\nPhone: ${v.phone}`;
    setSummary(text);
    setStatus("sending");
    track("form_submit", v.service);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: ctrl.signal,
        body: JSON.stringify({ name: v.name, email: v.email, phone: v.phone, subject: `${v.service || "General"} | ${v.budget || "Budget not set"}${v.company ? ` | ${v.company}` : ""}`, message: v.message || "(no message)" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent"); track("form_success");
    } catch {
      setStatus("fallback"); track("form_fallback");
    } finally { clearTimeout(timer); }
  }

  const field = "mt-2 w-full rounded-xl border border-ink bg-paper px-4 py-3.5 text-[16px] outline-none transition focus:bg-white focus:ring-4 focus:ring-violet/20";

  return (
    <>
      <PageHero kicker="Contact" title={<>Let's build<br />something.</>}>
        Pick whatever's easiest. We reply to every message within one working day.
      </PageHero>

      <section className="wrap grid gap-4 sec-sm md:grid-cols-3">
        <a href={SITE.calendly} target="_blank" rel="noopener" onClick={() => track("book_call", "contact_card")} className="group rounded-[22px] border border-ink bg-violet p-8 text-paper transition-transform hover:-translate-y-1">
          <p className="label text-paper/60">Fastest</p>
          <p className="display mt-8 text-[38px] tracking-[-0.03em]">Book a free 30 min call</p>
          <p className="mt-2 text-paper/75">Pick a slot that suits you.</p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold">Open calendar <Arrow /></span>
        </a>
        <a href={wa("Hi MakeMyApp, I'd like to discuss a project.")} target="_blank" rel="noopener" onClick={() => track("whatsapp", "contact_card")} className="group rounded-[22px] border border-ink bg-[#25D366] p-8 transition-transform hover:-translate-y-1">
          <p className="label text-ink/60">Quick questions</p>
          <p className="display mt-8 text-[38px] tracking-[-0.03em]">WhatsApp us</p>
          <p className="mt-2 text-ink/75">{SITE.phone}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold"><WaIcon /> Start chat</span>
        </a>
        <div className="rounded-[22px] border border-ink p-8">
          <p className="label text-mute">Old school</p>
          <a href={`mailto:${SITE.email}`} className="display mt-8 block break-all text-[30px] tracking-[-0.03em] underline-swipe">{SITE.email}</a>
          <a href={`tel:+${SITE.phoneRaw}`} className="mt-2 block text-ink-2 underline-swipe">{SITE.phone}</a>
          <p className="mt-6 text-sm text-mute">{SITE.hours}</p>
        </div>
      </section>

      <section className="wrap grid gap-12 sec-sm lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-[clamp(40px,4.6vw,64px)]">Or tell us here.</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-2">Share a few details and we'll come back with honest advice and a rough price range, before any call if you prefer.</p>
          <ul className="mt-8 space-y-3 text-[15px]">
            {["We reply within one working day", "No spam, no sales sequence", "We'll say so if we're not the right fit"].map(t => <li key={t} className="flex gap-3"><span className="mt-2 size-2 shrink-0 rotate-45 bg-blaze" />{t}</li>)}
          </ul>
        </div>

        <Reveal className="lg:col-span-8">
          {status === "sent" ? (
            <div className="rounded-[22px] border border-ink bg-lilac p-10" role="status">
              <p className="display text-[44px]">Got it. Thank you!</p>
              <p className="mt-3 text-[17px] text-ink-2">We'll get back to you within one working day. Want a faster answer? Message us on WhatsApp.</p>
              <a href={wa(summary)} target="_blank" rel="noopener" className="btn-ink mt-6"><WaIcon /> Continue on WhatsApp</a>
            </div>
          ) : status === "fallback" ? (
            <div className="rounded-[22px] border border-ink bg-peach p-10" role="alert">
              <p className="display text-[40px]">Our form is taking a moment.</p>
              <p className="mt-3 text-[17px] text-ink-2">Your details are ready to send. Tap below and they'll open in WhatsApp, already filled in. Or email us directly.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={wa(summary)} target="_blank" rel="noopener" onClick={() => track("whatsapp", "form_fallback")} className="btn-ink"><WaIcon /> Send on WhatsApp</a>
                <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(summary)}`} className="btn-line">Send by email</a>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 rounded-[22px] border border-ink p-6 sm:grid-cols-2 sm:p-10">
              <label className="text-sm font-semibold">Your name *<input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />{errors.name && <span className="mt-1 block text-[13px] font-normal text-[#c2410c]">{errors.name}</span>}</label>
              <label className="text-sm font-semibold">Company or brand<input name="company" autoComplete="organization" className={field} /></label>
              <label className="text-sm font-semibold">Email *<input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />{errors.email && <span className="mt-1 block text-[13px] font-normal text-[#c2410c]">{errors.email}</span>}</label>
              <label className="text-sm font-semibold">Phone / WhatsApp *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} />{errors.phone && <span className="mt-1 block text-[13px] font-normal text-[#c2410c]">{errors.phone}</span>}</label>
              <label className="text-sm font-semibold">What do you need?
                <select name="service" className={field} defaultValue="">
                  <option value="">Not sure yet</option>
                  {PILLARS.map(p => <optgroup key={p.name} label={p.name}>{SERVICES.filter(s => s.pillar === p.name).map(s => <option key={s.name}>{s.name}</option>)}</optgroup>)}
                </select>
              </label>
              <label className="text-sm font-semibold">Budget
                <select name="budget" className={field} defaultValue=""><option value="">Choose a range</option>{BUDGETS.map(b => <option key={b}>{b}</option>)}</select>
              </label>
              <label className="text-sm font-semibold sm:col-span-2">Tell us a bit more<textarea name="message" rows={5} className={field} placeholder="What are you building, and by when?" /></label>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-mute">By sending this you agree to our privacy policy. We never share your details.</p>
                <button disabled={status === "sending"} className="btn-ink disabled:opacity-60">{status === "sending" ? "Sending..." : <>Send message <Arrow /></>}</button>
              </div>
            </form>
          )}
        </Reveal>
      </section>

      <section className="wrap grid gap-8 sec-sm lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-mute">Visit us</p>
          <p className="display mt-4 text-[32px] leading-tight tracking-[-0.03em]">{SITE.address}</p>
          <p className="mt-4 text-ink-2">{SITE.hours}. Please book before visiting.</p>
          <a href="https://maps.google.com/?q=Kundan+Mansion+Asaf+Ali+Road+Daryaganj+Delhi" target="_blank" rel="noopener" className="btn-line mt-6">Get directions <Arrow /></a>
        </div>
        <div className="overflow-hidden rounded-[22px] border border-ink lg:col-span-8">
          <iframe title="MakeMyApp office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[360px] w-full grayscale"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6398181016593!2d77.23912437780204!3d28.649583620557774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfce08f8e147f%3A0x1b1829897b44db45!2s2-A%2C%202-A%2C%20Daryaganj%2C%20Delhi%2C%20110002!5e1!3m2!1sen!2sin!4v1752129463692!5m2!1sen!2sin" />
        </div>
      </section>

      <section className="wrap pt-10 pb-20 sm:pt-14 sm:pb-28">
        <h2 className="display text-[clamp(36px,4.4vw,60px)]">Before you ask</h2>
        <div className="mt-8"><Faq items={FAQS} /></div>
      </section>
    </>
  );
}
