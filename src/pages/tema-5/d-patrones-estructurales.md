# Patrones Estructurales

Los **patrones estructurales** se ocupan de cómo se componen las clases y objetos para formar estructuras más grandes. Su objetivo es hacer que partes del sistema sean compatibles entre sí o simplificar interfaces complejas, sin alterar las clases originales.

```java
// Sin patrón estructural: el cliente conoce cada subsistema internamente
VideoConverter converter = new VideoConverter();
AudioExtractor extractor = new AudioExtractor();
CodecFactory codec = new CodecFactory("h264");
BitrateReader reader = new BitrateReader(file, codec);
// ... varios pasos más antes de obtener el resultado
```

---

## Adapter

El patrón **Adapter** (adaptador) permite que dos clases con interfaces incompatibles trabajen juntas. Actúa como un traductor entre la interfaz que el cliente espera y la que ofrece la clase existente.

La analogía es literal: un adaptador de corriente eléctrica. Si tienes un enchufe europeo y una toma americana, no modificas el aparato ni la toma: añades un adaptador intermedio.

**Elementos clave para identificarlo:**
- Clase intermedia que **implementa la interfaz esperada** por el cliente.
- Internamente **delega** en una clase existente con firma incompatible.
- El cliente no modifica ni conoce la clase adaptada.

```java
// Interfaz que el cliente del sistema espera
public interface PaymentGateway {
    boolean processPayment(String cardNumber, double amount);
}

// Clase externa/legada con una firma incompatible (no podemos modificarla)
public class LegacyPaymentService {
    public String makePayment(String card, int amountInCents, String currency) {
        // Lógica de pago legado...
        System.out.println("Legacy payment: " + card + " | " + amountInCents + " " + currency);
        return "SUCCESS";
    }
}

// Adapter: implementa la interfaz esperada y delega en el servicio legado
public class LegacyPaymentAdapter implements PaymentGateway {

    private final LegacyPaymentService legacyService;

    public LegacyPaymentAdapter(LegacyPaymentService legacyService) {
        this.legacyService = legacyService;
    }

    @Override
    public boolean processPayment(String cardNumber, double amount) {
        int amountInCents = (int) (amount * 100); // convierte euros → céntimos
        String result = legacyService.makePayment(cardNumber, amountInCents, "EUR");
        return "SUCCESS".equals(result);
    }
}

// El cliente solo conoce PaymentGateway; es ajeno a la implementación legada
class CheckoutService {
    private final PaymentGateway gateway;

    public CheckoutService(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    public void checkout(String card, double total) {
        boolean ok = gateway.processPayment(card, total);
        if (ok) {
            System.out.println("Payment successful");
        } else {
            System.out.println("Payment failed");
        }
    }

    public static void main(String[] args) {
        LegacyPaymentService legacy  = new LegacyPaymentService();
        PaymentGateway       adapter = new LegacyPaymentAdapter(legacy);
        CheckoutService      service = new CheckoutService(adapter);

        service.checkout("4111111111111111", 49.99);
        // Legacy payment: 4111111111111111 | 4999 EUR
        // Payment successful
    }
}
```

:::tip
**¿Cuándo usar Adapter?**

Úsalo cuando necesitas integrar una biblioteca externa o un sistema legado cuya API no encaja con la del resto del sistema. Así evitas modificar el código existente (OCP).
:::

---

## Facade

El patrón **Facade** (fachada) proporciona una **interfaz simplificada** a un conjunto de clases o subsistemas complejos. El cliente solo interactúa con la fachada; no necesita conocer ni orquestar los subsistemas internamente.

La analogía: la recepción de un hotel. Como huésped, llamas a recepción para pedir una habitación, servicio de habitaciones o un taxi. No hablas directamente con el servicio de limpieza, la cocina o el garage: la recepción coordina todo por ti.

**Elementos clave para identificarlo:**
- Una única clase que **orquesta llamadas a varios subsistemas**.
- El cliente solo conoce la fachada.
- Los subsistemas pueden seguir siendo usados directamente, pero la fachada simplifica el caso habitual.

```java
// Subsistemas internos complejos
public class VideoDecoder {
    public void decode(String file) {
        System.out.println("Decoding video: " + file);
    }
}

public class AudioProcessor {
    public void normalize(String file) {
        System.out.println("Normalizing audio: " + file);
    }
}

public class SubtitleParser {
    public void load(String subtitleFile) {
        System.out.println("Loading subtitles: " + subtitleFile);
    }
}

public class VideoRenderer {
    public void render(String outputFile) {
        System.out.println("Rendering to: " + outputFile);
    }
}

// Facade: coordina todos los subsistemas en una interfaz de alto nivel
public class VideoEditorFacade {

    private final VideoDecoder   decoder;
    private final AudioProcessor audioProcessor;
    private final SubtitleParser subtitleParser;
    private final VideoRenderer  renderer;

    public VideoEditorFacade() {
        this.decoder        = new VideoDecoder();
        this.audioProcessor = new AudioProcessor();
        this.subtitleParser = new SubtitleParser();
        this.renderer       = new VideoRenderer();
    }

    // Un único método de alto nivel que oculta la complejidad
    public void produceVideo(String inputFile, String subtitleFile, String outputFile) {
        decoder.decode(inputFile);
        audioProcessor.normalize(inputFile);
        subtitleParser.load(subtitleFile);
        renderer.render(outputFile);
        System.out.println("Video production complete: " + outputFile);
    }
}

// El cliente solo necesita conocer la fachada
class Main {
    public static void main(String[] args) {
        VideoEditorFacade editor = new VideoEditorFacade();
        editor.produceVideo("raw_footage.mp4", "subtitles.srt", "final_cut.mp4");
        // Decoding video: raw_footage.mp4
        // Normalizing audio: raw_footage.mp4
        // Loading subtitles: subtitles.srt
        // Rendering to: final_cut.mp4
        // Video production complete: final_cut.mp4
    }
}
```

---

## Comparativa: Adapter vs. Facade

| | **Adapter** | **Facade** |
|---|---|---|
| **Propósito** | Hacer compatible una interfaz existente | Simplificar un sistema complejo |
| **Número de clases** | Adapta generalmente **una** clase | Coordina **varios** subsistemas |
| **Modifica interfaz** | Sí, la traduce a la esperada | No; crea una interfaz adicional de alto nivel |
| **Cuándo usarlo** | Integración de código legado o externo | Simplificar el acceso a un sistema complejo |

:::info
**Ambos son compatibles con OCP**

Tanto Adapter como Facade añaden una capa nueva sin modificar las clases existentes, respetando el principio Abierto/Cerrado.
:::
