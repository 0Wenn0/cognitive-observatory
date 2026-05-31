// ═══════════════════════════════════════════════════
// COGNITIVE OBSERVATORY — Content System
// Todos los textos del sitio como constantes tipadas.
// Idioma: español principal · inglés estratégico.
// Cummins (2000): L1 mayor precisión conceptual que L2.
// NO hardcodear texto en los componentes — siempre importar desde aquí.
// ═══════════════════════════════════════════════════

export const HERO_CONTENT = {

  // Tag permanente — visible desde frame 0
  // LeDoux (1996): ancla de identidad en <200ms
  tag: "Cognitive Observatory",

  // Manifiesto principal — español · protagonista visual
  // DM Serif Display 44px · #C4BDB0 · italic
  // Paivio (1986): tres elementos concretos = mayor retención
  manifesto: "Diseño puentes cognitivos donde tecnología, neurociencia y humanidad convergen.",

  // Segunda línea — español · cuerpo
  // DM Serif Display 28px · #8B9EB3 · italic
  secondLine: "Traduzco la complejidad sistémica en experiencias con significado humano.",

  // Coda — inglés · posicionamiento estratégico subordinado
  // IBM Plex Sans 12px · #4A5E78
  // Kroll & Bialystok (2013): L2 activa red de posicionamiento
  coda: "Building cognitive bridges across systems, learning and human transformation.",

  // Subtítulo — español · contexto profesional
  // DM Sans 13px · weight 300 · #2E3E52
  subtitle: "Estratega interdisciplinaria en el cruce de inteligencia artificial, neurociencia y diseño humano.",

  // CTAs
  ctaPrimary: "Entrar al observatorio",
  ctaSecondary: "Explore the Observatory →",

} as const;

// ── MICROCOPY DE LAS 5 ESCENAS DEL HERO ─────────────
// Yarbus (1967): posición espacial distinta por escena
// activa sensación de 'nueva escena' cognitiva.
// Sousa (2011): next hint aparece a 3,500ms — tiempo mínimo
// para retención emocional de texto filosófico.

export const HERO_SCENES = [
  {
    id: 1,
    phase: "auto",
    microcopy: null, // Sin texto — solo atmósfera
    position: null,
  },
  {
    id: 2,
    phase: "auto",
    microcopy: null, // Sin texto — conexiones emergen
    position: null,
  },
  {
    id: 3,
    phase: "controlled",
    // Posición: esquina inferior izquierda — "tierra"
    microcopy: "Los sistemas más complejos tienen una lógica interna. Encontrarla es el primer paso.",
    position: "bottom-left",
  },
  {
    id: 4,
    phase: "controlled",
    // Posición: centro exacto — "horizonte"
    // Yellow moment activo en esta escena
    microcopy: "La tecnología más poderosa es la que desaparece — y deja solo la transformación.",
    position: "center",
  },
  {
    id: 5,
    phase: "controlled",
    // Posición: esquina superior derecha — "cielo"
    microcopy: "Aquí se construyen los puentes entre lo que existe y lo que podría existir.",
    position: "top-right",
  },
] as const;

// ── NAVIGATION ───────────────────────────────────────
// Inglés — nomenclatura de sistema
// Bialystok (2001): tags cortos en L2 procesados como
// categorías pre-atentivas, sin carga narrativa.

export const NAV_ITEMS = [
  { label: "Observatory", href: "#hero" },
  { label: "Systems",     href: "#constellation" },
  { label: "Archives",    href: "#archives" },
  { label: "Journal",     href: "#journal" },
  { label: "Contact",     href: "#contact" },
] as const;

// ── TRANSFORMATION ARCHIVES ──────────────────────────

export const ARCHIVES = [
  {
    id: "aurora",
    title: "Aurora Policy Solutions / OpenAI",
    subtitle: "Programa nacional de educación en inteligencia artificial",
    challenge: "Diseñar un programa de educación en IA comprensible para funcionarios de gobierno, académicos, empresarios y legisladores simultáneamente — cuatro grupos con vocabularios y expectativas completamente distintos.",
    intervention: "Sistema de traducción cognitiva contextual: contenido adaptado al modelo mental de cada sector, métricas en el lenguaje que cada audiencia ya usaba, narrativas que conectaban la IA con problemas que ellos ya reconocían como propios.",
    impact: "3,000+ participantes en múltiples sectores institucionales.",
    organizations: ["SEP", "TecNM", "Senado", "SECTUR", "OpenAI"],
    metrics: {
      participants: "3,000+",
      sectors: "5",
      scope: "Nacional",
    },
    tags: ["AI Policy", "Cognitive Translation", "Public Innovation", "Systems Thinking"],
    cluster: "systems",
  },
  {
    id: "infp",
    title: "Instituto Nacional de Formación Política",
    subtitle: "Transformación de comunicación institucional a escala nacional",
    challenge: "Base de datos de 200,000 contactos con 8% de tasa de apertura de email. El problema no era técnico — era cognitivo: ¿por qué una persona decide abrir o ignorar un mensaje en los primeros 2 segundos?",
    intervention: "Rediseño del sistema de segmentación y copywriting basado en neurociencia de la atención. Kahneman (2011): el cerebro toma esa decisión en Sistema 1 — evaluando señales, no contenido.",
    impact: "+275% de tasa de apertura (8% → 30%). +30% de finalización de programas formativos.",
    organizations: ["INFP"],
    metrics: {
      openRate: "+275%",
      contacts: "200,000",
      completion: "+30%",
    },
    tags: ["Behavioral Science", "Data Analysis", "Instructional Design", "Communication"],
    cluster: "human",
  },
] as const;

// ── OBSERVATORY JOURNAL ──────────────────────────────

export const JOURNAL_ENTRIES = [
  {
    id: "ai-education-policy",
    // Título en español — voz de Wendy
    title: "IA, educación y política pública: por qué tres sistemas que deberían conversar no hablan el mismo idioma — y qué pasa cuando alguien construye el puente.",
    // Abstract en inglés — formato paper académico · 2 líneas máximo
    // Swales (1990): activa esquema cognitivo de rigor académico pre-conscientemente
    // Bringhurst (1992): 3+ líneas compiten visualmente con el título
    abstract: "When artificial intelligence meets public policy and education, the greatest barrier is not technical — it is linguistic. This is a field account of what happens when someone builds the cognitive bridge between three systems that urgently need to understand each other.",
    tags: ["AI Policy", "Education Systems", "Cognitive Translation", "Systems Thinking", "Public Innovation"],
    date: "2026-05",
    status: "placeholder", // "published" cuando el cuerpo esté escrito
  },
] as const;

// ── CONTACT ──────────────────────────────────────────

export const CONTACT_CONTENT = {
  // Manifiesto — español · voz de Wendy
  manifesto: "Si tu organización necesita conectar mundos que no se hablan — tecnología y personas, IA y política, complejidad y claridad — construyo el puente.",
  // Tipos de intención — español
  intentions: [
    "Colaboración estratégica",
    "Consultoría en IA y educación",
    "Diseño de sistemas de aprendizaje",
    "Conferencias y ponencias",
    "Proyectos de innovación",
  ],
  email: "warb91030@gmail.com",
  linkedin: "linkedin.com/in/wendyRB-ai",
  // CTA
  ctaLabel: "Enviar señal al observatorio",
  ctaLabelEN: "Send a signal →",
} as const;