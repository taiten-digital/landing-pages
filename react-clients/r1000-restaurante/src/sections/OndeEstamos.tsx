import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

// Shared contracts from design-brief.md
const WHATSAPP_URL =
  'https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.';
const PHONE_URL = 'tel:+554330662648';
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Av.%20Jos%C3%A9%20Del%20Ciel%20Filho%2C%20750%2C%20Londrina%20PR';
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Av.+Jos%C3%A9+Del+Ciel+Filho,+750,+Londrina,+PR,+86080-780&output=embed';
const ADDRESS = 'Av. José Del Ciel Filho, 750, Jardim Imagawa, Londrina, PR, CEP 86080-780';

// Hours (client-brief: terça a domingo, 10h30 às 15h; segunda fechado).
// Minutes since midnight, São Paulo time.
const OPEN_MIN = 10 * 60 + 30;
const CLOSE_MIN = 15 * 60;

// JS weekday index: 0 = domingo ... 6 = sábado
const isOpenDay = (day: number) => day !== 1;

// Display order Segunda..Domingo, with the JS weekday index for each row.
const WEEK: { label: string; day: number }[] = [
  { label: 'Segunda', day: 1 },
  { label: 'Terça', day: 2 },
  { label: 'Quarta', day: 3 },
  { label: 'Quinta', day: 4 },
  { label: 'Sexta', day: 5 },
  { label: 'Sábado', day: 6 },
  { label: 'Domingo', day: 0 },
];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

// Read weekday + time in America/Sao_Paulo regardless of the browser's zone.
function nowInSaoPaulo(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = WEEKDAY_INDEX[get('weekday')] ?? new Date().getDay();
  const hour = Number(get('hour')) % 24;
  const minute = Number(get('minute'));
  return { day, minutes: hour * 60 + minute };
}

type Status = { open: boolean; label: string; day: number };

function computeStatus(): Status {
  const { day, minutes } = nowInSaoPaulo();
  if (isOpenDay(day) && minutes >= OPEN_MIN && minutes < CLOSE_MIN) {
    return { open: true, label: 'Aberto agora · fecha às 15h', day };
  }
  let when: string;
  if (isOpenDay(day) && minutes < OPEN_MIN) {
    when = 'hoje';
  } else {
    // After closing, or on Monday: find the next open day.
    const next = (day + 1) % 7;
    when = isOpenDay(next) ? 'amanhã' : 'terça';
  }
  return { open: false, label: `Fechado agora · abre ${when} às 10h30`, day };
}

export default function OndeEstamos() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>(() => computeStatus());
  const [hoverDay, setHoverDay] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(computeStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const today = status.day;
  const markerDay = hoverDay ?? today;

  return (
    <section id="onde-estamos" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ember">Horário e local</p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-fg sm:text-5xl">
          Onde estamos
        </h2>
        <p className="mt-4 max-w-xl text-fg-muted">
          Almoço de terça a domingo, das 10h30 às 15h. Vem comer aqui, retira no balcão ou pede pra
          entregar.
        </p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
          {/* Left: live status, hours, contacts */}
          <div className="min-w-0 rounded-card border border-white/5 bg-bg-panel p-5 sm:p-7">
            {/* Live status badge */}
            <div
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-bg-raised px-4 py-2"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-3 w-3 items-center justify-center">
                {status.open && !reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-accent"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <motion.span
                  className={`relative h-3 w-3 rounded-full ${status.open ? 'bg-accent' : 'bg-fg-muted'}`}
                  animate={status.open && !reduceMotion ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 1.6, repeat: status.open && !reduceMotion ? Infinity : 0, ease: 'easeInOut' }}
                />
              </span>
              <span className={`text-sm font-medium ${status.open ? 'text-fg' : 'text-fg-muted'}`}>
                {status.label}
              </span>
            </div>

            {/* Hours list */}
            <div className="mt-6 flex items-center gap-2 text-sm text-fg-muted">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>Horário de funcionamento</span>
            </div>
            <ul className="mt-3 space-y-1" onMouseLeave={() => setHoverDay(null)}>
              {WEEK.map(({ label, day }) => {
                const isToday = day === today;
                const open = isOpenDay(day);
                return (
                  <li
                    key={label}
                    onMouseEnter={() => setHoverDay(day)}
                    className="relative flex items-center justify-between rounded-xl px-4 py-2.5"
                  >
                    {markerDay === day && (
                      <motion.span
                        layoutId="onde-estamos-day-marker"
                        className={`absolute inset-0 rounded-xl ${
                          isToday ? 'bg-bg-raised ring-1 ring-white/10' : 'bg-bg-raised/60'
                        }`}
                        transition={
                          reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                    <span
                      className={`relative flex items-center gap-2 ${
                        isToday ? 'font-medium text-fg' : 'text-fg-muted'
                      }`}
                    >
                      {label}
                      {isToday && (
                        <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-ember">
                          hoje
                        </span>
                      )}
                    </span>
                    <span
                      className={`relative tabular-nums ${
                        isToday ? 'font-medium text-fg' : open ? 'text-fg-muted' : 'text-fg-muted/60'
                      }`}
                    >
                      {open ? '10h30 às 15h' : 'Fechado'}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Contacts: real numbers shown, never a generic label */}
            <ul className="mt-6 space-y-4 border-t border-white/5 pt-6">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-fg-muted" aria-hidden="true" />
                <span className="text-fg">{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-fg-muted" aria-hidden="true" />
                <a href={PHONE_URL} className="text-fg transition-colors hover:text-ember">
                  (43) 3066-2648
                </a>
              </li>
              <li className="flex gap-3">
                <FaWhatsapp className="mt-0.5 h-5 w-5 shrink-0 text-fg-muted" aria-hidden="true" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg transition-colors hover:text-ember"
                >
                  (43) 99138-3162
                </a>
              </li>
            </ul>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Como chegar
              </motion.a>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-fg transition-colors hover:border-white/30 hover:bg-bg-raised"
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                Chamar no WhatsApp
              </motion.a>
            </div>
          </div>

          {/* Right: map card with idle float */}
          <div className="min-w-0 w-full">
            {/* ASSET NEEDED: photo of the restaurant's facade/storefront (no people) to pair with the map, so customers recognize the place on arrival. None in client-brief.md's asset list. */}
            <motion.div
              className="w-full"
              animate={reduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative w-full overflow-hidden rounded-card border border-white/10 bg-bg-panel shadow-2xl shadow-black/40">
                <iframe
                  src={MAP_EMBED_URL}
                  title="Mapa: R1000 Restaurante"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[520px]"
                  style={{ filter: 'grayscale(0.3) contrast(1.05)' }}
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg/85 px-3 py-1.5 text-sm font-medium text-fg backdrop-blur">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                  R1000 Restaurante
                </div>
              </div>
            </motion.div>
            <p className="mt-4 flex gap-2 text-sm text-fg-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{ADDRESS}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
