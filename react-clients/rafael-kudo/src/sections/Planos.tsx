import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Clock, ClipboardCheck, Dumbbell, Laptop, Video } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_BASE = 'https://wa.me/5543991720681';

type Plan = {
  name: string;
  modality: 'Presencial' | 'Online';
  modalityIcon: typeof Dumbbell;
  descriptor: string;
  features: { icon: typeof Dumbbell; label: string }[];
};

const plans: Plan[] = [
  {
    name: 'Personal Basic',
    modality: 'Presencial',
    modalityIcon: Dumbbell,
    descriptor: 'Treino presencial individual, no ritmo ideal para construir consistência.',
    features: [
      { icon: Dumbbell, label: 'Atendimento presencial, individual' },
      { icon: CalendarDays, label: '3x por semana' },
      { icon: Clock, label: 'Sessões de 1 hora' },
    ],
  },
  {
    name: 'Personal VIP',
    modality: 'Presencial',
    modalityIcon: Dumbbell,
    descriptor: 'Treino presencial com acompanhamento mais frequente, para evolução acelerada.',
    features: [
      { icon: Dumbbell, label: 'Atendimento presencial, individual' },
      { icon: CalendarDays, label: '5x por semana' },
      { icon: Clock, label: 'Sessões de 1 hora' },
    ],
  },
  {
    name: 'Mentor 1',
    modality: 'Online',
    modalityIcon: Laptop,
    descriptor: 'Mentoria online com acompanhamento remoto de perto.',
    features: [
      { icon: Video, label: 'Consultoria e mentoria 100% online' },
      { icon: ClipboardCheck, label: 'Avaliações físicas periódicas' },
    ],
  },
  {
    name: 'Mentor Pleno',
    modality: 'Online',
    modalityIcon: Laptop,
    descriptor: 'O nível mais completo de mentoria online do método Rafael Kudo.',
    features: [
      { icon: Video, label: 'Consultoria e mentoria 100% online' },
      { icon: ClipboardCheck, label: 'Avaliações físicas periódicas' },
      // PROOF NEEDED: recursos adicionais exclusivos do Mentor Pleno em relação
      // ao Mentor 1 (frequência de avaliações, canais de suporte, materiais
      // extras etc.) ainda não confirmados com o cliente — não inventar aqui.
    ],
  },
];

export default function Planos() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="planos" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Planos</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-text sm:text-5xl">
            Presencial ou mentoria online, escolha seu plano
          </h2>
          <p className="mt-4 text-text-muted">
            Dois formatos de atendimento, quatro planos, para encaixar o acompanhamento na sua
            rotina e nos seus objetivos.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => {
            const ModalityIcon = plan.modalityIcon;
            const whatsappHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(
              `Olá Rafael! Quero saber mais sobre o plano ${plan.name}.`,
            )}`;

            return (
              <motion.article
                key={plan.name}
                className="flex flex-col rounded-[var(--radius-card)] border-2 border-border bg-surface p-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        borderColor: 'var(--color-accent)',
                        boxShadow: '0 20px 40px -20px rgba(60,255,122,0.35)',
                      }
                }
                whileTap={reduceMotion ? undefined : { y: -4, scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-fg">
                    <ModalityIcon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="rounded-[var(--radius-full)] border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {plan.modality}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl text-text">{plan.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{plan.descriptor}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-border pt-6">
                  {plan.features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <li key={feature.label} className="flex items-start gap-3 text-sm text-text">
                        <FeatureIcon
                          size={16}
                          strokeWidth={2}
                          className="mt-0.5 shrink-0 text-text-muted"
                          aria-hidden="true"
                        />
                        {feature.label}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm font-semibold text-text">Valor sob consulta</p>
                  <p className="mt-1 text-xs text-text-muted">
                    Fale com o Rafael pelo WhatsApp para valores e condições.
                  </p>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-full)] bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-2"
                  >
                    <FaWhatsapp size={16} aria-hidden="true" />
                    Falar sobre este plano
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
