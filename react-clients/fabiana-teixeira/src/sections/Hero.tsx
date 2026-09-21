import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
// Client-confirmed real training photo (genuinely Fabiana), designated for
// Hero by the client. 1441x737, landscape, already a good aspect-ratio
// match for a full-bleed hero per CLAUDE.md.
import heroPhoto from '../assets/images/hero-deadlift.png';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=5543991167030&text=' +
  encodeURIComponent('Oi, Fabiana! Vi sua página e quero começar meu acompanhamento.');

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative flex items-center overflow-hidden bg-bg
        min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))]
        min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]
      "
    >
      {/* Background photo: slow continuous Ken Burns zoom, visible immediately */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? {} : { scale: [1, 1.12, 1] }}
        transition={
          reduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <img
          src={heroPhoto}
          alt="Fabiana Teixeira em treino de levantamento terra"
          className="h-full w-full object-cover object-[50%_35%]"
        />
      </motion.div>

      {/* Gradient scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 sm:px-10">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-5 inline-block rounded-full border border-border bg-surface/70 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-text-muted backdrop-blur-sm"
        >
          Personal Trainer em Londrina/PR &middot; Presencial e Online
        </motion.span>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="max-w-2xl font-display text-5xl uppercase leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl"
        >
          Seu <span className="text-accent">emagrecimento</span> com acompanhamento de verdade
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.22 }}
          className="mt-6 max-w-xl font-sans text-base text-text-muted sm:text-lg"
        >
          Treinos pensados para o seu ritmo, presenciais em Londrina ou 100% online, de onde você
          estiver. Sem cobrança, sem comparação: só você evoluindo, um treino de cada vez.
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
