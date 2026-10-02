import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { PASSOS, WA_PADRAO, waLink } from '../content';

const STEP_MS = 5000;
const RESUME_MS = 12000; // after a manual pick, auto-advance resumes after this idle time

export default function ComoFunciona() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  const running = inView && !paused && !reduceMotion;

  // Progress drives the advance, so going off-screen freezes the bar exactly where it was.
  useAnimationFrame((_, delta) => {
    if (!running) return;
    const next = progress.get() + Math.min(delta, 100) / STEP_MS;
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % PASSOS.length);
    } else {
      progress.set(next);
    }
  });

  useEffect(() => {
    if (!paused) return;
    const t = setTimeout(() => {
      progress.set(0);
      setPaused(false);
    }, RESUME_MS);
    return () => clearTimeout(t);
  }, [paused, active, progress]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
    progress.set(0);
  };

  const passo = PASSOS[active];

  return (
    <section id="como-funciona" ref={sectionRef} className="bg-surface py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* TODO: confirmar etapas com o Flávio (fluxo montado a partir dos textos e posts dele) */}
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            Do primeiro contato às chaves
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Um caminho claro, com acompanhamento em cada etapa. Você sabe o que vem a seguir e não
            precisa resolver nada sozinho.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="border-t border-line">
            {PASSOS.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.n} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className="group relative block w-full cursor-pointer py-4 text-left sm:py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={`font-display text-sm tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-accent-ink' : 'text-ink-muted'
                        }`}
                      >
                        {p.n}
                      </span>
                      <span
                        className={`font-display text-xl leading-[1.2] transition-colors duration-300 sm:text-2xl ${
                          isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                        }`}
                      >
                        {p.titulo}
                      </span>
                    </span>

                    {/* Mobile: the active step expands its text in place (CSS grid rows, never height:auto) */}
                    <span
                      className="grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none lg:hidden"
                      style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 pl-9 text-sm leading-relaxed text-ink-muted">
                          {p.texto}
                        </span>
                      </span>
                    </span>

                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px block h-0.5 origin-left bg-accent-ink"
                        style={{ scaleX: paused || reduceMotion ? 1 : progress }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative hidden min-h-[22rem] overflow-hidden rounded-2xl bg-deep p-10 text-sand lg:block xl:p-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={passo.n}
                className="relative flex h-full min-h-[18rem] flex-col justify-end"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 right-0 font-display text-[11rem] leading-none text-transparent tabular-nums select-none [-webkit-text-stroke:1px_var(--color-deep-line)]"
                  initial={reduceMotion ? false : { x: 48, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {passo.n}
                </motion.span>
                <motion.div
                  initial={reduceMotion ? false : { x: -16, y: 12, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs font-medium tracking-[0.2em] text-sand-muted uppercase">
                    Etapa {passo.n} de {String(PASSOS.length).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-[1.15] text-sand xl:text-4xl">
                    {passo.titulo}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-sand/80">{passo.texto}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5 lg:mt-12">
          <a
            href={waLink(WA_PADRAO)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-deep px-6 py-3.5 text-sm font-semibold text-sand transition-colors hover:bg-deep-2 sm:text-base"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Começar pelo WhatsApp
          </a>
          <p className="text-sm text-ink-muted">A primeira etapa é só uma conversa.</p>
        </div>
      </div>
    </section>
  );
}
