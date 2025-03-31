"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEncryptAndSignFunction = void 0;
const createEncryptAndSignFunction = (addSecureSignature, encrypt) => (entity, extraSecret = "") => {
    // Create the variable signedSensitiveData by signing sensitiveData
    const signedSensitiveData = addSecureSignature(entity, extraSecret);
    // Create the variable encryptedData by encrypting signedSensitiveData
    const encryptedData = encrypt(signedSensitiveData);
    // Retornar AE
    return encryptedData;
};
exports.createEncryptAndSignFunction = createEncryptAndSignFunction;
//# sourceMappingURL=create-encrypt-and-sign-function.js.map