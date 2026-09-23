# Metodología Ágil y Pair Programming

Las **metodologías ágiles** son un conjunto de enfoques de desarrollo de software que priorizan la **colaboración**, la **adaptabilidad** y la **entrega continua de valor** sobre la planificación rígida y la documentación exhaustiva. Surgieron como respuesta a las limitaciones del modelo en Cascada en proyectos con requisitos cambiantes.

Su filosofía queda recogida en el **Manifiesto Ágil** (2001), que proclama cuatro valores fundamentales:

```
Individuos e interacciones   >   Procesos y herramientas
Software funcionando         >   Documentación exhaustiva
Colaboración con el cliente  >   Negociación de contratos
Respuesta ante el cambio     >   Seguir un plan
```

---

## ¿Para qué se usa?

- Proyectos donde los requisitos **cambian frecuentemente**.
- Equipos pequeños y **altamente colaborativos**.
- Cuando el cliente quiere **implicarse activamente** en el desarrollo.
- Entornos donde la **velocidad de entrega** es una ventaja competitiva.

---

## Principios ágiles clave

### Involucración continua del cliente

El cliente (o su representante, llamado **Product Owner** en Scrum) participa en cada iteración: define prioridades, revisa entregables y valida que el software cumple sus necesidades reales.

### Estándares de codificación compartidos

Todo el equipo sigue las mismas convenciones a la hora de escribir código: cómo se nombran las cosas, cómo se organiza el trabajo y cómo se documentan las decisiones que no son evidentes a simple vista. Compartir estas normas evita que el código de cada persona del equipo parezca escrito por un equipo distinto.

### Evaluación regular del progreso

Al final de cada iteración se realizan dos reuniones:
- **Revisión (Review)**: el equipo muestra el software funcionando al cliente.
- **Retrospectiva**: el equipo reflexiona sobre el proceso y decide mejoras.

---

## Pair Programming (Programación en Pareja)

El **pair programming** es una práctica ágil en la que dos programadores trabajan juntos en el mismo ordenador, sobre el mismo código, al mismo tiempo.

### Los dos roles

| Rol | Nombre habitual | Responsabilidad |
|-----|-----------------|-----------------|
| El que escribe | **Driver** (conductor) | Escribe el código, controla el teclado |
| El que revisa | **Navigator** (navegador) | Observa, piensa en el diseño, detecta errores, sugiere mejoras |

Los roles se intercambian con frecuencia (cada 15–30 minutos o al completar una pequeña tarea).

### ¿Por qué funciona?

- **Revisión continua**: el navegador detecta errores en tiempo real que el driver no ve porque está concentrado en los detalles.
- **Diseño mejorado**: dos cabezas piensan mejor la estructura del código.
- **Transferencia de conocimiento**: el equipo aprende mutuamente; no hay "silos" de conocimiento.
- **Menos interrupciones**: con dos personas concentradas en la misma tarea, es más difícil distraerse.

### Ejemplo de sesión de pair programming

Imaginemos que el equipo necesita calcular la media de una lista de valores. El **driver** escribe una primera versión y, al terminar, algo no cuadra: el resultado sale redondeado hacia abajo cuando debería tener decimales. El **navigator**, que ha estado observando en lugar de teclear, detecta el problema antes de seguir avanzando y lo comenta en voz alta. Entre los dos corrigen el detalle antes de continuar con la siguiente funcionalidad. Ese es precisamente el valor del pair programming: el error se detecta y se corrige en segundos, no días después al ejecutar el programa.

---

## Pruebas antes de la codificación (TDD)

En entornos ágiles se practica con frecuencia el **Test-Driven Development (TDD)**: antes de programar una funcionalidad, el equipo describe primero cómo debería comportarse y qué resultado se espera. Solo después se implementa la funcionalidad que cumple esa descripción.

```
1. Describir el comportamiento esperado (ROJO: la funcionalidad aún no existe)
2. Implementar lo mínimo necesario para cumplir esa descripción (VERDE)
3. Mejorar el código manteniendo el comportamiento correcto (REFACTOR)
```

Esta forma de trabajar obliga al equipo a tener claro *qué* debe hacer el software antes de decidir *cómo* lo va a hacer, y deja un conjunto de comprobaciones que permiten detectar rápidamente si un cambio posterior rompe algo que ya funcionaba.

---

## Resumen comparativo de metodologías

| | Métrica v3 | Ágil |
|--|-----------|------|
| **Orientación** | Proceso formal | Personas y colaboración |
| **Documentación** | Exhaustiva | Justa y necesaria |
| **Participación cliente** | Inicio y aceptación | Continua |
| **Adaptación al cambio** | Costosa | Alta |
| **Ámbito típico** | Administración pública | Startups y proyectos dinámicos |

---

## Archivos relacionados

- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo (base del desarrollo ágil)
- [g-scrum-planificacion.md](g-scrum-planificacion.md) — Planificación Ágil con Scrum
