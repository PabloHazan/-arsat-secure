"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyObject = void 0;
const copyObject = (from, to) => {
    Object.entries(from).forEach(([key, value]) => {
        // @ts-ignore
        to[key] = value;
    });
};
exports.copyObject = copyObject;
//# sourceMappingURL=copy-object.js.map