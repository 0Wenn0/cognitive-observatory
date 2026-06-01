'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT } from '@/lib/content';

// Componente mobile — experiencia contemplativa editorial.
// NO es una versión comprimida del hero desktop.
// Es una experiencia propia, diseñada para viewport vertical.
// ChatGPT Debug Summary (2026): hero desktop es cinematográfico
// y widescreen — mobile debe ser "portable contemplative fragment".
// Apple HIG (2023): contenido visible sin scroll en primera pantalla.

export default function MobileHero() {
  const [showContent, setShowContent] = useState(false);
  const [block, setBlock]             = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const timeoutsRef                   = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
    return t;
  };

  useEffect(() => {
    // Secuencia mobile — más directa que desktop.
    // El usuario mobile necesita contenido inmediato.
    // Nielsen Norman Group (2018): mobile users scan faster
    // and expect content within 2-3 seconds.
    addTimeout(() => setShowContent(true), 800);
    addTimeout(() => setBlock(1), 1000);
    addTimeout(() => setBlock(2), 2500);
    addTimeout(() => setBlock(3), 4000);
    addTimeout(() => setShowButtons(true), 5200);

    return () => timeoutsRef.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blockStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.9s ease, transform 0.9s ease',
  });

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100dvh',
      overflow: 'hidden',
      overflowY: 'hidden',
      backgroundColor: '#080b12',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    }}>

      {/* SEO — texto semántico invisible para bots.
          Google Search Central (2023): bots no leen WebGL. */}
      <h1 style={{
        position: 'absolute', width: 1, height: 1,
        overflow: 'hidden', opacity: 0,
      }}>
        {HERO_CONTENT.manifesto}
      </h1>

      {/* Fondo atmosférico — gradiente contemplativo.
          Adelson (2000): profundidad tridimensional habitable. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 38% 52%, #0d1624 0%, #080b12 68%)',
      }} aria-hidden="true" />

      {/* TAG — ancla de identidad desde frame 0.
          LeDoux (1996): sin ancla visual, la amígdala activa
          alerta de ambigüedad en 80-100ms. */}
      <div style={{
        position: 'relative', zIndex: 10,
        paddingTop: '32px',
        display: 'flex', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: '10px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#8b9eb3',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ display: 'block', width: '20px', height: '0.5px', background: '#2a3a56' }} />
          Cognitive Observatory
          <span style={{ display: 'block', width: '20px', height: '0.5px', background: '#2a3a56' }} />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL — flujo vertical editorial.
          En mobile el contenido fluye naturalmente —
          no flota en posición absoluta como en desktop.
          Esto elimina todos los problemas de gap y overflow.
          El espacio entre elementos es flex, no absolute.
          flex: 1 hace que este bloque ocupe todo el espacio
          disponible entre el tag y los botones. */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}>

        {showContent && (
          <>
            {/* Bloque 1 — Manifiesto principal.
                28px — aprobado. Rayner (1998): mantiene
                jerarquía visual en alta densidad (395ppi G60).
                Paivio (1986): tres anclas semánticas concretas. */}
            <div style={blockStyle(block >= 1)}>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '28px',
                fontStyle: 'italic', color: '#c4bdb0',
                lineHeight: 1.1,
                marginBottom: '16px',
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
                fontStyle: 'italic', color: '#8b9eb3',
                lineHeight: 1.3,
                marginBottom: '14px',
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
                letterSpacing: '0.04em', color: '#8b9eb3',
                lineHeight: 1.6,
              }}>
                {HERO_CONTENT.coda}
              </p>
            </div>
          </>
        )}
      </div>

      {/* BOTONES — integrados al flujo vertical.
          En mobile los botones son parte del flujo —
          no flotan en posición absoluta.
          Esto elimina el gap enorme y el problema de scroll.
          safe-area-inset-bottom respeta el UI del dispositivo.
          Cialdini (2001): CTA como puerta abierta. */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'relative', zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '0 20px',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 48px)',
              boxSizing: 'border-box',
              flexShrink: 0,
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
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#8b9eb3',
                border: '0.5px solid #6a8aaa',
                padding: '16px 24px',
                borderRadius: '30px', background: 'transparent',
                cursor: 'pointer', width: '100%',
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
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#6a8aaa',
                background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'center',
              }}
            >
              {HERO_CONTENT.ctaSecondary}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INDICADORES — centro inferior.
          Posición absoluta solo para los indicadores —
          elemento pequeño que no afecta el flujo del contenido.
          Posner (1980): equilibrio perceptivo en zona inferior. */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(env(safe-area-inset-bottom) + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex', alignItems: 'center',
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
                <div style={{
                  width: '12px', height: '0.5px',
                  backgroundColor: '#2a3a56',
                }} />
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

    </section>
  );
}