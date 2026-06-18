# Metodología Ágil y Pair Programming

Las **metodologías ágiles** son un conjunto de enfoques de desarrollo de software que priorizan la **colaboración**, la **adaptabilidad** y la **entrega continua de valor** sobre la planificación rígida y la documentación exhaustiva. Surgieron como respuesta a las limitaciones del modelo en Cascada en proyectos con requisitos cambiantes.

Su filosofía queda recogida en el **Manifiesto Ágil** (2001), que proclama cuatro valores fundamentales:

```
Individuos e interacciones   >   Procesos y herramientas
Software funcionando         >   Documentación exhaustiva
Colaboración con el cliente  >   Negociación de contratos
Respuesta ante el cambio     >   Seguir un plan
```

---

## ¿Para qué se usa?

- Proyectos donde los requisitos **cambian frecuentemente**.
- Equipos pequeños y **altamente colaborativos**.
- Cuando el cliente quiere **implicarse activamente** en el desarrollo.
- Entornos donde la **velocidad de entrega** es una ventaja competitiva.

---

## Principios ágiles clave

### Involucración continua del cliente

El cliente (o su representante, llamado **Product Owner** en Scrum) participa en cada iteración: define prioridades, revisa entregables y valida que el software cumple sus necesidades reales.

### Estándares de codificación compartidos

Todo el equipo sigue las mismas convenciones de código. En Java esto incluye:
- Nombres de clases en `PascalCase` (p. ej., `GestorPedidos`).
- Nombres de métodos y variables en `camelCase` (p. ej., `calcularTotal`).
- Atributos siempre `private`.
- Comentarios explicativos cuando la lógica no es evidente.

```java
// Estándar compartido: todos los métodos de cálculo devuelven double
// y no imprime nada por pantalla — eso es responsabilidad del main
public class Cuenta {
    private String titular;
    private double saldo;

    public Cuenta(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public boolean ingresar(double cantidad) {
        if (cantidad <= 0) return false;
        saldo += cantidad;
        return true;
    }

    public boolean retirar(double cantidad) {
        if (cantidad <= 0 || cantidad > saldo) return false;
        saldo -= cantidad;
        return true;
    }

    public double getSaldo() { return saldo; }
    public String getTitular() { return titular; }
}
```

### Evaluación regular del progreso

Al final de cada iteración se realizan dos reuniones:
- **Revisión (Review)**: el equipo muestra el software funcionando al cliente.
- **Retrospectiva**: el equipo reflexiona sobre el proceso y decide mejoras.

---

## Pair Programming (Programación en Pareja)

El **pair programming** es una práctica ágil en la que dos programadores trabajan juntos en el mismo ordenador, sobre el mismo código, al mismo tiempo.

### Los dos roles

| Rol | Nombre habitual | Responsabilidad |
|-----|-----------------|-----------------|
| El que escribe | **Driver** (conductor) | Escribe el código, controla el teclado |
| El que revisa | **Navigator** (navegador) | Observa, piensa en el diseño, detecta errores, sugiere mejoras |

Los roles se intercambian con frecuencia (cada 15–30 minutos o al completar una pequeña tarea).

### ¿Por qué funciona?

- **Revisión continua**: el navegador detecta errores en tiempo real que el driver no ve porque está concentrado en los detalles.
- **Diseño mejorado**: dos cabezas piensan mejor la estructura del código.
- **Transferencia de conocimiento**: el equipo aprende mutuamente; no hay "silos" de conocimiento.
- **Menos interrupciones**: con dos personas concentradas en la misma tarea, es más difícil distraerse.

### Ejemplo de sesión de pair programming

```
Driver escribe:

public double calcularMedia(int[] valores) {
    int suma = 0;
    for (int v : valores) {
        suma += v;
    }
    return suma / valores.length;  // ← Navigator detecta: división entera, debería ser (double)
}

Navigator sugiere:
    return (double) suma / valores.length;

Código corregido antes de continuar:

public double calcularMedia(int[] valores) {
    int suma = 0;
    for (int v : valores) {
        suma += v;
    }
    return (double) suma / valores.length; // cast explícito para evitar truncado
}
```

---

## Tests unitarios antes de la codificación (TDD)

En entornos ágiles se practica con frecuencia el **Test-Driven Development (TDD)**: primero se escribe el test que define el comportamiento esperado, y después se implementa el código que lo hace pasar.

```
1. Escribir test (ROJO: el test falla porque el método no existe aún)
2. Implementar el método mínimo para que el test pase (VERDE)
3. Refactorizar el código manteniendo el test en verde (REFACTOR)
```

```java
// Paso 1 — Test: verificar que calcularMedia([4, 8, 6]) devuelve 6.0
public class EstadisticaTest {
    public static void main(String[] args) {
        Estadistica est = new Estadistica();
        double resultado = est.calcularMedia(new int[]{4, 8, 6});
        double esperado = 6.0;

        if (resultado == esperado) {
            System.out.println("TEST PASADO");
        } else {
            System.out.println("TEST FALLIDO: esperado=" + esperado + " obtenido=" + resultado);
        }
    }
}
```

```java
// Paso 2 — Implementación mínima que pasa el test
public class Estadistica {
    public double calcularMedia(int[] valores) {
        if (valores == null || valores.length == 0) return 0;
        int suma = 0;
        for (int v : valores) {
            suma += v;
        }
        return (double) suma / valores.length;
    }
}
```

---

## Resumen comparativo de metodologías

| | Métrica v3 | IOO | Ágil |
|--|-----------|-----|------|
| **Orientación** | Proceso formal | Modelo de objetos | Personas y colaboración |
| **Documentación** | Exhaustiva | Diagramas UML | Justa y necesaria |
| **Participación cliente** | Inicio y aceptación | Variable | Continua |
| **Adaptación al cambio** | Costosa | Media | Alta |
| **Ámbito típico** | Administración pública | Proyectos OO | Startups y proyectos dinámicos |

---

## Archivos relacionados

- [d-modelo-iterativo.md](d-modelo-iterativo.md) — Modelo Iterativo (base del desarrollo ágil)
- [f-ingenieria-orientada-objetos.md](f-ingenieria-orientada-objetos.md) — Ingeniería Orientada a Objetos
