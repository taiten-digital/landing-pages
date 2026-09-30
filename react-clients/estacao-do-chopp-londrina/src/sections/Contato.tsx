import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, img, waLink } from '../lib/site';

function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0.3 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Pedir chopp pelo WhatsApp"
      inert={!visible}
      className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FaWhatsapp className="h-7 w-7" aria-hidden />
    </a>
  );
}

export default function Contato() {
  return (
    <>
      <section id="contato" className="relative overflow-hidden bg-bg py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-br from-surface-2 via-surface to-bg p-8 sm:p-14">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-[30rem] opacity-70">
              <img src={img('rays')} alt="" loading="lazy" className="fx-spin w-full" style={{ '--dur': '90s' } as React.CSSProperties} />
            </div>
            <img
              src={img('chopp')}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute -bottom-6 right-2 hidden h-[115%] w-auto rotate-6 md:block"
            />
            <div className="relative max-w-xl">
              <h2 className="font-display text-5xl leading-[1.05] text-text sm:text-7xl">
                Bora pedir o <span className="text-accent">seu chopp?</span>
              </h2>
              <p className="mt-4 text-lg text-text/80">Chame a gente no WhatsApp e combine seu barril para Londrina.</p>
              <motion.a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-accent-fg shadow-[0_10px_40px_rgba(244,168,29,0.4)]"
              >
                <FaWhatsapp className="h-6 w-6" aria-hidden />
                {WHATSAPP_DISPLAY}
              </motion.a>
              <div className="mt-5">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent">
                  <FaInstagram className="h-5 w-5" aria-hidden />
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-bg py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-text-muted sm:flex-row sm:px-6">
          <span className="flex items-center gap-2">
            <img src={img('logo')} alt="" aria-hidden className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-xl text-text">Estação do Chopp Londrina</span>
          </span>
          <span>Distribuidora de chopp desde 2014 · Londrina, PR</span>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}
