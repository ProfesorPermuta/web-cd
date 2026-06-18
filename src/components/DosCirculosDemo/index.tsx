import React from 'react';
import StepAnimator, { AnimatorStep } from '@site/src/components/StepAnimator';

/* ─── Pasos ─────────────────────────────────────────────────── */
const STEPS: AnimatorStep[] = [
  {
    title: 'Paso 1: Pintar el primer círculo',
    code:  '<circle cx={150} cy={110} r={40} fill="#3b82f6" />',
    desc:  'Dibujamos el primer círculo en el lado izquierdo del canvas, centrado verticalmente.',
  },
  {
    title: 'Paso 2: Pintar el segundo círculo',
    code:  '<circle cx={350} cy={110} r={40} fill="#3b82f6" />',
    desc:  'Añadimos un segundo círculo a la derecha, a la misma altura que el primero.',
  },
  {
    title: 'Paso 3: Unirlos con una línea',
    code:  '<line x1={190} y1={110} x2={310} y2={110} stroke="white" strokeWidth={3} />',
    desc:  'Trazamos una línea desde el borde derecho del primer círculo hasta el borde izquierdo del segundo.',
  },
];

/* ─── Canvas SVG ─────────────────────────────────────────────── */
function Canvas({ step }: { step: number }) {
  /* Elemento recién añadido en este paso → recibe el glow de acento */
  const glow = (fromStep: number) =>
    step === fromStep
      ? { filter: 'drop-shadow(0 0 8px #60a5fa)' }
      : {};

  const fade = (fromStep: number): React.CSSProperties => ({
    opacity: step >= fromStep ? 1 : 0,
    transition: 'opacity 0.4s ease',
  });

  return (
    <svg
      viewBox="0 0 500 220"
      style={{ width: '100%', display: 'block', background: '#0f172a' }}
      aria-label="Canvas del ejemplo DosCírculos"
    >
      {/* ── Círculo izquierdo ── */}
      <g style={fade(1)}>
        <circle
          cx={150} cy={110} r={40}
          fill="#3b82f6" stroke="white" strokeWidth={2}
          style={glow(1)}
        />
        <text
          x={150} y={115} textAnchor="middle"
          fill="white" fontSize={13} fontFamily="monospace"
        >
          A
        </text>
      </g>

      {/* ── Círculo derecho ── */}
      <g style={fade(2)}>
        <circle
          cx={350} cy={110} r={40}
          fill="#3b82f6" stroke="white" strokeWidth={2}
          style={glow(2)}
        />
        <text
          x={350} y={115} textAnchor="middle"
          fill="white" fontSize={13} fontFamily="monospace"
        >
          B
        </text>
      </g>

      {/* ── Línea de unión ── */}
      <g style={fade(3)}>
        <line
          x1={190} y1={110} x2={310} y2={110}
          stroke="#60a5fa" strokeWidth={3} strokeLinecap="round"
          style={glow(3)}
        />
      </g>
    </svg>
  );
}

/* ─── Componente principal ───────────────────────────────────── */
export default function DosCirculosDemo(): JSX.Element {
  return (
    <StepAnimator
      steps={STEPS}
      renderCanvas={(step) => <Canvas step={step} />}
    />
  );
}
