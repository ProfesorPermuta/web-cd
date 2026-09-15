# Programación didáctica — Entornos de Desarrollo (0487)

**Ciclo formativo:** CFGS Desarrollo de Aplicaciones Multiplataforma (DAM) / Desarrollo de Aplicaciones Web (DAW)
**Módulo profesional:** Entornos de Desarrollo
**Código:** 0487
**Duración:** 50 horas
**Equivalencia en créditos ECTS:** 6
**Curso:** 2025/2026

---

## 1. Introducción y contextualización

El módulo profesional *Entornos de Desarrollo* proporciona al alumnado la formación necesaria para desempeñar la función de desarrollador de aplicaciones: utilización de herramientas software, elaboración de documentación técnica, diseño y ejecución de pruebas, y optimización de código.

La formación del módulo contribuye a alcanzar los objetivos generales d), e), h), i), j), ñ) y o) del ciclo formativo, y las competencias profesionales, personales y sociales d), f), h), i), j), m) y n) del título.

El desarrollo de las unidades didácticas se apoya en el material del curso publicado en la plataforma web del aula (bloques *Tema 1* a *Tema 6*), organizado en torno al control de versiones con Git, la ingeniería del software, la programación orientada a objetos y el diagrama de clases UML, las pruebas de software, la refactorización y el código limpio, y los diagramas de comportamiento UML.

---

## 2. Distribución temporal (50 horas)

| Unidad didáctica | Título | Horas | RA relacionados |
|---|---|---|---|
| UD1 | Control de versiones con Git | 8 | RA1, RA4 |
| UD2 | Ingeniería del software y metodologías de desarrollo | 8 | RA1 |
| UD3 | Programación orientada a objetos y diagrama de clases UML | 10 | RA1, RA5 |
| UD4 | Diseño y realización de pruebas de software | 10 | RA3 |
| UD5 | Código limpio, refactorización y optimización | 8 | RA4 |
| UD6 | Diagramas de comportamiento UML | 6 | RA6 |

**Total: 50 horas**

> **Nota metodológica sobre el RA2** (instalación, personalización y uso de entornos de desarrollo -IDE-): sus criterios de evaluación se trabajan de forma **transversal** a lo largo de todas las unidades didácticas, ya que cada tema requiere instalar, configurar y utilizar un IDE (por ejemplo IntelliJ IDEA / Visual Studio Code) para editar, compilar, depurar y controlar versiones del código de los ejercicios propuestos. La evaluación de RA2 se realiza mediante observación directa y rúbrica de seguimiento durante todas las UD, y no como bloque aislado.

---

## 3. Unidades didácticas

### UD1. Control de versiones con Git — 8 horas

**Resultados de aprendizaje:** RA1 (parcial: fases y herramientas de desarrollo colaborativo), RA4 (control de versiones — CE f, h)

**Criterios de evaluación trabajados:**
- RA1: f) herramientas del desarrollo de software.
- RA4: f) control de versiones integrado en el entorno de desarrollo; h) repositorios remotos para desarrollo colaborativo.

**Contenidos:**
- Concepto de sistema de control de versiones distribuido.
- Repositorio local y rama principal.
- Creación de ramas, fusión (merge) y resolución de conflictos.
- Flujos de trabajo colaborativos (Gitflow, feature branches, pull requests).
- Proveedores de repositorios remotos (GitHub, GitLab, Bitbucket).
- Errores comunes en el uso de Git.

**Materiales de referencia del curso:**
- Tema 1 – a) Introducción a Git
- Tema 1 – b) Proveedores web / Repositorio y rama principal
- Tema 1 – c) Ramas y merge
- Tema 1 – d) Flujos de trabajo
- Tema 1 – e) Errores comunes
- Tema 1 – f) Ejercicios y soluciones

**Actividades de enseñanza-aprendizaje:**
1. Instalación y configuración de Git y de una cuenta en un proveedor remoto.
2. Creación de un repositorio, primeros commits y push a rama principal.
3. Práctica guiada de ramas, merge y resolución de conflictos.
4. Simulación de un flujo de trabajo colaborativo en equipos de 2-3 alumnos (pull request + revisión).
5. Resolución de la batería de ejercicios del tema y corrección en grupo de errores comunes.

**Instrumentos de evaluación:**
- Ejercicio práctico individual de repositorio con historial de commits y ramas.
- Observación directa del uso del control de versiones integrado en el IDE.

---

### UD2. Ingeniería del software y metodologías de desarrollo — 8 horas

**Resultados de aprendizaje:** RA1 (íntegro)

**Criterios de evaluación trabajados:**
- a) relación de los programas con los componentes del sistema informático.
- b) fases de desarrollo de una aplicación informática.
- c) diferenciación entre código fuente, objeto y ejecutable.
- d) generación de código intermedio y máquinas virtuales.
- e) clasificación de los lenguajes de programación.
- f) herramientas utilizadas en el desarrollo de software.
- g) características y escenarios de uso de las metodologías ágiles.

**Contenidos:**
- Concepto de programa informático; código fuente, objeto y ejecutable; virtualización.
- Tipos de lenguajes de programación y paradigmas.
- Fases del desarrollo de una aplicación: análisis, diseño, codificación, pruebas, documentación, explotación y mantenimiento.
- Modelos de ciclo de vida: cascada, prototipado, iterativo.
- Métrica v3.
- Ingeniería orientada a objetos como enfoque de desarrollo.
- Metodologías ágiles: características, técnicas y Scrum (planificación, roles, artefactos).
- Errores comunes en la selección y aplicación de metodologías.

**Materiales de referencia del curso:**
- Tema 2 – a) Introducción a la Ingeniería de Software
- Tema 2 – b) Modelo en cascada
- Tema 2 – c) Modelo de prototipado
- Tema 2 – d) Modelo iterativo
- Tema 2 – e) Métrica v3
- Tema 2 – f) Ingeniería orientada a objetos
- Tema 2 – g) Metodología ágil / Scrum: planificación
- Tema 2 – h) Errores comunes
- Tema 2 – i) Ejercicios y soluciones

**Actividades de enseñanza-aprendizaje:**
1. Análisis comparativo de modelos de ciclo de vida (cascada vs. iterativo vs. prototipado) a partir de casos prácticos.
2. Elaboración de un pequeño documento de planificación Métrica v3 para un proyecto propuesto.
3. Simulación de una Sprint Planning y elaboración de un backlog de producto/sprint (Scrum).
4. Debate dirigido sobre ventajas e inconvenientes de metodologías ágiles frente a tradicionales.
5. Resolución de ejercicios y puesta en común de errores comunes.

**Instrumentos de evaluación:**
- Prueba escrita/objetiva sobre lenguajes, fases del desarrollo y metodologías.
- Entrega de la planificación ágil (backlog + sprint) de un caso propuesto.

---

### UD3. Programación orientada a objetos y diagrama de clases UML — 10 horas

**Resultados de aprendizaje:** RA1 (parcial: paradigma OO), RA5 (íntegro)

**Criterios de evaluación trabajados:**
- RA1: e) clasificación de lenguajes (paradigma orientado a objetos).
- RA5: a) conceptos básicos de la POO; b) herramientas para diagramas de clases; c) interpretación de diagramas de clases; d) trazado de diagramas a partir de especificaciones; e) generación de código a partir de un diagrama de clases; f) generación de diagrama de clases mediante ingeniería inversa.

**Contenidos:**
- Paradigma de programación orientada a objetos.
- UML y su relación con la POO.
- Clases y objetos: instanciación.
- Atributos, métodos y visibilidad.
- Relaciones: asociación, navegabilidad y multiplicidad.
- Herencia, composición, agregación, realización y dependencia.
- Notación de los diagramas de clases y herramientas de modelado.
- Generación automática de código a partir de diagramas e ingeniería inversa.
- Errores comunes al modelar diagramas de clases.

**Materiales de referencia del curso:**
- Tema 3 – a) Introducción a la POO
- Tema 3 – b) UML y POO
- Tema 3 – c) Clases y objetos UML
- Tema 3 – d) Atributos y métodos
- Tema 3 – e) Relaciones de asociación
- Tema 3 – f) Herencia y realización
- Tema 3 – g) Errores comunes
- Tema 3 – h) Ejercicios y soluciones

**Actividades de enseñanza-aprendizaje:**
1. Identificación de clases, atributos y métodos a partir de un enunciado de dominio (por ejemplo, sistema de gestión de una biblioteca).
2. Elaboración manual y con herramienta CASE/plugin del IDE de un diagrama de clases completo (asociaciones, herencia, agregación/composición).
3. Generación de código Java a partir del diagrama elaborado (forward engineering).
4. Ingeniería inversa: obtención de un diagrama de clases a partir de código fuente existente.
5. Corrección entre pares de diagramas siguiendo la notación estándar UML.

**Instrumentos de evaluación:**
- Diagrama de clases entregado (elaboración propia a partir de especificación).
- Ejercicio práctico de ingeniería inversa y generación de código.
- Prueba práctica de codificación de clases con relaciones (herencia/asociación).

---

### UD4. Diseño y realización de pruebas de software — 10 horas

**Resultados de aprendizaje:** RA3 (íntegro)

**Criterios de evaluación trabajados:**
- a) tipos de pruebas.
- b) definición de casos de prueba.
- c) herramientas de depuración y prueba del entorno de desarrollo.
- d) puntos de ruptura y seguimiento con el depurador.
- e) examen y modificación del comportamiento en tiempo de ejecución.
- f) pruebas unitarias de clases y funciones.
- g) pruebas automáticas.
- h) documentación de incidencias.
- i) dobles de prueba.

**Contenidos:**
- Concepto y objetivo de las pruebas de software.
- Tipos de pruebas: funcionales, estructurales y de regresión.
- Planificación de pruebas: casos de prueba, cubrimiento, valores límite y clases de equivalencia.
- Pruebas unitarias con JUnit 5.
- Dobles de prueba: mocks y stubs.
- Cobertura de código.
- Integración continua (CI/CD) aplicada a la automatización de pruebas.
- Documentación de incidencias detectadas.
- Errores comunes en el diseño y ejecución de pruebas.

**Materiales de referencia del curso:**
- Tema 4 – a) Introducción a las pruebas de software
- Tema 4 – b) Tipos de pruebas
- Tema 4 – c) Pruebas unitarias
- Tema 4 – d) JUnit 5
- Tema 4 – e) Mocks y stubs
- Tema 4 – f) Cobertura de código
- Tema 4 – g) CI/CD
- Tema 4 – h) Errores comunes
- Tema 4 – i) Ejercicios y soluciones

**Actividades de enseñanza-aprendizaje:**
1. Diseño de casos de prueba (valores límite y clases de equivalencia) para una función dada.
2. Implementación de pruebas unitarias con JUnit 5 sobre clases desarrolladas en UD3.
3. Uso del depurador del IDE: puntos de ruptura, inspección y modificación de variables en ejecución.
4. Creación de dobles de prueba (mocks/stubs) para aislar dependencias externas.
5. Medición de cobertura de código y análisis de resultados.
6. Configuración de un flujo de integración continua que ejecute las pruebas automáticamente.
7. Registro de incidencias detectadas en un sistema de seguimiento (issue tracker).

**Instrumentos de evaluación:**
- Batería de pruebas unitarias entregada (con casos límite y dobles de prueba) sobre un proyecto propio.
- Informe de cobertura de código obtenido con la herramienta del IDE.
- Prueba práctica de depuración guiada (uso de breakpoints).

---

### UD5. Código limpio, refactorización y optimización — 8 horas

**Resultados de aprendizaje:** RA4 (parcial, complementa control de versiones de UD1)

**Criterios de evaluación trabajados:**
- a) patrones de refactorización más usuales.
- b) pruebas asociadas a la refactorización.
- c) revisión de código con analizador de código.
- d) configuración de un analizador de código.
- e) aplicación de patrones de refactorización con las herramientas del IDE.
- g) documentación de clases con herramientas del entorno de desarrollo.
- i) integración continua del código.

**Contenidos:**
- Código limpio (*clean code*) y legibilidad.
- Refactorización: concepto, limitaciones y relación con las pruebas.
- Principios SOLID.
- Patrones de diseño creacionales, estructurales y de comportamiento.
- Analizadores de código estático (linters).
- Documentación de código: comentarios y generación automática (Javadoc y similares).
- Errores comunes en la aplicación de principios de diseño y refactorización.

**Materiales de referencia del curso:**
- Tema 5 – a) Introducción al código limpio y la refactorización
- Tema 5 – b) Principios SOLID
- Tema 5 – c) Patrones creacionales
- Tema 5 – d) Patrones estructurales
- Tema 5 – e) Patrones de comportamiento
- Tema 5 – f) Errores comunes
- Tema 5 – g) Ejercicios y soluciones

**Actividades de enseñanza-aprendizaje:**
1. Identificación de *code smells* en fragmentos de código proporcionados.
2. Refactorización guiada aplicando patrones (extracción de método, sustitución de condicionales, etc.), verificando con las pruebas unitarias de UD4 que el comportamiento no cambia.
3. Análisis de casos que violan los principios SOLID y propuesta de solución.
4. Implementación de un patrón creacional, uno estructural y uno de comportamiento sobre un caso práctico.
5. Ejecución de un analizador de código estático integrado en el IDE y corrección de los avisos obtenidos.
6. Documentación de las clases desarrolladas mediante comentarios estándar (Javadoc).

**Instrumentos de evaluación:**
- Ejercicio de refactorización con evidencia de "antes/después" y pruebas que verifican el comportamiento.
- Implementación de al menos dos patrones de diseño sobre un caso propuesto.
- Informe del analizador de código estático con las correcciones aplicadas.

---

### UD6. Diagramas de comportamiento UML — 6 horas

**Resultados de aprendizaje:** RA6 (íntegro)

**Criterios de evaluación trabajados:**
- a) tipos de diagramas de comportamiento.
- b) diagramas de casos de uso.
- c) diagramas de interacción.
- d) elaboración de diagramas de interacción sencillos.
- e) diagramas de actividades.
- f) elaboración de diagramas de actividades sencillos.
- g) diagramas de estados.
- h) elaboración de diagramas de estados sencillos.

**Contenidos:**
- Tipos de diagramas de comportamiento UML y campo de aplicación.
- Diagrama de casos de uso: actores, escenarios y relaciones de comunicación.
- Relaciones entre casos de uso (inclusión, extensión, generalización).
- Diagrama de secuencia: línea de vida, activación y envío de mensajes.
- Mensajes y fragmentos combinados (alt, loop, opt).
- Diagrama de actividad y diagrama de estados.
- Errores comunes en la elaboración de diagramas de comportamiento.

**Materiales de referencia del curso:**
- Tema 6 – a) Introducción a los diagramas de comportamiento UML
- Tema 6 – b) Diagramas de casos de uso
- Tema 6 – c) Relaciones entre casos de uso
- Tema 6 – d) Diagramas de secuencia
- Tema 6 – e) Mensajes y fragmentos
- Tema 6 – f) Errores comunes
- Tema 6 – g) Ejercicios y soluciones

**Actividades de enseñanza-aprendizaje:**
1. Elaboración de un diagrama de casos de uso a partir de los requisitos de un sistema (por ejemplo, el proyecto trabajado en UD3).
2. Elaboración de un diagrama de secuencia sencillo para uno de los casos de uso, incluyendo mensajes y fragmentos combinados.
3. Elaboración de un diagrama de actividad para modelar un proceso de negocio.
4. Elaboración de un diagrama de estados para un objeto con ciclo de vida relevante (por ejemplo, un pedido).
5. Puesta en común y corrección de errores comunes de notación.

**Instrumentos de evaluación:**
- Entrega de un conjunto de diagramas de comportamiento (casos de uso, secuencia, actividad y estados) sobre un mismo caso de estudio.
- Prueba objetiva de interpretación de diagramas de comportamiento dados.

---

## 4. Metodología

- Metodología activa y participativa, combinando explicación teórica breve con práctica guiada inmediata en el IDE.
- Aprendizaje basado en proyectos: siempre que sea posible, se reutiliza un mismo caso de estudio a lo largo de varias unidades (por ejemplo, el diagrama de clases de UD3 se usa como base para las pruebas de UD4, la refactorización de UD5 y los diagramas de comportamiento de UD6), favoreciendo la visión integrada del ciclo de desarrollo.
- Trabajo individual y en pequeños grupos (2-3 alumnos) para las prácticas de control de versiones y metodologías ágiles.
- Uso constante de un IDE (instalación, personalización, extensiones, depurador, analizador de código y control de versiones integrado) para trabajar transversalmente el RA2.
- Corrección de errores comunes como parte integrada de cada unidad, a partir de los materiales "Errores comunes" de cada tema.

## 5. Evaluación

### 5.1 Criterios de calificación

| Instrumento | Peso |
|---|---|
| Pruebas objetivas/escritas | 20% |
| Ejercicios y proyectos prácticos por unidad | 60% |
| Observación directa (uso del IDE, control de versiones, actitud) | 20% |

Se considerará superado el módulo cuando se alcance una calificación mínima de 5 sobre 10, siempre que se hayan entregado y superado las actividades prácticas mínimas exigidas en cada unidad didáctica.

### 5.2 Relación resultados de aprendizaje – unidades didácticas – ponderación

| RA | Unidades didácticas | Ponderación orientativa |
|---|---|---|
| RA1 | UD1, UD2, UD3 | 15% |
| RA2 | Transversal (todas las UD) | 10% |
| RA3 | UD4 | 25% |
| RA4 | UD1, UD5 | 20% |
| RA5 | UD3 | 15% |
| RA6 | UD6 | 15% |

### 5.3 Recuperación

El alumnado que no supere alguna unidad didáctica dispondrá de una prueba/entrega de recuperación específica sobre los criterios de evaluación no alcanzados, antes de la evaluación final del módulo.

## 6. Atención a la diversidad

Se plantean actividades de ampliación (por ejemplo, patrones de diseño avanzados, flujos de trabajo Git más complejos como Gitflow completo) para el alumnado que complete las tareas con antelación, y actividades de refuerzo con guías paso a paso y ejercicios resueltos (disponibles en los apartados "Ejercicios y soluciones" de cada tema) para el alumnado que necesite apoyo adicional.

## 7. Recursos y materiales

- IDE (IntelliJ IDEA / Visual Studio Code) y JDK.
- Git y cuenta en un proveedor de repositorios remotos (GitHub/GitLab/Bitbucket).
- Herramienta de modelado UML (plugin del IDE o herramienta CASE).
- JUnit 5 y librería de mocks (Mockito).
- Analizador de código estático integrado en el IDE.
- Material del curso publicado en la plataforma web del aula (Temas 1 a 6).
