import TaitenSignature from '../components/TaitenSignature';
import { atualizadoEm } from '../data/projeto';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <TaitenSignature tone="light" />
        <p className="font-mono text-xs leading-relaxed text-white/45">
          Página exclusiva do projeto Método C40 · Talita Lopes
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          Atualizada em {atualizadoEm}
        </p>
      </div>
    </footer>
  );
}
