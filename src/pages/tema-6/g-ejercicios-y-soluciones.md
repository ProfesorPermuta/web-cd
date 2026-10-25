# Ejercicios y Soluciones — Tema 6: Diagramas de Comportamiento

---

En esta sección encontrarás los ejercicios propuestos para el Tema 6, junto con sus soluciones en repositorios de Bitbucket.

## Ejercicios

### Ejercicio 1 — Sistema de Reservas de Hotel

Diseña el **diagrama de casos de uso** de un sistema de reservas de hotel con los siguientes requisitos:

- Un **cliente** puede buscar habitaciones disponibles, hacer una reserva, cancelar una reserva y consultar sus reservas activas.
- Un **recepcionista** puede hacer todo lo que hace un cliente (herencia de actor), además de registrar el check-in y el check-out.
- Para hacer una reserva o cancelarla, el sistema siempre verifica la identidad del cliente (comportamiento compartido a extraer con `<<include>>`).
- Al hacer el check-out, el sistema puede generar una factura solo si el cliente lo solicita (comportamiento opcional con `<<extend>>`).

Entregables:
1. Diagrama de casos de uso en Mermaid.
2. Listado de los actores y justificación de la relación de herencia.
3. Justificación de cada `<<include>>` y `<<extend>>` utilizado.

---

### Ejercicio 2 — Autenticación de Usuario

Diseña el **diagrama de secuencia** del caso de uso "Iniciar sesión" de una aplicación web con las siguientes condiciones:

- Los participantes son: `Usuario` (actor), `AppWeb` (aplicación frontend), `AuthService` (servicio de autenticación) y `BD` (base de datos de usuarios).
- Flujo principal (credenciales correctas):
  1. El usuario envía usuario y contraseña a `AppWeb`.
  2. `AppWeb` delega la verificación a `AuthService`.
  3. `AuthService` consulta `BD` para obtener el hash de la contraseña.
  4. `AuthService` valida las credenciales y devuelve un token a `AppWeb`.
  5. `AppWeb` devuelve el token al usuario.
- Flujo alternativo (credenciales incorrectas): `AuthService` devuelve error y `AppWeb` informa al usuario.
- Usa barras de activación y `autonumber`.
- Modela los flujos con el fragmento `alt`.

---

### Ejercicio 3 — Procesamiento Asíncrono de Pedido

Diseña el **diagrama de secuencia** del proceso de confirmación de un pedido en una tienda online que usa procesamiento asíncrono:

- Los participantes son: `Cliente` (actor), `Tienda` (aplicación), `StockService` (servicio de stock), `PagoService` (servicio de pago) y `NotifService` (servicio de notificaciones).
- Flujo:
  1. El cliente confirma el pedido en `Tienda` (síncrono).
  2. `Tienda` envía la solicitud de reserva de stock a `StockService` (asíncrono).
  3. `Tienda` responde al cliente indicando que el pedido está en proceso.
  4. Cuando `StockService` confirma el stock, envía el cobro a `PagoService` (asíncrono).
  5. `PagoService` notifica el resultado a `NotifService` (asíncrono).
  6. `NotifService` notifica al cliente (asíncrono).
- Usa numeración anidada para los mensajes asíncronos.

---

### Ejercicio 4 — Plataforma de Streaming

Diseña el **diagrama de casos de uso** de una plataforma de streaming de vídeo:

- Un **usuario gratuito** puede buscar contenido, ver tráileres y gestionar su perfil.
- Un **usuario premium** puede hacer todo lo que hace un usuario gratuito, además de reproducir contenido completo y descargar contenido para verlo sin conexión.
- Un **administrador** puede gestionar el catálogo, gestionar usuarios y ver estadísticas de uso.
- Para reproducir o descargar contenido, el sistema verifica el tipo de suscripción (comportamiento compartido).
- Al reproducir contenido, el sistema puede mostrar recomendaciones relacionadas solo si el usuario tiene el historial activado.

Entregables:
1. Diagrama de casos de uso en Mermaid.
2. Identifica todas las relaciones `<<include>>`, `<<extend>>` y generalizaciones de actor.

---

## Soluciones

:::info
**Repositorios en Bitbucket**

Los repositorios con las soluciones estarán disponibles próximamente.
:::

| Ejercicio | Repositorio |
|---|---|
| Ejercicio 1: Sistema de Reservas de Hotel | [Ver solución](https://bitbucket.org/profesorpermuta/tema-6-ejer-1-reservas-hotel) |
| Ejercicio 2: Autenticación de Usuario | [Ver solución](https://bitbucket.org/profesorpermuta/tema-6-ejer-2-autenticacion-usuario) |
| Ejercicio 3: Procesamiento Asíncrono de Pedido | [Ver solución](https://bitbucket.org/profesorpermuta/tema-6-ejer-3-pedido-asincrono) |
| Ejercicio 4: Plataforma de Streaming | [Ver solución](https://bitbucket.org/profesorpermuta/tema-6-ejer-4-plataforma-streaming) |
