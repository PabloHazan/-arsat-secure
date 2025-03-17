"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerifySecureSignature = void 0;
const config_1 = require("./config");
const create_signature_1 = require("./create-signature");
const verifySignature = (keysToSign, signatureKeyName, extraSecret, object) => {
    const secureHash = (0, create_signature_1.createSignatureHash)(keysToSign, object, extraSecret);
    if (object[signatureKeyName] !== secureHash)
        throw new Error("Invalid signature");
};
const createVerifySecureSignature = (keysToSign, signatureKeyName) => (object, extraSecret = config_1.defaults.extraSecret) => verifySignature(keysToSign, signatureKeyName, extraSecret, object);
exports.createVerifySecureSignature = createVerifySecureSignature;
//# sourceMappingURL=create-verify-secure-signature-function.js.map