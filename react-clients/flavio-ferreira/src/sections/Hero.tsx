import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { CONTATO, EMPRESA, WA_PADRAO, waLink } from '../content';

// Pexels #39135603 "Modern High-Rise Buildings at Sunset" by Lin Htet Tun. Pexels License,
// free for commercial use, no attribution required. Atmospheric stock only: never caption or
// imply it is a Flávio Ferreira property or a Londrina building.
// Lives in public/ so index.html can preload it; keep these URLs in sync with the
// <link rel="preload"> tags there. -mobile is a 900x1600 portrait crop centered on the towers.
// ASSET NEEDED: a landscape photo of the Gleba Palhano or of a real empreendimento to replace this stock.
const PHOTO = `${import.meta.env.BASE_URL}images/hero-torres-`;
const PHONE = '(max-aspect-ratio: 3/5)';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.2;
const LINE_STAGGER = 0.14;
// Short lines so each one fits the ~50% text column on desktop and 343px on a phone.
const LINES = ['Lançamentos e', 'imóveis prontos', 'em Londrina, com', 'assessoria'];
// When the last H1 line lands; the rest of the copy follows it.
const H1_END = LINE_START + LINES.length * LINE_STAGGER + 0.35;

const CLIP_CLOSED = 'inset(100% 0% 0% 0%)';
const CLIP_OPEN = 'inset(0% 0% 0% 0%)';

const CREDENCIAL = `${EMPRESA.nomeCurto} · ${EMPRESA.creci} · ${CONTATO.bairro}, ${EMPRESA.cidade}`;

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
          initial: { y: '115%' },
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

  // overflow-hidden is the mask; bottom/right padding keeps descenders and accents unclipped.
  const mask = 'block overflow-hidden pb-[0.12em] pr-[0.15em] -mb-[0.12em]';

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
              className="absolute inset-0 h-full w-full origin-[55%_60%] object-cover object-center will-change-transform"
              initial={{ scale: 1 }}
              animate={reduceMotion ? undefined : { scale: photoReady ? 1.08 : 1 }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 22, delay: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              }
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* Scrims in the brand navy. Mobile: bottom fade under the text, towers stay visible above it.
          Desktop: left scrim ends at 62% so the centered towers keep their glow, plus a light bottom fade. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/70 via-40% to-transparent to-75% lg:from-deep/60 lg:via-transparent lg:via-30%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-deep/95 via-deep/75 via-35% to-transparent to-62% lg:block"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-deep/50 to-transparent" />
      {/* Clean straight edge into the next section. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-b from-transparent to-deep" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-14 lg:py-16">
        <h1 className="max-w-[38rem] font-display text-[2rem] leading-[1.15] text-sand [text-shadow:0_2px_24px_rgb(10_21_48/0.55)] sm:text-[clamp(2.4rem,min(4.2vw,8vh),3.5rem)]">
          {LINES.map((text, i) => (
            <span key={text} className={mask}>
              <motion.span className="block" {...line(i)}>
                {text}
                {i === LINES.length - 1 && (
                  <>
                    {' '}
                    {/* Emphasis word: gold gradient with a slow continuous sheen. */}
                    <motion.span
                      className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_100%] bg-clip-text text-transparent [text-shadow:none]"
                      initial={{ backgroundPosition: '0% 50%' }}
                      animate={reduceMotion ? undefined : { backgroundPosition: '100% 50%' }}
                      transition={
                        reduceMotion
                          ? undefined
                          : { duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                      }
                    >
                      segura
                    </motion.span>
                    .
                  </>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div {...rise(H1_END - 0.2)} className="mt-4 max-w-xl sm:mt-6 lg:max-w-[30rem]">
          <p className="font-sans text-pretty text-[0.9rem] leading-relaxed text-sand/90 sm:text-lg [text-shadow:0_1px_3px_rgb(10_21_48/0.7),0_2px_16px_rgb(10_21_48/0.5)]">
            Imóveis novos e recém-construídos de médio e alto padrão, consórcio imobiliário e áreas para
            incorporação, com atendimento personalizado do primeiro contato à entrega das chaves.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <motion.a
              href={waLink(WA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              {...press}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-sans text-base font-semibold text-accent-fg shadow-lg shadow-black/30 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-4"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Falar no WhatsApp
            </motion.a>
            <motion.a
              href="#servicos"
              {...press}
              className="inline-flex items-center justify-center rounded-full border border-sand/50 bg-deep/30 px-7 py-3.5 font-sans text-base font-medium text-sand backdrop-blur-md transition-colors hover:border-sand hover:bg-sand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-4"
            >
              Ver serviços
            </motion.a>
          </div>
        </motion.div>

        <motion.p
          {...rise(H1_END + 0.1)}
          className="mt-4 font-sans text-sm tracking-wide text-sand-muted [text-shadow:0_1px_3px_rgb(10_21_48/0.8)] sm:mt-6"
        >
          {CREDENCIAL}
        </motion.p>
      </div>
    </section>
  );
}
