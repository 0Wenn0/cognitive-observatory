// ═══════════════════════════════════════════════════
// COGNITIVE OBSERVATORY — Button Component
// CTAs del observatorio.
// Diseño: invitación, nunca conversión agresiva.
// ═══════════════════════════════════════════════════

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  label,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`co-cta-${variant} ${className}`}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}