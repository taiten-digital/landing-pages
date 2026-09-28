import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, BadgeCheck, MapPin, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { EMPRESA, GOOGLE, waLink } from '../content';
// Client's own photo of the DC storefront (Av. Alziro Zarur, 401), supplied by the user,
// who asked for it in the Hero. 858x685, opaque, no identifiable people.
import fachada from '../assets/images/fachada-dc.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.15;
const LINE_STAGGER = 0.14;
const LINES = 3;
// When the last H1 line lands; the rest of the copy follows it.
const H1_END = LINE_START + LINES * LINE_STAGGER + 0.3;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Each H1 line rises out of its own mask on mount (never on scroll).
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

  // overflow-hidden is the mask; the bottom padding keeps descenders (g, p, ç) unclipped.
  const mask = 'block overflow-hidden pb-[0.1em] -mb-[0.1em]';

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-bg pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh lg:justify-center"
    >
      {/* Photo layer. Below lg: a top band under the nav. lg+: the right 58%, full height,
          bleeding to the right edge (the source is only 858px wide, so it is never
          stretched across the full viewport; documented deviation in design-brief.md). */}
      <div className="relative h-[42svh] min-h-64 w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:min-h-0 lg:w-[58%]">
        {/* Slow Ken Burns, anchored on the DC sign (left-center of the facade) so the
            zoom never pushes it out of frame. No color filters. */}
        <motion.img
          src={fachada}
          alt="Fachada da DC Consórcios na Av. Alziro Zarur, em Londrina"
          width={858}
          height={685}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full origin-[32%_48%] object-cover object-[25%_45%] will-change-transform lg:object-[30%_45%]"
          initial={{ scale: 1 }}
          animate={reduceMotion ? undefined : { scale: 1.06 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
          }
        />

        {/* Below lg: fade the band's bottom into the page so the text can overlap it. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/60 via-35% to-transparent lg:hidden"
        />

        {/* lg+: left fade into the page. Kept tighter than a generic scrim (transparent by
            ~28%) because the DC letters sit around 24-41% of this box's width. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-bg via-bg/50 via-10% to-transparent to-28% lg:block"
        />
        {/* lg+: light bottom fade. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-bg/70 to-transparent lg:block"
        />
        {/* lg+: the photo runs under the transparent fixed Nav; its sky is pale, so a short
            top fade keeps the nav links readable before the Nav turns opaque. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-40 bg-gradient-to-b from-bg/75 to-transparent lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto -mt-16 w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:mt-0 lg:py-20">
        <div className="max-w-xl lg:max-w-[30rem] xl:max-w-[36rem]">
          <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-text [text-shadow:0_2px_18px_rgb(10_15_23/0.6)] sm:text-5xl lg:text-[2.6rem] xl:text-5xl">
            <span className={mask}>
              <motion.span className="block" {...line(0)}>
                Casa, carro ou moto:
              </motion.span>
            </span>
            <span className={mask}>
              <motion.span className="block" {...line(1)}>
                sua próxima <span className="text-accent">conquista</span>
              </motion.span>
            </span>
            <span className={mask}>
              <motion.span className="block" {...line(2)}>
                começa com planejamento.
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...rise(H1_END - 0.2)}
            className="mt-6 font-sans text-base leading-relaxed text-text/85 sm:text-lg"
          >
            Consórcio sem juros, com atendimento próximo do começo ao fim. A DC é representante
            exclusiva do Consórcio União em Londrina.
          </motion.p>

          <motion.div
            {...rise(H1_END)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <motion.a
              href={waLink('Olá! Vim pelo site e quero montar meu plano de consórcio.')}
              target="_blank"
              rel="noopener"
              {...press}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-sans text-base font-bold text-deep shadow-lg shadow-black/30 transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Quero fazer meu plano
            </motion.a>
            <motion.a
              href="#contemplados"
              {...press}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-bg/40 px-6 py-3.5 font-sans text-base font-semibold text-text backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Ver histórias de contemplação
              <ArrowDown size={18} aria-hidden="true" className="text-text-muted" />
            </motion.a>
          </motion.div>

          <motion.ul
            {...rise(H1_END + 0.15)}
            className="mt-8 flex flex-col gap-2.5 font-sans text-sm text-text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
          >
            <li className="inline-flex items-center gap-1.5">
              <Star size={16} aria-hidden="true" className="shrink-0 fill-current text-star" />
              <span>
                <strong className="font-bold text-text">{GOOGLE.nota} no Google</strong> ·{' '}
                {GOOGLE.total} avaliações
              </span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={16} aria-hidden="true" className="shrink-0 text-silver" />
              Desde {EMPRESA.desde} em Londrina
            </li>
            <li className="inline-flex items-center gap-1.5">
              <BadgeCheck size={16} aria-hidden="true" className="shrink-0 text-silver" />
              {EMPRESA.representante}
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
