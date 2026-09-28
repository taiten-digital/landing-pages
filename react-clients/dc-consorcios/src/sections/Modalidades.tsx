import type { ComponentType } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight, CarFront, House } from 'lucide-react';
import { TbMotorbike } from 'react-icons/tb';
import { MODALIDADES, waLink } from '../content';

type IconComp = ComponentType<{ className?: string; strokeWidth?: number }>;

// Icons: lucide House / CarFront are literal house and car. lucide has no motorcycle
// (its `Bike` is a bicycle), so the moto card uses Tabler's `TbMotorbike` (outline,
// 24px grid, 2px stroke like lucide) so the three glyphs share one visual weight.
const ICONES: Record<(typeof MODALIDADES)[number]['id'], IconComp> = {
  imovel: House,
  carro: CarFront,
  moto: TbMotorbike,
};

// Per-card float settings: different duration, delay and amplitude so the three
// cards drift out of phase instead of bobbing in sync.
const FLOAT = [
  { duration: 5.2, delay: 0, y: -10 },
  { duration: 6.4, delay: 0.9, y: -14 },
  { duration: 5.8, delay: 1.7, y: -9 },
];

export default function Modalidades() {
  const reduceMotion = useReducedMotion();

  const iconVariants: Variants = {
    rest: { y: 0, rotate: 0, scale: 1 },
    hover: reduceMotion
      ? { y: 0, rotate: 0, scale: 1 }
      : { y: -6, rotate: -10, scale: 1.08, transition: { type: 'spring', stiffness: 320, damping: 14 } },
  };

  const ghostVariants: Variants = {
    rest: { rotate: 0, x: 0, opacity: 0.04 },
    hover: reduceMotion
      ? { rotate: 0, x: 0, opacity: 0.04 }
      : { rotate: 8, x: -8, opacity: 0.08, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const lineVariants: Variants = {
    rest: { scaleX: 0.25, opacity: 0.5 },
    hover: { scaleX: 1, opacity: 1, transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="modalidades" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-text sm:text-4xl lg:text-5xl">
            Um consórcio para cada <span className="text-accent">objetivo</span>
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            Imóvel, carro ou moto. A gente monta com você o plano que cabe no seu orçamento.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 md:grid-cols-3 lg:gap-8">
          {MODALIDADES.map((m, i) => {
            const Icone = ICONES[m.id];
            const f = FLOAT[i % FLOAT.length];
            return (
              <motion.div
                key={m.id}
                animate={reduceMotion ? {} : { y: [0, f.y, 0] }}
                transition={{
                  duration: f.duration,
                  delay: f.delay,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.article
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-3xl border border-line bg-surface-2 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-silver/30 sm:p-8"
                >
                  {/* Oversized ghost of the same icon, decorative texture in the corner */}
                  <motion.div
                    aria-hidden="true"
                    variants={ghostVariants}
                    className="pointer-events-none absolute -bottom-8 -right-8 text-silver"
                  >
                    <Icone className="h-44 w-44" strokeWidth={1.25} />
                  </motion.div>

                  {/* Thin top rule that stretches on hover */}
                  <motion.span
                    aria-hidden="true"
                    variants={lineVariants}
                    style={{ originX: 0 }}
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-silver/70 via-silver/30 to-transparent"
                  />

                  <div className="relative">
                    <motion.div
                      aria-hidden="true"
                      variants={iconVariants}
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-silver"
                    >
                      <Icone className="h-7 w-7" strokeWidth={1.75} />
                    </motion.div>

                    <h3 className="mt-6 font-display text-xl font-semibold leading-[1.15] text-text sm:text-2xl">
                      {m.titulo}
                    </h3>
                    <p className="mt-3 text-text-muted">{m.texto}</p>

                    <a
                      href={waLink(m.mensagem)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Simular pelo WhatsApp
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-text-muted">
          Tem outro objetivo em mente?{' '}
          <a
            href={waLink('Olá! Vim pelo site e quero saber quais planos de consórcio vocês têm.')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
          >
            Fale com a gente
          </a>{' '}
          e veja os planos disponíveis.
        </p>
      </div>
    </section>
  );
}
