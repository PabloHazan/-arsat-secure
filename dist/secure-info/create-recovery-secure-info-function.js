"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecoverySecureInfoFn = void 0;
// Función para desencriptar la información sensible y verificar la firma
const createRecoverySecureInfoFn = (sensitivePropertyName, signatureKey, decryptAndVerify) => (secureEntity, extraSecret = "") => {
    const encryptedSensitiveData = secureEntity[sensitivePropertyName];
    // crear la variable entityWithoutSensitiveData
    // debe ser del tipo Omit<EntityType, SensitivePropertyKey>
    // se debe obtener de secureEntity, pero sin la clave sensitivePropertyName
    // @ts-ignore
    const entityWithoutSensitiveData = secureEntity;
    // Desencriptar la información sensible
    const sensitiveData = decryptAndVerify(encryptedSensitiveData, extraSecret);
    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return Object.assign(Object.assign({}, entityWithoutSensitiveData), { [sensitivePropertyName]: sensitiveData });
};
exports.createRecoverySecureInfoFn = createRecoverySecureInfoFn;
//# sourceMappingURL=create-recovery-secure-info-function.js.map