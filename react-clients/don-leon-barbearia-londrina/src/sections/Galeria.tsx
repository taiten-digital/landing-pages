import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, useReducedMotion, type PanInfo } from 'framer-motion';

import haircut01 from '../assets/images/haircut-01-fade-profile.jpg';
import haircut02 from '../assets/images/haircut-02-spiky-front.jpg';
import haircut03 from '../assets/images/haircut-03-blue-dye.jpg';
import haircut04 from '../assets/images/haircut-04-curly-fade.jpg';
import haircut05 from '../assets/images/haircut-05-pompadour.jpg';
import haircut06 from '../assets/images/haircut-06-spiky-side.jpg';

const photos = [
  { src: haircut01, alt: 'Corte fade com acabamento visto de perfil' },
  { src: haircut02, alt: 'Corte spiky curto na frente' },
  { src: haircut03, alt: 'Corte com coloração azul' },
  { src: haircut04, alt: 'Fade em cabelo cacheado' },
  { src: haircut05, alt: 'Corte pompadour clássico' },
  { src: haircut06, alt: 'Corte spiky com laterais desenhadas' },
];

const AUTOPLAY_MS = 4000;
const GAP_PX = 16;

export default function Galeria() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [itemStep, setItemStep] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const x = useMotionValue(0);

  // Measure the real track/viewport widths so the carousel never scrolls
  // past the last photo's right edge — snapping by a fixed index*itemStep
  // alone overshoots near the end because fewer items remain than fit in
  // one viewport width, leaving a blank gap (see CLAUDE.md's CSS gotchas).
  const measure = useCallback(() => {
    if (!itemRef.current || !viewportRef.current) return;
    const step = itemRef.current.getBoundingClientRect().width + GAP_PX;
    const trackWidth = step * photos.length;
    const viewportWidth = viewportRef.current.getBoundingClientRect().width;
    setItemStep(step);
    setMaxScroll(Math.max(0, trackWidth - viewportWidth - GAP_PX));
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const snapTo = useCallback(
    (targetIndex: number) => {
      const target = Math.min(maxScroll, Math.max(0, targetIndex * itemStep));
      animate(x, -target, reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 32 });
    },
    [x, itemStep, maxScroll, reduceMotion]
  );

  useEffect(() => {
    if (!itemStep) return;
    snapTo(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, itemStep]);

  useEffect(() => {
    if (reduceMotion || isInteracting || !itemStep) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, isInteracting, itemStep]);

  const goTo = (next: number) => {
    setIndex(((next % photos.length) + photos.length) % photos.length);
  };

  const nudge = (delta: number) => {
    setIsInteracting(true);
    goTo(index + delta);
    window.setTimeout(() => setIsInteracting(false), AUTOPLAY_MS);
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    setIsInteracting(false);
    if (!itemStep) return;
    const threshold = itemStep / 3;
    if (info.offset.x < -threshold || info.velocity.x < -400) {
      goTo(index + 1);
    } else if (info.offset.x > threshold || info.velocity.x > 400) {
      goTo(index - 1);
    } else {
      snapTo(index);
    }
  };

  return (
    <section id="galeria" className="relative overflow-hidden border-t border-white/5 bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent-2">
            Trabalho real
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-wide text-fg sm:text-5xl">
            Galeria de cortes
          </h2>
          <p className="mt-4 text-fg-muted">
            Cortes feitos de verdade nas unidades Don Leon. Arraste para o lado ou use as setas.
          </p>
        </div>
      </div>

      <div ref={viewportRef} className="relative mx-auto mt-12 min-w-0 max-w-6xl overflow-hidden px-6">
        <motion.div
          className="flex min-w-0 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setIsInteracting(true)}
          onDragEnd={handleDragEnd}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              ref={i === 0 ? itemRef : undefined}
              className="mr-4 w-[78%] shrink-0 sm:w-[46%] lg:w-[30%]"
            >
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-panel">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[3/4] w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-end gap-3 px-6">
        <motion.button
          type="button"
          aria-label="Corte anterior"
          onClick={() => nudge(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-fg transition-colors hover:border-accent-2 hover:text-accent-2"
        >
          ←
        </motion.button>
        <motion.button
          type="button"
          aria-label="Próximo corte"
          onClick={() => nudge(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-fg transition-colors hover:border-accent-2 hover:text-accent-2"
        >
          →
        </motion.button>
      </div>
    </section>
  );
}
