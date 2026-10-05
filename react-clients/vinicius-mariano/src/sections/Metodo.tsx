import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

const CALENDLY = 'https://calendly.com/vinimarianofranco';
const STEP_SECONDS = 5.5;

// The three pillars exactly as listed in his Instagram bio, in that order.
// Descriptions describe each pillar in general terms only: no returns, no
// numbers, no invented steps or deliverables.
const PILLARS = [
  {
    name: 'Clareza',
    text: 'Entender para onde vai a sua renda, o que o seu patrimônio sustenta hoje e o que você quer que ele sustente daqui para frente. Toda decisão começa por esse retrato honesto.',
  },
  {
    name: 'Alocação consciente',
    text: 'Coerência entre os seus investimentos e os seus objetivos de vida. A carteira segue o seu plano e o seu momento, não o produto da moda.',
  },
  {
    name: 'Eficiência tributária',
    text: 'Estruturar patrimônio e investimentos para pagar o imposto devido, dentro da lei, e não mais do que isso. Imposto mal planejado também consome patrimônio.',
  },
] as const;

const pad = (n: number) => String(n).padStart(2, '0');

function PillarBody({ index }: { index: number }) {
  const p = PILLARS[index];
  return (
    <>
      <span className="block font-display text-7xl font-light leading-none tracking-tight text-accent-ink tabular-nums sm:text-8xl">
        {pad(index + 1)}
      </span>
      <h3 className="mt-5 font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-3xl">
        {p.name}
      </h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">{p.text}</p>
    </>
  );
}

export default function Metodo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const progress = useMotionValue(0);
  const stepperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(stepperRef, { amount: 0.35 });

  const goTo = (i: number) => {
    progress.set(0);
    setActive(i);
  };

  // Fill the active step's bar, then advance (loop). Resumes from where it
  // stopped after a hover/focus pause; only runs while the stepper is on screen.
  useEffect(() => {
    if (reduce || hovered || focused || !inView) return;
    const controls = animate(progress, 1, {
      duration: STEP_SECONDS * (1 - progress.get()),
      ease: 'linear',
      onComplete: () => {
        progress.set(0);
        setActive((a) => (a + 1) % PILLARS.length);
      },
    });
    return () => controls.stop();
  }, [active, hovered, focused, inView, reduce, progress]);

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + PILLARS.length) % PILLARS.length;
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="metodo" className="relative overflow-hidden bg-light py-16 text-ink sm:py-20">
      {/* Decorative editorial watermark, the method's own name */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-4 select-none font-display text-[9rem] font-extrabold leading-none tracking-tighter text-ink/[0.035] sm:text-[14rem] lg:text-[18rem]"
      >
        CAFÉ
      </span>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Método CAFÉ</p>
            <span aria-hidden className="mt-3 block h-px w-10 bg-accent-ink" />

            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              <span className="block font-extrabold">Foco no cliente.</span>
              <span className="block font-light">Estrutura antes de</span>
              <span className="block font-extrabold text-accent-ink">qualquer produto.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Estruturação patrimonial com foco em governança, coerência de alocação e proteção de longo prazo.
              Governança patrimonial e comportamental: as decisões sobre o seu dinheiro partem da sua vida, e o
              Método CAFÉ organiza esse trabalho em três pilares.
            </p>

            <blockquote className="mt-8 border-l border-line-light pl-5">
              <p className="font-display text-lg leading-snug text-ink sm:text-xl">
                <span className="font-bold">1 assessor com foco no cliente</span>
                <span className="font-light text-ink-muted"> vs 30 assessores com foco no produto.</span>
              </p>
              <footer className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-muted">Vini Mariano, no Instagram</footer>
            </blockquote>

            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex cursor-pointer items-center rounded-full bg-cta px-7 py-3.5 text-sm font-semibold text-cta-fg transition-colors hover:bg-cta-hover"
            >
              Agendar uma conversa
            </a>
          </div>

          <div
            ref={stepperRef}
            className="min-w-0 rounded-3xl border border-line-light bg-light-card p-5 shadow-[0_24px_60px_-30px_rgba(26,28,26,0.25)] sm:p-8"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
            }}
          >
            {/* UNKNOWN: meaning of each letter of CAFÉ; only the 3 pillars from his Instagram bio are shown */}
            <div
              role="tablist"
              aria-label="Pilares do Método CAFÉ"
              className="grid grid-cols-3 gap-3 sm:gap-5"
              onKeyDown={onTabKey}
            >
              {PILLARS.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.name}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`metodo-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="metodo-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goTo(i)}
                    className={`flex cursor-pointer flex-col justify-between text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span>
                      <span className="block font-display text-xs tracking-[0.2em] tabular-nums">{pad(i + 1)}</span>
                      <span className="mt-1.5 block font-display text-[13px] font-bold leading-tight sm:text-base">
                        {p.name}
                      </span>
                    </span>
                    <span className="mt-4 block h-0.5 w-full overflow-hidden rounded-full bg-line-light">
                      <motion.span
                        className="block h-full origin-left bg-accent-ink"
                        style={{ scaleX: isActive ? (reduce ? 1 : progress) : 0 }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Every pillar is stacked invisibly in the same grid cell so the
                panel always reserves the tallest one's height: no layout jump. */}
            <div
              id="metodo-panel"
              role="tabpanel"
              aria-labelledby={`metodo-tab-${active}`}
              className="mt-10 grid"
            >
              {PILLARS.map((p, i) => (
                <div key={p.name} aria-hidden className="invisible [grid-area:1/1]">
                  <PillarBody index={i} />
                </div>
              ))}
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="[grid-area:1/1]"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PillarBody index={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink-muted">
          <span>Vinícius Mariano</span>
          <span aria-hidden className="h-px flex-1 bg-line-light" />
          <span className="tabular-nums">03/05</span>
        </div>
      </div>
    </section>
  );
}
