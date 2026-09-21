import { motion, useReducedMotion } from 'framer-motion';
// Real client photo (sourced with explicit client authorization from
// donleonbarbearia.com.br — genuine barbershop interior, not stock).
import heroPhoto from '../assets/images/interior-lounge-couch.jpg';

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
      {/* Background photo — slow continuous center zoom (Ken Burns),
          scale-only, no pan: kept deliberately distinct from Sobre's
          own pan+zoom Ken Burns (different mechanism direction/speed). */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? {} : { scale: [1, 1.14, 1] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 26, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <img
          src={heroPhoto}
          alt="Lounge interno da Don Leon Barbearia: sofá de couro, parede de tijolo aparente e decoração esportiva"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
      <div className="absolute inset-0 bg-bg/30" />

      {/* Ambient glow behind headline — large blur, fully transparent
          well before its own edge, slow opacity pulse. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 45%, transparent) 0%, transparent 65%)',
        }}
        animate={reduceMotion ? {} : { opacity: [0.5, 0.9, 0.5] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 sm:px-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-5 inline-block rounded-full border border-accent-2/40 bg-bg-panel/60 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-accent-2 backdrop-blur-sm"
        >
          High Experience
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="max-w-3xl font-display text-5xl font-bold uppercase leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Don Leon
          </span>{' '}
          Barbearia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.22 }}
          className="mt-6 max-w-xl font-sans text-base text-fg-muted sm:text-lg"
        >
          Corte, barba, sobrancelha e combos num ambiente que é mais que uma
          barbearia: sofá de couro, tijolo aparente e memorabilia esportiva.
          A experiência física é parte do serviço. Presente em 4 unidades em
          Londrina/PR.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.34 }}
          className="mt-10"
        >
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-card bg-accent px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-fg shadow-lg shadow-accent/30 transition-colors hover:bg-accent-2"
          >
            Agendar horário
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
