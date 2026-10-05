import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Copy: Vinicius's own Instagram carousel, slides 2, 3 and 6 (client-brief.md, "Carousel copy").
const COLUMNS = [
  {
    label: 'Renda alta',
    labelClass: 'text-ink-muted',
    body: (
      <>
        <span className="font-extrabold">Seu padrão de vida funciona</span>{' '}
        <span className="font-light">enquanto você continua produzindo.</span>
      </>
    ),
  },
  {
    label: 'Liberdade',
    labelClass: 'text-accent-ink',
    body: (
      <>
        <span className="font-extrabold">Suas escolhas</span>{' '}
        <span className="font-extrabold text-accent-ink">continuam possíveis</span>{' '}
        <span className="font-light">mesmo quando o ritmo muda.</span>
      </>
    ),
  },
];

const INTERVAL_MS = 3500;
const spring = { type: 'spring' as const, stiffness: 380, damping: 34 };

export default function Liberdade() {
  const reduceMotion = useReducedMotion();
  const [auto, setAuto] = useState(1);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = pinned ?? auto;

  // Auto-alternation: paused while a column is hovered/focused, off entirely under reduced motion.
  useEffect(() => {
    if (reduceMotion || pinned !== null) return;
    const id = window.setInterval(() => setAuto((i) => (i + 1) % COLUMNS.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, pinned]);

  const release = (i: number) => {
    setAuto(i);
    setPinned(null);
  };

  return (
    <section id="liberdade" className="bg-light py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Eyebrow, carousel signature */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink-muted">A confusão</p>
          <div className="mt-3 h-px w-10 bg-accent-ink" />
        </div>

        <h2 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Ganhar bem e ser livre não são a mesma <span className="text-accent-ink">coisa.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          Renda alta melhora o presente. Liberdade financeira muda o quanto da sua vida depende do seu
          próximo mês de trabalho.
        </p>

        {/* Comparison: two logics trading emphasis */}
        <div className="mt-12 grid items-start sm:mt-14 sm:grid-cols-2">
          {COLUMNS.map((col, i) => {
            const isActive = active === i;
            return (
              <button
                key={col.label}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setPinned(i)}
                onMouseLeave={() => release(i)}
                onFocus={() => setPinned(i)}
                onBlur={() => release(i)}
                onClick={() => setPinned(i)}
                className={`relative block h-full cursor-pointer px-2 py-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-ink/40 sm:px-10 sm:py-10 ${
                  i === 1 ? 'border-t border-line-light sm:border-t-0 sm:border-l' : ''
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="liberdade-panel"
                    transition={reduceMotion ? { duration: 0 } : spring}
                    className="absolute inset-0 -z-0 rounded-2xl bg-light-card shadow-[0_24px_60px_-30px_rgba(26,28,26,0.35)] sm:inset-2"
                    aria-hidden="true"
                  />
                )}
                <motion.span
                  className="relative block px-4 sm:px-0"
                  animate={{ opacity: reduceMotion || isActive ? 1 : 0.55 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
                >
                  <span className={`block text-xs font-semibold uppercase tracking-[0.3em] ${col.labelClass}`}>
                    {col.label}
                  </span>
                  <span className="mt-3 block h-0.5 w-12">
                    {isActive && (
                      <motion.span
                        layoutId="liberdade-bar"
                        transition={reduceMotion ? { duration: 0 } : spring}
                        className="block h-full w-full rounded-full bg-accent-ink"
                      />
                    )}
                  </span>
                  <span className="mt-6 block font-display text-2xl leading-[1.15] tracking-tight text-ink sm:text-3xl lg:text-4xl">
                    {col.body}
                  </span>
                </motion.span>
              </button>
            );
          })}
        </div>

        <p className="mt-10 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Conforto e liberdade não são sinônimos.
        </p>

        {/* Closing statement, carousel slide 6 */}
        <div className="mt-14 border-t border-line-light pt-12 sm:mt-16 sm:pt-14">
          <p className="max-w-4xl font-display text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            <span className="block font-extrabold">A pergunta não é quanto você ganha.</span>
            <span className="mt-2 block font-light">
              É quanto da sua vida depende de{' '}
              <span className="font-bold text-accent-ink">continuar ganhando.</span>
            </span>
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Quando o patrimônio sustenta escolhas, ele começa a comprar liberdade.
          </p>
        </div>

        {/* Carousel footer-rule signature */}
        <div className="mt-14 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink-muted" aria-hidden="true">
          <span>Vinícius Mariano</span>
          <span className="h-px flex-1 bg-line-light" />
          <span>01/05</span>
        </div>
      </div>
    </section>
  );
}
