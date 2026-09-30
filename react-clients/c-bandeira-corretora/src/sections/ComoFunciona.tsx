import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { waLink } from '../content';

const PASSOS = [
  {
    titulo: 'Você conta o que precisa',
    texto: 'Pelo WhatsApp, por telefone ou no escritório. Pode ser uma dúvida ou um pedido de cotação.',
  },
  {
    titulo: 'Entendo o seu perfil',
    texto:
      'Converso sobre a sua rotina, a sua família ou a sua empresa, e quais riscos precisam de cobertura.',
  },
  {
    titulo: 'Comparo as opções',
    texto: 'Apresento as alternativas lado a lado e explico cada cobertura, sem letra miúda.',
  },
  {
    titulo: 'Sigo com você',
    texto:
      'Depois da contratação, continuo por perto nas renovações, nas dúvidas e em caso de sinistro.',
  },
];

const STEP_SECONDS = 6;
const EASE = [0.22, 1, 0.36, 1] as const;
const num = (i: number) => String(i + 1).padStart(2, '0');

export default function ComoFunciona() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // bumps on click so re-selecting the same step restarts the bar
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const progress = useMotionValue(0);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  // Also paused while off screen, so visitors arrive at step 1 instead of a random one.
  const paused = hovered || focused || !inView;

  // One timed run per step: fills the bar, then advances (looping).
  useEffect(() => {
    if (reduce) return;
    progress.set(0);
    const c = animate(progress, 1, {
      duration: STEP_SECONDS,
      ease: 'linear',
      onComplete: () => setActive((a) => (a + 1) % PASSOS.length),
    });
    controls.current = c;
    return () => c.stop();
  }, [active, cycle, reduce, progress]);

  // Runs after the effect above in the same commit, so a fresh run starts paused if needed.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    if (paused) c.pause();
    else c.play();
  }, [paused, active, cycle]);

  const select = (i: number) => {
    setActive(i);
    setCycle((n) => n + 1);
  };

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading, sub, CTA, big live step counter */}
        <div className="lg:sticky lg:top-[calc(var(--nav-height,4.5rem)+2rem)] lg:self-start">
          <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            Como funciona o <span className="text-accent">atendimento</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg">
            Do primeiro contato ao dia em que você precisar usar o seguro.
          </p>
          <a
            href={waLink('Olá, Cléo! Vim pelo site e quero começar um atendimento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-fg shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover"
          >
            <FaWhatsapp className="size-5" aria-hidden />
            Começar pelo WhatsApp
          </a>

          {/* Decorative counter that rolls to the active step (desktop only) */}
          <div aria-hidden className="mt-14 hidden items-end gap-3 lg:flex">
            <div className="relative h-[8.5rem] w-[12rem] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.span
                  key={active}
                  className="font-display absolute inset-0 whitespace-nowrap text-[8rem] leading-[1.05] text-line"
                  initial={reduce ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                >
                  {num(active)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-display mb-4 text-2xl leading-[1.15] text-ink-muted">
              / {num(PASSOS.length - 1)}
            </span>
          </div>
        </div>

        {/* Right: the stepper */}
        <ol
          ref={listRef}
          className="flex flex-col gap-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          // Pause only for keyboard focus: a mouse click also focuses the button and
          // would otherwise freeze the loop until the visitor clicks somewhere else.
          onFocus={(e) => setFocused((e.target as HTMLElement).matches(':focus-visible'))}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          {PASSOS.map((passo, i) => {
            const isActive = i === active;
            const expanded = reduce || isActive;
            return (
              <li key={passo.titulo} className="relative">
                {/* Rail segment from this marker's center to the next one's (thin gold rule).
                    Marker center = button padding + half of size-12: 40px (p-4), 44px (sm:p-5);
                    the extra 8px is the list gap. */}
                {i < PASSOS.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-12 left-10 top-10 z-10 w-px bg-gold-ink/40 sm:-bottom-13 sm:left-11 sm:top-11"
                  />
                )}
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`flex w-full cursor-pointer gap-4 rounded-2xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-300 sm:gap-5 sm:p-5 ${
                    isActive
                      ? 'border-line bg-card shadow-[0_18px_40px_-24px_rgba(43,20,23,0.35)]'
                      : 'border-transparent hover:bg-card/50'
                  }`}
                >
                  <span
                    className={`font-display relative z-20 grid size-12 shrink-0 place-items-center rounded-full border text-xl leading-none transition-colors duration-300 ${
                      isActive
                        ? 'border-accent bg-accent text-accent-fg'
                        : 'border-line bg-surface text-ink-muted'
                    }`}
                  >
                    {num(i)}
                  </span>

                  <span className="block min-w-0 flex-1 pt-2.5">
                    <span
                      className={`block text-lg font-semibold leading-snug transition-colors duration-300 ${
                        isActive ? 'text-ink' : 'text-ink/70'
                      }`}
                    >
                      {passo.titulo}
                    </span>

                    {/* Progress track: present on every step so heights never change */}
                    <span
                      aria-hidden
                      className={`mt-3 block h-0.5 overflow-hidden rounded-full transition-colors duration-300 ${
                        isActive ? 'bg-line' : 'bg-transparent'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          className="block h-full origin-left rounded-full bg-accent"
                          style={reduce ? undefined : { scaleX: progress }}
                        />
                      )}
                    </span>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.span
                          key="texto"
                          className="block overflow-hidden"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                        >
                          {reduce ? (
                            <span className="block pt-3 text-ink-muted">{passo.texto}</span>
                          ) : (
                            // All texts stacked in one cell, only this step's visible: the box
                            // is always as tall as the longest text, so the exiting and entering
                            // panels trade identical heights and the section never jumps.
                            <span className="grid pt-3">
                              {PASSOS.map((p, j) => (
                                <span
                                  key={p.titulo}
                                  aria-hidden={j !== i}
                                  className={`[grid-area:1/1] text-ink-muted ${j === i ? '' : 'invisible'}`}
                                >
                                  {p.texto}
                                </span>
                              ))}
                            </span>
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
