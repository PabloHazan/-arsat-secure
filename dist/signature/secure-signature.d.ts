export declare const createSignatureFunctions: <Entity extends Object, SignatureKey extends string = "signature">(keysToSign: Array<keyof Entity>, signatureKeyName?: SignatureKey) => {
    addSecureSignature: <Obj extends Entity>(object: Obj, extraSecret?: string) => import("./types").SecureEntity<Obj, SignatureKey>;
    verifySecureSignature: <Obj extends Entity>(object: import("./types").SecureEntity<Obj, SignatureKey>, extraSecret?: string) => void;
};
//# sourceMappingURL=secure-signature.d.ts.map