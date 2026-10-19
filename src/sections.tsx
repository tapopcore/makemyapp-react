import { useEffect, useRef, type ReactNode } from "react";
import { PRINCIPLES, PROCESS } from "./content";
import { Reveal } from "./ui";

/* ------------------------------------------------------------------ */
/* Process: grid on tablet/desktop, scroll-stacking cards on phones.   */
/* Each card pins under the header; the next one slides over it while  */
/* the one behind eases back (scale + dim).                            */
/* ------------------------------------------------------------------ */
const STACK_TOP = 84;   // just below the 68px header
const STACK_STEP = 14;  // how much of each earlier card peeks out

export function ProcessSteps() {
  const ref = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const ol = ref.current; if (!ol) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slots = [...ol.querySelectorAll<HTMLElement>("[data-slot]")];
    const cards = slots.map(s => s.querySelector<HTMLElement>("[data-card]")!);
    let raf = 0;

    const reset = () => cards.forEach(c => { c.style.transform = ""; c.style.filter = ""; });
    const update = () => {
      raf = 0;
      if (!mq.matches || reduce) return reset();
      for (let i = 0; i < slots.length; i++) {
        const next = slots[i + 1];
        if (!next) { cards[i].style.transform = ""; cards[i].style.filter = ""; continue; }
        const a = slots[i].getBoundingClientRect(), b = next.getBoundingClientRect();
        const covered = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        cards[i].style.transform = `scale(${1 - 0.07 * covered})`;
        cards[i].style.filter = `brightness(${1 - 0.14 * covered})`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); mq.removeEventListener("change", onScroll); };
  }, []);

  return (
    <ol ref={ref} className="mt-16 flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {PROCESS.map((p, i) => (
        <li key={p.step} data-slot className="max-sm:sticky" style={{ top: STACK_TOP + i * STACK_STEP }}>
          <div data-card className="flex h-full min-h-[230px] origin-top flex-col rounded-[22px] border border-ink bg-paper p-7 will-change-transform max-sm:shadow-[0_-10px_30px_-14px_rgba(18,18,18,.35)] sm:min-h-0 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="display text-[64px] leading-none text-violet">{String(i + 1).padStart(2, "0")}</span>
              <span className="label text-mute">Step {i + 1} of {PROCESS.length}</span>
            </div>
            <h3 className="display mt-6 text-[28px] tracking-[-0.03em]">{p.step}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{p.body}</p>
            {/* progress ticks */}
            <div className="mt-auto flex gap-1.5 pt-6" aria-hidden>
              {PROCESS.map((_, k) => <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-violet" : "bg-ink/10"}`} />)}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* How we work: six cards, one system. Same paper card for all; the    */
/* colour lives in the icon tile, cycling violet / orange / ink.       */
/* ------------------------------------------------------------------ */
const I = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden>{children}</svg>
);
const ICONS = [
  <I key="0"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></I>,
  <I key="1"><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="7.5" r="1.5" /></I>,
  <I key="2"><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></I>,
  <I key="3"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 15 6 12c1-4 5-9 13-9 0 8-5 12-9 13Z" /><circle cx="15" cy="9" r="1.6" /></I>,
  <I key="4"><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><circle cx="17.5" cy="9" r="2.4" /><path d="M16.5 14.6c2.6.2 4 1.9 4.5 4.4" /></I>,
  <I key="5"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" /></I>,
];
const TILE = ["bg-violet text-paper", "bg-blaze text-ink", "bg-ink text-paper"];

export function Principles() {
  return (
    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PRINCIPLES.map((p, i) => (
        <Reveal key={p.title} as="article" delay={(i % 3) * 90}
          className="group relative flex flex-col rounded-[22px] border border-ink bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8">
          <div className="flex items-start justify-between">
            <span className={`grid size-14 place-items-center rounded-2xl border border-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform duration-300 group-hover:-rotate-6 ${TILE[i % 3]}`}>{ICONS[i]}</span>
            <span className="label text-mute">0{i + 1}</span>
          </div>
          <h3 className="display mt-8 text-[28px] leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.body}</p>
        </Reveal>
      ))}
    </div>
  );
}
