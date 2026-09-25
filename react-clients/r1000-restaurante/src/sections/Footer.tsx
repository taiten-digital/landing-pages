import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
// Real client logo (150x150, white square, no alpha): render small only.
import logo from '../assets/images/logo-r1000.png';

const WHATSAPP_URL =
  'https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.';
const PHONE_URL = 'tel:+554330662648';
const IFOOD_URL =
  'https://www.ifood.com.br/delivery/londrina-pr/r1000-restaurante-jardim-imagawa/ab6a8ae3-794f-4a36-9d59-d9301bb9da2b';
const INSTAGRAM_URL = 'https://www.instagram.com/r1000restaurante/';
const FACEBOOK_URL = 'https://www.facebook.com/R1000restaurante/';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Av.%20Jos%C3%A9%20Del%20Ciel%20Filho%2C%20750%2C%20Londrina%20PR';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Promoções', href: '#pedir' },
  { label: 'Onde estamos', href: '#onde-estamos' },
];

/** Link text with an accent underline that slides in from the left on hover/focus. */
function SlideLink({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative inline-block cursor-pointer pb-0.5 text-fg-muted transition-colors duration-300 hover:text-fg focus-visible:text-fg focus-visible:outline-none ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-bg-panel py-12 sm:py-16">
      {/* Ambient ember glow along the top edge: two very blurred radial layers pulsing out of phase. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72">
        <motion.div
          className="absolute left-1/2 top-[-9rem] h-72 w-[min(110%,70rem)] -translate-x-1/2 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--color-accent) 42%, transparent) 0%, color-mix(in srgb, var(--color-accent) 14%, transparent) 38%, transparent 68%)',
          }}
          initial={{ opacity: 0.55 }}
          animate={reduceMotion ? { opacity: 0.55 } : { opacity: [0.35, 0.85, 0.35] }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          className="absolute left-[18%] top-[-7rem] h-56 w-[min(70%,40rem)] -translate-x-1/2 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--color-ember) 30%, transparent) 0%, transparent 65%)',
          }}
          initial={{ opacity: 0.4 }}
          animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0.6, 0.2, 0.6], x: [0, 40, 0] }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          className="absolute right-[4%] top-[-7rem] h-56 w-[min(60%,34rem)] blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--color-ember) 24%, transparent) 0%, transparent 65%)',
          }}
          initial={{ opacity: 0.3 }}
          animate={reduceMotion ? { opacity: 0.3 } : { opacity: [0.15, 0.55, 0.15], x: [0, -30, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8, delay: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        {/* Hot hairline right at the edge, like the rim of a brasa. */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent"
          initial={{ opacity: 0.5 }}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.25, 0.8, 0.25] }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/10">
                <img
                  src={logo}
                  alt="Logo R1000 Restaurante"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 object-contain"
                />
              </span>
              <p className="font-display text-2xl font-bold leading-[1.1] text-fg">
                R1000 Restaurante
              </p>
            </div>
            <p className="mt-5 max-w-xs font-display text-lg font-semibold leading-snug text-fg">
              Todo dia é dia de churrasco e{' '}
              <span className="bg-gradient-to-r from-accent to-ember bg-clip-text text-transparent">
                feijoada
              </span>
              .
            </p>
            <p className="mt-2 max-w-xs text-sm text-fg-muted">Marmitex de churrasco e prato feito.</p>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé" className="min-w-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-fg-muted/80">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <SlideLink href={link.href} className="text-base">
                    {link.label}
                  </SlideLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="min-w-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-fg-muted/80">Contato</h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-fg-muted" />
                <SlideLink href={MAPS_URL} external>
                  Av. José Del Ciel Filho, 750, Jardim Imagawa, Londrina, PR
                </SlideLink>
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-fg-muted" />
                <SlideLink href={PHONE_URL}>(43) 3066-2648</SlideLink>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-fg-muted" />
                <SlideLink href={WHATSAPP_URL} external>
                  WhatsApp (43) 99138-3162
                </SlideLink>
              </li>
              <li className="flex items-start gap-3 text-fg-muted">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Terça a domingo, 10h30 às 15h</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do R1000 Restaurante"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-bg-raised text-fg-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
              >
                <FaInstagram aria-hidden="true" className="h-[18px] w-[18px]" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook do R1000 Restaurante"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-bg-raised text-fg-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
              >
                <FaFacebook aria-hidden="true" className="h-[18px] w-[18px]" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pedir pelo WhatsApp"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-bg-raised text-fg-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
              >
                <FaWhatsapp aria-hidden="true" className="h-[18px] w-[18px]" />
              </a>
              <a
                href={IFOOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pedir pelo iFood"
                className="flex h-10 cursor-pointer items-center rounded-full border border-white/10 bg-bg-raised px-4 text-sm font-bold text-fg-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
              >
                iFood
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6">
          <p className="text-xs text-fg-muted">© {year} R1000 Restaurante. Londrina, PR.</p>
        </div>
      </div>
    </footer>
  );
}
