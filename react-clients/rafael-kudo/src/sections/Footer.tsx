import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import logoRafaelKudo from '../assets/images/logo-rafael-kudo.png';

const quickLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Método', href: '#metodo' },
  { label: 'Números', href: '#numeros' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '#contato' },
];

const WHATSAPP_URL = 'https://wa.me/5543991720681';
const WHATSAPP_LABEL = '(43) 99172-0681';
const INSTAGRAM_URL = 'https://www.instagram.com/eurafakudo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-fg">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <img
              src={logoRafaelKudo}
              alt="Rafael Kudo, Alta Performance"
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              Desenvolvimento de alta performance física, mental e nutricional.
            </p>
          </div>

          <nav aria-label="Links rápidos">
            <h3 className="font-display text-sm tracking-wide text-text-muted uppercase">
              Navegação
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-fg transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm tracking-wide text-text-muted uppercase">
              Contato
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-fg transition-colors hover:text-accent"
                >
                  <FaWhatsapp className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                  {WHATSAPP_LABEL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-fg transition-colors hover:text-accent"
                >
                  <FaInstagram className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                  @eurafakudo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-text-muted">
            © {year} Rafael Kudo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
