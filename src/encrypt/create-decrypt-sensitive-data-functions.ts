import crypto, { Decipher } from "crypto";
import { encryptSensitiveDataConfig } from "./config";
import { EncryptSensitiveDataConfig } from "./types";

const createDecryptCipher = (config: EncryptSensitiveDataConfig): Decipher =>
  crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(config.key, "hex"),
    Buffer.from(config.iv, "hex")
  );

const decryptData = <SensitiveData>(
  encryptedData: string,
  decipher: Decipher
): SensitiveData => {
  return JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(encryptedData, "hex")),
      decipher.final(),
    ]).toString()
  );
};

export const createDecryptSensitiveData =
  <SensitiveData>() =>
  (encryptedData: string): SensitiveData => {
    const decipher = createDecryptCipher(encryptSensitiveDataConfig);
    const decryptedData = decryptData<SensitiveData>(encryptedData, decipher);
    return decryptedData;
  };
