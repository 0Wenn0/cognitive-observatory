'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HERO_SCENES } from '@/lib/content';

// Tipo que representa cada fase cinematográfica del hero.
// Cada fase tiene un objetivo emocional específico —
// Documento Maestro v4.0, Sección 8.2
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
      setProgressStep(4);
      setTimeout(() => {
        setPhase('final');
        setShowHero(true);
        setShowFlash(false);
        setTimeout(() => setBlock(1), 400);
        setTimeout(() => setBlock(2), 2200);
        setTimeout(() => setBlock(3), 4000);
        setTimeout(() => setShowButtons(true), 5800);
      }, 400);
      nextActionRef.current = () => {};
    };

    // FASE PRE-FINAL — destello estelar único.
    // Tarkovsky (Stalker, 1979): la luz puntual sugiere
    // sin explicar — referencia cinematográfica oficial.
    // Zeki (1993): #C8A84B detectado en <200ms en fondos oscuros.
    const stepPreFinal = () => {
      setPhase('pre-final');
      setProgressStep(4);
      setShowFlash(true);
      addTimeout(step4, 2200);
      nextActionRef.current = step4;
    };

    // FASES DE MICROCOPY — posiciones espaciales distintas.
    // Yarbus (1967): cambio de zona de anclaje visual = nueva
    // escena cognitiva — tierra → horizonte → cielo.
    // Rayner et al. (2016): 3.8s = tiempo óptimo para lectura
    // + procesamiento emocional de texto filosófico de 15 palabras.
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
      // Hint desaparece a los 3s — el usuario ya entendió
      // el sistema de bypass.
      // Csikszentmihalyi (1990): el exceso de instrucción
      // destruye la sensación de flujo y descubrimiento.
      setTimeout(() => setShowHint(false), 3000);
    };

    // INICIO — primera frase a 0.8s.
    // Tag visible = ancla cognitiva establecida.
    // Mazmanian et al. (2013): con elemento de identidad
    // visible, orientación visual se completa en 0.8s.
    nextActionRef.current = step1;
    addTimeout(step1, 800);
    addTimeout(() => setShowHint(true), 1500);

    return () => clearAllTimeouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // BYPASS — clic adelanta la acción pendiente.
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
      fontSize: 'clamp(16px, 2.5vw, 18px)',
      fontStyle: 'italic',
      color: '#8b9eb3',
      lineHeight: 1.7,
    };
    if (position === 'bottom-left') return { ...base, bottom: '120px', left: 'clamp(24px, 5vw, 64px)' };
    if (position === 'center')      return { ...base, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' as const };
    if (position === 'top-right')   return { ...base, top: '80px', right: 'clamp(24px, 5vw, 64px)', textAlign: 'right' as const };
    return { ...base, bottom: '120px', left: 'clamp(24px, 5vw, 64px)' };
  };

  // Fade-in suave con movimiento vertical mínimo.
  // Los bloques emergen desde abajo — emergencia semántica.
  // Coherente con "Semantic Drift" del Documento Maestro.
  const blockStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 1.1s ease, transform 1.1s ease',
  });

  // Botones reutilizables — se renderizan dos veces:
  // una para desktop (posición fija) y otra para mobile
  // (dentro del flujo del texto).
  // Solución al problema de especificidad CSS vs Framer Motion:
  // los estilos inline de motion.div tienen mayor especificidad
  // que cualquier media query — renderizar dos versiones
  // es la única forma confiable de controlar la posición
  // en ambos viewports sin conflictos.
  const ButtonsContent = () => (
    <>
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
    </>
  );

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#080b12',
    }}>

      {/* TEXTO SEMÁNTICO PARA SEO
          HTML puro — Next.js SSR lo indexa desde el servidor.
          Google Search Central (2023): bots no leen WebGL. */}
      <h1 style={{
        position: 'absolute', width: 1, height: 1,
        overflow: 'hidden', opacity: 0,
      }}>
        {HERO_CONTENT.manifesto}
      </h1>

      {/* FONDO ATMOSFÉRICO — placeholder para Three.js
          Gradiente asimétrico — iluminación lateral contemplativa.
          Adelson (2000): gradiente de profundidad crea espacio
          tridimensional habitable — sensación de estar dentro. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: 'radial-gradient(ellipse at 38% 52%, #0d1624 0%, #080b12 68%)',
      }} aria-hidden="true" />

      {/* DESTELLO ESTELAR — evento único pre-final
          Centro 2px + 4 capas de gradiente concéntrico.
          Tarkovsky (Stalker, 1979): luz puntual que sugiere
          sin explicar — referencia cinematográfica oficial.
          times: [0, 0.04, 0.80, 1] — aparición casi inmediata,
          disolución muy lenta y contemplativa.
          Zeki (1993): #C8A84B detectado en <200ms en fondos oscuros. */}
      {showFlash && (
        <div style={{
          position: 'absolute', top: '68px',
          left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          zIndex: 25, pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: [0, 0, 1, 0],
              scale:   [0.2, 0.6, 1, 0.4],
            }}
            transition={{
              duration: 2.0,
              ease: 'easeInOut',
              times: [0, 0.04, 0.80, 1],
            }}
            style={{
              width: '2px', height: '2px',
              borderRadius: '50%',
              backgroundColor: '#C8A84B',
              boxShadow: [
                '0 0 3px 1px rgba(200,168,75,1)',
                '0 0 10px 5px rgba(200,168,75,0.35)',
                '0 0 24px 12px rgba(200,168,75,0.12)',
                '0 0 48px 24px rgba(200,168,75,0.04)',
              ].join(', '),
            }}
          />
        </div>
      )}

      {/* TAG "COGNITIVE OBSERVATORY"
          Visible desde frame 0 — ancla de identidad permanente.
          LeDoux (1996): sin ancla visual, la amígdala activa
          alerta de ambigüedad en 80-100ms.
          SIEMPRE estático — nunca anima.
          Si el ancla pulsa pierde su función cognitiva. */}
      <div style={{
        position: 'absolute', top: '32px',
        left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', zIndex: 30,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '13px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#8b9eb3',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '0.5px', background: '#2a3a56' }} />
          Cognitive Observatory
          <span style={{ display: 'block', width: '24px', height: '0.5px', background: '#2a3a56' }} />
        </div>
      </div>

      {/* INDICADORES DE PROGRESO — constelación en miniatura
          Desktop: esquina inferior derecha — equilibrio visual.
          Posner (1980): periferia derecha necesita elementos
          que la activen aunque sean sutiles.
          Mobile: centro inferior vía media query CSS.
          Gestalt — continuidad (Wertheimer, 1923): puntos
          conectados se perciben como sistema, no lista. */}
      <div
        className="constellation-indicators"
        style={{
          position: 'absolute',
          bottom: '64px', right: '64px',
          zIndex: 30,
          display: 'flex', alignItems: 'center',
        }}
      >
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && (
              index === 1 ? (
                <span style={{
                  fontSize: '10px',
                  color: progressStep >= step ? '#6a8aaa' : '#2a3a56',
                  margin: '0 5px', transition: 'color 0.8s ease',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  lineHeight: 1,
                }}>→</span>
              ) : (
                <div style={{
                  width: '16px', height: '0.5px',
                  backgroundColor: progressStep >= step ? '#4a5e78' : '#2a3a56',
                  transition: 'background-color 0.8s ease',
                }} />
              )
            )}
            <div style={{
              width: '7px', height: '7px',
              borderRadius: '50%',
              backgroundColor: progressStep >= step ? '#8b9eb3' : '#2a3a56',
              boxShadow: progressStep === step
                ? '0 0 8px 3px rgba(139,158,179,0.35)'
                : 'none',
              transition: 'all 0.8s ease',
            }} />
          </div>
        ))}
      </div>

      {/* HINT DE BYPASS — desaparece después de 3s
          Krug (2014): el usuario no debe deducir cómo funciona
          la interfaz sin ninguna señal visible.
          Csikszentmihalyi (1990): el exceso de instrucción
          destruye la sensación de flujo y descubrimiento. */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '68px', right: '96px',
              zIndex: 30,
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '9px', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#2a3a56',
              pointerEvents: 'none', whiteSpace: 'nowrap',
            }}
          >
            clic para continuar
          </motion.p>
        )}
      </AnimatePresence>

      {/* MICROCOPY — escenas 03, 04, 05
          Tres posiciones: tierra → horizonte → cielo.
          Yarbus (1967): el cambio de zona sacádica activa
          sensación de nueva escena cognitiva.
          Clic adelanta la frase pendiente — bypass de cortesía. */}
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
          DESKTOP: top 18vh · paddingLeft 64px · maxWidth 580px
          Idéntico al primer commit histórico aprobado.
          Rayner (1998): texto en tercio izquierdo del viewport.
          MOBILE: media query ajusta top, padding y fuentes.
          Los botones mobile se renderizan DENTRO de este
          contenedor para fluir naturalmente sin gaps —
          solución al problema de especificidad CSS vs Framer Motion. */}
      {showHero && (
        <div
          className="hero-statement"
          style={{
            position: 'absolute',
            top: '18vh',
            left: 0,
            zIndex: 30,
            paddingLeft: '64px',
            maxWidth: '580px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          {/* Bloque 1 — Manifiesto principal
              Paivio (1986): tres anclas semánticas concretas
              generan mayor retención — tecnología, neurociencia,
              humanidad activan tres nodos de memoria simultáneos.
              52px desktop · 28px mobile — jerarquía preservada. */}
          <div style={blockStyle(block >= 1)}>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontStyle: 'italic', color: '#c4bdb0',
              lineHeight: 1.12,
              marginBottom: '20px',
            }}>
              {HERO_CONTENT.manifesto}
            </h2>
          </div>

          {/* Bloque 2 — Segunda línea
              Gestalt: variación de color dentro de continuidad
              tipográfica — jerarquía sin ruptura visual. */}
          <div style={blockStyle(block >= 2)}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(18px, 2vw, 26px)',
              fontStyle: 'italic', color: '#8b9eb3',
              lineHeight: 1.3,
              marginBottom: '20px',
            }}>
              {HERO_CONTENT.secondLine}
            </p>
          </div>

          {/* Bloque 3 — Coda EN
              Kroll & Bialystok (2013): L2 activa corteza prefrontal
              dorsolateral — modo de categorización y evaluación.
              Bringhurst (1992): letter-spacing reducido compensa
              tamaño menor para mantener peso visual equivalente. */}
          <div style={blockStyle(block >= 3)}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(12px, 1.2vw, 15px)',
              letterSpacing: '0.04em', color: '#8b9eb3',
              lineHeight: 1.6,
            }}>
              {HERO_CONTENT.coda}
            </p>
          </div>

          {/* BOTONES MOBILE — solo visibles en mobile.
              Viven dentro del hero-statement para fluir
              naturalmente después del texto sin gaps.
              display: none en desktop — los botones desktop
              se renderizan por separado abajo con position absolute.
              Esta es la solución al problema de especificidad:
              Framer Motion sobreescribe media queries en el
              motion.div de los botones desktop — renderizar
              dos versiones es la única solución confiable. */}
          {showButtons && (
            <div
              className="hero-buttons-mobile"
              style={{ display: 'none', marginTop: '20px' }}
            >
              <ButtonsContent />
            </div>
          )}

        </div>
      )}

      {/* BOTONES DESKTOP — posición fija independiente.
          Solo visibles en desktop — ocultos en mobile via CSS.
          bottom 48px · left 64px — idéntico al primer commit.
          Cialdini (2001): CTA como puerta abierta —
          no elemento decorativo al final del contenido. */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="hero-buttons-desktop"
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
              flexWrap: 'wrap',
            }}
          >
            <ButtonsContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MEDIA QUERIES — solo afectan mobile (max-width: 430px)
          Desktop: sin ningún cambio respecto al primer commit.

          .hero-statement: top 56px fijos en mobile —
          18vh en desktop = 162px, demasiado espacio arriba.
          56px libera espacio para que todo quepa sin scroll.
          Apple HIG (2023): contenido visible sin scroll.

          h2: 28px en mobile — jerarquía visual preservada.
          Rayner (1998): 28px+ mantiene peso perceptivo
          en pantallas de alta densidad como el G60 (395ppi).

          .hero-buttons-mobile: visible solo en mobile.
          .hero-buttons-desktop: oculto en mobile.
          Estrategia de doble renderizado — solución definitiva
          al problema de especificidad CSS vs Framer Motion. */}
<style>{`
        @media (max-width: 430px) {

          /* Hero statement — ocupa exactamente el viewport.
             left:0 right:0 + padding pequeño garantiza que
             el texto no se corte a la derecha.
             top:52px bottom:52px define la altura disponible
             para que margin-top:auto funcione correctamente
             y todo quepa sin scroll.
             Apple HIG (2023): contenido visible sin scroll. */
          .hero-statement {
            top: 52px !important;
            bottom: 52px !important;
            left: 0 !important;
            right: 0 !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            width: 100vw !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          /* Tamaños de fuente — SIN CAMBIOS.
             Solo ajustamos márgenes para liberar espacio vertical.
             Treisman (1980): jerarquía visual preservada. */
          .hero-statement h2 {
            font-size: 28px !important;
            line-height: 1.05 !important;
            margin-bottom: 6px !important;
          }

          .hero-statement p:first-of-type {
            margin-bottom: 6px !important;
          }

          .hero-statement p:last-of-type {
            margin-bottom: 0px !important;
          }

          /* Botones — margin-top:auto los empuja al fondo
             del contenedor. padding-bottom:56px reserva
             espacio suficiente para los indicadores.
             Sin encimamiento. Sin scroll. */
          .hero-buttons-mobile {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-top: auto !important;
            padding-bottom: 56px !important;
          }

          .hero-buttons-desktop {
            display: none !important;
          }

          /* Indicadores — fijos en el fondo del viewport.
             Separados de los botones por padding-bottom:56px.
             Posner (1980): equilibrio perceptivo preservado. */
          .constellation-indicators {
            bottom: 8px !important;
            right: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}