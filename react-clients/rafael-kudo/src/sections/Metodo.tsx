import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Dumbbell, Brain, Apple, type LucideIcon } from 'lucide-react';

type Pillar = {
  id: string;
  number: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

const PILLARS: Pillar[] = [
  {
    id: 'fisica',
    number: '01',
    label: 'Física',
    icon: Dumbbell,
    description:
      'Programas de treino estruturados para destravar sua força, resistência e potencial físico no dia a dia, não só dentro da academia.',
  },
  {
    id: 'mental',
    number: '02',
    label: 'Mental',
    icon: Brain,
    description:
      'O lado mental e motivacional do processo: o que sustenta a consistência e mantém corpo e mente alinhados no seu propósito.',
  },
  {
    id: 'nutricional',
    number: '03',
    label: 'Nutricional',
    icon: Apple,
    description:
      'Orientação nutricional integrada ao treino, para que alimentação e rotina trabalhem a favor do seu resultado, não contra ele.',
  },
];

const INTERVAL_MS = 5000;

export default function Metodo() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % PILLARS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, paused]);

  const active = PILLARS[index];
  const Icon = active.icon;

  return (
    <section id="metodo" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
              O método
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-text sm:text-5xl">
              Um método, três frentes alinhadas
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Rafael alinha conhecimento e vivência prática nas áreas física, mental e
              nutricional para estruturar programas de desenvolvimento de excelência e alta
              performance. A ideia é destravar seu potencial mental, motivacional e físico
              dentro do treino e da rotina, com corpo e mente alinhados no seu propósito.
            </p>
          </div>

          <div
            className="rounded-card border border-border bg-surface p-6 sm:p-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div role="tablist" aria-label="Frentes do método" className="flex gap-2">
              {PILLARS.map((pillar, i) => (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-controls={`metodo-panel-${pillar.id}`}
                  onClick={() => setIndex(i)}
                  className={`flex-1 cursor-pointer rounded-full border px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors sm:text-sm ${
                    i === index
                      ? 'border-accent bg-accent text-accent-fg'
                      : 'border-border text-text-muted hover:border-white/20 hover:text-text'
                  }`}
                >
                  <span className="hidden sm:inline">{pillar.number} </span>
                  {pillar.label}
                </button>
              ))}
            </div>

            <div className="relative mt-6 min-h-[220px] overflow-hidden sm:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  id={`metodo-panel-${active.id}`}
                  role="tabpanel"
                  initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-text sm:text-3xl">
                    {active.label}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-text-muted">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
