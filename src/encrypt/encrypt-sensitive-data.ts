import { createDecryptSensitiveData } from "./create-decrypt-sensitive-data-functions";
import { createEncryptSensitiveData } from "./create-encrypt-sensitive-data-functions";

export const createEncryptSensitiveDataFunctions = <SensitiveData>() => ({
  encrypt: createEncryptSensitiveData<SensitiveData>(),
  decrypt: createDecryptSensitiveData<SensitiveData>(),
});
