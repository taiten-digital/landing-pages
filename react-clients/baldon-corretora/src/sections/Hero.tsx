import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, MapPin, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { EMPRESA, GOOGLE, waLink } from '../content';

// Hero photo: Pexels, photographer Deepak DK (pexels.com/photo/4933643). Free for commercial
// use, no attribution required. Generic stock of a house at dusk, atmospheric only: it is NOT
// the client's property and must never be captioned as such. Resized to 2000/1200w plus a
// 900x1600 portrait crop for phones, in public/images/.
const BASE = import.meta.env.BASE_URL;

const EASE = [0.22, 1, 0.36, 1] as const;
const LINE_START = 0.3;
const LINE_STAGGER = 0.14;
const LINES = 3;
const H1_END = LINE_START + LINES * LINE_STAGGER + 0.3;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [photoReady, setPhotoReady] = useState(false);

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
  const mask = 'block overflow-hidden pb-[0.1em] -mb-[0.1em]';

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-bg pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh lg:justify-center"
    >
      {/* Photo: fades in once decoded; slow CSS zoom (transform only, no JS). */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <picture>
          <source
            media="(max-aspect-ratio: 3/5)"
            srcSet={`${BASE}images/hero-casa-mobile.jpg`}
          />
          <img
            src={`${BASE}images/hero-casa-1200.jpg`}
            srcSet={`${BASE}images/hero-casa-1200.jpg 1200w, ${BASE}images/hero-casa-2000.jpg 2000w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            onLoad={(e) => e.currentTarget.decode().catch(() => {}).finally(() => setPhotoReady(true))}
            onError={() => setPhotoReady(true)}
            className={`h-full w-full object-cover object-[60%_50%] transition-opacity duration-1000 ${
              photoReady ? 'opacity-100' : 'opacity-0'
            } ${reduceMotion ? '' : 'animate-[hero-zoom_24s_ease-out_forwards]'}`}
          />
        </picture>
      </div>
      {/* Scrims: start light and confirm the house is visible. Bottom fade on mobile, left on lg. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg from-10% via-bg/70 via-45% to-bg/10 lg:bg-gradient-to-r lg:from-bg/95 lg:via-bg/70 lg:via-35% lg:to-transparent lg:to-65%"
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
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-sans text-base font-bold text-white shadow-lg shadow-black/30 transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Falar pelo WhatsApp
            </motion.a>
            <motion.a
              href="#seguros"
              {...press}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-bg/40 px-6 py-3 font-sans text-base font-semibold text-text transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-3.5"
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
