# Reglas del proyecto

## Callouts de Docusaurus
La apertura `:::tipo` (tip, info, warning, note...) va SIEMPRE sola en su línea. Nunca pongas el título en la misma línea (`:::tip Título` rompe el renderizado). Si hace falta título, ponlo en la línea siguiente en negrita y deja una línea en blanco:

```
:::tip
**Título**

Texto del aviso.
:::
```

## Diagramas UML en Mermaid
Atributos: `[-|+|#]<nombre_atributo>: <tipo_atributo>` (ej. `-balance: double`).
Métodos: `[-|+|#]<nombre_funcion>(<nombre_parametro>: <tipo_parametro>): <tipo_retorno>` (ej. `+deposit(amount: double): void`).
Nunca uses el estilo `-double balance` ni `+getName() String`. Los genéricos van con tildes: `-items: List~Item~`.
