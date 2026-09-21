import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, MapPin, Clock, Phone, Star } from 'lucide-react';

import matrizPhoto from '../assets/images/storefront-matriz.jpg';
import bosquePhoto from '../assets/images/storefront-bosque.jpg';
import fariaLimaPhoto from '../assets/images/storefront-faria-lima.jpg';
import sanFernandoPhoto from '../assets/images/storefront-04-san-fernando-457.jpg';

type Unidade = {
  nome: string;
  endereco: string;
  horario: string;
  telefone: string;
  foto: string;
  nota: number;
  avaliacoes: number;
};

const unidades: Unidade[] = [
  {
    nome: 'Matriz',
    endereco: 'Rua Pará, 1682, sala 6',
    horario: 'Seg-Sex 09:00-20:00 · Sáb 09:00-17:00',
    telefone: '(43) 3324-6933',
    foto: matrizPhoto,
    nota: 4.9,
    avaliacoes: 237,
  },
  {
    nome: 'Bosque',
    endereco: 'Rua Pará, 939',
    horario: 'Seg-Sex 09:00-20:00 · Sáb 09:00-17:00',
    telefone: '(43) 3338-8890',
    foto: bosquePhoto,
    nota: 4.9,
    avaliacoes: 50,
  },
  {
    nome: 'Faria Lima',
    endereco: 'R. Pref. Faria Lima, 1111, sala 03',
    horario: 'Seg-Sex 09:00-20:00 · Sáb 09:00-18:00',
    telefone: '(43) 3347-3052',
    foto: fariaLimaPhoto,
    nota: 5.0,
    avaliacoes: 173,
  },
  {
    nome: 'San Fernando',
    endereco: 'R. Eurípedes Barsanulfo, 457',
    horario: 'Ter-Sex 09:00-20:00 · Sáb 09:00-18:00',
    telefone: '(43) 98866-1533',
    foto: sanFernandoPhoto,
    nota: 5.0,
    avaliacoes: 9,
  },
];

function telHref(telefone: string) {
  return `tel:+55${telefone.replace(/\D/g, '')}`;
}

export default function Unidades() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="unidades" className="border-t border-white/5 bg-bg px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent-2">
            Onde estamos
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-wide text-fg sm:text-5xl">
            Nossas unidades em Londrina
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
            4 pontos pela cidade. Toque em uma unidade para ver endereço, horário e telefone.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {unidades.map((unidade, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={unidade.nome}
                className="overflow-hidden rounded-card border border-white/10 bg-bg-panel"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="block w-full text-left"
                >
                  <div className="relative h-48 w-full overflow-hidden sm:h-56">
                    <img
                      src={unidade.foto}
                      alt={`Fachada da unidade ${unidade.nome}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-panel via-bg-panel/10 to-transparent" />
                  </div>

                  <div className="flex items-center gap-3 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-display text-xl uppercase tracking-wide text-fg">
                          {unidade.nome}
                        </p>
                        <span className="flex items-center gap-1 text-xs font-medium text-fg-muted">
                          <Star className="h-3.5 w-3.5 text-accent-2" fill="currentColor" stroke="none" aria-hidden="true" />
                          {unidade.nota.toFixed(1).replace('.', ',')} ({unidade.avaliacoes})
                        </span>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-fg-muted">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {unidade.endereco}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeInOut' }}
                      className="shrink-0 text-accent-2"
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 text-sm">
                        <p className="flex items-center gap-2 text-fg-muted">
                          <Clock className="h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
                          {unidade.horario}
                        </p>
                        <a
                          href={telHref(unidade.telefone)}
                          className="flex w-fit items-center gap-2 font-display tracking-wide text-accent-2 transition hover:text-accent"
                        >
                          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {unidade.telefone}
                        </a>
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
