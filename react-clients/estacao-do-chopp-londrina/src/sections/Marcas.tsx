import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { waLink } from '../lib/site';

const BRANDS = [
  { name: 'Golden Classic', note: 'Chopp Golden' },
  { name: 'Fábrica 1 Puro Malte', note: 'Fábrica 1' },
  { name: 'Fábrica 1 Pilsen Premium', note: 'Fábrica 1' },
  { name: 'Amstel', note: 'Amstel Lager' },
  { name: 'Heineken', note: 'Heineken' },
];

export default function Marcas() {
  return (
    <section id="marcas" className="relative overflow-hidden border-t border-white/5 bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">Cardápio</p>
          <h2 className="font-display mt-3 text-5xl leading-[1.05] text-text sm:text-6xl">
            Qual chopp vai <span className="text-accent">na sua mesa?</span>
          </h2>
          <p className="mt-5 max-w-sm text-text/80">
            Disponível em barris de 30 e 50 litros. Consulte valores e disponibilidade no WhatsApp.
          </p>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {BRANDS.map((b) => (
            <li key={b.name}>
              <motion.a
                href={waLink(`Olá! Quero saber sobre o chopp ${b.name}.`)}
                target="_blank"
                rel="noreferrer"
                initial="rest"
                whileHover="hover"
                whileTap="hover"
                animate="rest"
                className="group relative flex items-center justify-between gap-4 overflow-hidden px-2 py-5 sm:px-4"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent-2"
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="font-display relative text-3xl text-text sm:text-5xl"
                  variants={{ rest: { x: 0, color: 'var(--color-text)' }, hover: { x: 14, color: 'var(--color-accent-fg)' } }}
                  transition={{ duration: 0.35 }}
                >
                  {b.name}
                </motion.span>
                <motion.span
                  className="relative flex items-center gap-2 text-sm font-medium"
                  variants={{ rest: { color: 'var(--color-text-muted)' }, hover: { color: 'var(--color-accent-fg)' } }}
                >
                  <span className="hidden sm:inline">Consultar</span>
                  <ArrowUpRight className="h-6 w-6" aria-hidden />
                </motion.span>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
