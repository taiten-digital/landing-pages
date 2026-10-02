import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import type { AnimationPlaybackControls } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { AVALIACOES, GOOGLE } from '../content';

// Marquee speed: ~1300px of cards => roughly 45s per cycle.
const PX_PER_SECOND = 30;

type Review = (typeof AVALIACOES)[number];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : '';
  return (first + last).toUpperCase();
}

// Rating text from content.ts ("4,5") as a number, so the stars follow the real value.
const NOTA_NUM = Number(GOOGLE.nota.replace(',', '.'));

function RatingStars() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, NOTA_NUM - i));
        return (
          <span key={i} className="relative inline-block size-5">
            <Star className="absolute inset-0 size-5 text-line" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-5 text-star" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function ReviewCard({ review, focusable }: { review: Review; focusable: boolean }) {
  return (
    <figure
      tabIndex={focusable ? 0 : undefined}
      className="w-[18rem] shrink-0 rounded-2xl border border-line bg-card p-6 shadow-[0_10px_30px_-18px_rgba(26,22,18,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-accent-ink sm:w-[22rem] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex items-center gap-0.5"
          role="img"
          aria-label={`${review.estrelas} de 5 estrelas`}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              className={`size-4 ${i < review.estrelas ? 'text-star' : 'text-line'}`}
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />
          ))}
        </div>
        <Quote className="size-6 text-line" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 font-display text-lg leading-[1.45] text-ink">
        {'“'}
        {review.texto}
        {'”'}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-deep text-sm font-semibold tracking-wide text-sand"
          aria-hidden="true"
        >
          {initials(review.nome)}
        </span>
        <span className="text-sm font-semibold text-ink">{review.nome}</span>
      </figcaption>
    </figure>
  );
}

const MASK =
  'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)';

export default function Avaliacoes() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const x = useMotionValue(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);

  // Measure one copy and the viewport; render enough copies to always cover the viewport.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => {
      const width = track.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      if (!width) return;
      setTrackWidth(width);
      setCopies(Math.max(2, Math.ceil(viewportWidth / width) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, [reduceMotion]);

  // Linear loop by exactly one measured copy width, in pixels.
  useEffect(() => {
    if (reduceMotion || !trackWidth) return;
    x.set(0);
    const controls = animate(x, -trackWidth, {
      duration: trackWidth / PX_PER_SECOND,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    controlsRef.current = controls;
    return () => {
      controls.stop();
      controlsRef.current = null;
    };
  }, [reduceMotion, trackWidth, x]);

  // Pause on hover / focus-within.
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (paused) controls.pause();
    else controls.play();
  }, [paused, trackWidth, reduceMotion]);

  return (
    <section id="avaliacoes" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-medium leading-[1.12] text-ink sm:text-4xl lg:text-5xl">
          O que dizem no <span className="text-accent-ink">Google</span>
        </h2>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <FcGoogle className="size-6" aria-hidden="true" />
          <RatingStars />
          <p className="text-sm font-medium text-ink-muted">
            {GOOGLE.nota} · {GOOGLE.total} avaliações no Google
          </p>
        </div>
      </div>

      {reduceMotion ? (
        <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
          <div className="grid items-start justify-items-center gap-4 sm:grid-cols-2">
            {AVALIACOES.map((review) => (
              <ReviewCard key={review.nome} review={review} focusable={false} />
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="mt-10 overflow-hidden py-2"
          style={{ maskImage: MASK, WebkitMaskImage: MASK }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <motion.div className="flex w-max items-start" style={{ x }}>
            {Array.from({ length: copies }).map((_, copy) => (
              <div
                key={copy}
                ref={copy === 0 ? trackRef : undefined}
                className="flex items-start gap-4 pr-4"
                aria-hidden={copy > 0 ? true : undefined}
              >
                {AVALIACOES.map((review) => (
                  <ReviewCard key={review.nome} review={review} focusable={copy === 0} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      )}

      <p className="mx-auto mt-6 max-w-6xl px-4 text-sm text-ink-muted sm:px-6">
        Avaliações públicas no Google, transcritas como publicadas.
      </p>
    </section>
  );
}
