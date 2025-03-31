"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecureFunctions = void 0;
const authenticated_encryption_1 = require("../authenticated-encryption");
const create_recovery_secure_info_function_1 = require("./create-recovery-secure-info-function");
const create_securize_info_funtion_1 = require("./create-securize-info-funtion");
// Definir la función createSecureFunctions con los tipos genéricos EntityType, SensitivePropertyKey y SignatureKey
const createSecureFunctions = (sensitivePropertyName, sensitiveKeys, signatureKey = "signature") => {
    const { encryptAndSign, decryptAndVerify } = (0, authenticated_encryption_1.createEncryptAndSignFunctions)(sensitiveKeys, signatureKey);
    const securizeInfo = (0, create_securize_info_funtion_1.createSecurizeInfoFn)(sensitivePropertyName, encryptAndSign);
    const recoverySecureInfo = (0, create_recovery_secure_info_function_1.createRecoverySecureInfoFn)(sensitivePropertyName, signatureKey, decryptAndVerify);
    return { securizeInfo, recoverySecureInfo };
};
exports.createSecureFunctions = createSecureFunctions;
//# sourceMappingURL=create-secure-functions.js.map