import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { img } from '../lib/site';

const POINTS = [
  { k: 'Distribuidora de chopp', v: 'Do barril direto para o seu evento, em Londrina.' },
  { k: 'Desde 2014', v: 'Anos de estrada levando chopp para bons momentos.' },
  { k: 'Pedido simples', v: 'Você fala com a gente pelo WhatsApp e combina tudo.' },
];

export default function Sobre() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = scrollYProgress;
  const yHops = useTransform(p, [0, 1], [90, -110]);
  const yWheat = useTransform(p, [0, 1], [40, -60]);
  const yMalt = useTransform(p, [0, 1], [-20, 50]);
  const rot = useTransform(p, [0, 1], [-14, 18]);

  return (
    <section id="sobre" ref={ref} className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">A Estação</p>
          <h2 className="font-display mt-3 text-5xl leading-[1.05] text-text sm:text-6xl">
            Tudo começa no <span className="text-accent">malte, no lúpulo e no trigo</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-text/80">
            A Estação do Chopp é uma distribuidora de chopp de Londrina. Nosso jeito de trabalhar cabe em uma frase:
            o melhor chopp, para os melhores momentos.
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((pt) => (
              <li key={pt.k} className="flex gap-4 border-l-2 border-accent/60 pl-4">
                <div>
                  <p className="font-display text-2xl text-text">{pt.k}</p>
                  <p className="text-text-muted">{pt.v}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[500px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,168,29,0.3),transparent_65%)]" />
          <motion.img
            src={img('lupulo')}
            alt="Lúpulo"
            loading="lazy"
            style={reduce ? undefined : { y: yHops, rotate: rot }}
            className="absolute left-[2%] top-[6%] w-[58%] will-change-transform"
          />
          <motion.img
            src={img('trigo')}
            alt="Espigas de trigo"
            loading="lazy"
            style={reduce ? undefined : { y: yWheat }}
            className="absolute bottom-[2%] right-[2%] h-[72%] will-change-transform"
          />
          <motion.img
            src={img('malte')}
            alt="Grãos de malte"
            loading="lazy"
            style={reduce ? undefined : { y: yMalt }}
            className="absolute bottom-[0%] left-[0%] w-[68%] will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
