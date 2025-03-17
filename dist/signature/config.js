"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSign = exports.defaults = exports.signConfig = void 0;
const copy_object_1 = require("../utils.ts/copy-object");
exports.signConfig = {
    secret: "",
};
exports.defaults = {
    extraSecret: "",
    secureKey: "signature",
};
const configSign = (config) => (0, copy_object_1.copyObject)(config, exports.signConfig);
exports.configSign = configSign;
//# sourceMappingURL=config.js.map