import { motion, useReducedMotion } from 'framer-motion';
import {
  ClipboardCheck,
  Dumbbell,
  Monitor,
  Heart,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import treinoImg from '../assets/images/hero-treino.webp';
import forcaImg from '../assets/images/diferenciais-forca.webp';
// consultoria-online.jpg and treino-emagrecimento.jpg: free-license stock
// (Unsplash License, free for commercial use, no attribution required),
// used only for these two cells because no real photo of Talita or a real
// aluna exists yet for these two categories. Never presented as depicting
// her or a specific real student.
import onlineImg from '../assets/images/consultoria-online.jpg';
import emagrecimentoImg from '../assets/images/treino-emagrecimento.jpg';

type Service = {
  title: string;
  body: string;
  Icon: LucideIcon;
  photo?: string;
  featured?: boolean;
};

// Order is deliberate, not left to default reflow: "Avaliação física" leads
// (natural first read, ties back to the page's one CTA), then in-person
// (primary segment), then the four secondary-segment lines. All 6 cells
// render at the same footprint (client's explicit, repeated instruction) -
// "Avaliação física" keeps priority via position + its accent border, never
// via being physically larger than its siblings.
const services: Service[] = [
  {
    title: 'Avaliação física',
    body: 'O ponto de partida de qualquer plano. Gratuita e sem compromisso.',
    Icon: ClipboardCheck,
    photo: forcaImg,
    featured: true,
  },
  {
    title: 'Atendimento presencial',
    body: 'Em domicílio, em condomínio ou em estúdio parceiro, conforme sua conveniência.',
    Icon: Dumbbell,
  },
  {
    title: 'Consultoria online',
    body: 'Acompanhamento e plano de treino à distância, para quem já treina com autonomia.',
    Icon: Monitor,
    photo: onlineImg,
  },
  {
    title: 'Treino de hipertrofia',
    body: 'Prescrição individualizada para ganho de força e massa muscular.',
    Icon: Dumbbell,
  },
  {
    title: 'Treino para emagrecimento',
    body: 'Prescrição individualizada com foco em perda de peso.',
    Icon: Heart,
    photo: emagrecimentoImg,
  },
  {
    title: 'Planilha de treino para corredores',
    body: 'Plano estruturado para quem corre, do iniciante ao mais experiente.',
    Icon: Activity,
  },
];

// Per-cell idle-float timing (seconds) - carried over from the original
// CSS animation-duration/animation-delay pairs so the six cells keep
// drifting out of phase with each other rather than moving in sync.
const FLOAT_TIMING = [
  { duration: 4.8, delay: 0 },
  { duration: 5.6, delay: 0.4 },
  { duration: 5.1, delay: 0.9 },
  { duration: 6.2, delay: 0.2 },
  { duration: 4.4, delay: 1.1 },
  { duration: 5.8, delay: 0.6 },
];

export default function Servicos() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="servicos"
      className="py-16 sm:py-20"
      style={{
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--color-sage) 40%, transparent) 0%, var(--color-bg) 26rem)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-4 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
              Serviços
            </h2>
            <p className="mt-2 max-w-[60ch] text-muted">
              Além do treino especializado em coluna para 50+, atendimento para outros objetivos.
              Treino individualizado, seja qual for o seu ponto de partida.
            </p>
          </div>
          <img
            src={treinoImg}
            alt="Treino funcional orientado pela Talita Lopes"
            width={480}
            height={360}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </div>

        {/* All 6 cells intentionally the same footprint - grid stays
            align-items: stretch (no items-start) on purpose here, since
            equal sizing across the row is the client's explicit
            instruction, not an unintended side effect of variable content. */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const { duration, delay } = FLOAT_TIMING[index];
            const isPhoto = Boolean(service.photo);

            return (
              <motion.article
                key={service.title}
                className={`group relative flex min-h-[190px] flex-col justify-center overflow-hidden rounded-md border p-4 transition-[box-shadow,border-color] duration-200 hover:shadow-[0_14px_28px_-14px_rgba(0,0,0,0.22)] ${
                  isPhoto ? 'border-2 border-accent text-bg' : 'border-border text-forest'
                }`}
                animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration, delay, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                {isPhoto && (
                  <>
                    <img
                      src={service.photo}
                      alt=""
                      aria-hidden="true"
                      width={500}
                      height={500}
                      loading="lazy"
                      className="absolute inset-0 z-0 h-full w-full object-cover"
                    />
                    {/* Dark forest-color scrim, never a green tint - client's
                        explicit "quase zero verde" rule for any photo overlay. */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background:
                          'linear-gradient(110deg, color-mix(in srgb, var(--color-forest) 94%, transparent) 45%, color-mix(in srgb, var(--color-forest) 55%, transparent) 100%)',
                      }}
                    />
                  </>
                )}

                {!isPhoto && (
                  <motion.span
                    className="pointer-events-none absolute -right-2 -bottom-2 z-0 text-accent opacity-[0.08]"
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { rotate: [0, 5, 0] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 9, delay: index * 0.5, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <service.Icon size={72} strokeWidth={1.5} />
                  </motion.span>
                )}

                <span
                  className={`relative z-10 mb-2 inline-flex transition-transform duration-200 group-hover:scale-[1.15] group-hover:-rotate-[4deg] ${
                    isPhoto ? 'text-bg' : 'text-accent'
                  }`}
                >
                  <service.Icon size={22} />
                </span>
                <h3 className="relative z-10 font-display text-lg font-bold">{service.title}</h3>
                <p className={`relative z-10 mt-2 ${isPhoto ? 'text-bg/80' : 'text-muted'}`}>
                  {service.body}
                </p>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] w-0 bg-gradient-to-r from-accent to-accent/40 transition-[width] duration-300 ease-out group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
