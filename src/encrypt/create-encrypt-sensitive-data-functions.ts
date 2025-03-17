import crypto, { Cipher } from "crypto";
import { EncryptSensitiveDataConfig } from "./types";
import { encryptSensitiveDataConfig } from "./config";

const encryptData = <SensitiveData>(
  sensitiveData: SensitiveData,
  cipher: Cipher
): string => {
  return Buffer.concat([
    cipher.update(JSON.stringify(sensitiveData)),
    cipher.final(),
  ]).toString("hex");
};

const createEncryptCipher = (config: EncryptSensitiveDataConfig): Cipher =>
  crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(config.key, "hex"),
    Buffer.from(config.iv, "hex")
  );

export const createEncryptSensitiveData =
  <SensitiveData>() =>
  (data: SensitiveData): string => {
    const cipher = createEncryptCipher(encryptSensitiveDataConfig);
    const encryptedData = encryptData(data, cipher);
    return encryptedData;
  };
