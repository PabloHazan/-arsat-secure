import { copyObject } from "../utils.ts/copy-object";
import { EncryptSensitiveDataConfig } from "./types";

export const encryptSensitiveDataConfig: EncryptSensitiveDataConfig = {
  key: "",
  iv: "",
};

export const configEncrypt = (config: EncryptSensitiveDataConfig) =>
  copyObject(config, encryptSensitiveDataConfig);
