import { useEffect, useState, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { BadgeCheck, HardHat, KeyRound, TriangleAlert } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { DESTAQUES, waLink } from '../content';
import {
  brl,
  simular,
  COMPROMETIMENTO_RENDA,
  COTA_MAXIMA,
  PRAZO_MAXIMO_MESES,
  TAXA_ANUAL_REFERENCIA,
} from '../simulador';

const VALOR_MIN = 100_000;
const VALOR_MAX = 2_250_000; // teto do SFH publicado pelo cliente (DESTAQUES)
const PRAZO_MIN_ANOS = 5;
const PRAZO_MAX_ANOS = PRAZO_MAXIMO_MESES / 12;

const pct = (v: number, casas = 0) =>
  `${(v * 100).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas })}%`;
// TODO: PROOF NEEDED, taxa de referência ainda não confirmada pela Conquista (ver simulador.ts).
const TAXA_TEXTO = `${pct(TAXA_ANUAL_REFERENCIA, 2)} a.a. + TR`;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const soDigitos = (s: string) => Number(s.replace(/\D/g, '')) || 0;
const entradaMinimaDe = (valor: number) => simular(valor, 0, 1).entradaMinima;

// "Nice" axis max so both bars move with every input, not just the prazo.
function eixoMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  return ([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * p >= v * 1.05) ?? 15) * p;
}

const OBJETIVOS = [
  { id: 'comprar', label: 'Comprar imóvel', Icon: KeyRound },
  { id: 'construir', label: 'Construir', Icon: HardHat },
] as const;
type Objetivo = (typeof OBJETIVOS)[number]['id'];

// Tweens a BRL figure to its new value on every change (jumps under reduced motion).
function Money({ value, reduce }: { value: number; reduce: boolean }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => brl(v));
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [mv, value, reduce]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

function Bar({
  label,
  value,
  max,
  color,
  index,
  reduce,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  index: number;
  reduce: boolean;
}) {
  return (
    <div>
      <p className="font-display text-sm font-bold">{label}</p>
      <div className="mt-2 h-4 overflow-hidden rounded-full bg-text/10">
        <motion.div
          className={`relative h-full overflow-hidden rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 17 }}
        >
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-on-dark/50 to-transparent"
              animate={{ x: ['-100%', '300%'] }}
              transition={{
                duration: 1.8,
                delay: index * 0.9,
                repeat: Infinity,
                repeatDelay: 2.6 + index * 0.7,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function CurrencyField({
  id,
  label,
  aside,
  value,
  min,
  max,
  step,
  onType,
  onCommit,
  children,
}: {
  id: string;
  label: string;
  aside?: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onType: (n: number) => void;
  onCommit: (n: number) => void;
  children?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-on-dark-muted">
          {label}
        </label>
        {aside}
      </div>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={brl(value)}
        onChange={(e) => onType(soDigitos(e.target.value))}
        onBlur={() => onCommit(value)}
        className="mt-2 w-full rounded-2xl bg-deep px-4 py-3 font-display text-xl font-bold tabular-nums text-on-dark ring-1 ring-on-dark/10 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-on-dark/70"
      />
      <input
        type="range"
        aria-label={`${label}, controle deslizante`}
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(e) => onCommit(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer accent-on-dark"
      />
      <div className="mt-1 flex justify-between text-xs text-on-dark-muted">
        <span>{brl(min)}</span>
        <span>{brl(max)}</span>
      </div>
      {children}
    </div>
  );
}

export default function Simulador() {
  const reduce = !!useReducedMotion();
  const [objetivo, setObjetivo] = useState<Objetivo>('comprar');
  const [valor, setValor] = useState(300_000);
  const [entrada, setEntrada] = useState(60_000);
  const [anos, setAnos] = useState(30);

  // While the user is mid-typing the value can sit outside the range; the math never does.
  const valorCalc = clamp(valor, VALOR_MIN, VALOR_MAX);
  const r = simular(valorCalc, entrada, anos * 12);
  const entradaEfetiva = valorCalc - r.financiado;
  const eixo = eixoMax(r.sacPrimeira);

  const commitValor = (n: number) => {
    const v = clamp(n, VALOR_MIN, VALOR_MAX);
    setValor(v);
    setEntrada((e) => clamp(e, entradaMinimaDe(v), v));
  };

  const objetivoLabel = OBJETIVOS.find((o) => o.id === objetivo)!.label;
  const mensagem = [
    'Olá! Fiz a simulação no site e quero a simulação oficial.',
    `Objetivo: ${objetivoLabel}`,
    `Valor do imóvel: ${brl(valorCalc)}`,
    `Entrada: ${brl(entradaEfetiva)}`,
    `Prazo: ${anos} anos (${anos * 12} meses)`,
    `Parcela estimada PRICE: ${brl(r.price)}`,
    `Parcela estimada SAC: ${brl(r.sacPrimeira)} na 1ª, até ${brl(r.sacUltima)} na última`,
  ].join('\n');

  return (
    <section id="simulador" className="relative overflow-hidden bg-brand py-16 text-on-dark sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-48 size-[36rem] rounded-full bg-radial from-on-dark/15 to-transparent to-70% blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-on-dark sm:text-4xl lg:text-5xl">
            Simule seu <em className="italic text-accent">financiamento</em>
          </h2>
          <p className="mt-4 text-lg text-on-dark-muted">
            Descubra quanto fica a parcela do seu imóvel. Depois, receba a simulação oficial no WhatsApp.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {DESTAQUES.map((d) => (
              <li
                key={d}
                className="inline-flex items-start gap-2 rounded-2xl bg-on-dark/10 px-4 py-2 text-sm font-semibold ring-1 ring-on-dark/15"
              >
                <BadgeCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-on-dark-muted" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Formulário */}
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="min-w-0 space-y-7 rounded-3xl bg-deep-2 p-5 ring-1 ring-on-dark/10 sm:p-8"
          >
            <fieldset>
              <legend className="text-sm font-semibold text-on-dark-muted">Objetivo</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {OBJETIVOS.map(({ id, label, Icon }) => {
                  const ativo = objetivo === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={ativo}
                      onClick={() => setObjetivo(id)}
                      className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-3 py-3 font-display text-sm font-bold transition-colors sm:flex-row sm:justify-center sm:gap-2 ${
                        ativo
                          ? 'bg-on-dark text-text'
                          : 'bg-on-dark/5 text-on-dark ring-1 ring-on-dark/15 hover:bg-on-dark/10'
                      }`}
                    >
                      <Icon aria-hidden className={`size-5 shrink-0 ${ativo ? 'text-brand' : 'text-on-dark-muted'}`} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <CurrencyField
              id="sim-valor"
              label="Valor do imóvel"
              value={valor}
              min={VALOR_MIN}
              max={VALOR_MAX}
              step={10_000}
              onType={(n) => setValor(Math.min(n, VALOR_MAX))}
              onCommit={commitValor}
            />

            <CurrencyField
              id="sim-entrada"
              label="Entrada"
              aside={
                <span className="text-sm font-semibold tabular-nums text-on-dark-muted">
                  {pct(entradaEfetiva / valorCalc)} do imóvel
                </span>
              }
              value={entrada}
              min={r.entradaMinima}
              max={valorCalc}
              step={1_000}
              onType={(n) => setEntrada(Math.min(n, valorCalc))}
              onCommit={(n) => setEntrada(clamp(n, 0, valorCalc))}
            >
              <div role="status">
                {r.entradaInsuficiente && (
                  <p className="mt-3 flex items-start gap-2 rounded-2xl bg-on-dark/10 px-4 py-3 text-sm">
                    <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-on-dark-muted" />
                    <span>
                      A CAIXA financia até {pct(COTA_MAXIMA)}: a entrada mínima para esse imóvel é{' '}
                      <strong className="whitespace-nowrap">{brl(r.entradaMinima)}</strong>. A estimativa já usa esse
                      valor.
                    </span>
                  </p>
                )}
              </div>
            </CurrencyField>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="sim-prazo" className="text-sm font-semibold text-on-dark-muted">
                  Prazo
                </label>
                <span className="font-display text-xl font-bold tabular-nums">{anos} anos</span>
              </div>
              <input
                id="sim-prazo"
                type="range"
                min={PRAZO_MIN_ANOS}
                max={PRAZO_MAX_ANOS}
                step={1}
                value={anos}
                aria-valuetext={`${anos} anos, ${anos * 12} parcelas`}
                onChange={(e) => setAnos(clamp(Number(e.target.value), PRAZO_MIN_ANOS, PRAZO_MAX_ANOS))}
                className="mt-4 h-2 w-full cursor-pointer accent-on-dark"
              />
              <div className="mt-1 flex justify-between text-xs text-on-dark-muted">
                <span>{PRAZO_MIN_ANOS} anos</span>
                <span className="tabular-nums">{anos * 12} parcelas</span>
                <span>{PRAZO_MAX_ANOS} anos</span>
              </div>
            </div>
          </form>

          {/* Resultado */}
          <div className="min-w-0 rounded-3xl bg-surface p-5 text-text shadow-2xl shadow-deep/40 sm:p-8">
            <p className="sr-only" aria-live="polite">
              Parcela PRICE {brl(r.price)}. Primeira parcela SAC {brl(r.sacPrimeira)}.
            </p>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-text/10 pb-5">
              <p className="text-sm font-semibold text-text-muted">Valor financiado</p>
              <p className="font-display text-2xl font-extrabold">
                <Money value={r.financiado} reduce={reduce} />
              </p>
            </div>

            <div className="mt-5 grid items-start gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-text-muted">Tabela PRICE</p>
                <p className="mt-2 font-display text-3xl font-extrabold leading-[1.1]">
                  <Money value={r.price} reduce={reduce} />
                </p>
                <p className="mt-1 text-sm text-text-muted">Parcela fixa do início ao fim.</p>
              </div>
              <div className="min-w-0">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-text-muted">Tabela SAC</p>
                <p className="mt-2 font-display text-3xl font-extrabold leading-[1.1]">
                  <Money value={r.sacPrimeira} reduce={reduce} />
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  1ª parcela, caindo até{' '}
                  <strong className="whitespace-nowrap font-semibold text-text">
                    <Money value={r.sacUltima} reduce={reduce} />
                  </strong>{' '}
                  na última.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-bg p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-sm font-semibold">Primeira parcela lado a lado</p>
                <p className="text-sm text-text-muted">
                  SAC começa{' '}
                  <strong className="whitespace-nowrap font-semibold text-text">
                    <Money value={r.sacPrimeira - r.price} reduce={reduce} />
                  </strong>{' '}
                  acima
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <Bar label="PRICE" value={r.price} max={eixo} color="bg-accent" index={0} reduce={reduce} />
                <Bar label="SAC (1ª parcela)" value={r.sacPrimeira} max={eixo} color="bg-brand" index={1} reduce={reduce} />
              </div>
              <div className="mt-2 flex justify-between text-xs tabular-nums text-text-muted">
                <span>{brl(0)}</span>
                <span>{brl(eixo)}</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-text-muted">
              Renda familiar indicada: a partir de{' '}
              <strong className="whitespace-nowrap font-bold text-text">
                <Money value={r.rendaMinimaPrice} reduce={reduce} />
              </strong>{' '}
              na PRICE ou{' '}
              <strong className="whitespace-nowrap font-bold text-text">
                <Money value={r.rendaMinimaSac} reduce={reduce} />
              </strong>{' '}
              na SAC (parcela de até {pct(COMPROMETIMENTO_RENDA)} da renda).
            </p>

            <p className="mt-4 border-t border-text/10 pt-4 text-xs leading-relaxed text-text-muted">
              Estimativa com taxa de referência de {TAXA_TEXTO} (CAIXA SBPE). Não inclui TR, seguros obrigatórios e
              tarifas. Condições reais dependem da análise de crédito da CAIXA.
            </p>

            <motion.a
              href={waLink(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-center font-display text-base font-bold text-accent-fg shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              <FaWhatsapp aria-hidden className="size-5 shrink-0" />
              Quero a simulação oficial no WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
