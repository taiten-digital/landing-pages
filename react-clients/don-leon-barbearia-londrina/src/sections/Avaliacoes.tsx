import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star as StarIcon } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';

// Real per-unit ratings, confirmed directly by the client from their own
// logged-in Google Maps (2026-09-21). RATING (5.0) is the average of the 4
// real unit ratings (4.9 + 5.0 + 4.9 + 5.0) / 4 = 4.95, which rounds to 5.0
// at one decimal, not a cherry-picked number.
const RATING = 5.0;
const UNIT_RATINGS = [
  { nome: 'Matriz', nota: 4.9, avaliacoes: 237 },
  { nome: 'Faria Lima', nota: 5.0, avaliacoes: 173 },
  { nome: 'Bosque', nota: 4.9, avaliacoes: 50 },
  { nome: 'San Fernando', nota: 5.0, avaliacoes: 9 },
];
const TOTAL_REVIEWS = UNIT_RATINGS.reduce((sum, u) => sum + u.avaliacoes, 0);

// Longest testimonial (Ewerton) placed in the middle column on purpose, so
// the tallest card centers the row instead of sitting off to one side.
const TESTIMONIALS = [
  {
    nome: 'Fabrício Belo',
    quando: '2 anos atrás',
    texto: 'A melhor barbearia da cidade. Ótimo atendimento e um ambiente aconchegante e confortável.',
  },
  {
    nome: 'Ewerton Xavier',
    quando: 'Editado 7 anos atrás',
    texto:
      'Atendimento impecável, ótimos profissionais! Fui atendido em outra barbearia e infelizmente estragaram meu cabelo e minha barba, liguei pra eles e mesmo sem horário me atenderam e corrigiram as pressas. Trabalho exemplar, atendimento único, os melhores!',
  },
  {
    nome: 'Gabriel Oliveira',
    quando: '2 meses atrás',
    texto: 'Excelente atendimento, cuidado e profissionais atenciosos. Recomendo!',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Star({ fill }: { fill: number }) {
  const clamped = Math.max(0, Math.min(1, fill));
  return (
    <span className="relative inline-block h-9 w-9 sm:h-11 sm:w-11">
      <StarIcon className="absolute inset-0 h-full w-full text-white/10" fill="currentColor" stroke="none" />
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${clamped * 100}%` }}>
        <StarIcon className="h-9 w-9 text-accent-2 sm:h-11 sm:w-11" fill="currentColor" stroke="none" />
      </span>
    </span>
  );
}

function SmallStars() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className="h-3.5 w-3.5 text-accent-2" fill="currentColor" stroke="none" />
      ))}
    </div>
  );
}

export default function Avaliacoes() {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? RATING : 0);
  const startedRef = useRef(false);

  // The real mechanic IS the motion: the verified rating counts up from 0
  // once on mount, and each star's fill tracks that same number live.
  useEffect(() => {
    if (startedRef.current || reduceMotion) return;
    startedRef.current = true;
    const duration = 1800;
    const start = performance.now();
    let frameId = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Number((eased * RATING).toFixed(2)));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reduceMotion]);

  return (
    <section id="avaliacoes" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-fg-muted">
          Avaliações
        </span>
        <h2 className="mt-4 font-display text-3xl uppercase tracking-wide text-fg sm:text-4xl">
          A nota fala por si
        </h2>

        <div className="relative mt-14 flex items-center justify-center">
          {/* Slow-rotating stamp ring — a continuous rotation, never a pulse/blur,
              so it reads distinct from Contato's pulsing glow ring around the CTA. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-full border border-dashed border-leather/40 sm:-inset-10"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }
            }
          />

          <div className="relative flex flex-col items-center rounded-card bg-bg-panel px-10 py-10 sm:px-16 sm:py-14">
            <span
              className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text font-display text-7xl font-bold tabular-nums text-transparent sm:text-8xl"
              aria-hidden="true"
            >
              {display.toFixed(1).replace('.', ',')}
            </span>
            <span className="sr-only">Nota 5,0 de 5 no Google</span>

            <div className="mt-5 flex gap-1.5 sm:gap-2" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} fill={display - i} />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-fg-muted">
              <SiGoogle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{TOTAL_REVIEWS} avaliações no Google</span>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-lg text-sm text-fg-muted">
          Média das 4 unidades verificada diretamente no Google Maps.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-fg-muted/80">
          {UNIT_RATINGS.map((u) => (
            <span key={u.nome} className="whitespace-nowrap">
              {u.nome}: {u.nota.toFixed(1).replace('.', ',')}★ ({u.avaliacoes})
            </span>
          ))}
        </div>

        <div className="mt-16 grid w-full grid-cols-1 items-start gap-5 text-left sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.nome}
              className="flex flex-col rounded-card border border-white/10 bg-bg-panel p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.12, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm text-accent-2">
                  {initials(t.nome)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">{t.nome}</p>
                  <p className="text-xs text-fg-muted">{t.quando}</p>
                </div>
              </div>
              <div className="mt-3">
                <SmallStars />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.texto}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-fg-muted/70">
          Depoimentos reais, reproduzidos do Google (nome e texto originais do avaliador).
        </p>
      </div>
    </section>
  );
}
