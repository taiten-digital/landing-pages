// Pure financing math for the Simulador section. Estimate only: ignores TR, insurance (MIP/DFI)
// and admin fees, so the real installment will be somewhat higher. The UI must say so.

// PROOF NEEDED: reference rate not yet confirmed by Conquista. 11,19% a.a. + TR is the public
// CAIXA SBPE starting rate reported for 2026 (myside.com.br, istoedinheiro.com.br).
export const TAXA_ANUAL_REFERENCIA = 0.1119;
export const COTA_MAXIMA = 0.8; // "financiar até 80% do valor do imóvel" (client's own post)
export const PRAZO_MAXIMO_MESES = 420; // 35 anos
export const COMPROMETIMENTO_RENDA = 0.3; // installment up to 30% of household income

export type Resultado = {
  financiado: number;
  entradaMinima: number;
  entradaInsuficiente: boolean;
  sacPrimeira: number;
  sacUltima: number;
  price: number;
  rendaMinimaSac: number;
  rendaMinimaPrice: number;
};

export function taxaMensal(anual = TAXA_ANUAL_REFERENCIA) {
  return Math.pow(1 + anual, 1 / 12) - 1;
}

export function simular(valorImovel: number, entrada: number, prazoMeses: number, anual = TAXA_ANUAL_REFERENCIA): Resultado {
  const entradaMinima = Math.round(valorImovel * (1 - COTA_MAXIMA)); // round: 0.2 * 300000 is 59999.99...
  const financiado = Math.max(0, valorImovel - Math.max(entrada, entradaMinima));
  const n = Math.min(Math.max(1, Math.round(prazoMeses)), PRAZO_MAXIMO_MESES);
  const i = taxaMensal(anual);
  const amort = financiado / n;
  const sacPrimeira = amort + financiado * i;
  const sacUltima = amort + amort * i;
  const price = financiado === 0 ? 0 : (financiado * i) / (1 - Math.pow(1 + i, -n));
  return {
    financiado,
    entradaMinima,
    entradaInsuficiente: entrada < entradaMinima,
    sacPrimeira,
    sacUltima,
    price,
    rendaMinimaSac: sacPrimeira / COMPROMETIMENTO_RENDA,
    rendaMinimaPrice: price / COMPROMETIMENTO_RENDA,
  };
}

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
