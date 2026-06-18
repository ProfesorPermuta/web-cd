# Patrones de Comportamiento

Los **patrones de comportamiento** se ocupan de cómo los objetos se comunican y distribuyen responsabilidades entre sí. Eliminan las cadenas de `if/switch` sobre el tipo o estado de un objeto y sustituyen esa lógica condicional por polimorfismo y delegación.

```java
// Sin patrón de comportamiento: lógica condicional que crece sin control
public void processPayment(String type, double amount) {
    if (type.equals("CARD"))   { /* lógica tarjeta... */ }
    else if (type.equals("PAYPAL")) { /* lógica PayPal... */ }
    else if (type.equals("CRYPTO")) { /* lógica cripto... */ }
    // Con cada nuevo método de pago hay que abrir esta clase
}
```

---

## Strategy

El patrón **Strategy** define una familia de algoritmos, encapsula cada uno en su propia clase e intercámbiables. El contexto delega en el algoritmo elegido sin ningún `if`.

La analogía: un navegador GPS. No importa si llevas coche, bicicleta o vas a pie, el mismo «contexto» (navegación) delega en la estrategia de ruta adecuada.

**Elementos clave para identificarlo:**
- Interfaz con el método del algoritmo variable.
- El contexto recibe la estrategia por **constructor** o `setter`.
- El contexto llama a la estrategia sin ningún condicional sobre su tipo.

```java
// Interfaz de la estrategia
public interface SortStrategy {
    void sort(int[] data);
}

// Estrategias concretas
public class BubbleSort implements SortStrategy {
    @Override
    public void sort(int[] data) {
        System.out.println("Sorting with Bubble Sort");
        // implementación del algoritmo...
    }
}

public class QuickSort implements SortStrategy {
    @Override
    public void sort(int[] data) {
        System.out.println("Sorting with Quick Sort");
        // implementación del algoritmo...
    }
}

public class MergeSort implements SortStrategy {
    @Override
    public void sort(int[] data) {
        System.out.println("Sorting with Merge Sort");
        // implementación del algoritmo...
    }
}

// Contexto: no contiene ningún if sobre el tipo de estrategia
public class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy; // permite cambiar en tiempo de ejecución
    }

    public void sort(int[] data) {
        strategy.sort(data); // delega completamente en la estrategia
    }
}

// Uso:
class Main {
    public static void main(String[] args) {
        int[] data = {5, 3, 8, 1, 2};

        Sorter sorter = new Sorter(new QuickSort());
        sorter.sort(data); // Sorting with Quick Sort

        sorter.setStrategy(new MergeSort());
        sorter.sort(data); // Sorting with Merge Sort
    }
}
```

---

## Observer

El patrón **Observer** define una dependencia de uno a muchos: cuando el **sujeto** cambia de estado, todos sus **observadores** son notificados automáticamente.

La analogía: una suscripción a un canal de YouTube. El canal (sujeto) no sabe quiénes son sus suscriptores (observadores); simplemente notifica a todos cuando publica un vídeo.

**Elementos clave para identificarlo:**
- El sujeto mantiene una lista de observadores.
- Métodos `suscribir()`, `desuscribir()` y `notificar()` en el sujeto.
- Los observadores reciben notificaciones a través de una interfaz común.

```java
// Interfaz del observador
public interface StockObserver {
    void onPriceChange(String ticker, double newPrice);
}

// Sujeto
public class StockMarket {
    private final List<StockObserver> observers = new ArrayList<>();
    private double currentPrice;
    private final String ticker;

    public StockMarket(String ticker, double initialPrice) {
        this.ticker       = ticker;
        this.currentPrice = initialPrice;
    }

    public void subscribe(StockObserver observer) {
        observers.add(observer);
    }

    public void unsubscribe(StockObserver observer) {
        observers.remove(observer);
    }

    public void setPrice(double newPrice) {
        this.currentPrice = newPrice;
        notifyObservers(); // notifica cuando el precio cambia
    }

    private void notifyObservers() {
        for (StockObserver observer : observers) {
            observer.onPriceChange(ticker, currentPrice);
        }
    }
}

// Observadores concretos
public class AlertService implements StockObserver {
    private final double threshold;

    public AlertService(double threshold) {
        this.threshold = threshold;
    }

    @Override
    public void onPriceChange(String ticker, double newPrice) {
        if (newPrice < threshold) {
            System.out.println("ALERT: " + ticker + " dropped below " + threshold + "! Now: " + newPrice);
        }
    }
}

public class PortfolioTracker implements StockObserver {
    @Override
    public void onPriceChange(String ticker, double newPrice) {
        System.out.println("Portfolio updated — " + ticker + ": " + newPrice);
    }
}

// Uso:
class Main {
    public static void main(String[] args) {
        StockMarket apple = new StockMarket("AAPL", 180.0);

        apple.subscribe(new PortfolioTracker());
        apple.subscribe(new AlertService(150.0));

        apple.setPrice(160.0);
        // Portfolio updated — AAPL: 160.0
        apple.setPrice(145.0);
        // Portfolio updated — AAPL: 145.0
        // ALERT: AAPL dropped below 150.0! Now: 145.0
    }
}
```

---

## State

El patrón **State** permite que un objeto cambie su comportamiento cuando cambia su estado interno. Parece que la clase del objeto hubiera cambiado.

La analogía: un semáforo. El semáforo (contexto) no ejecuta `if (color == ROJO)` en cada método; delega completamente en el estado actual, que sabe qué hacer y cuándo cambiar al estado siguiente.

**Elementos clave para identificarlo:**
- El contexto **no contiene ningún `if` sobre el estado**.
- El contexto delega todos sus métodos en un objeto `Estado` actual.
- Cada estado concreto implementa la misma interfaz y puede cambiar el estado del contexto.

```java
// Interfaz del estado
public interface VendingMachineState {
    void insertCoin(VendingMachine machine);
    void selectProduct(VendingMachine machine);
    void dispense(VendingMachine machine);
}

// Contexto
public class VendingMachine {
    private VendingMachineState currentState;

    public VendingMachine() {
        this.currentState = new IdleState(); // estado inicial
    }

    public void setState(VendingMachineState state) {
        this.currentState = state;
    }

    // Delega en el estado actual — sin ningún if
    public void insertCoin()    { currentState.insertCoin(this); }
    public void selectProduct() { currentState.selectProduct(this); }
    public void dispense()      { currentState.dispense(this); }
}

// Estado: esperando moneda
public class IdleState implements VendingMachineState {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("Coin inserted. Please select a product.");
        machine.setState(new HasCoinState()); // transición de estado
    }

    @Override
    public void selectProduct(VendingMachine machine) {
        System.out.println("Please insert a coin first.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Please insert a coin first.");
    }
}

// Estado: moneda insertada
public class HasCoinState implements VendingMachineState {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("Coin already inserted. Please select a product.");
    }

    @Override
    public void selectProduct(VendingMachine machine) {
        System.out.println("Product selected. Dispensing...");
        machine.setState(new DispensingState());
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Please select a product first.");
    }
}

// Estado: dispensando producto
public class DispensingState implements VendingMachineState {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("Please wait, dispensing in progress.");
    }

    @Override
    public void selectProduct(VendingMachine machine) {
        System.out.println("Please wait, dispensing in progress.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Product dispensed. Returning to idle.");
        machine.setState(new IdleState()); // vuelve al estado inicial
    }
}

// Uso:
class Main {
    public static void main(String[] args) {
        VendingMachine machine = new VendingMachine();
        machine.selectProduct(); // Please insert a coin first.
        machine.insertCoin();    // Coin inserted. Please select a product.
        machine.selectProduct(); // Product selected. Dispensing...
        machine.dispense();      // Product dispensed. Returning to idle.
    }
}
```

---

## Chain of Responsibility

El patrón **Chain of Responsibility** (cadena de responsabilidad) encadena una serie de manejadores, cada uno con la oportunidad de procesar una solicitud o pasarla al siguiente. El emisor no sabe qué manejador la procesará.

La analogía: una solicitud de crédito bancario. Primero la revisa el asesor (pequeñas cantidades), luego el responsable de sucursal (cantidades medianas) y finalmente el director regional (grandes cantidades). Cada uno decide si aprueba o pasa al siguiente.

**Elementos clave para identificarlo:**
- Clase abstracta `Manejador` con referencia al `siguiente`.
- Método `pasarAlSiguiente()` en la clase abstracta.
- Cada manejador decide si procesa la solicitud o la delega.

```java
// Clase abstracta del manejador
public abstract class SupportHandler {
    protected SupportHandler next;

    public SupportHandler setNext(SupportHandler next) {
        this.next = next;
        return next; // permite encadenar con fluencia
    }

    protected void passToNext(int ticketLevel, String description) {
        if (next != null) {
            next.handle(ticketLevel, description);
        } else {
            System.out.println("Ticket unresolved: escalated beyond all handlers.");
        }
    }

    public abstract void handle(int level, String description);
}

// Manejadores concretos
public class FirstLineSupportHandler extends SupportHandler {
    @Override
    public void handle(int level, String description) {
        if (level <= 1) {
            System.out.println("First-line support resolved: " + description);
        } else {
            System.out.println("First-line passing to second-line: " + description);
            passToNext(level, description);
        }
    }
}

public class SecondLineSupportHandler extends SupportHandler {
    @Override
    public void handle(int level, String description) {
        if (level <= 2) {
            System.out.println("Second-line support resolved: " + description);
        } else {
            System.out.println("Second-line escalating to manager: " + description);
            passToNext(level, description);
        }
    }
}

public class ManagerSupportHandler extends SupportHandler {
    @Override
    public void handle(int level, String description) {
        System.out.println("Manager resolved (level " + level + "): " + description);
    }
}

// Uso:
class Main {
    public static void main(String[] args) {
        // Construcción de la cadena
        SupportHandler first   = new FirstLineSupportHandler();
        SupportHandler second  = new SecondLineSupportHandler();
        SupportHandler manager = new ManagerSupportHandler();

        first.setNext(second).setNext(manager);

        // Distintas solicitudes recorren la cadena
        first.handle(1, "Reset password");
        // First-line support resolved: Reset password

        first.handle(2, "Application crashes on startup");
        // First-line passing to second-line: Application crashes on startup
        // Second-line support resolved: Application crashes on startup

        first.handle(3, "Security breach detected");
        // First-line passing to second-line: Security breach detected
        // Second-line escalating to manager: Security breach detected
        // Manager resolved (level 3): Security breach detected
    }
}
```

---

## Command

El patrón **Command** encapsula una **acción** como un objeto. Esto permite encolarlo, registrarlo en un historial, deshacerlo (*undo*) o reejecutarlo (*redo*).

La analogía: un camarero en un restaurante. El cliente no va a la cocina a cocinar él mismo (no habla directamente con el receptor). Le entrega su comanda al camarero (comando), que la lleva a la cocina (receptor). La comanda puede cancelarse, modificarse o repetirse.

**Elementos clave para identificarlo:**
- Interfaz con `ejecutar()` y opcionalmente `deshacer()`.
- Las acciones están encapsuladas como objetos.
- El emisor (invocador) no conoce los detalles de la ejecución.

```java
// Interfaz del comando
public interface Command {
    void execute();
    void undo();
}

// Receptor: el objeto que realmente realiza las operaciones
public class TextEditor {
    private StringBuilder content = new StringBuilder();

    public void addText(String text) {
        content.append(text);
        System.out.println("Content: " + content);
    }

    public void removeText(int length) {
        int start = content.length() - length;
        if (start >= 0) {
            content.delete(start, content.length());
            System.out.println("Content: " + content);
        }
    }

    public String getContent() { return content.toString(); }
}

// Comandos concretos
public class AddTextCommand implements Command {
    private final TextEditor editor;
    private final String     text;

    public AddTextCommand(TextEditor editor, String text) {
        this.editor = editor;
        this.text   = text;
    }

    @Override
    public void execute() { editor.addText(text); }

    @Override
    public void undo()    { editor.removeText(text.length()); }
}

// Invocador: gestiona el historial de comandos
public class CommandInvoker {
    private final Deque<Command> history = new ArrayDeque<>();

    public void execute(Command command) {
        command.execute();
        history.push(command); // guarda para posible undo
    }

    public void undoLast() {
        if (!history.isEmpty()) {
            Command last = history.pop();
            last.undo();
        } else {
            System.out.println("Nothing to undo.");
        }
    }
}

// Uso:
class Main {
    public static void main(String[] args) {
        TextEditor     editor   = new TextEditor();
        CommandInvoker invoker  = new CommandInvoker();

        invoker.execute(new AddTextCommand(editor, "Hello"));
        // Content: Hello
        invoker.execute(new AddTextCommand(editor, ", World"));
        // Content: Hello, World
        invoker.undoLast();
        // Content: Hello
        invoker.undoLast();
        // Content:
        invoker.undoLast();
        // Nothing to undo.
    }
}
```

---

## Comparativa de patrones de comportamiento

| Patrón | Elimina | Elemento identificador |
|---|---|---|
| **Strategy** | `if/switch` sobre el algoritmo a usar | Interfaz de estrategia inyectada en el contexto |
| **Observer** | Acoplamiento entre sujeto y notificados | Lista de observadores + `notificar()` |
| **State** | `if/switch` sobre el estado interno | Contexto delega en objeto Estado sin condicionales |
| **Chain of Responsibility** | Condicionales de enrutamiento en un único lugar | Clase abstracta `Manejador` con referencia al `siguiente` |
| **Command** | Acoplamiento emisor-receptor; permite undo/redo | Interfaz con `ejecutar()` y `deshacer()` |
