import { useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Dumbbell, HeartPulse, Sprout } from 'lucide-react';
import { TbRun } from 'react-icons/tb';

// Seconds each pillar stays active before auto-advancing.
const DURATION = 6;

const ARROW_STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

type Pilar = {
  titulo: string;
  Icon: ComponentType<{ className?: string }>;
  texto: string;
  topicos: string[];
};

// TODO: PROOF NEEDED, pilares e tópicos são PROPOSTA nossa, validar com a cliente.
// Nunca adicionar número de aulas, horas ou módulos (UNKNOWN).
const PILARES: Pilar[] = [
  {
    titulo: 'Corrida',
    Icon: TbRun, // Tabler "run": pessoa correndo, literal
    texto:
      'Do primeiro trote aos seus próximos quilômetros, com técnica, ritmo e progressão no seu tempo.',
    topicos: ['Como começar do zero', 'Técnica e respiração', 'Progressão segura'],
  },
  {
    titulo: 'Força',
    Icon: Dumbbell,
    texto:
      'Treino de força para sustentar a corrida e o dia a dia, com orientação clara em cada exercício.',
    topicos: ['Força para correr melhor', 'Postura e estabilidade', 'Treinos orientados'],
  },
  {
    titulo: 'Saúde',
    Icon: HeartPulse,
    texto:
      'Cuidados que fazem diferença para treinar sem se machucar e respeitar os sinais do corpo.',
    topicos: ['Aquecimento e recuperação', 'Cuidados com as articulações', 'Ouvir o próprio corpo'],
  },
  {
    titulo: 'Longevidade',
    // Sprout over Hourglass (reads as "time running out") and Infinity (too abstract):
    // growth that keeps going, coherent with "Novo Ciclo".
    Icon: Sprout,
    texto:
      'Movimento como hábito para a vida toda: autonomia, equilíbrio e qualidade de vida em todas as fases.',
    topicos: ['Autonomia no dia a dia', 'Equilíbrio e mobilidade', 'Constância que dura'],
  },
];

const num = (i: number) => String(i + 1).padStart(2, '0');

function PanelBody({ pilar, index }: { pilar: Pilar; index: number }) {
  const { Icon } = pilar;
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-0 font-display text-[6.5rem] leading-none text-cream/[0.06] sm:-top-6 sm:text-[9rem]"
      >
        {num(index)}
      </span>
      <span
        aria-hidden="true"
        className="inline-flex size-14 items-center justify-center rounded-2xl bg-cream/5 text-cream ring-1 ring-cream/10"
      >
        <Icon className="size-7" />
      </span>
      <h3 className="mt-6 font-display text-4xl leading-[1.1] text-cream sm:text-5xl">
        {pilar.titulo}
      </h3>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
        {pilar.texto}
      </p>
      <ul className="mt-8 grid items-start gap-3 sm:grid-cols-3">
        {pilar.topicos.map((t) => (
          <li
            key={t}
            className="flex items-start gap-2.5 rounded-2xl bg-cream/5 px-4 py-3 text-sm leading-snug text-cream/85"
          >
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blush" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Curso() {
  const [active, setActive] = useState(0);
  // Bumped on every click so re-clicking the active tab still restarts its timer.
  const [cycle, setCycle] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduce = useReducedMotion();
  // Only run the clock while the section is on screen, so the visitor arrives at pillar 01.
  const auto = !reduce && inView;

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = ARROW_STEP[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + PILARES.length) % PILARES.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="curso"
      ref={sectionRef}
      className="relative overflow-hidden bg-deep py-16 text-cream sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">O curso</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Quatro pilares para um <em className="italic text-blush">novo ciclo</em>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Aulas em vídeo, treinos e dicas práticas da Talita, organizados em quatro pilares.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <div
            role="tablist"
            aria-label="Pilares do curso"
            onKeyDown={onKeyDown}
            className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-1"
          >
            {PILARES.map((p, i) => {
              const selected = i === active;
              const { Icon } = p;
              return (
                <button
                  key={p.titulo}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`curso-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="curso-painel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={`relative flex min-w-0 cursor-pointer flex-col items-start gap-3 overflow-hidden rounded-2xl px-4 pb-5 pt-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush lg:flex-row lg:items-center lg:gap-4 lg:px-5 lg:py-5 ${
                    selected
                      ? 'bg-deep-2 ring-1 ring-cream/15'
                      : 'bg-cream/[0.03] hover:bg-cream/[0.07]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`transition-colors duration-300 ${selected ? 'text-cream' : 'text-cream/50'}`}
                  >
                    <Icon className="size-7" />
                  </span>
                  <span
                    className={`text-base font-semibold transition-colors duration-300 lg:flex-1 lg:text-lg ${
                      selected ? 'text-cream' : 'text-cream/70'
                    }`}
                  >
                    {p.titulo}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute right-4 top-3 font-display text-2xl leading-none transition-colors duration-300 lg:static ${
                      selected ? 'text-blush' : 'text-cream/25'
                    }`}
                  >
                    {num(i)}
                  </span>

                  {/* Progress track: the active tab's fill IS the auto-advance timer. */}
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-cream/10">
                    {selected && (
                      <motion.span
                        key={cycle}
                        className="absolute inset-0 origin-left bg-accent"
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        animate={{ scaleX: auto || reduce ? 1 : 0 }}
                        transition={{ duration: auto ? DURATION : 0, ease: 'linear' }}
                        onAnimationComplete={() => {
                          if (auto) setActive((i + 1) % PILARES.length);
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-w-0">
            {/* Blush glow: big blur, gradient fully transparent by 65% of its radius. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 bg-[radial-gradient(closest-side,var(--color-blush),transparent_65%)] opacity-25 blur-3xl"
              animate={reduce ? undefined : { opacity: [0.18, 0.32, 0.18], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
              role="tabpanel"
              id="curso-painel"
              aria-labelledby={`curso-tab-${active}`}
              className="relative overflow-hidden rounded-3xl bg-deep-2 p-6 ring-1 ring-cream/10 sm:p-10"
            >
              {/* ASSET NEEDED: fotos reais da Talita em cada pilar (correndo, treinando força com kettlebell, aquecendo/alongando). Stock é proibido pelo onboarding. */}
              <div className="grid">
                {/* Invisible copies of every pillar keep the panel at the tallest height, so swapping never shifts the page. */}
                {PILARES.map((p, i) => (
                  <div key={p.titulo} aria-hidden="true" className="invisible [grid-area:1/1]">
                    <PanelBody pilar={p} index={i} />
                  </div>
                ))}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    className="[grid-area:1/1]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
                  >
                    <PanelBody pilar={PILARES[active]} index={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
