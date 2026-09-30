import { motion, useReducedMotion } from 'framer-motion';
import { Users, TicketCheck, Landmark, HandCoins, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SOLUCOES, waLink } from '../content';

// Literal lucide-react icons: Users (group of people = consórcio novo, a group buying together),
// TicketCheck (already drawn/confirmed = contemplado), Landmark (bank = financiamento),
// HandCoins (hand handing money = empréstimo).
const ICONS: Record<string, LucideIcon> = {
  consorcio: Users,
  contemplado: TicketCheck,
  financiamento: Landmark,
  emprestimo: HandCoins,
};

// Different duration and delay per card so they drift out of phase.
const FLOAT = [
  { duration: 4.2, delay: 0, amp: -8 },
  { duration: 5.1, delay: 0.7, amp: -10 },
  { duration: 4.6, delay: 1.3, amp: -7 },
  { duration: 5.6, delay: 0.3, amp: -9 },
];

export default function Solucoes() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="solucoes"
      className="bg-bg py-16 sm:py-20 scroll-mt-[var(--nav-height,4.5rem)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-text">
            Crédito para cada <span className="text-accent">momento</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-muted">
            Consórcio, carta contemplada, financiamento ou empréstimo. Um caminho para cada
            situação, com representantes autorizados ao seu lado.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4 pt-3">
          {SOLUCOES.map((s, i) => {
            const Icon = ICONS[s.id] ?? Landmark;
            const f = FLOAT[i % FLOAT.length];
            return (
              <motion.article
                key={s.id}
                className="min-w-0 rounded-2xl border border-line bg-surface p-6 shadow-sm"
                animate={reduceMotion ? undefined : { y: [0, f.amp, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }
                }
                whileHover="hover"
              >
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-2 text-navy"
                  variants={
                    reduceMotion
                      ? undefined
                      : { hover: { rotate: -12, scale: 1.12, transition: { type: 'spring', stiffness: 300, damping: 14 } } }
                  }
                >
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                </motion.div>
                <h3 className="mt-5 font-display text-xl font-semibold leading-[1.2] text-text">
                  {s.titulo}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-text-muted">{s.texto}</p>
                <a
                  href={waLink(`Olá! Vim pelo site da ConsorciCred e quero saber mais sobre: ${s.titulo}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline-offset-4 hover:text-accent hover:underline"
                >
                  Saber mais no WhatsApp
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-text-muted">
          Condições, prazos e taxas variam conforme o plano. Fale com a gente para simular.
        </p>
      </div>
    </section>
  );
}
