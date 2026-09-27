import { LINKS } from '../content'

const NAV = [
  { label: 'Para quem é', href: '#para-quem' },
  { label: 'O curso', href: '#curso' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Investimento', href: '#oferta' },
  { label: 'Dúvidas', href: '#faq' },
  { label: 'Lista de espera', href: '#lista' },
]

export default function Footer() {
  return (
    <footer className="bg-deep text-cream py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#" className="inline-flex flex-col leading-[1.1]">
              <span className="font-display text-3xl">Novo Ciclo</span>
              <span className="mt-1 text-xs text-cream/60">com Talita Lopes</span>
            </a>
            <p className="mt-4 text-sm text-cream/70">
              Profissional de Educação Física · CREF 019973-G/PR
              {/* TODO: PROOF NEEDED, CREF não verificado */}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/70 transition-colors hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Talita Lopes. Todos os direitos reservados.</p>
          {/* TODO: PROOF NEEDED, páginas legais não existem */}
          <div className="flex gap-6">
            <a href={LINKS.privacidade} className="transition-colors hover:text-cream">
              Política de Privacidade
            </a>
            <a href={LINKS.termos} className="transition-colors hover:text-cream">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
