# Ejercicios y Soluciones — Tema 3: Diagramas de Clase UML y POO

---

En esta sección encontrarás los ejercicios propuestos para el Tema 3, junto con sus soluciones en repositorios de Bitbucket.

## Ejercicios

### Ejercicio 1 — Biblioteca

Diseña el diagrama de clases UML de un sistema de biblioteca e impleméntalo en Java. El sistema debe modelar:

- Un **libro** con título, autor, ISBN y año de publicación.
- Un **socio** con nombre, número de socio y fecha de alta.
- Un **préstamo** que relaciona un socio con un libro, con fecha de préstamo y fecha de devolución prevista.

Restricciones:
- Un socio puede tener varios préstamos activos; un libro solo puede estar prestado a un socio a la vez.
- La clase `Library` gestiona el alta de socios y libros, y el registro de préstamos.
- Ninguna clase imprime por consola; solo el `main` imprime los resultados.

---

### Ejercicio 2 — Figuras Geométricas

Define una jerarquía de clases para figuras geométricas:

- Interfaz `Shape` con métodos `getArea()` y `getPerimeter()`.
- Clases concretas: `Circle`, `Rectangle` y `Triangle`, cada una implementando `Shape`.
- Clase `ShapeCalculator` con un método que recibe una lista de `Shape` y devuelve la suma total de áreas.

Restricciones:
- Usa polimorfismo: `ShapeCalculator` no debe conocer los tipos concretos.
- Ninguna clase imprime por consola; solo el `main`.

---

### Ejercicio 3 — Empresa y Empleados

Modela la estructura de una empresa:

- Una **empresa** tiene un nombre y una lista de **departamentos**.
- Cada **departamento** tiene un nombre y una lista de **empleados**.
- Un **empleado** tiene nombre, puesto y salario.
- La empresa tiene un método que devuelve el empleado con el salario más alto.
- Un departamento tiene un método que devuelve la suma de salarios de sus empleados.

Restricciones:
- Usa composición entre `Company` y `Department` (los departamentos no existen fuera de la empresa).
- Usa agregación entre `Department` y `Employee` (los empleados pueden existir independientemente).
- Ninguna clase imprime por consola; solo el `main`.

---

### Ejercicio 4 — Carrito de la Compra

Diseña e implementa un sistema básico de carrito de compra:

- Un **producto** tiene nombre, precio y categoría.
- Un **carrito** contiene una lista de productos y permite añadir, eliminar y calcular el total.
- Un **descuento** es una interfaz con un método `apply(double total): double`. Implementa dos descuentos: porcentaje fijo (`PercentageDiscount`) y descuento de cantidad fija (`FixedDiscount`).
- El carrito acepta un `Discount` opcional y lo aplica al calcular el total.

Restricciones:
- Usa el patrón de composición para que el carrito no dependa de una implementación concreta de descuento.
- Ninguna clase imprime por consola; solo el `main`.

---

## Soluciones

:::info Repositorios en Bitbucket
Los repositorios con las soluciones estarán disponibles próximamente.
:::

| Ejercicio | Repositorio |
|-----------|-------------|
| Ejercicio 1: Biblioteca | [Ver solución](https://bitbucket.org/profesorpermuta/tema-3-ejer-1-biblioteca) |
| Ejercicio 2: Figuras Geométricas | [Ver solución](https://bitbucket.org/profesorpermuta/tema-3-ejer-2-figuras-geometricas) |
| Ejercicio 3: Empresa y Empleados | [Ver solución](https://bitbucket.org/profesorpermuta/tema-3-ejer-3-empresa-empleados) |
| Ejercicio 4: Carrito de la Compra | [Ver solución](https://bitbucket.org/profesorpermuta/tema-3-ejer-4-carrito-compra) |
