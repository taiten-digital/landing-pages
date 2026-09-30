import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { FLAVORS, waLink, type FlavorId } from '../config'

function Count({ value }: { value: number }) {
  return (
    <span className="relative inline-flex h-[1.2em] w-[1.6ch] justify-center overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="absolute"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Pedido() {
  const [qty, setQty] = useState<Record<FlavorId, number>>({ chimichurri: 0, saladinha: 0, abacaxi: 0 })
  const [name, setName] = useState('')

  const total = FLAVORS.reduce((s, f) => s + qty[f.id], 0)
  const change = (id: FlavorId, d: number) => setQty((q) => ({ ...q, [id]: Math.min(24, Math.max(0, q[id] + d)) }))

  const lines = FLAVORS.filter((f) => qty[f.id] > 0).map((f) => `${qty[f.id]}x ${f.name} Artesanal (210 g)`)
  const message =
    `Olá, Dyess!${name.trim() ? ` Meu nome é ${name.trim()}.` : ''} Quero fazer um pedido:\n` +
    lines.join('\n') +
    '\nPode me passar os valores e as opções de entrega?'

  return (
    <section id="pedido" className="relative border-t border-white/5 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-2xl font-display text-4xl font-black leading-[1.08] text-paper sm:text-5xl">
          Monte seu pedido em 10 segundos.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Escolha quantos potes quer de cada sabor. A gente abre o WhatsApp com tudo já escrito.
        </p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ul className="grid gap-4">
            {FLAVORS.map((f) => {
              const n = qty[f.id]
              return (
                <li
                  key={f.id}
                  className={`flex items-center gap-4 rounded-3xl border p-4 transition-colors sm:gap-6 sm:p-5 ${
                    n > 0 ? 'border-gold/60 bg-white/[0.07]' : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <motion.img
                    src={f.image}
                    alt={`Pote de ${f.name}`}
                    loading="lazy"
                    className="h-28 w-auto shrink-0 drop-shadow-[0_14px_16px_rgba(0,0,0,0.55)] sm:h-32"
                    style={{ aspectRatio: f.ratio }}
                    animate={{ scale: n > 0 ? 1.06 : 1, rotate: n > 0 ? -4 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold text-paper sm:text-2xl">{f.name}</h3>
                    <p className="text-sm text-muted">{f.short} · 210 g</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => change(f.id, -1)}
                      disabled={n === 0}
                      aria-label={`Menos um ${f.name}`}
                      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/20 text-paper transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-display text-3xl font-black text-paper">
                      <Count value={n} />
                    </span>
                    <button
                      type="button"
                      onClick={() => change(f.id, 1)}
                      aria-label={`Mais um ${f.name}`}
                      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-paper text-ink transition-transform hover:scale-110 active:scale-95"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Comanda ao vivo */}
          <div className="relative rounded-3xl bg-paper p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-7 lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-ink/60">Seu pedido</p>
            <div className="mt-4 min-h-[7rem]">
              <AnimatePresence initial={false} mode="popLayout">
                {lines.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-base text-ink/70"
                  >
                    Nenhum pote ainda. Toque no + para começar.
                  </motion.p>
                ) : (
                  lines.map((l) => (
                    <motion.p
                      layout
                      key={l}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      className="border-b border-dashed border-ink/25 py-2 font-display text-lg font-bold"
                    >
                      {l}
                    </motion.p>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-bold text-ink/70">Total de potes</span>
              <span className="font-display text-4xl font-black">
                <Count value={total} />
              </span>
            </div>

            <label className="mt-5 block text-sm font-bold text-ink/80" htmlFor="pedido-nome">
              Seu nome (opcional)
            </label>
            <input
              id="pedido-nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              placeholder="Como podemos te chamar?"
              className="mt-1.5 w-full rounded-xl border border-ink/20 bg-white/60 px-4 py-3 text-base text-ink outline-none placeholder:text-ink/40 focus:border-ink"
            />

            <motion.a
              href={total > 0 ? waLink(message) : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={total === 0}
              whileHover={total > 0 ? { scale: 1.03 } : undefined}
              whileTap={total > 0 ? { scale: 0.97 } : undefined}
              onClick={(e) => total === 0 && e.preventDefault()}
              className={`mt-5 flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-base font-extrabold transition-colors ${
                total > 0
                  ? 'cursor-pointer bg-wa text-[#06301a] shadow-[0_12px_30px_-10px_rgba(37,211,102,0.8)]'
                  : 'cursor-not-allowed bg-ink/15 text-ink/45'
              }`}
            >
              <FaWhatsapp className="text-2xl" aria-hidden />
              Enviar pedido no WhatsApp
            </motion.a>
            <p className="mt-3 text-center text-xs text-ink/60">
              Valores e entrega são confirmados direto com a Dyess no WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
