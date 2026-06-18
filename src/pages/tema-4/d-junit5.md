# JUnit 5: El Framework Estándar en Java

**JUnit 5** es el framework de pruebas unitarias más utilizado en el ecosistema Java. Proporciona anotaciones, aserciones y extensiones que permiten escribir, organizar y ejecutar pruebas de forma estandarizada. Es el sucesor de JUnit 4 y se integra con Maven, Gradle, IntelliJ IDEA y los pipelines de CI/CD.

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    @Test
    void add_twoPositiveNumbers_returnsCorrectSum() {
        Calculator calc = new Calculator();
        assertEquals(7, calc.add(3, 4));
    }
}
```

---

## Arquitectura de JUnit 5

JUnit 5 se compone de tres módulos:

| Módulo | Función |
|--------|---------|
| **JUnit Platform** | Motor de ejecución; comunica JUnit con Maven/Gradle/IDEs |
| **JUnit Jupiter** | API moderna con anotaciones y aserciones (`@Test`, `assertEquals`…) |
| **JUnit Vintage** | Compatibilidad con pruebas escritas en JUnit 4 |

En la práctica, trabajaremos siempre con **JUnit Jupiter**.

---

## Dependencia en Maven

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

---

## Anotaciones principales

### `@Test`

Marca un método como prueba. JUnit lo ejecutará automáticamente.

```java
@Test
void myFirstTest() {
    assertTrue(1 + 1 == 2);
}
```

---

### `@BeforeEach` y `@AfterEach`

Se ejecutan **antes** y **después** de cada prueba. Útiles para inicializar y limpiar el estado.

```java
class OrderServiceTest {

    private OrderService service;

    @BeforeEach
    void setUp() {
        service = new OrderService(); // estado limpio para cada prueba
    }

    @Test
    void addItem_newItem_increasesOrderCount() {
        service.addItem("Laptop", 999.0);
        assertEquals(1, service.getItemCount());
    }

    @Test
    void addItem_twoItems_totalIsCorrect() {
        service.addItem("Laptop", 999.0);
        service.addItem("Mouse", 25.0);
        assertEquals(1024.0, service.getTotal(), 0.001);
    }
}
```

---

### `@BeforeAll` y `@AfterAll`

Se ejecutan **una vez** antes y después de todos los tests de la clase. El método debe ser `static`.

```java
@BeforeAll
static void initDatabase() {
    // Conexión a base de datos de prueba (costosa, se hace una vez)
}

@AfterAll
static void closeDatabase() {
    // Cierre de la conexión
}
```

---

### `@Disabled`

Desactiva temporalmente una prueba sin eliminarla.

```java
@Test
@Disabled("Pendiente de implementar el método getDiscount()")
void getDiscount_premiumUser_returns20Percent() {
    // ...
}
```

---

### `@DisplayName`

Proporciona un nombre legible para la prueba en los informes.

```java
@Test
@DisplayName("Retirada con saldo insuficiente devuelve false")
void withdraw_insufficientFunds_returnsFalse() {
    // ...
}
```

---

## Aserciones principales

Las **aserciones** son el mecanismo con el que una prueba verifica el resultado. Si una aserción falla, la prueba falla.

| Aserción | ¿Qué comprueba? |
|---------|----------------|
| `assertEquals(esperado, actual)` | Que dos valores son iguales |
| `assertNotEquals(a, b)` | Que dos valores son distintos |
| `assertTrue(condición)` | Que una condición es verdadera |
| `assertFalse(condición)` | Que una condición es falsa |
| `assertNull(objeto)` | Que el objeto es `null` |
| `assertNotNull(objeto)` | Que el objeto no es `null` |
| `assertThrows(Excepcion.class, lambda)` | Que se lanza la excepción indicada |
| `assertAll(...)` | Ejecuta múltiples aserciones y reporta todos los fallos |

### Ejemplo con `assertThrows`

```java
@Test
void divide_byZero_throwsArithmeticException() {
    Calculator calc = new Calculator();

    ArithmeticException ex = assertThrows(
        ArithmeticException.class,
        () -> calc.divide(10, 0)
    );

    assertEquals("Division by zero", ex.getMessage());
}
```

### Ejemplo con `assertAll`

```java
@Test
void person_fullNameAndAge_areSetCorrectly() {
    Person p = new Person("Ana", "García", 30);

    assertAll("person fields",
        () -> assertEquals("Ana",    p.getFirstName()),
        () -> assertEquals("García", p.getLastName()),
        () -> assertEquals(30,       p.getAge())
    );
}
```

`assertAll` no se detiene al primer fallo: reporta todos los problemas a la vez.

---

## Pruebas parametrizadas

Las **pruebas parametrizadas** permiten ejecutar la misma lógica con múltiples conjuntos de datos, evitando duplicar código.

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class CalculatorTest {

    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "0, 5, 5",
        "-3, 3, 0",
        "100, -50, 50"
    })
    void add_variousInputs_returnsCorrectSum(int a, int b, int expected) {
        Calculator calc = new Calculator();
        assertEquals(expected, calc.add(a, b));
    }
}
```

Esto genera automáticamente cuatro pruebas independientes, una por cada fila de datos.

---

## Estructura de ficheros de prueba

Por convención, los ficheros de prueba se ubican en `src/test/java`, espejando la estructura de `src/main/java`:

```
src/
├── main/java/
│   └── com/empresa/
│       ├── Calculator.java
│       └── BankAccount.java
└── test/java/
    └── com/empresa/
        ├── CalculatorTest.java
        └── BankAccountTest.java
```

Cada clase de producción tiene su clase de prueba correspondiente con el sufijo `Test`.

---

## Archivos relacionados

- [c-pruebas-unitarias.md](c-pruebas-unitarias.md) — Concepto y estructura de pruebas unitarias
- [e-mocks-y-stubs.md](e-mocks-y-stubs.md) — Mocks y stubs con Mockito
