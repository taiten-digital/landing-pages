import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import heroPhoto from '../assets/images/jonatas-corrida-por-do-sol.png';

const WHATSAPP_URL = 'https://wa.me/5543999813940';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="
        relative flex items-center overflow-hidden bg-bg
        min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))]
        min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]
      "
    >
      {/* Background photo — slow continuous center zoom (Ken Burns), the
          Hero's assigned mechanism (distinct from every other section). */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? {} : { scale: [1, 1.14, 1] }}
        transition={
          reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <img
          src={heroPhoto}
          alt="Jonatas Hotts correndo ao pôr do sol, com a cidade e o lago de Londrina ao fundo"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility scrim — horizontal component (strong behind the text
          column on the left, lighter over the golden sky/subject on the
          right) plus a vertical wash for the Nav at top and the stat row
          at the bottom. */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/55 to-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/45 via-transparent to-bg/25" />
      <div className="absolute inset-0 bg-bg/20" />

      {/* Ambient glow behind the headline — large blur, fully transparent
          well before its own edge, slow opacity pulse. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[28%] top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 45%, transparent) 0%, transparent 65%)',
        }}
        animate={reduceMotion ? {} : { opacity: [0.5, 0.9, 0.5] }}
        transition={
          reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 sm:px-10">
        <motion.span
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-5 inline-block rounded-full border border-accent-2/40 bg-bg/60 px-4 py-1.5 text-sm font-medium text-accent-2 backdrop-blur-sm"
        >
          Personal Trainer em Londrina, PR
        </motion.span>

        <motion.h1
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl"
        >
          Treino sob medida para emagrecer, ganhar força e evoluir de verdade
        </motion.h1>

        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.22 }}
          className="mt-6 max-w-xl text-base text-text-muted sm:text-lg"
        >
          Acompanhamento presencial em Londrina ou consultoria online, com
          vídeos explicando cada exercício e progressão pensada para o seu
          ritmo. Ideal para quem quer focar em emagrecimento e hipertrofia,
          mesmo começando sem nenhuma experiência prévia de treino.
        </motion.p>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.34 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-fg shadow-lg shadow-accent/30"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Falar no WhatsApp
          </motion.a>

          <div className="flex items-center gap-2 text-text">
            <div className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm font-semibold">
              5.0 <span className="font-normal text-text-muted">· 50 avaliações no Google</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
