import { motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronRight, X } from 'lucide-react';

// Before/after contrast module — rebuilt from zero per the client's own
// explicit request after a photo+bullet-list layout was rejected twice.
// No photo here (deliberate, final decision): the "after" panel's
// continuous diagonal shimmer carries the motion this section would
// otherwise have gotten from an idle-floating photo.
const before = [
  'Treino genérico, igual pra todo mundo',
  'Ninguém pergunta sua história antes',
  'Dor que nunca foi realmente ouvida',
];

const after = [
  'Avaliação física antes de qualquer treino',
  'Prescrição que parte do seu histórico',
  'Ritmo e limitações sempre respeitados',
];

const credentials = [
  'Educação Física (UNOPAR)',
  // PROOF NEEDED: CREF 019973-G/PR never verified against the official
  // CREF-PR registry — displayed as the client herself states it.
  'CREF 019973-G/PR',
  'Especialista em coluna vertebral',
  '+10 anos em Londrina/PR',
];

export default function Sobre() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="bg-sage pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold text-forest sm:text-4xl">
            Sobre a Talita
          </h2>
          <p className="mt-2 font-display text-2xl font-extrabold text-forest sm:text-3xl">
            Ela{' '}
            <span className="bg-gradient-to-r from-accent to-forest bg-clip-text text-transparent">
              ouve
            </span>{' '}
            antes de prescrever.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]"
        >
          {/* Before panel */}
          <div className="w-full rounded-md border border-dashed border-forest/30 bg-white p-6">
            <span className="text-sm font-bold uppercase tracking-wide text-forest/55">
              Sem o acompanhamento certo
            </span>
            <ul className="mt-3 grid gap-2">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-2 text-forest/70">
                  <X size={13} strokeWidth={3} className="mt-1 shrink-0 text-forest/45" />
                  <span className="line-through decoration-forest/35">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pulsing arrow */}
          <motion.div
            aria-hidden="true"
            className="flex h-11 w-11 rotate-90 items-center justify-center justify-self-center rounded-full bg-accent text-accent-fg md:rotate-0"
            initial={{ boxShadow: '0 0 0 6px rgba(47,158,82,0.16)' }}
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      '0 0 0 6px rgba(47,158,82,0.16)',
                      '0 0 0 11px rgba(47,158,82,0.06)',
                      '0 0 0 6px rgba(47,158,82,0.16)',
                    ],
                  }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </motion.div>

          {/* After panel: winning panel, carries the shimmer */}
          <div className="relative w-full overflow-hidden rounded-md bg-forest p-6 text-bg shadow-[0_16px_32px_-16px_rgba(20,32,22,0.6)]">
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-accent/25 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '-100%', '100%', '100%'] }}
                transition={{
                  duration: 5,
                  times: [0, 0.2, 0.55, 1],
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            <span className="relative z-10 text-sm font-bold uppercase tracking-wide text-accent/90">
              Com a Talita
            </span>
            <ul className="relative z-10 mt-3 grid gap-2">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={13} strokeWidth={3} className="mt-1 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto mt-12 grid max-w-2xl justify-items-center gap-4 text-center"
        >
          <p className="text-muted">
            Antes de montar qualquer treino, a Talita quer entender sua história: o que você já
            tentou, o que doeu, o que funcionou e o que não funcionou. Por isso o treino se
            adapta a você, nunca uma planilha pronta igual para todo mundo.
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {credentials.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-pill bg-forest/8 px-3 py-1.5 text-xs font-semibold text-forest"
              >
                <Check size={12} strokeWidth={3} className="text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
