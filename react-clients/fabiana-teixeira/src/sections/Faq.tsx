import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Qual a diferença entre o treino presencial e o online?',
    answer:
      'No presencial, a gente treina junto em academia aqui em Londrina, com acompanhamento direto de cada movimento. No online, o acompanhamento é à distância: você recebe orientação personalizada para treinar no seu ritmo, onde for mais fácil pra sua rotina. Os dois seguem o mesmo cuidado, a diferença é só a forma de acompanhar.',
  },
  {
    question: 'Sou iniciante e nunca treinei. Posso começar mesmo assim?',
    answer:
      'Pode, e é exatamente para isso que estou aqui. Todo mundo começa de algum lugar, e o treino é montado no seu ponto de partida, sem comparação com ninguém. Você não precisa chegar sabendo nada, só com vontade de começar.',
  },
  {
    question: 'Como funciona para eu começar a treinar com você?',
    answer:
      'É simples: você me chama no WhatsApp, conversamos sobre seu objetivo e sua rotina, e decidimos junto se o melhor caminho é presencial ou online. A partir daí já organizamos os primeiros passos do seu treino.',
  },
  {
    question: 'Em quanto tempo vejo resultado no emagrecimento?',
    answer:
      'Isso varia de pessoa para pessoa, depende do ponto de partida, da rotina e da consistência no treino. Não prometo prazo fechado, mas posso te dizer que resultado vem com constância, e é isso que a gente constrói junto, um treino de cada vez.',
  },
  {
    question: 'No acompanhamento online eu recebo um plano de treino?',
    // UNKNOWN: exact online delivery format (app, planilha, frequência de contato) not
    // confirmed by client-brief.md, kept intentionally generic instead of inventing one.
    answer:
      'Sim, o acompanhamento online é personalizado para o seu objetivo e sua rotina. Qualquer dúvida sobre como funciona na prática, me chama no WhatsApp que explico certinho.',
  },
  {
    question: 'Qual o valor da consultoria?',
    // PROOF NEEDED: pricing not provided by client-brief.md, never fabricate a number here.
    answer:
      'O investimento depende do formato escolhido (presencial ou online) e do seu objetivo. Fale comigo pelo WhatsApp para eu te passar os valores certinhos.',
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-sans text-base font-semibold text-text sm:text-lg">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'border-accent bg-accent text-accent-fg'
              : 'border-border text-text-muted'
          }`}
        >
          <Plus size={16} strokeWidth={2.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduceMotion ? 0 : 0.35, ease: 'easeInOut' },
              opacity: { duration: reduceMotion ? 0 : 0.25, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 font-sans text-sm leading-relaxed text-text-muted sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-white/5 bg-bg-alt py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
            Perguntas frequentes
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-wide text-text sm:text-5xl">
            Ainda com dúvidas?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-base text-text-muted">
            Separei as perguntas que mais recebo de quem está pensando em
            começar. Se a sua não estiver aqui, é só me chamar.
          </p>
        </div>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>

        <p className="mt-10 text-center font-sans text-sm text-text-muted">
          Não achou sua pergunta?{' '}
          <a
            href="https://api.whatsapp.com/send?phone=5543991167030&text=Ol%C3%A1%2C%20Fabiana!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20treinos."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-4"
          >
            Chame no WhatsApp
          </a>
          .
        </p>
      </div>

      {/* Diagonal cut into Contato (bg), mirrored from Sobre's divider so
          the page reads as a gentle zigzag instead of flat stacked blocks. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] block h-12 w-full sm:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 1440,56 0,56" className="fill-bg" />
        <line x1="0" y1="0" x2="1440" y2="56" className="stroke-accent/60" strokeWidth={2} />
      </svg>
    </section>
  );
}
