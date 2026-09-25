import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { ArrowUpRight } from 'lucide-react';

// Real client photos (sent by the client, 2026-09-25).
import pratoChurrasco from '../assets/images/prato-churrasco.webp'; // 339x392, small: stage is capped at 340px wide
import pratoCostela from '../assets/images/prato-costela.webp'; // 880x1140
import pratoFrango from '../assets/images/prato-frango-assado.webp'; // 485x593, chicken on the right
// Pexels photo 34234283 by Beatriz Haiana — Pexels License: free for commercial use, no attribution required. TODO: trocar pela foto real da feijoada do R1000 (placeholder a pedido do cliente).
import feijoadaStock from '../assets/images/feijoada-stock-pexels.webp';

const WHATSAPP_URL =
  'https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.';
const IFOOD_URL =
  'https://www.ifood.com.br/delivery/londrina-pr/r1000-restaurante-jardim-imagawa/ab6a8ae3-794f-4a36-9d59-d9301bb9da2b';

/** Time each dish stays on stage before auto-advancing. */
const DISH_DURATION_MS = 5000;
/** After a manual pick, auto-advance stays paused this long, then resumes. */
const MANUAL_HOLD_MS = 12000;

type Dish = {
  name: string;
  description: string;
  image: string;
  alt: string;
  /** Tailwind object-position class for the crop. */
  position: string;
};

const DISHES: Dish[] = [
  {
    name: 'Churrasco',
    description: 'Carne assada fatiada, linguiça, arroz, farofa, batata frita e salada.',
    image: pratoChurrasco,
    alt: 'Marmitex de churrasco do R1000 com carne assada fatiada, linguiça, arroz, farofa, batata frita e salada',
    position: 'object-center',
  },
  {
    name: 'Costela',
    description: 'Costela assada até soltar do osso, com linguiça, batata frita, farofa e couve.',
    image: pratoCostela,
    alt: 'Prato de costela assada do R1000 com linguiça, batata frita, farofa e couve',
    position: 'object-center',
  },
  {
    name: 'Frango assado',
    description: 'Frango assado douradinho, acompanhado de carnes, linguiça, macarrão e farofa.',
    image: pratoFrango,
    alt: 'Marmitex de frango assado do R1000 com carnes, linguiça, macarrão e farofa',
    position: 'object-[70%_center]',
  },
  {
    name: 'Feijoada',
    description: 'Feijoada caprichada, daquele jeito que abraça. Todo dia tem.',
    image: feijoadaStock,
    // Stock placeholder: alt stays generic, never claims to be the R1000 plate.
    alt: 'Prato de feijoada',
    position: 'object-center',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

export default function Cardapio() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const progress = useMotionValue(0);
  const holdUntil = useRef(0);

  // Auto-advance driven by rAF so hover/offscreen pauses keep the bar's
  // exact position instead of restarting it.
  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      const held = now < holdUntil.current;
      if (inView && !hovering && !held) {
        const next = progress.get() + dt / DISH_DURATION_MS;
        if (next >= 1) {
          progress.set(0);
          setActive((i) => (i + 1) % DISHES.length);
        } else {
          progress.set(next);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, inView, hovering, progress]);

  const select = useCallback(
    (index: number) => {
      setActive(index);
      progress.set(0);
      holdUntil.current = performance.now() + MANUAL_HOLD_MS;
    },
    [progress],
  );

  const dish = DISHES[active];
  const nextDish = DISHES[(active + 1) % DISHES.length];

  const fade = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, scale: 1.06 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="cardapio"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-ember">Cardápio</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-fg sm:text-5xl">
            Os pratos da casa
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Churrasco todo dia, feijoada também. Servimos marmitex e prato feito.
          </p>
        </div>

        {/* Showcase */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:mt-14 md:grid-cols-[minmax(0,440px)_minmax(0,1fr)] md:gap-14 lg:gap-20">
          {/* Stage column */}
          <div className="relative min-w-0 px-4 py-6 sm:px-8">
            {/* Ambient orange glow behind the stage (static; Footer owns the pulse). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,58,4,0.35),rgba(243,166,75,0.12)_55%,transparent_80%)] blur-3xl"
            />

            {/* Big dish number behind the stage */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-4 select-none font-display text-[7rem] font-bold leading-none text-white/[0.04] sm:text-[9rem]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  className="block"
                  initial={reduceMotion ? false : { y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { y: -30, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5 }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Stage: explicit width + aspect so absolute children never collapse it.
                Capped at 340px so the 339px-wide churrasco photo is never upscaled noticeably. */}
            <div className="relative mx-auto aspect-[6/7] w-full max-w-[340px]">
              {/* "Up next" card peeking out behind, tilted like a stacked plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-[7%] translate-y-[3%] rotate-[6deg] overflow-hidden rounded-card border border-white/10 bg-bg-raised shadow-xl"
              >
                <AnimatePresence initial={false}>
                  <motion.img
                    key={nextDish.name}
                    src={nextDish.image}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover ${nextDish.position} brightness-[0.45] saturate-[0.8]`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.9 }}
                  />
                </AnimatePresence>
              </div>

              {/* Active photo */}
              <div className="absolute inset-0 overflow-hidden rounded-card border border-white/10 bg-bg-panel shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={dish.name}
                    src={dish.image}
                    alt={dish.alt}
                    className={`absolute inset-0 h-full w-full object-cover ${dish.position}`}
                    {...fade}
                  />
                </AnimatePresence>

                {/* Name overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 via-bg/60 to-transparent px-5 pb-5 pt-20">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={dish.name}
                      initial={reduceMotion ? false : { y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { y: -8, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
                        {pad(active + 1)} / {pad(DISHES.length)}
                      </p>
                      <p className="mt-1 font-display text-3xl font-bold leading-[1.1] text-fg">
                        {dish.name}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop list */}
          <ul
            className="hidden min-w-0 flex-col gap-2 md:flex"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {DISHES.map((d, i) => {
              const isActive = i === active;
              return (
                <li key={d.name}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className={`group relative w-full cursor-pointer overflow-hidden rounded-card border px-6 py-5 text-left transition-colors duration-300 ${
                      isActive
                        ? 'border-white/10 bg-bg-panel'
                        : 'border-transparent hover:bg-bg-panel/50'
                    }`}
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-display text-2xl font-bold leading-[1.1] transition-colors duration-300 ${
                          isActive ? 'text-ember' : 'text-fg-muted/50 group-hover:text-fg-muted'
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-2xl font-bold leading-[1.1] transition-colors duration-300 lg:text-3xl ${
                            isActive ? 'text-fg' : 'text-fg-muted group-hover:text-fg'
                          }`}
                        >
                          {d.name}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              key="desc"
                              className="block overflow-hidden"
                              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <span className="block pt-2 text-base leading-relaxed text-fg-muted">
                                {d.description}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Progress bar: the section's focal accent */}
                    {isActive && !reduceMotion && (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/5">
                        <motion.span
                          className="block h-full origin-left bg-gradient-to-r from-accent to-ember"
                          style={{ scaleX: progress }}
                        />
                      </span>
                    )}
                    {isActive && reduceMotion && (
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile selectors */}
          <div className="min-w-0 md:hidden">
            <div className="flex justify-center gap-3">
              {DISHES.map((d, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    aria-label={d.name}
                    className={`relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-bg transition-all duration-300 ${
                      isActive ? 'ring-accent' : 'opacity-60 ring-white/10'
                    }`}
                  >
                    <img
                      src={d.image}
                      alt=""
                      className={`h-full w-full object-cover ${d.position}`}
                    />
                  </button>
                );
              })}
            </div>

            {!reduceMotion && (
              <div aria-hidden="true" className="mx-auto mt-5 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-accent to-ember"
                  style={{ scaleX: progress }}
                />
              </div>
            )}

            <div className="mt-5 rounded-card border border-white/10 bg-bg-panel px-5 py-5 text-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={dish.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >
                  <p className="font-display text-2xl font-bold leading-[1.1] text-fg">{dish.name}</p>
                  <p className="mt-2 text-base leading-relaxed text-fg-muted">{dish.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/5 pt-10 sm:flex-row sm:justify-between">
          <p className="text-center text-fg-muted sm:text-left">
            Terça a domingo, das 10h30 às 15h. Marmitex e prato feito.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Pedir no WhatsApp
            </a>
            <a
              href={IFOOD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-fg transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Ver no iFood
              <ArrowUpRight className="h-4 w-4 text-fg-muted" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
