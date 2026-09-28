import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, BadgeCheck, MapPin, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { EMPRESA, GOOGLE, waLink } from '../content';

// Client's own photo of the DC storefront (Av. Alziro Zarur, 401), front view at dusk with
// the sign lit, supplied by the user for the Hero (an AI upscale of their real 680x510 photo;
// the parked car's plate is blurred). Opaque, no identifiable people.
// Lives in public/ (not src/assets) so index.html can preload it by a stable URL: keep the
// srcset below and the <link rel="preload"> in index.html in sync.
const PHOTO = `${import.meta.env.BASE_URL}images/fachada-dc-`;

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.35;
const LINE_STAGGER = 0.14;
const LINES = 3;
// When the last H1 line lands; the rest of the copy follows it.
const H1_END = LINE_START + LINES * LINE_STAGGER + 0.3;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // 0 while the hero's top sits at the viewport top, 1 once its bottom leaves the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Stiff spring: smooths mouse-wheel steps into one continuous motion without visible lag.
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const scale = useTransform(progress, [0, 1], [1, 0.8]);
  const y = useTransform(progress, [0, 1], ['0%', '22%']);
  const radius = useTransform(progress, [0, 0.3], [0, 28]);
  const dim = useTransform(progress, [0, 1], [0, 0.55]);

  // The curtain only opens once the photo is downloaded and decoded; otherwise, on a slow
  // connection, it animates over an empty box and the photo pops in afterwards.
  const [photoReady, setPhotoReady] = useState(false);
  const onPhotoLoad = (e: React.SyntheticEvent<HTMLImageElement>) =>
    e.currentTarget
      .decode()
      .catch(() => {})
      .finally(() => setPhotoReady(true));

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
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-bg pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh lg:justify-center"
    >
      {/* Photo layer. Below lg it covers the top ~72% and the text sits on its faded bottom;
          lg+ it covers the whole hero. On scroll it shrinks into a rounded card, drifts
          down slower than the page (parallax) and dims. */}
      <motion.div
        className="absolute inset-x-0 top-0 -z-10 h-[72%] overflow-hidden will-change-transform lg:h-full"
        style={reduceMotion ? undefined : { scale, y, borderRadius: radius }}
      >
        {/* Entrance: the photo opens like a curtain, bottom to top, once it has loaded. */}
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{
            clipPath: photoReady || reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img
            src={`${PHOTO}2000.jpg`}
            srcSet={`${PHOTO}1200.jpg 1200w, ${PHOTO}2000.jpg 2000w`}
            sizes="100vw"
            alt="Fachada da DC Consórcios na Av. Alziro Zarur, em Londrina"
            width={2000}
            height={1500}
            fetchPriority="high"
            onLoad={onPhotoLoad}
            onError={() => setPhotoReady(true)}
            className="h-full w-full object-cover object-[62%_50%] lg:object-[50%_30%]"
          />
        </motion.div>

        {/* Bottom fade into the page; taller below lg, where the text overlaps the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-bg via-bg/70 via-30% to-transparent lg:h-1/3 lg:via-bg/30"
        />
        {/* lg+: left scrim behind the text column, clear before the DC sign (~51% of the photo). */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-bg/95 via-bg/75 via-35% to-transparent to-62% lg:block"
        />
        {/* The pale sky runs under the transparent fixed Nav; a short top fade keeps it readable. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/70 to-transparent lg:h-40"
        />
        {/* Scroll-linked dim. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-bg"
          style={{ opacity: reduceMotion ? 0 : dim }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 sm:pb-16 lg:py-20">
        <div className="max-w-xl lg:max-w-[30rem] xl:max-w-[36rem]">
          <h1 className="font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-text [text-shadow:0_2px_18px_rgb(10_15_23/0.6)] sm:text-5xl lg:text-[2.6rem] xl:text-5xl">
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
            className="mt-4 font-sans text-[0.95rem] leading-relaxed text-text/85 sm:mt-6 sm:text-lg lg:text-text/90"
          >
            Consórcio sem juros, com atendimento próximo do começo ao fim. A DC é representante
            exclusiva do Consórcio União em Londrina.
          </motion.p>

          <motion.div
            {...rise(H1_END)}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-bg/40 px-6 py-3 font-sans text-base font-semibold text-text backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-3.5"
            >
              Ver histórias de contemplação
              <ArrowDown size={18} aria-hidden="true" className="text-text-muted" />
            </motion.a>
          </motion.div>

          <motion.ul
            {...rise(H1_END + 0.15)}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-[0.8rem] text-text-muted sm:mt-8 sm:gap-x-5 sm:gap-y-2 sm:text-sm"
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
