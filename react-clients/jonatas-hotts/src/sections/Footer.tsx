import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo.png';

const quickLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

const WHATSAPP_URL = 'https://wa.me/5543999813940';
const INSTAGRAM_URL = 'https://www.instagram.com/jhotts/';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-fg">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <img
              src={logo}
              alt="Jonatas Hotts Personal Trainer"
              className="h-16 w-16 rounded-xl object-cover"
            />
            <p className="max-w-xs text-sm text-primary-fg/70">
              Personal trainer em Londrina, PR. Atendimento presencial e
              consultoria online para emagrecimento e hipertrofia.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Links rápidos">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-fg/50">
              Links rápidos
            </span>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="inline-block text-sm text-primary-fg/80 transition-colors duration-200 hover:text-accent"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-fg/50">
              Redes
            </span>
            <div className="flex gap-3">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-fg/10 text-primary-fg transition-colors duration-200 hover:bg-accent hover:text-accent-fg"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaWhatsapp size={20} />
              </motion.a>
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-fg/10 text-primary-fg transition-colors duration-200 hover:bg-accent hover:text-accent-fg"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaInstagram size={20} />
              </motion.a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-fg/70 transition-colors duration-200 hover:text-accent"
            >
              (43) 99981-3940
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-fg/10 pt-6 text-center text-xs text-primary-fg/50">
          © {year} Jonatas Hotts. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
