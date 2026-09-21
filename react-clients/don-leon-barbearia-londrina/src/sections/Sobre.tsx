import { motion, useReducedMotion } from 'framer-motion';
import interiorBarberPortrait from '../assets/images/interior-barber-portrait.jpg';

const AMBIENTE_ITEMS = [
  'Sofá de couro no lounge',
  'Decoração exclusiva, cheia de personalidade',
  'Cadeiras personalizadas para crianças',
  'TV no ambiente, corte sem pressa',
];

export default function Sobre() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="relative overflow-hidden bg-bg-panel py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-card border border-white/10 md:order-1 md:aspect-[3/4]">
          <motion.img
            src={interiorBarberPortrait}
            alt="Barbeiro sorrindo no ambiente lounge da Don Leon Barbearia"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.1, x: '2%', y: '0%' }}
            animate={
              reduceMotion
                ? {}
                : { scale: [1.1, 1.24, 1.1], x: ['2%', '-3%', '2%'], y: ['0%', '2.5%', '0%'] }
            }
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/30" />
        </div>

        <div className="order-1 md:order-2">
          <span className="font-sans text-sm uppercase tracking-[0.25em] text-accent-2">
            High Experience
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-fg md:text-5xl">
            Mais que um corte,
            <br />
            uma experiência
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">
            Na Don Leon o resultado começa antes da tesoura. O ambiente foi
            pensado como um lounge de verdade: industrial-vintage, com
            couro, madeira e tijolo aparente, pra virar parte do que você
            leva pra casa, não só o corte.
          </p>

          <ul className="mt-8 space-y-4">
            {AMBIENTE_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-3 font-sans text-fg">
                <span className="h-2 w-2 shrink-0 rounded-full bg-leather" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
