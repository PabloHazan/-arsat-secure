"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEncryptSensitiveData = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("./config");
const encryptData = (sensitiveData, cipher) => {
    return Buffer.concat([
        cipher.update(JSON.stringify(sensitiveData)),
        cipher.final(),
    ]).toString("hex");
};
const createEncryptCipher = (config) => crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(config.key, "hex"), Buffer.from(config.iv, "hex"));
const createEncryptSensitiveData = () => (data) => {
    const cipher = createEncryptCipher(config_1.encryptSensitiveDataConfig);
    const encryptedData = encryptData(data, cipher);
    return encryptedData;
};
exports.createEncryptSensitiveData = createEncryptSensitiveData;
//# sourceMappingURL=create-encrypt-sensitive-data-functions.js.map