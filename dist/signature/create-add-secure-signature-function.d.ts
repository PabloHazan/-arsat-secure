import { SecureEntity } from "./types";
export declare const createAddSecureSignature: <Entity extends Object, SignatureKey extends string>(keysToSign: Array<keyof Entity>, signatureKeyName: SignatureKey) => <Obj extends Entity>(object: Obj, extraSecret?: string) => SecureEntity<Obj, SignatureKey>;
//# sourceMappingURL=create-add-secure-signature-function.d.ts.map