import { useId, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { ArrowUpRight, Phone } from 'lucide-react';
import { CONTATO, SERVICOS, WA_PADRAO, waLink } from '../content';

// How each SERVICOS id reads inside the composed WhatsApp sentence.
const FRASE_INTERESSE: Record<string, string> = {
  comprar: 'Quero comprar um imóvel em Londrina.',
  vender: 'Quero vender meu imóvel em Londrina.',
  investir: 'Tenho interesse em investir em imóveis em Londrina.',
};

const ROW_BASE =
  'group flex items-center gap-4 rounded-2xl border border-deep-line bg-deep-2 p-4 sm:p-5 transition-colors hover:border-accent/50 hover:bg-deep-2/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const FIELD_BASE =
  'w-full rounded-xl border border-deep-line bg-deep px-4 py-3 text-base text-sand placeholder:text-sand-muted/60 focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent';

function ChannelRow({
  href,
  icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={ROW_BASE}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-wider text-sand-muted">{label}</span>
        <span className="block truncate text-lg font-semibold text-sand sm:text-xl">{value}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-5 shrink-0 text-sand-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

export default function Contato() {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const nomeId = `${uid}-nome`;
  const msgId = `${uid}-msg`;
  const interesseLabelId = `${uid}-interesse`;

  const [nome, setNome] = useState('');
  const [interesse, setInteresse] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const partes: string[] = ['Olá!'];
    if (nome.trim()) partes.push(`Meu nome é ${nome.trim()}.`);
    if (interesse && FRASE_INTERESSE[interesse]) {
      partes.push(FRASE_INTERESSE[interesse]);
    } else {
      partes.push('Gostaria de conversar sobre um imóvel.');
    }
    if (mensagem.trim()) partes.push(mensagem.trim());
    const texto = partes.length > 2 || nome.trim() || interesse || mensagem.trim() ? partes.join(' ') : WA_PADRAO;
    window.open(waLink(texto), '_blank', 'noopener');
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-deep py-16 text-sand sm:py-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium leading-[1.15] text-sand sm:text-4xl lg:text-5xl">
            Vamos conversar sobre o seu <span className="text-accent">imóvel</span>?
          </h2>
          <p className="mt-4 text-base text-sand-muted sm:text-lg">
            Escolha o canal que for mais fácil para você. Pode ser uma mensagem curta, sem compromisso.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: channels */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <ChannelRow
              href={waLink(WA_PADRAO)}
              external
              label="WhatsApp"
              value={CONTATO.telefone}
              icon={
                <span className="relative flex size-14 shrink-0 items-center justify-center">
                  {!reduceMotion &&
                    [0, 1].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border-2 border-whatsapp"
                        initial={{ scale: 1, opacity: 0.55 }}
                        animate={{ scale: [1, 1.4], opacity: [0.55, 0] }}
                        transition={{
                          duration: 3.2,
                          delay: i * 1.6,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  <span className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-deep">
                    <FaWhatsapp aria-hidden="true" className="size-7" />
                  </span>
                </span>
              }
            />

            <ChannelRow
              href={`tel:+${CONTATO.whatsapp}`}
              label="Telefone"
              value={CONTATO.telefone}
              icon={
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-deep-line bg-deep text-sand-muted">
                  <Phone aria-hidden="true" className="size-6" />
                </span>
              }
            />

            <ChannelRow
              href={CONTATO.instagramUrl}
              external
              label="Instagram"
              value={CONTATO.instagram}
              icon={
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-deep-line bg-deep text-sand-muted">
                  <FaInstagram aria-hidden="true" className="size-6" />
                </span>
              }
            />

            {/* TODO: address / hours / e-mail not provided */}
          </div>

          {/* Right: form card with breathing glow */}
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 blur-3xl sm:-inset-14"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 42%, transparent), transparent 70%)',
              }}
              animate={reduceMotion ? undefined : { scale: [0.95, 1.1, 0.95], opacity: [0.5, 0.95, 0.5] }}
              transition={{ duration: 8, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
            />

            <form
              onSubmit={onSubmit}
              className="relative z-10 rounded-3xl border border-deep-line bg-deep-2 p-5 sm:p-8"
            >
              <div>
                <label htmlFor={nomeId} className="mb-2 block text-sm font-semibold text-sand">
                  Seu nome
                </label>
                <input
                  id={nomeId}
                  type="text"
                  name="nome"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como posso te chamar?"
                  className={FIELD_BASE}
                />
              </div>

              <div className="mt-5">
                <span id={interesseLabelId} className="mb-2 block text-sm font-semibold text-sand">
                  O que você quer?
                </span>
                <div role="group" aria-labelledby={interesseLabelId} className="flex flex-wrap gap-2">
                  {SERVICOS.map((s) => {
                    const ativo = interesse === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() => setInteresse(ativo ? null : s.id)}
                        className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          ativo
                            ? 'border-accent bg-accent/15 text-accent'
                            : 'border-deep-line bg-deep text-sand hover:border-sand-muted'
                        }`}
                      >
                        {s.titulo}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor={msgId} className="mb-2 block text-sm font-semibold text-sand">
                  Mensagem <span className="font-normal text-sand-muted">(opcional)</span>
                </label>
                <textarea
                  id={msgId}
                  name="mensagem"
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Conte em poucas palavras o que você procura."
                  className={`${FIELD_BASE} resize-y`}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 text-base font-bold text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <FaWhatsapp aria-hidden="true" className="size-5" />
                Enviar pelo WhatsApp
              </motion.button>

              <p className="mt-3 text-center text-xs text-sand-muted">
                A mensagem abre no seu WhatsApp. Nada é guardado neste site.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
