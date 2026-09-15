import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

/* ─── Presentaciones del curso ──────────────────────────────── */
/* Añade aquí una entrada por cada presentación de clase. */
type Presentacion = { label: string; href: string };
type TemaPresentaciones = { n: number; title: string; color: string; presentaciones: Presentacion[] };

const TEMAS_PRESENTACIONES: TemaPresentaciones[] = [
  {
    n: 1, title: 'Git y Control de Versiones', color: '#10b981',
    presentaciones: [
      { label: 'Tema 1: Control de Versiones con Git', href: '/presentaciones/tema1-git.html' },
    ],
  },
];

/* ─── Tarjeta de tema ───────────────────────────────────────── */
function TemaCard({ tema }: { tema: TemaPresentaciones }) {
  return (
    <div className={styles.temaCard} style={{ borderTopColor: tema.color }}>
      <div className={styles.temaCardHeader}>
        <span className={styles.temaNumber} style={{ background: tema.color }}>
          T{tema.n}
        </span>
        <Heading as="h3" className={styles.temaTitle}>
          {tema.title}
        </Heading>
      </div>
      <ul className={styles.temaPageList}>
        {tema.presentaciones.map(p => (
          <li key={p.href}>
            <a href={p.href} target="_blank" rel="noopener noreferrer">{p.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Página de presentaciones ──────────────────────────────── */
export default function Presentaciones(): ReactNode {
  return (
    <Layout title="Presentaciones" description="Presentaciones de clase del curso">
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">Presentaciones</Heading>
          <p className="hero__subtitle">Diapositivas utilizadas en las sesiones de clase, organizadas por tema</p>
        </div>
      </header>
      <main>
        <section className={styles.temasSection}>
          <div className="container">
            {TEMAS_PRESENTACIONES.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Todavía no hay presentaciones publicadas.</p>
            ) : (
              <div className={styles.temasGrid}>
                {TEMAS_PRESENTACIONES.map(tema => <TemaCard key={tema.n} tema={tema} />)}
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
