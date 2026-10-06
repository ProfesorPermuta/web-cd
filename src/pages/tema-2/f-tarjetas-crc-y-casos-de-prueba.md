# Tarjetas CRC y casos de prueba

Antes de escribir código, un equipo necesita ponerse de acuerdo sobre **qué clases** tiene el sistema, **qué hace cada una** y **cómo se comportan** en situaciones concretas. Las **tarjetas CRC** sirven para lo primero y los **casos de prueba** para lo segundo. En los ejercicios de este tema se piden ambas cosas, así que conviene dominarlas por separado y entender cómo se complementan.

---

## Tarjetas CRC

**CRC** significa **Class – Responsibility – Collaborator** (Clase – Responsabilidad – Colaborador). Es una técnica ágil y muy ligera de diseño: cada clase se describe en una tarjeta (físicamente, una ficha de cartulina) con tres elementos:

| Elemento | Pregunta que responde |
|----------|-----------------------|
| **Clase** | ¿Cómo se llama y qué concepto representa? |
| **Responsabilidades** | ¿Qué **sabe** (datos que conoce) y qué **sabe hacer** (operaciones que ofrece)? |
| **Colaboradores** | ¿A qué **otras clases** necesita pedir ayuda para cumplir sus responsabilidades? |

### Formato

```
┌──────────────────────────────────────────┐
│ Clase: Cuenta                            │
├────────────────────────┬─────────────────┤
│ Responsabilidades      │ Colaboradores   │
├────────────────────────┼─────────────────┤
│ Conocer su saldo       │ —               │
│ Ingresar una cantidad  │ Movimiento      │
│ Retirar una cantidad   │ Movimiento      │
│ Consultar movimientos  │ Movimiento      │
└────────────────────────┴─────────────────┘
```

En los apuntes y soluciones se escriben como tablas Markdown:

| Clase: Cuenta | |
|---|---|
| **Responsabilidades** | **Colaboradores** |
| Conocer su saldo | — |
| Ingresar una cantidad | `Movimiento` |
| Retirar una cantidad | `Movimiento` |
| Consultar movimientos | `Movimiento` |

### Cómo diseñar una tarjeta

1. **Identifica los sustantivos** del enunciado: son candidatos a clase (`Libro`, `Socio`, `Carrito`…).
2. **Identifica los verbos** asociados a cada sustantivo: son candidatos a responsabilidad ("añadir un artículo", "calcular el total").
3. **Redacta cada responsabilidad** como una frase corta, en términos de *qué* se hace, no de *cómo* (sin hablar de bucles ni de código).
4. **Anota los colaboradores**: si para cumplir una responsabilidad la clase necesita datos o servicios de otra, esa otra clase es un colaborador. Si no necesita a nadie, se escribe `—`.
5. **Revisa el reparto**: cada clase debe tener una responsabilidad coherente. Si una tarjeta tiene demasiadas responsabilidades sin relación entre sí, probablemente hay que dividirla en dos clases.

### Buenas prácticas

- Mantén las tarjetas **pequeñas**: si no cabe en una ficha, la clase hace demasiado.
- Una responsabilidad = **una frase**. Evita "gestionar todo lo relacionado con…".
- No incluyas detalles de implementación (tipos de datos, nombres de variables, lenguaje).
- Las tarjetas son **provisionales**: se actualizan en cada iteración, de ahí que encajen bien con el modelo iterativo y las metodologías ágiles.

---

## Simular escenarios con las tarjetas

Una vez hechas las tarjetas, se comprueba que el diseño funciona **recorriendo escenarios**: se elige una situación concreta ("el socio toma prestado un libro") y se sigue, tarjeta a tarjeta, qué clase actúa y a quién le pide ayuda. En equipo se reparten las tarjetas y cada persona "es" una clase.

```
Escenario: ingresar 50 € en una cuenta con saldo 100 €

1. Cuenta recibe la petición "ingresar 50".
2. Cuenta comprueba que la cantidad es mayor que 0.
3. Cuenta pide a Movimiento que registre el ingreso.
4. Cuenta actualiza su saldo → 150.
```

Si durante la simulación una clase necesita algo que **no está en ninguna tarjeta**, se ha detectado un fallo de diseño *antes* de escribir código: falta una responsabilidad, un colaborador o incluso una clase entera.

---

## Casos de prueba

Un **caso de prueba** describe una **situación concreta** y el **resultado exacto** que debe producirse. Mientras que una responsabilidad dice "la `Cuenta` sabe retirar una cantidad", un caso de prueba dice "si la cuenta tiene 100 € y se retiran 30 €, el saldo pasa a ser 70 €".

Un caso de prueba se compone siempre de tres partes:

| Parte | Significado | Ejemplo |
|-------|-------------|---------|
| **Situación inicial** (dado) | Estado de partida de los objetos | Una cuenta con saldo 100 € |
| **Acción** (cuando) | Operación que se ejecuta, con sus datos | Se retiran 30 € |
| **Resultado esperado** (entonces) | Qué debe devolver o cómo debe quedar el objeto | El saldo es 70 € |

> Un caso de prueba **no es código**. En este tema se escriben en prosa: lo importante es que sean concretos, con números reales y un resultado que se pueda comprobar sin ambigüedad.

### Casos concretos bien formulados

Compara estas dos formulaciones:

|  Vago |  Concreto |
|--------|------------|
| "Comprobar que retirar dinero funciona" | "Con saldo 100 €, retirar 30 € deja el saldo en 70 €" |
| "Probar que no se puede retirar de más" | "Con saldo 100 €, retirar 150 € es rechazado y el saldo sigue siendo 100 €" |
| "Ver que el carrito suma bien" | "Tras añadir artículos de 10 € y 15 €, el total es 25 €" |

El primer tipo no permite saber si la prueba ha pasado o fallado; el segundo, sí.

### Qué tipos de caso conviene pensar

Para cada responsabilidad de una tarjeta, intenta redactar casos de estos grupos:

| Tipo | Idea | Ejemplo (`Cuenta.retirar`) |
|------|------|----------------------------|
| **Caso normal** | El uso habitual, que debe tener éxito | Saldo 100 €, retirar 30 € → saldo 70 € |
| **Valor límite** | El borde exacto entre lo válido y lo inválido | Saldo 100 €, retirar 100 € → saldo 0 € |
| **Caso inválido** | Una petición que debe rechazarse | Saldo 100 €, retirar 150 € → rechazado, saldo sigue en 100 € |
| **Dato absurdo** | Valores sin sentido | Retirar 0 € o una cantidad negativa → rechazado, saldo sin cambios |
| **Estado vacío / inicial** | Objeto recién creado | Cuenta nueva → saldo 0 € |

Fíjate en que los casos inválidos **también** especifican qué ocurre con el objeto: un rechazo correcto no debe dejar el sistema a medias o con datos modificados.

---

## De la tarjeta a los casos de prueba

Los casos de prueba se derivan directamente de las tarjetas: **cada responsabilidad debería tener, al menos, un caso normal y uno de rechazo o límite**.

| Responsabilidad (tarjeta) | Casos de prueba derivados |
|---------------------------|---------------------------|
| Conocer su saldo | **C1:** una cuenta nueva tiene saldo 0 € |
| Ingresar una cantidad | **C2:** saldo 100 €, ingresar 50 € → saldo 150 € <br /> **C3:** ingresar una cantidad negativa → rechazado, saldo sin cambios |
| Retirar una cantidad | **C4:** saldo 100 €, retirar 30 € → saldo 70 € <br /> **C5:** saldo 100 €, retirar 100 € → saldo 0 € <br /> **C6:** saldo 100 €, retirar 150 € → rechazado, saldo sigue en 100 € |
| Consultar movimientos | **C7:** tras un ingreso y una retirada, se listan 2 movimientos |

Este paso es útil en dos sentidos:

- **Valida el diseño**: si no sabes escribir un caso de prueba para una responsabilidad, es que la responsabilidad está mal definida.
- **Define cuándo se ha terminado**: una funcionalidad está lista cuando pasa todos sus casos de prueba (la idea del **TDD** vista en [g-metodologia-agil.md](g-metodologia-agil.md)).

---

## Casos de prueba en cada iteración

En un modelo iterativo, tarjetas y casos **crecen juntos** con cada iteración:

```
Iteración 1:  tarjetas básicas       → casos C1…C3
Iteración 2:  se añade una función   → tarjeta actualizada → casos nuevos C4…C7
              + se vuelven a comprobar los casos de la iteración 1
```

Dos reglas prácticas:

1. **Cada funcionalidad nueva añade casos nuevos** (normal, límite e inválido).
2. **Los casos antiguos se siguen cumpliendo**: añadir descuentos o eliminar artículos no debe romper que "un carrito vacío tenga total 0". Comprobarlo se llama **prueba de regresión**.

---

## Pasos para resolver un ejercicio

Cuando un ejercicio pida "diseña las tarjetas CRC" y "escribe los casos de prueba":

1. Lee el enunciado y **subraya sustantivos y verbos**.
2. Crea **una tarjeta por clase** con sus responsabilidades y colaboradores.
3. Para cada responsabilidad, escribe **al menos un caso normal y un caso de rechazo o límite**, con **valores numéricos concretos**.
4. Si el ejercicio describe un flujo (varios pasos seguidos), **recórrelo con las tarjetas** y anota, en cada paso, qué clase actúa, a quién llama y cómo queda el estado de cada objeto.
5. Si hay una segunda iteración, **actualiza las tarjetas y añade casos nuevos**, sin borrar los anteriores.

### Ejemplo de seguimiento de un flujo

Cuenta con saldo inicial 100 €:

| Paso | Acción | Clase que actúa | ¿Éxito? | Saldo resultante |
|------|--------|-----------------|---------|------------------|
| 1 | Retirar 70 € | `Cuenta` | Sí | 30 € |
| 2 | Retirar 50 € | `Cuenta` | **No** (saldo insuficiente) | 30 € (sin cambios) |
| 3 | Ingresar 20 € | `Cuenta` | Sí | 50 € |
| 4 | Retirar 50 € | `Cuenta` | Sí | 0 € |

Observa que el paso 2 falla y, aun así, **el estado queda intacto**; ese es exactamente el tipo de detalle que un buen caso de prueba debe dejar escrito.

---

## Errores frecuentes

| Error | Por qué es un problema | Corrección |
|-------|------------------------|------------|
| Escribir solo el caso feliz | No se prueban los rechazos ni los límites, donde suelen esconderse los fallos | Añadir siempre un caso inválido y un valor límite |
| Casos sin valores concretos | No se puede decidir si la prueba pasa o falla | Usar números y resultados exactos |
| No indicar qué pasa con el objeto tras un rechazo | Un fallo podría dejar datos corruptos sin que nadie lo note | Especificar que el estado no cambia |
| Tarjetas con responsabilidades vagas | Imposible derivar casos de ellas | Una frase, una acción comprobable |
| Olvidar los casos antiguos al añadir funciones | Se rompe lo que ya funcionaba sin darse cuenta | Revisar los casos previos en cada iteración |

---

## Archivos relacionados

- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo (las tarjetas se actualizan en cada iteración)
- [g-metodologia-agil.md](g-metodologia-agil.md) — Metodología Ágil, pair programming y TDD
- [i-ejercicios-y-soluciones.md](i-ejercicios-y-soluciones.md) — Ejercicios y soluciones
