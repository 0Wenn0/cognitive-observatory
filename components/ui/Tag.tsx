// ═══════════════════════════════════════════════════
// COGNITIVE OBSERVATORY — Tag Component
// El tag "Cognitive Observatory" visible desde frame 0.
// LeDoux (1996): ancla de identidad en <200ms.
// Contraste: #8B9EB3 sobre #080b12 = ratio 5.2:1 (WCAG 2.1)
// ═══════════════════════════════════════════════════

interface TagProps {
  text?: string;
  className?: string;
}

export default function Tag({
  text = 'Cognitive Observatory',
  className = '',
}: TagProps) {
  return (
    <div
      className={`co-tag ${className}`}
      aria-label={text}
    >
      {text}
    </div>
  );
}