import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaQuoteLeft, FaStar, FaWhatsapp } from 'react-icons/fa6';
import { AVALIACOES, GOOGLE, waLink } from '../content';

// PROOF NEEDED: client authorization to reproduce these Google reviews (see content.ts).
// Only 6 of the 9 reviews were visible in the screenshots; the other 3 texts are UNKNOWN.

type Avaliacao = (typeof AVALIACOES)[number];

const ROTATE_MS = 7000;

const DESTAQUES = AVALIACOES.filter((a) => a.contemplacao);
const DEMAIS = AVALIACOES.filter((a) => !a.contemplacao);

// Rodrigo = "Contemplado", Raquel = "Contemplada" (per design-brief copy).
const ROTULO: Record<string, string> = {
  'Rodrigo T.': 'Contemplado',
  'Raquel U.': 'Contemplada',
};

function iniciais(nome: string) {
  return nome
    .replace(/\./g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
}

function Estrelas({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-star ${className}`} aria-label="5 de 5 estrelas" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} aria-hidden="true" />
      ))}
    </span>
  );
}

function Avatar({ nome, size = 'md' }: { nome: string; size?: 'md' | 'lg' }) {
  // Initials only: no photos of reviewers exist, and none should be guessed.
  const dims = size === 'lg' ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm';
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-ink font-display font-semibold text-light ${dims}`}
    >
      {iniciais(nome)}
    </span>
  );
}

function DestaqueConteudo({ item }: { item: Avaliacao }) {
  return (
    <div className="flex h-full flex-col">
      <FaQuoteLeft aria-hidden="true" className="h-10 w-10 text-accent-ink/20 sm:h-12 sm:w-12" />
      <blockquote className="mt-5 whitespace-pre-line font-display text-lg font-medium leading-relaxed text-ink sm:text-xl lg:text-2xl lg:leading-snug">
        {item.texto}
      </blockquote>
      <figcaption className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6">
        <Avatar nome={item.nome} size="lg" />
        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-ink">{item.nome}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted">
            <FcGoogle aria-hidden="true" className="h-4 w-4" />
            <span>{ROTULO[item.nome] ?? 'Cliente'} · avaliação no Google</span>
          </p>
        </div>
        <Estrelas className="ml-auto text-base" />
      </figcaption>
    </div>
  );
}

function SegmentoProgresso({
  ativo,
  progress,
  reduceMotion,
}: {
  ativo: boolean;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  return (
    <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
      {ativo && (
        <motion.span
          className="block h-full w-full origin-left rounded-full bg-accent-ink"
          style={{ scaleX: reduceMotion ? 1 : progress }}
        />
      )}
    </span>
  );
}

export default function Contemplados() {
  const reduceMotion = useReducedMotion() ?? false;
  const spotlightRef = useRef<HTMLDivElement>(null);
  const inView = useInView(spotlightRef, { amount: 0.3 });

  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);

  const running = !reduceMotion && !hoverPaused && !focusPaused && inView;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Clamp the delta so a backgrounded tab doesn't jump straight to the next story.
      const dt = Math.min(now - last, 100);
      last = now;
      elapsed.current += dt;
      if (elapsed.current >= ROTATE_MS) {
        elapsed.current = 0;
        progress.set(0);
        setActive((a) => (a + 1) % DESTAQUES.length);
        return;
      }
      progress.set(elapsed.current / ROTATE_MS);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, active, progress]);

  const selecionar = (i: number) => {
    elapsed.current = 0;
    progress.set(0);
    setActive(i);
  };

  const atual = DESTAQUES[active];

  return (
    <section id="contemplados" className="relative overflow-hidden bg-light py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Heading column */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Quem já foi <span className="text-accent-ink">contemplado</span> conta como foi
            </h2>
            <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg">
              Avaliações reais de clientes da DC no Google.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-ink/10 bg-light-card px-4 py-2.5 shadow-sm">
              <FcGoogle aria-hidden="true" className="h-5 w-5" />
              <span className="font-display text-lg font-bold text-ink">{GOOGLE.nota}</span>
              <Estrelas className="text-sm" />
              <span className="text-sm text-ink-muted">{GOOGLE.total} avaliações no Google</span>
            </div>
          </div>

          {/* Spotlight: the 2 contemplação stories take turns */}
          <div
            ref={spotlightRef}
            className="lg:col-span-7"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Histórias de contemplação"
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            onFocus={() => setFocusPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusPaused(false);
            }}
          >
            <figure
              className="relative rounded-3xl border border-ink/5 bg-light-card p-6 shadow-[0_24px_60px_-28px_rgba(14,22,34,0.35)] sm:p-10"
              aria-live={running ? 'off' : 'polite'}
            >
              {/* Invisible sizers: the card always fits the longest story, so the crossfade never jumps the layout. */}
              <div className="grid" aria-hidden="true">
                {DESTAQUES.map((item) => (
                  <div key={item.nome} className="invisible [grid-area:1/1]">
                    <DestaqueConteudo item={item} />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 p-6 sm:p-10">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={atual.nome}
                    className="absolute inset-0 p-6 sm:p-10"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DestaqueConteudo item={atual} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </figure>

            {/* Selectors with built-in progress bar */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              {DESTAQUES.map((item, i) => {
                const ativo = i === active;
                return (
                  <button
                    key={item.nome}
                    type="button"
                    onClick={() => selecionar(i)}
                    aria-label={`Mostrar a história de ${item.nome}`}
                    aria-pressed={ativo}
                    className={`cursor-pointer rounded-lg px-1 py-1 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ${
                      ativo ? 'font-semibold text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {item.nome}
                    <SegmentoProgresso ativo={ativo} progress={progress} reduceMotion={reduceMotion} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The other reviews, static */}
        <div className="mt-14 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEMAIS.map((item) => (
            <figure
              key={item.nome}
              className="rounded-2xl border border-ink/5 bg-light-card p-5 shadow-sm"
            >
              <figcaption className="flex items-center gap-3">
                <Avatar nome={item.nome} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold text-ink">{item.nome}</p>
                  <Estrelas className="mt-0.5 text-xs" />
                </div>
                <FcGoogle aria-label="Avaliação no Google" role="img" className="h-5 w-5 shrink-0" />
              </figcaption>
              <blockquote className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                {item.texto}
              </blockquote>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink-muted">
          Avaliações publicadas no Google Maps. Nota e total conferidos em setembro de 2026.
        </p>

        <div className="mt-10 flex justify-center">
          <motion.a
            href={waLink('Olá! Vi as histórias de contemplação no site e quero começar meu consórcio.')}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-semibold text-light shadow-lg shadow-ink/20 transition-colors hover:bg-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
          >
            <FaWhatsapp aria-hidden="true" className="h-5 w-5" />
            Quero ser o próximo contemplado
          </motion.a>
        </div>
      </div>
    </section>
  );
}
