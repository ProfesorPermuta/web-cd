# Errores Comunes en Código Limpio y Patrones de Diseño

---

## Error 1: Singleton con estado mutable compartido

El Singleton es apropiado para objetos sin estado o con estado de solo lectura (configuración, logs). Convertirlo en un almacén de estado mutable compartido crea dependencias implícitas y hace el código imposible de probar.

```java
// Incorrecto: el Singleton acumula estado mutable accesible globalmente
public class UserSession {
    private static class Holder {
        private static final UserSession INSTANCE = new UserSession();
    }

    private String currentUser; // estado mutable: qué pasa en un servidor con 100 peticiones simultáneas?
    private List<String> cart = new ArrayList<>();

    private UserSession() {}

    public static UserSession getInstance() { return Holder.INSTANCE; }

    public void setCurrentUser(String user) { this.currentUser = user; }
    public String getCurrentUser()          { return currentUser; }
    public void addToCart(String item)      { cart.add(item); }
}

// Correcto: el Singleton solo guarda configuración inmutable
public class AppConfig {
    private static class Holder {
        private static final AppConfig INSTANCE = new AppConfig();
    }

    private final String apiBaseUrl;
    private final int    requestTimeout;

    private AppConfig() {
        this.apiBaseUrl      = System.getenv().getOrDefault("API_URL", "https://api.example.com");
        this.requestTimeout  = 30;
    }

    public static AppConfig getInstance() { return Holder.INSTANCE; }

    public String getApiBaseUrl()    { return apiBaseUrl; }
    public int    getRequestTimeout(){ return requestTimeout; }
}
```

---

## Error 2: Builder sin validación en `build()`

El Builder debe validar que los campos obligatorios están presentes antes de construir el objeto. Sin validación, se crean objetos inconsistentes que fallarán más adelante con errores difíciles de trazar.

```java
// Incorrecto: build() no valida nada y puede crear un objeto roto
public class EmailMessage {
    private final String to;
    private final String subject;
    private final String body;

    private EmailMessage(Builder builder) {
        this.to      = builder.to;
        this.subject = builder.subject;
        this.body    = builder.body;
    }

    public static class Builder {
        private String to;
        private String subject;
        private String body;

        public Builder to(String to)           { this.to = to;           return this; }
        public Builder subject(String subject) { this.subject = subject; return this; }
        public Builder body(String body)       { this.body = body;       return this; }

        public EmailMessage build() {
            return new EmailMessage(this); // crea un EmailMessage con to = null
        }
    }
}

// Correcto: build() valida los campos obligatorios
public class EmailMessage {
    private final String to;
    private final String subject;
    private final String body;

    private EmailMessage(Builder builder) {
        this.to      = builder.to;
        this.subject = builder.subject;
        this.body    = builder.body;
    }

    public static class Builder {
        private String to;
        private String subject;
        private String body = ""; // campo opcional con valor por defecto

        public Builder to(String to)           { this.to = to;           return this; }
        public Builder subject(String subject) { this.subject = subject; return this; }
        public Builder body(String body)       { this.body = body;       return this; }

        public EmailMessage build() {
            if (to == null || to.isBlank()) {
                throw new IllegalStateException("Recipient (to) is required");
            }
            if (subject == null || subject.isBlank()) {
                throw new IllegalStateException("Subject is required");
            }
            return new EmailMessage(this);
        }
    }
}
```

---

## Error 3: Confundir Strategy con Factory Method

Strategy elige **cómo** ejecutar un algoritmo en tiempo de ejecución (el objeto ya está creado). Factory Method elige **qué clase instanciar** en tiempo de creación. Son soluciones para problemas distintos.

```java
// Incorrecto: usar un if gigante dentro del "Strategy" para elegir la implementación
// (esto es lo que Strategy debería eliminar)
public class ReportGenerator {
    public String generate(String format, List<String> data) {
        if (format.equals("PDF")) {
            // lógica PDF incrustada directamente
            return "PDF: " + data;
        } else if (format.equals("CSV")) {
            // lógica CSV incrustada directamente
            return "CSV: " + String.join(",", data);
        }
        throw new IllegalArgumentException("Unknown format: " + format);
    }
}

// Correcto: Strategy — la selección se hace fuera; el generador solo delega
public interface ReportFormat {
    String generate(List<String> data);
}

public class PdfFormat implements ReportFormat {
    @Override
    public String generate(List<String> data) { return "PDF: " + data; }
}

public class CsvFormat implements ReportFormat {
    @Override
    public String generate(List<String> data) { return "CSV: " + String.join(",", data); }
}

public class ReportGenerator {
    private final ReportFormat format; // estrategia inyectada

    public ReportGenerator(ReportFormat format) { this.format = format; }

    public String generate(List<String> data) {
        return format.generate(data); // sin ningún if
    }
}
```

---

## Error 4: Violar LSP añadiendo `UnsupportedOperationException`

Lanzar `UnsupportedOperationException` en una subclase es la señal más clara de que la jerarquía de herencia es incorrecta. La subclase no puede cumplir el contrato de la base.

```java
// Incorrecto: ReadOnlyList extiende ArrayList pero rompe el contrato de List
public class ReadOnlyList<T> extends ArrayList<T> {
    @Override
    public boolean add(T element) {
        throw new UnsupportedOperationException("This list is read-only");
    }

    @Override
    public void add(int index, T element) {
        throw new UnsupportedOperationException("This list is read-only");
    }
    // Cualquier código que espere un ArrayList se romperá con un ReadOnlyList
}

// Correcto: ReadOnlyList implementa una interfaz de solo lectura; no extiende ArrayList
public interface ReadableList<T> {
    T get(int index);
    int size();
    boolean contains(Object element);
}

public class ReadOnlyList<T> implements ReadableList<T> {
    private final List<T> data;

    public ReadOnlyList(List<T> data) {
        this.data = Collections.unmodifiableList(new ArrayList<>(data));
    }

    @Override public T       get(int index)          { return data.get(index); }
    @Override public int     size()                  { return data.size(); }
    @Override public boolean contains(Object element){ return data.contains(element); }
}
```

---

## Error 5: Observer con referencia fuerte (memory leak)

Si los observadores se suscriben pero nunca se desuscriben, el sujeto mantiene referencias fuertes a ellos y el recolector de basura no puede liberarlos, produciendo una fuga de memoria.

```java
// Incorrecto: EventBus global que nunca libera suscriptores
public class EventBus {
    private static final List<EventListener> listeners = new ArrayList<>();

    public static void subscribe(EventListener listener) {
        listeners.add(listener);
    }

    // No hay método unsubscribe — los listeners nunca se liberan
    public static void publish(String event) {
        for (EventListener l : listeners) l.onEvent(event);
    }
}

// Correcto: siempre proporcionar y usar desuscripción
public class StockMarket {
    private final List<StockObserver> observers = new ArrayList<>();

    public void subscribe(StockObserver observer)   { observers.add(observer); }
    public void unsubscribe(StockObserver observer) { observers.remove(observer); } // esencial

    public void setPrice(double price) {
        // notifica solo si hay observadores activos
        for (StockObserver o : new ArrayList<>(observers)) { // copia para evitar ConcurrentModificationException
            o.onPriceChange("TICKER", price);
        }
    }
}
```

---

## Error 6: Aplicar un patrón donde no hace falta (sobreingeniería)

Los patrones de diseño son soluciones a problemas recurrentes, no decoraciones arquitectónicas. Aplicar un patrón cuando el código es sencillo añade complejidad innecesaria y dificulta el mantenimiento.

```java
// Incorrecto: Factory Method para una sola implementación que nunca cambiará
public abstract class GreeterCreator {
    protected abstract Greeter createGreeter();
    public void greet(String name) { createGreeter().greet(name); }
}

public class ConsoleGreeterCreator extends GreeterCreator {
    @Override
    protected Greeter createGreeter() { return new ConsoleGreeter(); }
}

// Correcto: cuando solo hay una implementación, usarla directamente
public class Greeter {
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
```

:::tip Regla práctica
Aplica un patrón solo cuando ya tienes el problema que resuelve, no como prevención ante cambios hipotéticos. El refactoring y los tests son tu red de seguridad para introducir patrones más adelante.
:::

---

## Error 7: Cadena de responsabilidad que nunca termina

Si ningún manejador de la cadena puede procesar una solicitud y no hay un manejador por defecto al final, la solicitud se pierde silenciosamente.

```java
// Incorrecto: la solicitud desaparece si ningún manejador la procesa
public abstract class Handler {
    protected Handler next;

    public void setNext(Handler next) { this.next = next; }

    public void handle(int level, String request) {
        if (next != null) {
            next.handle(level, request);
        }
        // Si no hay next, la solicitud desaparece sin avisar
    }
}

// Correcto: registrar la solicitud no procesada o lanzar excepción controlada
public abstract class Handler {
    protected Handler next;

    public Handler setNext(Handler next) { this.next = next; return next; }

    protected void passToNext(int level, String request) {
        if (next != null) {
            next.handle(level, request);
        } else {
            // Comportamiento por defecto explícito
            System.out.println("WARNING: unhandled request (level " + level + "): " + request);
        }
    }

    public abstract void handle(int level, String request);
}
```
