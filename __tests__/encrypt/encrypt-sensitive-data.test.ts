import {
  EncryptSensitiveDataConfig,
  configEncrypt,
  createEncryptSensitiveDataFunctions,
} from "../../src";

import crypto from "crypto";

interface User {
  user: string;
  pass: string;
}

describe("encrypt sensitive data functions", () => {
  beforeAll(() => {
    const config: EncryptSensitiveDataConfig = {
      iv: crypto.randomBytes(16).toString("hex"),
      key: crypto.randomBytes(32).toString("hex"),
    };
    configEncrypt(config);
  });

  test("decrypt an encrypted user", () => {
    const { encrypt, decrypt } = createEncryptSensitiveDataFunctions<User>();

    const user: User = {
      user: "user",
      pass: "pass",
    };
    const encryptedUser = encrypt(user);
    expect(encryptedUser).not.toBe(user);
    expect(typeof encryptedUser).toBe("string");
    const decryptedUser = decrypt(encryptedUser);
    expect(decryptedUser).toEqual(user);
  });

  test("encrypt two different users", () => {
    const { encrypt } = createEncryptSensitiveDataFunctions<User>();

    const user: User = {
      user: "user",
      pass: "pass",
    };
    const user2: User = {
      user: "user2",
      pass: "pass2",
    };
    const encryptedUser = encrypt(user);
    const encryptedUser2 = encrypt(user2);
    expect(encryptedUser).not.toBe(encryptedUser2);
  });
});
