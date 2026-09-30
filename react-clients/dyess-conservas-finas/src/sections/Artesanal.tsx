import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HandHeart, Leaf } from 'lucide-react'
import { GiHerbsBundle } from 'react-icons/gi'

const WORDS = ['Artesanal', 'Premium', 'Feito com amor', 'Londrina']
const PX_PER_SECOND = 70

const FACTS = [
  {
    Icon: HandHeart,
    title: 'Produto artesanal',
    text: 'Conservas feitas com muito amor em cada detalhe.',
  },
  {
    Icon: GiHerbsBundle,
    title: 'Ingredientes selecionados',
    text: 'Salsinha, cebolinha, pimenta dedo-de-moça, abacaxi e mais.',
  },
  {
    Icon: Leaf,
    title: 'Sem conservantes artificiais',
    text: 'É o que a Dyess divulga para as suas conservas.',
  },
]

function Track() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`px-6 font-display text-5xl font-black uppercase leading-[1.15] sm:text-7xl ${
              i % 2 ? 'text-transparent' : 'text-paper'
            }`}
            style={i % 2 ? { WebkitTextStroke: '2px #f3e7d3' } : undefined}
          >
            {w}
          </span>
          <span aria-hidden className="text-3xl text-gold">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

function Marquee({ reduce }: { reduce: boolean | null }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [copies, setCopies] = useState(3)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return
      const width = trackRef.current.getBoundingClientRect().width
      const vw = viewportRef.current.getBoundingClientRect().width
      if (!width) return
      setTrackWidth(width)
      setCopies(Math.max(2, Math.ceil(vw / width) + 1))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div ref={viewportRef} className="overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={reduce || !trackWidth ? undefined : { x: [0, -trackWidth] }}
        transition={{ duration: trackWidth / PX_PER_SECOND, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} ref={i === 0 ? trackRef : undefined} className="flex">
            <Track />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Artesanal() {
  const reduce = useReducedMotion()
  return (
    <section id="artesanal" className="relative overflow-hidden border-t border-white/5 bg-bg py-16 sm:py-20">
      <div className="-mx-6 -rotate-2 bg-accent py-3 shadow-[0_20px_60px_-20px_rgba(224,50,31,0.6)]" aria-hidden>
        <Marquee reduce={reduce} />
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-3xl font-display text-4xl font-black leading-[1.08] text-paper sm:text-5xl">
          Feito em Londrina, pensado para{' '}
          <span className="bg-gradient-to-r from-gold to-accent bg-clip-text italic text-transparent">
            dar sabor
          </span>{' '}
          ao seu dia.
        </h2>

        <ul className="mt-10 grid items-start gap-5 md:grid-cols-3">
          {FACTS.map(({ Icon, title, text }, i) => (
            <li key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <motion.div
                className="grid h-14 w-14 place-items-center rounded-2xl bg-paper text-ink"
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 4 + i * 0.5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon size={28} aria-hidden />
              </motion.div>
              <h3 className="mt-5 font-display text-2xl font-bold text-paper">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted/80">Informações divulgadas pela própria Dyess no Instagram.</p>
      </div>
    </section>
  )
}
