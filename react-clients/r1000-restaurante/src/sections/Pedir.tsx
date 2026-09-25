import { Fragment, useLayoutEffect, useRef, useState, type Ref } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
// Simple Icons "iFood" brand mark (verified present in react-icons/si index.d.ts).
import { SiIfood } from 'react-icons/si';

const WHATSAPP_URL =
  'https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.';
const INSTAGRAM_URL = 'https://www.instagram.com/r1000restaurante/';
const IFOOD_URL =
  'https://www.ifood.com.br/delivery/londrina-pr/r1000-restaurante-jardim-imagawa/ab6a8ae3-794f-4a36-9d59-d9301bb9da2b';

// Dishes the client confirmed / lists in their own bio. No prices, no promo details.
const ITEMS = ['Churrasco', 'Costela', 'Frango assado', 'Feijoada', 'Marmitex', 'Prato feito'];

const PX_PER_SECOND = 60;

function TickerTrack({ trackRef }: { trackRef?: Ref<HTMLDivElement> }) {
  return (
    <div ref={trackRef} className="flex shrink-0 items-center" aria-hidden="true">
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span className="whitespace-nowrap px-6 font-display text-2xl font-bold uppercase leading-[1.1] tracking-wide text-fg sm:px-8 sm:text-4xl">
            {item}
          </span>
          <Flame className="h-5 w-5 shrink-0 text-ember sm:h-6 sm:w-6" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );
}

export default function Pedir() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  // Measured marquee: copies = enough to exceed the viewport, loop distance = one copy's real px width.
  // ResizeObserver also catches the width change once Zilla Slab finishes loading.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () => {
      const width = track.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      if (!width) return;
      setTrackWidth(width);
      setCopies(Math.max(2, Math.ceil(viewportWidth / width) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, []);

  const animateTicker = !reduceMotion && trackWidth > 0;

  return (
    <section id="pedir" className="relative overflow-hidden bg-bg-panel">
      {/* Ticker strip: dark band, cream display type, ember flame separators */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden border-y border-white/5 bg-bg py-4 sm:py-5"
        role="marquee"
        aria-label="Churrasco, costela, frango assado, feijoada, marmitex e prato feito"
      >
        <motion.div
          key={trackWidth}
          className="flex w-max items-center"
          animate={animateTicker ? { x: [0, -trackWidth] } : { x: 0 }}
          transition={
            animateTicker
              ? { duration: trackWidth / PX_PER_SECOND, repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
        >
          {Array.from({ length: copies }).map((_, i) => (
            <TickerTrack key={i} trackRef={i === 0 ? trackRef : undefined} />
          ))}
        </motion.div>
        {/* soft edge fades so words enter and leave gently */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent sm:w-24" />
      </div>

      {/* CTA panel */}
      <div className="relative px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ember">Promoções</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-fg sm:text-5xl lg:text-6xl">
            Tem promoção toda semana
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            As ofertas mudam, então chama no WhatsApp ou confere no Instagram antes de pedir. Pode pedir
            pelo iFood também.
          </p>
          {/* Client rule: never name a specific promotion, combo, price or day offer here. */}

          <div className="mt-12 flex flex-col items-center gap-8">
            {/* Primary CTA with breathing accent glow */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-16 -inset-y-12 rounded-full bg-[radial-gradient(closest-side,var(--color-accent),transparent_70%)] blur-2xl"
                  initial={{ opacity: 0.45, scale: 1 }}
                  animate={
                    reduceMotion
                      ? { opacity: 0.45, scale: 1 }
                      : { opacity: [0.35, 0.75, 0.35], scale: [0.92, 1.08, 0.92] }
                  }
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
                  }
                />
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-fg shadow-lg shadow-black/30 transition-colors hover:bg-accent-hover sm:px-10 sm:py-5 sm:text-xl"
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                >
                  <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
                  Pedir no WhatsApp
                </motion.a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium tracking-wide text-fg transition-colors hover:text-ember"
              >
                WhatsApp: (43) 99138-3162
              </a>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/15 bg-bg-raised px-6 py-3 font-medium text-fg transition-colors hover:border-ember/60"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                <FaInstagram className="h-5 w-5 text-fg-muted" aria-hidden="true" />
                Ver promoções no Instagram
              </motion.a>
              <motion.a
                href={IFOOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full px-6 py-3 font-medium text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                <SiIfood className="h-5 w-5" aria-hidden="true" />
                Pedir no iFood
              </motion.a>
            </div>
          </div>

          <p className="mt-10 text-sm text-fg-muted">Atendimento de terça a domingo, das 10h30 às 15h.</p>
        </div>
      </div>
    </section>
  );
}
