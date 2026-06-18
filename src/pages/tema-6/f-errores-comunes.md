# Errores Comunes en Diagramas de Comportamiento

---

## Error 1: Confundir `<<include>>` con `<<extend>>`

El error más frecuente es usar `<<include>>` cuando la relación es opcional, o `<<extend>>` cuando el comportamiento siempre se ejecuta.

**Incorrecto** — usar `<<include>>` para algo que solo ocurre a veces:

```mermaid
graph LR
    subgraph Sistema
        UC1(Realizar pedido) -->|<<include>>| UC2(Aplicar descuento)
    end
    Cliente[👤 Cliente] --> UC1
```

*El descuento no siempre se aplica; solo cuando el cliente tiene un cupón.*

**Correcto** — usar `<<extend>>` con condición:

```mermaid
graph LR
    subgraph Sistema
        UC2(Aplicar descuento) -->|<<extend>>\n[tiene cupón]| UC1(Realizar pedido)
    end
    Cliente[👤 Cliente] --> UC1
```

---

## Error 2: Incluir pasos de interfaz gráfica como casos de uso

Los casos de uso deben representar **objetivos del actor**, no acciones de interfaz.

**Incorrecto:**

```mermaid
graph LR
    subgraph Sistema
        UC1(Hacer clic en Enviar)
        UC2(Introducir contraseña)
        UC3(Ver mensaje de confirmación)
    end
    A[👤 Usuario] --> UC1
    A --> UC2
    A --> UC3
```

**Correcto:**

```mermaid
graph LR
    subgraph Sistema
        UC1(Iniciar sesión)
        UC2(Registrar usuario)
    end
    A[👤 Usuario] --> UC1
    A --> UC2
```

---

## Error 3: Usar mensajes síncronos cuando la operación es asíncrona

Si el emisor no espera la respuesta, la flecha debe ser asíncrona (`-)` en Mermaid), no síncrona (`->>`).

**Incorrecto** — una tarea de procesamiento en segundo plano representada como síncrona:

```mermaid
sequenceDiagram
    participant App as Aplicación
    participant Worker as Servicio Worker

    App->>Worker: procesarInforme(datos)
    Worker-->>App: informeGenerado
    App-->>App: continuarOtrasTareas
```

*Aquí `App` no puede continuar otras tareas si está bloqueada esperando la respuesta.*

**Correcto** — mensaje asíncrono que no bloquea al emisor:

```mermaid
sequenceDiagram
    participant App as Aplicación
    participant Worker as Servicio Worker
    participant Notif as Notificaciones

    App-)Worker: procesarInforme(datos)
    Note right of App: App continúa sin esperar
    App->>App: continuarOtrasTareas

    Worker-)Notif: 1.1. informeGenerado(resultado)
```

---

## Error 4: Olvidar la barra de activación en llamadas que esperan respuesta

Sin barra de activación (`+` / `-`), el diagrama no refleja que el participante está ocupado procesando.

**Incorrecto** — sin barras de activación:

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Aplicación
    participant BD as Base de Datos

    Usuario->>App: buscarProducto(nombre)
    App->>BD: select(nombre)
    BD-->>App: resultados
    App-->>Usuario: listaProductos
```

**Correcto** — con barras de activación:

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Aplicación
    participant BD as Base de Datos

    Usuario->>+App: buscarProducto(nombre)
    App->>+BD: select(nombre)
    BD-->>-App: resultados
    App-->>-Usuario: listaProductos
```

---

## Error 5: Poner la flecha de `<<extend>>` en dirección incorrecta

La flecha de `<<extend>>` apunta del caso de uso **extensor** al **base**, no al revés. Un error habitual es dibujarla igual que `<<include>>`.

**Incorrecto** — flecha en dirección errónea:

```mermaid
graph LR
    subgraph Sistema
        UC1(Realizar pedido) -->|<<extend>>| UC2(Aplicar descuento)
    end
```

**Correcto** — el extensor apunta al base:

```mermaid
graph LR
    subgraph Sistema
        UC2(Aplicar descuento) -->|<<extend>>| UC1(Realizar pedido)
    end
```

---

## Error 6: Anidar demasiados fragmentos combinados

Más de 2 niveles de fragmentos anidados hacen el diagrama ilegible.

**Incorrecto** — tres niveles de anidamiento:

```mermaid
sequenceDiagram
    participant A
    participant B

    loop reintentos
        alt condicion1
            opt condicion2
                A->>B: mensajeMuyAnidado()
            end
        end
    end
```

**Correcto** — extraer el fragmento interior a un diagrama separado y referenciar con una nota:

```mermaid
sequenceDiagram
    participant A
    participant B

    loop reintentos
        alt condicion1
            Note over A,B: [ref] Subdiagrama: verificarCondicion2
        end
    end
```

---

## Error 7: Nombrar los casos de uso como sustantivos en lugar de verbos

Los casos de uso deben expresar una **acción con valor** para el actor.

| Incorrecto | Correcto |
|---|---|
| Registro | Registrar usuario |
| Pedidos | Realizar pedido |
| Historial de compras | Consultar historial de compras |
| Pago | Procesar pago |
