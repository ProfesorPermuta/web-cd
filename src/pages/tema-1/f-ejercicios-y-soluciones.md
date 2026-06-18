# Ejercicios y Soluciones — Tema 1: Git

---

En esta sección encontrarás los ejercicios propuestos para el Tema 1, junto con sus soluciones en repositorios de Bitbucket.

## Ejercicios

### Ejercicio 1 — Primer repositorio Git

Crea un repositorio Git local para un proyecto llamado `biblioteca`. El proyecto tendrá la siguiente estructura mínima:

- Un fichero `README.md` con el nombre del proyecto y una breve descripción.
- Un fichero `.gitignore` adecuado para proyectos Java/Maven.
- Una carpeta `src/` con al menos un fichero Java vacío (`Main.java`).

Requisitos:
1. Inicializa el repositorio con `git init`.
2. Realiza al menos **3 commits separados** con mensajes descriptivos (uno por cada fichero o grupo de ficheros añadido).
3. Muestra el historial final con `git log --oneline`.

---

### Ejercicio 2 — Trabajo con ramas

Partiendo del repositorio del Ejercicio 1, simula el desarrollo de dos funcionalidades en paralelo:

1. Crea una rama `feature/gestion-libros` y añade en ella un fichero `Libro.java` con los atributos `titulo`, `autor` e `isbn` (todos privados). Realiza al menos 2 commits en esta rama.
2. Sin fusionar aún, vuelve a `main` y crea una rama `feature/gestion-usuarios`. Añade un fichero `Usuario.java` con los atributos `nombre`, `email` y `contrasena` (todos privados). Realiza al menos 2 commits.
3. Fusiona `feature/gestion-libros` en `main` usando `--no-ff`. A continuación, fusiona `feature/gestion-usuarios` en `main`.
4. Muestra el historial final con `git log --oneline --graph --all` y comprueba que aparecen los commits de fusión.

---

### Ejercicio 3 — Resolución de conflictos

Crea un repositorio nuevo llamado `conflictos-git` y reproduce la siguiente situación:

1. En `main`, crea un fichero `Mensaje.java` con el siguiente contenido en el método `obtenerSaludo()`:
   ```java
   return "Hola desde main";
   ```
   Haz commit.
2. Crea una rama `feature/nuevo-saludo` y modifica ese mismo método para que devuelva:
   ```java
   return "Hola desde la nueva rama";
   ```
   Haz commit en la rama.
3. Vuelve a `main` y modifica el mismo método para que devuelva:
   ```java
   return "Hola, mundo!";
   ```
   Haz commit en `main`.
4. Intenta fusionar `feature/nuevo-saludo` en `main`. Se producirá un conflicto. Resuélvelo eligiendo el mensaje `"Hola, mundo!"` y completa el merge.

---

### Ejercicio 4 — Simulación de Git Flow

Crea un repositorio `tienda-online` y aplica el flujo **Git Flow** para simular el desarrollo de una versión `v1.0`:

1. Crea las ramas permanentes `main` y `develop`.
2. Desde `develop`, crea la rama `feature/carrito-compra`. Añade un fichero `Carrito.java` con un atributo `items` (lista privada) y haz 2 commits.
3. Fusiona `feature/carrito-compra` en `develop` con `--no-ff`.
4. Desde `develop`, crea la rama `release/1.0`. Modifica el `README.md` para indicar la versión `1.0` y haz un commit.
5. Fusiona `release/1.0` en `main` y etiquétala como `v1.0`. Fusiona también `release/1.0` en `develop`.
6. Simula un hotfix: desde `main`, crea `hotfix/error-precio`. Modifica cualquier fichero y haz un commit. Fusiona el hotfix en `main` (etiqueta `v1.0.1`) y en `develop`.
7. Muestra el historial completo con `git log --oneline --graph --all`.

---

## Soluciones

:::info Repositorios en Bitbucket
Los repositorios con las soluciones estarán disponibles próximamente.
:::

| Ejercicio | Repositorio |
|-----------|-------------|
| Ejercicio 1: Primer repositorio Git | [Ver solución](https://bitbucket.org/profesorpermuta/tema-1-ejer-1-primer-repositorio) |
| Ejercicio 2: Trabajo con ramas | [Ver solución](https://bitbucket.org/profesorpermuta/tema-1-ejer-2-trabajo-con-ramas) |
| Ejercicio 3: Resolución de conflictos | [Ver solución](https://bitbucket.org/profesorpermuta/tema-1-ejer-3-resolucion-conflictos) |
| Ejercicio 4: Simulación de Git Flow | [Ver solución](https://bitbucket.org/profesorpermuta/tema-1-ejer-4-git-flow) |
