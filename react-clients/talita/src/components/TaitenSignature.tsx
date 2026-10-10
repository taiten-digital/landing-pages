// Assinatura da Taiten (símbolo + TAITEN/DIGITAL), redesenhada a partir do
// manual de identidade visual "Conceito 01 Vetor".
type Props = { tone?: 'light' | 'dark'; className?: string };

export default function TaitenSignature({ tone = 'light', className = '' }: Props) {
  const ink = tone === 'light' ? '#FFFFFF' : '#0A0A0A';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Taiten Digital">
      <svg viewBox="0 0 40 35" className="h-7 w-8" aria-hidden="true">
        <rect width="32" height="8" fill={ink} />
        <rect x="32" width="8" height="8" fill="#1E6BFF" />
        <polygon points="16.5,8 25,8 28.5,35 20,35" fill={ink} />
      </svg>
      <span className="h-7 w-px opacity-25" style={{ background: ink }} />
      <span className="leading-none" style={{ color: ink }}>
        <span className="block text-[17px] font-bold tracking-[-0.04em]">TAITEN</span>
        <span className="mt-1 block font-mono text-[8px] tracking-[0.42em] opacity-60">DIGITAL</span>
      </span>
    </span>
  );
}
