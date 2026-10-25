# Modelo en Cascada (Ciclo de Vida Tradicional)

El **modelo en Cascada** (Waterfall) es el modelo de ciclo de vida más antiguo y más conocido. Organiza el desarrollo en fases secuenciales: cada fase debe completarse y aprobarse antes de que comience la siguiente, igual que el agua que cae de un escalón al siguiente sin poder subir.

```
Planificación
     ↓
Análisis de Requisitos
     ↓
Diseño
     ↓
Codificación
     ↓
Pruebas
     ↓
Mantenimiento
```

---

## ¿Para qué se usa?

- Proyectos con **requisitos bien definidos y estables** desde el inicio.
- Entornos regulados donde cada fase debe quedar documentada y aprobada formalmente (sector público, aeronáutica, sanidad).
- Proyectos pequeños y bien acotados donde los cambios son poco probables.

---

## Fases del modelo en Cascada

### 1. Planificación

Se define el alcance del proyecto: qué se va a construir, con qué recursos, en qué plazo y con qué presupuesto. El resultado es el **Plan del Proyecto**.

### 2. Análisis de Requisitos

El equipo trabaja con el cliente para identificar y documentar todos los requisitos funcionales y no funcionales. El resultado es el **Documento de Especificación de Requisitos (SRS)**.

:::tip
**Clave**

Un requisito mal capturado en esta fase se convierte en un error caro de corregir en fases posteriores.
:::

### 3. Diseño

Se define la arquitectura del sistema: qué clases existirán, cómo se comunicarán, qué base de datos se usará. En Java, aquí se deciden los paquetes, las interfaces y las relaciones entre clases.

### 4. Codificación

Los programadores implementan el diseño. En un proyecto bien organizado, el código debe reflejar fielmente el diseño acordado en la fase anterior: las mismas partes del sistema, con las mismas responsabilidades, que se definieron sobre el papel.

### 5. Pruebas

Se verifica que el software construido cumple los requisitos documentados en la fase de análisis. Si se encuentran defectos, se corrigen antes de entregar.

### 6. Mantenimiento

Una vez entregado el producto, comienza la fase de mantenimiento: corrección de errores en producción, adaptaciones y mejoras menores.

---

## Ventajas e inconvenientes

| Aspecto | Ventaja | Inconveniente |
|---------|---------|---------------|
| **Estructura** | Clara y fácil de gestionar | Rígida, difícil de adaptar |
| **Documentación** | Exhaustiva en cada fase | Puede volverse un fin en sí misma |
| **Detección de errores** | — | Los errores se detectan tarde (en Pruebas) |
| **Participación del cliente** | Alta al inicio | Nula durante el desarrollo |
| **Entrega** | Un único entregable final | El cliente no ve nada hasta el final |

---

## Cuándo NO usar el modelo en Cascada

- Cuando los requisitos son **inciertos o cambiantes** (la mayoría de proyectos reales).
- Cuando se necesita entregar valor al cliente de forma incremental.
- En proyectos largos donde el mercado o la tecnología pueden cambiar durante el desarrollo.

:::warning
**Atención**

El mayor riesgo del modelo en Cascada es llegar a la fase de Pruebas y descubrir que el sistema no satisface las necesidades reales del cliente, porque estas evolucionaron durante los meses de desarrollo.
:::

---

## Archivos relacionados

- [a-introduccion.md](a-introduccion.md) — Introducción a la Ingeniería de Software
- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo y Adaptable
