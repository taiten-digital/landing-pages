import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
// Real portrait of Talita Lopes, confirmed by the client (1448x1931 source, resized to 840w), no alpha.
import retrato from '../assets/images/sobre-talita.webp';

const FORMACOES = [
  'Corrida',
  'Treinamento funcional',
  'Treinamento com kettlebell',
  'Avaliação física',
  'Distúrbios da coluna',
  'Gerontologia',
];

const PX_PER_SECOND = 45;

function FormacoesTrack({ hidden, wrap }: { hidden?: boolean; wrap?: boolean }) {
  return (
    <ul
      className={`flex items-center ${wrap ? 'flex-wrap justify-center gap-y-3' : 'shrink-0'}`}
      aria-hidden={hidden || undefined}
    >
      {FORMACOES.map((f) => (
        <li key={f} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap font-display text-3xl italic leading-[1.2] text-text sm:text-5xl">
            {f}
          </span>
          <span className="mx-6 size-2 shrink-0 rounded-full bg-blush sm:mx-10 sm:size-2.5" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

function FormacoesMarquee({ reduce }: { reduce: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  // ResizeObserver on both nodes: catches viewport resizes AND the late
  // Instrument Serif load, which changes the track width after first paint.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || reduce) return;
    const measure = () => {
      const width = track.getBoundingClientRect().width;
      if (!width) return;
      setTrackWidth(width);
      setCopies(Math.max(2, Math.ceil(viewport.getBoundingClientRect().width / width) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, [reduce]);

  if (reduce) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FormacoesTrack wrap />
      </div>
    );
  }

  return (
    <div ref={viewportRef} className="overflow-hidden">
      <motion.div
        key={trackWidth}
        className="flex w-max"
        animate={trackWidth ? { x: [0, -trackWidth] } : undefined}
        transition={{ duration: trackWidth / PX_PER_SECOND, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} ref={i === 0 ? trackRef : undefined} className="flex shrink-0">
            <FormacoesTrack hidden={i > 0} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Sobre() {
  const reduce = !!useReducedMotion();
  const count = useMotionValue(reduce ? 16 : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeInView = useInView(badgeRef, { once: true, amount: 0.6 });

  // Count-up once the badge is on screen (on mount it would finish unseen).
  useEffect(() => {
    if (!badgeInView) return;
    if (reduce) {
      count.set(16);
      return;
    }
    const controls = animate(count, 16, { duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [reduce, count, badgeInView]);

  return (
    <section id="sobre" className="overflow-hidden bg-bg py-16 text-text sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        {/* Portrait */}
        <div className="min-w-0">
          <div className="relative mx-auto w-full max-w-[420px]">
            {/* Breathing blush halo: gradient fades out by 65% so the blur reads as light, not a ring. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklab, var(--color-blush) 95%, transparent) 0%, color-mix(in oklab, var(--color-blush) 45%, transparent) 40%, transparent 65%)',
              }}
              animate={reduce ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Retrato real enviado pela cliente */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(42,31,45,0.45)]">
              <img
                src={retrato}
                alt="Talita Lopes, treinadora, de braços cruzados"
                width={840}
                height={1120}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating "16 anos" badge overlapping the bottom-right corner */}
            <motion.div
              ref={badgeRef}
              className="absolute -bottom-6 right-3 rounded-3xl bg-deep px-6 py-4 text-cream shadow-[0_20px_40px_-20px_rgba(42,31,45,0.7)] sm:-right-8"
              animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-2, 1, -2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="flex items-baseline gap-3">
                <motion.span className="w-[2ch] font-display text-6xl italic leading-[1.1] text-blush tabular-nums sm:text-7xl">
                  {rounded}
                </motion.span>
                <span className="max-w-[7rem] text-sm font-semibold leading-snug text-cream/80">
                  anos de treinamento
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Quem conduz</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.1] text-text sm:text-6xl">
            Eu sou <em className="italic">Talita Lopes</em>.
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-text-muted sm:text-lg">
            <p>
              Treinadora, apaixonada por movimento, corrida e por ajudar pessoas a cuidarem do corpo em todas as
              fases da vida.
            </p>
            <p>
              Sou profissional de Educação Física e atuo há 16 anos com treinamento. Sou especialista em
              Gerontologia e sigo estudando para oferecer um treinamento cada vez mais seguro, inteligente e
              individualizado.
            </p>
          </div>

          <blockquote className="mt-8 border-l-2 border-accent pl-5 sm:pl-6">
            <p className="font-display text-2xl italic leading-[1.3] text-text sm:text-3xl">
              “Envelhecer não significa parar. É sobre continuar se movimentando, ficando mais forte e cuidando do
              corpo para viver com saúde, autonomia e qualidade de vida.”
            </p>
          </blockquote>

          {/* TODO: PROOF NEEDED, CREF 019973-G/PR não verificado no CREF-PR */}
          <p className="mt-8 text-xs tracking-wide text-text-muted">
            Profissional de Educação Física · CREF 019973-G/PR
          </p>
        </div>
      </div>

      {/* Formações marquee, full width */}
      <div className="mt-16 sm:mt-20">
        <p className="mx-auto max-w-6xl px-4 text-xs font-bold uppercase tracking-[0.2em] text-text-muted sm:px-6">
          Formações e cursos
        </p>
        <div className="mt-5 border-y border-text/10 py-6 sm:py-8">
          <FormacoesMarquee reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
