import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { Info } from 'lucide-react';
import { waLink } from '../content';

// Copy approved in design-brief.md. Honest mechanic: no guaranteed contemplation date.
const PASSOS = [
  {
    titulo: 'Você escolhe o plano',
    texto:
      'Conta o seu objetivo e a gente apresenta as opções de crédito e de parcela que cabem no seu bolso.',
  },
  {
    titulo: 'Entra em um grupo',
    texto:
      'Você paga parcelas mensais sem juros, junto com outras pessoas que também estão planejando uma conquista.',
  },
  {
    titulo: 'Contemplação por sorteio ou lance',
    texto:
      'Todo mês há assembleia. Você pode ser contemplado por sorteio ou antecipar ofertando um lance.',
    nota: 'Não existe data garantida, por isso o planejamento faz diferença.',
  },
  {
    titulo: 'Usa sua carta de crédito',
    texto: 'Contemplado, você usa o crédito para comprar o seu bem. E a DC segue com você até o fim.',
  },
] as const;

type Geometry = { top: number; height: number };

export default function ComoFunciona() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stopsRef = useRef<number[]>([0, 1 / 3, 2 / 3, 1]);
  const [geo, setGeo] = useState<Geometry>({ top: 0, height: 0 });
  const [active, setActive] = useState(0);

  // The track runs from the first dot's center to the last dot's center, so the fill
  // tip sits exactly on each dot when it "reaches" it. Measured, not assumed.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const wrapTop = wrap.getBoundingClientRect().top;
      const centers = dotRefs.current.map((d) => {
        if (!d) return 0;
        const r = d.getBoundingClientRect();
        return r.top + r.height / 2 - wrapTop;
      });
      const first = centers[0];
      const span = Math.max(1, centers[centers.length - 1] - first);
      stopsRef.current = centers.map((c) => (c - first) / span);
      setGeo((prev) =>
        Math.abs(prev.top - first) < 0.5 && Math.abs(prev.height - span) < 0.5
          ? prev
          : { top: first, height: span },
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Fill tip follows a reading line: starts when the track top hits 70% of the
  // viewport, completes when the track end reaches 50%.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.7', 'end 0.5'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const tipTop = useTransform(smooth, (v) => `${v * 100}%`);

  const update = useCallback((v: number) => {
    const n = stopsRef.current.filter((s) => v > 0.002 && v >= s - 0.01).length;
    setActive((prev) => (prev === n ? prev : n));
  }, []);
  useMotionValueEvent(smooth, 'change', update);
  useLayoutEffect(() => {
    update(smooth.get());
  }, [geo, smooth, update]);

  // Reduced motion: line fully filled, every dot lit, no moving tip.
  const lit = reduceMotion ? PASSOS.length : active;
  const current = Math.max(1, lit);

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Left column: sticky on lg while the timeline scrolls past */}
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--nav-height,4.5rem)+2.5rem)] lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">
              Passo a passo
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] text-text sm:text-4xl lg:text-5xl">
              Como funciona o <span className="text-accent">consórcio</span>
            </h2>
            <p className="mt-4 max-w-md text-lg text-text-muted">
              Sem letras miúdas: é assim que você chega ao seu bem.
            </p>

            {/* Scroll-driven progress readout (lg only, supplementary to the always-visible steps) */}
            <div className="mt-8 hidden lg:block" aria-hidden="true">
              <p className="font-display text-sm font-medium text-silver">
                Etapa {current} de {PASSOS.length}
                <span className="text-text-muted">: {PASSOS[current - 1].titulo}</span>
              </p>
              <div className="mt-3 flex max-w-xs gap-2">
                {PASSOS.map((p, i) => (
                  <span key={p.titulo} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-silver"
                      initial={false}
                      animate={{ scaleX: i < lit ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <a
              href={waLink('Olá! Quero entender melhor como funciona o consórcio.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-deep transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <FaWhatsapp className="size-5" aria-hidden="true" />
              Tirar minhas dúvidas no WhatsApp
            </a>
          </div>

          {/* Right column: the timeline */}
          <div ref={wrapRef} className="relative min-w-0">
            {/* Base track + scroll-linked fill (x aligned to the dot centers: 22px / 26px) */}
            <div
              ref={trackRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-[21px] w-0.5 rounded-full bg-line sm:left-[25px]"
              style={{ top: geo.top, height: geo.height }}
            >
              <motion.div
                className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-accent/50 to-accent"
                style={{ scaleY: reduceMotion ? 1 : smooth }}
              />
              {!reduceMotion && (
                <>
                  <motion.div
                    className="absolute left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_65%)] opacity-60 blur-xl"
                    style={{ top: tipTop }}
                  />
                  <motion.div
                    className="absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-hover shadow-[0_0_14px_4px_rgba(91,155,224,0.55)]"
                    style={{ top: tipTop }}
                  />
                </>
              )}
            </div>

            <ol className="relative space-y-6 sm:space-y-8">
              {PASSOS.map((passo, i) => {
                const on = i < lit;
                return (
                  <li key={passo.titulo} className="flex gap-5 sm:gap-6">
                    <motion.span
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      aria-hidden="true"
                      initial={false}
                      animate={{ scale: on ? 1 : 0.88 }}
                      transition={
                        reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 18 }
                      }
                      className={`relative z-10 mt-4 flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-sm font-bold transition-[background-color,border-color,color,box-shadow] duration-500 sm:size-[52px] sm:text-base ${
                        on
                          ? 'border-accent bg-accent text-accent-fg shadow-[0_0_0_6px_rgba(91,155,224,0.15),0_0_28px_rgba(91,155,224,0.45)]'
                          : 'border-line bg-surface-2 text-text-muted'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>

                    <div
                      className={`min-w-0 flex-1 rounded-2xl border p-5 transition-colors duration-500 sm:p-6 ${
                        on ? 'border-accent/25 bg-surface-2' : 'border-line bg-surface-2/50'
                      }`}
                    >
                      <h3 className="font-display text-lg font-semibold leading-[1.2] text-text sm:text-xl">
                        <span className="sr-only">Passo {i + 1}: </span>
                        {passo.titulo}
                      </h3>
                      <p className="mt-2 leading-relaxed text-text-muted">{passo.texto}</p>
                      {'nota' in passo && (
                        <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-bg/40 px-4 py-3 text-sm text-silver">
                          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                          {passo.nota}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
