# Gestionar un Repositorio en una Sola Rama

Un **repositorio Git** es el corazón del sistema: la carpeta donde Git almacena tanto los ficheros de tu proyecto como todo su historial de cambios. En este apartado aprenderás el flujo de trabajo básico trabajando sobre la rama principal.

```bash
# Inicializar un nuevo repositorio en la carpeta actual
git init
```

---

## El ciclo de vida básico: modificar → preparar → guardar

El flujo de trabajo diario con Git se repite siempre con tres pasos. Piensa en ello como preparar un paquete para enviar:

1. **Modificas** ficheros en tu carpeta de trabajo (área de trabajo).
2. **Preparas** los cambios que quieres incluir en el próximo commit (área de preparación o *staging area*).
3. **Guardas** el commit con un mensaje descriptivo (repositorio local).

```
[Área de trabajo] --git add--> [Staging area] --git commit--> [Repositorio]
```

---

## Crear o clonar un repositorio

### Opción A — Nuevo proyecto desde cero

```bash
# Crear la carpeta, entrar y inicializar
mkdir mi-proyecto
cd mi-proyecto
git init

# Conectar con un repositorio remoto ya creado en GitHub/Bitbucket
git remote add origin https://github.com/usuario/mi-proyecto.git
```

### Opción B — Clonar un proyecto existente

```bash
# Descarga el repositorio completo con todo su historial
git clone https://github.com/usuario/mi-proyecto.git

# Entrar en la carpeta descargada
cd mi-proyecto
```

---

## Comprobar el estado del repositorio

Antes de añadir o confirmar cambios, consulta siempre el estado:

```bash
git status
```

La salida te indica qué ficheros han cambiado, cuáles están en el área de preparación y cuáles no Git aún no rastrea (**untracked**).

---

## Añadir cambios al área de preparación

```bash
# Añadir un fichero concreto
git add MiClase.java

# Añadir todos los ficheros modificados y nuevos
git add .

# Añadir solo los ficheros ya rastreados por Git (no los nuevos)
git add -u
```

:::warning Cuidado con `git add .`
`git add .` añade absolutamente todo lo que haya cambiado, incluidos ficheros que no quieres versionar (configuraciones locales, contraseñas, etc.). Usa un fichero `.gitignore` para excluirlos.
:::

---

## El fichero .gitignore

El fichero `.gitignore` le indica a Git qué ficheros y carpetas debe ignorar completamente:

```gitignore
# Carpetas generadas por el compilador / IDE
/target/
/.idea/
*.class

# Ficheros de configuración local con datos sensibles
application-local.properties
.env
```

---

## Crear un commit

Un **commit** necesita siempre un mensaje que explique el *por qué* del cambio, no solo el *qué*:

```bash
# Forma estándar
git commit -m "Añade validación de email en el registro de usuarios"

# Añadir y hacer commit en un solo paso (solo ficheros ya rastreados)
git commit -am "Corrige el cálculo del precio con descuento"
```

:::tip Buenas prácticas para mensajes de commit
- Usa el **imperativo** en presente: "Añade", "Corrige", "Elimina".
- Sé descriptivo pero conciso (menos de 72 caracteres).
- Indica el *por qué* si el cambio no es obvio.
:::

---

## Ver el historial de commits

```bash
# Historial completo
git log

# Historial compacto (una línea por commit)
git log --oneline

# Historial con gráfico de ramas
git log --oneline --graph --all
```

Ejemplo de salida de `git log --oneline`:

```
a3f9c12 Corrige bug en el login cuando el usuario no existe
7b2e401 Añade endpoint de recuperación de contraseña
1d8c990 Crea la estructura inicial del proyecto
```

---

## Sincronizar con el repositorio remoto

```bash
# Enviar tus commits locales al remoto
git push origin main

# Traer los commits remotos que aún no tienes
git pull origin main
```

| Comando | Dirección | Descripción |
|---------|-----------|-------------|
| `git push` | Local → Remoto | Sube tus commits |
| `git pull` | Remoto → Local | Descarga y fusiona los commits remotos |
| `git fetch` | Remoto → Local | Solo descarga, sin fusionar |

---

## Deshacer cambios

```bash
# Descartar cambios en un fichero (antes de hacer add)
git restore MiClase.java

# Sacar un fichero del staging area (sin perder los cambios)
git restore --staged MiClase.java

# Ver qué cambió en un fichero concreto
git diff MiClase.java
```

:::warning No uses `git reset --hard` a la ligera
`git reset --hard` descarta cambios de forma permanente. Úsalo solo cuando estés seguro de que no necesitas esos cambios.
:::

---

## Archivos relacionados

- [a-introduccion.md](./a-introduccion) — ¿Qué es Git y para qué sirve?
- [c-ramas-y-merge.md](./c-ramas-y-merge) — Trabajar con varias ramas y fusionarlas
