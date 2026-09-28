import type { ComponentType } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
// Icons (literal matches, verified present in the installed packages):
// lucide-react: HardHat (construção), Users (consórcio = grupo), Wallet (consignado),
// ShieldCheck (seguros), ArrowUpRight (link). react-icons: GiHouseKeys (Game Icons,
// casa com chaves = compra), TbHomeDollar (Tabler, casa com cifrão = crédito com garantia).
import { ArrowUpRight, HardHat, ShieldCheck, Users, Wallet } from 'lucide-react';
import { GiHouseKeys } from 'react-icons/gi';
import { TbHomeDollar } from 'react-icons/tb';
import { SERVICOS, waLink } from '../content';

type ServicoId = (typeof SERVICOS)[number]['id'];

const ICONS: Record<ServicoId, ComponentType<{ className?: string }>> = {
  compra: GiHouseKeys,
  construcao: HardHat,
  garantia: TbHomeDollar,
  consorcios: Users,
  consignados: Wallet,
  seguros: ShieldCheck,
};

const card: Variants = {
  rest: { y: 0, boxShadow: '0 1px 2px rgba(11,36,64,0.04), 0 8px 24px -12px rgba(11,36,64,0.12)' },
  hover: { y: -4, boxShadow: '0 2px 4px rgba(11,36,64,0.06), 0 24px 48px -16px rgba(24,92,144,0.35)' },
};

const icon: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: { y: -6, rotate: -10, scale: 1.1, transition: { type: 'spring', stiffness: 380, damping: 14 } },
};

export default function Servicos() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      {/* Static soft brand light behind the grid (breathing glow belongs to Contato). */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand)_0%,transparent_65%)] opacity-[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-text-muted">Serviços</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-text sm:text-4xl lg:text-5xl">
            Crédito para cada <em className="font-extrabold italic text-brand">conquista</em>
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Do primeiro imóvel ao consignado, a gente cuida do processo com você.
          </p>
        </div>

        {/* ASSET NEEDED: foto real da equipe atendendo um cliente (ou entrega de chaves, com autorização) para acompanhar os cards; hoje não existe nenhuma foto de equipe/escritório/clientes. */}
        <div className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICOS.map((s, i) => {
            const Icon = ICONS[s.id];
            return (
              <motion.div
                key={s.id}
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 4.2 + i * 0.55, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <motion.article
                  variants={card}
                  initial="rest"
                  animate="rest"
                  whileHover={reduceMotion ? undefined : 'hover'}
                  className="group relative flex flex-col rounded-3xl bg-surface p-6 ring-1 ring-text/5 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <motion.div
                      variants={reduceMotion ? undefined : icon}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/15"
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>
                    <span aria-hidden className="font-display text-3xl font-extrabold leading-none text-brand/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold leading-[1.2] text-text">{s.titulo}</h3>
                  <p className="mt-2 text-text-muted">{s.texto}</p>

                  <a
                    href={waLink('Olá! Quero saber mais sobre ' + s.titulo + '.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Quero saber mais sobre ${s.titulo} pelo WhatsApp`}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full font-bold text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Quero saber mais
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
