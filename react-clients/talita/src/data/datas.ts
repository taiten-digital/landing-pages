import { dataLancamento, etapas, inicioProjeto } from './projeto';

const DIA = 24 * 60 * 60 * 1000;

function meiaNoite(iso: string) {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d).getTime();
}

export function diasParaLancamento(hoje = new Date()) {
  const h = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime();
  return Math.max(0, Math.round((meiaNoite(dataLancamento) - h) / DIA));
}

// Progresso pelas etapas: concluída vale 1, em andamento vale meia.
export function progressoEtapas() {
  const pontos = etapas.reduce((t, e) => t + (e.status === 'concluida' ? 1 : e.status === 'andamento' ? 0.5 : 0), 0);
  return Math.round((pontos / etapas.length) * 100);
}

export function diasDesdeInicio(hoje = new Date()) {
  const h = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime();
  return Math.max(0, Math.round((h - meiaNoite(inicioProjeto)) / DIA));
}

export function etapaAtual() {
  return etapas.find((e) => e.status === 'andamento') ?? etapas.find((e) => e.status === 'proxima') ?? etapas[etapas.length - 1];
}
