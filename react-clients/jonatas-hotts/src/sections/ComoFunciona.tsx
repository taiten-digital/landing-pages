import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, MessageCircle, TrendingUp, Video, type LucideIcon } from 'lucide-react';

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: MessageCircle,
    title: 'Conversa inicial',
    description:
      'Você conta seu objetivo, seja emagrecimento, hipertrofia ou o que for, e seu nível de experiência. É o ponto de partida pra tudo que vem depois.',
  },
  {
    icon: ClipboardList,
    title: 'Plano de treino e alimentação',
    description:
      'Treino individualizado pra você, mais o plano alimentar. Nada de planilha genérica: os alunos da consultoria online confirmam que o acompanhamento inclui os dois.',
  },
  {
    icon: Video,
    title: 'Vídeos de cada exercício',
    description:
      'Cada exercício vem com vídeo explicando a execução certa, pra você treinar com segurança mesmo à distância.',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhamento e progressão',
    description:
      'O treino evolui junto com você. Progressão contínua conforme sua evolução, com suporte durante todo o processo, não só na entrega do plano.',
  },
];

const STEP_DURATION = 5000;

export default function ComoFunciona() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const advanceRef = useRef<() => void>(() => {});

  advanceRef.current = () => setActive((i) => (i + 1) % STEPS.length);

  const goTo = (index: number) => setActive(index);

  return (
    <section id="como-funciona" className="bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
            O passo a passo do acompanhamento
          </h2>
          <p className="mt-4 text-text-muted">
            Do primeiro contato à evolução constante, assim funciona o acompanhamento com o
            Jonatas.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Step list with auto-advancing progress bars */}
          <div className="flex flex-col gap-3">
            {STEPS.map((step, index) => {
              const isActive = index === active;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`group relative cursor-pointer overflow-hidden rounded-[var(--radius-card)] border px-5 py-4 text-left transition-colors ${
                    isActive
                      ? 'border-accent/30 bg-surface shadow-sm'
                      : 'border-border bg-surface/40 hover:bg-surface'
                  }`}
                  aria-current={isActive}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-fg'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`font-semibold transition-colors ${
                        isActive ? 'text-text' : 'text-text-muted'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* progress track: fills automatically while this step is active */}
                  <span className="mt-3 block h-1 w-full overflow-hidden rounded-full bg-border">
                    {isActive && (
                      <motion.span
                        key={active}
                        className="block h-full rounded-full bg-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: reduceMotion ? '0%' : '100%' }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: STEP_DURATION / 1000, ease: 'linear' }
                        }
                        onAnimationComplete={() => {
                          if (!reduceMotion) advanceRef.current();
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active step detail */}
          <div className="relative min-h-[280px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {STEPS.map(
                (step, index) =>
                  index === active && (
                    <motion.div
                      key={step.title}
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="flex flex-col"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-fg">
                        <step.icon size={26} strokeWidth={1.75} />
                      </div>
                      <span className="mt-6 text-sm font-semibold text-accent">
                        Etapa {index + 1} de {STEPS.length}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-bold text-text">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-text-muted">
                        {step.description}
                      </p>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
