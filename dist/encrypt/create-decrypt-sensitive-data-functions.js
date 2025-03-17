"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecryptSensitiveData = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("./config");
const createDecryptCipher = (config) => crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(config.key, "hex"), Buffer.from(config.iv, "hex"));
const decryptData = (encryptedData, decipher) => {
    return JSON.parse(Buffer.concat([
        decipher.update(Buffer.from(encryptedData, "hex")),
        decipher.final(),
    ]).toString());
};
const createDecryptSensitiveData = () => (encryptedData) => {
    const decipher = createDecryptCipher(config_1.encryptSensitiveDataConfig);
    const decryptedData = decryptData(encryptedData, decipher);
    return decryptedData;
};
exports.createDecryptSensitiveData = createDecryptSensitiveData;
//# sourceMappingURL=create-decrypt-sensitive-data-functions.js.map