import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Eyebrow from '../components/Eyebrow';
import { combinados, contato } from '../data/projeto';

export default function Combinados() {
  const reduce = useReducedMotion();
  return (
    <section id="combinados" className="grain relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(30,107,255,0.28), transparent 80%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Eyebrow>04 · Como vamos trabalhar</Eyebrow>
        <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] sm:text-5xl">Combinados para tudo andar no ritmo.</h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {combinados.map((c, i) => (
              <li key={c.titulo} className="border-t border-white/10 py-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{c.titulo}</h3>
                </div>
                <p className="mt-2 pl-8 leading-relaxed text-white/60">{c.texto}</p>
              </li>
            ))}
          </ul>

          <div className="relative self-start overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A4FD0] via-accent to-[#4A8BFF] p-8">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.4), transparent 80%)' }}
              animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: reduce ? 0 : Infinity, ease: 'easeInOut' }}
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/75">Fale com a gente</p>
              <p className="font-display mt-4 text-6xl font-semibold leading-none tracking-[-0.04em]">1 hora</p>
              <p className="mt-3 text-lg text-white/90">é o nosso tempo de resposta no grupo, em horário comercial.</p>
              <div className="mt-7 space-y-3 border-t border-white/30 pt-6">
                <a href={contato.whatsapp} target="_blank" rel="noreferrer" className="flex cursor-pointer items-center gap-3 font-mono text-sm hover:underline">
                  <FaWhatsapp className="h-4 w-4" aria-hidden /> {contato.telefone}
                </a>
                <a href={`mailto:${contato.email}`} className="flex cursor-pointer items-center gap-3 font-mono text-sm hover:underline">
                  <Mail className="h-4 w-4" aria-hidden /> {contato.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="font-display mt-16 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
          Vamos juntos levar o Método C40 a <span className="text-accent">muito mais mulheres.</span>
        </p>
      </div>
    </section>
  );
}
