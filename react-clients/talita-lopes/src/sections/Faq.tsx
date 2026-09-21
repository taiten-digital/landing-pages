import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type FaqItem = {
  q: string;
  a: string;
};

// Verbatim migration from clients/talita-lopes/src/FaqSection.astro — order,
// wording and punctuation preserved exactly, nothing paraphrased.
const faqs: FaqItem[] = [
  {
    q: 'A avaliação física é realmente gratuita?',
    a: 'Sim. Gratuita e sem compromisso. É o primeiro passo para a Talita entender seu histórico, suas limitações e seus objetivos antes de montar qualquer plano.',
  },
  {
    q: 'Preciso ter experiência prévia com treino?',
    a: 'Não. O treino parte do seu ponto de partida. Orientação para quem está começando ou retomando a atividade física, inclusive depois de um período parado.',
  },
  {
    q: 'Tenho dor nas costas / dor ciática. O treino é seguro para mim?',
    a: 'O acompanhamento é individualizado para respeitar suas dores e limitações. A avaliação inicial existe justamente para identificar isso antes de qualquer exercício ser prescrito. Se você tem uma condição diagnosticada, leve informações do seu médico ou fisioterapeuta para a conversa.',
  },
  {
    q: 'A consultoria online funciona tão bem quanto o presencial para quem tem 50+ anos?',
    // PROOF NEEDED (client-brief.md): esta resposta foi escrita pela
    // copywriter sem fonte direta da cliente e segue pendente do aval dela.
    // Migrada palavra por palavra, sem reescrever nem resolver a pendência.
    a: 'Depende do caso. No presencial, a Talita acompanha a execução dos exercícios ao vivo. Na consultoria online, o acompanhamento é à distância, por vídeo e mensagens. Para muitos alunos, as duas modalidades funcionam bem. Se você está começando agora ou tem uma condição de coluna mais delicada, o mais seguro é conversar direto com a Talita e decidir juntos qual formato faz mais sentido para o seu caso.',
  },
  {
    q: 'Onde acontecem os treinos presenciais?',
    a: 'Em domicílio, em condomínio ou em estúdio parceiro, conforme sua conveniência. Não há endereço fixo de estúdio.',
  },
  {
    q: 'Quanto custa?',
    a: 'O valor não é divulgado publicamente. É combinado direto com a Talita depois da avaliação, de acordo com o serviço escolhido.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-sage-alt px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-base text-muted">
            O que os alunos mais perguntam antes de marcar a primeira avaliação, as respostas
            dela, direto.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:mt-12">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex cursor-pointer items-center gap-3 self-end rounded-2xl rounded-br-sm bg-accent px-5 py-3 text-left shadow-sm transition hover:brightness-105"
                >
                  <span className="max-w-[85%] font-sans text-sm font-bold text-accent-fg sm:text-base">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeInOut' }}
                    className="shrink-0 text-accent-fg"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-2 pt-1">
                        {/* No real photo used as "her" avatar: no confirmed
                            photo of Talita is safe to present as "this is
                            literally her replying". A plain initial badge
                            says the same thing without that risk. Box-shadow
                            pulse colors below mirror the --color-accent
                            token (#2f9e52) at two opacities, not a new color. */}
                        <motion.span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm font-extrabold text-bg"
                          animate={
                            reduceMotion
                              ? {}
                              : {
                                  boxShadow: [
                                    '0 0 0 4px rgba(47,158,82,0.18)',
                                    '0 0 0 8px rgba(47,158,82,0.06)',
                                    '0 0 0 4px rgba(47,158,82,0.18)',
                                  ],
                                }
                          }
                          transition={{
                            duration: 2.8,
                            repeat: reduceMotion ? 0 : Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          T
                        </motion.span>
                        <p className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-bg px-5 py-3 text-sm leading-relaxed text-muted sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
