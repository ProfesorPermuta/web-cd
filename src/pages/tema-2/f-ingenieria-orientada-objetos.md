# Ingeniería Orientada a Objetos (IOO)

La **Ingeniería Orientada a Objetos** (IOO) es una metodología de desarrollo que aplica los principios de la **Programación Orientada a Objetos** (POO) a todas las fases del ciclo de vida: análisis, diseño y codificación. El sistema se modela como un conjunto de objetos que colaboran entre sí, en lugar de como una secuencia de funciones o procedimientos.

Piensa en un sistema como un equipo de personas especializadas: el objeto `Cajero` sabe cómo procesar un cobro, el objeto `Inventario` sabe qué hay en stock, el objeto `Factura` sabe cómo presentar el resumen. Cada uno hace su trabajo y se comunica con los demás a través de mensajes (llamadas a métodos).

---

## ¿Para qué se usa?

- Proyectos donde el dominio del problema se modela naturalmente como entidades con estado y comportamiento.
- Sistemas que deben ser **mantenibles y extensibles** a lo largo del tiempo.
- Equipos que trabajan en Java, C++, Python u otros lenguajes orientados a objetos.

---

## Las tres fases de la IOO

### 1. Análisis Orientado a Objetos (AOO)

El objetivo es identificar las **clases del dominio**: qué entidades existen en el mundo real que el sistema debe representar. Se modelan sus atributos y las relaciones entre ellas.

**Herramienta principal: Tarjetas CRC**

### 2. Diseño Orientado a Objetos (DOO)

Se define la arquitectura técnica: cómo se organizan las clases en paquetes, qué interfaces expone cada clase, cómo se gestionan la persistencia y la comunicación.

### 3. Codificación Orientada a Objetos

Las clases diseñadas se implementan directamente en Java, respetando los principios de encapsulación, herencia y polimorfismo.

---

## Tarjetas CRC

Las **tarjetas CRC** (Class-Responsibility-Collaborator) son una técnica de diseño colaborativo. Cada tarjeta representa una clase e indica:

- **Clase**: nombre de la clase.
- **Responsabilidades**: qué sabe hacer esa clase (sus métodos) y qué sabe sobre sí misma (sus atributos).
- **Colaboradores**: otras clases con las que necesita interactuar para cumplir sus responsabilidades.

```
┌──────────────────────────────────────────────┐
│  Clase: Pedido                               │
├──────────────────────┬───────────────────────┤
│  Responsabilidades   │    Colaboradores       │
├──────────────────────┼───────────────────────┤
│ - Calcular total     │  LineaPedido           │
│ - Añadir línea       │  Cliente               │
│ - Mostrar resumen    │                        │
│ - Conocer su estado  │                        │
└──────────────────────┴───────────────────────┘
```

Las tarjetas CRC se usan de forma presencial, con tarjetas físicas sobre una mesa, para debatir el diseño con todo el equipo antes de escribir una sola línea de código.

---

## De la tarjeta CRC al código Java

Una vez definidas las responsabilidades mediante las tarjetas CRC, la traducción a Java es directa:

```java
// Clase LineaPedido: representa un artículo dentro de un pedido
public class LineaPedido {
    private String nombreProducto;
    private int cantidad;
    private double precioUnitario;

    public LineaPedido(String nombreProducto, int cantidad, double precioUnitario) {
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    // Responsabilidad: calcular el subtotal de esta línea
    public double calcularSubtotal() {
        return cantidad * precioUnitario;
    }

    public String getNombreProducto() { return nombreProducto; }
    public int getCantidad() { return cantidad; }
    public double getPrecioUnitario() { return precioUnitario; }
}
```

```java
import java.util.ArrayList;
import java.util.List;

// Clase Pedido: agrega líneas y calcula el total
// Colabora con: LineaPedido
public class Pedido {
    private int numeroPedido;
    private List<LineaPedido> lineas;

    public Pedido(int numeroPedido) {
        this.numeroPedido = numeroPedido;
        this.lineas = new ArrayList<>();
    }

    // Responsabilidad: añadir una línea al pedido
    public void agregarLinea(LineaPedido linea) {
        lineas.add(linea);
    }

    // Responsabilidad: calcular el total del pedido
    public double calcularTotal() {
        double total = 0;
        for (LineaPedido linea : lineas) {
            total += linea.calcularSubtotal();
        }
        return total;
    }

    public int getNumeroPedido() { return numeroPedido; }
    public int getNumeroLineas() { return lineas.size(); }
}
```

---

## Principios clave de la IOO

| Principio | Descripción | Analogía |
|-----------|-------------|---------|
| **Encapsulación** | Los atributos son `private`; el acceso se controla con métodos | Un cajero automático: introduces la tarjeta, no tocas el dinero directamente |
| **Herencia** | Una clase hija extiende la clase padre reutilizando su código | Un martillo especializado para carpintería hereda del concepto genérico de martillo |
| **Polimorfismo** | Objetos distintos responden al mismo mensaje de forma diferente | Un botón "Imprimir" hace cosas distintas en Word que en Chrome |
| **Abstracción** | Se modela solo lo relevante para el sistema | Un mapa de metro omite calles pero muestra conexiones |

---

## Archivos relacionados

- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo (contexto habitual de la IOO)
- [g-metodologia-agil.md](g-metodologia-agil.md) — Metodología Ágil y Pair Programming
