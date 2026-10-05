import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';

// Copy: Vinicius's own Instagram carousel, slides 4 ("O teste") and 5
// ("Diagnóstico"), see client-brief.md "Carousel copy". No per-answer
// verdicts are invented: picking a chip only highlights it.
const ANSWERS = ['Dias', 'Meses', 'Anos'] as const;

const SIGNS = [
  'Seu padrão de vida depende do próximo mês.',
  'Seu patrimônio existe, mas não sustenta escolhas.',
  'Reduzir o ritmo parece ameaça, não opção.',
];

const CALENDLY = 'https://calendly.com/vinimarianofranco';

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{children}</p>
      <span aria-hidden className="mt-3 block h-px w-10 bg-accent" />
    </div>
  );
}

export default function Diagnostico() {
  const reduce = useReducedMotion();
  const [answer, setAnswer] = useState<(typeof ANSWERS)[number] | null>(null);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const count = checked.filter(Boolean).length;

  // Instant state changes under prefers-reduced-motion.
  const pop = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 520, damping: 14 };
  const slide = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 420, damping: 34 };
  const ease = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const toggle = (i: number) => setChecked((c) => c.map((v, j) => (j === i ? !v : v)));

  return (
    <section id="diagnostico" className="bg-bg py-16 text-text sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* O teste */}
        <div className="lg:col-span-6 lg:pt-2">
          <Eyebrow>O teste</Eyebrow>
          <h2 className="font-display text-[2.25rem] leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-[3.35rem]">
            <span className="block font-extrabold">Se sua renda parasse hoje,</span>
            <span className="block font-light">por quanto tempo</span>
            <span className="block font-bold text-accent">sua vida seguiria igual?</span>
          </h2>

          <div
            role="radiogroup"
            aria-label="Por quanto tempo sua vida seguiria igual?"
            className="mt-10 inline-flex rounded-full border border-line bg-surface p-1.5"
          >
            {ANSWERS.map((a) => {
              const active = answer === a;
              return (
                <button
                  key={a}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setAnswer(a)}
                  className={`relative cursor-pointer rounded-full px-6 py-2.5 font-display text-base font-semibold transition-colors sm:px-8 sm:text-lg ${
                    active ? 'text-cta-fg' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="diagnostico-answer-pill"
                      transition={slide}
                      className="absolute inset-0 rounded-full bg-cta"
                    />
                  )}
                  <span className="relative">{a}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-text-muted">
            Essa resposta diz mais sobre sua liberdade do que o tamanho do seu salário.
          </p>

          <div className="mt-3 min-h-[3.5rem] max-w-md" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={answer ?? 'none'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={ease}
                className={answer ? 'text-base leading-relaxed text-text' : 'text-sm text-text-muted/70'}
              >
                {answer
                  ? 'Qualquer que seja a resposta, ela mostra o ponto de partida.'
                  : 'Toque na sua resposta, só para você.'}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:col-span-6">
          <Eyebrow>Diagnóstico</Eyebrow>
          <h3 className="font-display text-3xl leading-[1.05] tracking-tight text-text sm:text-4xl">
            <span className="font-extrabold">3 sinais de </span>
            <span className="font-extrabold text-accent">dependência</span>
            <span className="font-light"> da renda</span>
          </h3>
          <p className="mt-3 text-sm text-text-muted">Toque nos que descrevem o seu momento.</p>

          <ul className="mt-7 space-y-3">
            {SIGNS.map((sign, i) => {
              const on = checked[i];
              return (
                <li key={sign}>
                  <motion.button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors duration-300 motion-reduce:transition-none sm:gap-5 sm:px-5 ${
                      on
                        ? 'border-accent/45 bg-forest'
                        : 'border-line bg-bg/60 hover:border-text/20'
                    }`}
                  >
                    <span
                      className={`w-10 shrink-0 font-display text-4xl font-light leading-none tabular-nums transition-colors duration-300 motion-reduce:transition-none sm:w-12 sm:text-5xl ${
                        on ? 'text-accent' : 'text-text-muted/50'
                      }`}
                    >
                      {i + 1}.
                    </span>
                    <span
                      className={`flex-1 text-base leading-snug transition-colors duration-300 motion-reduce:transition-none sm:text-lg ${
                        on ? 'text-text' : 'text-text-muted group-hover:text-text'
                      }`}
                    >
                      {sign}
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${
                        on ? 'border-accent bg-accent' : 'border-text/25'
                      }`}
                    >
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            initial={{ scale: 0, rotate: -25 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, transition: reduce ? { duration: 0 } : { duration: 0.15 } }}
                            transition={pop}
                            className="grid place-items-center"
                          >
                            <Check className="size-4.5 text-bg" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* Counter + segmented meter */}
          <div className="mt-7 flex items-center gap-5" aria-live="polite">
            <p className="flex items-baseline gap-1.5 font-display text-text">
              <span className="relative inline-block h-[2.6rem] w-[1.6rem] overflow-hidden text-[2.4rem] font-extrabold leading-none tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={count}
                    initial={{ y: '-90%', scale: 1.35, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: '90%', opacity: 0 }}
                    transition={pop}
                    className={`absolute inset-0 ${count > 0 ? 'text-accent' : 'text-text'}`}
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-lg font-light text-text-muted">de 3</span>
            </p>
            <div aria-hidden className="flex flex-1 gap-1.5">
              {SIGNS.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <motion.span
                    className="block h-full origin-left rounded-full bg-accent"
                    initial={false}
                    animate={{ scaleX: i < count ? 1 : 0 }}
                    transition={slide}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Result line: always visible, gains emphasis once a sign is checked */}
          <div className="mt-6 border-t border-line pt-6">
            <p
              className={`font-display text-xl leading-snug transition-colors duration-500 motion-reduce:transition-none sm:text-2xl ${
                count > 0 ? 'font-semibold text-text' : 'font-light text-text-muted'
              }`}
            >
              Quando isso acontece, há renda, mas ainda não há{' '}
              <span className={count > 0 ? 'text-accent' : undefined}>liberdade.</span>
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-6 py-3.5 font-semibold text-cta-fg transition-colors hover:bg-cta-hover"
            >
              Conversar sobre o meu caso
              <ArrowUpRight className="size-4.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* Carousel page-footer signature */}
        <div
          aria-hidden
          className="flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.3em] text-text-muted lg:col-span-12"
        >
          <span>Vinícius Mariano</span>
          <span className="h-px flex-1 bg-line" />
          <span className="tabular-nums">02/05</span>
        </div>
      </div>
    </section>
  );
}
