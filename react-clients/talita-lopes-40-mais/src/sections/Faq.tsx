import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { OFERTA } from '../content';

const ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: 'Nunca corri. O curso serve para mim?',
    a: 'Serve. O Método C40 foi pensado tanto para quem está começando do zero quanto para quem já corre e quer evoluir, sempre com progressão no seu ritmo.',
  },
  {
    q: 'Preciso de academia?',
    a: (
      <>
        {/* TODO: PROOF NEEDED, validar com a cliente se os treinos de força podem mesmo ser feitos em casa */}
        Não necessariamente. Os treinos de força podem ser adaptados para fazer em casa, com materiais simples, ou na academia.
      </>
    ),
  },
  {
    q: 'Tenho menos de 40 anos. Posso participar?',
    a: 'Pode. O conteúdo foi pensado para o corpo da mulher depois dos 40, mas as orientações de corrida, força e saúde fazem sentido para qualquer mulher que queira começar a se cuidar.',
  },
  {
    q: 'Tenho alguma dor ou condição de saúde. Posso fazer?',
    a: 'Antes de começar qualquer programa de exercícios, o ideal é ter a liberação do seu médico. O curso traz orientações para respeitar os sinais do corpo, mas não substitui um acompanhamento individual.',
  },
  {
    q: 'E se eu não gostar?',
    a: `Você tem ${OFERTA.garantiaDias} dias de garantia a partir da compra. Se sentir que não é para você, é só pedir o reembolso e devolvemos 100% do valor.`,
  },
  {
    q: 'Como recebo o acesso?',
    a: (
      <>
        {/* TODO: PROOF NEEDED, a plataforma própria do Método C40 ainda não existe */}
        Assim que o pagamento for confirmado, você recebe por e-mail o acesso à plataforma do Método C40.
      </>
    ),
  },
];

const pad = (n: number) => String(n).padStart(2, '0');
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <section id="faq" className="bg-bg py-16 sm:py-20 text-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
        {/* Left: sticky editorial column */}
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--nav-height,4.5rem)+2rem)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Dúvidas</p>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl leading-[1.1] text-text">
            Perguntas <em className="italic">frequentes</em>
          </h2>

          {/* Big numeral of the open question, rolled in/out with the accordion state */}
          <div className="mt-8 hidden lg:flex items-end gap-3 font-display text-text/15" aria-hidden="true">
            <div className="relative h-28 w-36 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.span
                  key={open ?? 'none'}
                  className="absolute inset-0 text-[7rem] leading-none"
                  initial={reduce ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: reduce ? 0 : '-100%', opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                >
                  {open === null ? '00' : pad(open + 1)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="pb-2 text-3xl italic">/ {pad(ITEMS.length)}</span>
          </div>

          <p className="mt-6 lg:mt-4 max-w-sm text-text-muted leading-relaxed">
            Não encontrou sua dúvida?{' '}
            <a
              href="#lista"
              className="font-semibold text-text underline decoration-text/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Entre na lista de espera e fale com a gente.
            </a>
          </p>
        </div>

        {/* Right: accordion, one item open at a time */}
        <ul className="min-w-0 border-t border-text/10">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-q${i}`;
            const panelId = `${uid}-a${i}`;
            return (
              <li key={item.q} className="border-b border-text/10 py-1.5">
                <div
                  className={`rounded-3xl transition-colors duration-300 ${isOpen ? 'bg-surface' : 'bg-transparent'}`}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="cursor-pointer group flex w-full items-start gap-4 sm:gap-6 rounded-3xl px-4 sm:px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="w-6 shrink-0 pt-1.5 text-xs font-semibold tabular-nums text-text-muted">
                        {pad(i + 1)}
                      </span>
                      <span className="flex-1 font-sans font-semibold text-lg sm:text-xl leading-snug text-text">
                        {item.q}
                      </span>
                      <motion.span
                        className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                          isOpen
                            ? 'bg-accent text-accent-fg border-accent'
                            : 'border-text/15 text-text group-hover:border-text/40'
                        }`}
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                      >
                        <Plus className="size-4" strokeWidth={2.25} aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="overflow-hidden"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                      >
                        {/* left padding = button px + number column (w-6) + gap, so answers align under the question */}
                        <p className="max-w-2xl pb-6 pl-14 pr-4 sm:pl-[4.5rem] sm:pr-16 text-text-muted leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
