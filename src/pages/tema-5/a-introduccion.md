# Introducción al Código Limpio y la Refactorización

El **código limpio** (*clean code*) es aquel que cualquier programador puede leer, entender y modificar sin esfuerzo extra. No basta con que el programa funcione: el código también debe comunicar claramente su intención.

La **refactorización** es el proceso de mejorar la estructura interna del código sin cambiar su comportamiento observable. Es como reformar el interior de un edificio sin tocar su fachada.

```java
// Código sucio: ¿qué hace esto?
public double calc(double x, int y) {
    return x - (x * y / 100);
}

// Código limpio: la intención es evidente
public double applyDiscount(double originalPrice, int discountPercentage) {
    double discountAmount = originalPrice * discountPercentage / 100.0;
    return originalPrice - discountAmount;
}
```

---

## ¿Por qué escribir código limpio?

Imagina recibir el manual de instrucciones de un electrodoméstico escrito en jerga técnica incomprensible. Aunque el aparato funcione perfectamente, el manual inútil te obligará a perder tiempo descifrándolo cada vez que lo consultes. El código sucio hace lo mismo con tu equipo.

El código se lee muchas más veces de las que se escribe:

- **Facilita el mantenimiento**: un colega (o tu yo del futuro) puede entender el código sin preguntar.
- **Reduce errores**: el código claro expone los bugs; el sucio los esconde.
- **Acelera el desarrollo**: modificar código limpio es rápido y seguro.
- **Hace posible la refactorización continua**: solo se puede mejorar lo que se entiende.

---

## Señales de código sucio (*code smells*)

Un **code smell** es una señal de que algo podría mejorarse. No es necesariamente un error, pero indica que el diseño tiene un problema.

| Code smell | Descripción | Solución habitual |
|---|---|---|
| **Método largo** | Más de 20-30 líneas haciendo cosas distintas | Extraer métodos con nombres descriptivos |
| **Clase gigante** | Una clase con demasiadas responsabilidades | Dividir en clases más pequeñas (SRP) |
| **Números mágicos** | Valores literales sin contexto (`0.21`, `7`) | Extraer a constantes con nombre |
| **Comentarios innecesarios** | Comentarios que explican *qué* hace el código en lugar del *por qué* | Renombrar para que el código se explique solo |
| **Código duplicado** | La misma lógica repetida en varios sitios | Extraer a un método o clase común |
| **Cadenas de `if/else`** | Condiciones sobre el tipo de un objeto | Aplicar polimorfismo o patrón Strategy/State |

```java
// Code smell: número mágico y nombre poco descriptivo
public double calc(double amount) {
    return amount * 0.21; // ¿qué es 0.21?
}

// Refactorizado: la constante comunica la intención
private static final double IVA_RATE = 0.21;

public double calculateVAT(double netAmount) {
    return netAmount * IVA_RATE;
}
```

---

## Principios básicos del código limpio

### Nombres que comunican intención

Los nombres de variables, métodos y clases deben responder a la pregunta: «¿qué hace esto?» sin necesidad de comentarios adicionales.

```java
// Incorrecto: nombres sin significado
int d; // días transcurridos
List<int[]> list1;

// Correcto:
int elapsedDays;
List<int[]> gameBoard;
```

### Métodos pequeños con una sola responsabilidad

Un método debe hacer **una sola cosa** y hacerla bien. Si necesitas la conjunción «y» para describir lo que hace un método, probablemente deberías dividirlo.

```java
// Incorrecto: un método hace demasiado
public void processOrder(Order order) {
    // Valida el pedido
    if (order.getItems().isEmpty()) throw new IllegalStateException("Empty order");
    // Calcula el total
    double total = order.getItems().stream().mapToDouble(Item::getPrice).sum();
    order.setTotal(total);
    // Envía el correo de confirmación
    emailService.send(order.getCustomerEmail(), "Order confirmed: " + total);
    // Guarda en base de datos
    orderRepository.save(order);
}

// Correcto: cada responsabilidad en su propio método
public void processOrder(Order order) {
    validateOrder(order);
    calculateTotal(order);
    sendConfirmationEmail(order);
    orderRepository.save(order);
}
```

---

## Refactorización: técnicas fundamentales

| Técnica | ¿Cuándo aplicarla? |
|---|---|
| **Extraer método** | Un bloque de código tiene comentario propio o es demasiado largo |
| **Renombrar** | El nombre actual no comunica la intención |
| **Extraer clase** | Una clase tiene múltiples grupos de atributos y métodos no relacionados |
| **Reemplazar condicional por polimorfismo** | Hay `if/switch` sobre el tipo de un objeto |
| **Introducir variable explicativa** | Una expresión compleja resulta difícil de leer |

:::tip
**Refactoriza con pruebas**

Antes de refactorizar, asegúrate de tener pruebas que cubran el comportamiento actual. Si las pruebas siguen pasando tras el cambio, el comportamiento se ha preservado.
:::

---

## Estructura del tema

Este tema aborda los pilares del diseño limpio en Java:

1. **Principios SOLID** — reglas de diseño que guían cómo organizar clases e interfaces.
2. **Patrones creacionales** — soluciones para crear objetos de forma controlada y flexible.
3. **Patrones estructurales** — soluciones para componer clases y objetos.
4. **Patrones de comportamiento** — soluciones para la comunicación entre objetos.

Cada sección incluye ejemplos progresivos, señales para identificar cuándo aplicar cada solución y los errores más frecuentes.
