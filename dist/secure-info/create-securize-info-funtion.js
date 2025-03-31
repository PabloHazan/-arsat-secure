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
exports.createSecurizeInfoFn = void 0;
// Función para encriptar la información sensible y agregar la firma
const createSecurizeInfoFn = (sensitivePropertyName, encryptAndSign) => (entity, extraSecret = "") => {
    // Separar el valor de la clave SensitivePropertyKey
    const _a = entity, _b = sensitivePropertyName, sensitiveData = _a[_b], entityWithoutSensitiveData = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    // Create the variable signedSensitiveData by signing sensitiveData
    const encryptedData = encryptAndSign(entity[sensitivePropertyName], extraSecret);
    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return Object.assign(Object.assign({}, entityWithoutSensitiveData), { [sensitivePropertyName]: encryptedData });
};
exports.createSecurizeInfoFn = createSecurizeInfoFn;
//# sourceMappingURL=create-securize-info-funtion.js.map