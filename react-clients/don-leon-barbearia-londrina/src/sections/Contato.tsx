import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaApple, FaGooglePlay, FaInstagram } from 'react-icons/fa6';

const UNITS = [
  { name: 'Matriz', phone: '(43) 3324-6933', tel: '554333246933' },
  { name: 'Bosque', phone: '(43) 3338-8890', tel: '554333388890' },
  { name: 'Faria Lima', phone: '(43) 3347-3052', tel: '554333473052' },
  { name: 'San Fernando', phone: '(43) 98866-1533', tel: '5543988661533' },
];

const APP_STORE_URL = 'https://apps.apple.com/br/app/don-leon-barbearia/id6744699270';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=br.com.starapp.donleonbarbearia';
const INSTAGRAM_URL = 'https://www.instagram.com/donleonbarbearia/';

/** Wraps a CTA button in a pulsing glow ring hugging its own rounded-pill
 *  shape — a tight inset offset + small blur, distinct from the Hero's
 *  large-blur diffuse ambient glow. */
function GlowRing({
  children,
  reduceMotion,
  primary,
}: {
  children: React.ReactNode;
  reduceMotion: boolean;
  primary?: boolean;
}) {
  return (
    <div className="relative inline-flex">
      <motion.span
        aria-hidden="true"
        className={`absolute -inset-1.5 rounded-full blur-md ${
          primary
            ? 'bg-gradient-to-r from-accent to-accent-2'
            : 'bg-gradient-to-r from-accent/70 to-accent-2/70'
        }`}
        animate={
          reduceMotion
            ? { opacity: 0.55 }
            : { opacity: [0.4, 0.9, 0.4], scale: [1, 1.06, 1] }
        }
        transition={{
          duration: primary ? 2.2 : 2.6,
          repeat: reduceMotion ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />
      {children}
    </div>
  );
}

export default function Contato() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-bg-panel px-6 py-16 sm:px-10 sm:py-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="font-display text-sm uppercase tracking-[0.35em] text-accent-2">
          Agende agora
        </span>
        <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-fg sm:text-5xl lg:text-6xl">
          Seu horário te espera
          <br />
          na{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Don Leon
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
          Agendamento rápido pelo nosso app, disponível para iPhone e Android.
          Prefere falar direto com a unidade? É só ligar.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <GlowRing reduceMotion={reduceMotion} primary>
            <motion.a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-display text-sm uppercase tracking-wide text-fg shadow-lg shadow-black/30"
            >
              <FaApple className="h-6 w-6" aria-hidden="true" />
              Baixar na App Store
            </motion.a>
          </GlowRing>

          <GlowRing reduceMotion={reduceMotion} primary>
            <motion.a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-display text-sm uppercase tracking-wide text-fg shadow-lg shadow-black/30"
            >
              <FaGooglePlay className="h-6 w-6" aria-hidden="true" />
              Baixar no Google Play
            </motion.a>
          </GlowRing>
        </div>

        <div className="mt-14 w-full border-t border-fg/10 pt-10">
          <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">
            Prefere ligar? Fale com sua unidade
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {UNITS.map((unit) => (
              <li key={unit.name}>
                <a
                  href={`tel:+${unit.tel}`}
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent-2"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="text-fg">{unit.name}</span>
                  <span>{unit.phone}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-fg-muted/70">
            Endereços e horários completos na seção Unidades acima.
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent-2"
          >
            <FaInstagram className="h-5 w-5" aria-hidden="true" />
            @donleonbarbearia
          </a>
        </div>
      </div>
    </section>
  );
}
