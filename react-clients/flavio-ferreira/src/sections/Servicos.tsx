import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, Building2, KeyRound, LandPlot, PiggyBank, type LucideIcon } from 'lucide-react';
import { SERVICOS, waLink } from '../content';

// Literal icons per line of work: towers (lançamentos), key (pronto para morar),
// piggy bank (consórcio = poupança planejada), staked plot of land (incorporação).
const ICONS: Record<string, LucideIcon> = {
  lancamentos: Building2,
  prontos: KeyRound,
  consorcio: PiggyBank,
  incorporacao: LandPlot,
};

type CardProps = {
  s: (typeof SERVICOS)[number];
  index: number;
  cx: MotionValue<number>;
  cy: MotionValue<number>;
};

function Card({ s, index, cx, cy }: CardProps) {
  const ref = useRef<HTMLElement>(null);
  const Icon = ICONS[s.id];

  // Pointer position (client px, shared by the whole grid) -> % inside THIS card.
  // NaN = no pointer yet (touch, reduced motion): the glow rests at the center.
  const toPct = (v: number, axis: 'x' | 'y') => {
    const r = ref.current?.getBoundingClientRect();
    if (Number.isNaN(v) || !r) return 50;
    return axis === 'x' ? ((v - r.left) / r.width) * 100 : ((v - r.top) / r.height) * 100;
  };
  const x = useTransform(cx, (v) => toPct(v, 'x'));
  const y = useTransform(cy, (v) => toPct(v, 'y'));

  // Large, soft gold light inside the card; fully transparent well before its radius.
  const glow = useMotionTemplate`radial-gradient(440px circle at ${x}% ${y}%, color-mix(in oklab, var(--color-accent) 24%, transparent) 0%, color-mix(in oklab, var(--color-accent) 9%, transparent) 30%, transparent 62%)`;
  // Tighter, brighter light on the 1px border ring, so neighbors catch it too.
  const rim = useMotionTemplate`radial-gradient(300px circle at ${x}% ${y}%, var(--color-accent) 0%, color-mix(in oklab, var(--color-accent) 35%, transparent) 35%, transparent 70%)`;

  return (
    <article ref={ref} className="group relative rounded-2xl bg-line p-px">
      {/* Border ring glow: lit whenever the pointer is anywhere over the grid */}
      <motion.div
        aria-hidden
        style={{ backgroundImage: rim }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/grid:opacity-100"
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-card p-6 sm:p-7">
        {/* Inner spotlight: tracks the cursor on hover, rests centered and dim on touch */}
        <motion.div
          aria-hidden
          style={{ backgroundImage: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-40"
        />
        {/* Gold top border that draws in from the left */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
        />

        <div className="relative flex items-start justify-between">
          <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-ink-muted transition-colors duration-300 group-hover:text-ink">
            <Icon size={26} strokeWidth={1.6} aria-hidden />
          </span>
          <span aria-hidden className="font-display text-sm tracking-[0.2em] text-ink-muted/60">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="relative mt-6 font-display text-xl leading-[1.2] text-ink">{s.titulo}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">{s.resumo}</p>

        <a
          href={waLink(s.msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-6 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-medium text-accent-ink outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent-ink"
        >
          Conversar sobre isso
          <span className="sr-only">: {s.titulo}</span>
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  );
}

export default function Servicos() {
  const reduce = useReducedMotion();
  const cx = useMotionValue(Number.NaN);
  const cy = useMotionValue(Number.NaN);

  return (
    <section id="servicos" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            Como posso te ajudar?
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ink-muted">
            Escolha o assunto e fale direto com o Flávio pelo WhatsApp. Cada conversa já começa com o seu
            interesse.
          </p>
        </div>

        {/* ASSET NEEDED: fotos reais de empreendimentos que o Flávio comercializa */}
        <div
          className="group/grid mt-10 grid grid-cols-1 items-start gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
          onPointerMove={
            reduce
              ? undefined
              : (e) => {
                  if (e.pointerType === 'touch') return;
                  cx.set(e.clientX);
                  cy.set(e.clientY);
                }
          }
        >
          {SERVICOS.map((s, i) => (
            <Card key={s.id} s={s} index={i} cx={cx} cy={cy} />
          ))}
        </div>
      </div>
    </section>
  );
}
