# Tipos de Mensaje y Fragmentos Combinados

Los **mensajes** son el corazón del diagrama de secuencia. Los **fragmentos combinados** permiten expresar lógica de control (condiciones, bucles, paralelismo) dentro del propio diagrama sin necesidad de texto adicional.

---

## Tipos de mensaje

| Tipo | Notación Mermaid | Cuándo usarlo |
|---|---|---|
| **Síncrono — solicitud** | `->>` | El emisor se bloquea y espera respuesta |
| **Síncrono — retorno** | `-->>` | Devuelve el resultado al emisor original |
| **Asíncrono — solicitud** | `-)` | El emisor no se bloquea y continúa su ejecución |
| **Asíncrono — retorno** | `--)` | Respuesta diferida de un mensaje asíncrono |
| **Crear participante** | `create` + `->>` | Instancia un nuevo participante en mitad del diagrama |
| **Destruir participante** | `destroy` + `->>` | El participante deja de existir |

### Resumen visual

```
Emisor  ->>  Receptor    Síncrono — solicitud (el emisor espera)
Emisor -->>  Receptor    Síncrono — retorno
Emisor  -)   Receptor    Asíncrono — solicitud (el emisor no espera)
Emisor --)   Receptor    Asíncrono — retorno diferido
```

---

## Fragmentos combinados (*Combined Fragments*)

Los **fragmentos combinados** son rectángulos que engloban un grupo de mensajes y llevan una **etiqueta de operador** en la esquina superior izquierda. Expresan lógica de control sin salir del diagrama.

---

### `alt` — Alternativa (if / else)

Para flujos **mutuamente excluyentes**. Cada alternativa se separa con `else` y su condición va entre corchetes.

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant App as Aplicación
    participant Pago as Pasarela de Pago

    Usuario->>+App: realizarPago(importe)
    App->>+Pago: procesarCargo(importe)

    alt pago aceptado
        Pago-->>-App: confirmacion(transaccionId)
        App-->>-Usuario: pedidoConfirmado(transaccionId)
    else pago denegado
        Pago-->>App: errorPago(motivo)
        App-->>Usuario: pagoRechazado(motivo)
    end
```

---

### `opt` — Opcional (if sin else)

Para un flujo que **puede ocurrir o no** según una condición. Si la condición no se cumple, el fragmento se omite.

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Aplicación
    participant Notif as Servicio de Notificaciones

    Usuario->>+App: completarPedido(pedidoId)
    App-->>-Usuario: pedidoCompletado

    opt alertas de email activadas
        App->>Notif: enviarConfirmacion(email, pedidoId)
    end
```

---

### `loop` — Bucle

Para **repetir** un conjunto de mensajes mientras se cumpla una condición. La condición se indica entre corchetes en la etiqueta.

```mermaid
sequenceDiagram
    participant App as Aplicación
    participant API as API externa

    loop hasta 3 reintentos o éxito
        App->>+API: solicitarDatos()
        alt respuesta OK
            API-->>-App: datos
        else error de red
            API-->>App: error503
        end
    end
```

---

### `par` — Paralelo

Para mensajes que ocurren de forma **simultánea o concurrente**. Cada rama paralela se separa con `and`.

```mermaid
sequenceDiagram
    participant App as Aplicación
    participant Email as Servicio Email
    participant SMS as Servicio SMS

    App->>App: pedidoConfirmado

    par envío paralelo
        App-)Email: enviarConfirmacionEmail(destinatario)
    and
        App-)SMS: enviarSMS(telefono, mensaje)
    end
```

---

### `critical` — Sección crítica

Para operaciones que deben ejecutarse de forma **atómica**, sin posibilidad de interrupción concurrente. Garantiza que ningún otro proceso interfiere mientras se ejecuta el bloque.

```mermaid
sequenceDiagram
    participant Servicio as Servicio Bancario
    participant BD as Base de Datos

    Servicio->>+BD: iniciarTransaccion()

    critical actualización atómica
        Servicio->>BD: restarSaldo(cuentaOrigen, importe)
        Servicio->>BD: sumarSaldo(cuentaDestino, importe)
    end

    Servicio->>BD: confirmarTransaccion()
    BD-->>-Servicio: ok
```

---

### `break` — Interrupción

Para modelar una **salida anticipada o excepcional** del flujo principal. Si la condición se cumple, se abandona el flujo y se ejecuta el bloque `break`.

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant App as Aplicación
    participant Auth as Servicio de Autenticación

    Usuario->>+App: accederRecurso(token)
    App->>+Auth: validarToken(token)

    break token expirado
        Auth-->>App: tokenInvalido
        App-->>Usuario: redirigirALogin()
    end

    Auth-->>-App: tokenValido(usuarioId)
    App-->>-Usuario: recursoPermitido(datos)
```

---

### `ref` — Referencia

Para **referenciar otro diagrama de secuencia** sin repetir su contenido. Es útil cuando un diagrama se vuelve demasiado largo o cuando una interacción se reutiliza en varios diagramas.

:::info
Mermaid no soporta el fragmento `ref` de forma nativa. En la documentación se indica el nombre del diagrama referenciado como texto dentro de una nota.
:::

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Aplicación

    Usuario->>+App: realizarPedido(carrito)
    Note over App: [ref] Verificar stock
    Note over App: [ref] Procesar pago
    App-->>-Usuario: pedidoConfirmado
```

---

## Notas en el diagrama

Las **notas** son comentarios que clarifican algo que los mensajes solos no expresan suficientemente. En Mermaid se añaden con `Note right of`, `Note left of` o `Note over`.

```mermaid
sequenceDiagram
    participant App as Aplicación
    participant Cache as Caché Redis

    App->>+Cache: get(clave)
    Note right of Cache: TTL: 300 segundos
    Cache-->>-App: valor
```

---

## Buenas prácticas

- Ordenar los participantes de **izquierda a derecha** siguiendo el flujo principal para reducir el cruce de flechas.
- Usar **barras de activación** (`+` / `-`) cuando la duración del procesamiento es relevante.
- Limitar la profundidad de **fragmentos anidados** a 2 niveles para mantener la legibilidad.
- Añadir **notas** solo cuando el mensaje por sí solo no es suficientemente descriptivo.
- Separar diagramas muy largos usando el fragmento de **referencia** (`ref`) para dividirlos en partes manejables.
- Usar **mensajes asíncronos** (`-)`) cuando el emisor no depende de la respuesta para continuar su lógica.
