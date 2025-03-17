"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddSecureSignature = void 0;
const config_1 = require("./config");
const create_signature_1 = require("./create-signature");
const addSignature = (keysToSign, signatureKeyName, object, extraSecret) => {
    const signatureHash = (0, create_signature_1.createSignatureHash)(keysToSign, object, extraSecret);
    const signedObj = Object.assign(Object.assign({}, object), { [signatureKeyName]: signatureHash });
    return signedObj;
};
const createAddSecureSignature = (keysToSign, signatureKeyName) => (object, extraSecret = config_1.defaults.extraSecret) => addSignature(keysToSign, signatureKeyName, object, extraSecret);
exports.createAddSecureSignature = createAddSecureSignature;
//# sourceMappingURL=create-add-secure-signature-function.js.map