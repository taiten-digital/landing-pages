import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, ShieldCheck, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { EMPRESA, GOOGLE, waLink } from '../content';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.3;
const LINE_STAGGER = 0.14;
const LINES = 3;
const H1_END = LINE_START + LINES * LINE_STAGGER + 0.3;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // 0 at the hero's top, 1 once it has fully left the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const scale = useTransform(progress, [0, 1], [1, 0.7]);
  const y = useTransform(progress, [0, 1], ['0%', '28%']);
  const rotate = useTransform(progress, [0, 1], [0, -6]);
  const fade = useTransform(progress, [0, 1], [1, 0.25]);

  const line = (i: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { y: '110%' },
          animate: { y: '0%' },
          transition: { duration: 0.9, delay: LINE_START + i * LINE_STAGGER, ease: EASE },
        };

  const rise = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const press = reduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };
  const breathe = (duration: number, values: number[]) =>
    reduceMotion
      ? {}
      : {
          animate: { opacity: values, scale: [1, 1.12, 1] },
          transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
        };

  const mask = 'block overflow-hidden pb-[0.1em] -mb-[0.1em]';

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-bg pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh lg:justify-center"
    >
      {/* Shield art: sits above the text on mobile (faded), right side on lg+. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 will-change-transform sm:h-[32rem] sm:w-[32rem] lg:left-auto lg:right-[4%] lg:top-1/2 lg:h-[40rem] lg:w-[40rem] lg:translate-x-0 lg:-translate-y-1/2 xl:right-[8%]"
        style={reduceMotion ? undefined : { scale, y, rotate, opacity: fade }}
      >
        {/* Blue breathing glow: large blur, gradient fully transparent before the edge. */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-shield) 55%, transparent) 0%, transparent 65%)',
          }}
          {...breathe(6, [0.55, 1, 0.55])}
        />
        {/* Gold glow, offset and out of phase. */}
        <motion.div
          className="absolute inset-[18%] translate-y-[8%] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 40%, transparent) 0%, transparent 65%)',
          }}
          {...breathe(8, [0.9, 0.4, 0.9])}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={reduceMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShieldCheck
            strokeWidth={0.6}
            className="h-[78%] w-[78%] text-accent opacity-80 drop-shadow-[0_0_28px_rgb(47_107_219/0.55)]"
          />
        </motion.div>
      </motion.div>
      {/* Fade shield into the page below the nav on mobile. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/60 via-45% to-transparent lg:from-bg/40 lg:via-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 sm:pb-16 lg:py-20">
        <div className="max-w-xl lg:max-w-[34rem]">
          <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight text-text sm:text-5xl lg:text-[3.1rem]">
            <span className={mask}>
              <motion.span className="block" {...line(0)}>
                Proteja o que você levou
              </motion.span>
            </span>
            <span className={mask}>
              <motion.span className="block" {...line(1)}>
                <span className="text-accent">anos para construir</span>.
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...rise(H1_END - 0.2)}
            className="mt-4 font-sans text-[0.95rem] leading-relaxed text-text/85 sm:mt-6 sm:text-lg"
          >
            Corretora de seguros em Londrina: vida, auto, casa, empresas e mais. Fale pelo
            WhatsApp e conte o que você quer proteger.
          </motion.p>

          <motion.div
            {...rise(H1_END)}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <motion.a
              href={waLink('Olá! Vim pelo site e quero conversar sobre proteção para o que construí.')}
              target="_blank"
              rel="noreferrer"
              {...press}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-sans text-base font-bold text-deep shadow-lg shadow-black/30 transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Falar pelo WhatsApp
            </motion.a>
            <motion.a
              href="#seguros"
              {...press}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-bg/40 px-6 py-3 font-sans text-base font-semibold text-text backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-3.5"
            >
              Ver seguros
              <ArrowDown size={18} aria-hidden="true" className="text-text-muted" />
            </motion.a>
          </motion.div>

          <motion.ul
            {...rise(H1_END + 0.15)}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-sans text-[0.8rem] text-text-muted sm:mt-8 sm:text-sm"
          >
            <li className="inline-flex items-center gap-1.5">
              <Star size={16} aria-hidden="true" className="shrink-0 fill-current text-star" />
              <strong className="font-bold text-text">Nota {GOOGLE.nota} no Google</strong>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={16} aria-hidden="true" className="shrink-0 text-text-muted" />
              {EMPRESA.cidade}
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
