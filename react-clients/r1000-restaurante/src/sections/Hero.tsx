import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
// Real client photo (sent by the R1000 owner via the agency, 2026-09-25):
// overhead marmitex de churrasco. Not stock. No people pictured.
import heroPhoto from '../assets/images/hero-marmitex-churrasco.webp';

const WHATSAPP_URL =
  'https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.';
const IFOOD_URL =
  'https://www.ifood.com.br/delivery/londrina-pr/r1000-restaurante-jardim-imagawa/ab6a8ae3-794f-4a36-9d59-d9301bb9da2b';

// Rising ember sparks ("brasa"). All values are deterministic, derived from
// the index with co-prime multipliers, so nothing jitters between renders
// and no two sparks share the same rhythm.
const SPARK_COUNT = 20;
const SPARKS = Array.from({ length: SPARK_COUNT }, (_, i) => {
  const left = (i * 37 + 11) % 100; // % across the section width
  const size = 2 + ((i * 7) % 4); // 2-5px
  const duration = 7 + ((i * 13) % 7) + (i % 3) * 0.6; // ~7-14.2s
  const delay = ((i * 11) % 17) * 0.55; // 0-8.8s staggered start
  const sway = 12 + ((i * 17) % 28); // 12-39px horizontal drift
  const dir = i % 2 === 0 ? 1 : -1;
  const rise = 55 + ((i * 19) % 35); // rises 55-89% of the viewport height
  const isEmber = i % 3 !== 0; // 2/3 amber ember, 1/3 brand orange
  return { left, size, duration, delay, sway: sway * dir, rise, isEmber };
});

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
});

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="
        relative overflow-hidden bg-bg
        min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))]
        min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]
      "
    >
      {/* Background photo: slow continuous Ken Burns zoom (scale only). */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? { scale: 1 } : { scale: 1.12 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 24,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }
        }
      >
        <img
          src={heroPhoto}
          alt="Marmitex de churrasco do R1000 com linguiça, frango assado, carne, batata frita e farofa"
          className="h-full w-full object-cover object-[center_55%]"
          fetchPriority="high"
        />
      </motion.div>

      {/* Scrims, kept light so the food stays appetizing.
          Mobile: text overlays the whole plate, so a stronger bottom-up fade.
          md+: lighter vertical fade + a left-to-right column for the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/45 md:via-bg/30 md:to-bg/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-bg/85 via-bg/45 to-transparent md:block"
      />

      {/* Rising ember sparks */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        >
          {SPARKS.map((s, i) => {
            const color = s.isEmber ? 'var(--color-ember)' : 'var(--color-accent)';
            return (
              <motion.span
                key={i}
                className="absolute bottom-0 rounded-full"
                style={{
                  left: `${s.left}%`,
                  width: s.size,
                  height: s.size,
                  backgroundColor: color,
                  boxShadow: `0 0 ${s.size * 2 + 4}px ${Math.ceil(s.size / 2)}px color-mix(in srgb, ${color} 70%, transparent)`,
                }}
                initial={{ y: 0, x: 0, opacity: 0, scale: 1 }}
                animate={{
                  y: ['0vh', `-${s.rise * 0.35}vh`, `-${s.rise * 0.7}vh`, `-${s.rise}vh`],
                  x: [0, s.sway, -s.sway * 0.5, s.sway * 0.8],
                  opacity: [0, 1, 0.75, 0],
                  scale: [1, 1, 0.8, 0.4],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                  times: [0, 0.3, 0.7, 1],
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content. The fixed Nav overlays the hero, so top padding clears it.
          The wrapper overshoots one screen slightly (+2rem) so the photo
          fills the whole first viewport under the overlaid nav. */}
      <div
        className="
          relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-16
          pt-[calc(var(--nav-height,4.5rem)+2.5rem)] sm:px-10 md:justify-center md:pb-20
          min-h-[calc(100vh+2rem)] min-h-[calc(100svh+2rem)]
        "
      >
        <motion.span
          {...entrance(0)}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-bg/55 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-[0.22em] text-ember backdrop-blur-sm"
        >
          Jardim Imagawa · Londrina
        </motion.span>

        <motion.h1
          {...entrance(0.12)}
          className="max-w-3xl font-display text-5xl font-bold leading-[1.1] text-fg drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl"
        >
          Todo dia é dia de{' '}
          <span className="bg-gradient-to-r from-accent to-ember bg-clip-text text-transparent">
            churrasco
          </span>
          <span className="mt-2 block font-display text-3xl font-semibold leading-[1.15] text-fg/90 sm:text-4xl lg:text-[2.75rem]">
            e feijoada também.
          </span>
        </motion.h1>

        <motion.p
          {...entrance(0.26)}
          className="mt-6 max-w-xl font-sans text-base text-fg/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] sm:text-lg"
        >
          Marmitex de churrasco e prato feito, feitos na hora com comida de
          verdade. De terça a domingo, das 10h30 às 15h.
        </motion.p>

        <motion.div
          {...entrance(0.4)}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-card bg-accent px-7 py-4 font-sans text-base font-bold text-accent-fg shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Pedir no WhatsApp
          </motion.a>

          <motion.a
            href={IFOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            className="inline-flex cursor-pointer items-center justify-center rounded-card border border-fg/35 bg-bg/40 px-7 py-4 font-sans text-base font-bold text-fg backdrop-blur-sm transition-colors hover:border-fg/70 hover:bg-bg/60"
          >
            Pedir no iFood
          </motion.a>

          <motion.a
            href="#cardapio"
            whileHover={reduceMotion ? undefined : { x: 3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="inline-flex cursor-pointer items-center justify-center px-2 py-3 font-sans text-base font-medium text-fg/85 underline decoration-ember/60 underline-offset-4 transition-colors hover:text-fg hover:decoration-ember sm:justify-start"
          >
            Ver cardápio
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
