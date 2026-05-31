// ═══════════════════════════════════════════════════
// COGNITIVE OBSERVATORY — SectionLabel Component
// Labels de sección en inglés — nomenclatura de sistema.
// IBM Plex Sans · letter-spacing 0.2em · uppercase
// Bialystok (2001): tags cortos en L2 = categorización
// pre-atentiva sin carga narrativa.
// ═══════════════════════════════════════════════════

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({
  text,
  className = '',
}: SectionLabelProps) {
  return (
    <span
      className={`co-section-label ${className}`}
      aria-label={text}
    >
      {text}
    </span>
  );
}