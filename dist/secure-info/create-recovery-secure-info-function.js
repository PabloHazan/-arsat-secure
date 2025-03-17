"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecoverySecureInfoFn = void 0;
// Función para desencriptar la información sensible y verificar la firma
const createRecoverySecureInfoFn = (sensitivePropertyName, signatureKey, verifySecureSignature, decrypt) => (secureEntity, extraSecret = "") => {
    const encryptedSensitiveData = secureEntity[sensitivePropertyName];
    // crear la variable entityWithoutSensitiveData
    // debe ser del tipo Omit<EntityType, SensitivePropertyKey>
    // se debe obtener de secureEntity, pero sin la clave sensitivePropertyName
    // @ts-ignore
    const entityWithoutSensitiveData = secureEntity;
    // Desencriptar la información sensible
    const decryptedData = decrypt(encryptedSensitiveData);
    // Verificar la firma de la información sensible
    verifySecureSignature(decryptedData, extraSecret);
    const _a = decryptedData, _b = signatureKey, _ = _a[_b], sensitiveData = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return Object.assign(Object.assign({}, entityWithoutSensitiveData), { [sensitivePropertyName]: sensitiveData });
};
exports.createRecoverySecureInfoFn = createRecoverySecureInfoFn;
//# sourceMappingURL=create-recovery-secure-info-function.js.map