import { motion, useReducedMotion } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';

export default function Avaliacao() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface py-14 sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div className="flex gap-2" aria-label="5 estrelas">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.span
              key={i}
              className="text-accent"
              animate={reduce ? {} : { scale: [1, 1.25, 1], filter: ['brightness(1)', 'brightness(1.6)', 'brightness(1)'] }}
              transition={{ duration: 1.4, delay: i * 0.22, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
            >
              <FaStar className="h-9 w-9 sm:h-12 sm:w-12" aria-hidden />
            </motion.span>
          ))}
        </div>
        <h2 className="font-display mt-5 text-5xl leading-[1.05] text-text sm:text-6xl">
          Nota 5 estrelas <span className="bg-gradient-to-r from-accent-2 to-accent bg-clip-text text-transparent">no Google</span>
        </h2>
        <p className="mt-3 max-w-md text-text-muted">Clientes que pedem chopp na Estação do Chopp avaliam a experiência com a nota máxima.</p>
      </div>
    </section>
  );
}
