import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, SyntheticEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FaStar, FaWhatsapp } from 'react-icons/fa6';
import { ChevronDown } from 'lucide-react';
import { img, waLink } from '../lib/site';

// Deterministic pseudo-random so particles never reshuffle between renders.
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const vars = (o: Record<string, string | number>) => o as CSSProperties;

const PointerCtx = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

/** Pointer parallax: shifts by `depth` px against the cursor (desktop only). */
function Layer({ depth, className, children }: { depth: number; className?: string; children?: ReactNode }) {
  const p = useContext(PointerCtx)!;
  const x = useTransform(p.x, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(p.y, [-0.5, 0.5], [-depth * 0.7, depth * 0.7]);
  return (
    <motion.div className={className} style={{ x, y, willChange: 'transform' }}>
      {children}
    </motion.div>
  );
}

/** One-shot fly-in; afterwards the child's CSS loop takes over. */
function Enter({ show, reduce, from, delay = 0, className, children }: {
  show: boolean; reduce: boolean; delay?: number; className?: string; children: ReactNode;
  from: { x?: number; y?: number; rotate?: number; scale?: number };
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...from }}
      animate={show ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 60, damping: 11, mass: 1, delay }}
    >
      {children}
    </motion.div>
  );
}

const SPARKS = [
  { l: 12, t: 30, s: 18, d: 0 }, { l: 84, t: 22, s: 24, d: 0.8 }, { l: 70, t: 62, s: 16, d: 1.5 },
  { l: 28, t: 12, s: 14, d: 2.1 }, { l: 92, t: 50, s: 14, d: 0.4 }, { l: 6, t: 58, s: 20, d: 1.2 },
];

const SEAL_TEXT = 'CHOPP GELADO • ENTREGA EM LONDRINA • DESDE 2014 • ';

export default function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const pointer = useMemo(() => ({ x: sx, y: sy }), [sx, sy]);

  // Scroll drift: plain transforms, no spring (cheaper, still smooth).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  // Pause every idle animation while the hero is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  const bubbles = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    left: 38 + rnd(i, 1) * 24, size: 4 + rnd(i, 2) * 6, dur: 4.5 + rnd(i, 3) * 3.5, delay: rnd(i, 4) * 6,
    rise: 200 + rnd(i, 5) * 160, dx: (rnd(i, 6) - 0.5) * 24,
  })), []);
  const grains = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    left: rnd(i, 7) * 100, dur: 7 + rnd(i, 8) * 6, delay: rnd(i, 9) * 8, rot: 200 + rnd(i, 10) * 300, s: 0.8 + rnd(i, 11) * 0.8,
  })), []);

  return (
    <PointerCtx.Provider value={pointer}>
      <section
        id="inicio"
        ref={ref}
        data-paused={!inView}
        onPointerMove={onMove}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        className="relative overflow-clip bg-bg min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))] min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]"
        style={{ marginTop: 'var(--nav-height, 4.5rem)' }}
      >
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#3a2608_0%,#170f06_45%,#0b0906_75%)]" />
        <div aria-hidden className="grain-bg absolute inset-0 opacity-70" />

        {/* giant outlined word behind everything */}
        <motion.div
          aria-hidden
          style={reduce ? undefined : { y: wordY }}
          className="pointer-events-none absolute inset-x-0 top-[6%] z-0 select-none text-center lg:top-[14%]"
        >
          <Layer depth={-18}>
            <span className="font-display text-outline block whitespace-nowrap text-[34vw] leading-none lg:text-[17vw]">CHOPP</span>
          </Layer>
        </motion.div>

        <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl flex-col px-4 sm:px-6 lg:grid lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-6">
          {/* ---------- STAGE ---------- */}
          <div className="relative h-[44svh] min-h-[250px] shrink-0 lg:order-2 lg:h-[min(76vh,720px)]">
            <motion.div className="relative h-full w-full" style={reduce ? undefined : { y: stageY }}>
              {/* baked light rays (rotating texture) + soft glow */}
              <Layer depth={6} className="absolute inset-0">
                <div aria-hidden className="absolute left-1/2 top-[46%] w-[150%] max-w-[1100px] -translate-x-1/2 -translate-y-1/2">
                  <img src={img('rays')} alt="" className="fx-spin w-full" style={vars({ '--dur': '90s' })} />
                </div>
                <div
                  aria-hidden
                  className="fx-pulse absolute left-1/2 top-[48%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,168,29,0.5)_0%,rgba(244,168,29,0.16)_38%,transparent_66%)]"
                />
              </Layer>

              {/* wheat, back */}
              <Layer depth={14} className="absolute bottom-[2%] left-[-4%] h-[72%] w-[30%] lg:left-[2%]">
                <Enter show={show} reduce={reduce} from={{ x: -120, rotate: -25 }} delay={0.15} className="h-full w-full">
                  <img src={img('trigo')} alt="" aria-hidden className="fx-sway-l h-full w-full origin-bottom object-contain object-bottom" />
                </Enter>
              </Layer>
              <Layer depth={12} className="absolute bottom-[4%] right-[-6%] h-[62%] w-[26%] lg:right-[0%]">
                <Enter show={show} reduce={reduce} from={{ x: 120, rotate: 25 }} delay={0.25} className="h-full w-full">
                  <img src={img('trigo')} alt="" aria-hidden className="fx-sway-r h-full w-full origin-bottom -scale-x-100 object-contain object-bottom opacity-90" style={vars({ '--delay': '-1s' })} />
                </Enter>
              </Layer>

              {/* ground shadow (static, no filter) */}
              <div aria-hidden className="absolute bottom-[1%] left-1/2 h-[7%] w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,0.65),transparent_70%)]" />

              {/* the mug + glass glint */}
              <Layer depth={22} className="absolute inset-x-0 bottom-[3%] top-[2%] flex items-center justify-center">
                <motion.div
                  className="h-full"
                  initial={reduce ? false : { y: 110, opacity: 0, scale: 0.85, rotate: -5 }}
                  animate={show ? { y: 0, opacity: 1, scale: 1, rotate: 0 } : undefined}
                  transition={{ type: 'spring', stiffness: 70, damping: 13, mass: 1.1 }}
                >
                  <div className="fx-float relative h-full" style={vars({ '--dur': '6s' })}>
                    <img
                      src={img('chopp')}
                      alt="Caneca de chopp gelado da Estação do Chopp"
                      onLoad={onMugLoad}
                      onError={() => setReady(true)}
                      fetchPriority="high"
                      className="block h-full w-auto max-w-none object-contain"
                    />
                    <img src={img('chopp-glint')} alt="" aria-hidden className="fx-glint absolute inset-0 h-full w-full object-contain" style={vars({ '--dur': '5.5s' })} />
                  </div>
                </motion.div>
              </Layer>

              {/* barrel drops in front-left */}
              <Layer depth={34} className="absolute bottom-[1%] left-[-2%] h-[36%] w-[24%] lg:left-[6%]">
                <Enter show={show} reduce={reduce} from={{ y: -380, rotate: -20 }} delay={0.4} className="h-full w-full">
                  <img src={img('barril')} alt="" aria-hidden className="fx-float h-full w-full -rotate-6 object-contain object-bottom" style={vars({ '--dur': '5.2s', '--delay': '-0.6s' })} />
                </Enter>
              </Layer>

              {/* hops burst in */}
              <Layer depth={44} className="absolute bottom-[2%] right-[0%] h-[26%] w-[24%] lg:right-[3%]">
                <Enter show={show} reduce={reduce} from={{ scale: 0, rotate: -90 }} delay={0.55} className="h-full w-full">
                  <img src={img('lupulo')} alt="" aria-hidden className="fx-bob h-full w-full object-contain object-bottom" style={vars({ '--dur': '6.4s' })} />
                </Enter>
              </Layer>
              <Layer depth={58} className="absolute right-[6%] top-[8%] h-[14%] w-[14%]">
                <Enter show={show} reduce={reduce} from={{ scale: 0, rotate: 120 }} delay={0.7} className="h-full w-full">
                  <img src={img('lupulo')} alt="" aria-hidden className="fx-bob h-full w-full object-contain opacity-90" style={vars({ '--dur': '7.3s', '--delay': '-0.4s' })} />
                </Enter>
              </Layer>

              {/* malt pile grounds the mug */}
              <Layer depth={10} className="absolute inset-x-[6%] bottom-[-2%] h-[16%]">
                <Enter show={show} reduce={reduce} from={{ y: 60, scale: 0.9 }} delay={0.3} className="h-full w-full">
                  <img src={img('malte')} alt="" aria-hidden className="h-full w-full object-contain object-bottom" />
                </Enter>
              </Layer>

              {/* real logo as a rotating seal */}
              <Layer depth={30} className="absolute left-[2%] top-[2%] w-[27%] min-w-[92px] max-w-[170px] lg:left-[11%] lg:top-[3%]">
                <Enter show={show} reduce={reduce} from={{ scale: 0, rotate: -180 }} delay={0.8} className="w-full">
                  <div className="fx-float relative aspect-square w-full" style={vars({ '--dur': '7s', '--delay': '-2s' })}>
                    <div aria-hidden className="absolute inset-0 rounded-full bg-bg/80 shadow-[0_0_40px_rgba(244,168,29,0.35)] ring-1 ring-accent/40" />
                    <svg viewBox="0 0 200 200" aria-hidden className="fx-spin absolute inset-0 h-full w-full" style={vars({ '--dur': '36s' })}>
                      <defs><path id="sealPath" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" /></defs>
                      <text className="font-display" fontSize="15" fill="#ffd56a" letterSpacing="1">
                        <textPath href="#sealPath" textLength="520" lengthAdjust="spacing">{SEAL_TEXT}</textPath>
                      </text>
                    </svg>
                    <img src={img('logo')} alt="Logo Estação do Chopp" className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover" />
                  </div>
                </Enter>
              </Layer>

              {/* sparkles */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {SPARKS.map((s, i) => (
                  <svg key={i} viewBox="0 0 24 24" className={`fx-twinkle absolute text-accent-2 ${i > 3 ? 'hidden sm:block' : ''}`}
                    style={vars({ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, '--dur': `${2.6 + i * 0.35}s`, '--delay': `${s.d}s` })}>
                    <path fill="currentColor" d="M12 0c.8 6.7 4.3 10.2 12 12-7.7 1.8-11.2 5.3-12 12-.8-6.7-4.3-10.2-12-12C7.7 10.2 11.2 6.7 12 0z" />
                  </svg>
                ))}
              </div>

              {/* falling malt + rising bubbles: pure CSS */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {grains.map((g, i) => (
                  <span key={i} className={`fx-grain absolute top-0 block h-[7px] w-[12px] rounded-[60%] bg-gradient-to-br from-accent-2 to-accent ${i > 3 ? 'hidden sm:block' : ''}`}
                    style={vars({ left: `${g.left}%`, '--dur': `${g.dur}s`, '--delay': `${g.delay}s`, '--rot': `${g.rot}deg`, scale: g.s })} />
                ))}
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {bubbles.map((b, i) => (
                  <span key={i} className="fx-bubble absolute rounded-full border border-white/50 bg-white/20"
                    style={vars({ left: `${b.left}%`, bottom: '14%', width: b.size, height: b.size, '--dur': `${b.dur}s`, '--delay': `${b.delay}s`, '--rise': b.rise, '--dx': `${b.dx}px` })} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ---------- COPY ---------- */}
          <div className="relative z-20 flex flex-1 flex-col justify-end pb-8 pt-2 lg:order-1 lg:flex-none lg:justify-center lg:py-16">
            <h1 className="font-display text-[2.85rem] leading-[1.02] text-text sm:text-7xl lg:text-[6.4rem] lg:leading-[0.98]">
              {[
                { t: 'O melhor chopp,', grad: false },
                { t: 'para os melhores', grad: true },
                { t: 'momentos.', grad: true },
              ].map((l, i) => (
                <motion.span
                  key={l.t}
                  className={`block ${l.grad ? 'bg-gradient-to-r from-accent-2 via-accent to-[#c77d0a] bg-clip-text text-transparent' : ''}`}
                  initial={reduce ? false : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.t}
                </motion.span>
              ))}
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
                className="relative inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-fg shadow-[0_10px_40px_rgba(244,168,29,0.45)]"
              >
                <FaWhatsapp className="h-5 w-5" aria-hidden />
                Pedir no WhatsApp
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
