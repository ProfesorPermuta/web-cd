# Modelo Iterativo y Adaptable

El **modelo iterativo** divide el desarrollo en ciclos cortos llamados **iteraciones**. Al final de cada iteración se entrega una versión funcional del software — aunque incompleta — que el cliente puede probar y sobre la que puede dar retroalimentación. El equipo incorpora esa retroalimentación en la siguiente iteración.

```
Iteración 1:  [Planif.] → [Diseño] → [Cód.] → [Pruebas] → Entrega parcial
Iteración 2:  [Planif.] → [Diseño] → [Cód.] → [Pruebas] → Entrega parcial
Iteración 3:  [Planif.] → [Diseño] → [Cód.] → [Pruebas] → Entrega parcial
...
Iteración N:  [Planif.] → [Diseño] → [Cód.] → [Pruebas] → Producto final
```

---

## ¿Para qué se usa?

- Proyectos donde los **requisitos evolucionan** durante el desarrollo.
- Cuando se quiere **entregar valor de forma temprana** en lugar de esperar al producto completo.
- Equipos que necesitan **ajustar el rumbo** en función del feedback del cliente.
- La mayoría de proyectos de software modernos.

---

## Conceptos clave

### Iteración (o Sprint)

Una iteración es un ciclo de trabajo de duración fija (habitualmente de 1 a 4 semanas) al cabo del cual se produce un entregable funcional. Cada iteración contiene sus propias fases de planificación, diseño, codificación y pruebas.

### Velocidad del proyecto

La **velocidad** mide cuánto trabajo es capaz de completar el equipo en una iteración. Se expresa en unidades abstractas (puntos de historia, puntos de función…) y sirve para planificar iteraciones futuras de forma realista.

```
Velocidad ≈ puntos completados en iteraciones anteriores

Si en las últimas 3 iteraciones el equipo completó 20, 22 y 18 puntos:
Velocidad estimada = (20 + 22 + 18) / 3 = 20 puntos/iteración
```

### Involucración continua del cliente

A diferencia del modelo en Cascada, el cliente no solo participa al inicio y al final. Revisa el entregable de cada iteración y puede modificar prioridades para la siguiente.

---

## Ciclo de una iteración

### 1. Planificación de la iteración

El equipo y el cliente seleccionan las funcionalidades a desarrollar en esta iteración, priorizadas por valor de negocio y teniendo en cuenta la velocidad del proyecto.

### 2. Diseño

Se diseñan únicamente las clases y relaciones necesarias para las funcionalidades seleccionadas. No se diseña todo el sistema de golpe.

### 3. Codificación

Se implementan las funcionalidades seleccionadas. En entornos ágiles, se aplica **pair programming** y se prueba cada funcionalidad antes o durante la codificación, en lugar de dejar las pruebas para el final del proyecto.

### 4. Pruebas

Se ejecutan los tests unitarios y las pruebas de integración. El entregable solo se considera terminado si pasa todas las pruebas.

### 5. Revisión y retrospectiva

El equipo presenta el entregable al cliente. Además, reflexiona sobre el propio proceso: ¿qué fue bien?, ¿qué se puede mejorar?

---

## Ventajas e inconvenientes

| Aspecto | Ventaja | Inconveniente |
|---------|---------|---------------|
| **Flexibilidad** | Se adapta a cambios de requisitos | Requiere disciplina y buena gestión |
| **Riesgo** | Se detectan problemas pronto | Difícil estimar el coste total al inicio |
| **Cliente** | Implicado durante todo el proyecto | Exige disponibilidad continua del cliente |
| **Calidad** | Pruebas continuas en cada iteración | Puede acumularse deuda técnica si no se refactoriza |
| **Visibilidad** | Entregas frecuentes y tangibles | El alcance total puede ser difuso |

---

## Modelo iterativo vs. Cascada

| | Cascada | Iterativo |
|--|---------|-----------|
| **Requisitos** | Fijos al inicio | Evolucionan durante el proyecto |
| **Entrega** | Una sola entrega al final | Entregas parciales en cada iteración |
| **Feedback del cliente** | Solo al inicio y al final | Continuo |
| **Adaptación al cambio** | Costosa | Natural |
| **Documentación** | Exhaustiva y formal | Justa y necesaria |

---

## Archivos relacionados

- [b-modelo-cascada.md](b-modelo-cascada.md) — Modelo en Cascada
- [g-metodologia-agil.md](g-metodologia-agil.md) — Metodología Ágil y Pair Programming
