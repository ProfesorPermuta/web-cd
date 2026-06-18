# Flujos de Trabajo en Git

Un **flujo de trabajo Git** (Git workflow) es un conjunto de reglas y convenciones acordadas por un equipo sobre cómo usar las ramas, cuándo hacer merge y cómo publicar versiones. Elegir el flujo adecuado evita caos cuando varias personas trabajan sobre el mismo código.

---

## ¿Por qué necesitamos un flujo de trabajo?

Imagina un equipo donde cada persona crea ramas con nombres distintos, fusiona donde quiere y nadie sabe cuál es la versión que está en producción. El resultado es un repositorio imposible de mantener.

Un flujo de trabajo establece:
- Qué ramas existen siempre y para qué sirven.
- Quién puede fusionar en qué ramas.
- Cómo se etiquetan las versiones publicadas.

---

## Flujo 1: Trunk-Based Development (rama única)

El flujo más sencillo. Todo el equipo trabaja directamente sobre `main` (o `trunk`). Apropiado para equipos muy pequeños o proyectos personales.

```
main:  A --- B --- C --- D --- E
```

```bash
git switch main
git pull origin main
# ... modificar código ...
git add .
git commit -m "Añade nueva funcionalidad X"
git push origin main
```

**Ventajas:** simplicidad total.
**Inconvenientes:** cualquier error llega directamente a producción; difícil trabajar en paralelo.

---

## Flujo 2: Feature Branch Workflow

Cada nueva funcionalidad se desarrolla en su propia rama y se fusiona a `main` cuando está completa. Es el flujo más común en proyectos medianos.

```
main:     A -------- B --------- E --------- H
               \           /         \       /
feature-1:      C --- D ---           F --- G
```

```bash
# Desarrollador empieza una funcionalidad
git switch -c feature/nueva-pantalla
# ... commits ...
git push -u origin feature/nueva-pantalla

# Cuando está lista, se abre una Pull Request / Merge Request
# El equipo revisa el código y aprueba el merge a main
```

:::info Pull Request / Merge Request
Las plataformas como GitHub, GitLab o Bitbucket permiten abrir una **Pull Request (PR)** antes del merge. Esto activa una revisión de código por parte del equipo antes de integrar los cambios. Es una práctica recomendada en cualquier equipo profesional.
:::

---

## Flujo 3: Git Flow

Diseñado por Vincent Driessen en 2010. Usa un conjunto fijo de ramas con roles bien definidos. Ideal para proyectos con **ciclos de releases** definidos (versiones 1.0, 1.1, 2.0…).

### Ramas permanentes

| Rama | Propósito |
|------|-----------|
| `main` | Código en producción. Solo recibe merges de `release` y `hotfix`. |
| `develop` | Integración continua. Aquí confluyen todas las features terminadas. |

### Ramas temporales

| Tipo | Nombre | Parte de | Se fusiona en |
|------|--------|----------|---------------|
| Feature | `feature/nombre` | `develop` | `develop` |
| Release | `release/x.y` | `develop` | `main` + `develop` |
| Hotfix | `hotfix/nombre` | `main` | `main` + `develop` |

```
main:      ●────────────────────────────●─────●
           │                            │     │
           │           release/1.0──────┤     │
           │          /                 │     │
develop:   ●──────────────────────────────────●
            \        /   \      /
feature/A:   ●──────●     │    │
feature/B:              ●──────●
```

```bash
# Iniciar una nueva funcionalidad desde develop
git switch develop
git switch -c feature/sistema-de-pagos

# ... commits en feature/sistema-de-pagos ...

# Finalizar la feature: fusionar en develop
git switch develop
git merge --no-ff feature/sistema-de-pagos
git branch -d feature/sistema-de-pagos

# Preparar una release
git switch -c release/1.0
# ... ajustes finales, bump de versión ...
git switch main
git merge --no-ff release/1.0
git tag -a v1.0 -m "Version 1.0"
git switch develop
git merge --no-ff release/1.0
git branch -d release/1.0
```

**Ventajas:** muy estructurado, ideal para software con versiones explícitas.  
**Inconvenientes:** complejo, muchas ramas activas, puede ralentizar equipos pequeños con despliegue continuo.

---

## Flujo 4: GitHub Flow

Simplificación de Git Flow para equipos que despliegan continuamente a producción (Continuous Deployment). Solo existe la rama `main` como permanente.

```
main:   ●────────────────────────────────────────
         \    /    \        /    \      /
          feature   feature       feature
```

### Reglas de GitHub Flow

1. `main` siempre contiene código desplegable en producción.
2. Toda funcionalidad o corrección se hace en una rama propia.
3. Se abre una **Pull Request** cuando la rama está lista para revisión.
4. El equipo revisa, comenta y aprueba.
5. Se despliega la rama para verificar en staging.
6. Se fusiona en `main` y se despliega automáticamente a producción.

```bash
# Ciclo completo de GitHub Flow
git switch main && git pull origin main
git switch -c fix/error-calculo-iva

# ... commits ...

git push -u origin fix/error-calculo-iva
# Abrir Pull Request en GitHub
# Revisión → aprobación → merge → borrar rama
```

**Ventajas:** sencillo, favorece el despliegue continuo, revisión de código integrada.  
**Inconvenientes:** requiere buena cobertura de tests automáticos para que `main` sea siempre estable.

---

## Flujo 5: GitLab Flow

Extiende GitHub Flow añadiendo **ramas de entorno** que representan los distintos entornos de despliegue (staging, producción). Útil cuando el despliegue no es completamente automático.

```
main ──→ pre-production ──→ production
```

```bash
# Una vez fusionada la feature en main y verificada,
# se hace merge en pre-production para pruebas
git switch pre-production
git merge --no-ff main

# Si todo va bien, se promueve a producción
git switch production
git merge --no-ff pre-production
```

---

## Comparativa de flujos

| Flujo | Complejidad | Ideal para |
|-------|-------------|------------|
| Trunk-Based | Muy baja | Proyectos personales, equipos de 1-2 personas |
| Feature Branch | Baja | La mayoría de proyectos en equipo |
| Git Flow | Alta | Software con versiones explícitas y ciclos de release |
| GitHub Flow | Media | Equipos con despliegue continuo (CD) |
| GitLab Flow | Media | Equipos con múltiples entornos de despliegue |

:::tip ¿Cuál elegir?
Para la mayoría de proyectos del curso, **Feature Branch Workflow** con Pull Requests es el equilibrio perfecto entre orden y sencillez. Si el proyecto tiene versiones numeradas, considera **Git Flow**.
:::

---

## Etiquetas (tags): marcar versiones

Las **etiquetas** permiten marcar commits concretos como versiones oficiales del software:

```bash
# Crear una etiqueta anotada en el commit actual
git tag -a v1.2.0 -m "Version 1.2.0: añade módulo de reportes"

# Ver todas las etiquetas
git tag

# Publicar las etiquetas en el remoto
git push origin --tags
```

---

## Archivos relacionados

- [c-ramas-y-merge.md](./c-ramas-y-merge) — Fundamentos de ramas y merge
- [e-errores-comunes.md](./e-errores-comunes) — Errores frecuentes con Git
