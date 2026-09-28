import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

// Mechanism: identification checklist with an auto-cycling highlight.
// One item at a time "lights up" (check fills with accent via spring, card
// lifts, a shared-layout blush glow glides behind it, text goes muted -> ink).
// Hover/click/focus selects an item and pauses the cycle for ~6s.

const ITENS = [
  'Quer começar a correr, mas não sabe por onde começar sem se machucar.',
  'Já corre e quer somar treino de força para correr com mais firmeza.',
  'Sente que perdeu força e disposição e quer recuperar autonomia no dia a dia.',
  'Procura um treino pensado para o corpo depois dos 40, não uma planilha genérica.',
  'Quer envelhecer se movimentando, com saúde e qualidade de vida.',
];

const CYCLE_MS = 2600;
const PAUSE_MS = 6000;

const pad = (n: number) => String(n).padStart(2, '0');

export default function ParaQuem() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const pausedUntil = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setActive((a) => (a + 1) % ITENS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const select = (i: number) => {
    pausedUntil.current = Date.now() + PAUSE_MS;
    setActive(i);
  };

  return (
    // overflow-clip (not hidden) so the glow is clipped without breaking the sticky left column
    <section id="para-quem" className="relative overflow-clip bg-bg py-16 text-text sm:py-20">
      {/* Ambient blush light, drifting slowly behind the heading column */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--color-blush),transparent)] opacity-60 blur-3xl"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading + closing line, sticky on desktop */}
        <div className="lg:sticky lg:top-[calc(var(--nav-height,4.5rem)+2.5rem)] lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Para quem é</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-text sm:text-5xl lg:text-6xl">
            Feito para você que sente que <em className="italic">chegou a hora</em> de cuidar de si.
          </h2>

          {!reduce && (
            <div className="mt-8 flex items-end gap-3" aria-hidden>
              <span className="relative inline-block overflow-hidden font-display text-7xl leading-[1.1] text-text sm:text-8xl">
                <span className="invisible">00</span>
                <AnimatePresence initial={false}>
                  <motion.span
                    key={active}
                    className="absolute inset-0"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  >
                    {pad(active + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="mb-3 font-display text-2xl italic text-text-muted sm:mb-4">de {pad(ITENS.length)}</span>
            </div>
          )}

          <p className="mt-8 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
            Se você se reconheceu em pelo menos uma dessas frases,{' '}
            <span className="font-semibold text-text">o Método C40 foi pensado para você.</span>
          </p>
        </div>

        {/* Right: the five identification cards */}
        <ol className="isolate flex flex-col gap-4 lg:col-span-7">
          {ITENS.map((texto, i) => {
            const lit = reduce || i === active;
            return (
              <li key={texto} className="relative">
                {!reduce && i === active && (
                  <motion.div
                    layoutId="paraquem-glow"
                    aria-hidden
                    className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--color-blush),transparent)] blur-2xl"
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{
                      layout: { type: 'spring', stiffness: 180, damping: 26 },
                      opacity: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  />
                )}
                <motion.button
                  type="button"
                  aria-pressed={lit}
                  onClick={() => select(i)}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  animate={{ y: lit && !reduce ? -6 : 0, scale: lit && !reduce ? 1.015 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`flex w-full cursor-pointer items-start gap-4 rounded-3xl border p-5 text-left transition-[background-color,border-color,box-shadow] duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-5 sm:p-6 ${
                    lit
                      ? 'border-blush bg-bg shadow-xl shadow-text/10'
                      : 'border-text/10 bg-surface/60 shadow-none'
                  }`}
                >
                  <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-text/15">
                    <motion.span
                      aria-hidden
                      className="absolute -inset-px rounded-full bg-accent"
                      initial={false}
                      animate={{ scale: lit ? 1 : 0 }}
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 18 }}
                    />
                    <Check
                      aria-hidden
                      size={18}
                      strokeWidth={3}
                      className={`relative transition-colors duration-300 ${lit ? 'text-accent-fg' : 'text-text-muted/50'}`}
                    />
                  </span>
                  <span className="flex-1">
                    <span className="mb-1 block font-display text-lg italic text-text-muted">{pad(i + 1)}</span>
                    <span
                      className={`block text-base leading-relaxed transition-colors duration-500 sm:text-lg ${
                        lit ? 'text-text' : 'text-text-muted'
                      }`}
                    >
                      {texto}
                    </span>
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
