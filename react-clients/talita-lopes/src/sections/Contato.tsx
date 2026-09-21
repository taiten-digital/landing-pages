import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { Activity, ClipboardCheck, Mail } from 'lucide-react';

const WHATSAPP_MESSAGE =
  'Olá, Talita! Vi sua página e quero marcar uma avaliação gratuita.';
const WHATSAPP_URL = `https://wa.me/5543984795883?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const STEP_DURATION_MS = 4000;

const STEPS = [
  {
    title: 'Chame no WhatsApp',
    body: 'Conte seu objetivo ou desconforto.',
    Icon: FaWhatsapp,
  },
  {
    title: 'Marque sua avaliação gratuita',
    body: 'Talita entende seu histórico e suas limitações antes de qualquer treino.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Receba seu plano personalizado',
    body: 'Treino pensado para você, que se adapta conforme você evolui.',
    Icon: Activity,
  },
] as const;

const SOCIALS = [
  {
    Icon: FaWhatsapp,
    label: '(43) 98479-5883',
    href: WHATSAPP_URL,
    external: true,
  },
  {
    Icon: FaInstagram,
    label: '@talitalopes.personal',
    href: 'https://www.instagram.com/talitalopes.personal/',
    external: true,
  },
  {
    Icon: Mail,
    label: 'talitalopes.personal@gmail.com',
    href: 'mailto:talitalopes.personal@gmail.com',
    external: false,
  },
] as const;

export default function Contato() {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance: reruns whenever the active step or pause state changes, so
  // a manual tab click or an unpause both start a fresh 4s window. Cleared
  // on unmount, on pause, and before every re-schedule.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, STEP_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const step = STEPS[active];

  return (
    <section
      id="contato"
      className="bg-forest px-6 py-16 text-bg sm:px-10 sm:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bg sm:text-4xl">
          Como funciona
        </h2>
        <p className="mt-2 text-muted-dark">Três passos, sem burocracia.</p>

        <div
          className="mt-8 text-left"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Como funciona, passo a passo"
            className="grid gap-3 sm:grid-cols-3"
          >
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-md border p-3 text-left transition-colors ${
                  i === active
                    ? 'border-accent bg-accent/15'
                    : 'border-bg/15 bg-bg/5 hover:border-bg/30'
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                  <s.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-bg">{s.title}</span>
                {i === active &&
                  (reduceMotion ? (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] w-full bg-accent" />
                  ) : (
                    <motion.span
                      key={active}
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-accent"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: STEP_DURATION_MS / 1000, ease: 'linear' }}
                    />
                  ))}
              </button>
            ))}
          </div>

          <div className="relative mt-4 min-h-[8.5rem] sm:min-h-[6.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? undefined : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-md border border-bg/12 bg-bg/5 p-4 sm:p-5"
              >
                <span className="font-display text-2xl font-extrabold text-accent">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-lg font-bold text-bg sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1 text-muted-dark">{step.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bg sm:text-4xl">
          Fale com a Talita
        </h2>
        <p className="mt-2 text-muted-dark">
          Sem compromisso. Sem cartão. Sem letra miúda.
        </p>

        <div className="relative mx-auto mt-6 max-w-md overflow-hidden rounded-md border border-bg/15 bg-bg/5 p-5 text-left">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[70px]"
            animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.5, 0.9, 0.5] }}
            transition={{
              duration: 6,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-display font-extrabold text-accent-fg">
              T
            </span>
            <div>
              <p className="font-bold text-bg">Talita Lopes</p>
              <p className="text-sm text-muted-dark">Ela mesma responde</p>
            </div>
          </div>

          <p className="relative mt-3 max-w-[90%] rounded-2xl rounded-bl-md bg-accent px-4 py-3 text-sm font-semibold text-accent-fg">
            “Olá, Talita! Vi sua página e quero marcar uma avaliação gratuita.”
          </p>

          <span className="relative mt-3 ml-1 inline-flex gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-bg/50"
                animate={
                  reduceMotion
                    ? { opacity: 0.5 }
                    : { y: [0, -4, 0], opacity: [0.5, 1, 0.5] }
                }
                transition={{
                  duration: 1.2,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}
          </span>

          <div className="relative mt-4">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-accent-fg"
            >
              <FaWhatsapp className="h-[18px] w-[18px]" aria-hidden="true" />
              Enviar mensagem
            </motion.a>
          </div>
        </div>

        <div className="mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dark">
            ou fale por
          </span>
          <div className="mt-3 flex flex-wrap items-start justify-center gap-3">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
                animate={reduceMotion ? {} : { y: [0, -6, 0] }}
                transition={{
                  duration: 4 + i * 0.4,
                  delay: i * 0.3,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 rounded-pill border border-bg/18 px-4 py-2 text-sm font-semibold text-bg transition-colors hover:border-accent hover:bg-accent/15"
              >
                <s.Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
