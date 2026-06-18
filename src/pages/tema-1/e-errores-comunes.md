# Errores Comunes con Git

---

## Error 1: Hacer commit en la rama equivocada

Trabajas en una funcionalidad nueva pero, por descuido, estás en `main` en lugar de en tu rama `feature/...` y haces commits allí.

```bash
# Incorrecto: commits en main cuando debían ir en feature/login
git switch main
# ... cambios ...
git commit -m "Añade pantalla de login"

# Correcto: crear la rama antes de empezar a trabajar
git switch main
git pull origin main
git switch -c feature/login
# ... cambios ...
git commit -m "Añade pantalla de login"
```

Si ya hiciste el commit en `main`, puedes recuperarlo:

```bash
# 1. Guarda el hash del commit incorrecto
git log --oneline   # anota el hash, p.ej. a3f9c12

# 2. Crea la rama correcta en ese punto
git switch -c feature/login

# 3. Vuelve a main y deshaz el commit (sin perder los cambios)
git switch main
git reset HEAD~1   # quita el último commit pero deja los ficheros modificados
```

---

## Error 2: Olvidar hacer `git pull` antes de empezar

Empiezas a trabajar sin actualizar tu rama local. Cuando intentas hacer `git push`, Git rechaza el envío porque el remoto tiene commits que tú no tienes.

```bash
# Incorrecto: empezar directamente sin actualizar
git switch main
# ... horas de trabajo ...
git push origin main
# ERROR: rejected — remote contains work that you do not have locally

# Correcto: siempre actualizar antes de empezar
git switch main
git pull origin main
git switch -c feature/mi-tarea
```

Si ya te has metido en este problema:

```bash
# Traer los cambios remotos y fusionarlos con los tuyos
git pull origin main --rebase
```

---

## Error 3: Mensaje de commit vacío o sin sentido

```bash
# Incorrecto: mensajes que no aportan información
git commit -m "cambios"
git commit -m "arreglado"
git commit -m "wip"
git commit -m "asdfgh"

# Correcto: mensajes que explican el qué y el por qué
git commit -m "Corrige el cálculo del IVA para productos exentos"
git commit -m "Añade validación de NIF en el formulario de alta"
git commit -m "Elimina dependencia de log4j vulnerable (CVE-2021-44228)"
```

---

## Error 4: Versionar ficheros que no deben versionarse

Subir al repositorio ficheros con contraseñas, claves de API, configuraciones locales o binarios generados.

```bash
# Incorrecto: sin .gitignore, se sube todo
git add .
git commit -m "Configuración inicial"
# → sube application.properties con la contraseña de la BD

# Correcto: definir .gitignore antes del primer commit
```

Contenido recomendado de `.gitignore` para proyectos Java/Maven:

```gitignore
# Maven
/target/
*.jar
*.war

# IDE IntelliJ IDEA
/.idea/
*.iml

# IDE Eclipse
/.classpath
/.project
/.settings/

# Configuración local con datos sensibles
application-local.properties
.env
*.key
```

Si ya subiste un fichero sensible por error:

```bash
# Eliminar el fichero del historial de Git (sin borrarlo del disco)
git rm --cached application-local.properties
git commit -m "Elimina fichero de configuración sensible del repositorio"
git push
```

:::warning Si subiste credenciales reales
Si subiste una contraseña o clave de API real a un repositorio, **cámbiala inmediatamente**, aunque luego la elimines del repositorio. Los bots escanean GitHub en tiempo real buscando credenciales expuestas.
:::

---

## Error 5: Intentar fusionar sin haber resuelto conflictos

```bash
# Incorrecto: hacer commit sin haber eliminado los marcadores de conflicto
git merge feature/nueva-pantalla
# CONFLICT (content): Merge conflict in Pantalla.java
git add Pantalla.java
git commit -m "Merge realizado"
# → el fichero Pantalla.java contiene <<<<<< y >>>>>> dentro del código

# Correcto: editar el fichero, eliminar los marcadores y dejar solo el código válido
# Pantalla.java antes de resolver:
# <<<<<<< HEAD
#     mostrarTitulo("Inicio");
# =======
#     mostrarTitulo("Bienvenida");
# >>>>>>> feature/nueva-pantalla

# Pantalla.java después de resolver (dejas la versión correcta):
#     mostrarTitulo("Bienvenida");

git add Pantalla.java
git commit -m "Merge feature/nueva-pantalla: usa el título 'Bienvenida'"
```

---

## Error 6: Eliminar una rama antes de fusionarla

```bash
# Incorrecto: borrar la rama con trabajo sin integrar
git branch -D feature/sistema-notificaciones
# → todos los commits de esa rama se pierden (potencialmente)

# Correcto: fusionar primero, luego borrar
git switch main
git merge feature/sistema-notificaciones
git branch -d feature/sistema-notificaciones  # -d (minúscula) solo borra si está fusionada
```

:::tip Diferencia entre `-d` y `-D`
`git branch -d` (minúscula) protege tu trabajo: falla si la rama no está fusionada. `git branch -D` (mayúscula) fuerza el borrado sin comprobación. Usa `-D` solo cuando sepas exactamente lo que haces.
:::

---

## Error 7: Usar `git add .` en el directorio raíz sin revisar

```bash
# Incorrecto: añadir todo sin comprobar qué se va a incluir
git add .
git commit -m "Actualización"
# → puede incluir ficheros de configuración local, binarios, capturas de pantalla...

# Correcto: revisar siempre qué ficheros se van a añadir antes de confirmar
git status          # ver qué ficheros han cambiado
git diff            # revisar el contenido de los cambios
git add src/        # añadir solo la carpeta de código fuente
git add -p          # añadir cambios de forma interactiva, hunk por hunk
git commit -m "Mensaje descriptivo"
```

---

## Archivos relacionados

- [b-repositorio-y-rama-principal.md](./b-repositorio-y-rama-principal) — Flujo de trabajo básico
- [c-ramas-y-merge.md](./c-ramas-y-merge) — Ramas y merge
- [f-ejercicios-y-soluciones.md](./f-ejercicios-y-soluciones) — Ejercicios del tema
