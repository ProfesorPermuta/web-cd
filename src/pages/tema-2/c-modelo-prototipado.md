# Modelo de Prototipado

El **modelo de prototipado** es un enfoque en el que se construye una versión preliminar del sistema — el **prototipo** — con el objetivo de validar los requisitos con el cliente antes de desarrollar el producto final. Es especialmente útil cuando los requisitos son vagos o cuando el cliente tiene dificultades para definir lo que quiere sin ver algo concreto.

```
Requisitos iniciales
        ↓
  Construcción del prototipo
        ↓
  Evaluación con el cliente
        ↓
   ¿Aprobado?
   /        \
  No         Sí
  ↓           ↓
Refinamiento  Desarrollo del sistema final
```

---

## ¿Para qué se usa?

- Cuando los **requisitos son poco claros** o cambian frecuentemente.
- Para obtener **retroalimentación temprana** del cliente antes de invertir en el desarrollo completo.
- Para validar la interfaz de usuario o el flujo de trabajo de una aplicación.
- Cuando se exploran tecnologías desconocidas para el equipo.

---

## Tipos de prototipos

### Prototipo desechable (Throwaway)

Se construye únicamente para aclarar requisitos. Una vez validado, se **descarta** y se comienza el desarrollo real desde cero con un diseño limpio.

:::tip Cuándo usarlo
Cuando el prototipo es rápido y sucio ("quick and dirty") y no conviene construir el sistema final sobre una base de código experimental.
:::

### Prototipo evolutivo

El prototipo se **refina iterativamente** hasta convertirse en el producto final. Cada ciclo de evaluación añade calidad y funcionalidad.

:::warning Riesgo
Si no se gestiona bien, el código del prototipo acaba siendo el código de producción sin haber pasado por un diseño adecuado. Esto genera deuda técnica.
:::

---

## Ejemplo: prototipo de una clase en Java

Supón que el cliente quiere un sistema de facturación pero no tiene claro qué datos necesita cada factura. Un prototipo rápido podría ser:

```java
// Prototipo inicial: clase Factura con los campos que creemos necesarios
// Esta versión se revisará con el cliente y probablemente cambiará
public class Factura {
    private String numeroFactura;
    private String cliente;
    private double importe;

    public Factura(String numeroFactura, String cliente, double importe) {
        this.numeroFactura = numeroFactura;
        this.cliente = cliente;
        this.importe = importe;
    }

    public String resumen() {
        return "Factura " + numeroFactura + " | " + cliente + " | " + importe + " €";
    }
}
```

Tras mostrar el prototipo al cliente, este puede indicar que también necesita la fecha de emisión, el CIF del cliente, y el desglose de IVA. Con esa información, se rediseña la clase para el sistema final:

```java
// Versión final tras validación con el cliente
public class Factura {
    private String numeroFactura;
    private String nombreCliente;
    private String cifCliente;
    private java.time.LocalDate fechaEmision;
    private double baseImponible;
    private double porcentajeIva;

    public Factura(String numeroFactura, String nombreCliente, String cifCliente,
                   java.time.LocalDate fechaEmision, double baseImponible, double porcentajeIva) {
        this.numeroFactura = numeroFactura;
        this.nombreCliente = nombreCliente;
        this.cifCliente = cifCliente;
        this.fechaEmision = fechaEmision;
        this.baseImponible = baseImponible;
        this.porcentajeIva = porcentajeIva;
    }

    public double calcularTotal() {
        return baseImponible * (1 + porcentajeIva / 100);
    }

    public String getNumeroFactura() { return numeroFactura; }
    public String getNombreCliente() { return nombreCliente; }
    public double getBaseImponible() { return baseImponible; }
    public double calcularIva() { return baseImponible * porcentajeIva / 100; }
}
```

---

## Ventajas e inconvenientes

| Aspecto | Ventaja | Inconveniente |
|---------|---------|---------------|
| **Requisitos** | Se validan antes de desarrollar | El cliente puede confundir el prototipo con el producto final |
| **Comunicación** | Mejora el entendimiento cliente-equipo | Puede crear expectativas falsas de plazos |
| **Calidad** | Detecta problemas de diseño pronto | El prototipo evolutivo puede degradar la calidad del código |
| **Coste** | Reduce el riesgo de construir lo equivocado | Añade tiempo si no se gestiona bien |

---

## Archivos relacionados

- [b-modelo-cascada.md](b-modelo-cascada.md) — Modelo en Cascada
- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo y Adaptable
