import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, ArrowUpRight, ChevronDown } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { CONTATO, EMPRESA, SERVICOS, waLink, WA_PADRAO } from '../content';

// Contato: breathing gold ambient glow behind the WhatsApp form card + pulsing
// ping rings around the WhatsApp icon. Both loops are off under reduced motion.
// E-mail and opening hours are UNKNOWN (client-brief): intentionally not rendered.

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.mapsQuery)}`;
const OUTRO = 'Outro assunto';
const INTERESSES = [...SERVICOS.map((s) => s.titulo), OUTRO];

const field =
  'mt-2 w-full rounded-xl border border-deep-line bg-deep px-4 py-3 text-base text-sand placeholder:text-sand-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';
const fieldLabel = 'block text-sm font-medium text-sand';
const iconBox =
  'grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-deep-line bg-deep-2 text-sand-muted';
const itemLabel = 'text-xs font-medium uppercase tracking-wider text-sand-muted';
const linkCls = 'mt-0.5 block break-words text-sand underline-offset-4 transition-colors hover:text-accent-hover hover:underline';

export default function Contato() {
  const reduce = useReducedMotion();
  const [nome, setNome] = useState('');
  const [interesse, setInteresse] = useState(INTERESSES[0]);
  const [mensagem, setMensagem] = useState('');

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const assunto = interesse === OUTRO ? 'Gostaria de conversar sobre outro assunto.' : `Tenho interesse em: ${interesse}.`;
    const texto = [`Olá, Flávio! Meu nome é ${nome.trim()}. Vim pelo site.`, assunto, mensagem.trim()]
      .filter(Boolean)
      .join('\n');
    window.open(waLink(texto), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-deep py-16 text-sand sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.15] text-sand sm:text-4xl lg:text-5xl">
            Vamos encontrar o seu <span className="text-accent">imóvel</span>?
          </h2>
          <p className="mt-4 text-base text-sand-muted sm:text-lg">
            Conte o que você procura e a conversa continua no WhatsApp. Se preferir, ligue ou visite o escritório na
            Gleba Palhano.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
          {/* Form card over a breathing gold glow */}
          <div className="relative min-w-0">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-12 rounded-full blur-3xl sm:-inset-16"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 38%, transparent) 0%, color-mix(in oklab, var(--color-accent) 12%, transparent) 50%, transparent 72%)',
              }}
              initial={false}
              animate={reduce ? { opacity: 0.75, scale: 1 } : { opacity: [0.5, 1, 0.5], scale: [0.94, 1.06, 0.94] }}
              transition={reduce ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <form
              onSubmit={enviar}
              className="relative rounded-2xl border border-deep-line bg-deep-2 p-6 shadow-2xl shadow-black/40 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center">
                  {!reduce &&
                    [0, 1].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden
                        className="absolute inset-0 rounded-full border-2 border-whatsapp"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                        transition={{ duration: 2.6, delay: i * 1.3, repeat: Infinity, ease: 'easeOut' }}
                      />
                    ))}
                  <span className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-deep">
                    <FaWhatsapp className="h-7 w-7" aria-hidden />
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="text-lg text-sand">Atendimento pelo WhatsApp</p>
                  <p className="text-sm text-sand-muted">Sua mensagem chega direto ao Flávio.</p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="contato-nome" className={fieldLabel}>
                    Seu nome
                  </label>
                  <input
                    id="contato-nome"
                    type="text"
                    required
                    autoComplete="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="contato-interesse" className={fieldLabel}>
                    Interesse
                  </label>
                  <div className="relative">
                    <select
                      id="contato-interesse"
                      value={interesse}
                      onChange={(e) => setInteresse(e.target.value)}
                      className={`${field} cursor-pointer appearance-none pr-11 [color-scheme:dark]`}
                    >
                      {INTERESSES.map((t) => (
                        <option key={t} value={t} className="bg-deep-2 text-sand">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-sand-muted"
                      aria-hidden
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contato-mensagem" className={fieldLabel}>
                    Mensagem <span className="font-normal text-sand-muted">(opcional)</span>
                  </label>
                  <textarea
                    id="contato-mensagem"
                    rows={4}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Região, tamanho, faixa de investimento..."
                    className={`${field} resize-none`}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="mt-7 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-whatsapp px-6 py-4 text-base font-semibold text-deep transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden />
                Enviar pelo WhatsApp
              </motion.button>
              <p className="mt-3 text-center text-xs text-sand-muted">Abre o WhatsApp com a mensagem pronta para enviar.</p>
            </form>
          </div>

          {/* Direct contacts + map */}
          <div className="min-w-0">
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className={iconBox}>
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className={itemLabel}>Telefone</p>
                  <a href={`tel:+${CONTATO.whatsapp}`} className={linkCls}>
                    {CONTATO.telefone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className={iconBox}>
                  <FaWhatsapp className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className={itemLabel}>WhatsApp</p>
                  <a href={waLink(WA_PADRAO)} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {CONTATO.telefone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className={iconBox}>
                  <FaInstagram className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className={itemLabel}>Instagram</p>
                  <a href={CONTATO.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {CONTATO.instagram}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className={iconBox}>
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className={itemLabel}>Escritório</p>
                  <address className="mt-0.5 not-italic text-sand">
                    {CONTATO.endereco}, {CONTATO.bairro}, {CONTATO.cidadeUf}, CEP {CONTATO.cep}
                  </address>
                </div>
              </li>
            </ul>

            <div className="relative mt-8 h-72 overflow-hidden rounded-2xl border border-deep-line bg-deep-2 sm:h-80">
              <iframe
                src={MAP_SRC}
                loading="lazy"
                title={`Mapa: ${EMPRESA.nome}, ${CONTATO.endereco}, ${CONTATO.cidadeUf}`}
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border border-deep-line px-5 py-2.5 text-sm font-medium text-sand transition-colors hover:border-accent hover:text-accent-hover"
            >
              Como chegar
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
