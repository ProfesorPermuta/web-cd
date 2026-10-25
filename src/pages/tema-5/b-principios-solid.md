# Principios SOLID

Los **principios SOLID** son cinco reglas de diseño orientado a objetos formuladas por Robert C. Martin. Seguirlos produce código más mantenible, extensible y fácil de probar. Son la base sobre la que se construyen los patrones de diseño.

```java
// Violación de SOLID clásica: una clase que hace de todo
public class UserManager {
    public void saveUser(User user) { /* acceso a BD */ }
    public void sendWelcomeEmail(User user) { /* envío de correo */ }
    public String generateReport(List<User> users) { /* generación de informes */ }
}
```

---

## S — Single Responsibility Principle (SRP)

**Una clase debe tener una sola razón para cambiar**, es decir, una única responsabilidad.

Piensa en una navaja suiza: es útil en situaciones de emergencia, pero nadie la usaría como herramienta profesional de cocina, carpintería y cirugía a la vez. Cada herramienta especializada hace su trabajo mejor.

```java
// Incorrecto: InvoiceService mezcla lógica de negocio, persistencia y notificación
public class InvoiceService {
    public double calculateTotal(Invoice invoice) {
        return invoice.getItems().stream().mapToDouble(Item::getPrice).sum();
    }

    public void saveToDatabase(Invoice invoice) {
        // lógica de acceso a BD
    }

    public void sendByEmail(Invoice invoice, String recipient) {
        // lógica de envío de correo
    }
}

// Correcto: cada responsabilidad en su propia clase
public class InvoicePricingService {
    public double calculateTotal(Invoice invoice) {
        return invoice.getItems().stream().mapToDouble(Item::getPrice).sum();
    }
}

public class InvoiceRepository {
    public void save(Invoice invoice) {
        // lógica de acceso a BD
    }
}

public class InvoiceEmailSender {
    public void send(Invoice invoice, String recipient) {
        // lógica de envío de correo
    }
}
```

:::tip
**Señal de violación**

Si necesitas un comentario del tipo `// lógica de facturación` y más abajo `// lógica de correo` dentro de la misma clase, es momento de dividirla.
:::

---

## O — Open/Closed Principle (OCP)

**Las clases deben estar abiertas para la extensión pero cerradas para la modificación.** Se añade comportamiento nuevo creando clases nuevas, no modificando las existentes.

```java
// Incorrecto: cada vez que se añade un tipo de descuento hay que abrir esta clase
public class DiscountCalculator {
    public double calculate(Order order, String discountType) {
        if (discountType.equals("STUDENT")) {
            return order.getTotal() * 0.10;
        } else if (discountType.equals("SENIOR")) {
            return order.getTotal() * 0.15;
        } else if (discountType.equals("VIP")) {
            return order.getTotal() * 0.20;
        }
        return 0;
    }
}

// Correcto: una interfaz; cada descuento es una implementación nueva
public interface DiscountPolicy {
    double calculate(Order order);
}

public class StudentDiscount implements DiscountPolicy {
    @Override
    public double calculate(Order order) {
        return order.getTotal() * 0.10;
    }
}

public class SeniorDiscount implements DiscountPolicy {
    @Override
    public double calculate(Order order) {
        return order.getTotal() * 0.15;
    }
}

// Añadir VIP no toca ninguna clase existente
public class VipDiscount implements DiscountPolicy {
    @Override
    public double calculate(Order order) {
        return order.getTotal() * 0.20;
    }
}
```

---

## L — Liskov Substitution Principle (LSP)

**Una subclase debe poder sustituir a su clase base sin que el programa deje de funcionar correctamente.** Si una subclase cambia o rompe el comportamiento prometido por la base, la herencia es incorrecta.

El principio lleva el nombre de Barbara Liskov. La idea es sencilla: si tienes un método que espera un `Animal`, debe funcionar igual de bien si le pasas un `Dog` o un `Cat` (subclases de `Animal`).

```java
// Incorrecto: Square hereda de Rectangle pero rompe su contrato
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width)   { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int side) {
        this.width = side;
        this.height = side; // rompe la postcondición: height ya no es independiente
    }

    @Override
    public void setHeight(int side) {
        this.width = side;
        this.height = side;
    }
}

// Código que falla cuando recibe un Square en lugar de un Rectangle:
void resizeWidth(Rectangle rect) {
    int originalHeight = rect.height;
    rect.setWidth(10);
    // Asumimos que height no cambia → falla con Square
    assert rect.getArea() == 10 * originalHeight;
}

// Correcto: Shape como abstracción; Rectangle y Square son independientes
public interface Shape {
    int getArea();
}

public class Rectangle implements Shape {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public int getArea() { return width * height; }
}

public class Square implements Shape {
    private int side;

    public Square(int side) { this.side = side; }

    @Override
    public int getArea() { return side * side; }
}
```

---

## I — Interface Segregation Principle (ISP)

**Ninguna clase debe verse obligada a implementar métodos que no necesita.** Si una interfaz es demasiado grande, se divide en interfaces más pequeñas y cohesivas.

```java
// Incorrecto: una interfaz enorme que obliga a implementar métodos irrelevantes
public interface Worker {
    void work();
    void eat();
    void sleep();
    void recharge(); // los humanos no se recargan; los robots no comen
}

public class HumanWorker implements Worker {
    @Override public void work()     { /* trabaja */ }
    @Override public void eat()      { /* come */ }
    @Override public void sleep()    { /* duerme */ }
    @Override public void recharge() { throw new UnsupportedOperationException(); } // problema
}

// Correcto: interfaces segregadas
public interface Workable   { void work(); }
public interface Feedable   { void eat(); void sleep(); }
public interface Rechargeable { void recharge(); }

public class HumanWorker implements Workable, Feedable {
    @Override public void work()  { /* trabaja */ }
    @Override public void eat()   { /* come */ }
    @Override public void sleep() { /* duerme */ }
}

public class RobotWorker implements Workable, Rechargeable {
    @Override public void work()     { /* trabaja */ }
    @Override public void recharge() { /* se recarga */ }
}
```

---

## D — Dependency Inversion Principle (DIP)

**Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.** En la práctica: depende de interfaces, no de clases concretas.

La analogía clásica es un interruptor eléctrico. El interruptor (módulo de alto nivel) no está conectado directamente a una bombilla concreta (módulo de bajo nivel): están unidos a través de la red eléctrica estándar (abstracción). Puedes cambiar la bombilla sin tocar el interruptor.

```java
// Incorrecto: OrderService crea directamente su dependencia
public class OrderService {
    private MySQLOrderRepository repository = new MySQLOrderRepository(); // acoplado

    public void placeOrder(Order order) {
        // lógica de negocio...
        repository.save(order);
    }
}

// Correcto: depende de una interfaz; la implementación se inyecta desde fuera
public interface OrderRepository {
    void save(Order order);
}

public class MySQLOrderRepository implements OrderRepository {
    @Override
    public void save(Order order) { /* acceso a MySQL */ }
}

public class OrderService {
    private final OrderRepository repository; // depende de la abstracción

    public OrderService(OrderRepository repository) { // inyección por constructor
        this.repository = repository;
    }

    public void placeOrder(Order order) {
        // lógica de negocio...
        repository.save(order);
    }
}
```

:::info
**Ventaja en pruebas**

Al depender de la interfaz `OrderRepository`, en los tests se puede inyectar un doble (*mock*) sin necesitar una base de datos real. Esto conecta DIP directamente con el Tema 4 de pruebas con Mockito.
:::

---

## Resumen SOLID

| Principio | Clave | Señal de violación |
|---|---|---|
| **S** — SRP | Una razón para cambiar | Comentarios `// lógica de X` y `// lógica de Y` en la misma clase |
| **O** — OCP | Extender sin modificar | `if/switch` sobre tipos que crecen con cada nueva variante |
| **L** — LSP | Sustituibilidad real | Subclase lanza `UnsupportedOperationException` o rompe postcondiciones |
| **I** — ISP | Interfaces pequeñas | Métodos de interfaz con cuerpo vacío o excepción en la implementación |
| **D** — DIP | Depender de abstracciones | `new ClaseConcreto()` dentro de la clase; difícil de probar con mocks |
