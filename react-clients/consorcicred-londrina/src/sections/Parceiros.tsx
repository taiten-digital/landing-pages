import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { EMPRESA, PARCEIROS, waLink } from '../content';
// Partner logos are trademarks of their owners, used only to identify the client's partners.
// Acerte: file from acerteconsorcios.com.br. BV and Banco do Brasil: Wikimedia Commons (Banco_BV_Logo.svg, Banco_do_Brasil_Logo.svg).
import logoBB from '../assets/images/logo-bb.svg';
import logoAcerte from '../assets/images/logo-acerte-consorcios.jpg';
import logoBV from '../assets/images/logo-bv.svg';

const LOGOS: Record<string, { src: string; alt: string; cls: string }> = {
  bb: { src: logoBB, alt: 'BB Consórcios, Banco do Brasil', cls: 'h-9 sm:h-10' },
  acerte: { src: logoAcerte, alt: 'Acerte Consórcios', cls: 'h-16 sm:h-[4.5rem]' },
  bv: { src: logoBV, alt: 'BV Financeira', cls: 'h-14 sm:h-16' },
};

export default function Parceiros() {
  const reduceMotion = useReducedMotion();
  const [canTrack, setCanTrack] = useState(false);

  // Pointer-follow only on devices with a real hover pointer.
  useEffect(() => {
    setCanTrack(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const tracking = canTrack && !reduceMotion;
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(255,154,158,0.22), rgba(255,154,158,0.06) 45%, transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!tracking) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      id="parceiros"
      onPointerMove={onMove}
      className="relative overflow-hidden bg-deep py-16 text-on-deep sm:py-20"
    >
      {/* Spotlight: follows the pointer on desktop, static soft glow on touch / reduced motion */}
      {tracking ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(600px circle at 50% 35%, rgba(255,154,158,0.16), rgba(255,154,158,0.04) 50%, transparent 72%)',
          }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-on-deep-muted">
            Parceiros
          </p>
          <h2 className="font-display mt-3 text-3xl leading-[1.15] text-on-deep sm:text-5xl">
            Representante autorizado de{' '}
            <span className="text-accent-on-deep">três</span> parceiros de crédito
          </h2>
        </div>

        <ul className="mt-10 grid items-start gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {PARCEIROS.map((p) => {
            const logo = LOGOS[p.id];
            return (
              <motion.li
                key={p.nome}
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl border border-line-deep bg-white px-6 py-8 text-center shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="flex h-20 items-center justify-center">
                  <img src={logo.src} alt={logo.alt} className={`${logo.cls} w-auto max-w-full object-contain`} />
                </div>
                <span className="mt-4 block text-sm font-medium text-text-muted">{p.nome}</span>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12">
          <motion.a
            href={waLink(`Olá, ${EMPRESA.nome}! Quero confirmar meu plano pelo WhatsApp.`)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="cursor-pointer rounded-full bg-whatsapp px-7 py-3.5 text-base font-semibold text-deep shadow-lg shadow-black/20"
          >
            Confirmar meu plano pelo WhatsApp
          </motion.a>
          <p className="text-xs text-on-deep-muted">
            Informações divulgadas pelo próprio ConsorciCred.
          </p>
        </div>
      </div>
    </section>
  );
}
