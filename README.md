# Secure Signature Library

Una librería para agregar y verificar firmas seguras en objetos.

## Instalación

Esta librería no requiere instalación adicional ya que utiliza el módulo `crypto` de Node.js.

## Uso

### Configuración

Primero, configura la librería con una clave secreta:

```typescript
import { configure } from "./src/config";
import { ISecureConfig } from "./src/types";

const config: ISecureConfig = {
  secret: "mySecret",
};
configure(config);
```

## Crear funciones de firma

Luego, crea las funciones de firma para tus objetos

```typescript
import { createSignatureFunctions } from "./src";

interface IPerson {
  id: number;
  name: string;
}

const { addSecureSignature, verifySecureSignature } =
  createSignatureFunctions<IPerson>(["id", "name"]);
```

## Agregar una firma segura

Para agregar una firma segura a un objeto:

```typescript
const person: IPerson = {
  id: 1,
  name: "John",
};

const signedPerson = addSecureSignature(person);
console.log(signedPerson);
```

## Verificar una firma segura

Firma y verificación con clave secreta adicional

```typescript
try {
  verifySecureSignature(signedPerson);
  console.log("Firma verificada correctamente");
} catch (error) {
  console.error("Error al verificar la firma:", error);
}
```

## Ejemplos

Firma y verificación con clave secreta adicional

```typescript
const person: IPerson = {
  id: 1,
  name: "John",
};

const signedPerson1 = addSecureSignature(person, "extraSecret1");
const signedPerson2 = addSecureSignature(person, "extraSecret2");

console.log(signedPerson1.signature !== signedPerson2.signature); // true

try {
  verifySecureSignature(signedPerson1, "extraSecret1");
  console.log("Firma 1 verificada correctamente");
} catch (error) {
  console.error("Error al verificar la firma 1:", error);
}

try {
  verifySecureSignature(signedPerson2, "extraSecret2");
  console.log("Firma 2 verificada correctamente");
} catch (error) {
  console.error("Error al verificar la firma 2:", error);
}

try {
  verifySecureSignature(signedPerson1, "extraSecret2");
} catch (error) {
  console.error("Error al verificar la firma 1 con extraSecret2:", error);
}

try {
  verifySecureSignature(signedPerson2, "extraSecret1");
} catch (error) {
  console.error("Error al verificar la firma 2 con extraSecret1:", error);
}
```

## Firma personalizada

```typescript
const {
  addSecureSignature: addCustomSignature,
  verifySecureSignature: verifyCustomSignature,
} = createSignatureFunctions<IPerson, "customSignature">(
  ["id", "name"],
  "customSignature"
);

const customSignedPerson = addCustomSignature(person);
console.log(customSignedPerson);

try {
  verifyCustomSignature(customSignedPerson);
  console.log("Firma personalizada verificada correctamente");
} catch (error) {
  console.error("Error al verificar la firma personalizada:", error);
}
```
