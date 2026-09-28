import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { waLink } from '../content';

// Mechanism (per design-brief.md Motion Language Plan): segmented toggle with a
// `layoutId` sliding pill; each row's answer swaps via AnimatePresence with a
// small per-row stagger. The pill carries a slow continuous sheen so the section
// still has idle life between interactions.

type Modo = 'consorcio' | 'financiamento';

const MODOS: { id: Modo; label: string }[] = [
  { id: 'consorcio', label: 'Consórcio' },
  { id: 'financiamento', label: 'Financiamento' },
];

// Copy exactly as approved in design-brief.md ("Comparativo").
const LINHAS: { label: string; consorcio: string; financiamento: string }[] = [
  {
    label: 'Juros',
    consorcio: 'Não tem juros. Você paga uma taxa de administração diluída nas parcelas.',
    financiamento: 'Tem juros sobre o valor financiado, durante todo o contrato.',
  },
  {
    label: 'Entrada',
    consorcio: 'Não exige entrada.',
    financiamento: 'Normalmente exige uma entrada.',
  },
  {
    label: 'Quando você recebe',
    consorcio: 'Depois da contemplação, por sorteio ou lance.',
    financiamento: 'Logo após a aprovação do crédito.',
  },
  {
    label: 'Custo total',
    consorcio: 'Tende a ser menor, por não ter juros.',
    financiamento: 'Tende a ser maior, por causa dos juros.',
  },
  {
    label: 'Ideal para',
    consorcio: 'Quem pode planejar e quer pagar menos no total.',
    financiamento: 'Quem precisa do bem agora.',
  },
];

function Marcador({ modo }: { modo: Modo }) {
  if (modo === 'consorcio') {
    // Subtle check: neutral silver, not the accent (accent is reserved for the
    // pill and the CTA).
    return (
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-silver/25 bg-surface-2 text-silver">
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  // Financiamento: neutral marker, no red X. Honest comparison, not an attack.
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-text-muted/70" />
    </span>
  );
}

export default function Comparativo() {
  const [modo, setModo] = useState<Modo>('consorcio');
  const reduceMotion = useReducedMotion();
  const tableId = useId();

  return (
    <section id="comparativo" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* Heading column */}
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--nav-height,4.5rem)+2rem)]">
            <h2 className="font-display text-3xl font-bold leading-[1.1] text-text sm:text-4xl lg:text-5xl">
              Consórcio ou <span className="text-accent">financiamento</span>?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
              Os dois levam ao mesmo bem, por caminhos diferentes. Veja qual combina com o seu
              momento.
            </p>

            <div className="mt-8 hidden lg:block">
              <CtaEFootnote />
            </div>
          </div>

          {/* Comparison card */}
          <div className="min-w-0">
            <div className="rounded-3xl border border-line bg-surface p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-4">
              {/* Segmented toggle */}
              <div
                role="group"
                aria-label="Escolha o que comparar"
                className="relative grid grid-cols-2 gap-1 rounded-full border border-line bg-deep p-1"
              >
                {MODOS.map((m) => {
                  const ativo = modo === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={ativo}
                      aria-controls={tableId}
                      onClick={() => setModo(m.id)}
                      className={`relative cursor-pointer rounded-full px-4 py-3 font-display text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base ${
                        ativo ? 'text-accent-fg' : 'text-text-muted hover:text-text'
                      }`}
                    >
                      {ativo && (
                        <motion.span
                          layoutId="comparativo-pill"
                          className="absolute inset-0 overflow-hidden rounded-full bg-accent"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 420, damping: 34 }
                          }
                        >
                          {/* Continuous slow sheen across the active pill */}
                          {!reduceMotion && (
                            <motion.span
                              aria-hidden="true"
                              className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                              initial={{ left: '-60%' }}
                              animate={{ left: ['-60%', '130%'] }}
                              transition={{
                                duration: 1.6,
                                ease: 'easeInOut',
                                repeat: Infinity,
                                repeatDelay: 3.2,
                              }}
                            />
                          )}
                        </motion.span>
                      )}
                      <span className="relative z-10">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Rows */}
              <dl id={tableId} aria-live="polite" className="mt-3 divide-y divide-line/70">
                {LINHAS.map((linha, i) => (
                  <div
                    key={linha.label}
                    className="grid gap-2 px-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:px-4"
                  >
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-silver sm:pt-1">
                      {linha.label}
                    </dt>
                    {/* Every answer shares one grid cell: an invisible copy of BOTH
                        answers reserves the taller one's height, so the card never
                        jumps when the mode changes. */}
                    <dd className="grid">
                      {MODOS.map((m) => (
                        <span
                          key={`ghost-${m.id}`}
                          aria-hidden="true"
                          className="invisible flex gap-3 text-base leading-relaxed [grid-area:1/1]"
                        >
                          <span className="h-6 w-6 shrink-0" />
                          {linha[m.id]}
                        </span>
                      ))}
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={modo}
                          className="flex items-start gap-3 text-base leading-relaxed [grid-area:1/1]"
                          initial={
                            reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, filter: 'blur(4px)' }
                          }
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={
                            reduceMotion
                              ? { opacity: 0, transition: { duration: 0 } }
                              : {
                                  opacity: 0,
                                  y: -10,
                                  filter: 'blur(4px)',
                                  transition: { duration: 0.2, delay: i * 0.04 },
                                }
                          }
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.07 }
                          }
                        >
                          <motion.span
                            className="flex"
                            initial={reduceMotion ? false : { scale: 0.4, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 18,
                                    delay: 0.14 + i * 0.07,
                                  }
                            }
                          >
                            <Marcador modo={modo} />
                          </motion.span>
                          <span className={modo === 'consorcio' ? 'text-text' : 'text-text/80'}>
                            {linha[modo]}
                          </span>
                        </motion.span>
                      </AnimatePresence>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 lg:hidden">
              <CtaEFootnote />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaEFootnote() {
  return (
    <>
      <motion.a
        href={waLink('Olá! Quero comparar consórcio e financiamento para o meu caso.')}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
        Ver qual faz sentido para mim
      </motion.a>
      <p className="mt-6 max-w-md text-xs leading-relaxed text-text-muted">
        Comparação geral entre as modalidades. Taxa de administração, fundo de reserva e seguro
        variam conforme o grupo: consulte as condições do seu plano.
      </p>
    </>
  );
}
