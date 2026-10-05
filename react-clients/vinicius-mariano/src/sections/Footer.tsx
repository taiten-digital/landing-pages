import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-vini-saron-xp.png';

const WA_URL = 'https://wa.me/554388503078';
const WA_DISPLAY = '(43) 98850-3078';
const EMAIL = 'viniciusfranco.bauru@live.com';
const IG_URL = 'https://www.instagram.com/vinimarianofranco/';

const LINKS = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#metodo', label: 'Método CAFÉ' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

const linkClass =
  'flex items-start gap-3 text-ink-muted transition-colors hover:text-ink focus-visible:text-ink outline-none';
const iconClass = 'mt-0.5 h-4 w-4 shrink-0 text-ink-muted';

function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();
  // Hidden while the Hero is on screen: the Hero has its own WhatsApp CTA.
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) {
      setHeroVisible(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.intersectionRatio >= 0.3), {
      threshold: 0.3,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={heroVisible}
      className={`fixed bottom-5 right-5 z-50 transition-[opacity,translate] duration-300 sm:bottom-6 sm:right-6 ${
        heroVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
      }`}
    >
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        title={`WhatsApp ${WA_DISPLAY}`}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/30 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        whileHover={reduceMotion ? undefined : { y: -4, scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </motion.a>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light text-ink">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-12">
        <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr_1.4fr] md:gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" className="inline-block" aria-label="Vini Mariano, voltar ao início">
              <img
                src={logo}
                alt="Vini Mariano, Saron Investments, XP"
                width={440}
                height={218}
                className="h-auto w-56 sm:w-64"
              />
            </a>
            <p className="mt-5 text-sm text-ink-muted">Economista CORECON-PR nº 9366.</p>
          </div>

          {/* Links */}
          <nav aria-label="Rodapé">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">Navegação</p>
            <div className="mt-3 h-px w-10 bg-accent-ink" aria-hidden="true" />
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">Contato</p>
            <div className="mt-3 h-px w-10 bg-accent-ink" aria-hidden="true" />
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FaWhatsapp className={iconClass} aria-hidden="true" />
                  <span>WhatsApp: {WA_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  <Mail className={iconClass} aria-hidden="true" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FaInstagram className={iconClass} aria-hidden="true" />
                  <span>@vinimarianofranco</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink-muted">
                <MapPin className={iconClass} aria-hidden="true" />
                <span>Londrina, PR</span>
              </li>
            </ul>
          </div>
        </div>

        {/* REVIEW: disclaimer deduced, client/Saron must validate wording */}
        <p className="mt-12 max-w-4xl text-xs leading-relaxed text-ink-muted">
          Vinicius Mariano Franco é assessor de investimentos certificado pela ANCORD e sócio da Saron
          Investments, escritório de assessoria de investimentos credenciado à XP Investimentos. A atividade
          de assessoria de investimentos é regulada pela CVM (Resolução CVM nº 178/2023). O conteúdo deste
          site tem caráter informativo e não constitui recomendação ou oferta de investimento.
          Rentabilidade passada não é garantia de rentabilidade futura.
        </p>

        <div className="mt-6 border-t border-line-light pt-6 text-xs text-ink-muted sm:pr-20">
          <p>© {year} Vinicius Mariano Franco</p>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
}
