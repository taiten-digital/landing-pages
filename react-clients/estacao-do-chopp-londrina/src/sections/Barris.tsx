import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { img, waLink } from '../lib/site';

const BARRELS = [
  {
    liters: 30,
    title: 'Barril de 30 litros',
    text: 'Serve de 20 a 25 pessoas*. Ideal para reunião de amigos, churrasco e aniversário.',
    height: 'h-56 sm:h-64',
  },
  {
    liters: 50,
    title: 'Barril de 50 litros',
    text: 'Mais chopp para a festa inteira, para quando o encontro é grande.',
    height: 'h-72 sm:h-80',
  },
];

function TiltCard({ b, i }: { b: (typeof BARRELS)[number]; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });
  const shine = useTransform(sy, [-10, 10], ['20%', '80%']);

  const move = (e: React.PointerEvent) => {
    if (reduce || !ref.current || e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 20);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={reset}
        style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-2 to-surface p-6 sm:p-8"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: useTransform(shine, (s) => `radial-gradient(circle at ${s} 30%, rgba(255,213,106,0.18), transparent 55%)`) }}
        />
        <span className="font-display text-outline pointer-events-none absolute -right-2 -top-4 text-[9rem] leading-none sm:text-[11rem]">
          {b.liters}L
        </span>
        <div className="relative flex h-80 items-end justify-center sm:h-96" style={{ transform: 'translateZ(50px)' }}>
          <img
            src={img('barril')}
            alt={`Barril de chopp de ${b.liters} litros`}
            loading="lazy"
            className={`fx-float ${b.height} w-auto object-contain`}
            style={{ '--dur': `${4.5 + i * 0.9}s`, '--delay': `${i * -0.5}s` } as React.CSSProperties}
          />
        </div>
        <div className="relative mt-4">
          <h3 className="font-display text-3xl text-text sm:text-4xl">{b.title}</h3>
          <p className="mt-2 text-text-muted">{b.text}</p>
          <a
            href={waLink(`Olá! Quero pedir um barril de ${b.liters} litros.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg transition-transform hover:scale-105"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden />
            Pedir barril de {b.liters}L
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Barris() {
  return (
    <section id="barris" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">Barris</p>
          <h2 className="font-display mt-3 text-5xl leading-[1.05] text-text sm:text-6xl">
            Escolha o tamanho <span className="text-accent">da sua festa</span>
          </h2>
        </div>
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          {BARRELS.map((b, i) => (
            <TiltCard key={b.liters} b={b} i={i} />
          ))}
        </div>
        <p className="mt-5 text-sm text-text-muted">*Estimativa divulgada pela própria Estação do Chopp no Instagram.</p>
      </div>
    </section>
  );
}
