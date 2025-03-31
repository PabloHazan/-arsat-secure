"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEncryptAndSignFunctions = void 0;
const encrypt_1 = require("../encrypt");
const signature_1 = require("../signature");
const create_decrypt_and_verify_function_1 = require("./create-decrypt-and-verify-function");
const create_encrypt_and_sign_function_1 = require("./create-encrypt-and-sign-function");
const createEncryptAndSignFunctions = (sensitiveKeys, signatureKey = "signature") => {
    const { addSecureSignature, verifySecureSignature } = (0, signature_1.createSignatureFunctions)(sensitiveKeys, signatureKey);
    // Crear las funciones encrypt y decrypt con los tipos genéricos adecuados
    const { encrypt, decrypt } = (0, encrypt_1.createEncryptSensitiveDataFunctions)();
    const encryptAndSign = (0, create_encrypt_and_sign_function_1.createEncryptAndSignFunction)(addSecureSignature, encrypt);
    const decryptAndVerify = (0, create_decrypt_and_verify_function_1.createDecryptAndVerifyFunction)(signatureKey, verifySecureSignature, decrypt);
    return {
        encryptAndSign,
        decryptAndVerify,
    };
};
exports.createEncryptAndSignFunctions = createEncryptAndSignFunctions;
//# sourceMappingURL=create-authenticated-encryption-functions.js.map