import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { FLAVORS, waLink, type Flavor } from '../config'

function FlavorCard({ flavor, index }: { flavor: Flavor; index: number }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 160, damping: 18 })
  const sy = useSpring(py, { stiffness: 160, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])
  const jarX = useTransform(sx, [-0.5, 0.5], [-14, 14])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div style={{ perspective: 1000 }} className="pt-28 sm:pt-32">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[2rem] border border-ink/10 bg-[#e9d7b8] px-6 pb-7 pt-0 shadow-[0_30px_60px_-30px_rgba(42,20,16,0.45)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(closest-side, ${flavor.glow}66, transparent 100%)` }}
        />
        <motion.div
          className="relative z-10 -mt-24 flex justify-center sm:-mt-28"
          style={{ x: reduce ? 0 : jarX, translateZ: 60 }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 4.2 + index * 0.6, delay: index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={flavor.image}
            alt={`Pote de ${flavor.name} Artesanal`}
            loading="lazy"
            className="h-56 w-auto select-none drop-shadow-[0_24px_24px_rgba(42,20,16,0.4)] sm:h-64"
            style={{ aspectRatio: flavor.ratio }}
            draggable={false}
          />
        </motion.div>

        <div style={reduce ? undefined : { transform: 'translateZ(24px)' }} className="mt-5 text-ink">
          <h3 className="font-display text-2xl font-black leading-tight sm:text-[1.7rem]">{flavor.name}</h3>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-ink/60">{flavor.short}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/80">{flavor.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Combina com</span>
            {flavor.pairs.map((p) => (
              <span key={p} className="rounded-full bg-ink/10 px-3 py-1 text-xs font-bold text-ink">
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-ink/60">Pote de 210 g</span>
            <motion.a
              href={waLink(`Olá, Dyess! Quero pedir ${flavor.name} Artesanal.`)}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-paper"
            >
              <FaWhatsapp className="text-lg text-wa" aria-hidden />
              Pedir este
            </motion.a>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Sabores() {
  return (
    <section id="sabores" className="relative bg-paper py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-black leading-[1.08] sm:text-5xl">
            Três sabores para a sua mesa ficar inesquecível.
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Passe o mouse (ou o dedo) sobre os potes. Gostou de algum? É só chamar no WhatsApp.
          </p>
        </div>
        <div className="mt-2 grid items-start gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {FLAVORS.map((f, i) => (
            <FlavorCard key={f.id} flavor={f} index={i} />
          ))}
        </div>
        <p className="mt-10 text-sm font-semibold text-ink/65">
          Também trabalhamos com geleias. Pergunte pelos sabores disponíveis no WhatsApp.
        </p>
      </div>
    </section>
  )
}
