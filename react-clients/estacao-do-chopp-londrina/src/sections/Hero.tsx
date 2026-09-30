import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';
import { ChevronDown } from 'lucide-react';
import { img, waLink } from '../lib/site';

// Deterministic pseudo-random so SSR/re-renders never reshuffle particles.
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const PointerCtx = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

/** Parallax wrapper: moves by `depth` px against the pointer. Children keep their own animations. */
function Layer({ depth, className, style, children }: {
  depth: number;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}) {
  const p = useContext(PointerCtx)!;
  const x = useTransform(p.x, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(p.y, [-0.5, 0.5], [-depth * 0.7, depth * 0.7]);
  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}

function Bubbles({ reduce }: { reduce: boolean }) {
  const items = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      left: 37 + rnd(i, 1) * 26,
      size: 3 + rnd(i, 2) * 7,
      dur: 4 + rnd(i, 3) * 4,
      delay: rnd(i, 4) * 6,
    })),
    [],
  );
  return (
    <>
      {items.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-white/50 bg-white/20"
          style={{ left: `${b.left}%`, bottom: '14%', width: b.size, height: b.size }}
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.4 } : { y: [0, -(180 + b.size * 22)], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: reduce ? 0 : Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

function FallingGrains({ reduce }: { reduce: boolean }) {
  const items = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({
      left: rnd(i, 5) * 100,
      dur: 6 + rnd(i, 6) * 6,
      delay: rnd(i, 7) * 8,
      rot: 180 + rnd(i, 8) * 360,
      s: 0.7 + rnd(i, 9) * 0.9,
    })),
    [],
  );
  if (reduce) return null;
  return (
    <>
      {items.map((g, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block h-[7px] w-[12px] rounded-[60%] bg-gradient-to-br from-accent-2 to-accent shadow-[0_0_8px_rgba(244,168,29,0.6)]"
          style={{ left: `${g.left}%`, scale: g.s }}
          animate={{ y: [-20, 720], rotate: [0, g.rot], opacity: [0, 1, 1, 0] }}
          transition={{ duration: g.dur, delay: g.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  // Mouse parallax (desktop). Touch devices get idle float + scroll drift.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const pointer = useMemo(() => ({ x: sx, y: sy }), [sx, sy]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const prog = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const stageY = useTransform(prog, [0, 1], ['0%', '14%']);
  const stageScale = useTransform(prog, [0, 1], [1, 0.9]);
  const wordY = useTransform(prog, [0, 1], ['0%', '30%']);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // The entrance waits for the mug; fallback timer so it never stays hidden.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(t);
  }, []);
  const onMugLoad = (e: SyntheticEvent<HTMLImageElement>) =>
    e.currentTarget.decode().catch(() => {}).finally(() => setReady(true));

  const show = reduce || ready;

  return (
    <PointerCtx.Provider value={pointer}>
      <section
        id="inicio"
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        className="relative overflow-clip bg-bg min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))] min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]"
        style={{ marginTop: 'var(--nav-height, 4.5rem)' }}
      >
        {/* atmosphere */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#3a2608_0%,#170f06_45%,#0b0906_75%)]" />
        <div aria-hidden className="grain-bg absolute inset-0 opacity-70" />

        {/* giant outlined word behind everything */}
        <motion.div
          aria-hidden
          style={reduce ? undefined : { y: wordY }}
          className="pointer-events-none absolute inset-x-0 top-[6%] z-0 select-none text-center lg:top-[14%]"
        >
          <Layer depth={-18}>
            <span className="font-display text-outline block whitespace-nowrap text-[34vw] leading-none lg:text-[17vw]">
              CHOPP
            </span>
          </Layer>
        </motion.div>

        <div className="relative z-10 mx-auto grid min-h-[inherit] max-w-7xl grid-cols-1 px-4 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-6">
          {/* ---------- STAGE ---------- */}
          <div className="absolute inset-x-0 top-0 h-[50%] lg:static lg:order-2 lg:h-[min(76vh,720px)]">
            <motion.div className="relative h-full w-full" style={reduce ? undefined : { y: stageY, scale: stageScale }}>
              {/* light rays */}
              <Layer depth={6} className="absolute inset-0">
                <motion.div
                  aria-hidden
                  className="absolute left-1/2 top-[46%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-60"
                  style={{
                    background:
                      'repeating-conic-gradient(from 0deg, rgba(255,200,90,0.22) 0deg 6deg, transparent 6deg 24deg)',
                    maskImage: 'radial-gradient(circle, #000 0%, transparent 62%)',
                    WebkitMaskImage: 'radial-gradient(circle, #000 0%, transparent 62%)',
                  }}
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  aria-hidden
                  className="absolute left-1/2 top-[48%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,168,29,0.55)_0%,rgba(244,168,29,0.18)_40%,transparent_68%)] blur-3xl"
                  animate={reduce ? {} : { opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </Layer>

              {/* wheat, back */}
              <Layer depth={14} className="absolute bottom-[2%] left-[-4%] h-[72%] w-[30%] lg:left-[2%]">
                <motion.img
                  src={img('trigo')}
                  alt=""
                  aria-hidden
                  className="h-full w-full origin-bottom object-contain object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  animate={reduce ? {} : { rotate: [-4, 3, -4] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
              </Layer>
              <Layer depth={12} className="absolute bottom-[4%] right-[-6%] h-[62%] w-[26%] lg:right-[0%]">
                <motion.img
                  src={img('trigo')}
                  alt=""
                  aria-hidden
                  className="h-full w-full origin-bottom -scale-x-100 object-contain object-bottom opacity-90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  animate={reduce ? {} : { rotate: [3, -4, 3] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
              </Layer>

              {/* the mug */}
              <Layer depth={22} className="absolute inset-x-0 bottom-[3%] top-[2%] flex items-center justify-center">
                <motion.div
                  className="h-full"
                  initial={reduce ? false : { y: 90, opacity: 0, scale: 0.88, rotate: -4 }}
                  animate={show ? { y: 0, opacity: 1, scale: 1, rotate: 0 } : undefined}
                  transition={{ type: 'spring', stiffness: 70, damping: 14, mass: 1.1 }}
                >
                  <motion.img
                    src={img('chopp')}
                    alt="Caneca de chopp gelado da Estação do Chopp"
                    onLoad={onMugLoad}
                    onError={() => setReady(true)}
                    fetchPriority="high"
                    className="h-full w-auto max-w-none object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.65)]"
                    animate={reduce ? {} : { y: [0, -12, 0], rotate: [-0.8, 0.8, -0.8] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </Layer>

              {/* barrel, front-left */}
              <Layer depth={34} className="absolute bottom-[1%] left-[-2%] h-[36%] w-[24%] lg:left-[6%]">
                <motion.img
                  src={img('barril')}
                  alt=""
                  aria-hidden
                  className="h-full w-full -rotate-6 object-contain object-bottom drop-shadow-[0_18px_30px_rgba(0,0,0,0.7)]"
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
              </Layer>

              {/* hops: one sharp, one small and blurred for depth */}
              <Layer depth={44} className="absolute bottom-[2%] right-[0%] h-[26%] w-[24%] lg:right-[3%]">
                <motion.img
                  src={img('lupulo')}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)]"
                  animate={reduce ? {} : { y: [0, -10, 0], rotate: [-5, 6, -5] }}
                  transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </Layer>
              <Layer depth={60} className="absolute right-[6%] top-[8%] h-[15%] w-[15%]">
                <motion.img
                  src={img('lupulo')}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-contain blur-[1.5px]"
                  animate={reduce ? {} : { y: [0, 14, 0], rotate: [10, -8, 10] }}
                  transition={{ duration: 7.3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />
              </Layer>
              <Layer depth={56} className="absolute left-[10%] top-[16%] h-[11%] w-[11%]">
                <motion.img
                  src={img('lupulo')}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-contain blur-[2.5px]"
                  animate={reduce ? {} : { y: [0, -12, 0], rotate: [-12, 8, -12] }}
                  transition={{ duration: 8.1, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                />
              </Layer>

              {/* malt pile grounds the mug */}
              <Layer depth={10} className="absolute inset-x-[6%] bottom-[-2%] h-[16%]">
                <img src={img('malte')} alt="" aria-hidden className="h-full w-full object-contain object-bottom" />
              </Layer>

              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden"><FallingGrains reduce={reduce} /></div>
              <div aria-hidden className="pointer-events-none absolute inset-0"><Bubbles reduce={reduce} /></div>
            </motion.div>
          </div>

          {/* ---------- COPY ---------- */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] bg-gradient-to-t from-bg via-bg/85 to-transparent lg:hidden" />
          <div className="relative z-20 flex min-h-[inherit] flex-col justify-end pb-8 pt-[52%] lg:order-1 lg:min-h-0 lg:justify-center lg:py-16">
            <h1 className="font-display text-[2.85rem] leading-[1.02] text-text sm:text-7xl lg:text-[6.4rem] lg:leading-[0.98]">
              {['O melhor chopp,'].map((t) => (
                <motion.span
                  key={t}
                  className="block"
                  initial={reduce ? false : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t}
                </motion.span>
              ))}
              <motion.span
                className="block bg-gradient-to-r from-accent-2 via-accent to-[#c77d0a] bg-clip-text text-transparent"
                initial={reduce ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                para os melhores
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-accent-2 via-accent to-[#c77d0a] bg-clip-text text-transparent"
                initial={reduce ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                momentos.
              </motion.span>
            </h1>

            <motion.p
              className="mt-4 max-w-md text-base text-text/80 sm:text-lg lg:mt-6"
              initial={reduce ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Distribuidora de chopp em Londrina desde 2014. Barris de 30 e 50 litros, com entrega.
            </motion.p>

            <motion.div
              className="mt-5 flex flex-wrap items-center gap-3 lg:mt-7"
              initial={reduce ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.52 }}
            >
              <motion.a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-fg shadow-[0_10px_40px_rgba(244,168,29,0.45)]"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 blur-md"
                  animate={reduce ? {} : { x: ['0%', '520%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                />
                <FaWhatsapp className="relative h-5 w-5" aria-hidden />
                <span className="relative">Pedir no WhatsApp</span>
              </motion.a>
              <a
                href="#barris"
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-6 py-3.5 text-base font-medium text-text transition-colors hover:border-accent hover:bg-accent/10"
              >
                Ver os barris
                <ChevronDown className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>

            <motion.ul
              className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted lg:mt-8"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <li className="flex items-center gap-1.5">
                <span className="flex text-accent" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => <FaStar key={i} className="h-3.5 w-3.5" />)}
                </span>
                Nota 5 estrelas no Google
              </li>
              <li>Desde 2014</li>
              <li>Entrega em Londrina</li>
            </motion.ul>
          </div>
        </div>
      </section>
    </PointerCtx.Provider>
  );
}
