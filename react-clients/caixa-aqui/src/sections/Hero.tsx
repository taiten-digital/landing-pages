import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator, ChevronDown, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { EMPRESA, waLink } from '../content';
// Pexels #31737859 by Sharath G. (2400x1600, landscape). Pexels license: free for
// commercial use, no attribution required. Atmospheric stock only: never caption it
// as a client property or a home financed by them.
// Lives in public/ so index.html can preload it; keep these URLs in sync with the
// <link rel="preload"> tags there. -mobile is a 900x1600 portrait crop of the same
// framing (object-[70%_center]) so phones get a sharp image without the full 2400px file.
const PHOTO = `${import.meta.env.BASE_URL}images/hero-casa-entardecer-`;
const PHONE = '(max-aspect-ratio: 3/5)';
// Wikimedia Commons "Caixa Econômica Federal logo 1997.svg". CAIXA trademark, used
// because the client is an authorized CAIXA Aqui correspondent (confirmed by the user).
// Blue+orange artwork: only ever inside a WHITE chip.
import logoCaixa from '../assets/images/logo-caixa.svg';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.2;
const LINE_STAGGER = 0.16;
const LINES = 3;
// When the last H1 line lands; the rest of the copy follows it.
const H1_END = LINE_START + LINES * LINE_STAGGER + 0.35;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // Fade the photo in once it's decoded instead of letting it pop in over the dark bg.
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
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const press = reduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  // overflow-hidden is the mask; the bottom/right padding keeps the italic
  // overhang and descenders from being clipped.
  const mask = 'block overflow-hidden pb-[0.08em] pr-[0.15em] -mb-[0.08em]';

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-deep pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh lg:justify-center"
    >
      {/* Photo: slow Ken Burns, zooming toward the lit house on the right; fades in on load. */}
      <picture>
        <source media={PHONE} srcSet={`${PHOTO}mobile.jpg`} />
        <motion.img
          src={`${PHOTO}2400.jpg`}
          srcSet={`${PHOTO}1200.jpg 1200w, ${PHOTO}2400.jpg 2400w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          onLoad={onPhotoLoad}
          onError={() => setPhotoReady(true)}
          className="absolute inset-0 -z-20 h-full w-full origin-[70%_55%] object-cover object-[70%_center] will-change-transform"
          initial={{ scale: 1, opacity: reduceMotion ? 1 : 0 }}
          animate={reduceMotion ? undefined : { scale: 1.08, opacity: photoReady ? 1 : 0 }}
          transition={
            reduceMotion
              ? undefined
              : {
                  scale: { duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                  opacity: { duration: 0.9, ease: EASE },
                }
          }
        />
      </picture>

      {/* Scrims: neutral black, localized (bottom + left on lg), no filters, so the
          house on the right stays bright and readable as a photo. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 via-40% to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/55 via-black/20 to-transparent lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/35 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 lg:py-20">
        <h1 className="font-display text-[clamp(2.6rem,min(7.5vw,11vh),5.75rem)] font-extrabold leading-[1.1] tracking-tight text-on-dark [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
          <span className={mask}>
            <motion.span className="block" {...line(0)}>
              Facilitando
            </motion.span>
          </span>
          <span className={mask}>
            <motion.span className="block" {...line(1)}>
              suas
            </motion.span>
          </span>
          <span className={mask}>
            <motion.span className="block" {...line(2)}>
              <em className="italic text-accent">conquistas</em>.
            </motion.span>
          </span>
        </h1>

        <motion.div {...rise(H1_END - 0.2)} className="mt-6 max-w-xl sm:mt-8">
          <p className="font-sans text-base text-on-dark/90 sm:text-lg [text-shadow:0_1px_3px_rgb(0_0_0/0.6),0_2px_16px_rgb(0_0_0/0.5)]">
            Correspondente CAIXA Aqui em Londrina. Simule seu financiamento em segundos e
            conte com a gente em todo o processo, da simulação à assinatura.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center [@media(max-height:760px)]:mt-5">
            <motion.a
              href="#simulador"
              {...press}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-sans text-base font-bold text-accent-fg shadow-lg shadow-black/30 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Calculator size={19} aria-hidden="true" />
              Simular meu financiamento
            </motion.a>
            <motion.a
              href={waLink('Olá! Vim pelo site e quero falar sobre financiamento.')}
              target="_blank"
              rel="noopener"
              {...press}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-on-dark/70 bg-black/20 px-7 py-4 font-sans text-base font-bold text-on-dark backdrop-blur-md transition-colors hover:border-on-dark hover:bg-on-dark/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Falar no WhatsApp
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          {...rise(H1_END + 0.1)}
          className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 [@media(max-height:760px)]:mt-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-md shadow-black/20">
            <img src={logoCaixa} alt="CAIXA" className="h-3.5 w-auto" />
            <span className="font-sans text-xs font-bold text-text sm:text-sm">{EMPRESA.correspondente}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-on-dark/90 [text-shadow:0_1px_3px_rgb(0_0_0/0.6)]">
            <MapPin size={16} aria-hidden="true" className="shrink-0 text-on-dark-muted" />
            Rua Pio XII, 303 · Centro de Londrina
          </span>
        </motion.div>
      </div>

      {/* Scroll cue (sm+ only, so it never sits on the stacked mobile credential line) */}
      <motion.a
        href="#simulador"
        aria-label="Ir para o simulador"
        {...rise(H1_END + 0.4)}
        className="absolute bottom-5 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-on-dark/70 transition-colors hover:text-on-dark sm:flex [@media(max-height:760px)]:hidden"
      >
        <motion.span
          className="flex"
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={26} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
