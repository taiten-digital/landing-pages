import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calculator, Files, FileSearch, Pause, Play, Signature } from 'lucide-react';

// Steps and copy exactly as approved in design-brief.md. No durations or deadlines on purpose:
// the client never confirmed any.
const ETAPAS = [
  {
    titulo: 'Simulação',
    texto: 'Você simula aqui no site ou fala com a gente pelo WhatsApp.',
    Icon: Calculator,
  },
  {
    titulo: 'Documentação',
    texto: 'A gente orienta quais documentos separar e confere tudo com você.',
    Icon: Files,
  },
  {
    titulo: 'Análise e avaliação',
    texto: 'Seu crédito passa pela análise da CAIXA e o imóvel pela avaliação de engenharia.',
    Icon: FileSearch,
  },
  {
    titulo: 'Assinatura',
    texto: 'Com tudo aprovado, você assina o contrato e a conquista é sua.',
    Icon: Signature,
  },
] as const;

const STEP_SECONDS = 3.5;

export default function ComoFunciona() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Auto-advance only while visible, not pinned by a click, and never under reduced motion.
  const running = !pinned && !reduce && inView;
  const advance = () => setActive((a) => (a + 1) % ETAPAS.length);
  const etapa = ETAPAS[active];

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative overflow-hidden bg-deep py-16 text-on-dark sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-on-dark-muted">
            Como funciona
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-on-dark sm:text-4xl lg:text-5xl">
            Do sonho à <em className="italic text-accent">assinatura</em>, com você em cada etapa
          </h2>
          <p className="mt-4 text-lg text-on-dark-muted">
            São quatro etapas, e a gente acompanha você em todas elas.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          {/* Step selectors: all 4 titles always visible. Buttons in one row stay equal height
              (stretch) so their progress bars line up when a title wraps on mobile. */}
          <ol className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-1">
            {ETAPAS.map((e, i) => {
              const isActive = i === active;
              const done = i < active;
              return (
                <li key={e.titulo} className="flex">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPinned(true);
                    }}
                    aria-current={isActive ? 'step' : undefined}
                    aria-controls="como-funciona-painel"
                    className={`flex w-full cursor-pointer flex-col gap-4 rounded-3xl p-4 text-left transition-colors sm:p-5 ${
                      isActive
                        ? 'bg-deep-2 ring-1 ring-white/15'
                        : 'bg-white/[0.03] hover:bg-white/[0.07]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold transition-colors ${
                          isActive
                            ? 'bg-on-dark text-deep'
                            : done
                              ? 'bg-white/15 text-on-dark'
                              : 'bg-white/5 text-on-dark-muted ring-1 ring-white/15'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`font-display text-base font-bold leading-tight sm:text-lg ${
                          isActive ? 'text-on-dark' : 'text-on-dark-muted'
                        }`}
                      >
                        {e.titulo}
                      </span>
                    </span>

                    {/* Real per-step progress bar: the running one drives the auto-advance. */}
                    <span className="relative mt-auto block h-1 w-full overflow-hidden rounded-full bg-white/10">
                      {isActive && running ? (
                        <motion.span
                          key={active}
                          className="absolute inset-y-0 left-0 rounded-full bg-accent"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: STEP_SECONDS, ease: 'linear' }}
                          onAnimationComplete={advance}
                        />
                      ) : (
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-accent motion-safe:transition-[width] motion-safe:duration-300"
                          style={{ width: isActive || done ? '100%' : '0%' }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail panel (pb reserves room for the pause/resume button) */}
          <div
            id="como-funciona-painel"
            className="relative min-h-[19rem] min-w-0 overflow-hidden rounded-3xl bg-deep-2 p-7 pb-20 ring-1 ring-white/10 sm:min-h-[21rem] sm:p-10 sm:pb-20"
          >
            {/* ASSET NEEDED: real photo of the Conquista team with a client (document review or
                contract signing), with authorization. None exists yet (client-brief.md: no team,
                office or client photos); the hero stock photo is atmospheric only and already used. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, filter: 'blur(4px)' }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[8rem] font-extrabold leading-none text-white/[0.05] sm:-top-8 sm:text-[11rem]"
                >
                  {String(active + 1).padStart(2, '0')}
                </span>

                <motion.span
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-on-dark"
                  initial={reduce ? false : { scale: 0.6, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: reduce ? 0 : 0.1 }}
                >
                  <etapa.Icon className="h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
                </motion.span>

                <p className="relative mt-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-on-dark-muted">
                  Etapa {active + 1} de {ETAPAS.length}
                </p>
                <h3 className="relative mt-2 font-display text-2xl font-extrabold leading-[1.15] text-on-dark sm:text-3xl">
                  {etapa.titulo}
                </h3>
                <p className="relative mt-4 max-w-md text-lg leading-relaxed text-on-dark-muted">
                  {etapa.texto}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* ponytail: pausing shows the active bar full instead of freezing mid-fill; fine for a demo. */}
            {!reduce && (
              <button
                type="button"
                onClick={() => setPinned((p) => !p)}
                className="absolute bottom-5 right-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-on-dark transition-colors hover:bg-white/15 sm:bottom-6 sm:right-6"
              >
                {pinned ? (
                  <>
                    <Play className="h-4 w-4" aria-hidden="true" /> Retomar
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4" aria-hidden="true" /> Pausar
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p className="text-lg text-on-dark-muted">
            O primeiro passo é saber quanto fica a sua parcela.
          </p>
          <motion.a
            href="#simulador"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-base font-bold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Começar pela simulação
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
