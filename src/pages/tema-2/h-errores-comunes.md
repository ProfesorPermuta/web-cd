# Errores Comunes en Ingeniería de Software

---

## Error 1: Comenzar a codificar sin análisis previo

El equipo empieza a escribir código nada más recibir el encargo, sin haber definido los requisitos ni el diseño. Por ejemplo, se pone a programar directamente una funcionalidad de facturación sin haber hablado antes con el cliente sobre qué datos necesita cada factura ni cómo deben calcularse los importes. El resultado es un sistema que no satisface las necesidades reales y que hay que reescribir parcialmente, perdiendo el tiempo invertido.

**Correcto:** dedicar tiempo al análisis de requisitos y al diseño antes de escribir la primera línea de código, aunque parezca que se avanza más lento al principio.

---

## Error 2: Confundir modelo de ciclo de vida con metodología

Un error conceptual frecuente es usar los términos "modelo" y "metodología" indistintamente. El modelo define *qué fases* existen; la metodología define *cómo* se ejecutan.

```
Incorrecto (confusión conceptual):
"Vamos a usar el modelo Ágil"  ← Ágil es una metodología, no un modelo de ciclo de vida

Correcto:
"Vamos a usar un modelo iterativo con la metodología Ágil"
"Vamos a usar un modelo en cascada siguiendo Métrica v3"
```

---

## Error 3: Diseñar clases sin pensar en la protección de sus datos

Al diseñar las clases de un sistema, es un error dejar que cualquier otra parte del programa pueda modificar libremente los datos de un objeto sin ningún control. Por ejemplo, si el saldo de una cuenta bancaria pudiera modificarse directamente desde cualquier punto del programa, nada impediría que alguien lo dejara en un valor negativo sin pasar por ninguna validación.

**Correcto:** diseñar las clases de forma que los datos solo puedan modificarse a través de operaciones controladas (por ejemplo, "ingresar" o "retirar"), que puedan comprobar que el cambio tiene sentido antes de aplicarlo.

---

## Error 4: Mostrar información por pantalla desde el lugar equivocado

En un diseño bien estructurado, cada parte del sistema tiene una responsabilidad clara: unas partes calculan datos y otras se encargan de mostrarlos al usuario. Cuando estas responsabilidades se mezclan —por ejemplo, cuando la parte del sistema que calcula el total de una factura es también la que decide cómo y cuándo mostrarlo en pantalla—, el sistema se vuelve difícil de reutilizar y de adaptar: si mañana ese cálculo hay que mostrarlo en una pantalla distinta o enviarlo por correo en lugar de imprimirlo, hay que tocar código que no debería depender de dónde se muestra el resultado.

**Correcto:** separar quién calcula un dato de quién decide cómo mostrarlo.

---

## Error 5: Ignorar la retroalimentación del cliente en iteraciones ágiles

En metodologías ágiles, la revisión al final de cada iteración es obligatoria. Ignorar el feedback o aplazar la revisión hasta el final convierte el modelo iterativo en un modelo en cascada disfrazado.

```
Incorrecto: el cliente no ve nada hasta el final del proyecto
Iteración 1 → (sin revisión)
Iteración 2 → (sin revisión)
Iteración 3 → (sin revisión)
Entrega final → "Esto no es lo que quería"

Correcto: revisión al final de cada iteración
Iteración 1 → Revisión → Feedback → Ajuste de prioridades
Iteración 2 → Revisión → Feedback → Ajuste de prioridades
Iteración 3 → Revisión → Feedback → Producto validado
```
