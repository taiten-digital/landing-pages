import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Dices, KeyRound, Target } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '../content';

const STEP_MS = 6000;
const TICK_MS = 50;

const STEPS = [
  {
    titulo: 'Você escolhe o objetivo e o plano',
    detalhe:
      'Conte o que você quer conquistar e a gente apresenta as opções. Carro, moto, casa, viagem ou outro bem: o plano começa pelo seu objetivo.',
    Icon: Target,
  },
  {
    titulo: 'Paga parcelas mensais sem juros, junto com o grupo',
    detalhe:
      'Você paga as parcelas todo mês, junto com o grupo do consórcio. A taxa de administração e as demais condições variam conforme o plano escolhido.',
    Icon: CalendarCheck,
  },
  {
    titulo: 'Contemplação por sorteio ou lance',
    detalhe:
      'Todo mês há assembleia, mas não existe data garantida para a contemplação. Quem não quer esperar pode olhar as cartas já contempladas.',
    Icon: Dices,
  },
  {
    titulo: 'Usa a carta de crédito para comprar o bem',
    detalhe:
      'Com a carta de crédito em mãos, você compra o bem que planejou. Fale com a gente para entender cada etapa do seu plano.',
    Icon: KeyRound,
  },
];

export default function ComoFunciona() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setElapsed((e) => e + TICK_MS);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  useEffect(() => {
    if (elapsed >= STEP_MS) {
      setActive((a) => (a + 1) % STEPS.length);
      setElapsed(0);
    }
  }, [elapsed]);

  const jump = (i: number) => {
    setActive(i);
    setElapsed(0);
  };

  const current = STEPS[active];
  const CurrentIcon = current.Icon;

  return (
    <section
      id="como-funciona"
      className="scroll-mt-[var(--nav-height,4.5rem)] bg-deep py-16 text-on-deep sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.1] font-bold text-on-deep sm:text-5xl">
            Como funciona o <span className="text-accent-on-deep">consórcio</span>
          </h2>
          <p className="mt-4 text-base text-on-deep-muted sm:text-lg">
            Sem letras miúdas: é assim que você chega ao seu bem.
          </p>
        </div>

        <div
          className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ol className="flex min-w-0 flex-col gap-3">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              const done = i < active;
              const fill = reduceMotion
                ? isActive
                  ? 1
                  : 0
                : isActive
                  ? Math.min(1, elapsed / STEP_MS)
                  : done
                    ? 1
                    : 0;
              return (
                <li key={s.titulo}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                      isActive
                        ? 'border-accent-on-deep/60 bg-navy'
                        : 'border-line-deep bg-transparent hover:bg-navy/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                          isActive
                            ? 'border-transparent bg-accent text-accent-fg'
                            : 'border-line-deep text-on-deep-muted'
                        }`}
                      >
                        <s.Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-sm text-on-deep-muted">
                          Passo {i + 1}
                        </span>
                        <span
                          className={`block text-base leading-snug font-semibold sm:text-lg ${
                            isActive ? 'text-on-deep' : 'text-on-deep/80'
                          }`}
                        >
                          {s.titulo}
                        </span>
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-line-deep/60">
                      <div
                        className="h-full origin-left bg-accent-on-deep"
                        style={{ transform: `scaleX(${fill})` }}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="min-w-0 rounded-3xl border border-line-deep bg-navy p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-deep text-accent-on-deep">
                    <CurrentIcon className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <span className="font-display text-6xl leading-none font-bold text-on-deep/20 sm:text-7xl">
                    {active + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-[1.15] font-semibold text-on-deep">
                  {current.titulo}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-on-deep-muted sm:text-lg">
                  {current.detalhe}
                </p>
              </motion.div>
            </AnimatePresence>

            <a
              href={waLink(
                'Olá! Vim pelo site da ConsorciCred e quero tirar minhas dúvidas sobre como funciona o consórcio.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-deep transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Tirar minhas dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
