'use client';

import { useState } from 'react';
import { CONSTELLATION_NODES } from '@/lib/nodes';
import styles from './ObservatoryWorld.module.css';

const FIRST_NODES = ['systems-thinking', 'neuroscience', 'data-analysis'];

export default function ObservatoryWorld() {
  const nodes = FIRST_NODES
    .map((id) => CONSTELLATION_NODES.find((node) => node.id === id))
    .filter((node): node is NonNullable<typeof node> => Boolean(node));
  const [selectedId, setSelectedId] = useState('systems-thinking');
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];

  if (!selected) return null;

  return (
    <section id="constellation" className={styles.world} aria-labelledby="field-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>COGNITIVE OBSERVATORY · FIELD 01</p>
        <h2 id="field-title" className={styles.title}>El campo de las conexiones</h2>
        <p className={styles.intro}>Algunas ideas solo revelan su forma cuando observamos cómo se relacionan.</p>
      </header>

      <div className={styles.field} aria-label="Constelación interactiva de tres conceptos">
        <svg className={styles.connections} viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
          {nodes.filter((node) => node.id !== 'systems-thinking').map((node) => {
            const center = nodes.find((item) => item.id === 'systems-thinking');
            if (!center) return null;
            return (
              <line
                key={node.id}
                x1={center.position.x * 1000}
                y1={center.position.y * 600}
                x2={node.position.x * 1000}
                y2={node.position.y * 600}
                className={selectedId === node.id || selectedId === center.id ? styles.connectionActive : styles.connection}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const active = selectedId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`${styles.node} ${active ? styles.nodeSelected : ''}`}
              style={{
                left: `${node.position.x * 100}%`,
                top: `${node.position.y * 100}%`,
                '--node-color': node.strokeColor,
                '--node-size': `${node.size}px`,
              } as React.CSSProperties}
              onClick={() => setSelectedId(node.id)}
              aria-pressed={active}
              aria-label={`Explorar ${node.labelES}`}
            >
              <span className={styles.nodeCore} />
              <span className={styles.nodeLabel}>{node.labelES}</span>
            </button>
          );
        })}
        <p className={styles.hint}>Selecciona una idea para observarla</p>
      </div>

      <article className={styles.observation} aria-live="polite" aria-atomic="true">
        <div className={styles.observationMeta}>
          <span>OBSERVACIÓN</span>
          <span className={styles.observationIndex}>
            {String(nodes.findIndex((node) => node.id === selected.id) + 1).padStart(2, '0')} / {String(nodes.length).padStart(2, '0')}
          </span>
        </div>
        <h3>{selected.labelES}</h3>
        <p>{selected.panel.description}</p>
        <div className={styles.tags}>
          {selected.panel.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </article>

      <footer className={styles.footer}>
        <span>Un sistema no se comprende desde un solo punto.</span>
        <button type="button" onClick={() => setSelectedId('systems-thinking')}>Volver al centro <span aria-hidden="true">↗</span></button>
      </footer>
    </section>
  );
}
