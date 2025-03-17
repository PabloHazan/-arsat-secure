"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignatureFunctions = void 0;
const create_add_secure_signature_function_1 = require("./create-add-secure-signature-function");
const create_verify_secure_signature_function_1 = require("./create-verify-secure-signature-function");
const createSignatureFunctions = (keysToSign, signatureKeyName = "signature") => {
    if (keysToSign.length === 0)
        throw new Error("No keys to sign");
    return {
        addSecureSignature: (0, create_add_secure_signature_function_1.createAddSecureSignature)(keysToSign, signatureKeyName),
        verifySecureSignature: (0, create_verify_secure_signature_function_1.createVerifySecureSignature)(keysToSign, signatureKeyName),
    };
};
exports.createSignatureFunctions = createSignatureFunctions;
//# sourceMappingURL=secure-signature.js.map