import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { waLink } from '../content';

const HEDGE = 'Varia conforme o plano e a administradora, consulte.';

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Consórcio tem juros?',
    a: `Não há juros como no financiamento, mas existem taxa de administração e outras taxas conforme o plano. ${HEDGE}`,
  },
  {
    q: 'Como sou contemplado?',
    a: 'Por sorteio ou por lance, em assembleias mensais. Não existe data garantida de contemplação, por isso cada grupo tem o seu ritmo.',
  },
  {
    q: 'Posso dar lance?',
    a: `Sim, o lance é uma forma de antecipar a contemplação. As regras dependem do grupo. ${HEDGE}`,
  },
  {
    q: 'Qual a diferença entre consórcio e financiamento?',
    a: 'No consórcio você entra em um grupo e planeja a compra, sem juros como no financiamento. No financiamento o crédito é liberado após a aprovação, para quem precisa do bem agora. Cada caminho serve a um momento, e a gente ajuda a comparar.',
  },
  {
    q: 'O que é carta contemplada?',
    a: 'É uma carta de crédito que já foi contemplada, para quem não quer esperar o sorteio. As condições variam conforme a carta disponível, consulte.',
  },
  {
    q: 'Posso consorciar outros bens além de carro e casa?',
    a: 'Sim. A gente trabalha também com moto, caminhão, trator, barco, viagem e serviços. Confirme a disponibilidade pelo WhatsApp.',
  },
  {
    q: 'Como faço para simular?',
    a: 'É só falar com a gente pelo WhatsApp. Conte o que você quer conquistar e a gente apresenta as opções.',
  },
];

const SIM_LINK = waLink('Olá! Vim pelo site da ConsorciCred e quero fazer uma simulação.');

function TypingDots({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1.5" aria-label="Digitando">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block size-2 rounded-full bg-text-muted"
          animate={reduce ? {} : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function AnswerBubble({ id, text, reduce }: { id: string; text: string; reduce: boolean | null }) {
  const [typing, setTyping] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setTyping(false), 700);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <motion.div
      id={id}
      role="region"
      initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25 }}
      style={{ transformOrigin: 'left top' }}
      className="mr-auto min-w-0 max-w-[92%] rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3 text-[0.95rem] leading-relaxed text-text shadow-sm sm:max-w-[80%]"
    >
      {typing ? (
        <TypingDots reduce={reduce} />
      ) : (
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function Duvidas() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="duvidas" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto w-full max-w-3xl min-w-0 px-5 sm:px-6">
        <h2 className="font-display text-3xl leading-tight text-text sm:text-5xl">
          Dúvidas que <span className="text-accent">todo mundo</span> tem
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">
          Toque em uma pergunta e a gente responde.
        </p>

        <div className="mt-10 flex min-w-0 flex-col gap-3">
          {FAQ.map((item, i) => {
            const isOpen = open.has(i);
            const panelId = `duvida-${i}`;
            return (
              <div key={item.q} className="flex min-w-0 flex-col gap-2">
                <motion.button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  whileHover={reduce ? undefined : { scale: 1.015 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  style={{ transformOrigin: 'right center' }}
                  className="ml-auto flex min-w-0 max-w-[92%] cursor-pointer items-center gap-3 rounded-2xl rounded-tr-sm bg-navy px-4 py-3 text-left font-medium text-on-deep shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:max-w-[80%]"
                >
                  <span className="min-w-0 flex-1">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-lg leading-none text-on-deep-muted transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </motion.button>
                <AnimatePresence initial>
                  {isOpen && <AnswerBubble key="a" id={panelId} text={item.a} reduce={reduce} />}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href={SIM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-whatsapp px-7 py-3.5 font-semibold text-deep shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Simular pelo WhatsApp
          </a>
          <span className="text-sm text-text-muted">Sem compromisso. Resposta direto no seu celular.</span>
        </div>
      </div>
    </section>
  );
}
