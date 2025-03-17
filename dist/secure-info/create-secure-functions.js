"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecureFunctions = void 0;
const encrypt_1 = require("../encrypt");
const signature_1 = require("../signature");
const create_recovery_secure_info_function_1 = require("./create-recovery-secure-info-function");
const create_securize_info_funtion_1 = require("./create-securize-info-funtion");
// Definir la función createSecureFunctions con los tipos genéricos EntityType, SensitivePropertyKey y SignatureKey
const createSecureFunctions = (sensitivePropertyName, sensitiveKeys, signatureKey = "signature") => {
    const { addSecureSignature, verifySecureSignature } = (0, signature_1.createSignatureFunctions)(sensitiveKeys, signatureKey);
    // Crear las funciones encrypt y decrypt con los tipos genéricos adecuados
    const { encrypt, decrypt } = (0, encrypt_1.createEncryptSensitiveDataFunctions)();
    const securizeInfo = (0, create_securize_info_funtion_1.createSecurizeInfoFn)(sensitivePropertyName, addSecureSignature, encrypt);
    const recoverySecureInfo = (0, create_recovery_secure_info_function_1.createRecoverySecureInfoFn)(sensitivePropertyName, signatureKey, verifySecureSignature, decrypt);
    return { securizeInfo, recoverySecureInfo };
};
exports.createSecureFunctions = createSecureFunctions;
//# sourceMappingURL=create-secure-functions.js.map