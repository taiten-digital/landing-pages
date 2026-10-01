import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AVALIACOES, GOOGLE, waLink } from '../content';

const ROTATE_MS = 6000;
const TICK_MS = 50;

function Stars() {
  return (
    <div className="flex gap-1 text-star" role="img" aria-label="5 estrelas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Quote({ index }: { index: number }) {
  const r = AVALIACOES[index];
  const short = r.texto.length < 30;
  return (
    <figure className="flex h-full flex-col justify-between gap-8">
      <div>
        <span
          aria-hidden="true"
          className="font-display block text-7xl leading-none text-accent-ink/40 sm:text-8xl"
        >
          &ldquo;
        </span>
        <blockquote
          className={`font-display text-ink ${
            short
              ? 'text-4xl leading-tight sm:text-6xl'
              : 'text-2xl leading-snug sm:text-4xl'
          }`}
        >
          {r.texto}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/10 font-display text-xl font-semibold text-ink"
        >
          {r.nome.charAt(0).toUpperCase()}
        </span>
        <span>
          <span className="block text-lg font-semibold text-ink">{r.nome}</span>
          <span className="block text-sm text-ink-muted">Avaliação no Google</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Avaliacoes() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setProgress((p) => p + TICK_MS / ROTATE_MS);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  useEffect(() => {
    if (progress >= 1) {
      setActive((a) => (a + 1) % AVALIACOES.length);
      setProgress(0);
    }
  }, [progress]);

  const pick = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  return (
    <section id="avaliacoes" className="relative overflow-hidden bg-light py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-ink">
              Avaliações
            </p>
            <h2 className="font-display mt-2 text-3xl text-ink sm:text-5xl">
              Quem já foi atendido, conta.
            </h2>
          </div>
          <div className="flex flex-col gap-1 sm:items-end">
            <Stars />
            <p className="text-lg font-semibold text-ink">Nota {GOOGLE.nota} no Google</p>
          </div>
        </div>

        <div
          className="mt-10 rounded-3xl bg-light-card p-6 shadow-[0_20px_60px_-25px_rgba(14,22,48,0.35)] sm:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carrossel"
          aria-label="Avaliações de clientes"
        >
          {/* Stable height: all quotes are rendered invisibly in one grid cell, the active one overlays. */}
          <div className="relative grid" aria-live="polite">
            {AVALIACOES.map((_, i) => (
              <div key={i} className="invisible col-start-1 row-start-1" aria-hidden="true">
                <Quote index={i} />
              </div>
            ))}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="col-start-1 row-start-1"
                style={{ gridArea: '1 / 1' }}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <Quote index={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 h-0.5 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full origin-left bg-accent-ink"
              style={{ transform: `scaleX(${reduce ? 0 : Math.min(progress, 1)})` }}
            />
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            {AVALIACOES.map((r, i) => (
              <button
                key={r.nome}
                type="button"
                onClick={() => pick(i)}
                aria-label={`Ver avaliação de ${r.nome}`}
                aria-current={i === active}
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === active ? 'h-2.5 w-8 bg-accent-ink' : 'h-2.5 w-2.5 bg-ink/25'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            Avaliações públicas feitas no Google, transcritas na íntegra.
            {/* PROOF NEEDED: client authorization to reproduce these reviews */}
          </p>
          <motion.a
            href={waLink('Olá! Vim pelo site e gostaria de falar com a Baldon.')}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="inline-flex items-center rounded-full bg-whatsapp px-6 py-3 font-semibold text-white"
          >
            Fale com a Baldon no WhatsApp
          </motion.a>
        </div>
      </div>
    </section>
  );
}
