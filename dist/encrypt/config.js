"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configEncrypt = exports.encryptSensitiveDataConfig = void 0;
const copy_object_1 = require("../utils.ts/copy-object");
exports.encryptSensitiveDataConfig = {
    key: "",
    iv: "",
};
const configEncrypt = (config) => (0, copy_object_1.copyObject)(config, exports.encryptSensitiveDataConfig);
exports.configEncrypt = configEncrypt;
//# sourceMappingURL=config.js.map