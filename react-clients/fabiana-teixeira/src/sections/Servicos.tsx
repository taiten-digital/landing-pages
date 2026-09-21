import { motion, useReducedMotion } from 'framer-motion';
import { Check, Dumbbell, Laptop, MapPin, Wifi } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import squatPhoto from '../assets/images/squat.jpg';

const WHATSAPP_NUMBER = '5543991167030';

function whatsappLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

type Servico = {
  icon: typeof Dumbbell;
  title: string;
  tagline: string;
  bullets: string[];
  photo?: string;
  ctaLabel: string;
  ctaMessage: string;
};

const servicos: Servico[] = [
  {
    icon: Dumbbell,
    title: 'Treino presencial',
    tagline: 'Presencial em Londrina, PR',
    bullets: [
      'Acompanhamento individual, ajustado ao seu ritmo',
      'Foco em emagrecimento e evolução da composição corporal',
      'Correção de execução e progressão de carga ao vivo',
    ],
    photo: squatPhoto,
    ctaLabel: 'Quero treinar presencial',
    ctaMessage: 'Olá, Fabiana! Quero saber mais sobre o treino presencial em Londrina.',
  },
  {
    icon: Laptop,
    title: 'Consultoria online',
    tagline: 'Online, de onde você estiver',
    bullets: [
      'Consultoria online personalizada para o seu objetivo',
      'Mesma base de emagrecimento e hipertrofia, adaptada à sua rotina',
      'Suporte à distância para tirar dúvidas e ajustar o plano',
    ],
    ctaLabel: 'Quero começar online',
    ctaMessage: 'Olá, Fabiana! Quero saber mais sobre a consultoria online.',
  },
];

export default function Servicos() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
            Modalidades de atendimento
          </span>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-text sm:text-5xl">
            Treine <span className="text-accent">presencial</span> ou{' '}
            <span className="text-accent">online</span>, sempre com foco em emagrecimento
          </h2>
          <p className="mt-4 text-text-muted">
            A especialidade é emagrecimento, mas o trabalho não para por aí: também entra
            hipertrofia e treino geral, na modalidade que fizer mais sentido pra sua rotina.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
          {servicos.map((servico, index) => {
            const Icon = servico.icon;
            return (
              <motion.article
                key={servico.title}
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 4.2 + index * 0.5,
                        delay: index * 0.35,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface"
              >
                {servico.photo ? (
                  <div className="relative h-56 w-full overflow-hidden sm:h-64">
                    <img
                      src={servico.photo}
                      alt="Treino presencial com barra livre, agachamento"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                  </div>
                ) : (
                  <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-bg sm:h-64">
                    <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-accent-2/20 blur-3xl" />
                    <Wifi className="relative h-16 w-16 text-text-muted" strokeWidth={1.25} />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-text">
                        {servico.title}
                      </h3>
                      <p className="flex items-center gap-1.5 text-sm text-text-muted">
                        {servico.icon === Dumbbell && <MapPin className="h-3.5 w-3.5" />}
                        {servico.tagline}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {servico.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(servico.ctaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    {servico.ctaLabel}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
