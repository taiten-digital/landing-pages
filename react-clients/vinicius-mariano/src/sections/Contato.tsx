import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Clock, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const CALENDLY = 'https://calendly.com/vinimarianofranco';

type ContactItem = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const items: ContactItem[] = [
  { icon: FaWhatsapp, label: 'WhatsApp', value: '(43) 98850-3078', href: 'https://wa.me/554388503078', external: true },
  { icon: Mail, label: 'E-mail', value: 'viniciusfranco.bauru@live.com', href: 'mailto:viniciusfranco.bauru@live.com' },
  { icon: FaInstagram, label: 'Instagram', value: '@vinimarianofranco', href: 'https://www.instagram.com/vinimarianofranco/', external: true },
  { icon: MapPin, label: 'Local', value: 'Londrina, PR' },
  // Only the WhatsApp Business hours (08:00-19:00) are known; days of the week are not.
  { icon: Clock, label: 'Horário', value: 'Atendimento das 8h às 19h' },
];

// Sweep gradient built from tokens: accent -> pale cream-green (accent mixed into text) -> accent.
// Starts and ends on accent so the 200%-wide tile loops seamlessly.
const sweep =
  'linear-gradient(90deg, var(--color-accent) 0%, color-mix(in oklab, var(--color-accent) 30%, var(--color-text)) 50%, var(--color-accent) 100%)';

// Ring color = --color-accent (#4FAE76) as rgba; Framer can't interpolate var()/color-mix inside box-shadow.
const RING_ON = '0 0 0 0 rgba(79, 174, 118, 0.5)';
const RING_OFF = '0 0 0 12px rgba(79, 174, 118, 0)';

export default function Contato() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contato" className="relative overflow-hidden bg-forest py-16 text-text sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
        {/* Left: the test + booking CTA */}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Próximo passo</p>
          <div className="mt-3 h-px w-10 bg-accent" />

          <h2 className="mt-8 font-display text-4xl leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-6xl">
            <span className="font-extrabold">Faça este teste com </span>
            <motion.span
              className="inline-block bg-clip-text pb-[0.06em] font-extrabold text-transparent"
              style={{ backgroundImage: sweep, backgroundSize: '200% 100%' }}
              initial={{ backgroundPosition: '0% 50%' }}
              animate={reduceMotion ? undefined : { backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              calma.
            </motion.span>
          </h2>

          <blockquote className="mt-8 max-w-xl border-l border-accent/60 pl-5">
            <p className="text-lg leading-relaxed text-text sm:text-xl">
              Anote o que mudaria imediatamente se sua renda parasse.
            </p>
            <p className="mt-3 text-base leading-relaxed text-text-muted sm:text-lg">
              Essa é a parte da vida que o seu patrimônio ainda não sustenta.
            </p>
          </blockquote>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Depois, traga essa resposta para uma conversa.
          </p>

          <motion.a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 text-base font-semibold text-cta-fg transition-colors hover:bg-cta-hover sm:text-lg"
            animate={reduceMotion ? undefined : { boxShadow: [RING_ON, RING_OFF, RING_OFF] }}
            transition={{ duration: 2.8, times: [0, 0.7, 1], repeat: Infinity, ease: 'easeOut' }}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <CalendarDays className="size-5" aria-hidden="true" />
            Agendar uma conversa
          </motion.a>
        </div>

        {/* Right: real contact channels */}
        <ul className="min-w-0 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {items.map(({ icon: Icon, label, value, href, external }) => {
            const body = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-text-muted transition-colors group-hover:border-accent/50 group-hover:text-text">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-[0.25em] text-text-muted">{label}</span>
                  <span className="mt-1 block text-[15px] font-medium text-text [overflow-wrap:anywhere] sm:text-base">
                    {value.indexOf("@") > 0 ? <>{value.slice(0, value.indexOf("@"))}<wbr />{value.slice(value.indexOf("@"))}</> : value}
                  </span>
                </span>
              </>
            );
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-white/[0.04] sm:px-6 sm:py-5"
                  >
                    {body}
                    <ArrowUpRight
                      className="size-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-4 py-4 sm:px-6 sm:py-5">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Carousel page-footer signature */}
      <div className="mx-auto mt-14 flex max-w-6xl items-center gap-4 px-5 text-[11px] uppercase tracking-[0.3em] text-text-muted sm:px-8">
        <span>Vinícius Mariano</span>
        <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
        <span>05/05</span>
      </div>
    </section>
  );
}
