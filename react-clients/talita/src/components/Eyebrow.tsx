export default function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent sm:text-[13px] ${className}`}>
      {children}
    </p>
  );
}
