import { motion, useReducedMotion } from 'framer-motion';
import { Dumbbell, Laptop, MapPin, MessageCircle, Utensils, Video } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import personalPresencialPhoto from '../assets/images/jonatas-aluna-legpress.png';

const WHATSAPP_URL = 'https://wa.me/5543999813940';

type Service = {
  icon: typeof Dumbbell;
  title: string;
  description: string;
  features: { icon: typeof Dumbbell; label: string }[];
  ctaLabel: string;
  photo?: string;
  photoAlt?: string;
};

const services: Service[] = [
  {
    icon: Dumbbell,
    title: 'Personal Presencial',
    description:
      'Treino acompanhado presencialmente em Londrina, com correção de execução e progressão individualizada a cada sessão.',
    features: [
      { icon: MapPin, label: 'Av. Garibaldi Deliberador, Jardim Cláudia, Londrina - PR' },
      { icon: Dumbbell, label: 'Progressão individual conforme a possibilidade de cada aluno' },
    ],
    ctaLabel: 'Quero treinar presencial',
    photo: personalPresencialPhoto,
    photoAlt: 'Jonatas Hotts orientando uma aluna na leg press, academia interna em Londrina',
  },
  {
    icon: Laptop,
    title: 'Consultoria Online',
    description:
      'Plano de treino e acompanhamento à distância, com vídeos explicando cada exercício e suporte durante todo o processo.',
    features: [
      { icon: Video, label: 'Vídeos explicando a execução de cada exercício' },
      { icon: Utensils, label: 'Plano alimentar incluso' },
      { icon: MessageCircle, label: 'Acompanhamento e suporte contínuo online' },
    ],
    ctaLabel: 'Quero a consultoria online',
  },
];

export default function Servicos() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Serviços</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
            Presencial em Londrina ou consultoria de qualquer lugar
          </h2>
          <p className="mt-4 text-text-muted">
            Duas formas de treinar com acompanhamento de verdade, escolha a que faz mais sentido
            para a sua rotina.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border-2 border-border bg-surface p-8 shadow-[0_1px_2px_rgba(0,0,0,0.2)] sm:flex-row sm:gap-6"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        borderColor: 'var(--color-accent)',
                        boxShadow: '0 20px 40px -20px rgba(47,111,237,0.35)',
                      }
                }
                whileTap={reduceMotion ? undefined : { y: -4, scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {service.photo && (
                  <div className="w-full shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-border sm:w-2/5 md:w-1/3">
                    <img
                      src={service.photo}
                      alt={service.photoAlt}
                      className="aspect-[3/4] h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-6 flex flex-1 flex-col sm:mt-0">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-fg">
                    <Icon size={24} strokeWidth={2} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 text-xl font-bold text-text">{service.title}</h3>
                  <p className="mt-2 text-text-muted">{service.description}</p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {service.features.map((feature) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li key={feature.label} className="flex items-start gap-3 text-sm text-text">
                          <FeatureIcon
                            size={18}
                            strokeWidth={2}
                            className="mt-0.5 shrink-0 text-text-muted"
                            aria-hidden="true"
                          />
                          <span>{feature.label}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-2"
                  >
                    <FaWhatsapp size={18} aria-hidden="true" />
                    {service.ctaLabel}
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
