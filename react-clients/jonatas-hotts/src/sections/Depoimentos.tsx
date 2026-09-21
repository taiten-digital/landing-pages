import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';

interface Testimonial {
  name: string;
  quote: string;
}

// Only the 7 named Google reviews with confirmed text (see client-brief.md).
// The remaining 43 of 50 total reviews have no collected text: never invent
// quotes for them, only the aggregate stat badge below is used for those.
const testimonials: Testimonial[] = [
  {
    name: 'Micaella Garcia',
    quote:
      'O Jonatas me acompanha já tem alguns anos e posso falar com total certeza que, desde que ele se tornou meu personal, a qualidade do meu treino evoluiu. Tanto no quesito força quanto na consciência corporal.',
  },
  {
    name: 'Kauã Geovani',
    quote:
      'Profissional extremamente capacitado. Estou muito satisfeito com a consultoria online dos treinos e também com o plano alimentar.',
  },
  {
    name: 'Fabiana Silva',
    quote: 'Profissional comprometido, muito atencioso. Super recomendo.',
  },
  {
    name: 'Carlos França',
    quote:
      'Acompanhamento excepcional como personal. Acompanha a execução dos exercícios e faz a progressão de acordo com a possibilidade de cada aluno.',
  },
  {
    name: 'Simone Miolo Mendonça',
    quote:
      'Ótimo profissional, dedicado, comprometido e sempre estudando para oferecer o melhor atendimento.',
  },
  {
    name: 'Matheus Antonio',
    quote:
      'Ótimo profissional. Atendimento online com vídeos explicando cada exercício e suporte durante todo o processo.',
  },
  {
    name: 'Sérgio Barros Junior',
    quote:
      'Um ótimo profissional. Entende a funcionalidade dos exercícios, sabe instruir e possui muito conhecimento sobre o que faz.',
  },
];

const GAP_PX = 24; // matches Tailwind gap-6, used for measured track width math
const PX_PER_SECOND = 36;

function TestimonialCard({ name, quote }: Testimonial) {
  return (
    <div className="flex h-full w-[300px] shrink-0 select-none flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-sm sm:w-[340px]">
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className="fill-gold text-gold" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-text">&ldquo;{quote}&rdquo;</p>
      <span className="mt-auto text-sm font-semibold text-text">{name}</span>
    </div>
  );
}

export default function Depoimentos() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const paused = useRef(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const measure = () => {
      if (!copyRef.current || !viewportRef.current) return;
      const copyWidth = copyRef.current.getBoundingClientRect().width;
      const viewportWidth = viewportRef.current.getBoundingClientRect().width;
      if (!copyWidth) return;
      const step = copyWidth + GAP_PX;
      setTrackWidth(step);
      setCopies(Math.max(2, Math.ceil(viewportWidth / step) + 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_t, delta) => {
    if (reduceMotion || paused.current || trackWidth === 0) return;
    let next = x.get() - (PX_PER_SECOND * delta) / 1000;
    if (next <= -trackWidth) next += trackWidth;
    x.set(next);
  });

  // Reduced motion: show the 7 real reviews once, manually scrollable,
  // instead of an auto-looping duplicated track.
  const renderCopies = reduceMotion ? 1 : copies;

  return (
    <section id="depoimentos" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Depoimentos
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
              O que dizem os alunos
            </h2>
            <p className="mt-3 text-text-muted">
              Avaliações reais deixadas no Google por quem já treina com o Jonatas.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-card border border-border bg-surface px-5 py-4 shadow-sm">
            <FaGoogle className="text-2xl text-text-muted" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Star size={18} className="fill-gold text-gold" aria-hidden="true" />
              <span className="text-base font-bold text-text">5.0</span>
              <span className="text-sm text-text-muted">&middot; 50 avaliações no Google</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`mt-10 ${
          reduceMotion ? 'overflow-x-auto' : 'overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]'
        }`}
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
        onFocus={() => {
          paused.current = true;
        }}
        onBlur={() => {
          paused.current = false;
        }}
      >
        <motion.div className="flex gap-6 px-6" style={{ x }}>
          {Array.from({ length: renderCopies }).map((_, copyIndex) => (
            <div
              key={copyIndex}
              ref={copyIndex === 0 ? copyRef : undefined}
              className="flex shrink-0 gap-6"
              aria-hidden={copyIndex > 0}
            >
              {testimonials.map((t) => (
                <TestimonialCard key={`${copyIndex}-${t.name}`} {...t} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
