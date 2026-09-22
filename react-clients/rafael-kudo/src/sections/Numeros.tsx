import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Brain,
  GraduationCap,
  Hourglass,
  Sofa,
  Tv,
  Users,
  type LucideIcon,
} from 'lucide-react';

// Every item below is a credential Rafael Kudo states publicly (client-brief.md, Real Proof).
// TODO: PROOF NEEDED, media outlet names (TV, jornais, revistas) stay unnamed until the client confirms them.
type Stat = {
  icon: LucideIcon;
  kicker?: string;
  big: string;
  label: string;
};

const STATS: Stat[] = [
  { icon: Hourglass, kicker: 'Quase', big: '20 anos', label: 'de expertise em Alta Performance' },
  { icon: Users, big: '+300 mil', label: 'alunos formados e capacitados, online e presencial' },
  { icon: GraduationCap, big: '16', label: 'pós-graduações em Saúde Física, Nutricional e Mental' },
  { icon: BookOpen, big: '6', label: 'livros publicados' },
  { icon: Brain, big: 'Mestre/Doutor', label: 'em Hipnose Clínica' },
  { icon: Award, big: 'Centenas', label: 'de certificados de cursos' },
  { icon: Sofa, big: 'Psicoterapeuta', label: 'com centenas de atendimentos em consultório' },
  { icon: Tv, big: 'Na mídia', label: 'Entrevistas na TV e matérias em jornais e revistas' },
];

const PX_PER_SECOND = 55;
const FADE = 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)';

function Card({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <div className="flex h-full w-80 shrink-0 flex-col gap-4 rounded-(--radius-card) border border-border bg-surface p-6 sm:w-96">
      <Icon className="size-8 text-text-muted" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <p className="h-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
          {stat.kicker}
        </p>
        <p className="font-display text-4xl uppercase leading-tight text-accent sm:text-5xl">
          {stat.big}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-text-muted">{stat.label}</p>
    </div>
  );
}

export default function Numeros() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () => {
      const width = track.getBoundingClientRect().width;
      if (!width) return;
      setTrackWidth(width);
      setCopies(Math.max(2, Math.ceil(viewport.getBoundingClientRect().width / width) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [reduceMotion]);

  return (
    <section id="numeros" className="overflow-hidden bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">Números</p>
        <h2 className="mt-3 font-display text-5xl uppercase leading-none text-text sm:text-7xl">
          Formação e experiência
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          Quase duas décadas unindo Educação Física, Nutrição, Hipnose Clínica e Psicoterapia.
          Estas são as credenciais por trás do método.
        </p>
      </div>

      {reduceMotion ? (
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-4 px-4 sm:mt-14">
          {STATS.map((s) => (
            <Card key={s.big} stat={s} />
          ))}
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="mt-10 overflow-hidden sm:mt-14"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        >
          <motion.div
            className="flex w-max"
            animate={trackWidth ? { x: [0, -trackWidth] } : undefined}
            transition={{ duration: trackWidth / PX_PER_SECOND, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: copies }, (_, i) => (
              <div
                key={i}
                ref={i === 0 ? trackRef : undefined}
                aria-hidden={i > 0 || undefined}
                className="flex shrink-0 gap-4 pr-4"
              >
                {STATS.map((s) => (
                  <Card key={s.big} stat={s} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      )}

      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-text-muted sm:px-6">
        Informações divulgadas pelo próprio Rafael Kudo.
      </p>
    </section>
  );
}
