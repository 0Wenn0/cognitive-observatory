// ═══════════════════════════════════════════════════
// COGNITIVE OBSERVATORY — Constellation Nodes
// Arquitectura de la constelación semántica.
// Organizada por funciones sistémicas — no disciplinas.
// Novak & Cañas (2006): función cognitiva > categoría.
// ═══════════════════════════════════════════════════

export type ClusterType =
  | 'center'
  | 'human'
  | 'systems'
  | 'collective'
  | 'narrative';

export type NodeRole = 'center' | 'anchor' | 'support' | 'placeholder';

export interface ConstellationNode {
  id: string;
  label: string;           // Inglés — label de sistema
  labelES: string;         // Español — nombre completo
  cluster: ClusterType;
  role: NodeRole;
  size: number;            // Diámetro en px
  placeholder: boolean;
  color: string;           // Color del cluster
  strokeColor: string;
  // Contenido del panel flotante
  panel: {
    description: string;   // Español — voz de Wendy
    metrics?: {
      primary: string;
      secondary?: string;
      context?: string;
    };
    tags: string[];        // Inglés — tags de disciplina
    archiveId?: string;    // Conectado a Transformation Archive
  };
  // Posición relativa en nebulosa orgánica (0-1)
  // Distribución asimétrica — Berlyne (1960)
  position: { x: number; y: number };
  // Conexiones con otros nodos
  connections: string[];
}

// ── PALETA POR CLUSTER ───────────────────────────────
// Coherente con los tokens de globals.css
const COLORS = {
  center:     { fill: '#1A2030', stroke: '#8B9EB3' },
  human:      { fill: '#085041', stroke: '#1D9E75' },
  systems:    { fill: '#3C3489', stroke: '#7F77DD' },
  collective: { fill: '#712B13', stroke: '#D85A30' },
  narrative:  { fill: '#72243E', stroke: '#D4537E' },
};

// ── NODOS DE LA CONSTELACIÓN ─────────────────────────
export const CONSTELLATION_NODES: ConstellationNode[] = [

  // ── CENTRO — Systems thinking ─────────────────────
  // Transversal a todos los clusters.
  // Sus líneas llegan a todos — no pertenece a ninguno.
  {
    id: 'systems-thinking',
    label: 'Systems Thinking',
    labelES: 'Pensamiento sistémico',
    cluster: 'center',
    role: 'center',
    size: 88,
    placeholder: false,
    color: COLORS.center.fill,
    strokeColor: COLORS.center.stroke,
    panel: {
      description: 'No es una metodología que aplico. Es la forma en que mi mente organiza la complejidad. Cada proyecto que he liderado parte de mapear sistemas — actores, relaciones, fricciones, puentes posibles.',
      metrics: {
        primary: 'Presente en todos los proyectos',
        secondary: '5 sectores articulados simultáneamente',
        context: 'De neurociencia clínica a política pública nacional',
      },
      tags: ['Systems Design', 'Design Thinking', 'Complexity', 'Integration'],
      archiveId: 'aurora',
    },
    position: { x: 0.5, y: 0.5 },
    connections: [
      'neuroscience', 'instructional-design',
      'data-analysis', 'ai-policy',
      'stem-equity', 'latam-reach',
      'strategic-narrative',
    ],
  },

  // ── CLUSTER 01 — Human Understanding · Teal ──────
  {
    id: 'neuroscience',
    label: 'Applied Neuroscience',
    labelES: 'Neurociencia aplicada',
    cluster: 'human',
    role: 'anchor',
    size: 68,
    placeholder: false,
    color: COLORS.human.fill,
    strokeColor: COLORS.human.stroke,
    panel: {
      description: 'Mi formación clínica en neuropsicología no es contexto — es el lente con que diseño cualquier sistema de aprendizaje, comunicación o experiencia cognitiva. La neurociencia no explica el comportamiento humano: explica por qué ciertas experiencias transforman y otras no.',
      metrics: {
        primary: 'Maestría en Neuropsicología — UNAM',
        secondary: 'Investigación clínica — INNN · Parkinson y lenguaje',
        context: 'Publicación científica indexada',
      },
      tags: ['Neuropsychology', 'Cognitive Science', 'Learning Science', 'Clinical Research'],
    },
    position: { x: 0.18, y: 0.15 },
    connections: ['systems-thinking', 'instructional-design'],
  },

  {
    id: 'instructional-design',
    label: 'Instructional Design',
    labelES: 'Diseño instruccional',
    cluster: 'human',
    role: 'support',
    size: 52,
    placeholder: false,
    color: COLORS.human.fill,
    strokeColor: COLORS.human.stroke,
    panel: {
      description: 'Diseño experiencias de aprendizaje que funcionan porque parten de cómo el cerebro realmente aprende — no de cómo las instituciones creen que aprende. La diferencia entre esas dos cosas determina si una intervención transforma o solo ocupa tiempo.',
      metrics: {
        primary: '+30% tasa de finalización de programas',
        secondary: '200,000 usuarios en plataformas digitales',
        context: 'Rise 360 · Thinkific · LMS institucionales',
      },
      tags: ['Learning Design', 'Curriculum', 'EdTech', 'Cognitive Load'],
      archiveId: 'infp',
    },
    position: { x: 0.08, y: 0.32 },
    connections: ['systems-thinking', 'neuroscience'],
  },

  // ── CLUSTER 02 — Systems & Intelligence · Purple ──
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    labelES: 'Análisis de datos',
    cluster: 'systems',
    role: 'anchor',
    size: 68,
    placeholder: false,
    color: COLORS.systems.fill,
    strokeColor: COLORS.systems.stroke,
    panel: {
      description: 'Los datos no hablan solos. La metodología que los interpreta es lo que genera decisiones reales. Aquí es donde la neurociencia y los sistemas se vuelven accionables: cuando los números tienen contexto humano.',
      metrics: {
        primary: '+275% email open rate (8% → 30%)',
        secondary: '200,000 contactos gestionados',
        context: 'Python · SQL · Tableau · análisis iterativo',
      },
      tags: ['Data Science', 'Analytics', 'Behavioral Data', 'Decision Intelligence'],
      archiveId: 'infp',
    },
    position: { x: 0.78, y: 0.18 },
    connections: ['systems-thinking', 'ai-policy'],
  },

  {
    id: 'ai-policy',
    label: 'AI & Public Policy',
    labelES: 'IA & política pública',
    cluster: 'systems',
    role: 'support',
    size: 52,
    placeholder: false,
    color: COLORS.systems.fill,
    strokeColor: COLORS.systems.stroke,
    panel: {
      description: 'Traduje la complejidad de la inteligencia artificial en programas comprensibles para funcionarios de gobierno, académicos, empresarios y legisladores — simultáneamente. Ese es el puente cognitivo más difícil que he construido y el más necesario.',
      metrics: {
        primary: '3,000+ participantes en programa nacional',
        secondary: 'SEP · TecNM · Senado · SECTUR',
        context: 'Articulación con OpenAI · Aurora Policy Solutions',
      },
      tags: ['AI Education', 'Public Policy', 'Innovation Strategy', 'Institutional Change'],
      archiveId: 'aurora',
    },
    position: { x: 0.88, y: 0.38 },
    connections: ['systems-thinking', 'data-analysis'],
  },

  // ── CLUSTER 03 — Collective Transformation · Coral
  {
    id: 'stem-equity',
    label: 'STEM & Equity',
    labelES: 'STEM & equidad',
    cluster: 'collective',
    role: 'anchor',
    size: 68,
    placeholder: false,
    color: COLORS.collective.fill,
    strokeColor: COLORS.collective.stroke,
    panel: {
      description: 'La tecnología no es neutral. Diseñé experiencias de aprendizaje para mujeres y niñas porque creo que el acceso al conocimiento técnico es una cuestión de justicia, no de mérito. Los sistemas que excluyen producen tecnología que excluye.',
      metrics: {
        primary: 'MIT Latin Code · Patrones Hermosos',
        secondary: 'Bécalas Conectadas · ODS',
        context: 'Perspectiva de género en educación tecnológica',
      },
      tags: ['Gender & Tech', 'Educational Access', 'Social Innovation', 'SDGs'],
    },
    position: { x: 0.15, y: 0.75 },
    connections: ['systems-thinking', 'latam-reach'],
  },

  {
    id: 'latam-reach',
    label: 'LATAM & Europe Reach',
    labelES: 'Alcance LATAM & Europa',
    cluster: 'collective',
    role: 'support',
    size: 52,
    placeholder: false,
    color: COLORS.collective.fill,
    strokeColor: COLORS.collective.stroke,
    panel: {
      description: 'La transformación que más me interesa no ocurre en un solo contexto. He coordinado programas con universidades de México, América Latina y Europa porque los problemas sistémicos no tienen fronteras — y las soluciones tampoco deberían tenerlas.',
      metrics: {
        primary: 'Universidades LATAM + Europa',
        secondary: 'Programas virtuales internacionales',
        context: 'Inglés B2 · coordinación multicultural',
      },
      tags: ['International Programs', 'Regional Impact', 'Cross-cultural Design'],
    },
    position: { x: 0.28, y: 0.88 },
    connections: ['systems-thinking', 'stem-equity'],
  },

  // ── CLUSTER 04 — Narrative & Meaning · Pink ──────
  {
    id: 'strategic-narrative',
    label: 'Strategic Narrative',
    labelES: 'Narrativa estratégica',
    cluster: 'narrative',
    role: 'anchor',
    size: 68,
    placeholder: false,
    color: COLORS.narrative.fill,
    strokeColor: COLORS.narrative.stroke,
    panel: {
      description: 'La comunicación más poderosa no informa — transforma. He convertido datos complejos en narrativas que mueven a tomadores de decisión a nivel nacional. La diferencia entre un reporte y una narrativa es la diferencia entre archivar y actuar.',
      metrics: {
        primary: 'Reportes estratégicos para autoridades nacionales',
        secondary: 'SEO institucional · comunicación ejecutiva',
        context: 'Tomadores de decisión en política pública',
      },
      tags: ['Strategic Communication', 'Science Communication', 'Executive Writing', 'SEO'],
      archiveId: 'aurora',
    },
    position: { x: 0.75, y: 0.80 },
    connections: ['systems-thinking'],
  },

  // ── PLACEHOLDERS — Cluster 04 · Fase 3 ───────────
  // Heider & Simmel (1944): elementos 'en proceso'
  // activan curiosidad positiva cuando son honestos.
  // opacity: 0.35 · stroke-dasharray · sin contenido inventado
  {
    id: 'journal',
    label: 'Observatory Journal',
    labelES: 'Observatory Journal',
    cluster: 'narrative',
    role: 'placeholder',
    size: 40,
    placeholder: true,
    color: COLORS.narrative.fill,
    strokeColor: COLORS.narrative.stroke,
    panel: {
      description: 'Este nodo se está construyendo en el Observatory Journal. Cada artículo que se publique expandirá este espacio de la constelación. Vuelve pronto.',
      tags: ['Coming Soon', 'Observatory Journal'],
    },
    position: { x: 0.62, y: 0.92 },
    connections: ['strategic-narrative'],
  },

  {
    id: 'speaking',
    label: 'Speaking',
    labelES: 'Speaking',
    cluster: 'narrative',
    role: 'placeholder',
    size: 40,
    placeholder: true,
    color: COLORS.narrative.fill,
    strokeColor: COLORS.narrative.stroke,
    panel: {
      description: 'Próximamente: visión pública, conferencias e intervenciones en espacios de innovación, educación e inteligencia artificial. En construcción.',
      tags: ['Coming Soon', 'Speaking', 'Thought Leadership'],
    },
    position: { x: 0.88, y: 0.68 },
    connections: ['strategic-narrative'],
  },
];

// ── HELPERS ──────────────────────────────────────────

// Obtener nodos por cluster
export const getNodesByCluster = (cluster: ClusterType) =>
  CONSTELLATION_NODES.filter(n => n.cluster === cluster);

// Obtener nodo central
export const getCenterNode = () =>
  CONSTELLATION_NODES.find(n => n.role === 'center')!;

// Obtener nodos activos (sin placeholders)
export const getActiveNodes = () =>
  CONSTELLATION_NODES.filter(n => !n.placeholder);

// Obtener nodos conectados a un nodo dado
// Limitado a maxDepth niveles — Miller (1956) + Nielsen (1994)
export const getConnectedNodes = (
  nodeId: string,
  maxDepth: number = 3
): ConstellationNode[][] => {
  const visited = new Set<string>();
  const levels: ConstellationNode[][] = [];
  let current = [nodeId];
  visited.add(nodeId);

  for (let depth = 0; depth < maxDepth; depth++) {
    const nextLevel: ConstellationNode[] = [];
    for (const id of current) {
      const node = CONSTELLATION_NODES.find(n => n.id === id);
      if (!node) continue;
      for (const connId of node.connections) {
        if (!visited.has(connId)) {
          visited.add(connId);
          const connNode = CONSTELLATION_NODES.find(n => n.id === connId);
          if (connNode) nextLevel.push(connNode);
        }
      }
    }
    if (nextLevel.length === 0) break;
    levels.push(nextLevel);
    current = nextLevel.map(n => n.id);
  }

  return levels;
};

// Intensidades del Yellow Moment por nivel de profundidad
// Nielsen (1994) + Miller (1956): máx 3 niveles · 240ms total
export const YELLOW_MOMENT_INTENSITY = [1.0, 0.6, 0.3] as const;
export const YELLOW_MOMENT_DELAY_MS = 80; // por nodo
export const YELLOW_MOMENT_MAX_MS = 240;  // total absoluto