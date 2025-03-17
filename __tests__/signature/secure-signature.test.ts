import { createSignatureFunctions, configSign, ISecureConfig } from "../../src";

interface IPersonTest {
  id: number;
  name: string;
}

describe("signature functions", () => {
  beforeAll(() => {
    const config: ISecureConfig = {
      secret: "mySecret",
    };
    configSign(config);
  });

  describe("default signature key name", () => {
    test("add a secure signature", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature } = createSignatureFunctions<IPersonTest>([
        "id",
        "name",
      ]);
      const signedPerson = addSecureSignature(person);
      expect(signedPerson).toHaveProperty("signature");
      expect(typeof signedPerson.signature).toBe("string");
      expect(signedPerson.signature.length).toBeGreaterThan(0);
    });

    test("verify a secure signature", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature, verifySecureSignature } =
        createSignatureFunctions<IPersonTest>(["id", "name"]);
      const signedPerson = addSecureSignature(person);
      expect(() => verifySecureSignature(signedPerson)).not.toThrow();
    });

    test("verify a secure signature in a wrong object throws error", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature, verifySecureSignature } =
        createSignatureFunctions<IPersonTest>(["id", "name"]);
      const signedPerson = addSecureSignature(person);
      signedPerson.id = 2;
      expect(() => verifySecureSignature(signedPerson)).toThrow();
    });

    test("alter a not signed key in object doesn't throw an error", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature, verifySecureSignature } =
        createSignatureFunctions<IPersonTest>(["name"]);
      const signedPerson = addSecureSignature(person);
      signedPerson.id = 2;
      expect(() => verifySecureSignature(signedPerson)).not.toThrow();
    });
  });

  describe("custom signature key name", () => {
    test("add a secure signature", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature } = createSignatureFunctions<
        IPersonTest,
        "customSignature"
      >(["id", "name"], "customSignature");
      const signedPerson = addSecureSignature(person);
      expect(signedPerson).toHaveProperty("customSignature");
      expect(typeof signedPerson.customSignature).toBe("string");
      expect(signedPerson.customSignature.length).toBeGreaterThan(0);
    });

    test("verify a secure signature", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature, verifySecureSignature } =
        createSignatureFunctions<IPersonTest, "customSignature">(
          ["id", "name"],
          "customSignature"
        );
      const signedPerson = addSecureSignature(person);
      expect(() => verifySecureSignature(signedPerson)).not.toThrow();
    });

    test("verify a secure signature in a wrong object throws error", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature, verifySecureSignature } =
        createSignatureFunctions<IPersonTest, "customSignature">(
          ["id", "name"],
          "customSignature"
        );
      const signedPerson = addSecureSignature(person);
      signedPerson.id = 2;
      expect(() => verifySecureSignature(signedPerson)).toThrow();
    });

    test("alter a not signed key in object doesn't throw an error", () => {
      const person: IPersonTest = {
        id: 1,
        name: "John",
      };
      const { addSecureSignature, verifySecureSignature } =
        createSignatureFunctions<IPersonTest, "customSignature">(
          ["name"],
          "customSignature"
        );
      const signedPerson = addSecureSignature(person);
      signedPerson.id = 2;
      expect(() => verifySecureSignature(signedPerson)).not.toThrow();
    });
  });

  test("empty keys array throws error", () => {
    expect(() => {
      createSignatureFunctions<IPersonTest>([]);
    }).toThrow();
  });

  // escribi un test en el que se creen dos personas con distinto nombre y id
  // firmar ambas personas
  // cambiar la firma de una por otro
  // al verificar la firma del segundo debe lanzar error
  test("signature verification fails when signature is altered", () => {
    const person1: IPersonTest = {
      id: 1,
      name: "John",
    };
    const person2: IPersonTest = {
      id: 2,
      name: "Jane",
    };
    const { addSecureSignature, verifySecureSignature } =
      createSignatureFunctions<IPersonTest>(["id", "name"]);
    const signedPerson1 = addSecureSignature(person1);
    const signedPerson2 = addSecureSignature(person2);
    signedPerson2.signature = signedPerson1.signature;
    expect(() => verifySecureSignature(signedPerson2)).toThrow();
  });

  // escribi un test en el que se cree una persona
  // obtener dos objetos firmados de la misma persona
  // cada uno se firma con un extraSecret distinto
  // verificar que las firmas son distintas
  // verificar que ambas firmas son correctas
  // verificar que si se utiliza un extraSecret distinto para verificar la firma, falle
  test("signature verification fails when extraSecret is different", () => {
    const person: IPersonTest = {
      id: 1,
      name: "John",
    };
    const { addSecureSignature, verifySecureSignature } =
      createSignatureFunctions<IPersonTest>(["id", "name"]);
    const signedPerson1 = addSecureSignature(person, "extraSecret1");
    const signedPerson2 = addSecureSignature(person, "extraSecret2");
    expect(signedPerson1.signature).not.toBe(signedPerson2.signature);
    expect(() =>
      verifySecureSignature(signedPerson1, "extraSecret1")
    ).not.toThrow();
    expect(() =>
      verifySecureSignature(signedPerson2, "extraSecret2")
    ).not.toThrow();
    expect(() =>
      verifySecureSignature(signedPerson1, "extraSecret2")
    ).toThrow();
    expect(() =>
      verifySecureSignature(signedPerson2, "extraSecret1")
    ).toThrow();
  });
});
