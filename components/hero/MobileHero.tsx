'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT } from '@/lib/content';

// MOBILE HERO — experiencia contemplativa editorial propia.
// NO es una versión comprimida del hero desktop.
// Diseñada desde cero para viewport vertical móvil.
// ChatGPT Debug Summary (2026): "a portable contemplative fragment"
// vs "a compressed cinematic canvas."
// Apple HIG (2023): contenido visible sin scroll en primera pantalla.

export default function MobileHero() {
  const [block, setBlock]           = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const timeoutsRef                 = useRef<NodeJS.Timeout[]>([]);

  const add = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  };

  useEffect(() => {
    // Secuencia mobile — directa y contemplativa.
    // Nielsen Norman Group (2018): mobile users necesitan
    // contenido visible en menos de 3 segundos.
    add(() => setBlock(1), 800);
    add(() => setBlock(2), 2200);
    add(() => setBlock(3), 3600);
    add(() => setShowButtons(true), 4800);
    return () => timeoutsRef.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    }}>

      {/* SEO — invisible para el usuario, visible para Google.
          Google Search Central (2023): bots no leen WebGL. */}
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
        paddingTop: '36px',
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

      {/* CONTENIDO PRINCIPAL — flujo vertical editorial.
          flex: 1 ocupa todo el espacio disponible entre
          el tag y los botones — sin gaps, sin scroll.
          justify-content: center centra verticalmente
          el texto en ese espacio disponible.
          Esta arquitectura elimina todos los problemas
          de posición absoluta que causaban el scroll. */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        boxSizing: 'border-box',
        gap: '12px',
      }}>

        {/* Bloque 1 — Manifiesto principal.
            28px — aprobado. Rayner (1998): mantiene
            jerarquía visual en alta densidad (395ppi G60).
            Paivio (1986): tres anclas semánticas concretas
            generan mayor retención que dos elementos. */}
        <div style={blockStyle(block >= 1)}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '28px',
            fontStyle: 'italic',
            color: '#c4bdb0',
            lineHeight: 1.1,
            margin: 0,
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
            categorización y evaluación global en el cerebro.
            Subordinada visualmente — IBM Plex vs DM Serif. */}
        <div style={blockStyle(block >= 3)}>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#6a8aaa',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {HERO_CONTENT.coda}
          </p>
        </div>

      </div>

      {/* BOTONES — parte del flujo vertical, no absolutos.
          flexShrink: 0 garantiza que no se compriman.
          paddingBottom con safe-area respeta el UI del
          dispositivo — Android gesture nav + Safari bottom bar.
          Cialdini (2001): CTA como puerta abierta,
          no elemento decorativo flotante. */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              padding: '0 24px',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 40px)',
              boxSizing: 'border-box',
            }}
          >
            <button
              onClick={() => document.getElementById('constellation')
                ?.scrollIntoView({ behavior: 'smooth' })}
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
              onClick={() => document.getElementById('constellation')
                ?.scrollIntoView({ behavior: 'smooth' })}
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

    </div>
  );
}