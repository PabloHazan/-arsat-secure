"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEncryptSensitiveDataFunctions = void 0;
const create_decrypt_sensitive_data_functions_1 = require("./create-decrypt-sensitive-data-functions");
const create_encrypt_sensitive_data_functions_1 = require("./create-encrypt-sensitive-data-functions");
const createEncryptSensitiveDataFunctions = () => ({
    encrypt: (0, create_encrypt_sensitive_data_functions_1.createEncryptSensitiveData)(),
    decrypt: (0, create_decrypt_sensitive_data_functions_1.createDecryptSensitiveData)(),
});
exports.createEncryptSensitiveDataFunctions = createEncryptSensitiveDataFunctions;
//# sourceMappingURL=encrypt-sensitive-data.js.map