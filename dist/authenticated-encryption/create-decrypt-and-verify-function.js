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
exports.createDecryptAndVerifyFunction = void 0;
const createDecryptAndVerifyFunction = (signatureKey, verifySecureSignature, decrypt) => (encryptedSignedEntity, extraSecret = "") => {
    // Desencriptar la información sensible
    const signedEntity = decrypt(encryptedSignedEntity);
    // Verificar la firma de la información sensible
    verifySecureSignature(signedEntity, extraSecret);
    const _a = signedEntity, _b = signatureKey, _ = _a[_b], entity = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return entity;
};
exports.createDecryptAndVerifyFunction = createDecryptAndVerifyFunction;
//# sourceMappingURL=create-decrypt-and-verify-function.js.map