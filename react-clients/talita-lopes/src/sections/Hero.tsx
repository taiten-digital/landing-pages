import { useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Heart } from 'lucide-react';
// Pexels License (free for commercial use, no attribution required).
// Generic/atmospheric jogging photo — not Talita or a specific student.
// Landscape 3:2 source, already approved for this exact full-bleed use.
import heroBg from '../assets/images/hero-bg-jogging.jpg';

const WHATSAPP_URL =
  'https://wa.me/5543984795883?text=' +
  encodeURIComponent('Olá, Talita! Vi sua página e quero marcar uma avaliação gratuita.');

// Mount-triggered entrance stagger (never scroll-triggered — content is
// visible immediately, per motion-playbook).
const enter = (reduceMotion: boolean | null, index: number) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1 + index * 0.12, ease: 'easeOut' as const },
});

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Same 40px cap as the original inline script (scrollY * 0.08, capped).
  const parallaxY = useTransform(scrollY, [0, 500], [0, 40], { clamp: true });
  const [scrolledPast, setScrolledPast] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolledPast(latest > 80);
  });

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="hero-fullbleed relative flex items-center overflow-hidden pt-10 pb-[160px] min-[860px]:pb-[220px]">
      {/* Preserves the exact overshoot math: one viewport + 80px, because
          the wave divider eats into the visible bottom edge. Nav sets
          --nav-height on :root; 76px fallback matches the original constant. */}
      <style>{`
        .hero-fullbleed {
          min-height: calc(100vh - var(--nav-height, 76px) + 80px);
          min-height: calc(100svh - var(--nav-height, 76px) + 80px);
        }
      `}</style>

      {/* Background photo: Ken Burns loop + scroll-linked parallax */}
      <motion.div className="absolute -inset-[15px] z-0" style={{ y: reduceMotion ? 0 : parallaxY }}>
        <motion.img
          src={heroBg}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_40%] blur-[4px] saturate-[1.05]"
          animate={reduceMotion ? undefined : { scale: [1, 1.08] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }
        />
      </motion.div>

      {/* Scrim: keeps white text legible over the photo at every point */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-forest/72 to-forest/82" aria-hidden="true" />

      <div className="relative z-[2] mx-auto grid w-full max-w-6xl gap-10 px-4 min-[960px]:grid-cols-[1fr_auto] min-[960px]:items-center">
        <div className="max-w-[34rem] text-bg">
          <motion.p
            {...enter(reduceMotion, 0)}
            className="text-[0.9rem] font-bold uppercase tracking-[0.06em] text-[color-mix(in_srgb,var(--color-accent)_75%,white_25%)]"
          >
            Personal trainer em Londrina/PR
          </motion.p>

          <motion.h1
            {...enter(reduceMotion, 1)}
            className="mt-2 font-display text-[clamp(2rem,1.2rem+2.6vw,3.1rem)] font-extrabold leading-[1.1] text-bg"
          >
            O treino se adapta a{' '}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute bottom-[0.06em] left-[0.02em] right-[-0.08em] h-[0.4em] -rotate-[1.5deg] rounded-sm bg-accent"
              />
              <span className="relative z-10">você</span>
            </span>
            . Não o contrário.
          </motion.h1>

          <motion.p {...enter(reduceMotion, 2)} className="mt-3 max-w-[44ch] text-bg/88">
            Especialista em coluna vertebral para pessoas 50+. Já tentou antes e não teve
            resultado, ou não se sentiu ouvido? A avaliação física é gratuita e sem compromisso.
          </motion.p>

          <motion.div {...enter(reduceMotion, 3)} className="relative mt-6 inline-block">
            {/* Pulsing ambient glow: the only CTA on the page that gets this */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-pill bg-accent blur-xl"
              animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
              transition={reduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="relative inline-flex items-center justify-center rounded-pill bg-accent px-7 py-3.5 font-display text-base font-bold text-accent-fg shadow-lg"
            >
              Marcar avaliação gratuita
            </motion.a>
          </motion.div>
        </div>

        {/* Frosted glass card: desktop only (≥960px), continuous idle float.
            Visible immediately (no hidden initial) — pairing an entrance
            fade with this float is exactly the bug the original Astro
            component's comment warns about, so it's skipped here too. */}
        <div className="hidden min-[960px]:block">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="w-60 rounded-md border border-bg/25 bg-white/14 p-5 text-bg shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)] backdrop-blur-[16px] backdrop-saturate-[1.2]"
          >
            <span className="mb-2 inline-flex text-accent">
              <Heart size={20} aria-hidden="true" />
            </span>
            <p className="font-display text-[1.05rem] font-bold">No seu ritmo</p>
            <p className="mt-1 text-[0.85rem] text-bg/85">
              Sem pressa, sem comparação. Cada treino no tempo que faz sentido pra você.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue: scrolls one viewport down, fades out past 80px of scroll */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        aria-label="Ver mais"
        animate={{ opacity: scrolledPast ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className={`absolute left-1/2 z-[3] bottom-[160px] flex h-11 w-7 -translate-x-1/2 items-start justify-center rounded-pill border-2 border-bg/70 pt-1.5 min-[860px]:bottom-[220px] ${
          scrolledPast ? 'pointer-events-none' : ''
        }`}
      >
        <motion.span
          aria-hidden="true"
          className="h-[5px] w-[5px] rounded-pill bg-bg"
          animate={reduceMotion ? undefined : { y: [0, 0, 14], opacity: [1, 1, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, times: [0, 0.7, 1], ease: 'easeInOut' }
          }
        />
      </motion.button>

      {/* Static SVG wave divider */}
      <svg
        className="pointer-events-none absolute inset-x-0 -bottom-0.5 z-[3] block h-[130px] w-full min-[860px]:h-[190px]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,70 C360,50 1080,110 1440,80 L1440,220 L0,220 Z" className="fill-sage" />
      </svg>
    </section>
  );
}
