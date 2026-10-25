# Ejercicios y Soluciones — Tema 5: Código Limpio y Patrones de Diseño

---

En esta sección encontrarás los ejercicios propuestos para el Tema 5, junto con sus soluciones en repositorios de Bitbucket.

## Ejercicios

### Ejercicio 1 — Refactorización con principios SOLID

Se te proporciona la siguiente clase inicial que viola varios principios SOLID:

```java
public class ReportManager {
    public void generateReport(List<String> data, String format, String email) {
        // Genera el contenido
        String content = "";
        if (format.equals("CSV")) {
            content = String.join(",", data);
        } else if (format.equals("HTML")) {
            content = "<ul>" + data.stream().map(d -> "<li>" + d + "</li>")
                      .reduce("", String::concat) + "</ul>";
        } else if (format.equals("PDF")) {
            content = "PDF: " + data;
        }

        // Guarda en disco
        try (java.io.FileWriter fw = new java.io.FileWriter("report." + format.toLowerCase())) {
            fw.write(content);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Envía por correo
        System.out.println("Sending report to " + email + ": " + content);
    }
}
```

Refactoriza esta clase aplicando:

1. **SRP**: separa la generación de contenido, el guardado en disco y el envío por correo en clases distintas.
2. **OCP**: usa una interfaz `ReportFormatter` con implementaciones `CsvFormatter`, `HtmlFormatter` y `PdfFormatter` para que añadir nuevos formatos no requiera modificar código existente.
3. **DIP**: `ReportManager` debe recibir sus dependencias por constructor, no crearlas internamente.

Restricciones:
- El `main` solo instancia `ReportManager` con las dependencias adecuadas y llama a `generateReport(data)`.
- Ninguna clase de modelo tiene atributos públicos.
- No uses lambdas ni streams (solo lo visto hasta el Tema 5).

---

### Ejercicio 2 — Singleton: Gestor de configuración

Implementa un gestor de configuración de la aplicación usando el patrón Singleton:

- Clase `AppConfig` con los atributos:
  - `databaseUrl` (String)
  - `maxConnections` (int)
  - `debugMode` (boolean)
- Carga los valores desde un fichero `config.properties` en el constructor (usa `java.util.Properties`).
- Si el fichero no existe, usa valores por defecto.
- El `main` debe obtener la instancia dos veces y demostrar que es la misma referencia (`==`).

Restricciones:
- Usa la clase interna `Holder` para garantizar la inicialización *lazy* y *thread-safe*.
- No expongas ningún setter (la configuración es inmutable una vez cargada).

---

### Ejercicio 3 — Builder: Constructor de consultas SQL

Implementa un **generador de consultas SELECT** usando el patrón Builder:

- Clase `SelectQuery` con los campos: `table` (obligatorio), `columns` (lista, por defecto `["*"]`), `whereClause` (opcional), `orderBy` (opcional), `limit` (opcional, por defecto sin límite).
- Clase `SelectQuery.Builder` con los métodos:
  - `from(String table)` — campo obligatorio en el constructor del Builder.
  - `columns(String... cols)`
  - `where(String condition)`
  - `orderBy(String column)`
  - `limit(int n)`
  - `build()` — valida que `table` no esté vacío y devuelve el objeto.
- Método `toSql()` en `SelectQuery` que devuelve la cadena SQL generada.

Ejemplo de uso esperado en el `main`:

```java
String sql = new SelectQuery.Builder("users")
    .columns("id", "name", "email")
    .where("active = true")
    .orderBy("name")
    .limit(10)
    .build()
    .toSql();
// SELECT id, name, email FROM users WHERE active = true ORDER BY name LIMIT 10
System.out.println(sql);
```

---

### Ejercicio 4 — Strategy: Sistema de descuentos

Implementa un sistema de descuentos para una tienda online:

- Interfaz `DiscountStrategy` con el método `applyDiscount(double price): double`.
- Implementaciones:
  - `NoDiscount`: devuelve el precio sin cambios.
  - `PercentageDiscount(int percentage)`: aplica un porcentaje de descuento.
  - `FixedDiscount(double amount)`: resta una cantidad fija (sin que el precio quede negativo).
  - `BuyTwoGetOneFreeDiscount(int quantity)`: si `quantity >= 3`, aplica un descuento equivalente a un artículo gratuito sobre el precio total.
- Clase `ShoppingCart` con:
  - `addItem(String name, double price)`
  - `setDiscountStrategy(DiscountStrategy strategy)`
  - `getTotalAfterDiscount(): double`
- El `main` debe mostrar el total con al menos tres estrategias distintas para el mismo carrito.

Restricciones:
- `ShoppingCart` no contiene ningún `if` sobre el tipo de descuento.
- Los atributos de `ShoppingCart` son `private`.

---

### Ejercicio 5 — Observer: Sistema de alertas de temperatura

Implementa un sistema de monitorización de temperatura para un servidor:

- Clase `TemperatureSensor` (sujeto) con:
  - `addObserver(TemperatureObserver observer)`
  - `removeObserver(TemperatureObserver observer)`
  - `setTemperature(double celsius)` — notifica a todos los observadores cuando cambia.
- Interfaz `TemperatureObserver` con `onTemperatureChange(double celsius)`.
- Observadores concretos:
  - `AlertLogger`: imprime un mensaje si la temperatura supera 80 °C.
  - `CoolingSystem`: imprime «Cooling system activated» si supera 75 °C y «Cooling system deactivated» si baja de 60 °C.
  - `DashboardDisplay`: imprime siempre la temperatura actual.
- El `main` debe simular una secuencia de cambios de temperatura y demostrar la suscripción y desuscripción de un observador.

---

### Ejercicio 6 — Adapter + Facade: Sistema de pagos

Combina los dos patrones estructurales del tema:

**Parte A — Adapter:**
Se te proporciona la siguiente clase legada de un proveedor externo (no puedes modificarla):

```java
public class ExternalPayPalService {
    public String doPayment(String paypalAccount, long amountInCents) {
        System.out.println("PayPal: charging " + amountInCents + " cents to " + paypalAccount);
        return amountInCents > 0 ? "OK" : "FAIL";
    }
}
```

Crea un `PayPalAdapter` que adapte `ExternalPayPalService` a la siguiente interfaz:

```java
public interface PaymentGateway {
    boolean processPayment(String account, double amountInEuros);
}
```

**Parte B — Facade:**
Crea una `CheckoutFacade` que orqueste:
1. Validar que el carrito no está vacío (`CartValidator`).
2. Procesar el pago con `PaymentGateway`.
3. Generar el número de pedido (`OrderService`).
4. Enviar confirmación (`EmailService`).

El `main` solo usa `CheckoutFacade` con una única llamada a `checkout(cart, paymentInfo)`.

---

## Soluciones

:::info
**Repositorios en Bitbucket**

Los repositorios con las soluciones estarán disponibles próximamente.
:::

| Ejercicio | Repositorio |
|-----------|-------------|
| Ejercicio 1: Refactorización SOLID | [Ver solución](https://bitbucket.org/profesorpermuta/tema-5-ejer-1-refactorizacion-solid) |
| Ejercicio 2: Singleton AppConfig | [Ver solución](https://bitbucket.org/profesorpermuta/tema-5-ejer-2-singleton-appconfig) |
| Ejercicio 3: Builder consultas SQL | [Ver solución](https://bitbucket.org/profesorpermuta/tema-5-ejer-3-builder-consultas-sql) |
| Ejercicio 4: Strategy descuentos | [Ver solución](https://bitbucket.org/profesorpermuta/tema-5-ejer-4-strategy-descuentos) |
| Ejercicio 5: Observer alertas temperatura | [Ver solución](https://bitbucket.org/profesorpermuta/tema-5-ejer-5-observer-alertas-temperatura) |
| Ejercicio 6: Adapter y Facade pagos | [Ver solución](https://bitbucket.org/profesorpermuta/tema-5-ejer-6-adapter-facade-pagos) |
