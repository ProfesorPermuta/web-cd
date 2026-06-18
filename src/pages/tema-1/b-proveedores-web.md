# Proveedores de Repositorios Remotos

Un **proveedor de repositorios remotos** es una plataforma web que aloja tus repositorios Git en la nube. Actúa como el servidor central donde el equipo sincroniza su trabajo, revisa el código y gestiona el ciclo de vida del proyecto.

```bash
# Conectar tu repositorio local con un remoto alojado en cualquier proveedor
git remote add origin https://proveedor.com/usuario/mi-proyecto.git
git push -u origin main
```

---

## ¿Por qué necesitamos un proveedor remoto?

Git en sí mismo es una herramienta local: puedes hacer commits, ramas y merges sin conexión a Internet. Sin embargo, para colaborar en equipo necesitas un lugar centralizado donde todos puedan:

- Compartir su código.
- Revisar los cambios antes de integrarlos (**Pull Requests / Merge Requests**).
- Gestionar incidencias y tareas (**Issues**).
- Automatizar pruebas y despliegues (**CI/CD**).

Los tres proveedores más utilizados en la industria son **GitHub**, **GitLab** y **Bitbucket**.

---

## GitHub

**GitHub** es el proveedor más popular del mundo, adquirido por Microsoft en 2018. Aloja millones de proyectos de código abierto y es el estándar de referencia en la comunidad open source.

| Característica | Detalle |
|----------------|---------|
| URL | [github.com](https://github.com) |
| Propietario | Microsoft |
| Repositorios privados | Sí (plan gratuito incluye ilimitados) |
| Pull Requests | Sí |
| CI/CD integrado | GitHub Actions |
| Ideal para | Open source, portfolios personales, equipos de cualquier tamaño |

### Características destacadas de GitHub

- **GitHub Actions**: automatización de flujos de trabajo (tests, despliegues, linting…) directamente desde el repositorio.
- **GitHub Pages**: publicar sitios web estáticos directamente desde un repositorio.
- **Copilot**: asistente de código con inteligencia artificial integrado en el IDE.
- **Marketplace**: catálogo de acciones y herramientas de terceros para automatizar tareas.

```bash
# Clonar un repositorio desde GitHub
git clone https://github.com/usuario/mi-proyecto.git

# Subir cambios a GitHub
git push origin main
```

---

## GitLab

**GitLab** es la alternativa más completa a GitHub. Su gran diferencia es que puede instalarse en servidores propios (**self-hosted**), lo que lo hace muy popular en empresas que no quieren que su código salga de su infraestructura.

| Característica | Detalle |
|----------------|---------|
| URL | [gitlab.com](https://gitlab.com) |
| Propietario | GitLab Inc. (cotiza en bolsa) |
| Repositorios privados | Sí (plan gratuito incluye ilimitados) |
| Merge Requests | Sí (equivalente a Pull Requests) |
| CI/CD integrado | GitLab CI/CD (muy potente) |
| Self-hosted | Sí (Community Edition gratuita) |
| Ideal para | Empresas con infraestructura propia, equipos DevOps |

### Características destacadas de GitLab

- **GitLab CI/CD**: uno de los sistemas de integración y despliegue continuo más completos del mercado, configurado con ficheros `.gitlab-ci.yml`.
- **Self-hosted**: instala GitLab en tus propios servidores para tener control total sobre los datos.
- **GitLab Flow**: propone su propio flujo de trabajo con ramas de entorno (ver [d-flujos-de-trabajo.md](./d-flujos-de-trabajo)).
- **Gestión de proyectos**: tableros Kanban, milestones e issues integrados.

```bash
# Clonar un repositorio desde GitLab
git clone https://gitlab.com/usuario/mi-proyecto.git
```

```yaml
# Ejemplo mínimo de .gitlab-ci.yml para compilar y testar un proyecto Java
stages:
  - build
  - test

compilar:
  stage: build
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn compile

testar:
  stage: test
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn test
```

---

## Bitbucket

**Bitbucket** es el proveedor de Atlassian, la empresa detrás de Jira y Confluence. Su integración nativa con estas herramientas lo convierte en la opción favorita de equipos que ya usan el ecosistema Atlassian.

| Característica | Detalle |
|----------------|---------|
| URL | [bitbucket.org](https://bitbucket.org) |
| Propietario | Atlassian |
| Repositorios privados | Sí (gratuito para equipos de hasta 5 personas) |
| Pull Requests | Sí |
| CI/CD integrado | Bitbucket Pipelines |
| Self-hosted | Sí (Bitbucket Data Center, de pago) |
| Ideal para | Equipos que usan Jira, Confluence o el ecosistema Atlassian |

### Características destacadas de Bitbucket

- **Integración con Jira**: vincula commits y Pull Requests directamente con tickets de Jira de forma automática.
- **Bitbucket Pipelines**: CI/CD configurado con ficheros `bitbucket-pipelines.yml`.
- **Code Insights**: integración con herramientas de análisis de calidad de código (SonarQube, Snyk…).
- **Workspace y Projects**: organización de repositorios por espacios de trabajo y proyectos.

```bash
# Clonar un repositorio desde Bitbucket
git clone https://bitbucket.org/usuario/mi-proyecto.git
```

---

## Comparativa general

| | GitHub | GitLab | Bitbucket |
|--|--------|--------|-----------|
| **Popularidad** | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| **Open source** | Muy activo | Activo | Menos activo |
| **CI/CD** | GitHub Actions | GitLab CI/CD | Bitbucket Pipelines |
| **Self-hosted** | GitHub Enterprise (pago) | Community Ed. (gratis) | Data Center (pago) |
| **Integración Jira** | Parcial | Parcial | Nativa |
| **Gratuito para equipos** | Ilimitado | Ilimitado | Hasta 5 personas |

:::tip ¿Cuál usar en el curso?
En este curso usaremos **Bitbucket** para publicar las soluciones de ejercicios y **GitHub** como referencia para proyectos personales y portfolios. Ambos funcionan exactamente igual desde la línea de comandos de Git: solo cambia la URL del remoto.
:::

---

## Autenticación: HTTPS vs. SSH

Todos los proveedores admiten dos formas de autenticarse al hacer `push` o `pull`:

### HTTPS (más sencilla para empezar)

```bash
git clone https://github.com/usuario/mi-proyecto.git
# Te pedirá usuario y contraseña (o token de acceso personal)
```

### SSH (más cómoda en el día a día)

```bash
# 1. Generar un par de claves SSH (si no tienes ya una)
ssh-keygen -t ed25519 -C "tu@email.com"

# 2. Copiar la clave pública y añadirla en la web del proveedor
#    (GitHub: Settings > SSH keys / Bitbucket: Personal settings > SSH keys)
cat ~/.ssh/id_ed25519.pub

# 3. Clonar usando SSH (ya no pide contraseña)
git clone git@github.com:usuario/mi-proyecto.git
```

:::info Token de acceso personal (PAT)
GitHub y Bitbucket eliminaron el soporte para contraseñas normales vía HTTPS. En su lugar debes crear un **Personal Access Token (PAT)** desde la configuración de tu cuenta y usarlo como si fuera la contraseña. La autenticación SSH evita este paso.
:::

---

## Archivos relacionados

- [a-introduccion.md](./a-introduccion) — ¿Qué es Git?
- [b-repositorio-y-rama-principal.md](./b-repositorio-y-rama-principal) — Gestionar un repositorio local
- [d-flujos-de-trabajo.md](./d-flujos-de-trabajo) — Flujos de trabajo (GitHub Flow, GitLab Flow…)
