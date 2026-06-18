# Errores Comunes en Ingeniería de Software

---

## Error 1: Comenzar a codificar sin análisis previo

El equipo empieza a escribir código nada más recibir el encargo, sin haber definido los requisitos ni el diseño. El resultado es un sistema que no satisface las necesidades del cliente y que hay que reescribir parcialmente.

```java
// Incorrecto: clase creada sin análisis — mezcla responsabilidades,
// atributos mal pensados y lógica acoplada al main
public class Sistema {
    public String nombre;  // atributo public
    public double x;       // nombre sin significado

    public void hacerCosas(double n) {
        // lógica de negocio mezclada con presentación
        System.out.println("Resultado: " + n * 1.21);
    }
}

// Correcto: clase surgida del análisis y del diseño previo
public class Producto {
    private String nombre;
    private double precioBase;

    public Producto(String nombre, double precioBase) {
        this.nombre = nombre;
        this.precioBase = precioBase;
    }

    // El método calcula y devuelve; no imprime
    public double calcularPrecioConIva(double porcentajeIva) {
        return precioBase * (1 + porcentajeIva / 100);
    }

    public String getNombre() { return nombre; }
    public double getPrecioBase() { return precioBase; }
}
```

---

## Error 2: Confundir modelo de ciclo de vida con metodología

Un error conceptual frecuente es usar los términos "modelo" y "metodología" indistintamente. El modelo define *qué fases* existen; la metodología define *cómo* se ejecutan.

```
// Incorrecto (confusión conceptual):
"Vamos a usar el modelo Ágil"  ← Ágil es una metodología, no un modelo de ciclo de vida

// Correcto:
"Vamos a usar un modelo iterativo con la metodología Ágil"
"Vamos a usar un modelo en cascada siguiendo Métrica v3"
```

---

## Error 3: Atributos públicos en las clases de modelo

Exponer los atributos directamente viola el principio de encapsulación y hace que el código sea frágil: cualquier clase puede modificar el estado del objeto sin control.

```java
// Incorrecto: atributos públicos
public class Cliente {
    public String nombre;
    public double saldo;
}

// En otro lugar del código, alguien puede hacer:
// cliente.saldo = -9999;  // sin ninguna validación posible

// Correcto: atributos privados con acceso controlado
public class Cliente {
    private String nombre;
    private double saldo;

    public Cliente(String nombre, double saldoInicial) {
        this.nombre = nombre;
        this.saldo = Math.max(0, saldoInicial); // validación en el constructor
    }

    public boolean ingresar(double cantidad) {
        if (cantidad <= 0) return false;
        saldo += cantidad;
        return true;
    }

    public String getNombre() { return nombre; }
    public double getSaldo() { return saldo; }
}
```

---

## Error 4: El prototipo evolutivo sin refactorización

Al usar el modelo de prototipado evolutivo, el código del prototipo inicial (rápido y con atajos) acaba convirtiéndose en código de producción sin haber sido revisado ni refactorizado.

```java
// Código de prototipo: sin validaciones, sin encapsulación,
// con nombres provisionales. NO debe llegar a producción sin revisión.
public class Calc {
    public double op(double a, double b, String t) {
        if (t.equals("+")) return a + b;
        if (t.equals("-")) return a - b;
        return 0; // falta gestión de operación no reconocida
    }
}

// Versión refactorizada para producción:
public class Calculadora {
    public double sumar(double a, double b) { return a + b; }
    public double restar(double a, double b) { return a - b; }
    public double multiplicar(double a, double b) { return a * b; }

    public double dividir(double a, double b) {
        if (b == 0) throw new ArithmeticException("División por cero no permitida");
        return a / b;
    }
}
```

---

## Error 5: Imprimir en los métodos de las clases de modelo

En un diseño orientado a objetos bien estructurado, las clases de modelo calculan y devuelven valores. El `main` (o la capa de presentación) es el responsable de mostrar información por pantalla.

```java
// Incorrecto: el método imprime directamente
public class Factura {
    private double total;

    public void mostrarTotal() {
        System.out.println("El total es: " + total); // acoplado a la consola
    }
}

// Correcto: el método devuelve el valor; quien llama decide cómo mostrarlo
public class Factura {
    private double total;

    public Factura(double total) {
        this.total = total;
    }

    public double getTotal() {
        return total; // devuelve el dato; no lo imprime
    }
}

// En el main:
// Factura f = new Factura(250.0);
// System.out.println("El total es: " + f.getTotal());
```

---

## Error 6: Ignorar la retroalimentación del cliente en iteraciones ágiles

En metodologías ágiles, la revisión al final de cada iteración es obligatoria. Ignorar el feedback o aplazar la revisión hasta el final convierte el modelo iterativo en un modelo en cascada disfrazado.

```
// Incorrecto: el cliente no ve nada hasta el final del proyecto
Iteración 1 → (sin revisión)
Iteración 2 → (sin revisión)
Iteración 3 → (sin revisión)
Entrega final → "Esto no es lo que quería"

// Correcto: revisión al final de cada iteración
Iteración 1 → Revisión → Feedback → Ajuste de prioridades
Iteración 2 → Revisión → Feedback → Ajuste de prioridades
Iteración 3 → Revisión → Feedback → Producto validado
```
