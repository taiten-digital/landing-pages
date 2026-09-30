import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaTractor,
  FaHouse,
  FaSailboat,
  FaPlane,
  FaScrewdriverWrench,
} from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa6';
import { BENS, waLink } from '../content';

// Literal icons from react-icons/fa6 (Font Awesome 6 Free, installed dependency).
const ICONES: Record<string, IconType> = {
  carro: FaCar,
  moto: FaMotorcycle,
  caminhao: FaTruck,
  trator: FaTractor,
  imovel: FaHouse,
  barco: FaSailboat,
  viagem: FaPlane,
  servicos: FaScrewdriverWrench,
};

// Honest copy only: no prices, prazos or taxas. Serviços and Viagem offers are unconfirmed.
const OFERTA_ABERTA = 'Fale com a gente para ver como funciona';
const TEXTOS: Record<string, { titulo: string; texto: string; pedido: string }> = {
  carro: { titulo: 'Consórcio de carro', texto: 'Planeje a compra do seu carro em parcelas mensais. Conte o que você procura e a gente indica o plano.', pedido: 'um carro' },
  moto: { titulo: 'Consórcio de moto', texto: 'Para trabalhar ou pilotar por prazer, organize a compra da sua moto com um plano que cabe no orçamento.', pedido: 'uma moto' },
  caminhao: { titulo: 'Consórcio de caminhão', texto: 'Crédito planejado para quem precisa de um caminhão para o negócio crescer.', pedido: 'um caminhão' },
  trator: { titulo: 'Consórcio de trator', texto: 'Planejamento para quem quer equipar a lavoura ou a propriedade com um trator.', pedido: 'um trator' },
  imovel: { titulo: 'Consórcio de imóvel', texto: 'Casa, apartamento ou terreno: um caminho planejado para conquistar o seu imóvel.', pedido: 'um imóvel' },
  barco: { titulo: 'Consórcio de barco', texto: 'Planeje a compra do seu barco sem pressa e com parcelas organizadas.', pedido: 'um barco' },
  viagem: { titulo: 'Viagem dos sonhos', texto: OFERTA_ABERTA + '. Conte para onde você quer ir e veja as opções disponíveis.', pedido: 'uma viagem' },
  servicos: { titulo: 'Serviços', texto: OFERTA_ABERTA + '. Conte qual serviço você quer realizar e veja as opções disponíveis.', pedido: 'serviços' },
};

export default function Sonhos() {
  const [ativo, setAtivo] = useState(BENS[0].id);
  const reduce = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const bem = BENS.find((b) => b.id === ativo) ?? BENS[0];
  const Icone = ICONES[bem.id];
  const t = TEXTOS[bem.id];
  const nomeMin = bem.nome.toLowerCase();

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = BENS.findIndex((b) => b.id === ativo);
    let n = i;
    if (e.key === 'ArrowRight') n = (i + 1) % BENS.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + BENS.length) % BENS.length;
    else return;
    e.preventDefault();
    setAtivo(BENS[n].id);
    tabRefs.current[BENS[n].id]?.focus();
  };

  return (
    <section id="sonhos" className="scroll-mt-[var(--nav-height,4.5rem)] bg-surface-2 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-text sm:text-5xl">
            Qual é o seu <span className="text-accent">sonho</span>?
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            Escolha o que você quer conquistar e fale com a gente pelo WhatsApp.
          </p>
        </div>

        <div className="mt-8 min-w-0">
          <div
            role="tablist"
            aria-label="Escolha o seu sonho"
            onKeyDown={onKey}
            className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {BENS.map((b) => {
              const I = ICONES[b.id];
              const sel = b.id === ativo;
              return (
                <button
                  key={b.id}
                  ref={(el) => {
                    tabRefs.current[b.id] = el;
                  }}
                  role="tab"
                  id={`tab-${b.id}`}
                  aria-selected={sel}
                  aria-controls="painel-sonho"
                  tabIndex={sel ? 0 : -1}
                  type="button"
                  onClick={() => setAtivo(b.id)}
                  className={`relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base ${
                    sel ? 'border-navy text-on-deep' : 'border-line bg-surface text-text hover:border-navy'
                  }`}
                >
                  {sel && (
                    <motion.span
                      layoutId="sonho-pill"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <I className="size-5" aria-hidden />
                    {b.nome}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="painel-sonho"
            aria-labelledby={`tab-${bem.id}`}
            className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={bem.id}
                initial={reduce ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-[auto_1fr] md:gap-10"
              >
                <motion.div
                  initial={reduce ? false : { scale: 0.6, rotate: -12, x: -30 }}
                  animate={{ scale: 1, rotate: 0, x: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  className="flex aspect-square w-full max-w-[14rem] items-center justify-center justify-self-center rounded-3xl bg-navy text-on-deep md:w-56 md:max-w-none"
                >
                  <Icone className="size-24 sm:size-28" aria-hidden />
                </motion.div>

                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-bold leading-[1.1] text-text sm:text-4xl">{t.titulo}</h3>
                  <p className="mt-3 max-w-xl text-base text-text-muted sm:text-lg">{t.texto}</p>
                  <a
                    href={waLink(`Olá! Vim pelo site da ConsorciCred e quero um plano para ${t.pedido}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <FaWhatsapp className="size-5" aria-hidden />
                    Quero o meu plano de {nomeMin}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
