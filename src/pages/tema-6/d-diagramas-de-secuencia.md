# Diagramas de Secuencia

Un **diagrama de secuencia** muestra cómo interactúan un conjunto de participantes mediante mensajes ordenados en el tiempo. Mientras el diagrama de casos de uso responde a *qué* hace el sistema, el diagrama de secuencia responde a *cómo* lo hace internamente, mensaje a mensaje.

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant App as Aplicación
    participant BD as Base de Datos

    Usuario->>+App: iniciarSesion(usuario, clave)
    App->>+BD: verificarCredenciales(usuario, clave)
    BD-->>-App: credencialesValidas
    App-->>-Usuario: sesionIniciada(token)
```

---

## Participantes

Los **participantes** son los elementos que intervienen en el diagrama. Se representan como columnas verticales ordenadas de izquierda a derecha siguiendo el flujo principal de comunicación.

| Tipo | Representación | Cuándo usarlo |
|---|---|---|
| **Sistema / Componente / Clase** | Rectángulo con el nombre | Cualquier sistema software, servicio o clase |
| **Actor** | Figura humana con el nombre | Persona u entidad externa al sistema |

En Mermaid se declaran con las palabras clave `participant` y `actor`:

```mermaid
sequenceDiagram
    actor Cliente
    participant Tienda as Sistema Tienda
    participant Almacen as Servicio de Almacén

    Cliente->>Tienda: consultarStock(productoId)
    Tienda->>Almacen: getUnidadesDisponibles(productoId)
    Almacen-->>Tienda: 42
    Tienda-->>Cliente: "Hay 42 unidades disponibles"
```

---

## Línea de vida (*Lifeline*)

Cada participante tiene una **línea de vida**: una línea vertical discontinua que representa su existencia a lo largo del tiempo. El tiempo avanza **hacia abajo**. Los mensajes se dibujan como flechas horizontales entre líneas de vida.

---

## Barra de activación (*Activation box*)

Un rectángulo estrecho superpuesto sobre la línea de vida que indica que el participante está **procesando activamente** una operación. En Mermaid se activa con `+` al recibir el mensaje y se desactiva con `-` al devolver la respuesta.

- La barra se abre cuando el participante recibe una llamada.
- La barra se cierra cuando emite el retorno.
- Las barras pueden **anidarse** cuando hay llamadas encadenadas antes de responder.

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Aplicación
    participant Servicio as Servicio de Precios

    Usuario->>+App: calcularTotal(carrito)
    App->>+Servicio: getPrecioUnitario(productoId)
    Servicio-->>-App: precio
    App-->>-Usuario: totalCalculado
```

En este ejemplo la barra de activación de `App` permanece abierta durante toda la operación porque está esperando la respuesta del `Servicio` antes de responder al `Usuario`.

---

## Creación y destrucción de objetos

Un participante puede **crearse** o **destruirse** durante el flujo del diagrama. En Mermaid, `create` instancia un nuevo participante y `destroy` lo elimina.

```mermaid
sequenceDiagram
    participant Factory as OrderFactory
    participant Order as Pedido

    Factory->>Order: new Pedido(datos)
    Note right of Order: El objeto se crea aquí
    Order-->>Factory: pedidoCreado

    Factory->>Order: cancelar()
    destroy Order
    Order-->>Factory: pedidoCancelado
    Note right of Order: El objeto se destruye aquí
```

---

## Numeración de mensajes

Los mensajes pueden numerarse para facilitar su referencia en documentación. En Mermaid se activa con `autonumber`. Para operaciones **asíncronas**, donde los mensajes no siguen un orden temporal estricto, se usa **numeración anidada** manual (`2.1`, `2.2`...) para indicar que esos mensajes son consecuencia del mensaje `2`.

---

## Operación síncrona vs. asíncrona

| | Síncrona | Asíncrona |
|---|---|---|
| El emisor espera respuesta | Sí | No |
| Flecha de solicitud | Línea sólida, punta rellena `->>`  | Línea sólida, punta abierta `-)`  |
| Flecha de retorno | Línea discontinua `-->>`  | Línea discontinua `--)`  |
| Numeración | `autonumber` secuencial | Numeración anidada manual |

### Ejemplo — operación asíncrona

El emisor continúa su flujo sin esperar. La respuesta llega más tarde, normalmente a través de un evento o notificación.

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Aplicación
    participant Procesador as Servicio Procesador
    participant Notif as Servicio de Notificaciones

    Usuario->>+App: 1. solicitarTarea(datos)
    App-)Procesador: 2. procesarTarea(datos)
    Note right of Procesador: Procesamiento en segundo plano
    App-->>-Usuario: 3. tareaEnCola(tareaId)

    Procesador-)Notif: 2.1. notificarResultado(tareaId, resultado)
    Notif-)Usuario: 2.2. notificacion("Tu tarea ha finalizado")
```

---

## Archivos relacionados

- [e-mensajes-y-fragmentos.md](e-mensajes-y-fragmentos.md)
