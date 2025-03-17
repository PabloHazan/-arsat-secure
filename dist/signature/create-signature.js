"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignatureHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("./config");
const createPartialObject = (keysToSign, object) => keysToSign.sort().reduce((acu, key) => (Object.assign(Object.assign({}, acu), { [key]: object[key] })), {});
const encodeObject = (partialObject) => Buffer.from(JSON.stringify(partialObject)).toString("base64");
const createHash = (str, extraSecret) => {
    const cryptoHash = crypto_1.default.createHmac("sha256", config_1.signConfig.secret + extraSecret);
    cryptoHash.update(str);
    return cryptoHash.digest("hex");
};
const createSignatureHash = (keysToSign, object, extraSecret) => {
    const partialObject = createPartialObject(keysToSign, object);
    const encodedObject = encodeObject(partialObject);
    return createHash(encodedObject, extraSecret);
};
exports.createSignatureHash = createSignatureHash;
//# sourceMappingURL=create-signature.js.map