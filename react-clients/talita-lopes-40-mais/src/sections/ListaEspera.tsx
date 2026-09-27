import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { LINKS } from '../content';

const inputClass =
  'relative block h-12 w-full rounded-2xl border border-text/15 bg-bg px-4 text-base text-text placeholder:text-text-muted/60 outline-none transition-colors focus:border-accent';
const labelClass = 'mb-2 block text-sm font-semibold text-text';

// Glow ring behind a field: fades/scales in while that field has focus.
function Glow({ on, reduce, children }: { on: boolean; reduce: boolean; children: ReactNode }) {
  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl shadow-lg shadow-accent/30 ring-4 ring-blush"
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.94 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 24 }}
      />
      {children}
    </div>
  );
}

export default function ListaEspera() {
  const reduce = !!useReducedMotion();
  const [focused, setFocused] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // ponytail: sem backend, ligar ao CRM/plataforma quando existir (RF01)
    const nome = String(new FormData(e.currentTarget).get('nome') ?? '').trim();
    setFirstName(nome.split(/\s+/)[0] || nome);
  }

  const swap = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="lista" className="bg-surface py-16 text-text sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">Lista de espera</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-text sm:text-5xl lg:text-6xl">
            Quer ser <em className="italic">avisada primeiro</em>?
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">
            Deixe seu contato e receba as novidades do Novo Ciclo e o aviso de lançamento direto no seu e-mail.
          </p>
        </div>

        <div className="min-w-0 rounded-3xl bg-bg p-6 shadow-2xl shadow-deep/10 sm:p-8" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {firstName === null ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                onFocus={(e) => setFocused(e.target.id)}
                onBlur={() => setFocused(null)}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={swap}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="lista-nome" className={labelClass}>Nome</label>
                  <Glow on={focused === 'lista-nome'} reduce={reduce}>
                    <input id="lista-nome" name="nome" type="text" required autoComplete="name" placeholder="Seu nome" className={inputClass} />
                  </Glow>
                </div>

                <div>
                  <label htmlFor="lista-email" className={labelClass}>E-mail</label>
                  <Glow on={focused === 'lista-email'} reduce={reduce}>
                    <input id="lista-email" name="email" type="email" required autoComplete="email" placeholder="voce@email.com" className={inputClass} />
                  </Glow>
                </div>

                <div>
                  <label htmlFor="lista-whatsapp" className={labelClass}>
                    WhatsApp <span className="font-normal text-text-muted">(opcional)</span>
                  </label>
                  <Glow on={focused === 'lista-whatsapp'} reduce={reduce}>
                    <input id="lista-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" className={inputClass} />
                  </Glow>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="lista-consentimento"
                    name="consentimento"
                    type="checkbox"
                    required
                    className="mt-0.5 size-5 shrink-0 cursor-pointer accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  />
                  <label htmlFor="lista-consentimento" className="cursor-pointer text-sm leading-relaxed text-text-muted">
                    Aceito receber comunicações do Novo Ciclo e li a{' '}
                    <a
                      href={LINKS.privacidade}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-text underline underline-offset-2 hover:text-accent"
                    >
                      Política de Privacidade
                    </a>
                    . Posso cancelar quando quiser.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="relative w-full cursor-pointer overflow-hidden rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush"
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                      initial={{ x: '-150%' }}
                      animate={{ x: '400%' }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                    />
                  )}
                  <span className="relative">Quero ser avisada</span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={swap}
                className="flex flex-col items-center py-8 text-center"
              >
                <motion.div
                  initial={reduce ? false : { scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
                  className="flex size-20 items-center justify-center rounded-full bg-blush/60"
                >
                  <CircleCheck className="size-11 text-accent" strokeWidth={1.75} aria-hidden />
                </motion.div>
                <h3
                  ref={(el) => el?.focus()}
                  tabIndex={-1}
                  className="mt-6 font-display text-3xl leading-[1.1] text-text outline-none sm:text-4xl"
                >
                  Pronto, <em className="italic">{firstName}</em>!
                </h3>
                <p className="mt-3 max-w-sm text-lg leading-relaxed text-text-muted">
                  Você está na lista. Vamos te avisar por e-mail.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
