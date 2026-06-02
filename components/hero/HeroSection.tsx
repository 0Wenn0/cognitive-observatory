'use client';
import MobileHero from '@/components/hero/MobileHero';
import ParticleSystem from '@/components/constellation/ParticleSystem';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HERO_SCENES } from '@/lib/content';

// Tipo que representa cada fase cinematográfica del hero.
// Cada fase tiene un objetivo emocional específico documentado
// en el Documento Maestro v4.0 — Sección 8.2
type HeroPhase = 'waiting' | 'scene-3' | 'scene-4' | 'scene-5' | 'pre-final' | 'final';

export default function HeroSection() {
  const [phase, setPhase]                   = useState<HeroPhase>('waiting');
  const [showHero, setShowHero]             = useState(false);
  const [block, setBlock]                   = useState(0);
  const [showFlash, setShowFlash]           = useState(false);
  const [showButtons, setShowButtons]       = useState(false);
  const [progressStep, setProgressStep]     = useState(0);
  const [showHint, setShowHint]             = useState(false);
  const [hoverPrimary, setHoverPrimary]     = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const nextActionRef                       = useRef<() => void>(() => {});
  const timeoutsRef                         = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
    return t;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {

    // FASE FINAL — statement grande aparece bloque por bloque.
    // Latidos antes de la aparición del universo.
    // Berger & Bhagavan (1984): ciclos de 3-5s sincronizan
    // con el ritmo respiratorio humano — sensación de vida.
const step4 = () => {
      setShowFlash(false);
      setProgressStep(4);
      setTimeout(() => {
        setPhase('final');
        setShowHero(true);
        // Intervalos consistentes de 1800ms entre bloques.
        // Berger & Bhagavan (1984): la consistencia rítmica
        // sincroniza con el ritmo respiratorio — se siente
        // como respiración, no como tropiezo.
        setTimeout(() => setBlock(1),          400);
        setTimeout(() => setBlock(2),         2200);
        setTimeout(() => setBlock(3),         4000);
        setTimeout(() => setShowButtons(true), 5800);
      }, 400);
      nextActionRef.current = () => {};
    };

    // FASE PRE-FINAL — destello amarillo único.
    // Un evento, no un estado continuo — por eso tiene mayor impacto narrativo que un pulso repetido.
    // Zeki (1993): #C8A84B detectado en <200ms en fondos oscuros.
    // Respuesta de orientación involuntaria — el sistema visual
    // lo detecta antes de que la conciencia intervenga.
    // Coherente con el arco "oscuridad → cognitive dawn":
    // el amanecer no pulsa — llega una vez y lo ilumina todo.
    const stepPreFinal = () => {
      setPhase('pre-final');
      setProgressStep(4);
      setShowFlash(true);
      // El destello dura 1.2s y luego el statement emerge
      // Cutting et al. (2012): elemento anterior en estado
      // final antes de que emerja el siguiente
      addTimeout(step4, 2200);
      nextActionRef.current = step4;
    };

    // FASES DE MICROCOPY — aparecen en posiciones espaciales distintas.
    // Yarbus (1967): cambio de zona de anclaje visual = nueva
    // escena cognitiva. El cerebro lo interpreta como trayectoria
    // narrativa — tierra → horizonte → cielo.
    // Rayner et al. (2016): 180-200 palabras/min en texto filosófico.
    // 15 palabras = 4.5s para lectura + procesamiento emocional.
    const step3 = () => {
      setPhase('scene-5');
      setProgressStep(3);
      nextActionRef.current = stepPreFinal;
      addTimeout(stepPreFinal, 3800);
    };

    const step2 = () => {
      setPhase('scene-4');
      setProgressStep(2);
      nextActionRef.current = step3;
      addTimeout(step3, 3800);
    };

    const step1 = () => {
      setPhase('scene-3');
      setProgressStep(1);
      nextActionRef.current = step2;
      addTimeout(step2, 3800);
      // Hint desaparece cuando el usuario ya entendió el sistema
      // Csikszentmihalyi (1990): exceso de instrucción destruye
      // la sensación de descubrimiento y flujo
      setTimeout(() => setShowHint(false), 3000);
    };

    // INICIO — primera frase a 0.8s.
    // Tag visible = ancla cognitiva establecida.
    // Mazmanian et al. (2013): con elemento de identidad
    // visible, orientación visual se completa en 0.8s.
    nextActionRef.current = step1;
    addTimeout(step1, 800);

    // Hint aparece a los 1.5s — después de que el usuario
    // haya visto la primera frase y esté orientado.
    // Krug (2014): el usuario no debe deducir cómo funciona
    // la interfaz — pero el hint desaparece pronto para
    // preservar la inmersión contemplativa.
    addTimeout(() => setShowHint(true), 1500);

    return () => clearAllTimeouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Detecta mobile en tiempo real sin afectar desktop.
  // Se actualiza si el usuario rota el dispositivo.
  // Apple HIG (2023): contenido visible sin scroll en mobile.
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
    // BYPASS — el clic adelanta la acción pendiente.
  // La siguiente fase sigue su ritmo natural hasta nuevo clic.
  // Nielsen (1994): respuesta inmediata al input del usuario
  // es fundamental para sensación de control y confianza.
  useEffect(() => {
    const handleClick = () => {
      if (nextActionRef.current) {
        clearAllTimeouts();
        setShowHint(false);
        nextActionRef.current();
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const activeScene = HERO_SCENES.find(s =>
    (phase === 'scene-3' && s.id === 3) ||
    (phase === 'scene-4' && s.id === 4) ||
    (phase === 'scene-5' && s.id === 5)
  );

  // Posicionamiento espacial del microcopy por escena.
  // Yarbus (1967): posición distinta activa sensación de
  // nueva escena cognitiva sin cambiar el entorno visual.
  const getMicroStyle = (position: string) => {
    const base = {
      position: 'absolute' as const,
      zIndex: 30,
      maxWidth: '380px',
      fontFamily: "'DM Serif Display', serif",
      fontSize: '18px',
      fontStyle: 'italic',
      color: '#8b9eb3',
      lineHeight: 1.7,
    };
    if (position === 'bottom-left') return { ...base, bottom: '120px', left: '64px' };
    if (position === 'center')      return { ...base, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' as const };
    if (position === 'top-right')   return { ...base, top: '80px', right: '64px', textAlign: 'right' as const };
    return { ...base, bottom: '120px', left: '64px' };
  };

  // Fade-in suave con movimiento vertical mínimo.
  // Los bloques emergen desde abajo — coherente con
  // la metáfora de emergencia semántica del Documento Maestro.
  const blockStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 1.1s ease, transform 1.1s ease',
  });

   if (!mounted) return null;
   if (isMobile) return <MobileHero />;
  return (
   
    <section style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#080b12',
      cursor: 'default',
    }}>

      {/* TEXTO SEMÁNTICO PARA SEO
          El texto existe en HTML puro — Next.js SSR lo indexa
          desde el servidor antes de que JavaScript ejecute.
          Google Search Central (2023): bots no leen WebGL.
          Este elemento invisible garantiza indexabilidad. */}
      <h1 style={{
        position: 'absolute', width: 1, height: 1,
        overflow: 'hidden', opacity: 0,
      }}>
        {HERO_CONTENT.manifesto}
      </h1>

      {/* FONDO ATMOSFÉRICO
          Placeholder para el sistema de partículas Three.js.
          El gradiente asimétrico crea profundidad lateral —
          coherente con la iluminación lateral del Documento Maestro.
          Adelson (2000): gradiente de profundidad crea espacio
          tridimensional habitable — sensación de estar dentro. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        background: 'radial-gradient(ellipse at 38% 52%, #0d1624 0%, #080b12 68%)',
      }} aria-hidden="true" />
    <ParticleSystem />

      {/* INK DIFFUSION ATMOSPHERE — 70% atmosférico via CSS
          Gradientes radiales asimétricos que crean profundidad
          y calidez sin competir con el texto.
          Viven debajo del texto (zIndex 6) pero sobre el Canvas (zIndex 5). */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 6,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 55% 45% at 78% 38%, rgba(20, 35, 65, 0.65) 0%, transparent 70%),
          radial-gradient(ellipse 35% 55% at 88% 72%, rgba(15, 25, 50, 0.45) 0%, transparent 60%),
          radial-gradient(ellipse 45% 35% at 62% 18%, rgba(22, 38, 68, 0.35) 0%, transparent 65%)
        `,
      }} aria-hidden="true" />

      {/* TAG "COGNITIVE OBSERVATORY"
          Visible desde frame 0 — ancla de identidad permanente.
          LeDoux (1996): sin ancla visual, la amígdala activa
          alerta de ambigüedad en 80-100ms.
          SIEMPRE estático — nunca anima.
          Si el ancla pulsa pierde su función cognitiva. */}
      <div style={{
        position: 'absolute', top: '32px',
        left: 0, right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0px',
        zIndex: 30,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8b9eb3',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '0.5px', background: '#2a3a56' }} />
          Cognitive Observatory
          <span style={{ display: 'block', width: '24px', height: '0.5px', background: '#2a3a56' }} />
       </div>

{/* VIGNETTE ARQUITECTÓNICO — sensación de recinto
          El usuario debe sentir "estoy dentro de algo",
          no "estoy viendo un background".
          Bordes oscuros que enmarcan el espacio central
          como una cámara oscura o sala de archivo. */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 7,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 85% 80% at 50% 50%, transparent 40%, rgba(4, 6, 12, 0.85) 100%)
        `,
      }} aria-hidden="true" />

      {/* FILM GRAIN — textura cinematográfica microscópica
          Imperfección controlada que añade materialidad y memoria.
          CSS noise via SVG filter — sin imágenes externas.
          La diferencia entre "digital limpio" y "lugar habitado". */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 8,
        pointerEvents: 'none',
        opacity: 0.035,
        filter: 'url(#grain)',
        background: '#8b9eb3',
      }} aria-hidden="true" />

      {/* BREATHING LIGHT — variación lumínica orgánica
          Una zona de luz focal muy suave que "respira".
          Como si el espacio estuviera pensando.
          Usa animación CSS keyframes — sin JavaScript. */}
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50%       { opacity: 0.09; transform: scale(1.08); }
        }
      `}</style>
<div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '900px',
        height: '900px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(20, 38, 72, 0.35) 0%, transparent 65%)',
        zIndex: 6,
        pointerEvents: 'none',
        animation: 'breathe 10s ease-in-out infinite',
      }} aria-hidden="true" />

{/* DESTELLO ESTELAR — pulso contemplativo asimétrico: La curva de animación es intencional: aparición lenta (0-30%) · pico brevísimo (30%) ·  disolución muy lenta (30-100%).
            Como una estrella que emerge del oscuro y se disuelve de vuelta en él — nunca "llega" ni "se va", simplemente "es" y luego "deja de ser".
            Referencia: Tarkovsky (Stalker, 1979) — la luz en la Zona no tiene fuente identificable, emerge del ambiente mismo.
            Centro: 3px sólido — casi un punto matemático Gradiente: 4 capas concéntricas que se disuelven hacia el negro. La luz ES el gradiente,
            no el centro. */}
        <div style={{ height: '28px' }} />
        <AnimatePresence>
          {showFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{
                opacity: [0, 0, 1, 0],
                scale:   [0.2, 0.6, 1, 0.4],
              }}
              transition={{
                duration: 1.6,
                ease: 'easeInOut',
                times: [0, 0.04, 0.50, 1],
              }}
              exit={{ opacity: 0 }}
              style={{
                width: '1.5px',
                height: '1.5px',
                borderRadius: '85%',
                backgroundColor: '#C8A84B',
                boxShadow: [
                '0 0 4px 2px rgba(200,168,75,1)',
                '0 0 16px 8px rgba(200,168,75,0.5)',
                '0 0 40px 20px rgba(200,168,75,0.2)',
                '0 0 80px 40px rgba(200,168,75,0.08)',
                '0 0 120px 60px rgba(200,168,75,0.03)',
                ].join(', '),
                pointerEvents: 'none',
              }}
            />
          )}
      </AnimatePresence>

      </div>
{/* INDICADORES DE PROGRESO — constelación en miniatura
          Posición: esquina inferior derecha — equilibrio visual.
          La zona izquierda tiene todo el texto y los botones.
          Los indicadores en la derecha son el único elemento
          interactivo de esa zona — activan perceptivamente
          la mitad derecha sin saturarla.
          Posner (1980): la periferia derecha necesita elementos
          que la activen aunque sean sutiles — sin ellos el
          equilibrio perceptivo colapsa hacia la izquierda.
          Flecha → entre punto 1 y 2: Gibson (1979) — affordance
          universal decodificada en <100ms sin procesamiento
          consciente. Comunica dirección sin necesitar texto. */}
      <div style={{
        position: 'absolute',
        bottom: '64px',
        right: '64px',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
      }}>
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && (
              index === 1 ? (
                <span style={{
                  fontSize: '10px',
                  color: progressStep >= step ? '#6a8aaa' : '#2a3a56',
                  margin: '0 5px',
                  transition: 'color 0.8s ease',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  lineHeight: 1,
                }}>
                  →
                </span>
              ) : (
                <div style={{
                  width: '16px',
                  height: '0.5px',
                  backgroundColor: progressStep >= step ? '#4a5e78' : '#2a3a56',
                  transition: 'background-color 0.8s ease',
                }} />
              )
            )}
            <div style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: progressStep >= step ? '#8b9eb3' : '#2a3a56',
              boxShadow: progressStep === step
                ? '0 0 8px 3px rgba(139, 158, 179, 0.35)'
                : 'none',
              transition: 'all 0.8s ease',
            }} />
          </div>
        ))}
      </div>

        
      {/* HINT DE BYPASS — desaparece después de 3s Aparece con la primera frase cuando el usuario  ya está orientado y listo para recibir instrucción.
          Desaparece antes de que se vuelva ruido visual. Csikszentmihalyi (1990): el exceso de instrucción  destruye la sensación de flujo y descubrimiento. */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '52px',
              right: '96px',
              zIndex: 30,
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#2a3a56',
              pointerEvents: 'none',
            }}
          >
            clic para continuar
          </motion.p>
        )}
      </AnimatePresence>

      {/* MICROCOPY — escenas 03, 04, 05
          Tres posiciones espaciales distintas: tierra → horizonte → cielo.
          Yarbus (1967): el cambio de zona de anclaje sacádico
          activa sensación de nueva escena cognitiva — el usuario
          percibe movimiento narrativo sin que nada se mueva. */}
      <AnimatePresence mode="wait">
        {activeScene && activeScene.microcopy && (
          <motion.p
            key={phase}
            style={getMicroStyle(activeScene.position ?? 'bottom-left')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.9 }}
            aria-live="polite"
          >
            {activeScene.microcopy}
          </motion.p>
        )}
      </AnimatePresence>

      {/* HERO STATEMENT — bloques como latidos
          Cada bloque emerge con su propio momento respiratorio.
          La columna de texto vive separada de los botones —
          Nielsen (1994): los CTAs deben estar en posiciones
          estables y predecibles, no al final de contenido variable.
          Treisman (1980): el tamaño del manifiesto no se reduce —
          es el elemento de mayor jerarquía visual, decodificado
          en <150ms. Reducirlo destruye la jerarquía perceptiva. */}
      {showHero && (
        <div style={{
          position: 'absolute',
          top: '18vh',
          left: 0,
          zIndex: 30,
          paddingLeft: '64px',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Bloque 1 — Manifiesto principal
              Tres anclas semánticas: tecnología, neurociencia, humanidad.
              Paivio (1986): tres elementos concretos generan mayor
              retención que dos — el cerebro crea tres nodos de memoria
              separados que se refuerzan mutuamente. */}
          <div style={blockStyle(block >= 1)}>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontStyle: 'italic',
              color: '#c4bdb0',
              lineHeight: 1.12,
              marginBottom: '28px',
            }}>
              {HERO_CONTENT.manifesto}
            </h2>
          </div>

          {/* Bloque 2 — Segunda línea
              Subordinada visualmente al manifiesto pero complementaria.
              El cambio de color comunica jerarquía sin ruptura —
              Gestalt: variación dentro de la continuidad. */}
          <div style={blockStyle(block >= 2)}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(16px, 2vw, 26px)',
              fontStyle: 'italic',
              color: '#8b9eb3',
              lineHeight: 1.3,
              marginBottom: '28px',
            }}>
              {HERO_CONTENT.secondLine}
            </p>
          </div>

          {/* Bloque 3 — Coda EN
              Cambio de idioma intencional: activa red de
              posicionamiento estratégico global en el cerebro.
              Kroll & Bialystok (2013): L2 activa corteza prefrontal
              dorsolateral — modo de categorización y evaluación.
              15px · letter-spacing reducido para mantener peso visual.
              Bringhurst (1992): tracking amplio necesita compensación
              de tamaño para mantener densidad visual equivalente. */}
          <div style={blockStyle(block >= 3)}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '15px',
              letterSpacing: '0.04em',
              color: '#8b9eb3',
              lineHeight: 1.6,
            }}>
              {HERO_CONTENT.coda}
            </p>
          </div>

        </div>
      )}

      {/* BOTONES — posición fija independiente
          Viven fuera de la columna de texto para tener
          presencia propia como llamada a la acción.
          Cialdini (2001): el CTA debe sentirse como puerta
          abierta, no como elemento decorativo al final de texto.
          Hover state: color y borde aclaran hacia #c4bdb0 —
          señal de invitación sin agresividad visual. */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '48px',
              left: '64px',
              zIndex: 30,
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <button
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('constellation')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: hoverPrimary ? '#c4bdb0' : '#8b9eb3',
                border: `0.5px solid ${hoverPrimary ? '#8b9eb3' : '#6a8aaa'}`,
                padding: '16px 36px',
                borderRadius: '30px',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              {HERO_CONTENT.ctaPrimary}
            </button>
            <button
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('constellation')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: hoverSecondary ? '#c4bdb0' : '#8b9eb3',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: hoverSecondary ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              {HERO_CONTENT.ctaSecondary}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}