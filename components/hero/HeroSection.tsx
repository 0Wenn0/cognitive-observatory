'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT, HERO_SCENES } from '@/lib/content';

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

    const stepPreFinal = () => {
      setPhase('pre-final');
      setProgressStep(4);
      setShowFlash(true);
      addTimeout(step4, 2200);
      nextActionRef.current = step4;
    };

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
      setTimeout(() => setShowHint(false), 3000);
    };

    nextActionRef.current = step1;
    addTimeout(step1, 800);
    addTimeout(() => setShowHint(true), 1500);

    return () => clearAllTimeouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getMicroStyle = (position: string) => {
    const base = {
      position: 'absolute' as const,
      zIndex: 30,
      maxWidth: '380px',
      fontFamily: "'DM Serif Display', serif",
      fontSize: 'clamp(14px, 2.5vw, 18px)',
      fontStyle: 'italic',
      color: '#8b9eb3',
      lineHeight: 1.7,
    };
    if (position === 'bottom-left') return { ...base, bottom: '120px', left: 'clamp(24px, 5vw, 64px)' };
    if (position === 'center')      return { ...base, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' as const };
    if (position === 'top-right')   return { ...base, top: '80px', right: 'clamp(24px, 5vw, 64px)', textAlign: 'right' as const };
    return { ...base, bottom: '120px', left: 'clamp(24px, 5vw, 64px)' };
  };

  const blockStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 1.1s ease, transform 1.1s ease',
  });

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#080b12',
    }}>

      <h1 style={{
        position: 'absolute', width: 1, height: 1,
        overflow: 'hidden', opacity: 0,
      }}>
        {HERO_CONTENT.manifesto}
      </h1>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: 'radial-gradient(ellipse at 38% 52%, #0d1624 0%, #080b12 68%)',
      }} aria-hidden="true" />

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

      {showHero && (
        <div style={{
          position: 'absolute',
          top: 'clamp(8vh, 10vh, 18vh)',
          left: 0, zIndex: 30,
          paddingLeft: 'clamp(20px, 6vw, 64px)',
          paddingRight: 'clamp(20px, 6vw, 48px)',
          maxWidth: '100vw',
          display: 'flex', flexDirection: 'column',
        }}>

          {/* Bloque 1 — Manifiesto principal
              clamp mínimo restaurado a 32px — igual que
              la primera versión aprobada en Vercel.
              Paivio (1986): tres anclas semánticas concretas. */}
          <div style={blockStyle(block >= 1)}>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontStyle: 'italic', color: '#c4bdb0',
              lineHeight: 1.12,
              marginBottom: 'clamp(14px, 2vh, 28px)',
            }}>
              {HERO_CONTENT.manifesto}
            </h2>
          </div>

          {/* Bloque 2 — Segunda línea
              clamp mínimo restaurado a 18px.
              Gestalt: variación de color dentro de continuidad. */}
          <div style={blockStyle(block >= 2)}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              fontStyle: 'italic', color: '#8b9eb3',
              lineHeight: 1.3,
              marginBottom: 'clamp(12px, 2vh, 28px)',
            }}>
              {HERO_CONTENT.secondLine}
            </p>
          </div>

          {/* Bloque 3 — Coda EN
              Kroll & Bialystok (2013): L2 activa modo de
              categorización y evaluación global. */}
          <div style={blockStyle(block >= 3)}>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(12px, 1.5vw, 15px)',
              letterSpacing: '0.04em', color: '#8b9eb3',
              lineHeight: 1.6,
              marginBottom: 'clamp(20px, 3vh, 40px)',
            }}>
              {HERO_CONTENT.coda}
            </p>
          </div>

        </div>
      )}

      {/* BOTONES — posición fija en desktop
          En mobile: relativos al texto vía media query
          para eliminar el gap enorme.
          Cialdini (2001): CTA como puerta abierta. */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 'clamp(56px, 8vh, 72px)',
              left: 'clamp(24px, 5vw, 64px)',
              zIndex: 30,
              display: 'flex',
              gap: 'clamp(12px, 3vw, 24px)',
              alignItems: 'center',
              flexWrap: 'wrap',
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
                fontSize: 'clamp(9px, 1.2vw, 12px)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: hoverPrimary ? '#c4bdb0' : '#8b9eb3',
                border: `0.5px solid ${hoverPrimary ? '#8b9eb3' : '#6a8aaa'}`,
                padding: 'clamp(12px, 2vh, 16px) clamp(20px, 4vw, 36px)',
                borderRadius: '30px', background: 'transparent',
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
                fontSize: 'clamp(9px, 1.2vw, 12px)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: hoverSecondary ? '#c4bdb0' : '#8b9eb3',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: hoverSecondary ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              {HERO_CONTENT.ctaSecondary}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .constellation-indicators {
            bottom: 24px !important;
            right: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          .hero-buttons {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            padding-left: clamp(20px, 6vw, 64px) !important;
            margin-top: 0px !important;
          }
        }
      `}</style>

    </section>
  );
}