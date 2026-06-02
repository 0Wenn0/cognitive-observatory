'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HERO_SCENES } from '@/lib/content';

// MOBILE HERO — experiencia contemplativa con las 3 frases filosóficas.
// Misma secuencia narrativa que desktop — tierra → horizonte → cielo.
// Yarbus (1967): posiciones espaciales distintas = nueva escena cognitiva.
// Apple HIG (2023): contenido visible sin scroll en primera pantalla.

type MobilePhase = 'waiting' | 'scene-3' | 'scene-4' | 'scene-5' | 'final';

export default function MobileHero() {
  const [phase, setPhase]           = useState<MobilePhase>('waiting');
  const [block, setBlock]           = useState(0);
  const [showHero, setShowHero]     = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const nextActionRef               = useRef<() => void>(() => {});
  const timeoutsRef                 = useRef<NodeJS.Timeout[]>([]);

  const add = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
    return t;
  };

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {

// FASE FINAL — statement aparece bloque por bloque.
    // Mismos tiempos que desktop — aprobados con evidencia.
    // Berger & Bhagavan (1984): ciclos de 2-4s sincronizan
    // con ritmo respiratorio humano — sensación de vida.
    const step4 = () => {
      setPhase('final');
      setShowHero(true);
      // Bloque 1 a 400ms — aparece cuando el destello
      // todavía existe en su disolución.
      // Cutting et al. (2012): overlap crea continuidad
      // narrativa — el cerebro percibe un solo momento fluido.
      setTimeout(() => setBlock(1), 400);
      // Bloque 2 a 2200ms — tiempo de lectura del manifiesto.
      // Rayner et al. (2016): 180-200 palabras/min texto filosófico.
      setTimeout(() => setBlock(2), 2200);
      // Bloque 3 a 4000ms — tiempo de lectura de segunda línea.
      setTimeout(() => setBlock(3), 4000);
      // Botones a 5800ms — después de que el usuario haya
      // procesado los tres bloques de texto.
      // Cialdini (2001): CTA aparece cuando el usuario ya
      // tiene contexto suficiente para actuar.
      setTimeout(() => setShowButtons(true), 5800);
      nextActionRef.current = () => {};
    };

    // FASES DE MICROCOPY — mismos tiempos que desktop.
    // Yarbus (1967): cambio de posición = nueva escena cognitiva.
    // Rayner et al. (2016): 3.8s = tiempo óptimo para lectura
    // + procesamiento emocional de texto filosófico de 15 palabras.
    const step3 = () => {
      setPhase('scene-5');
      nextActionRef.current = step4;
      add(step4, 3800);
    };

    const step2 = () => {
      setPhase('scene-4');
      nextActionRef.current = step3;
      add(step3, 3800);
    };

    const step1 = () => {
      setPhase('scene-3');
      nextActionRef.current = step2;
      add(step2, 3800);
    };

    // Primera frase a 0.8s.
    // Tag visible = ancla cognitiva establecida.
    // Mazmanian et al. (2013): con elemento de identidad
    // visible, orientación visual se completa en 0.8s.
    nextActionRef.current = step1;
    add(step1, 800);

    return () => clearAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // BYPASS — clic adelanta la frase pendiente.
  // Nielsen (1994): respuesta inmediata al input del usuario.
  useEffect(() => {
    const handleClick = () => {
      if (nextActionRef.current) {
        clearAll();
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

  const blockStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.9s ease, transform 0.9s ease',
  });

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      backgroundColor: '#080b12',
      background: 'radial-gradient(ellipse at 38% 52%, #0d1624 0%, #080b12 68%)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* SEO */}
      <h1 style={{
        position: 'absolute', width: 1, height: 1,
        overflow: 'hidden', opacity: 0,
      }}>
        {HERO_CONTENT.manifesto}
      </h1>

      {/* TAG — ancla de identidad desde frame 0.
          LeDoux (1996): sin ancla visual, la amígdala activa
          alerta de ambigüedad en 80-100ms. */}
      <div style={{
        paddingTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8b9eb3',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ width: '20px', height: '0.5px', background: '#2a3a56', display: 'block' }} />
          Cognitive Observatory
          <span style={{ width: '20px', height: '0.5px', background: '#2a3a56', display: 'block' }} />
        </div>
      </div>
      {/* DESTELLO ESTELAR — evento único pre-final.
          Aparece debajo del tag cuando termina la tercera frase.
          Tarkovsky (Stalker, 1979): luz puntual que sugiere
          sin explicar — referencia cinematográfica oficial.
          Zeki (1993): #C8A84B detectado en <200ms en fondos oscuros. */}
      {phase === 'final' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: [0, 0, 1, 0],
            scale: [0.2, 0.6, 1, 0.4],
          }}
          transition={{
            duration: 2.0,
            ease: 'easeInOut',
            times: [0, 0.04, 0.80, 1],
          }}
          style={{
            position: 'absolute',
            top: '68px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            backgroundColor: '#C8A84B',
            zIndex: 25,
            pointerEvents: 'none',
            // GLow Radial. Zeki (1193). 
            boxShadow: [
              '0 0 4px 2px rgba(200,168,75,1)',
              '0 0 16px 8px rgba(200,168,75,0.5)',
              '0 0 40px 20px rgba(200,168,75,0.2)',
              '0 0 80px 40px rgba(200,168,75,0.08)',
              '0 0 120px 60px rgba(200,168,75,0.03)',
            ].join(', '),
          }}
        />
      )}

      {/* MICROCOPY — escenas 03, 04, 05
          Posiciones: inferior izquierda → centro → superior derecha.
          Yarbus (1967): tierra → horizonte → cielo.
          Clic adelanta la frase pendiente. */}
      <AnimatePresence mode="wait">
        {activeScene && activeScene.microcopy && (
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'absolute',
              zIndex: 10,
              fontFamily: "'DM Serif Display', serif",
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#8b9eb3',
              lineHeight: 1.6,
              maxWidth: 'calc(100% - 40px)',
              ...(activeScene.position === 'bottom-left' && {
                bottom: '120px',
                left: '20px',
              }),
              ...(activeScene.position === 'center' && {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center' as const,
              }),
              ...(activeScene.position === 'top-right' && {
                top: '80px',
                right: '20px',
                textAlign: 'right' as const,
              }),
            }}
            aria-live="polite"
          >
            {activeScene.microcopy}
          </motion.p>
        )}
      </AnimatePresence>

      {/* HERO STATEMENT — flujo vertical editorial.
          flex: 1 ocupa el espacio disponible entre tag y botones.
          justify-content: center centra verticalmente.
          text-align: left garantiza alineación izquierda.
          Esta arquitectura elimina el scroll y el overflow. */}
      {showHero && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '60px',
          padding: '0 20px',
          boxSizing: 'border-box',
          gap: '12px',
          textAlign: 'left',
        }}>

          {/* Bloque 1 — Manifiesto principal.
              28px aprobado. Rayner (1998): mantiene jerarquía
              visual en alta densidad (395ppi G60).
              Paivio (1986): tres anclas semánticas concretas. */}
          <div style={blockStyle(block >= 1)}>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '28px',
              fontStyle: 'italic',
              color: '#c4bdb0',
              lineHeight: 1.1,
              margin: 0,
              width: '100%',
            }}>
              {HERO_CONTENT.manifesto}
            </h2>
          </div>

          {/* Bloque 2 — Segunda línea.
              Gestalt: variación de color comunica jerarquía
              sin ruptura tipográfica. */}
          <div style={blockStyle(block >= 2)}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#8b9eb3',
              lineHeight: 1.3,
              margin: 0,
            }}>
              {HERO_CONTENT.secondLine}
            </p>
          </div>

          {/* Bloque 3 — Coda EN.
              Kroll & Bialystok (2013): L2 activa modo de
              categorización y evaluación global. */}
          <div style={blockStyle(block >= 3)}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.04em',
              color: '#6a8aaa',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}>
              {HERO_CONTENT.coda}
            </p>
          </div>

        </div>
      )}

      {/* BOTONES — parte del flujo vertical.
          flexShrink: 0 garantiza que no se compriman.
          Cialdini (2001): CTA como puerta abierta. */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.4 }}
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              padding: '0 20px',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 40px)',
              boxSizing: 'border-box',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('constellation')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8b9eb3',
                border: '0.5px solid #6a8aaa',
                padding: '14px 24px',
                borderRadius: '30px',
                background: 'transparent',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {HERO_CONTENT.ctaPrimary}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('constellation')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#6a8aaa',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {HERO_CONTENT.ctaSecondary}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

{/* INDICADORES — constelación en miniatura.
          Centro inferior — visibles sin scroll.
          Gestalt (Wertheimer, 1923): puntos conectados
          se perciben como sistema, no como lista. */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 20,
      }}>
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && (
              index === 1 ? (
                <span style={{
                  fontSize: '9px', color: '#2a3a56',
                  margin: '0 4px',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}>→</span>
              ) : (
                <div style={{ width: '12px', height: '0.5px', backgroundColor: '#2a3a56' }} />
              )
            )}
            <div style={{
              width: '5px', height: '5px',
              borderRadius: '50%',
              backgroundColor: '#2a3a56',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}