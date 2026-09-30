import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Check, HandCoins, HeartPulse, ShieldCheck, type LucideIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SERVICOS, waLink } from '../content';

type ServicoId = (typeof SERVICOS)[number]['id'];

// Literal icons: shield = seguro, heart with pulse line = saúde, hand holding coins =
// consórcio (planned payments toward a purchase).
const ICONS: Record<ServicoId, LucideIcon> = {
  seguros: ShieldCheck,
  saude: HeartPulse,
  consorcios: HandCoins,
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Panel slides in from the side of the tab that was picked (dir = +1 forward, -1 back).
const panelVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48, transition: { duration: 0.2, ease: 'easeIn' } }),
};

const iconVariants: Variants = {
  enter: { opacity: 0, scale: 0.5, rotate: -25 },
  center: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.1 } },
};

const listVariants: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};

const itemVariants: Variants = {
  enter: { opacity: 0, y: 14, scale: 0.96 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export default function Servicos() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const servico = SERVICOS[active];
  const PanelIcon = ICONS[servico.id];

  const select = (i: number) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  // WAI-ARIA tabs keyboard pattern: arrows move and select, Home/End jump.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = SERVICOS.length - 1;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? (active + 1) % SERVICOS.length
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? (active - 1 + SERVICOS.length) % SERVICOS.length
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="servicos" className="bg-bg py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            Tudo para você se <span className="text-accent">proteger</span>, em um só lugar
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Seguros para pessoa física e jurídica, planos de saúde e odonto e consórcios, com a mesma
            atenção em cada um.
          </p>
        </div>

        <div className="mt-10 grid gap-5 items-start sm:mt-12 lg:grid-cols-[18rem_1fr] lg:gap-8">
          {/* Tab tray */}
          <div
            role="tablist"
            aria-label="Serviços"
            onKeyDown={onKeyDown}
            className="min-w-0 grid grid-cols-3 gap-1.5 rounded-3xl bg-surface p-1.5 lg:grid-cols-1 lg:gap-2 lg:p-2"
          >
            {SERVICOS.map((s, i) => {
              const Icon = ICONS[s.id];
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`servicos-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls="servicos-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  className={`group relative min-w-0 cursor-pointer rounded-2xl px-2 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:flex lg:items-center lg:gap-4 lg:px-4 lg:py-4 lg:text-left ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="servicos-highlight"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl border border-line bg-card shadow-lg shadow-wine/10"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                    >
                      {/* Accent marker: under the label on mobile, left edge on desktop */}
                      <span className="absolute bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent lg:bottom-auto lg:left-0 lg:top-1/2 lg:h-8 lg:w-1 lg:-translate-x-0 lg:-translate-y-1/2" />
                    </motion.span>
                  )}
                  <span
                    className={`relative mx-auto grid size-10 place-items-center rounded-full transition-colors lg:mx-0 lg:size-11 lg:shrink-0 ${
                      isActive ? 'bg-surface text-gold-ink' : 'bg-bg/70 text-ink-muted'
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5 lg:size-[22px]" strokeWidth={1.75} />
                  </span>
                  <span className="relative mt-2 block text-xs font-medium leading-snug sm:text-sm lg:mt-0 lg:text-base">
                    {s.curto}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative ml-auto hidden font-display text-sm text-ink-muted/60 lg:block"
                  >
                    0{i + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          {/* ASSET NEEDED: one real photo per pillar would lift this panel (e.g. Cléo attending a client at her Londrina office). The asset list only has two studio portraits, already used by Hero and Sobre. */}
          <div
            role="tabpanel"
            id="servicos-panel"
            aria-labelledby={`servicos-tab-${servico.id}`}
            tabIndex={0}
            className="relative min-w-0 overflow-hidden rounded-3xl border border-line bg-card p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-8 lg:p-10"
          >
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={servico.id}
                custom={dir}
                variants={panelVariants}
                initial={reduce ? false : 'enter'}
                animate="center"
                exit={reduce ? undefined : 'exit'}
                className="relative"
              >
                {/* Oversized watermark of the pillar icon, decorative */}
                <PanelIcon
                  aria-hidden="true"
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-10 -top-6 size-56 text-surface sm:-right-6 sm:size-64"
                />

                <div className="relative flex items-center gap-5">
                  <div className="relative size-16 shrink-0 sm:size-[4.5rem]">
                    {/* Slow counter-rotating gold arcs, echoing the arcs of the logo */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute -inset-1.5 rounded-full border-2 border-transparent border-t-gold-ink/70 border-l-gold-ink/25"
                      animate={reduce ? undefined : { rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.span
                      aria-hidden="true"
                      className="absolute -inset-3.5 rounded-full border border-transparent border-b-gold-ink/40 border-r-gold-ink/15"
                      animate={reduce ? undefined : { rotate: -360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.span
                      variants={iconVariants}
                      className="absolute inset-0 grid place-items-center rounded-full bg-surface text-gold-ink"
                    >
                      <PanelIcon aria-hidden="true" className="size-7 sm:size-8" strokeWidth={1.6} />
                    </motion.span>
                  </div>
                  <h3 className="font-display text-2xl leading-[1.15] text-ink sm:text-3xl">{servico.titulo}</h3>
                </div>

                <p className="relative mt-6 max-w-xl text-ink-muted">{servico.texto}</p>

                <motion.ul variants={listVariants} className="relative mt-6 grid items-start gap-3 sm:grid-cols-2">
                  {servico.itens.map((item) => (
                    <motion.li
                      key={item}
                      variants={itemVariants}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-bg px-4 py-3 text-sm font-medium text-ink sm:text-base"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-gold-ink/40 text-gold-ink">
                        <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <a
                  href={waLink(servico.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base"
                >
                  <FaWhatsapp aria-hidden="true" className="size-5" />
                  Pedir cotação pelo WhatsApp
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
