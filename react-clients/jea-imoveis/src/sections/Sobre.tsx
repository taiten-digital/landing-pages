import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { CONTATO, CREDENCIAIS, EMPRESA, NOTA_CREDENCIAIS, WA_PADRAO, waLink } from '../content';
// Client-supplied: circular crop of the @jeaimoveisldn Instagram profile photo (real alpha, 800x800).
// Low-res source: never display wider than ~420px css. TODO: confirm with the client that it is José Eduardo.
// ASSET NEEDED: a landscape or half-body photo of José Eduardo (at work or with a client) to replace or sit beside this circle.
import retrato from '../assets/images/jose-eduardo-retrato.png';

// Per-card float parameters: different duration, delay and amplitude so the two drift out of phase.
const FLOAT = [
  { duration: 5.2, delay: 0, amp: 9 },
  { duration: 6.4, delay: 1.1, amp: 7 },
];

export default function Sobre() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="relative overflow-hidden bg-deep py-16 text-sand sm:py-20">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        {/* Portrait: photo first on mobile, left column from lg */}
        <div className="flex justify-center py-6 lg:py-0">
          <div className="relative aspect-square w-[min(68vw,340px)] sm:w-[min(60vw,380px)] lg:w-[min(36vw,420px)]">
            {/* Breathing halo: blurred radial light, fully transparent well before its edge */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[38%] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 50%, transparent), transparent 70%)',
              }}
              animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.92, 1.06, 0.92] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Slowly rotating dashed ring, a bit larger than the photo */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[9%] rounded-full border border-dashed border-accent/70"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />

            {/* Thin solid accent ring hugging the photo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1.5 rounded-full border border-accent"
            />

            <img
              src={retrato}
              alt="José Eduardo Almeida"
              width={800}
              height={800}
              className="relative h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="relative">
          <h2 className="font-display text-4xl font-medium leading-[1.12] text-sand sm:text-5xl">
            Quem <span className="text-accent">cuida</span> do seu imóvel
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-sand-muted">
            {EMPRESA.responsavel}, à frente da {EMPRESA.nome} em {EMPRESA.cidade}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-sand-muted sm:text-lg">
            <p>
              Falar direto com quem está à frente da JEA muda a conversa. Você explica o que procura, o que
              preocupa e o que precisa ficar claro, e quem responde é o próprio José Eduardo Almeida.
            </p>
            <p>
              Sem script e sem pressa. Você pergunta o que quiser, no seu ritmo, e o papo segue o que importa
              para a sua decisão, seja comprar, vender ou investir.
            </p>
            <p>
              O primeiro passo é uma mensagem no WhatsApp. Depois, a conversa continua do jeito que for mais
              confortável para você.
            </p>
          </div>

          {/* Credential cards with idle float */}
          <div className="mt-8 grid grid-cols-2 items-start gap-4">
            {CREDENCIAIS.map((c, i) => {
              const f = FLOAT[i % FLOAT.length];
              return (
                <motion.div
                  key={c.sigla}
                  className="rounded-2xl border border-deep-line bg-deep-2 px-5 py-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]"
                  animate={reduceMotion ? undefined : { y: [0, -f.amp, 0] }}
                  transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="font-display text-3xl font-medium leading-[1.12] text-sand sm:text-4xl">{c.sigla}</p>
                  <p className="mt-1 text-sm font-semibold tracking-wide text-sand-muted sm:text-base">{c.numero}</p>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-sand-muted">{NOTA_CREDENCIAIS}</p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <motion.a
              href={waLink(WA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-fg transition-colors hover:bg-accent-hover sm:text-base"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Falar no WhatsApp
            </motion.a>
            <motion.a
              href={CONTATO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-deep-line px-6 py-3.5 text-sm font-semibold text-sand transition-colors hover:border-sand-muted sm:text-base"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <FaInstagram className="h-5 w-5 text-sand-muted" aria-hidden="true" />
              {CONTATO.instagram}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
