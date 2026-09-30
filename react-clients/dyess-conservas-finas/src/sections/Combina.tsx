import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { flavorById, waLink, type FlavorId } from '../config'

// Combinações baseadas nas descrições do próprio Instagram da marca.
const DISHES: { label: string; picks: FlavorId[]; line: string }[] = [
  {
    label: 'Carnes',
    picks: ['chimichurri', 'abacaxi', 'saladinha'],
    line: 'Para carnes, o chimichurri é o clássico. O abacaxi com pimenta traz o doce picante, e a saladinha dá o toque marcante.',
  },
  {
    label: 'Legumes',
    picks: ['chimichurri', 'saladinha'],
    line: 'Legumes ganham aroma com o chimichurri e ficam mais vivos com a saladinha de pimenta.',
  },
  {
    label: 'Queijos',
    picks: ['abacaxi', 'saladinha'],
    line: 'Queijo com abacaxi e pimenta é daqueles encontros que ninguém esquece.',
  },
  {
    label: 'Aperitivos',
    picks: ['abacaxi', 'saladinha'],
    line: 'Para a tábua de aperitivos, o abacaxi com pimenta e a saladinha chamam atenção.',
  },
  {
    label: 'Qualquer prato',
    picks: ['saladinha'],
    line: 'Na dúvida, a saladinha de pimenta dá aquele toque especial em qualquer prato.',
  },
]

export default function Combina() {
  const [sel, setSel] = useState(0)
  const dish = DISHES[sel]

  return (
    <section id="combina" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-2xl font-display text-4xl font-black leading-[1.08] text-paper sm:text-5xl">
          O que vai hoje na mesa?
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">Escolha o prato e veja qual pote combina.</p>

        <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Prato">
          {DISHES.map((d, i) => (
            <button
              key={d.label}
              type="button"
              role="tab"
              aria-selected={i === sel}
              onClick={() => setSel(i)}
              className="relative cursor-pointer rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-paper"
            >
              {i === sel && (
                <motion.span
                  layoutId="dish-pill"
                  className="absolute inset-0 rounded-full bg-paper"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative ${i === sel ? 'text-ink' : ''}`}>{d.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatePresence mode="wait">
            <motion.p
              key={dish.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="font-display text-2xl font-bold leading-snug text-paper sm:text-3xl"
            >
              {dish.line}
            </motion.p>
          </AnimatePresence>

          <motion.div layout className="flex min-h-[20rem] items-end justify-center gap-4 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {dish.picks.map((id) => {
                const f = flavorById(id)
                return (
                  <motion.a
                    layout
                    key={id}
                    href={waLink(`Olá, Dyess! Quero pedir ${f.name} Artesanal.`)}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.85 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex cursor-pointer flex-col items-center"
                  >
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ background: `radial-gradient(closest-side, ${f.glow}55, transparent 100%)` }}
                    />
                    <img
                      src={f.image}
                      alt={`Pote de ${f.name}`}
                      loading="lazy"
                      className={`relative w-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)] ${
                        dish.picks.length === 1 ? 'h-72 sm:h-80' : dish.picks.length === 2 ? 'h-56 sm:h-72' : 'h-40 sm:h-60'
                      }`}
                      style={{ aspectRatio: f.ratio }}
                    />
                    <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-paper group-hover:bg-wa group-hover:text-[#06301a]">
                      <FaWhatsapp aria-hidden /> Pedir
                    </span>
                  </motion.a>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
