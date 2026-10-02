import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { CREDENCIAIS, WA_PADRAO, waLink } from '../content';

// Pexels #31737859 by Sharath G., free for commercial use, no attribution required,
// atmospheric stock only, never captioned as a JEA property.
// ASSET NEEDED: a landscape photo of Londrina or of a real JEA property to replace this stock.
// Lives in public/ so index.html can preload it; keep these URLs in sync with the
// <link rel="preload"> tags there. -mobile is a 900x1600 portrait crop of the same framing
// (object-[70%_center]) so phones get a sharp image without the full 2400px file.
const PHOTO = `${import.meta.env.BASE_URL}images/hero-casa-entardecer-`;
const PHONE = '(max-aspect-ratio: 3/5)';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.2;
const LINE_STAGGER = 0.16;
const LINES = 3;
// When the last H1 line lands; the rest of the copy follows it.
const H1_END = LINE_START + LINES * LINE_STAGGER + 0.35;

const CLIP_CLOSED = 'inset(100% 0% 0% 0%)';
const CLIP_OPEN = 'inset(0% 0% 0% 0%)';

const CREDENCIAIS_TEXTO = CREDENCIAIS.map((c) => `${c.sigla} ${c.numero}`).join(' · ');

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // The photo entrance waits until the image is loaded and decoded, so the curtain
  // never plays over an empty box on a slow network. Text enters on mount regardless.
  const [photoReady, setPhotoReady] = useState(false);
  const onPhotoLoad = (e: SyntheticEvent<HTMLImageElement>) =>
    e.currentTarget
      .decode()
      .catch(() => {})
      .finally(() => setPhotoReady(true));
  const show = photoReady || !!reduceMotion;

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

  // overflow-hidden is the mask; bottom/right padding keeps descenders from being clipped.
  const mask = 'block overflow-hidden pb-[0.1em] pr-[0.15em] -mb-[0.1em]';

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-deep pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh lg:justify-center"
    >
      {/* Photo: curtain reveal + scale 1.08 to 1 once decoded, then a slow Ken Burns. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 overflow-hidden"
        initial={reduceMotion ? false : { clipPath: CLIP_CLOSED }}
        animate={{ clipPath: show ? CLIP_OPEN : CLIP_CLOSED }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: show ? 1 : 1.08 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <picture>
            <source media={PHONE} srcSet={`${PHOTO}mobile.jpg`} />
            <motion.img
              src={`${PHOTO}2400.jpg`}
              srcSet={`${PHOTO}1200.jpg 1200w, ${PHOTO}2400.jpg 2400w`}
              sizes="100vw"
              alt=""
              fetchPriority="high"
              onLoad={onPhotoLoad}
              onError={() => setPhotoReady(true)}
              className="absolute inset-0 h-full w-full origin-[70%_55%] object-cover object-[70%_center] will-change-transform"
              initial={{ scale: 1 }}
              animate={reduceMotion ? undefined : { scale: photoReady ? 1.07 : 1 }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 20, delay: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              }
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* Scrims: neutral black, localized, no filters. The lit house sits right of the
          left scrim's end (to-65%) so it stays bright. Mobile gets a bottom scrim under the text. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 via-50% to-transparent lg:from-black/40 lg:via-transparent lg:via-35%" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/70 via-black/35 via-40% to-transparent to-65% lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      {/* Clean straight edge into the next section. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-deep" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 lg:py-20">
        <h1 className="font-display text-[2rem] font-medium leading-[1.12] tracking-tight text-sand [text-shadow:0_2px_24px_rgb(0_0_0/0.45)] sm:text-[clamp(2.4rem,min(6.5vw,10vh),5rem)]">
          <span className={mask}>
            <motion.span className="block" {...line(0)}>
              Você faz os planos.
            </motion.span>
          </span>
          <span className={mask}>
            <motion.span className="block" {...line(1)}>
              A gente cuida
            </motion.span>
          </span>
          <span className={mask}>
            <motion.span className="block" {...line(2)}>
              do{' '}
              <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent [text-shadow:none]">
                imóvel
              </span>
              .
            </motion.span>
          </span>
        </h1>

        <motion.div {...rise(H1_END - 0.2)} className="mt-5 max-w-xl sm:mt-7">
          <p className="font-sans text-[0.95rem] leading-relaxed text-sand/90 sm:text-lg [text-shadow:0_1px_3px_rgb(0_0_0/0.6),0_2px_16px_rgb(0_0_0/0.5)]">
            Compra, venda e investimento em imóveis em Londrina, com José Eduardo Almeida à frente da JEA.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <motion.a
              href={waLink(WA_PADRAO)}
              target="_blank"
              rel="noopener"
              {...press}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-sans text-base font-bold text-accent-fg shadow-lg shadow-black/30 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-4"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Falar no WhatsApp
            </motion.a>
            <motion.a
              href="#como-funciona"
              {...press}
              className="inline-flex items-center justify-center rounded-full border border-sand/60 bg-black/20 px-7 py-3.5 font-sans text-base font-semibold text-sand backdrop-blur-md transition-colors hover:border-sand hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-4"
            >
              Como funciona
            </motion.a>
          </div>
        </motion.div>

        <motion.p
          {...rise(H1_END + 0.1)}
          className="mt-5 font-sans text-sm font-semibold tracking-wide text-sand-muted [text-shadow:0_1px_3px_rgb(0_0_0/0.7)] sm:mt-7"
        >
          {CREDENCIAIS_TEXTO}
        </motion.p>
      </div>
    </section>
  );
}
