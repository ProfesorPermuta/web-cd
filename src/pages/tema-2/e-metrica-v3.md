# Métrica v3

**Métrica v3** es la **metodología oficial del Gobierno español** para el desarrollo y mantenimiento de sistemas de información. Fue publicada por el Ministerio de Hacienda y es de uso obligatorio en las Administraciones Públicas españolas. Está basada en estándares internacionales (ISO, IEEE) y cubre el ciclo de vida completo del software.

---

## ¿Para qué se usa?

- Proyectos de software en el **sector público español**.
- Organizaciones que necesitan un proceso formal, auditable y normalizado.
- Proyectos que deben cumplir con estándares de calidad reconocidos.

---

## Los tres procesos principales

Métrica v3 se estructura en tres procesos principales, cada uno con sus propias actividades y tareas:

```
┌─────────────────────────────────────────────┐
│                  MÉTRICA v3                 │
├─────────────┬──────────────┬────────────────┤
│ Planificación│  Desarrollo  │ Mantenimiento  │
│    (PSI)    │(EVS+ASI+DSI+ │    (MSI)       │
│             │  CSI + IAS)  │                │
└─────────────┴──────────────┴────────────────┘
```

---

## Proceso 1: Planificación de Sistemas de Información (PSI)

El objetivo de la **planificación** es obtener un marco de referencia para los proyectos de software de la organización: qué sistemas se necesitan, en qué orden deben abordarse y con qué prioridad.

**Actividades clave:**
- Estudio de la situación actual.
- Identificación de requisitos y necesidades de información.
- Elaboración del **Plan de Sistemas de Información**.

---

## Proceso 2: Desarrollo

El proceso de desarrollo es el más extenso y se divide en cinco subprocesos:

| Subproceso | Sigla | Descripción |
|------------|-------|-------------|
| Estudio de Viabilidad del Sistema | EVS | ¿Es viable técnica y económicamente el proyecto? |
| Análisis del Sistema de Información | ASI | Captura detallada de requisitos funcionales y no funcionales |
| Diseño del Sistema de Información | DSI | Arquitectura técnica, diseño de clases y base de datos |
| Construcción del Sistema de Información | CSI | Codificación, pruebas unitarias e integración |
| Implantación y Aceptación del Sistema | IAS | Despliegue, formación y aceptación por el cliente |

### Ejemplo: trazabilidad de un requisito a través del desarrollo

```
[ASI] Requisito: "El sistema debe calcular el IRPF de cada nómina"
         ↓
[DSI] Se diseña una clase Nómina, con los datos que necesita
      y la operación de calcular el IRPF entre sus responsabilidades
         ↓
[CSI] Esa clase se implementa y se prueba
```

---

## Proceso 3: Mantenimiento de Sistemas de Información (MSI)

El **mantenimiento** gestiona los cambios necesarios sobre el sistema ya en producción. Métrica v3 distingue tres tipos de mantenimiento:

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Correctivo** | Corrección de errores descubiertos en producción | El cálculo de IVA falla en facturas con descuento |
| **Evolutivo** | Añadir nuevas funcionalidades solicitadas por el cliente | Exportar facturas a PDF |
| **Adaptativo** | Adaptar el sistema a cambios del entorno (nueva ley, nuevo SO) | Adaptar el IRPF a una reforma fiscal |

---

## Interfaces transversales

Además de los tres procesos principales, Métrica v3 define interfaces que se aplican a lo largo de todo el ciclo de vida:

- **Gestión de Proyectos**: seguimiento del avance, riesgos y recursos.
- **Gestión de la Configuración**: control de versiones de los artefactos (código, documentos).
- **Aseguramiento de la Calidad**: revisiones y auditorías del proceso.
- **Seguridad**: requisitos de seguridad integrados desde el análisis.

---

## Métrica v3 en el contexto de los modelos de ciclo de vida

Métrica v3 es compatible con el modelo en **Cascada** (su estructura natural) pero también puede adaptarse para funcionar de forma más iterativa si el proyecto lo requiere.

:::info
La documentación completa de Métrica v3 es de libre acceso en el portal del Ministerio de Hacienda de España.
:::

---

## Archivos relacionados

- [b-modelo-cascada.md](b-modelo-cascada.md) — Modelo en Cascada (base del proceso de Métrica v3)
- [g-metodologia-agil.md](g-metodologia-agil.md) — Metodología Ágil y Pair Programming
