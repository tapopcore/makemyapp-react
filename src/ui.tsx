import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { META, SITE, wa } from "./content";

/* ---------- tracking ---------- */
export const track = (action: string, label?: string) => {
  try { ReactGA.event({ category: "engagement", action, label }); } catch { /* ignore */ }
};

/* ---------- reveal on scroll ---------- */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.animationDelay = `${delay}ms`; el.classList.add("in"); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [delay]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag ref={ref as any} className={`reveal ${className}`}>{children}</Tag>;
}

/* ---------- logo ---------- */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/img/logo-mark.png" alt="" width={34} height={34} className="size-[34px] rounded-full ring-1 ring-ink/10" />
      <span className={`display text-[22px] leading-none tracking-[-0.04em] ${light ? "text-paper" : "text-ink"}`}>
        make<span className="text-violet">my</span><span className="text-blaze">app</span>
      </span>
    </span>
  );
}

/* ---------- arrows ---------- */
export const Arrow = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUR = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const WaIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.41 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.23.54.77 1.88.84 2.02.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.13.25.09 1.59.75 1.86.88.27.14.45.2.52.32.07.11.07.66-.17 1.33Z" /></svg>
);

/* ---------- per-route title/meta on the client ---------- */
function useRouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const key = pathname.replace(/\/$/, "") || "/";
    const m = META[key] ?? META["/404"];
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
    window.scrollTo(0, 0);
    try { ReactGA.send({ hitType: "pageview", page: pathname }); } catch { /* ignore */ }
  }, [pathname]);
}

/* ---------- nav ---------- */
const NAV = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-ink/15 bg-paper/90 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="wrap flex h-[68px] items-center justify-between">
        <Link to="/" aria-label="MakeMyApp home"><Logo /></Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `underline-swipe text-[15px] font-medium ${isActive ? "text-violet" : ""}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={SITE.calendly} target="_blank" rel="noopener" onClick={() => track("book_call", "nav")} className="btn-ink hidden !px-5 !py-2.5 text-sm sm:inline-flex">Book a free call</a>
          <button onClick={() => setOpen(o => !o)} className="grid size-11 place-items-center rounded-full border border-ink md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="wrap h-[calc(100dvh-68px)] pb-8 pt-6 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[{ to: "/", label: "Home" }, ...NAV].map((n, i) => (
              <Link key={n.to} to={n.to} className="display flex items-baseline justify-between border-b border-ink/20 py-4 text-[44px]">
                {n.label}<span className="label text-mute">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <a href={SITE.calendly} target="_blank" rel="noopener" className="btn-ink" onClick={() => track("book_call", "menu")}>Book a free call</a>
            <a href={wa("Hi MakeMyApp, I'd like to discuss a project.")} target="_blank" rel="noopener" className="btn-line" onClick={() => track("whatsapp", "menu")}><WaIcon /> WhatsApp us</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label text-paper/50">Got a project in mind?</p>
            <a href={SITE.calendly} target="_blank" rel="noopener" onClick={() => track("book_call", "footer")} className="group display mt-4 block text-[clamp(48px,8vw,112px)] hover:text-blaze transition-colors">
              Let's talk<span className="inline-block transition-transform group-hover:translate-x-3">.</span>
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.calendly} target="_blank" rel="noopener" className="btn-blaze">Book a free 30 min call <Arrow /></a>
              <a href={wa("Hi MakeMyApp, I'd like to discuss a project.")} target="_blank" rel="noopener" className="btn border border-paper/30 hover:bg-paper hover:text-ink" onClick={() => track("whatsapp", "footer")}><WaIcon /> WhatsApp</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="label text-paper/50">Pages</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {[["/", "Home"], ["/services", "Services"], ["/work", "Work"], ["/about", "About"], ["/contact", "Contact"]].map(([to, l]) => <li key={to}><Link className="underline-swipe" to={to}>{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="label text-paper/50">Services</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {[["shopify-development", "Shopify stores"], ["website-development", "Websites"], ["app-development", "Apps & software"], ["branding", "Branding"], ["performance-marketing", "Performance marketing"], ["ai-automation", "AI & automation"]].map(([s, l]) => <li key={s}><Link className="underline-swipe" to={`/services/${s}`}>{l}</Link></li>)}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="label text-paper/50">Reach us</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                <li><a className="underline-swipe" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li><a className="underline-swipe" href={`tel:+${SITE.phoneRaw}`}>{SITE.phone}</a></li>
                <li><a className="underline-swipe" href={SITE.instagram} target="_blank" rel="noopener">Instagram</a></li>
                <li className="text-paper/60 text-sm leading-relaxed">{SITE.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p className="display whitespace-nowrap text-center text-[clamp(56px,15.2vw,214px)] leading-[.8] text-paper/[.06]">makemyapp</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-paper/15 pt-6 text-[13px] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MakeMyApp is a brand of {SITE.legal}. GSTIN {SITE.gstin}</p>
          <div className="flex gap-5"><Link to="/privacy-policy" className="underline-swipe">Privacy policy</Link><a href={SITE.qviq} target="_blank" rel="noopener" className="underline-swipe">Digital card</a></div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating WhatsApp ---------- */
function WaFloat() {
  return (
    <a href={wa("Hi MakeMyApp, I'd like to discuss a project.")} target="_blank" rel="noopener" onClick={() => track("whatsapp", "float")}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full border border-ink bg-[#25D366] text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
      aria-label="Chat with us on WhatsApp">
      <WaIcon className="size-7" />
    </a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  useRouteMeta();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <WaFloat />
    </>
  );
}

/* ---------- shared blocks ---------- */
export function SectionHead({ kicker, title, children, light = false }: { kicker: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className={`label ${light ? "text-paper/60" : "text-mute"}`}>{kicker}</p>
        <h2 className="display mt-4 text-[clamp(40px,6.2vw,88px)]">{title}</h2>
      </div>
      {children && <div className={`lg:col-span-5 text-[17px] leading-relaxed ${light ? "text-paper/75" : "text-ink-2"}`}>{children}</div>}
    </div>
  );
}

export function PageHero({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="hero-top wrap pb-10 sm:pb-14">
      <div className="hero-in">
        <p className="label text-mute">{kicker}</p>
        <h1 className="display mt-5 max-w-[14ch] text-[clamp(52px,10vw,148px)]">{title}</h1>
        {children && <div className="mt-8 max-w-2xl text-[19px] leading-relaxed text-ink-2">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Have something in mind?", line = "Tell us what you're building. We'll tell you honestly what it takes, what it costs, and whether we're the right fit." }: { title?: string; line?: string }) {
  return (
    <section className="wrap pt-10 pb-20 sm:pt-14 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-[28px] border border-ink bg-violet px-6 py-14 text-paper sm:px-14 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[380px] rounded-full bg-blaze/90 blur-[2px]" />
        <div aria-hidden className="pointer-events-none absolute -right-10 top-10 size-[240px] rounded-full border border-paper/30" style={{ animation: "spin-slow 30s linear infinite" }} />
        <div className="relative max-w-3xl">
          <h2 className="display text-[clamp(40px,6vw,84px)]">{title}</h2>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-paper/85">{line}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={SITE.calendly} target="_blank" rel="noopener" onClick={() => track("book_call", "cta_band")} className="btn-paper">Book a free 30 min call <Arrow /></a>
            <a href={wa("Hi MakeMyApp, I'd like to discuss a project.")} target="_blank" rel="noopener" onClick={() => track("whatsapp", "cta_band")} className="btn border border-paper/50 hover:bg-paper hover:text-ink"><WaIcon /> WhatsApp us</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-ink">
      {items.map((f, i) => (
        <details key={i} className="group border-b border-ink py-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <span className="display text-[clamp(22px,2.6vw,32px)] leading-tight tracking-[-0.02em]">{f.q}</span>
            <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-ink transition-transform group-open:rotate-45" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function BrowserShot({ img, name, priority = false, sizes = "(min-width:1024px) 50vw, 100vw" }: { img: string; name: string; priority?: boolean; sizes?: string }) {
  return (
    <div className="browser">
      <div className="browser-bar"><i /><i /><i /><span className="ml-2 truncate font-mono text-[11px] text-mute">{name.toLowerCase().replace(/\s+/g, "")}</span></div>
      <div className="aspect-[16/8.2] overflow-hidden bg-paper-2">
        <img src={`/img/work/${img}.webp`} srcSet={`/img/work/${img}-sm.webp 640w, /img/work/${img}.webp 1200w`} sizes={sizes}
          alt={`${name} website built by MakeMyApp`} loading={priority ? "eager" : "lazy"} decoding="async" width={1200} height={570}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
    </div>
  );
}
