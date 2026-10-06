# Cobertura de Código

La **cobertura de código** (*code coverage*) mide el porcentaje del código fuente que es ejecutado durante las pruebas. Es una herramienta para detectar código no probado, no una garantía de calidad por sí sola.

```
Líneas ejecutadas por las pruebas
─────────────────────────────────── × 100 = % cobertura
      Total de líneas del código
```

---

## ¿Para qué sirve la cobertura?

- **Detectar zonas muertas**: ramas o métodos que ninguna prueba alcanza.
- **Guiar la escritura de nuevas pruebas**: sabes exactamente qué queda sin cubrir.
- **Requisito de calidad**: muchos proyectos exigen un mínimo del 80 % en CI.

:::warning
Una cobertura del 100 % no significa que el software no tenga errores. Una prueba puede ejecutar una línea sin verificar su resultado. La cobertura mide *ejecución*, no *corrección*.
:::

---

## Tipos de cobertura

| Tipo | ¿Qué mide? | Dificultad |
|------|-----------|-----------|
| **Cobertura de líneas** | % de líneas ejecutadas | Básica |
| **Cobertura de ramas** | % de ramas (if/else) tomadas | Media |
| **Cobertura de métodos** | % de métodos llamados | Básica |
| **Cobertura de condiciones** | % de condiciones booleanas evaluadas | Alta |

La **cobertura de ramas** es la más útil en la práctica: garantiza que tanto el camino verdadero como el falso de cada `if` han sido probados.

---

## Ejemplo: detectar ramas no cubiertas

```java
public class Discount {
    public double apply(double price, String customerType) {
        if (customerType.equals("PREMIUM")) {
            return price * 0.8; // 20 % de descuento
        } else if (customerType.equals("VIP")) {
            return price * 0.7; // 30 % de descuento
        }
        return price; // sin descuento
    }
}
```

Si solo escribimos esta prueba:

```java
@Test
void apply_premiumCustomer_returns20PercentDiscount() {
    Discount d = new Discount();
    assertEquals(80.0, d.apply(100.0, "PREMIUM"), 0.001);
}
```

La cobertura de ramas será del 33 %: la rama `VIP` y la rama sin descuento no se han ejecutado. Necesitamos pruebas adicionales:

```java
@Test
void apply_vipCustomer_returns30PercentDiscount() {
    Discount d = new Discount();
    assertEquals(70.0, d.apply(100.0, "VIP"), 0.001);
}

@Test
void apply_regularCustomer_returnsSamePrice() {
    Discount d = new Discount();
    assertEquals(100.0, d.apply(100.0, "REGULAR"), 0.001);
}
```

---

## JaCoCo: herramienta de cobertura en Java

**JaCoCo** (*Java Code Coverage*) es la herramienta estándar de cobertura en proyectos Java con Maven o Gradle. Genera informes HTML detallados que muestran qué líneas y ramas han sido cubiertas.

### Configuración en Maven

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.12</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Generar el informe

```bash
mvn test
# El informe se genera en target/site/jacoco/index.html
```

---

## Leer el informe de JaCoCo

El informe de JaCoCo colorea el código fuente:

| Color | Significado |
|-------|------------|
| 🟩 Verde | Línea completamente cubierta |
| 🟨 Amarillo | Rama parcialmente cubierta (ej: solo el `if`, no el `else`) |
| 🟥 Rojo | Línea no cubierta por ninguna prueba |

---

## Umbral mínimo de cobertura

JaCoCo puede configurarse para **fallar la build** si la cobertura no alcanza un umbral mínimo. Esto se usa habitualmente en pipelines de CI:

```xml
<execution>
    <id>check</id>
    <goals>
        <goal>check</goal>
    </goals>
    <configuration>
        <rules>
            <rule>
                <limits>
                    <limit>
                        <counter>LINE</counter>
                        <value>COVEREDRATIO</value>
                        <minimum>0.80</minimum>  <!-- mínimo 80 % -->
                    </limit>
                </limits>
            </rule>
        </rules>
    </configuration>
</execution>
```

---

## Cobertura y calidad: la trampa del 100 %

Perseguir el 100 % de cobertura puede llevar a escribir pruebas sin valor real:

```java
// Prueba que "cubre" el getter pero no verifica nada útil
@Test
void getName_isNotNull() {
    Person p = new Person("Ana", 25);
    assertNotNull(p.getName()); // pasa aunque devuelva "xyzxyz"
}

// Prueba correcta: verifica el valor concreto
@Test
void getName_returnsTheNamePassedToConstructor() {
    Person p = new Person("Ana", 25);
    assertEquals("Ana", p.getName());
}
```

:::tip
El objetivo es **cobertura significativa**, no cobertura máxima. Una cobertura del 80 % con pruebas que verifican comportamiento real es mejor que un 100 % con pruebas vacías.
:::

---

## Archivos relacionados

- [c-pruebas-unitarias.md](c-pruebas-unitarias.md) — Pruebas unitarias
- [g-cicd.md](g-cicd.md) — CI/CD: la cobertura como gate en el pipeline
