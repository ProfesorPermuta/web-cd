import React, { JSX, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */

export type AnimatorStep = {
  /** Título mostrado en la cabecera del panel */
  title: string;
  /** Bloque de código (opcional). Se muestra en verde sobre fondo oscuro */
  code?: string;
  /** Texto descriptivo del paso */
  desc: string;
  /** Badge coloreado opcional junto al contador de pasos */
  badge?: { label: string; color: string };
};

export type StepAnimatorProps = {
  steps: AnimatorStep[];
  /**
   * Función que recibe el número de paso actual (base 1) y devuelve
   * el contenido del lienzo. Se sitúa encima del panel de información.
   */
  renderCanvas: (step: number) => React.ReactNode;
  /** Ancho máximo del componente en px. Por defecto 760. */
  maxWidth?: number;
};

/* ═══════════════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════════════ */
const BG   = '#0f172a'; // slate-900
const CARD = '#1e293b'; // slate-800
const DIM  = '#334155'; // slate-700

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function StepAnimator({
  steps,
  renderCanvas,
  maxWidth = 760,
}: StepAnimatorProps): JSX.Element {
  const [step, setStep] = useState(1);
  const s = steps[step - 1];
  const total = steps.length;

  return (
    <div style={{ maxWidth, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Lienzo + panel de info (comparten borde) ── */}
      <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${DIM}` }}>

        {/* Lienzo (contenido inyectado) */}
        <div>{renderCanvas(step)}</div>

        {/* Panel de información */}
        <div style={{ background: CARD, borderTop: `1px solid ${DIM}`, padding: '16px 20px' }}>

          {/* Fila de badges + título */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 8, marginBottom: 10, flexWrap: 'wrap',
          }}>
            {/* Contador de paso */}
            <span style={{
              background: '#3b82f6', color: 'white',
              borderRadius: 12, padding: '2px 10px',
              fontSize: 12, fontWeight: 'bold', whiteSpace: 'nowrap',
            }}>
              {step} / {total}
            </span>

            {/* Badge personalizado (ej. "HEAD → main") */}
            {s.badge && (
              <span style={{
                background: s.badge.color + '22',
                color: s.badge.color,
                border: `1px solid ${s.badge.color}66`,
                borderRadius: 12, padding: '2px 10px',
                fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace',
                whiteSpace: 'nowrap',
              }}>
                {s.badge.label}
              </span>
            )}

            {/* Título del paso */}
            <strong style={{ color: '#e2e8f0', fontSize: 15 }}>{s.title}</strong>
          </div>

          {/* Bloque de código */}
          {s.code && (
            <pre style={{
              background: BG, color: '#4ade80',
              padding: '10px 14px', borderRadius: 6,
              fontSize: 13, margin: '0 0 10px 0',
              overflowX: 'auto', fontFamily: 'monospace',
            }}>
              {s.code}
            </pre>
          )}

          {/* Descripción */}
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>
            {s.desc}
          </p>
        </div>
      </div>

      {/* ── Barra de navegación ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 14, marginTop: 14,
      }}>
        <button
          onClick={() => setStep(prev => Math.max(1, prev - 1))}
          disabled={step === 1}
          style={navBtn(step > 1)}
        >
          ← Anterior
        </button>

        {/* Puntos de paso */}
        <div style={{ display: 'flex', gap: 6 }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i + 1)}
              aria-label={`Ir al paso ${i + 1}`}
              style={{
                width: 10, height: 10, borderRadius: '50%',
                border: 'none', padding: 0, cursor: 'pointer',
                background: step === i + 1 ? '#60a5fa' : DIM,
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setStep(prev => Math.min(total, prev + 1))}
          disabled={step === total}
          style={navBtn(step < total)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function navBtn(active: boolean): React.CSSProperties {
  return {
    padding: '8px 22px',
    background: active ? '#3b82f6' : CARD,
    color: active ? 'white' : '#475569',
    border: 'none', borderRadius: 6,
    cursor: active ? 'pointer' : 'not-allowed',
    fontSize: 14, fontWeight: 'bold',
    transition: 'background 0.2s',
  };
}
