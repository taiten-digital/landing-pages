import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, useReducedMotion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

import testimonial1 from '../assets/images/testimonial-1.webp';
import testimonial2 from '../assets/images/testimonial-2.webp';
import testimonial3 from '../assets/images/testimonial-3.webp';

// 3 depoimentos reais, reproduzidos palavra por palavra do Astro original
// (TestimonialsSection.astro) — nunca parafrasear, nunca trocar foto/alt.
const TESTIMONIALS = [
  {
    image: testimonial1,
    alt: 'Aluna que treina com a Talita Lopes após tentar outros profissionais sem resultado',
    quote:
      'Passei mais de dois anos com outros profissionais sem o resultado que queria. Com a Talita, em 6 meses vi diferença real.',
  },
  {
    image: testimonial2,
    alt: 'Aluna que sentiu melhora da dor ciática treinando com a Talita Lopes',
    quote:
      'Tinha dor relacionada ao nervo ciático e senti melhora real depois que comecei a treinar com orientação.',
  },
  {
    image: testimonial3,
    alt: 'Aluna que se sentiu ouvida e cuidada nos treinos com a Talita Lopes',
    quote: 'Ela entende as necessidades de quem já não é tão jovem, ouve e adapta o treino. Me senti cuidada.',
  },
];

const YEARS_EXPERIENCE = 10;
const GAP_PX = 24;

function CountUpStat() {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? YEARS_EXPERIENCE : 0);
  const startedRef = useRef(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Count-up on mount, once, when the stat actually enters view — same
  // trusted one-shot rAF pattern as Avaliacoes.tsx on Don Leon. Content
  // around it is already fully visible; only the number itself animates.
  useEffect(() => {
    if (reduceMotion || startedRef.current) return;
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(YEARS_EXPERIENCE * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <span className="relative block">
      <span
        ref={spanRef}
        aria-hidden="true"
        className="block bg-gradient-to-r from-accent to-sage bg-clip-text font-display text-5xl font-extrabold leading-none text-transparent sm:text-6xl"
      >
        +{value}
      </span>
      <span className="sr-only">+{YEARS_EXPERIENCE} anos de experiência</span>
    </span>
  );
}

export default function Depoimentos() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [itemStep, setItemStep] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const x = useMotionValue(0);

  // Measured-width clamped carousel, ported from Galeria.tsx (Don Leon):
  // snapping by a fixed index*itemStep alone overshoots near the end of a
  // short list, so the real track/viewport widths are measured and the
  // scroll target is clamped to what's actually there.
  const measure = useCallback(() => {
    if (!itemRef.current || !viewportRef.current) return;
    const step = itemRef.current.getBoundingClientRect().width + GAP_PX;
    const trackWidth = step * TESTIMONIALS.length;
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

  const goTo = (next: number) => {
    setIndex(((next % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
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
    <section
      id="depoimentos"
      className="relative overflow-hidden border-t border-white/5 bg-forest py-16 text-bg sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1fr_2fr] md:items-start">
        <div className="md:sticky md:top-24">
          <h2 className="font-display text-3xl font-extrabold text-bg sm:text-4xl">O que dizem os alunos</h2>
          <p className="mt-3 max-w-[32ch] text-muted-dark">
            Já treinou com outros profissionais antes. Não viu diferença. Veja o que dizem alunos que
            passaram por isso.
          </p>

          <div className="mt-6">
            <CountUpStat />
            <span className="mt-1 block text-sm text-muted-dark">anos de experiência em Londrina/PR</span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="flex text-accent drop-shadow-[0_0_8px_var(--color-accent)]"
            >
              <Star size={20} fill="currentColor" />
            </motion.span>
            <span className="text-sm font-semibold text-muted-dark">Avaliação verificada no Google</span>
            {/* TODO: PROOF NEEDED — número de avaliações / nota do Google, nunca confirmado por fonte verificável; manter só o texto de verificação, sem contagem nem nota */}
          </div>
        </div>

        <div className="min-w-0">
          <div ref={viewportRef} className="relative min-w-0 overflow-hidden">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -maxScroll, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.alt}
                  ref={i === 0 ? itemRef : undefined}
                  className="mr-6 w-[82%] shrink-0 sm:w-[60%] lg:w-[46%]"
                >
                  <figure className="relative flex h-full flex-col rounded-md bg-bg p-6 text-forest">
                    <Quote
                      size={22}
                      aria-hidden="true"
                      className="absolute right-4 top-4 text-accent/45"
                    />
                    <img
                      src={t.image}
                      alt={t.alt}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover"
                      draggable={false}
                    />
                    <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-muted">
                      Avaliação verificada no Google
                    </figcaption>
                  </figure>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.button
              type="button"
              aria-label="Depoimento anterior"
              onClick={() => goTo(index - 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-bg/30 text-bg transition-colors hover:bg-bg/10"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex items-center gap-1.5" role="group" aria-label="Selecionar depoimento">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.alt}
                  type="button"
                  aria-label={`Ver depoimento ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 cursor-pointer rounded-full transition-all ${
                    i === index ? 'w-5 bg-accent' : 'w-1.5 bg-bg/30'
                  }`}
                />
              ))}
            </div>

            <motion.button
              type="button"
              aria-label="Próximo depoimento"
              onClick={() => goTo(index + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-bg/30 text-bg transition-colors hover:bg-bg/10"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
