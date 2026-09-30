import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WA_DISPLAY, WA_GENERIC } from '../config'

function MagneticCta({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 })

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="relative inline-block p-6" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-wa/40 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.a
        ref={ref}
        href={WA_GENERIC}
        target="_blank"
        rel="noreferrer"
        style={{ x, y }}
        whileTap={{ scale: 0.96 }}
        className="relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-wa px-8 py-5 text-lg font-extrabold text-[#06301a] sm:px-12 sm:py-6 sm:text-2xl"
      >
        <FaWhatsapp className="text-3xl sm:text-4xl" aria-hidden />
        Chamar no WhatsApp
      </motion.a>
    </div>
  )
}

export default function Contato() {
  const reduce = useReducedMotion()
  const [heroVisible, setHeroVisible] = useState(true)

  // Botão flutuante some enquanto o Hero (que já tem o próprio CTA) está na tela.
  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.3 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section id="contato" className="relative overflow-hidden border-t border-white/5 bg-surface py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-black leading-[1.08] text-paper sm:text-6xl">
            Bateu a vontade?{' '}
            <span className="bg-gradient-to-r from-gold to-accent bg-clip-text pl-[0.04em] pr-[0.2em] -mr-[0.2em] italic text-transparent">
              Chama a gente.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
            Conte quais sabores você quer e a Dyess responde direto no WhatsApp.
          </p>
          <div className="mt-6">
            <MagneticCta reduce={reduce} />
          </div>
          <p className="mt-2 text-xl font-bold text-paper">{WA_DISPLAY}</p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-bg py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted sm:flex-row sm:px-8">
          <div className="flex items-baseline gap-2">
            <span className="font-script text-4xl leading-none text-paper">Dyess</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]">Conservas Finas</span>
          </div>
          <p className="flex items-center gap-1.5">
            <MapPin size={15} aria-hidden /> Londrina, PR
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 font-semibold text-paper hover:text-gold"
          >
            <FaInstagram className="text-lg" aria-hidden /> {INSTAGRAM_HANDLE}
          </a>
        </div>
      </footer>

      <a
        href={WA_GENERIC}
        target="_blank"
        rel="noreferrer"
        aria-label="Pedir pelo WhatsApp"
        // @ts-expect-error `inert` é aceito pelo navegador mas ainda ausente nos tipos do React
        inert={heroVisible ? '' : undefined}
        className={`fixed bottom-5 right-5 z-40 grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-wa text-[#06301a] shadow-[0_12px_30px_-6px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 ${
          heroVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
        }`}
      >
        <FaWhatsapp className="text-4xl" aria-hidden />
      </a>
    </>
  )
}
