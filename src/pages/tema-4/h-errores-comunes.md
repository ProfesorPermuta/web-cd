# Errores Comunes en Pruebas de Software

---

## Error 1: Pruebas que dependen entre sí

Una prueba nunca debe depender del resultado o del estado que dejó otra. Si el orden de ejecución importa, las pruebas están mal aisladas.

```java
// Incorrecto: la segunda prueba asume que la primera ya ejecutó addItem()
class OrderServiceTest {
    private static OrderService service = new OrderService(); // estado compartido

    @Test
    void test1_addItem() {
        service.addItem("Laptop", 999.0);
        assertEquals(1, service.getItemCount());
    }

    @Test
    void test2_checkTotal() {
        // Falla si test1 no se ejecutó primero
        assertEquals(999.0, service.getTotal());
    }
}

// Correcto: cada prueba crea su propio contexto con @BeforeEach
class OrderServiceTest {
    private OrderService service;

    @BeforeEach
    void setUp() {
        service = new OrderService(); // estado limpio en cada prueba
    }

    @Test
    void addItem_singleItem_countIsOne() {
        service.addItem("Laptop", 999.0);
        assertEquals(1, service.getItemCount());
    }

    @Test
    void addItem_singleItem_totalIsCorrect() {
        service.addItem("Laptop", 999.0);
        assertEquals(999.0, service.getTotal(), 0.001);
    }
}
```

---

## Error 2: Pruebas sin aserción (pruebas vacías)

Una prueba que no contiene ningún `assert` siempre pasa, incluso si el código está roto. No aporta ninguna seguridad.

```java
// Incorrecto: pasa siempre, incluso si getTotal() lanza una excepción
@Test
void testGetTotal() {
    ShoppingCart cart = new ShoppingCart();
    cart.addItem(50.0);
    cart.getTotal(); // resultado ignorado
}

// Correcto:
@Test
void getTotal_oneItem_returnsItemPrice() {
    ShoppingCart cart = new ShoppingCart();
    cart.addItem(50.0);
    assertEquals(50.0, cart.getTotal(), 0.001);
}
```

---

## Error 3: Un único test que verifica múltiples comportamientos

Una prueba debe verificar **una sola cosa**. Si falla, debes saber exactamente qué está roto sin leer el cuerpo entero de la prueba.

```java
// Incorrecto: un test hace demasiado
@Test
void testBankAccount() {
    BankAccount account = new BankAccount(100.0);
    account.deposit(50.0);
    assertEquals(150.0, account.getBalance());       // comportamiento 1
    account.withdraw(30.0);
    assertEquals(120.0, account.getBalance());       // comportamiento 2
    assertFalse(account.withdraw(200.0));             // comportamiento 3
}

// Correcto: una prueba, un comportamiento
@Test
void deposit_positiveAmount_increasesBalance() { ... }

@Test
void withdraw_sufficientFunds_deductsAmount() { ... }

@Test
void withdraw_insufficientFunds_returnsFalse() { ... }
```

---

## Error 4: Acoplar las pruebas a detalles de implementación

Las pruebas deben verificar el **comportamiento observable** (lo que el método devuelve o hace), no cómo está implementado internamente.

```java
// Incorrecto: la prueba depende del nombre de un campo interno
// Si renombramos 'items' a 'cartItems', la prueba se rompe
@Test
void addItem_setsInternalList() {
    ShoppingCart cart = new ShoppingCart();
    cart.addItem("X", 10.0);
    assertEquals(1, cart.items.size()); // accede a campo privado por reflexión
}

// Correcto: verifica el comportamiento público
@Test
void addItem_oneItem_itemCountIsOne() {
    ShoppingCart cart = new ShoppingCart();
    cart.addItem("X", 10.0);
    assertEquals(1, cart.getItemCount()); // método público
}
```

---

## Error 5: No probar los casos límite

Solo probar el "camino feliz" deja sin cubrir los escenarios donde el código suele fallar.

```java
// Incorrecto: solo prueba el caso normal
@Test
void divide_normalCase_returnsQuotient() {
    assertEquals(5, calc.divide(10, 2));
}

// Correcto: también prueba los límites
@Test
void divide_byZero_throwsArithmeticException() {
    assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));
}

@Test
void divide_negativeDivisor_returnsNegativeResult() {
    assertEquals(-5, calc.divide(10, -2));
}

@Test
void divide_bothZero_throwsArithmeticException() {
    assertThrows(ArithmeticException.class, () -> calc.divide(0, 0));
}
```

---

## Error 6: Usar `Thread.sleep()` en pruebas

Añadir pausas con `Thread.sleep()` hace las pruebas lentas y frágiles (pueden fallar en máquinas lentas o en CI).

```java
// Incorrecto: esperar tiempo arbitrario
@Test
void processOrder_async_completesSuccessfully() throws InterruptedException {
    service.processAsync(order);
    Thread.sleep(2000); // ¿y si tarda más de 2 s en CI?
    assertTrue(order.isProcessed());
}

// Correcto: usar mecanismos de sincronización (Awaitility, CompletableFuture, etc.)
@Test
void processOrder_async_completesSuccessfully() {
    CompletableFuture<Void> future = service.processAsync(order);
    future.join(); // espera de forma determinista
    assertTrue(order.isProcessed());
}
```

---

## Error 7: Hacer mocks de todo, incluso de la clase bajo prueba

Mockear la propia clase que estamos probando no tiene sentido: estaríamos probando el mock, no el código real.

```java
// Incorrecto: se mockea la propia clase bajo prueba
@Test
void getDiscount_premiumUser() {
    DiscountService service = mock(DiscountService.class);
    when(service.getDiscount("PREMIUM")).thenReturn(20.0);
    assertEquals(20.0, service.getDiscount("PREMIUM")); // prueba el mock, no el código
}

// Correcto: instancia real + mock solo de las dependencias externas
@Test
void getDiscount_premiumUser_returns20Percent() {
    UserRepository mockRepo = mock(UserRepository.class);
    when(mockRepo.findType("user1")).thenReturn("PREMIUM");

    DiscountService service = new DiscountService(mockRepo); // instancia real
    assertEquals(20.0, service.getDiscount("user1"), 0.001);
}
```

---

## Error 8: Pipeline de CI que siempre pasa aunque haya pruebas rotas

Si el pipeline está configurado para ignorar fallos de pruebas, pierde todo su valor.

```yaml
# Incorrecto: los fallos en pruebas no detienen el pipeline
- name: Ejecutar pruebas
  run: mvn test || true   # el '|| true' hace que el paso nunca falle

# Correcto: cualquier fallo detiene el pipeline
- name: Ejecutar pruebas
  run: mvn verify
```
