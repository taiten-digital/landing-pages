import { motion, useReducedMotion } from 'framer-motion';
import {
  HeartPulse,
  House,
  Car,
  Scale,
  Building2,
  Truck,
  PawPrint,
  LockKeyhole,
  type LucideIcon,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { SEGUROS, waLink } from '../content';

// Literal-match icons from lucide-react, keyed by SEGUROS id.
const ICONS: Record<string, LucideIcon> = {
  vida: HeartPulse,
  casa: House,
  auto: Car,
  'responsabilidade-civil': Scale,
  empresas: Building2,
  cargas: Truck,
  animais: PawPrint,
  'riscos-digitais': LockKeyhole,
};

export default function Seguros() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="seguros" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,107,219,0.18),transparent)] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl leading-[1.2] text-text sm:text-4xl lg:text-5xl">
            Dependendo da sua necessidade, existem <span className="text-accent">proteções</span> para:
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            Conte o que você precisa proteger e a Baldon orienta você pelo WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SEGUROS.map((item, i) => {
            const Icon = ICONS[item.id] ?? LockKeyhole;
            const featured = i === 0;
            return (
              <motion.article
                key={item.id}
                className={`group relative rounded-2xl border border-line bg-surface-2 transition-colors duration-300 hover:border-accent/50 ${
                  featured
                    ? 'p-7 sm:col-span-2 sm:p-9 lg:col-span-2'
                    : 'p-6'
                }`}
                animate={reduceMotion ? undefined : { y: [0, -(6 + (i % 3) * 2), 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 3.6 + i * 0.45,
                        delay: i * 0.35,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
              >
                {featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(201,165,92,0.16),transparent)] blur-2xl"
                  />
                )}
                <motion.div
                  className={`relative inline-flex items-center justify-center rounded-xl border border-line bg-surface text-text-muted transition-colors duration-300 group-hover:text-text ${
                    featured ? 'h-16 w-16' : 'h-12 w-12'
                  }`}
                  whileHover={reduceMotion ? undefined : { y: -6, rotate: -8, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                >
                  <Icon className={featured ? 'h-8 w-8' : 'h-6 w-6'} strokeWidth={1.6} aria-hidden />
                </motion.div>
                <h3
                  className={`font-display relative mt-5 text-text ${
                    featured ? 'text-2xl sm:text-3xl' : 'text-xl'
                  }`}
                >
                  {item.titulo}
                </h3>
                <p className={`relative mt-2 text-text-muted ${featured ? 'max-w-xl text-base sm:text-lg' : 'text-[0.95rem]'}`}>
                  {item.texto}
                </p>
                <a
                  href={waLink(item.mensagem)}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  Falar no WhatsApp
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
