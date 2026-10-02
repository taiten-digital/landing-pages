import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { SERVICOS, waLink } from '../content';

// Stock, atmospheric only, never captioned as a JEA property: card-comprar = Pexels #4933643 by Deepak DK; card-vender = Unsplash by Avi Werde; card-investir = Pexels #31737859 by Sharath G. All free for commercial use, no attribution required.
import cardComprar from '../assets/images/card-comprar.jpg';
import cardVender from '../assets/images/card-vender.jpg';
import cardInvestir from '../assets/images/card-investir.jpg';

// ASSET NEEDED: real photos of JEA properties (or of Londrina) to replace the stock card photos.

const FOTOS: Record<string, string> = {
  comprar: cardComprar,
  vender: cardVender,
  investir: cardInvestir,
};

type Servico = (typeof SERVICOS)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Photo with a slow scale drift while its panel is the active one. */
function Foto({ src, active, reduce, index }: { src: string; active: boolean; reduce: boolean; index: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover will-change-transform"
      initial={false}
      animate={
        reduce
          ? { scale: 1.05 }
          : active
            ? { scale: [1.05, 1.15, 1.05] }
            : { scale: 1.05 }
      }
      transition={
        reduce
          ? { duration: 0 }
          : active
            ? { duration: 16 + index * 2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.8, ease: EASE }
      }
    />
  );
}

function Checklist({ itens, tone }: { itens: string[]; tone: 'dark' | 'light' }) {
  const text = tone === 'dark' ? 'text-white/90' : 'text-ink';
  const icon = tone === 'dark' ? 'text-white/70' : 'text-ink-muted';
  return (
    <ul className="space-y-2.5">
      {itens.map((item) => (
        <li key={item} className={`flex items-start gap-2.5 text-sm leading-snug ${text}`}>
          <Check aria-hidden className={`mt-0.5 h-4 w-4 shrink-0 ${icon}`} strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Cta({ servico, className = '' }: { servico: Servico; className?: string }) {
  return (
    <motion.a
      href={waLink(servico.msg)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover ${className}`}
    >
      <FaWhatsapp aria-hidden className="h-5 w-5" />
      Conversar no WhatsApp
    </motion.a>
  );
}

export default function Servicos() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium leading-[1.12] text-ink sm:text-4xl lg:text-5xl">
            Por onde você quer <span className="text-accent-ink">começar</span>?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Escolha um caminho e fale direto com a JEA pelo WhatsApp. A mensagem já vai pronta, é só enviar.
          </p>
        </div>

        {/* Desktop: expanding photo accordion */}
        <div className="mt-10 hidden h-[32rem] gap-3 lg:flex">
          {SERVICOS.map((servico, i) => {
            const open = active === i;
            const panelId = `servico-painel-${servico.id}`;
            return (
              <motion.div
                key={servico.id}
                id={panelId}
                className="relative min-w-0 overflow-hidden rounded-3xl bg-deep"
                style={{ flexBasis: 0 }}
                initial={false}
                animate={{ flexGrow: open ? 3.2 : 1 }}
                transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE }}
                onMouseEnter={() => setActive(i)}
              >
                <Foto src={FOTOS[servico.id]} active={open} reduce={reduce} index={i} />

                {/* Neutral black scrims: darker when collapsed, bottom gradient always */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-black"
                  initial={false}
                  animate={{ opacity: open ? 0 : 0.5 }}
                  transition={{ duration: reduce ? 0 : 0.6 }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 via-55% to-transparent" />

                {/* Selector (a real button); the CTA below is a sibling link, never nested */}
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  aria-label={`${servico.titulo}: ${open ? 'aberto' : 'abrir detalhes'}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="absolute inset-0 z-10 cursor-pointer rounded-3xl outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-accent"
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute left-6 top-6 z-20 font-display text-sm tracking-widest text-white/70"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Collapsed: vertical title */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center"
                  initial={false}
                  animate={{ opacity: open ? 0 : 1, y: open ? 12 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                >
                  <span className="font-display text-3xl font-medium tracking-wide text-white [writing-mode:vertical-rl] rotate-180">
                    {servico.titulo}
                  </span>
                </motion.div>

                {/* Expanded: title, summary, checklist, CTA (fixed width so text never reflows while growing) */}
                <motion.div
                  className="pointer-events-none absolute bottom-8 left-8 z-20 w-[min(26rem,calc(100%-4rem))]"
                  initial={false}
                  animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, delay: open ? 0.3 : 0, ease: EASE }}
                  inert={!open}
                >
                  <h3 className="font-display text-4xl font-medium leading-[1.12] text-white">{servico.titulo}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/85">{servico.resumo}</p>
                  <div className="mt-5">
                    <Checklist itens={servico.itens} tone="dark" />
                  </div>
                  <Cta servico={servico} className="pointer-events-auto mt-6" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile and tablet: stacked cards, tap to expand (grid-template-rows 0fr to 1fr, no height auto) */}
        <div className="mt-8 flex flex-col gap-4 lg:hidden">
          {SERVICOS.map((servico, i) => {
            const open = active === i;
            const bodyId = `servico-corpo-${servico.id}`;
            return (
              <div key={servico.id} className="overflow-hidden rounded-3xl border border-line bg-card">
                <div className="relative h-52 sm:h-56">
                  <Foto src={FOTOS[servico.id]} active={open} reduce={reduce} index={i} />
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 bg-black"
                    initial={false}
                    animate={{ opacity: open ? 0 : 0.35 }}
                    transition={{ duration: reduce ? 0 : 0.5 }}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 via-60% to-transparent" />
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={bodyId}
                    onClick={() => setActive(i)}
                    className="absolute inset-0 z-10 flex cursor-pointer items-end justify-between p-5 text-left outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="font-display text-3xl font-medium leading-[1.12] text-white">
                      <span aria-hidden className="mr-3 text-sm tracking-widest text-white/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {servico.titulo}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-500 motion-reduce:transition-none ${
                        open ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                </div>

                <div
                  id={bodyId}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                  inert={!open}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`p-5 transition-opacity duration-500 motion-reduce:transition-none ${
                        open ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <p className="text-base leading-relaxed text-ink-muted">{servico.resumo}</p>
                      <div className="mt-4">
                        <Checklist itens={servico.itens} tone="light" />
                      </div>
                      <Cta servico={servico} className="mt-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
