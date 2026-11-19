import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

/* ─── Datos del curso ───────────────────────────────────────── */
type TemaPage = { label: string; href: string };
type Tema = { n: number; title: string; color: string; pages: TemaPage[]; hidden?: boolean };

// Los temas con `hidden: true` aún no están revisados y no se muestran a los alumnos.
const ALL_TEMAS: Tema[] = [
  {
    n: 1, title: 'Git y Control de Versiones', color: '#f59e0b',
    pages: [
      { label: 'Introducción a Git',           href: '/tema-1/a-introduccion' },
      { label: 'Proveedores web',              href: '/tema-1/b-proveedores-web' },
      { label: 'Repositorio y rama principal', href: '/tema-1/b-repositorio-y-rama-principal' },
      { label: 'Ramas y merge',                href: '/tema-1/c-ramas-y-merge' },
      { label: 'Flujos de trabajo',            href: '/tema-1/d-flujos-de-trabajo' },
      { label: 'Errores comunes',              href: '/tema-1/e-errores-comunes' },
      { label: 'Ejercicios y soluciones',      href: '/tema-1/f-ejercicios-y-soluciones' },
    ],
  },
  {
    n: 2, title: 'Ingeniería del Software', color: '#6366f1',
    pages: [
      { label: 'Introducción',                    href: '/tema-2/a-introduccion' },
      { label: 'Modelo Cascada',                  href: '/tema-2/b-modelo-cascada' },
      { label: 'Modelo Iterativo',                href: '/tema-2/d-modelo-iterativo' },
      { label: 'Métrica V3',                      href: '/tema-2/e-metrica-v3' },
      { label: 'Tarjetas CRC y pruebas',          href: '/tema-2/f-tarjetas-crc-y-casos-de-prueba' },
      { label: 'Metodología ágil',                href: '/tema-2/g-metodologia-agil' },
      { label: 'Scrum: planificación',            href: '/tema-2/g-scrum-planificacion' },
      { label: 'Errores comunes',                 href: '/tema-2/h-errores-comunes' },
      { label: 'Ejercicios y soluciones',         href: '/tema-2/i-ejercicios-y-soluciones' },
    ],
  },
  {
    n: 3, title: 'Programación Orientada a Objetos', color: '#ec4899',
    pages: [
      { label: 'Introducción a la POO',      href: '/tema-3/a-introduccion-poo' },
      { label: 'UML y POO',                  href: '/tema-3/b-uml-y-poo' },
      { label: 'Clases y objetos UML',       href: '/tema-3/c-clases-y-objetos-uml' },
      { label: 'Atributos y métodos',        href: '/tema-3/d-atributos-y-metodos' },
      { label: 'Relaciones: asociación',     href: '/tema-3/e-relaciones-asociacion' },
      { label: 'Herencia y realización',     href: '/tema-3/f-herencia-y-realizacion' },
      { label: 'Errores comunes',            href: '/tema-3/g-errores-comunes' },
      { label: 'Ejercicios',                 href: '/tema-3/h-ejercicios-y-soluciones' },
    ],
  },
  {
    n: 4, title: 'Pruebas de Software', color: '#22c55e', hidden: true,
    pages: [
      { label: 'Introducción',              href: '/tema-4/a-introduccion' },
      { label: 'Tipos de pruebas',          href: '/tema-4/b-tipos-de-pruebas' },
      { label: 'Pruebas unitarias',         href: '/tema-4/c-pruebas-unitarias' },
      { label: 'JUnit 5',                   href: '/tema-4/d-junit5' },
      { label: 'Mocks y stubs',             href: '/tema-4/e-mocks-y-stubs' },
      { label: 'Cobertura de código',       href: '/tema-4/f-cobertura-de-codigo' },
      { label: 'CI/CD',                     href: '/tema-4/g-cicd' },
      { label: 'Errores comunes',           href: '/tema-4/h-errores-comunes' },
      { label: 'Ejercicios y soluciones',   href: '/tema-4/i-ejercicios-y-soluciones' },
    ],
  },
  {
    n: 5, title: 'Código Limpio y Patrones de Diseño', color: '#f97316', hidden: true,
    pages: [
      { label: 'Introducción',               href: '/tema-5/a-introduccion' },
      { label: 'Principios SOLID',           href: '/tema-5/b-principios-solid' },
      { label: 'Patrones creacionales',      href: '/tema-5/c-patrones-creacionales' },
      { label: 'Patrones estructurales',     href: '/tema-5/d-patrones-estructurales' },
      { label: 'Patrones de comportamiento', href: '/tema-5/e-patrones-comportamiento' },
      { label: 'Errores comunes',            href: '/tema-5/f-errores-comunes' },
      { label: 'Ejercicios y soluciones',    href: '/tema-5/g-ejercicios-y-soluciones' },
    ],
  },
  {
    n: 6, title: 'Diagramas UML de Comportamiento', color: '#06b6d4', hidden: true,
    pages: [
      { label: 'Introducción',                href: '/tema-6/a-introduccion' },
      { label: 'Diagramas de casos de uso',   href: '/tema-6/b-diagramas-de-casos-de-uso' },
      { label: 'Relaciones en casos de uso',  href: '/tema-6/c-relaciones-casos-de-uso' },
      { label: 'Diagramas de secuencia',      href: '/tema-6/d-diagramas-de-secuencia' },
      { label: 'Mensajes y fragmentos',       href: '/tema-6/e-mensajes-y-fragmentos' },
      { label: 'Errores comunes',             href: '/tema-6/f-errores-comunes' },
      { label: 'Ejercicios y soluciones',     href: '/tema-6/g-ejercicios-y-soluciones' },
    ],
  },
];

const TEMAS = ALL_TEMAS.filter(t => !t.hidden);

/* ─── Tarjeta de tema ───────────────────────────────────────── */
function TemaCard({ tema }: { tema: Tema }) {
  const zipUrl = useBaseUrl(`/descargas/tema-${tema.n}.zip`);
  return (
    <div className={styles.temaCard} style={{ borderTopColor: tema.color }}>
      <div className={styles.temaCardHeader}>
        <span className={styles.temaNumber} style={{ background: tema.color }}>
          T{tema.n}
        </span>
        <Heading as="h3" className={styles.temaTitle}>
          <Link to={tema.pages[0].href} style={{ color: tema.color }}>
            {tema.title}
          </Link>
        </Heading>
      </div>
      <ul className={styles.temaPageList}>
        {tema.pages.map(p => (
          <li key={p.href}>
            <Link to={p.href}>{p.label}</Link>
          </li>
        ))}
      </ul>
      <a className={styles.downloadBtn} style={{ background: tema.color }}
         href={zipUrl} download={`tema-${tema.n}.zip`}>
        ⬇ Descargar tema (ZIP con PDFs)
      </a>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img className={styles.heroLogo} src={useBaseUrl('/img/logo.svg')} alt="" />
        <Heading as="h1" className="hero__title">{siteConfig.title}</Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
        <ul className={styles.heroTags}>
          {TEMAS.map(t => <li key={t.n}>T{t.n} · {t.title}</li>)}
        </ul>
      </div>
    </header>
  );
}

/* ─── Página principal ──────────────────────────────────────── */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="Apuntes, ejercicios y presentaciones de Entornos de Desarrollo">
      <HomepageHeader />
      <main>
        <section className={styles.temasSection}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              Contenido del curso
            </Heading>
            <div className={styles.temasGrid}>
              {TEMAS.map(tema => <TemaCard key={tema.n} tema={tema} />)}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
