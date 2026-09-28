import { useLayoutEffect, useRef, useState, type Ref } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Star } from 'lucide-react';
import { AVALIACOES } from '../content';

// Marquee speed in px/s. Hover/focus eases it to 0 instead of a hard stop.
const PX_PER_SECOND = 40;

const initials = (nome: string) =>
  nome
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function ReviewCard({ nome, texto }: { nome: string; texto: string }) {
  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative w-[300px] shrink-0 self-start rounded-3xl bg-surface p-6 shadow-[0_18px_40px_-24px_rgba(11,36,64,0.45)] ring-1 ring-text/5 sm:w-[360px] sm:p-7"
    >
      <div className="flex items-center gap-3">
        {/* Initials only: no photo of the reviewer exists or is used. */}
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-on-dark"
        >
          {initials(nome)}
        </span>
        <figcaption className="min-w-0 flex-1">
          <span className="block truncate font-display font-bold text-text">{nome}</span>
          <span className="mt-0.5 flex items-center gap-0.5 text-star" role="img" aria-label="5 de 5 estrelas">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" strokeWidth={0} />
            ))}
          </span>
        </figcaption>
        <FcGoogle aria-label="Avaliação do Google" role="img" className="h-6 w-6 shrink-0" />
      </div>
      <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-text-muted">{texto}</blockquote>
    </motion.figure>
  );
}

function Track({ hidden, trackRef }: { hidden?: boolean; trackRef?: Ref<HTMLDivElement> }) {
  // pr-5 matches gap-5 so the seam between copies has the same spacing as between cards.
  return (
    <div ref={trackRef} aria-hidden={hidden || undefined} className="flex shrink-0 items-start gap-5 pr-5">
      {AVALIACOES.map((a) => (
        <ReviewCard key={a.nome} nome={a.nome} texto={a.texto} />
      ))}
    </div>
  );
}

export default function Avaliacoes() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const paused = useRef(false);
  const speed = useRef(PX_PER_SECOND);
  const x = useMotionValue(0);

  // Measure one copy vs the clipping viewport; ResizeObserver also catches the web-font swap.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const width = trackRef.current.getBoundingClientRect().width;
      const viewportWidth = viewportRef.current.getBoundingClientRect().width;
      if (!width) return;
      setTrackWidth(width);
      setCopies(Math.max(2, Math.ceil(viewportWidth / width) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [reduceMotion]);

  // Loop by exactly one measured copy width; speed eases toward 0 while paused.
  useAnimationFrame((_, delta) => {
    if (reduceMotion || !trackWidth) return;
    const target = paused.current ? 0 : PX_PER_SECOND;
    speed.current += (target - speed.current) * Math.min(1, delta / 250);
    let next = x.get() - (speed.current * delta) / 1000;
    if (next <= -trackWidth) next += trackWidth;
    x.set(next);
  });

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <section id="avaliacoes" className="overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.1] text-text sm:text-4xl lg:text-5xl">
          Quem conquistou com a gente <em className="font-extrabold italic text-brand">recomenda</em>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-text-muted">Avaliações reais de clientes no Google.</p>
        {/* PROOF NEEDED: total de avaliações e nota média no Google. Não exibir número até confirmar. */}
      </div>

      {reduceMotion ? (
        <div className="mx-auto mt-10 grid max-w-6xl items-start justify-items-center gap-5 px-4 sm:px-6 md:grid-cols-2">
          {AVALIACOES.map((a) => (
            <ReviewCard key={a.nome} nome={a.nome} texto={a.texto} />
          ))}
        </div>
      ) : (
        <div
          ref={viewportRef}
          tabIndex={0}
          role="region"
          aria-label="Avaliações de clientes no Google. Passe o mouse ou foque para pausar."
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          className="mt-10 w-full overflow-hidden py-4 outline-none [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <motion.div style={{ x }} className="flex w-max items-start">
            {Array.from({ length: copies }, (_, i) => (
              <Track key={i} hidden={i > 0} trackRef={i === 0 ? trackRef : undefined} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
