# Ejercicios y Soluciones — Tema 4: Pruebas de Software

---

En esta sección encontrarás los ejercicios propuestos para el Tema 4, junto con sus soluciones en repositorios de Bitbucket.

## Ejercicios

### Ejercicio 1 — Calculadora con pruebas unitarias

Implementa la clase `Calculator` con los siguientes métodos y escribe una suite completa de pruebas JUnit 5 para cada uno:

- `add(int a, int b)`: suma dos enteros.
- `subtract(int a, int b)`: resta dos enteros.
- `multiply(int a, int b)`: multiplica dos enteros.
- `divide(int a, int b)`: divide dos enteros; lanza `ArithmeticException` si `b` es cero.

Restricciones:
- Cada método debe tener al menos tres pruebas: caso normal, caso límite (cero, negativos) y, si aplica, caso de error.
- Usa pruebas parametrizadas (`@CsvSource`) para los casos de suma y resta.
- El `main` solo debe instanciar la calculadora y mostrar algunos resultados de ejemplo.

---

### Ejercicio 2 — Sistema de notas con mocks

Implementa un sistema de gestión de notas de alumnos:

- Interfaz `StudentRepository` con los métodos `findById(int id): Student` y `save(Student s)`.
- Clase `GradeService` que depende de `StudentRepository` y tiene los métodos:
  - `getAverageGrade(int studentId): double` — calcula la media de las notas del alumno.
  - `isPassed(int studentId): boolean` — devuelve `true` si la media es ≥ 5.0.
  - `addGrade(int studentId, double grade)` — añade una nota al alumno y persiste el cambio.

Escribe pruebas con **Mockito** para `GradeService` que:
- Verifiquen el cálculo de la media con distintos conjuntos de notas.
- Verifiquen el comportamiento cuando el repositorio devuelve `null` (alumno no encontrado).
- Verifiquen que `save()` se llama exactamente una vez al añadir una nota.

---

### Ejercicio 3 — Cesta de la compra con cobertura

Implementa la clase `ShoppingCart`:

- `addItem(String name, double price)`: añade un artículo. Lanza `IllegalArgumentException` si el precio es negativo.
- `removeItem(String name)`: elimina un artículo por nombre. Devuelve `false` si no existe.
- `getTotal(): double`: suma los precios de todos los artículos.
- `applyVoucher(String code): void`: aplica un cupón. Códigos válidos: `"SAVE10"` (10 % dto.), `"SAVE20"` (20 % dto.). Lanza `InvalidVoucherException` para cualquier otro código.
- `clear()`: vacía la cesta.

Escribe pruebas que alcancen al menos el **80 % de cobertura de ramas** (verifica con JaCoCo).

---

### Ejercicio 4 — Pipeline CI con GitHub Actions

Partiendo del proyecto del Ejercicio 3 (o del Ejercicio 1):

1. Crea un repositorio en GitHub.
2. Configura un fichero `.github/workflows/ci.yml` que:
   - Se ejecute en cada push a `main` y en cada pull request.
   - Use JDK 21 y Maven.
   - Ejecute `mvn verify` (compilación + pruebas + cobertura).
   - Publique el informe de JaCoCo como artefacto del workflow.
3. Comprueba que el pipeline falla si rompes una prueba y pasa cuando todas están verdes.

---

## Soluciones

:::info Repositorios en Bitbucket
Los repositorios con las soluciones estarán disponibles próximamente.
:::

| Ejercicio | Repositorio |
|-----------|-------------|
| Ejercicio 1: Calculadora con pruebas unitarias | [Ver solución](https://bitbucket.org/profesorpermuta/tema-4-ejer-1-calculadora-pruebas) |
| Ejercicio 2: Sistema de notas con mocks | [Ver solución](https://bitbucket.org/profesorpermuta/tema-4-ejer-2-notas-mocks) |
| Ejercicio 3: Cesta de la compra con cobertura | [Ver solución](https://bitbucket.org/profesorpermuta/tema-4-ejer-3-cesta-cobertura) |
| Ejercicio 4: Pipeline CI con GitHub Actions | [Ver solución](https://bitbucket.org/profesorpermuta/tema-4-ejer-4-pipeline-ci) |
