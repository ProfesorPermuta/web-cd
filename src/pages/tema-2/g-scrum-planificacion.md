# Planificación Ágil con Scrum

**Scrum** es el marco de trabajo (**framework**) ágil más utilizado en la industria. Define un conjunto mínimo de roles, eventos y artefactos que permiten a equipos pequeños entregar software de valor de forma iterativa e incremental.

```
          ┌──────────────────────────────────────┐
          │  Product Backlog  →  Sprint Backlog  │
          │                                      │
          │  Sprint (1-4 semanas)                │
          │  ┌────────────────────────────────┐  │
          │  │ Daily Scrum (15 min/día)       │  │
          │  └────────────────────────────────┘  │
          │           ↓                          │
          │     Incremento funcional             │
          │           ↓                          │
          │  Sprint Review + Retrospectiva       │
          └──────────────────────────────────────┘
```

---

## Roles en Scrum

Scrum define exactamente **tres roles**. No más, no menos. Cada rol tiene responsabilidades claras y no solapadas.

### Product Owner (PO)

El **Product Owner** es la voz del cliente dentro del equipo. Representa los intereses de todos los stakeholders y es el responsable de maximizar el valor del producto.

Sus responsabilidades principales son:

- Crear y mantener el **Product Backlog**: la lista ordenada de todo lo que el producto necesita.
- **Priorizar** los elementos del backlog en función del valor de negocio.
- Asegurarse de que el equipo entiende los requisitos.
- Aceptar o rechazar el trabajo completado en la Sprint Review.

:::warning Regla clave
El Product Owner es **una única persona**, no un comité. Las decisiones sobre qué se construye y en qué orden son suyas.
:::

### Scrum Master (SM)

El **Scrum Master** es el guardián del proceso. No es el jefe del equipo; es un **facilitador y coach** cuya misión es que Scrum funcione correctamente y eliminar los obstáculos que impiden al equipo avanzar.

Sus responsabilidades principales son:

- Asegurarse de que todos entienden y aplican las reglas de Scrum.
- Eliminar **impedimentos** que bloquean al equipo.
- Facilitar los eventos de Scrum (planificación, daily, review, retrospectiva).
- Proteger al equipo de interrupciones externas durante el Sprint.

### Development Team (Equipo de Desarrollo)

El **equipo de desarrollo** es el grupo de profesionales que construye el producto. En Scrum es:

- **Autoorganizado**: decide cómo hacer el trabajo, sin que nadie le diga cómo.
- **Multifuncional**: tiene todas las habilidades necesarias (desarrollo, pruebas, diseño…).
- **Sin jerarquías internas**: no hay títulos ni subequipos dentro del equipo.

El tamaño recomendado es de **3 a 9 personas**.

---

## Resumen de roles

| Rol | Responsabilidad principal | Lo que NO hace |
|-----|--------------------------|---------------|
| **Product Owner** | Decide *qué* se construye y en qué orden | No decide *cómo* se construye |
| **Scrum Master** | Garantiza que el proceso funciona | No gestiona al equipo ni asigna tareas |
| **Development Team** | Construye el incremento | No recibe órdenes de nadie sobre cómo trabajar |

---

## Eventos de Scrum

Scrum define cinco eventos formales. Todos tienen duración máxima fija (**time-box**) para fomentar la eficiencia.

### 1. Sprint

El **Sprint** es el contenedor de todos los demás eventos. Es un ciclo de trabajo de duración fija (entre 1 y 4 semanas, habitualmente 2) al final del cual se obtiene un **incremento** de producto potencialmente entregable.

- La duración del Sprint no cambia durante el proyecto.
- No se añaden nuevos elementos al Sprint en curso sin acuerdo del equipo.
- Si el objetivo del Sprint queda obsoleto, el Product Owner puede cancelarlo.

### 2. Sprint Planning (Planificación del Sprint)

Al inicio de cada Sprint, el equipo se reúne para planificar el trabajo.

**Duración máxima:** 8 horas para un Sprint de 4 semanas (proporcional para Sprints más cortos).

Se responden dos preguntas:
1. **¿Qué se puede entregar en este Sprint?** El PO presenta los elementos prioritarios del backlog; el equipo selecciona los que puede completar.
2. **¿Cómo se hará ese trabajo?** El equipo descompone los elementos seleccionados en tareas concretas.

El resultado es el **Sprint Backlog**: la lista de trabajo comprometido para el Sprint.

### 3. Daily Scrum (Scrum Diario)

Reunión diaria de **15 minutos** en la que el equipo de desarrollo sincroniza su trabajo y detecta impedimentos.

Cada miembro responde tres preguntas:
- ¿Qué hice ayer que ayudó al equipo a alcanzar el objetivo del Sprint?
- ¿Qué haré hoy para ayudar al equipo a alcanzar el objetivo del Sprint?
- ¿Hay algún impedimento que me bloquea o que puede bloquear al equipo?

:::tip Buena práctica
El Daily Scrum no es una reunión de estado para el Scrum Master ni para el Product Owner. Es una herramienta del equipo de desarrollo para coordinarse.
:::

### 4. Sprint Review (Revisión del Sprint)

Al final del Sprint, el equipo muestra el incremento construido a los stakeholders y al Product Owner.

**Duración máxima:** 4 horas para un Sprint de 4 semanas.

- El equipo demuestra las funcionalidades completadas (software funcionando, no diapositivas).
- El Product Owner acepta o rechaza cada elemento.
- Se actualiza el Product Backlog en función del feedback recibido.

### 5. Sprint Retrospective (Retrospectiva del Sprint)

La retrospectiva ocurre justo después de la Review. El equipo reflexiona sobre **cómo mejorar su forma de trabajar**.

**Duración máxima:** 3 horas para un Sprint de 4 semanas.

Se analizan tres aspectos:
- ¿Qué fue bien y debemos mantener?
- ¿Qué no fue bien y debemos eliminar o mejorar?
- ¿Qué acciones concretas de mejora aplicaremos en el próximo Sprint?

---

## Resumen de eventos

| Evento | ¿Cuándo? | Time-box (Sprint 2 sem.) | Resultado |
|--------|----------|--------------------------|-----------|
| **Sprint** | Todo el ciclo | 1-4 semanas | Incremento funcional |
| **Sprint Planning** | Inicio del Sprint | 4 horas | Sprint Backlog |
| **Daily Scrum** | Cada día | 15 minutos | Plan para las próximas 24 h |
| **Sprint Review** | Final del Sprint | 2 horas | Feedback y backlog actualizado |
| **Retrospectiva** | Tras la Review | 1,5 horas | Plan de mejora del proceso |

---

## Historias de Usuario

Una **historia de usuario** (User Story) es una descripción breve de una funcionalidad desde la perspectiva del usuario que la necesita. No describe *cómo* se implementará, sino *qué* necesita el usuario y *para qué*.

### Formato típico

```
Como [tipo de usuario],
quiero [hacer algo / que el sistema haga algo],
para [conseguir un objetivo o beneficio].
```

**Ejemplos:**

```
Como socio de la biblioteca,
quiero buscar un libro por título o autor,
para saber si está disponible antes de desplazarme.

Como administrador del sistema,
quiero exportar el listado de préstamos en formato CSV,
para poder analizarlo en una hoja de cálculo.
```

### Criterios INVEST

Una buena historia de usuario debe cumplir los criterios **INVEST**:

| Letra | Término | Significado |
|-------|---------|-------------|
| **I** | Independent | Independiente de otras historias en la medida de lo posible |
| **N** | Negotiable | No es un contrato fijo; puede ajustarse con el PO |
| **V** | Valuable | Aporta valor real al usuario o al negocio |
| **E** | Estimable | El equipo puede estimar el esfuerzo necesario |
| **S** | Small | Pequeña: completable en un Sprint |
| **T** | Testable | Se pueden definir criterios de aceptación verificables |

:::warning Historia que no cumple INVEST
"Como usuario, quiero que el sistema sea rápido" — no es **estimable** ni **testable** tal como está escrita. Debería reformularse: "Como usuario, quiero que la búsqueda de libros devuelva resultados en menos de 2 segundos para búsquedas sobre un catálogo de 10.000 títulos".
:::

### Criterios de Aceptación

Los **criterios de aceptación** definen las condiciones que deben cumplirse para que una historia de usuario se considere completada. El Product Owner los usa para aceptar o rechazar el trabajo en la Sprint Review.

Se suelen escribir en formato **Dado-Cuando-Entonces** (Given-When-Then):

```
Historia: Como socio, quiero buscar un libro por título para ver su disponibilidad.

Criterio 1:
  DADO que el catálogo contiene el libro "El Quijote"
  CUANDO el socio busca por el título "quijote" (sin distinguir mayúsculas)
  ENTONCES el sistema muestra ese libro con su disponibilidad

Criterio 2:
  DADO que no existe ningún libro con el título buscado
  CUANDO el socio realiza la búsqueda
  ENTONCES el sistema muestra el mensaje "No se han encontrado resultados"

Criterio 3:
  DADO que el campo de búsqueda está vacío
  CUANDO el socio pulsa "Buscar"
  ENTONCES el sistema muestra un aviso y no realiza la búsqueda
```

---

## Técnicas de Estimación en Scrum

Estimar el esfuerzo de cada historia de usuario es necesario para que el equipo pueda planificar cuántas historias caben en un Sprint. En Scrum se estima en unidades relativas llamadas **puntos de historia** (Story Points), no en horas.

:::info ¿Por qué puntos y no horas?
Las horas son absolutas y varían según la persona. Los puntos de historia miden el esfuerzo relativo: si "registrar un usuario" vale 2 puntos, una tarea "el doble de compleja" vale 4 puntos, independientemente de quién la haga.
:::

### Escala de estimación: la serie de Fibonacci

Los puntos de historia suelen usar una escala inspirada en la **serie de Fibonacci**: 1, 2, 3, 5, 8, 13, 21…

Esta escala es deliberadamente imprecisa en valores altos (no hay 14 ni 15) para reflejar que las historias grandes son intrínsecamente más inciertas. Una historia de 13 o 21 puntos debería dividirse en historias más pequeñas.

### Planning Poker

El **Planning Poker** (también llamado Scrum Poker) es la técnica de estimación más popular en Scrum. Combina la opinión de todo el equipo para llegar a un consenso, evitando el sesgo que produce que alguien diga su estimación primero.

**Mecánica paso a paso:**

1. El **Product Owner** presenta una historia de usuario y responde las dudas del equipo.
2. Cada miembro del equipo de desarrollo elige en secreto una carta con su estimación (usando la escala de Fibonacci).
3. A la señal del Scrum Master, **todos revelan sus cartas al mismo tiempo**.
4. Si todos coinciden (o las diferencias son mínimas), esa es la estimación.
5. Si hay **discrepancias significativas**, los que eligieron el valor más alto y el más bajo explican su razonamiento. Se debate brevemente y se repite la votación.
6. Se repite hasta alcanzar consenso.

```
Ejemplo de ronda de Planning Poker:

  Historia: "Como usuario, quiero filtrar productos por categoría"

  Ana    →  [5]
  Bruno  →  [3]
  Carla  →  [8]
  David  →  [5]

  Diferencia significativa: Bruno (3) y Carla (8) explican su razonamiento.
  Bruno: "Solo es añadir un desplegable al filtro existente"
  Carla: "Hay que modificar la query de base de datos y los tests de integración"

  Segunda ronda:
  Ana    →  [5]
  Bruno  →  [5]
  Carla  →  [5]
  David  →  [5]

  Consenso: 5 puntos de historia.
```

### Otras técnicas de estimación

| Técnica | Descripción | Cuándo usarla |
|---------|-------------|---------------|
| **Planning Poker** | Votación secreta con cartas de Fibonacci hasta consenso | Estimación detallada del Sprint Backlog |
| **T-Shirt Sizing** | Tallas (XS, S, M, L, XL) para estimaciones rápidas | Estimación inicial del Product Backlog completo |
| **Dot Voting** | Cada miembro tiene N votos para distribuir entre las historias | Priorización rápida de un conjunto de historias |
| **Affinity Mapping** | El equipo agrupa historias por tamaño sin debatir | Estimación de backlogs muy grandes |

---

## Archivos relacionados

- [g-metodologia-agil.md](g-metodologia-agil.md) — Fundamentos de la Metodología Ágil y Pair Programming
- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo (base del trabajo en Sprints)
