'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// SISTEMA ATMOSFÉRICO — Cognitive Observatory v2
// Dirección visual: "Materia cognitiva suspendida"
//
// CAMBIO CRÍTICO respecto a v1:
// Los blobs grandes (InkDiffusion) se eliminan — generaban
// sensación de wallpaper genérico y demo WebGL.
// El 70% atmosférico lo manejan gradientes CSS en HeroSection.
// Three.js solo hace lo que CSS no puede: profundidad espacial 3D.
//
// Composición:
//   CAPA A — Volumetric Dust (120 partículas microscópicas)
//   CAPA B — Micro partículas cognitivas (40, casi invisibles)

// ─────────────────────────────────────────────────────────────
// CAPA A — VOLUMETRIC DUST
// Polvo suspendido en luz lateral. Sensación museográfica.
// Partículas microscópicas — profundidad espacial, no espectáculo.
// ─────────────────────────────────────────────────────────────

const dustVertexShader = `
  uniform float uTime;
  attribute float aSpeed;
  attribute float aOffset;
  attribute float aOpacity;
  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;
    vec3 pos = position;

    // Drift contemplativo — ciclo 5–10 segundos.
    // Tres frecuencias bajas: elimina periodicidad visible.
    float t = uTime * aSpeed + aOffset;
    pos.x += sin(t * 0.18 + aOffset * 0.6) * 0.25;
    pos.y += cos(t * 0.13 + aOffset * 0.9) * 0.20;
    pos.z += sin(t * 0.09 + aOffset * 1.2) * 0.12;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Tamaño microscópico — polvo, no partículas visibles.
    // Varía con opacidad para simular distancia diferencial.
    gl_PointSize = (1.2 + aOpacity * 1.8) * (280.0 / -mvPosition.z);
  }
`;

const dustFragmentShader = `
  varying float vOpacity;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Borde suave — partícula se disuelve, no termina.
    float alpha = smoothstep(0.5, 0.05, dist) * vOpacity * 0.10;

    // Color: azul-gris frío. Polvo cognitivo, no luz eléctrica.
    gl_FragColor = vec4(0.28, 0.38, 0.58, alpha);
  }
`;

function VolumetricDust() {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 120;

  const { positions, speeds, offsets, opacities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);
    const offsets   = new Float32Array(COUNT);
    const opacities = new Float32Array(COUNT);

for (let i = 0; i < COUNT; i++) {
  // Sin clusters matemáticos — distribución caótica real.
  // Los clusters anteriores generaban el patrón hexagonal.
  positions[i * 3]     = 1 + Math.pow(Math.random(), 0.7) * 11;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 2] = -2 + Math.random() * -10;

  speeds[i]    = 0.06 + Math.random() * 0.08;
  offsets[i]   = Math.random() * Math.PI * 6; // más variación de fase
  opacities[i] = 0.05 + Math.random() * 0.4;
}

    return { positions, speeds, offsets, opacities };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSpeed',   new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aOffset',  new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [positions, speeds, offsets, opacities]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   dustVertexShader,
    fragmentShader: dustFragmentShader,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  }), []);

useFrame((state) => {
  if (meshRef.current) {
    (meshRef.current.material as THREE.ShaderMaterial)
      .uniforms.uTime.value = state.clock.getElapsedTime();
  }
});

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

// ─────────────────────────────────────────────────────────────
// CAPA B — MICRO PARTÍCULAS COGNITIVAS
// Casi invisibles individualmente.
// Su efecto es colectivo y subliminal — presencia que se siente.
// ─────────────────────────────────────────────────────────────

const microVertexShader = `
  uniform float uTime;
  attribute float aSpeed;
  attribute float aOffset;

  void main() {
    vec3 pos = position;

    // Movimiento mínimo — el usuario se pregunta si se mueve.
    float t = uTime * aSpeed + aOffset;
    pos.x += sin(t * 0.22 + aOffset * 1.4) * 0.12;
    pos.y += cos(t * 0.16 + aOffset * 0.8) * 0.10;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 0.8 * (220.0 / -mvPosition.z);
  }
`;

const microFragmentShader = `
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Opacidad subliminal — presencia cognitiva, no visual.
    float alpha = smoothstep(0.5, 0.0, dist) * 0.05;
    gl_FragColor = vec4(0.55, 0.68, 0.88, alpha);
  }
`;

function MicroParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 40;

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);
    const offsets   = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = Math.random() * -5;
      speeds[i]  = 0.04 + Math.random() * 0.018;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, offsets };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSpeed',   new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aOffset',  new THREE.BufferAttribute(offsets, 1));
    return geo;
  }, [positions, speeds, offsets]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   microVertexShader,
    fragmentShader: microFragmentShader,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  }), []);

useFrame((state) => {
  if (meshRef.current) {
    (meshRef.current.material as THREE.ShaderMaterial)
      .uniforms.uTime.value = state.clock.getElapsedTime();
  }
});

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function ParticleSystem() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 5,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
      >
        <VolumetricDust />
        <MicroParticles />
      </Canvas>
    </div>
  );
}