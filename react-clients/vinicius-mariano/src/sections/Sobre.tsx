import { motion, useReducedMotion } from 'framer-motion';
import { Award, Building2, GraduationCap, HeartPulse, Landmark, Scale, ShieldCheck } from 'lucide-react';
// Client-supplied photo (his WhatsApp profile picture), 640x641. Possibly
// AI-styled, unconfirmed; it does depict Vinicius himself. Small source:
// never render wider than ~420 CSS px.
import viniPerfil from '../assets/images/vini-perfil.jpg';

// Credentials as published by Vinicius on LinkedIn/Instagram/WhatsApp (client-brief.md, Round 2).
const credentials = [
  { icon: Landmark, label: 'Economista · CORECON-PR nº 9366' },
  { icon: Scale, label: 'Perito Econômico-Financeiro · CORECON-PR' },
  { icon: ShieldCheck, label: 'Assessor de investimentos certificado · ANCORD' },
  { icon: Award, label: 'Certificação CPA · ANBIMA' },
  { icon: HeartPulse, label: 'Pós-graduação em Saúde e Qualidade de Vida' },
  { icon: GraduationCap, label: 'Formação na UEL, Universidade Estadual de Londrina' },
  { icon: Building2, label: 'Sócio da Saron Investments, credenciada à XP' },
];

export default function Sobre() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="relative overflow-hidden bg-bg py-16 text-text sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Portrait + ambient glow */}
        <div className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-28 lg:mx-0">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-16 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 35%, transparent) 0%, color-mix(in srgb, var(--color-accent) 12%, transparent) 45%, transparent 75%)',
            }}
            animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src={viniPerfil}
            alt="Vinicius Mariano Franco trabalhando no notebook, com uma xícara de café"
            width={640}
            height={641}
            loading="lazy"
            decoding="async"
            className="relative aspect-square w-full rounded-3xl object-cover ring-1 ring-line"
          />
          <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-full border border-line bg-deep/90 px-4 py-2 text-xs font-medium text-text backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Londrina, PR · Saron Investments | XP
          </div>
        </div>

        {/* Bio + credentials */}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Quem conduz</p>
          <div className="mt-3 h-px w-10 bg-accent" />

          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-text sm:text-5xl">
            <span className="block font-extrabold">Vinicius Mariano Franco.</span>
            <span className="block font-light">Economista, assessor&nbsp;e</span>
            <span className="block font-bold text-accent">criador do Método CAFÉ.</span>
          </h2>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-text-muted sm:text-lg">
            <p>
              Economista registrado no CORECON-PR (nº 9366), Vinicius é desde 2024 sócio e assessor de
              investimentos na Saron Investments, escritório credenciado à XP. Seu trabalho é a estruturação
              patrimonial com foco em governança, coerência de alocação e proteção de longo prazo.
            </p>
            <p>
              Antes do mercado financeiro, foram 8 anos (2016 a 2024) como sócio-proprietário de um negócio de
              saúde e fitness em Londrina, cuidando de atendimento, operações e equipe. Ele conhece de perto o lado
              de quem empreende, ganha bem e ainda vive no ritmo da próxima renda.
            </p>
            <p>
              Pós-graduado em Saúde e Qualidade de Vida, hoje trabalha o que chama de{' '}
              <span className="text-text">governança patrimonial e comportamental</span>: um assessor com foco no
              cliente, não no produto.
            </p>
          </div>

          <ul className="mt-10 grid items-start gap-3 sm:grid-cols-2">
            {credentials.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3.5"
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 4 + i * 0.4, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon aria-hidden className="mt-0.5 h-[18px] w-[18px] shrink-0 text-text-muted" strokeWidth={1.75} />
                <span className="text-sm leading-snug text-text">{label}</span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-text-muted/80">
            Informações divulgadas pelo próprio Vinicius em seus perfis profissionais.
          </p>
        </div>
      </div>

      {/* Carousel-style footer rule */}
      <div className="mx-auto mt-14 flex max-w-6xl items-center gap-4 px-5 text-[11px] uppercase tracking-[0.3em] text-text-muted sm:px-8">
        <span>Vinícius Mariano</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span>04/05</span>
      </div>
    </section>
  );
}
