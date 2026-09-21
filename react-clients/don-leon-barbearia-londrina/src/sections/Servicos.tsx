import type { ComponentType, SVGProps } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { MdOutlineSpa } from 'react-icons/md';

// Neither lucide nor react-icons (fa6/md/tb/pi/gi/ri/hi2 checked) has a
// literal "beard/clippers" icon — found via Iconify search instead:
// icon-park-outline:barber-clippers (a real electric hair/beard trimmer,
// unambiguous barbershop tool). Swapped in after `TbRazor` still read as
// unclear to the client. Path copied verbatim from Iconify's icon API.
function ClippersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 8h28v9l-5 7v12s0 8-9 8s-9-8-9-8V24l-5-7zm5-4v6m6-6v6m6-6v6" />
      <rect width="6" height="10" x="21" y="28" rx="3" />
      <path d="M10 17h28M33 4v6" />
    </svg>
  );
}

// No literal "eyebrow" icon exists in lucide or any react-icons set (checked
// gi/tb/pi/md/ri/hi2) — found via Iconify's search API instead:
// material-symbols:eyebrow-outline (Google's Material Symbols, outline
// variant). Re-checked against mingcute:eyebrow-line and icon-park (which
// turned out to be a full eye+brow combo, not just the brow) — this is
// still the clearest brow-only match. Path copied verbatim, not hand-drawn.
function EyebrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15 14q-.625 0-1.737.225t-2.463.6t-2.812.875t-2.838 1.075q-.275.125-.562.175T4 17q-1.25 0-2.125-.875T1 14v-2.575q0-1.075.675-1.912T3.4 8.475q1.8-.35 3.475-.625t3.15-.462t2.738-.288T15 7q3.1 0 5.313 2.488T23.025 16q.05.275-.137.5t-.488.35q-.275.125-.575.075t-.575-.25q-1.6-1.25-3.275-1.963T15 14m0-2q1.35 0 2.5.363t2.875 1.337q-.825-2.275-2.212-3.487T15 9q-2 0-5.038.4T3.8 10.45q-.35.075-.575.35T3 11.425V14q0 .55.438.838t.937.087q1.5-.625 3.075-1.162t3-.925t2.613-.613T15 12m-3.325-.575" />
    </svg>
  );
}

type Category = {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  items: string[];
};

// Full real procedure list confirmed by the client, grouped for a scannable
// card layout (16 flat items would be unreadable as one grid). No prices,
// per the client's explicit request.
const categories: Category[] = [
  {
    name: 'Cabelo',
    Icon: Scissors,
    items: ['Corte de cabelo', 'Hidratação capilar', 'Ultra selagem', 'Platinado'],
  },
  {
    name: 'Barba',
    Icon: ClippersIcon,
    items: ['Barboterapia', 'Hidratação de barba', 'Selagem de barba'],
  },
  {
    name: 'Sobrancelha',
    Icon: EyebrowIcon,
    items: ['Sobrancelha navalhada', 'Sobrancelha pinça'],
  },
  {
    name: 'Pele e rosto',
    Icon: MdOutlineSpa,
    items: [
      'Limpeza de pele',
      'Peeling gold',
      'Máscara black',
      'Esfoliação facial',
      'Hidratação de rosto',
      'Depilação de orelha',
      'Depilação de nariz',
    ],
  },
];

export default function Servicos() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="bg-bg px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent-2">
            O que fazemos
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-tight text-fg sm:text-5xl">
            Serviços
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
            Um procedimento pra cada detalhe, feitos com técnica e sem
            pressa, do jeito que barbearia de verdade faz. Peça um combo com
            dois ou mais procedimentos no mesmo atendimento.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="rounded-card border border-white/10 bg-bg-panel p-8"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 4 + index * 0.4,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              whileHover={{ scale: 1.03, borderColor: 'rgba(111,149,242,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                <category.Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-xl uppercase tracking-wide text-fg">
                {category.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
