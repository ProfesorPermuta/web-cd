# Ejercicios y Soluciones — Tema 2: Ingeniería de Software

---

En esta sección encontrarás los ejercicios propuestos para el Tema 2, junto con sus soluciones en repositorios de Bitbucket.

## Ejercicios

### Ejercicio 1 — Diseño con Tarjetas CRC

Supón que debes desarrollar un sistema de gestión de una **biblioteca**. El sistema debe permitir:

- Registrar libros con título, autor, ISBN y número de ejemplares disponibles.
- Registrar socios con nombre, número de socio y fecha de alta.
- Gestionar préstamos: un socio puede tomar prestado un libro si hay ejemplares disponibles.
- Devolver un libro prestado, actualizando los ejemplares disponibles.

**Tarea:**

1. Diseña las tarjetas CRC para las clases `Libro`, `Socio` y `Prestamo`. Para cada una indica:
   - Responsabilidades (qué sabe y qué sabe hacer).
   - Colaboradores (con qué otras clases interactúa).

2. Implementa en Java las tres clases respetando las siguientes restricciones:
   - Todos los atributos deben ser `private`.
   - Los métodos de lógica de negocio devuelven valores y no imprimen nada.
   - La clase `Libro` debe tener un método `prestar()` que devuelva `true` si había ejemplares disponibles (y los descuente) o `false` si no.
   - La clase `Libro` debe tener un método `devolver()` que incremente los ejemplares disponibles.

3. Crea un `main` que simule el siguiente flujo e imprima los resultados:
   - Crear un libro con 3 ejemplares.
   - Crear dos socios.
   - El primer socio toma prestado el libro (mostrar si tuvo éxito).
   - El segundo socio intenta tomar el mismo libro (mostrar si tuvo éxito).
   - El primer socio devuelve el libro.
   - El segundo socio vuelve a intentar tomar el libro (mostrar si tuvo éxito).

---

### Ejercicio 2 — Simulación de iteración ágil

Forma un equipo de dos personas (o trabaja con el rol de driver y navigator de forma alternada) para implementar un sistema de **carrito de la compra** en dos iteraciones.

**Iteración 1** — Funcionalidades básicas:

Implementa las clases `Articulo` y `Carrito` con las siguientes responsabilidades:

- `Articulo`: conoce su nombre y precio unitario.
- `Carrito`: puede añadir artículos, calcular el total y conocer cuántos artículos contiene.

Antes de implementar `Carrito`, escribe un **test manual** (método `main` de prueba) que verifique que:
- Un carrito vacío tiene total 0.
- Tras añadir dos artículos, el total es la suma correcta de sus precios.

**Iteración 2** — Tras "revisión con el cliente", se añaden estas funcionalidades:

- El carrito debe poder eliminar un artículo por nombre.
- El carrito debe poder calcular el total con un descuento porcentual aplicado al conjunto.

Actualiza el test manual para cubrir estas nuevas funcionalidades antes de implementarlas.

---

### Ejercicio 3 — Ciclo de vida en la práctica

Dado el siguiente enunciado de proyecto, responde las preguntas a continuación:

> "Una empresa de logística necesita un sistema para gestionar el estado de sus envíos. Los clientes podrán consultar online el estado de su envío usando el número de seguimiento. Los repartidores podrán actualizar el estado desde su móvil. Los requisitos cambiarán a medida que el equipo de negocio reciba feedback de los clientes piloto."

**Preguntas:**

1. ¿Qué modelo de ciclo de vida recomendarías y por qué? (Cascada, Prototipado o Iterativo)
2. ¿Qué metodología aplicarías? (Métrica v3, IOO o Ágil) Justifica la respuesta.
3. Diseña las tarjetas CRC para las clases `Envio` y `Repartidor`.
4. Implementa la clase `Envio` con los atributos y métodos que hayas definido en las tarjetas CRC. El método `actualizarEstado(String nuevoEstado)` debe registrar el nuevo estado y devolver `true`. Los posibles estados son: `"EN_ALMACEN"`, `"EN_REPARTO"`, `"ENTREGADO"` y `"DEVUELTO"`.

---

### Ejercicio 4 — Refactorización de prototipo

Se te entrega el siguiente código de prototipo creado con prisas. Tu tarea es refactorizarlo aplicando los principios de la Ingeniería Orientada a Objetos:

```java
// Prototipo a refactorizar — NO modifiques este bloque, escribe la versión corregida aparte
public class Gestion {
    public String n;           // nombre del empleado
    public double s;           // salario bruto
    public double i = 0.15;    // IRPF fijo del 15%

    public void info() {
        System.out.println(n + ": neto=" + (s - s * i));
    }
}
```

Requisitos de la refactorización:
- Renombrar la clase como `Empleado` con atributos descriptivos y `private`.
- El porcentaje de IRPF debe ser un parámetro del constructor, no un valor fijo.
- Añadir métodos `calcularIrpf()` y `calcularSalarioNeto()` que devuelvan `double`.
- No imprimir nada dentro de la clase `Empleado`.
- Crear un `main` que instancie al menos dos empleados con distintos porcentajes de IRPF e imprima sus datos.

---

## Soluciones

:::info Repositorios en Bitbucket
Los repositorios con las soluciones estarán disponibles próximamente.
:::

| Ejercicio | Repositorio |
|-----------|-------------|
| Ejercicio 1: Diseño con Tarjetas CRC | [Ver solución](https://bitbucket.org/profesorpermuta/tema-2-ejer-1-tarjetas-crc) |
| Ejercicio 2: Simulación de iteración ágil | [Ver solución](https://bitbucket.org/profesorpermuta/tema-2-ejer-2-iteracion-agil) |
| Ejercicio 3: Ciclo de vida en la práctica | [Ver solución](https://bitbucket.org/profesorpermuta/tema-2-ejer-3-ciclo-de-vida) |
| Ejercicio 4: Refactorización de prototipo | [Ver solución](https://bitbucket.org/profesorpermuta/tema-2-ejer-4-refactorizacion) |
