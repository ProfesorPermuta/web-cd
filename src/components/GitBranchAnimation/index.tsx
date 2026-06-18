import React, { JSX, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   STEP ANIMATOR  –  componente genérico y reutilizable
   Uso:
     import { StepAnimator } from '@site/src/components/GitBranchAnimation';
═══════════════════════════════════════════════════════════════ */

export interface StepData {
  title: string;
  /** Bloque de código opcional; se renderiza con fondo oscuro y color verde. */
  code?: string;
  desc: string;
}

export interface StepAnimatorProps {
  steps: StepData[];
  /**
   * Función que recibe el paso actual (1-based) y devuelve el nodo visual
   * que se pinta en el área de canvas superior.
   */
  renderCanvas: (step: number) => React.ReactNode;
  /**
   * Badge extra que aparece entre el contador de pasos y el título.
   * Útil para indicadores de estado como "HEAD → rama".
   */
  renderBadge?: (step: number) => React.ReactNode;
  /** Color de acento para el badge de paso y los puntos de navegación. */
  accentColor?: string;
}

function navBtnStyle(active: boolean, accent: string): React.CSSProperties {
  return {
    padding: '8px 22px',
    background: active ? accent : '#1e293b',
    color: active ? 'white' : '#475569',
    border: 'none', borderRadius: 6,
    cursor: active ? 'pointer' : 'not-allowed',
    fontSize: 14, fontWeight: 'bold',
    transition: 'background 0.2s',
  };
}

export function StepAnimator({
  steps,
  renderCanvas,
  renderBadge,
  accentColor = '#3b82f6',
}: StepAnimatorProps): JSX.Element {
  const [step, setStep] = useState(1);
  const s = steps[step - 1];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Canvas + info panel ── */}
      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #334155' }}>

        {/* Canvas: renderizado por el consumidor */}
        <div>{renderCanvas(step)}</div>

        {/* Panel inferior de información */}
        <div style={{ background: '#1e293b', borderTop: '1px solid #334155', padding: '16px 20px' }}>

          {/* Badges + título */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{
              background: accentColor, color: 'white',
              borderRadius: 12, padding: '2px 10px',
              fontSize: 12, fontWeight: 'bold', whiteSpace: 'nowrap',
            }}>
              {step} / {steps.length}
            </span>
            {renderBadge?.(step)}
            <strong style={{ color: '#e2e8f0', fontSize: 15 }}>{s.title}</strong>
          </div>

          {/* Bloque de código */}
          {s.code && (
            <pre style={{
              background: '#0f172a', color: '#4ade80',
              padding: '10px 14px', borderRadius: 6, fontSize: 13,
              margin: '0 0 10px 0', overflowX: 'auto', fontFamily: 'monospace',
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

      {/* ── Navegación ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 14 }}>
        <button
          onClick={() => setStep(prev => Math.max(1, prev - 1))}
          disabled={step === 1}
          style={navBtnStyle(step > 1, accentColor)}
        >
          ← Anterior
        </button>

        <div style={{ display: 'flex', gap: 6 }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i + 1)}
              aria-label={`Ir al paso ${i + 1}`}
              style={{
                width: 10, height: 10, borderRadius: '50%',
                border: 'none', padding: 0, cursor: 'pointer',
                background: step === i + 1 ? accentColor : '#334155',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setStep(prev => Math.min(steps.length, prev + 1))}
          disabled={step === steps.length}
          style={navBtnStyle(step < steps.length, accentColor)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT CONSTANTS  (específicos de GitBranchAnimation)
═══════════════════════════════════════════════════════════════ */
const W = 700;
const H = 350;
const R = 13; // commit circle radius

// Branch track Y positions
const YM  = 70;   // main
const YT1 = 185;  // TSK_1
const YT2 = 300;  // TSK_2

// Key X positions
const XX = {
  s:    40,   // start of main line
  c1:   110,  // commit_1
  fe:   178,  // forkEnd – where branch lines begin after diagonal
  c1t:  283,  // commit_1_TSK_1 / commit_1_TSK_2
  mT1:  398,  // merge_TSK_1 on main
  c2t2: 460,  // commit_2_TSK_2
  mT2:  578,  // merge_TSK_2 on main
  e:    648,  // end of main line
};

// Colors
const C = {
  main: '#60a5fa',  // blue-400
  t1:   '#4ade80',  // green-400
  t2:   '#fb923c',  // orange-400
  hd:   '#fbbf24',  // amber-400  (HEAD ring)
  bg:   '#0f172a',  // slate-900  (graph background)
  card: '#1e293b',  // slate-800  (panel background)
  tx:   '#cbd5e1',  // slate-300  (commit labels)
  dim:  '#334155',  // slate-700  (borders / dimmed elements)
};

/* ═══════════════════════════════════════════════════════════════
   STEP DEFINITIONS
═══════════════════════════════════════════════════════════════ */
const STEPS = [
  {
    title: 'Paso 1: Commit inicial en main',
    code:  'git commit -m "commit_1"',
    desc:  'Hacemos el primer commit en la rama main. Este será el punto de partida desde el que nacerán las dos ramas de trabajo.',
    br: 'main',  hx: XX.c1,   hy: YM,
  },
  {
    title: 'Paso 2: Crear rama TSK_1',
    code:  'git checkout -b TSK_1',
    desc:  'Creamos TSK_1 desde commit_1. HEAD se desplaza a TSK_1, pero ambas ramas apuntan todavía al mismo commit.',
    br: 'TSK_1', hx: XX.c1,   hy: YM,
  },
  {
    title: 'Paso 3: Crear rama TSK_2',
    code:  'git checkout main\ngit checkout -b TSK_2',
    desc:  'Volvemos a main y creamos TSK_2 también desde commit_1. Tres punteros (main, TSK_1, TSK_2) apuntan al mismo commit.',
    br: 'TSK_2', hx: XX.c1,   hy: YM,
  },
  {
    title: 'Paso 4: Commit en TSK_1',
    code:  'git checkout TSK_1\ngit commit -m "commit_1_TSK_1"',
    desc:  'Nos movemos a TSK_1 y creamos un commit. TSK_1 avanza; main y TSK_2 permanecen en commit_1.',
    br: 'TSK_1', hx: XX.c1t,  hy: YT1,
  },
  {
    title: 'Paso 5: Commit en TSK_2',
    code:  'git checkout TSK_2\ngit commit -m "commit_1_TSK_2"',
    desc:  'Nos movemos a TSK_2 y creamos un commit. Las dos ramas avanzan de forma completamente independiente.',
    br: 'TSK_2', hx: XX.c1t,  hy: YT2,
  },
  {
    title: 'Paso 6: Merge TSK_1 → main',
    code:  'git checkout main\ngit merge TSK_1',
    desc:  'Mergeamos TSK_1 en main. Se genera un commit de merge que une las dos líneas. Main avanza; TSK_2 queda temporalmente detrás.',
    br: 'main',  hx: XX.mT1,  hy: YM,
  },
  {
    title: 'Paso 7: Segundo commit en TSK_2',
    code:  'git checkout TSK_2\ngit commit -m "commit_2_TSK_2"',
    desc:  'Volvemos a TSK_2 y creamos un segundo commit. TSK_2 continúa su desarrollo aunque main ya tenga el merge de TSK_1.',
    br: 'TSK_2', hx: XX.c2t2, hy: YT2,
  },
  {
    title: 'Paso 8: Merge TSK_2 → main',
    code:  'git checkout main\ngit merge TSK_2',
    desc:  '¡Completado! Mergeamos TSK_2 en main. Main contiene ahora los commits de las dos ramas de desarrollo.',
    br: 'main',  hx: XX.mT2,  hy: YM,
  },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */

/** CSS style that fades in an element at a given step */
function show(step: number, from: number): React.CSSProperties {
  return { opacity: step >= from ? 1 : 0, transition: 'opacity 0.4s ease' };
}

/** Returns the color for a branch name */
function branchColor(br: string): string {
  if (br === 'main')  return C.main;
  if (br === 'TSK_1') return C.t1;
  return C.t2;
}


/* ═══════════════════════════════════════════════════════════════
   GIT GRAPH (SVG)
═══════════════════════════════════════════════════════════════ */
function GitGraph({ step }: { step: number }) {
  const s = STEPS[step - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', display: 'block', background: C.bg }}
      aria-label="Diagrama animado de ramas Git"
    >
      {/* ── Branch track labels (left margin) ── */}
      <text x={8} y={YM + 5} fill={C.main} fontSize={12} fontWeight="bold" fontFamily="monospace">main</text>
      <g style={show(step, 2)}>
        <text x={8} y={YT1 + 5} fill={C.t1} fontSize={12} fontWeight="bold" fontFamily="monospace">TSK_1</text>
      </g>
      <g style={show(step, 3)}>
        <text x={8} y={YT2 + 5} fill={C.t2} fontSize={12} fontWeight="bold" fontFamily="monospace">TSK_2</text>
      </g>

      {/* ── Main branch line (3 segments that appear progressively) ── */}
      <line x1={XX.s}   y1={YM} x2={XX.mT1} y2={YM} stroke={C.main} strokeWidth={3} strokeLinecap="round" style={show(step, 1)} />
      <line x1={XX.mT1} y1={YM} x2={XX.mT2} y2={YM} stroke={C.main} strokeWidth={3} strokeLinecap="round" style={show(step, 6)} />
      <line x1={XX.mT2} y1={YM} x2={XX.e}   y2={YM} stroke={C.main} strokeWidth={3} strokeLinecap="round" style={show(step, 8)} />

      {/* ── TSK_1 branch ── */}
      {/* Fork diagonal: commit_1 → branch track start */}
      <line x1={XX.c1}  y1={YM}  x2={XX.fe}  y2={YT1} stroke={C.t1} strokeWidth={3} strokeLinecap="round" style={show(step, 2)} />
      {/* Horizontal track */}
      <line x1={XX.fe}  y1={YT1} x2={XX.c1t} y2={YT1} stroke={C.t1} strokeWidth={3} strokeLinecap="round" style={show(step, 2)} />
      {/* Merge diagonal (dashed): commit_1_TSK_1 → merge_TSK_1 */}
      <line x1={XX.c1t} y1={YT1} x2={XX.mT1} y2={YM}  stroke={C.t1} strokeWidth={2.5} strokeDasharray="5 4" strokeLinecap="round" style={show(step, 6)} />

      {/* ── TSK_2 branch ── */}
      {/* Fork diagonal */}
      <line x1={XX.c1}   y1={YM}  x2={XX.fe}   y2={YT2} stroke={C.t2} strokeWidth={3} strokeLinecap="round" style={show(step, 3)} />
      {/* Horizontal track segment 1: forkEnd → commit_1_TSK_2 */}
      <line x1={XX.fe}   y1={YT2} x2={XX.c1t}  y2={YT2} stroke={C.t2} strokeWidth={3} strokeLinecap="round" style={show(step, 3)} />
      {/* Horizontal track segment 2: commit_1_TSK_2 → commit_2_TSK_2 */}
      <line x1={XX.c1t}  y1={YT2} x2={XX.c2t2} y2={YT2} stroke={C.t2} strokeWidth={3} strokeLinecap="round" style={show(step, 7)} />
      {/* Merge diagonal (dashed): commit_2_TSK_2 → merge_TSK_2 */}
      <line x1={XX.c2t2} y1={YT2} x2={XX.mT2}  y2={YM}  stroke={C.t2} strokeWidth={2.5} strokeDasharray="5 4" strokeLinecap="round" style={show(step, 8)} />

      {/* ── HEAD ring – moves to current HEAD commit via CSS transform ── */}
      <g style={{ transform: `translate(${s.hx}px, ${s.hy}px)`, transition: 'transform 0.4s ease' }}>
        <circle r={R + 9} fill="none" stroke={C.hd} strokeWidth={2.5}
          style={{ filter: 'drop-shadow(0 0 6px #fbbf2488)' }} />
      </g>

      {/* ── Commit nodes ── */}

      {/* commit_1  – label to the LEFT to avoid overlap with fork diagonals */}
      <g style={show(step, 1)}>
        <circle cx={XX.c1} cy={YM} r={R} fill={C.main} stroke="white" strokeWidth={2} />
        <text x={XX.c1 - R - 8} y={YM + 4} textAnchor="end" fill={C.tx} fontSize={10} fontFamily="monospace">
          commit_1
        </text>
      </g>

      {/* commit_1_TSK_1 */}
      <g style={show(step, 4)}>
        <circle cx={XX.c1t} cy={YT1} r={R} fill={C.t1} stroke="white" strokeWidth={2} />
        <text x={XX.c1t} y={YT1 + R + 16} textAnchor="middle" fill={C.tx} fontSize={10} fontFamily="monospace">
          commit_1_TSK_1
        </text>
      </g>

      {/* commit_1_TSK_2 */}
      <g style={show(step, 5)}>
        <circle cx={XX.c1t} cy={YT2} r={R} fill={C.t2} stroke="white" strokeWidth={2} />
        <text x={XX.c1t} y={YT2 + R + 16} textAnchor="middle" fill={C.tx} fontSize={10} fontFamily="monospace">
          commit_1_TSK_2
        </text>
      </g>

      {/* merge_TSK_1 – blue circle with green border; label above */}
      <g style={show(step, 6)}>
        <circle cx={XX.mT1} cy={YM} r={R} fill={C.main} stroke={C.t1} strokeWidth={3} />
        <text x={XX.mT1} y={YM - R - 10} textAnchor="middle" fill={C.tx} fontSize={10} fontFamily="monospace">
          merge_TSK_1
        </text>
      </g>

      {/* commit_2_TSK_2 */}
      <g style={show(step, 7)}>
        <circle cx={XX.c2t2} cy={YT2} r={R} fill={C.t2} stroke="white" strokeWidth={2} />
        <text x={XX.c2t2} y={YT2 + R + 16} textAnchor="middle" fill={C.tx} fontSize={10} fontFamily="monospace">
          commit_2_TSK_2
        </text>
      </g>

      {/* merge_TSK_2 – blue circle with orange border; label above */}
      <g style={show(step, 8)}>
        <circle cx={XX.mT2} cy={YM} r={R} fill={C.main} stroke={C.t2} strokeWidth={3} />
        <text x={XX.mT2} y={YM - R - 10} textAnchor="middle" fill={C.tx} fontSize={10} fontFamily="monospace">
          merge_TSK_2
        </text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT  –  GitBranchAnimation usa StepAnimator como shell
═══════════════════════════════════════════════════════════════ */

/** Datos de paso mínimos para StepAnimator (title, code, desc). */
const STEP_DATA: StepData[] = STEPS.map(({ title, code, desc }) => ({ title, code, desc }));

export default function GitBranchAnimation(): JSX.Element {
  return (
    <StepAnimator
      steps={STEP_DATA}
      renderCanvas={(step) => <GitGraph step={step} />}
      renderBadge={(step) => {
        const s = STEPS[step - 1];
        const bCol = branchColor(s.br);
        return (
          <span style={{
            background: bCol + '22', color: bCol,
            border: `1px solid ${bCol}66`,
            borderRadius: 12, padding: '2px 10px',
            fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace',
          }}>
            HEAD → {s.br}
          </span>
        );
      }}
    />
  );
}
