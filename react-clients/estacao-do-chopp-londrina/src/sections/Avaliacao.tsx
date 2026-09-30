import { FaStar } from 'react-icons/fa6';

export default function Avaliacao() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface py-14 sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div className="flex gap-2" aria-label="5 estrelas">
          {Array.from({ length: 5 }, (_, i) => (
            <span className="fx-star text-accent" style={{ '--delay': `${i * 0.18}s` } as React.CSSProperties}>
              <FaStar className="h-9 w-9 sm:h-12 sm:w-12" aria-hidden />
            </span>
          ))}
        </div>
        <h2 className="font-display mt-5 text-5xl leading-[1.05] text-text sm:text-6xl">
          Nota 5 estrelas <span className="bg-gradient-to-r from-accent-2 to-accent bg-clip-text text-transparent">no Google</span>
        </h2>
        <p className="mt-3 max-w-md text-text-muted">Clientes que pedem chopp na Estação do Chopp avaliam a experiência com a nota máxima.</p>
      </div>
    </section>
  );
}
