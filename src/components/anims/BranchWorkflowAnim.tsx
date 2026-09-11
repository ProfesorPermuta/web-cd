import { useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeTypes,
  type NodeProps,
} from '@xyflow/react';
import { motion } from 'motion/react';
import '@xyflow/react/dist/style.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type CommitData = { label: string; color: string; visible: boolean };
type LabelData = { label: string; color: string; visible: boolean; isHead?: boolean };

// ─── Custom Nodes ─────────────────────────────────────────────────────────────

function CommitNode({ data }: NodeProps & { data: CommitData }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        data.visible
          ? { scale: 1, opacity: 1 }
          : { scale: 0.4, opacity: 0 }
      }
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      style={{
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: data.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 17,
        color: '#fff',
        border: '3px solid #1e293b',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {data.label}
      <Handle type="target" position={Position.Left} style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} id="top" />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} id="bottom" />
    </motion.div>
  );
}

function LabelNode({ data }: NodeProps & { data: LabelData }) {
  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={
        data.visible
          ? { y: 0, opacity: 1 }
          : { y: -8, opacity: 0 }
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        padding: '4px 11px',
        borderRadius: 6,
        background: data.isHead ? '#7c3aed' : data.color,
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
        boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {data.label}
    </motion.div>
  );
}

const nodeTypes: NodeTypes = {
  commit: CommitNode as unknown as NodeTypes[string],
  label: LabelNode as unknown as NodeTypes[string],
};

const ORIGIN_POS = { x: 60, y: 130 }
const OFFSET = {
  x: 150,
  y: 130
};

/**
 * Devuelve la posición dado el cuadrante
 * @param i 
 * @param j 
 */
const getPos = (fila: number, columna: number) => {
  return {
    x: ORIGIN_POS.x + columna * OFFSET.x,
    y: ORIGIN_POS.y + fila * OFFSET.y
  }
}

const getPosLabel = (fila: number, columna: number, collision: number = 0) => {
  return {
    x: ORIGIN_POS.x + columna * OFFSET.x + 20 ,
    y: ORIGIN_POS.y + fila * OFFSET.y - 60 + collision * 30
  }
}

// ─── Graph Data ───────────────────────────────────────────────────────────────

const MAIN = '#f59e0b';
const FEATURE = '#6366f1';
const MERGE = '#22c55e';

const posA = getPos(0, 0);
const posB = getPos(0, 1);
const posC = getPos(1, 2);
const posD = getPos(1, 3);
const posM = getPos(0, 4);

const posHeadB = getPosLabel(0, 1, 0);
const posMainB = getPosLabel(0, 1, 1);
const posFeatureAtB = getPosLabel(0, 1, -1);
const posFeatureD = getPosLabel(1, 3, 0);
const posHeadM = getPosLabel(0, 4, 0);
const posMainM = getPosLabel(0, 4, 1);


const ALL_NODES: Node[] = [
  // ── Main branch commits ──
  { id: 'A', type: 'commit', position: { x: posA.x, y: posA.y }, data: { label: 'A', color: MAIN, visible: false } },
  { id: 'B', type: 'commit', position: { x: posB.x, y: posB.y }, data: { label: 'B', color: MAIN, visible: false } },
  // ── Feature branch commits ──
  { id: 'C', type: 'commit', position: { x: posC.x, y: posC.y }, data: { label: 'C', color: FEATURE, visible: false } },
  { id: 'D', type: 'commit', position: { x: posD.x, y: posD.y }, data: { label: 'D', color: FEATURE, visible: false } },
  // ── Merge commit ──
  { id: 'M', type: 'commit', position: { x: posM.x, y: posM.y }, data: { label: 'M', color: MERGE, visible: false } },
  // ── Branch labels ──
  { id: 'head-B', type: 'label', position: { x: posHeadB.x, y: posHeadB.y }, data: { label: 'HEAD', color: '#7c3aed', visible: false, isHead: true } },
  { id: 'main-B', type: 'label', position: { x: posMainB.x, y: posMainB.y }, data: { label: 'main', color: MAIN, visible: false } },
  { id: 'feature-at-B', type: 'label', position: { x: posFeatureAtB.x, y: posFeatureAtB.y }, data: { label: 'feature/registro-usuarios', color: FEATURE, visible: false } },
  { id: 'feature-D', type: 'label', position: { x: posFeatureD.x, y: posFeatureD.y }, data: { label: 'feature/registro-usuarios', color: FEATURE, visible: false } },
  { id: 'head-M', type: 'label', position: { x: posHeadM.x, y: posHeadM.y }, data: { label: 'HEAD', color: '#7c3aed', visible: false, isHead: true } },
  { id: 'main-M', type: 'label', position: { x: posMainM.x, y: posMainM.y }, data: { label: 'main', color: MAIN, visible: false } },
];

const ALL_EDGES: Edge[] = [
  { id: 'A-B', source: 'A', target: 'B', style: { stroke: MAIN, strokeWidth: 3 } },
  { id: 'B-C', source: 'B', target: 'C', type: 'smoothstep', style: { stroke: FEATURE, strokeWidth: 3 } },
  { id: 'C-D', source: 'C', target: 'D', style: { stroke: FEATURE, strokeWidth: 3 } },
  { id: 'B-M', source: 'B', target: 'M', style: { stroke: MAIN, strokeWidth: 3 } },
  { id: 'D-M', source: 'D', target: 'M', type: 'smoothstep', style: { stroke: MERGE, strokeWidth: 3, strokeDasharray: '6 3' } },
];

// Which node/edge IDs are visible at each step
const STEP_NODES: string[][] = [
  ['A', 'B', 'head-B', 'main-B'],
  ['A', 'B', 'head-B', 'main-B', 'feature-at-B'],
  ['A', 'B', 'main-B', 'C', 'D', 'feature-D'],
  ['A', 'B', 'C', 'D', 'M', 'head-M', 'main-M'],
  ['A', 'B', 'M', 'head-M', 'main-M'],
];

const STEP_EDGES: string[][] = [
  ['A-B'],
  ['A-B'],
  ['A-B', 'B-C', 'C-D'],
  ['A-B', 'B-C', 'C-D', 'B-M', 'D-M'],
  ['A-B', 'B-M'],
];

// ─── Step Metadata ────────────────────────────────────────────────────────────

const STEPS = [
  {
    title: '1 · Partir de main actualizado',
    description: 'Comienzas siempre desde la rama principal con el historial del equipo ya integrado.',
    commands: ['git switch main', 'git pull origin main'],
  },
  {
    title: '2 · Crear la rama de funcionalidad',
    description: 'La nueva rama nace apuntando al mismo commit que main. Ninguna rama avanza todavía.',
    commands: ['git switch -c feature/registro-usuarios'],
  },
  {
    title: '3 · Desarrollar y hacer commits',
    description: 'Trabajas en tu funcionalidad haciendo commits solo en tu rama. main queda intacto.',
    commands: ['git add .', 'git commit -m "Añade formulario de registro"', 'git commit -m "Validación de campos"'],
  },
  {
    title: '4 · Volver a main y fusionar',
    description: 'Git crea el commit de merge (M) que une los historiales de ambas ramas.',
    commands: ['git switch main', 'git merge feature/registro-usuarios'],
  },
  {
    title: '5 · Eliminar la rama',
    description: 'La rama ya está integrada en main. Borrarla no elimina ningún commit.',
    commands: ['git branch -d feature/registro-usuarios'],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BranchWorkflowAnim() {
  const [step, setStep] = useState(0);

  const visibleNodes = new Set(STEP_NODES[step]);
  const visibleEdges = new Set(STEP_EDGES[step]);

  const nodes = ALL_NODES.map(n => ({
    ...n,
    data: { ...n.data as object, visible: visibleNodes.has(n.id) },
  }));

  const edges = ALL_EDGES.filter(e => visibleEdges.has(e.id));

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Header: step progress + title ── */}
      <div style={{ padding: '16px 20px 14px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Ir al paso ${i + 1}`}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: 'none',
                background: i === step ? MAIN : i < step ? '#dcfce7' : '#f1f5f9',
                color: i === step ? '#fff' : i < step ? '#16a34a' : '#94a3b8',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
              }}
            >
              {i < step ? '✓' : i + 1}
            </button>
          ))}
          <div style={{ marginLeft: 4, fontSize: 11, color: '#94a3b8' }}>
            Paso {step + 1} de {STEPS.length}
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 3 }}>
            {STEPS[step].title}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
            {STEPS[step].description}
          </div>
        </motion.div>
      </div>

      {/* ── ReactFlow graph ── */}
      <div style={{ height: 360, background: '#0f172a' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnDrag={false}
            panOnScroll={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#1e293b"
              style={{ background: '#0f172a' }}
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* ── Terminal: commands ── */}
      <motion.div
        key={`cmd-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ background: '#1e293b', padding: '14px 20px', borderTop: '1px solid #0f172a' }}
      >
        {STEPS[step].commands.map((cmd, i) => (
          <div key={i} style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8 }}>
            <span style={{ color: '#22c55e', userSelect: 'none' }}>$ </span>
            <span style={{ color: '#e2e8f0' }}>{cmd}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Navigation ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: '#fff',
        borderTop: '1px solid #e2e8f0',
      }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: '1.5px solid #e2e8f0',
            background: '#fff',
            color: step === 0 ? '#cbd5e1' : '#475569',
            fontWeight: 600,
            fontSize: 13,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          ← Anterior
        </button>

        <div style={{ display: 'flex', gap: 6 }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === step ? MAIN : '#e2e8f0',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: 'none',
            background: step === STEPS.length - 1 ? '#f1f5f9' : MAIN,
            color: step === STEPS.length - 1 ? '#cbd5e1' : '#fff',
            fontWeight: 600,
            fontSize: 13,
            cursor: step === STEPS.length - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
