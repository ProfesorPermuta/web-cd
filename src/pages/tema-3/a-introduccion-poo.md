# Introducción a la Programación Orientada a Objetos

La **Programación Orientada a Objetos** (POO) es un paradigma de programación que organiza el software en torno a **objetos**: entidades que combinan datos (lo que saben) y comportamiento (lo que pueden hacer).

```java
// Un objeto en acción: un coche que sabe su velocidad y puede acelerar
Car myCar = new Car("Toyota", 0);
myCar.accelerate(30);
System.out.println(myCar.getSpeed()); // 30
```

---

## ¿Qué es un paradigma de programación?

Un **paradigma** es una forma de pensar y estructurar el código. Antes de la POO, el paradigma dominante era la **programación procedural**: el programa era una lista de instrucciones que se ejecutaban de arriba a abajo, organizadas en funciones.

| Paradigma | Idea central | Ejemplo |
|-----------|-------------|---------|
| **Procedural** | El programa = secuencia de instrucciones y funciones | C, Pascal |
| **Orientado a Objetos** | El programa = conjunto de objetos que colaboran | Java, C++, Python |
| **Funcional** | El programa = evaluación de funciones matemáticas puras | Haskell, Clojure |

Java es principalmente un lenguaje **orientado a objetos**.

---

## La analogía del mundo real

Piensa en el mundo que te rodea. Todo son objetos: un banco, un cliente, un producto, un pedido. Cada objeto:

- **Tiene estado**: el banco tiene un saldo, el cliente tiene un nombre.
- **Tiene comportamiento**: el banco puede ingresar dinero, el cliente puede realizar compras.
- **Es de un tipo (clase)**: varios clientes son instancias del mismo "molde" Cliente.

La POO traslada exactamente esta forma de pensar al código.

---

## Los cuatro pilares de la POO

### 1. Encapsulación

**Encapsulación** significa ocultar los datos internos de un objeto y exponer solo lo necesario. Es como un **cajero automático**: introduces tu tarjeta y recibes dinero, pero no tienes acceso directo a los mecanismos internos de la máquina.

En Java, se logra declarando atributos `private` y proporcionando métodos `public` para acceder a ellos.

```java
public class BankAccount {
    private double balance; // el saldo es privado: nadie lo toca directamente

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
```

---

### 2. Herencia

**Herencia** permite que una clase (hija) reutilice y especialice el comportamiento de otra (padre). Es como una **herramienta que se especializa**: un destornillador es una herramienta, pero añade la capacidad de atornillar.

```java
public class Vehicle {
    private int speed;

    public void accelerate(int amount) {
        speed += amount;
    }

    public int getSpeed() {
        return speed;
    }
}

public class Car extends Vehicle {
    private int numberOfDoors; // Car añade su propio atributo

    public Car(int doors) {
        this.numberOfDoors = doors;
    }
}
```

---

### 3. Polimorfismo

**Polimorfismo** significa que objetos de distintas clases pueden responder al mismo mensaje de formas diferentes. El mismo método `makeSound()` produce un ladrido en un perro y un maullido en un gato.

```java
public class Animal {
    public String makeSound() {
        return "...";
    }
}

public class Dog extends Animal {
    @Override
    public String makeSound() {
        return "Woof!";
    }
}

public class Cat extends Animal {
    @Override
    public String makeSound() {
        return "Meow!";
    }
}

// El mismo código funciona para cualquier Animal:
Animal a = new Dog();
System.out.println(a.makeSound()); // Woof!
```

---

### 4. Abstracción

**Abstracción** consiste en modelar solo los aspectos relevantes de un concepto para el problema que estamos resolviendo. Un `User` en un sistema de facturación no necesita atributo `hairColor`; solo necesita `name` y `email`.

```java
public class User {
    private String name;
    private String email;
    // Solo lo relevante para el sistema
}
```

---

## Tabla resumen de los pilares

| Pilar | ¿Qué hace? | Analogía |
|-------|-----------|----------|
| **Encapsulación** | Oculta datos internos | Cajero automático |
| **Herencia** | Reutiliza y especializa clases | Herramienta especializada |
| **Polimorfismo** | Mismo mensaje, distinto comportamiento | Botón "reproducir" en distintos reproductores |
| **Abstracción** | Modela solo lo relevante | Plano de un edificio (no muestra cables) |

---

## ¿Por qué aprender POO con Java?

- Java fue diseñado desde cero con la POO en mente: **todo** es un objeto (salvo los tipos primitivos).
- Es el lenguaje más utilizado en entornos empresariales y en el desarrollo de aplicaciones Android.
- Los conceptos aprendidos en Java se transfieren directamente a C#, Python, Kotlin y otros lenguajes modernos.
- UML, el lenguaje de modelado que estudiaremos a continuación, encaja de forma natural con la POO y con Java en particular.

---

## Archivos relacionados

- [b-uml-y-poo.md](b-uml-y-poo.md) — UML y su relación con la POO
- [c-clases-y-objetos-uml.md](c-clases-y-objetos-uml.md) — Clases y objetos en UML
- [d-atributos-y-metodos.md](d-atributos-y-metodos.md) — Atributos y métodos en el diagrama de clases
- [e-relaciones-asociacion.md](e-relaciones-asociacion.md) — Relaciones: asociación, agregación y composición
- [f-herencia-y-realizacion.md](f-herencia-y-realizacion.md) — Herencia y realización en UML
- [g-errores-comunes.md](g-errores-comunes.md) — Errores comunes
- [h-ejercicios-y-soluciones.md](h-ejercicios-y-soluciones.md) — Ejercicios y soluciones
