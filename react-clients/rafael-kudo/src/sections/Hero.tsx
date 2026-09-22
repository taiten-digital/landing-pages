import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
// Decorative/atmospheric stock only, NOT a photo of Rafael Kudo or any real
// person. Pexels license (photographer Leon Mart) — free for commercial
// use, no attribution required. Empty, moody gym interior, landscape
// 4288x2848 (matches a wide full-bleed hero's aspect ratio without a crop
// that guts the composition).
import heroPhoto from '../assets/images/hero-gym-pexels.jpg';

const WHATSAPP_URL =
  'https://wa.me/5543991720681?text=' +
  encodeURIComponent('Oi, Rafael! Vi sua página e quero saber mais sobre o seu método.');

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    // Nav.tsx measures its own real rendered height via getBoundingClientRect
    // and publishes it as --nav-height on the document root; Hero just reads
    // it back so Hero + Nav sum to exactly one viewport, per CLAUDE.md's
    // "Full-bleed hero sections" rule (never a constant copied from another
    // client). The vh classes come first as a fallback for browsers that
    // don't parse the svh unit (invalid value is ignored, prior vh value
    // stands); svh classes after win wherever supported.
    <section
      id="top"
      className="
        relative flex items-center overflow-hidden bg-bg
        min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))]
        min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]
      "
      style={{ scrollMarginTop: 'var(--nav-height, 4.5rem)' }}
    >
      {/* Background photo: slow continuous Ken Burns zoom, visible immediately (no whileInView) */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? {} : { scale: [1, 1.14, 1] }}
        transition={reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={heroPhoto}
          alt="Interior de academia vazia, em tons escuros"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/35 to-transparent" />

      {/* Ambient glow behind the headline: large blur, fully transparent well before its own edge */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 65%)',
        }}
        animate={reduceMotion ? {} : { opacity: [0.25, 0.4, 0.25] }}
        transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-5 inline-block rounded-full border border-border bg-surface/70 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-text-muted backdrop-blur-sm"
        >
          Coach de Alta Performance &middot; Presencial e Online
        </motion.span>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="max-w-5xl font-display text-5xl uppercase leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl"
        >
          Corpo, mente e nutrição treinando <span className="text-accent">na mesma direção</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.22 }}
          className="mt-6 max-w-xl font-sans text-base text-text/80 sm:text-lg"
        >
          Rafael Kudo une preparação física, saúde mental e nutricional num único método para
          estruturar programas de desenvolvimento de excelência e alta performance, feitos para o
          seu corpo e a sua cabeça, não um treino genérico.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.34 }}
          className="mt-10"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-accent-fg shadow-lg shadow-accent/30"
          >
            <FaWhatsapp size={18} aria-hidden="true" />
            Falar no WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
