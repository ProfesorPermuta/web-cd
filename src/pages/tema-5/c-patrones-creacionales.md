# Patrones Creacionales

Los **patrones creacionales** resuelven el problema de *cómo crear objetos* de forma controlada, flexible y desacoplada. En lugar de usar `new ClaseConcreto()` directamente en el código cliente, estos patrones encapsulan la lógica de creación para que el sistema sea más fácil de extender y probar.

```java
// Sin patrón creacional: el cliente está acoplado a la clase concreta
Connection conn = new MySQLConnection("localhost", 3306, "db"); // ¿y si cambio a PostgreSQL?

// Con patrón creacional: el cliente solo conoce la interfaz
Connection conn = ConnectionFactory.create("mysql", config);
```

---

## Singleton

El patrón **Singleton** garantiza que una clase tenga **una única instancia** en toda la aplicación y proporciona un punto de acceso global a ella.

La analogía más clara es el gobierno de un país: solo puede haber uno en cada momento. Cualquier ciudadano que necesite interactuar con él accede al mismo.

**Elementos clave para identificarlo:**
- Constructor `private`.
- Método estático `getInstance()` que devuelve siempre la misma instancia.
- Clase interna `Holder` con una constante `static final` (forma segura para multihilo).

```java
public class ConfigurationManager {

    // La clase interna Holder garantiza inicialización lazy y thread-safe
    private static class Holder {
        private static final ConfigurationManager INSTANCE = new ConfigurationManager();
    }

    private String databaseUrl;
    private int maxConnections;

    private ConfigurationManager() {
        // Carga la configuración desde un fichero o variables de entorno
        this.databaseUrl    = "jdbc:mysql://localhost:3306/mydb";
        this.maxConnections = 10;
    }

    public static ConfigurationManager getInstance() {
        return Holder.INSTANCE;
    }

    public String getDatabaseUrl()    { return databaseUrl; }
    public int getMaxConnections()    { return maxConnections; }
}

// Uso en el cliente:
class Application {
    public static void main(String[] args) {
        ConfigurationManager config = ConfigurationManager.getInstance();
        System.out.println(config.getDatabaseUrl());    // jdbc:mysql://...
        System.out.println(config.getMaxConnections()); // 10

        // Siempre es la misma instancia
        ConfigurationManager config2 = ConfigurationManager.getInstance();
        System.out.println(config == config2); // true
    }
}
```

:::warning
**Úsalo con precaución**

El Singleton es el patrón creacional más fácil de usar mal. Evítalo cuando almacene estado mutable que varía por petición (en servidores web, por ejemplo) o cuando dificulte las pruebas unitarias.
:::

---

## Factory Method

El patrón **Factory Method** define un método abstracto para crear un objeto, pero deja que las **subclases decidan** qué clase concreta instanciar. El cliente trabaja siempre con la interfaz del producto.

La analogía: una cadena de franquicias de pizzerías tiene un método `prepararPizza()`, pero cada franquicia regional lo implementa con sus ingredientes locales.

**Elementos clave para identificarlo:**
- Método abstracto `crearX()` en una clase base (el *creator*).
- Cada subclase sobrescribe `crearX()` devolviendo un producto concreto.
- El cliente usa el producto a través de su interfaz, sin conocer la clase concreta.

```java
// Interfaz del producto
public interface Notification {
    void send(String message, String recipient);
}

// Productos concretos
public class EmailNotification implements Notification {
    @Override
    public void send(String message, String recipient) {
        System.out.println("Email to " + recipient + ": " + message);
    }
}

public class SmsNotification implements Notification {
    @Override
    public void send(String message, String recipient) {
        System.out.println("SMS to " + recipient + ": " + message);
    }
}

// Creator abstracto con el Factory Method
public abstract class NotificationService {

    // Factory Method — las subclases deciden qué tipo crear
    protected abstract Notification createNotification();

    // Método de alto nivel que usa el producto sin saber su tipo concreto
    public void notifyUser(String message, String recipient) {
        Notification notification = createNotification();
        notification.send(message, recipient);
    }
}

// Creators concretos
public class EmailNotificationService extends NotificationService {
    @Override
    protected Notification createNotification() {
        return new EmailNotification();
    }
}

public class SmsNotificationService extends NotificationService {
    @Override
    protected Notification createNotification() {
        return new SmsNotification();
    }
}

// Uso:
class Main {
    public static void main(String[] args) {
        NotificationService service = new EmailNotificationService();
        service.notifyUser("Your order is ready", "user@example.com");
        // Email to user@example.com: Your order is ready
    }
}
```

---

## Abstract Factory

El patrón **Abstract Factory** proporciona una interfaz para crear **familias de objetos relacionados** sin especificar sus clases concretas. Es un «factory de factories».

La analogía: una tienda de muebles vende familias de productos (sofá + mesa + silla). Hay una familia «estilo moderno» y otra «estilo clásico». Al elegir una fábrica, todos los muebles que produces pertenecen a la misma familia y son compatibles entre sí.

**Elementos clave para identificarlo:**
- Interfaz fábrica con **varios** métodos `crearX()`, `crearY()`…
- Cada implementación de la fábrica produce una familia completa de objetos compatibles.

```java
// Interfaces de los productos
public interface Button   { void render(); }
public interface Checkbox { void render(); }

// Familia "Light"
public class LightButton implements Button {
    @Override public void render() { System.out.println("Rendering Light Button"); }
}

public class LightCheckbox implements Checkbox {
    @Override public void render() { System.out.println("Rendering Light Checkbox"); }
}

// Familia "Dark"
public class DarkButton implements Button {
    @Override public void render() { System.out.println("Rendering Dark Button"); }
}

public class DarkCheckbox implements Checkbox {
    @Override public void render() { System.out.println("Rendering Dark Checkbox"); }
}

// Interfaz Abstract Factory
public interface UIFactory {
    Button   createButton();
    Checkbox createCheckbox();
}

// Implementaciones concretas de la fábrica
public class LightThemeFactory implements UIFactory {
    @Override public Button   createButton()   { return new LightButton(); }
    @Override public Checkbox createCheckbox() { return new LightCheckbox(); }
}

public class DarkThemeFactory implements UIFactory {
    @Override public Button   createButton()   { return new DarkButton(); }
    @Override public Checkbox createCheckbox() { return new DarkCheckbox(); }
}

// El cliente solo conoce UIFactory; es ajeno a las clases concretas
class Application {
    private final Button   button;
    private final Checkbox checkbox;

    public Application(UIFactory factory) {
        this.button   = factory.createButton();
        this.checkbox = factory.createCheckbox();
    }

    public void renderUI() {
        button.render();
        checkbox.render();
    }

    public static void main(String[] args) {
        UIFactory factory = new DarkThemeFactory(); // cambia la familia aquí
        Application app = new Application(factory);
        app.renderUI();
        // Rendering Dark Button
        // Rendering Dark Checkbox
    }
}
```

---

## Builder

El patrón **Builder** separa la construcción de un objeto complejo de su representación final, permitiendo construirlo paso a paso con parámetros opcionales. El resultado es un objeto **inmutable** con un código de creación muy legible.

La analogía: al configurar un ordenador en una tienda online, primero seleccionas procesador, luego RAM, luego disco… y al final pulsas «añadir al carrito». El `build()` es ese botón final.

**Elementos clave para identificarlo:**
- Clase `Builder` anidada con métodos encadenados que devuelven `this`.
- Método `build()` al final que construye y devuelve el objeto.
- Constructor del producto `private`; solo el Builder puede crear el objeto.

```java
public class HttpRequest {

    private final String  method;    // obligatorio
    private final String  url;       // obligatorio
    private final String  body;      // opcional
    private final int     timeout;   // opcional
    private final boolean followRedirects; // opcional

    // Constructor privado: solo accesible desde el Builder
    private HttpRequest(Builder builder) {
        this.method           = builder.method;
        this.url              = builder.url;
        this.body             = builder.body;
        this.timeout          = builder.timeout;
        this.followRedirects  = builder.followRedirects;
    }

    public String getMethod()  { return method; }
    public String getUrl()     { return url; }
    public String getBody()    { return body; }
    public int    getTimeout() { return timeout; }

    // Clase Builder anidada
    public static class Builder {
        private final String method;  // obligatorio
        private final String url;     // obligatorio
        private String  body             = null;
        private int     timeout          = 30;
        private boolean followRedirects  = true;

        public Builder(String method, String url) {
            this.method = method;
            this.url    = url;
        }

        public Builder body(String body) {
            this.body = body;
            return this; // permite encadenamiento
        }

        public Builder timeout(int seconds) {
            this.timeout = seconds;
            return this;
        }

        public Builder followRedirects(boolean follow) {
            this.followRedirects = follow;
            return this;
        }

        public HttpRequest build() {
            return new HttpRequest(this);
        }
    }
}

// Uso: legible como prosa
class Main {
    public static void main(String[] args) {
        HttpRequest request = new HttpRequest.Builder("POST", "https://api.example.com/orders")
            .body("{\"item\": \"book\"}")
            .timeout(60)
            .followRedirects(false)
            .build();

        System.out.println(request.getMethod());  // POST
        System.out.println(request.getTimeout()); // 60
    }
}
```

---

## Prototype

El patrón **Prototype** crea nuevas instancias copiando (**clonando**) un objeto existente en lugar de instanciarlo con `new`. Es útil cuando la inicialización de un objeto es costosa y los nuevos objetos son similares a uno ya existente.

La analogía: en una imprenta, en lugar de componer cada página desde cero, se parte de una plantilla (*prototipo*) y se hacen copias.

**Elementos clave para identificarlo:**
- Interfaz con método `clonar()` o `clone()`.
- Los objetos se obtienen clonando un prototipo, no instanciándose directamente.

```java
// Interfaz Prototype
public interface Cloneable<T> {
    T clonar();
}

// Objeto costoso de inicializar (simula una configuración compleja)
public class ReportTemplate implements Cloneable<ReportTemplate> {

    private String  title;
    private String  footer;
    private int     pageCount;

    public ReportTemplate(String title, String footer, int pageCount) {
        this.title     = title;
        this.footer    = footer;
        this.pageCount = pageCount;
        // Imaginemos que aquí se cargan fuentes, imágenes y estilos (operación costosa)
    }

    // Constructor de copia: crea una nueva instancia con los mismos valores
    private ReportTemplate(ReportTemplate source) {
        this.title     = source.title;
        this.footer    = source.footer;
        this.pageCount = source.pageCount;
    }

    @Override
    public ReportTemplate clonar() {
        return new ReportTemplate(this); // copia del prototipo
    }

    public void setTitle(String title)    { this.title = title; }
    public String getTitle()              { return title; }
    public int getPageCount()             { return pageCount; }
}

// Uso:
class Main {
    public static void main(String[] args) {
        // Objeto original (inicialización costosa)
        ReportTemplate base = new ReportTemplate("Annual Report", "© Company 2025", 10);

        // Clonamos y personalizamos — sin repetir la inicialización costosa
        ReportTemplate q1Report = base.clonar();
        q1Report.setTitle("Q1 Report");

        ReportTemplate q2Report = base.clonar();
        q2Report.setTitle("Q2 Report");

        System.out.println(base.getTitle());     // Annual Report
        System.out.println(q1Report.getTitle()); // Q1 Report
        System.out.println(q2Report.getTitle()); // Q2 Report
    }
}
```

---

## Comparativa de patrones creacionales

| Patrón | ¿Cuándo usarlo? | Elemento identificador |
|---|---|---|
| **Singleton** | Una única instancia compartida (configuración, logs…) | Constructor `private` + `getInstance()` |
| **Factory Method** | Las subclases deciden qué producto instanciar | Método abstracto `crearX()` en la clase base |
| **Abstract Factory** | Familias de objetos compatibles entre sí | Interfaz con varios `crearX()`, `crearY()`… |
| **Builder** | Objetos complejos con parámetros opcionales | Métodos encadenados + `build()` final |
| **Prototype** | Copias baratas de objetos costosos de inicializar | Método `clonar()` / `clone()` |
