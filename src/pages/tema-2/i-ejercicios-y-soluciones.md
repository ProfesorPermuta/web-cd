# Ejercicios y Soluciones — Tema 2: Ingeniería de Software

---

En esta sección encontrarás los ejercicios propuestos para el Tema 2, junto con sus soluciones.

La entrega de estos ejercicios se realizará a través de GitHub. Es tu primera entrega usando la plataforma, así que sigue estos pasos con calma y en orden; a partir de ahora será el procedimiento habitual para entregar las actividades del curso.

### Paso 1 — Crear el repositorio en GitHub

1. Entra en tu cuenta de GitHub.
2. Crea un **nuevo repositorio** llamado `CD_Tema2_Ejercicios`.
3. Copia la URL del repositorio (botón **Code** → **HTTPS**).

### Paso 2 — Clonar el repositorio en tu ordenador

Abre la consola de git en la carpeta donde quieras guardar el proyecto y ejecuta:

```bash
git clone <url_del_repositorio>
```

Esto creará una carpeta `CD_Tema2_Ejercicios` con una copia local del repositorio. A partir de aquí, todo el trabajo se hace **dentro de esa carpeta**.

### Paso 3 — Resolver una actividad

1. Dentro de la carpeta del repositorio, crea un archivo con el nombre de la actividad, por ejemplo `0101.md` para la actividad 1.
2. Escribe dentro de ese archivo la solución del ejercicio correspondiente.

### Paso 4 — Subir la actividad resuelta

Cuando termines la actividad, comprueba primero que estás situado en la carpeta del repositorio y ejecuta, en este orden:

```bash
git add *
git commit -m "Resuelta actividad 1"
git push origin main
```

:::tip 
¿`main` o `master`?
El nombre de la rama principal depende de cómo se creó el repositorio. Si `git push origin main` da error, prueba con `git push origin master`. Puedes comprobar el nombre de tu rama actual con `git branch`.
:::

### Paso 5 — Repetir para cada actividad

Repite los pasos 3 y 4 para cada una de las actividades del tema: crea el archivo correspondiente (`0102.md`, `0103.md`...), resuélvelo y haz un **commit independiente** por cada actividad, con un mensaje que identifique claramente qué se ha resuelto (por ejemplo, `"Resuelta actividad 2"`).

:::warning 
Importante
No esperes a terminar todas las actividades para hacer un único commit. Cada actividad resuelta debe subirse con su propio commit, en cuanto la termines.
:::

## Ejercicios

### Ejercicio 1 — Diseño con Tarjetas CRC

Supón que debes desarrollar un sistema de gestión de una **biblioteca**. El sistema debe permitir:

- Registrar libros con título, autor, ISBN y número de ejemplares disponibles.
- Registrar socios con nombre, número de socio y fecha de alta.
- Gestionar préstamos: un socio puede tomar prestado un libro si hay ejemplares disponibles.
- Devolver un libro prestado, actualizando los ejemplares disponibles.

**Tarea:**

1. Diseña las tarjetas CRC para las clases `Libro`, `Socio` y `Préstamo`. Para cada una indica:
   - Responsabilidades (qué sabe y qué sabe hacer).
   - Colaboradores (con qué otras clases interactúa).

2. Describe, para la clase `Libro`, qué debería ocurrir cuando se intenta prestar un ejemplar: qué se comprueba antes de prestarlo y qué cambia en el objeto si el préstamo tiene éxito o si no lo tiene.

3. Describe con tus palabras el siguiente flujo, indicando en cada paso qué clase actúa y qué colaboradores necesita:
   - Se da de alta un libro con 3 ejemplares.
   - Se dan de alta dos socios.
   - El primer socio toma prestado el libro (¿tiene éxito?).
   - El segundo socio intenta tomar el mismo libro (¿tiene éxito?).
   - El primer socio devuelve el libro.
   - El segundo socio vuelve a intentar tomar el libro (¿tiene éxito?).

---

### Ejercicio 2 — Simulación de iteración ágil

Forma un equipo de dos personas (o trabaja con el rol de driver y navigator de forma alternada) para diseñar, en dos iteraciones, un sistema de **carrito de la compra**.

**Iteración 1** — Funcionalidades básicas:

Diseña las tarjetas CRC de las clases `Artículo` y `Carrito` con las siguientes responsabilidades:

- `Artículo`: conoce su nombre y precio unitario.
- `Carrito`: puede añadir artículos, calcular el total y conocer cuántos artículos contiene.

Antes de dar la iteración por terminada, escribe en prosa los **casos de prueba** que deberían cumplirse:
- Un carrito vacío tiene total 0.
- Tras añadir dos artículos, el total es la suma correcta de sus precios.

**Iteración 2** — Tras "revisión con el cliente", se añaden estas funcionalidades:

- El carrito debe poder eliminar un artículo por nombre.
- El carrito debe poder calcular el total con un descuento porcentual aplicado al conjunto.

Actualiza las tarjetas CRC y añade los nuevos casos de prueba que deberían cumplirse antes de dar la iteración por terminada.

---

### Ejercicio 3 — Ciclo de vida en la práctica

Dado el siguiente enunciado de proyecto, responde las preguntas a continuación:

> "Una empresa de logística necesita un sistema para gestionar el estado de sus envíos. Los clientes podrán consultar online el estado de su envío usando el número de seguimiento. Los repartidores podrán actualizar el estado desde su móvil. Los requisitos cambiarán a medida que el equipo de negocio reciba feedback de los clientes piloto."

**Preguntas:**

1. ¿Qué modelo de ciclo de vida recomendarías y por qué? (Cascada o Iterativo)
2. ¿Qué metodología aplicarías? (Métrica v3 o Ágil) Justifica la respuesta.
3. Diseña las tarjetas CRC para las clases `Envío` y `Repartidor`.
4. Para la clase `Envío`, describe cómo debería comportarse la operación de actualizar el estado: qué dato recibe, qué valores puede tomar el nuevo estado (por ejemplo, `"EN_ALMACÉN"`, `"EN_REPARTO"`, `"ENTREGADO"` y `"DEVUELTO"`) y qué debería devolver para confirmar que el cambio se ha aplicado.

---

### Ejercicio 4 — Redacción de historias de usuario

Retoma el sistema de gestión de la biblioteca del Ejercicio 1.

**Tarea:**

1. Redacta al menos tres historias de usuario (formato "Como... quiero... para...") que cubran distintos roles: el socio, el bibliotecario y un administrador del sistema.
2. Para cada historia, comprueba que cumple los criterios **INVEST** (Independiente, Negociable, Valiosa, Estimable, Pequeña, Testeable). Si alguna no los cumple, reformúlala.
3. Elige una de las historias y escribe sus criterios de aceptación en formato Dado-Cuando-Entonces (al menos dos criterios).

---

### Ejercicio 5 — Product Backlog con Scrum

La empresa **Tech4Learning**, especializada en el desarrollo de aplicaciones educativas, está trabajando en una nueva plataforma web llamada **"EduPro"** orientada a institutos y centros de formación profesional. Esta plataforma permitirá a profesores y estudiantes gestionar actividades, contenidos y evaluaciones en un entorno ágil e intuitivo.

Durante la reunión del equipo Scrum, Marta, profesora de FP, y Luis, director de un centro educativo que usará la plataforma, han planteado una serie de necesidades para la próxima iteración del producto.

Marta comenta:

> "Necesitamos que los profesores puedan subir material didáctico en PDF, vídeos y enlaces, y que los alumnos puedan acceder a ellos desde cualquier dispositivo. Además, sería importante que los archivos puedan organizarse por temas o semanas."

Luis añade:

> "Para nosotros es fundamental que los profesores puedan programar exámenes online con preguntas de opción múltiple y abiertas, y que haya una forma de corregir automáticamente las de opción múltiple para ahorrar tiempo. También nos gustaría que los estudiantes reciban notificaciones cuando se publica una nueva actividad."

**Tarea:**

Empleando las especificaciones anteriores, crea los elementos necesarios para llegar hasta el Product Backlog siguiendo la metodología Scrum. Esto quiere decir:

1. Identifica los **roles** implicados (Product Owner, Scrum Master, Development Team) y quién de los mencionados en el enunciado podría representar cada uno.
2. Redacta las **historias de usuario** necesarias para cubrir las necesidades planteadas por Marta y Luis (formato "Como... quiero... para...").
3. Para cada historia, define al menos **2 criterios de aceptación** en formato Dado-Cuando-Entonces.
4. **Estima** cada historia mediante la técnica de **Planning Poker**, usando como punto de partida y referencia la siguiente historia ya estimada por el equipo:

   > *Iniciar sesión en la plataforma usando un correo electrónico y contraseña* — **5 puntos**.

   Justifica cada estimación comparando la complejidad de la nueva historia con la de esta historia de referencia.
5. Ordena las historias resultantes para formar el **Product Backlog**, justificando el criterio de priorización elegido (valor de negocio, dependencias entre historias, riesgo, etc.).

---

## Soluciones

| Ejercicio | Solución |
|-----------|----------|
| Ejercicio 1: Diseño con Tarjetas CRC | [Ver solución](./soluciones_tema/0101.md) |
| Ejercicio 2: Simulación de iteración ágil | [Ver solución](./soluciones_tema/0102.md) |
| Ejercicio 3: Ciclo de vida en la práctica | [Ver solución](./soluciones_tema/0103.md) |
| Ejercicio 4: Redacción de historias de usuario | [Ver solución](./soluciones_tema/0104.md) |
| Ejercicio 5: Product Backlog con Scrum | [Ver solución](./soluciones_tema/0105.md) |
