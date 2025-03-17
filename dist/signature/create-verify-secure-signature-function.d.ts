import { SecureEntity } from "./types";
export declare const createVerifySecureSignature: <Entity extends Object, SignatureKey extends string>(keysToSign: Array<keyof Entity>, signatureKeyName: SignatureKey) => <Obj extends Entity>(object: SecureEntity<Obj, SignatureKey>, extraSecret?: string) => void;
//# sourceMappingURL=create-verify-secure-signature-function.d.ts.map