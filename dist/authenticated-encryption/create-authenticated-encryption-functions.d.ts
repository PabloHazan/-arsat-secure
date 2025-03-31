import { AuthenticatedEncrytionFunctions } from "./types";
export declare const createEncryptAndSignFunctions: <EntityType extends Object, SignatureKey extends string = "signature">(sensitiveKeys: Array<keyof EntityType>, signatureKey?: SignatureKey) => AuthenticatedEncrytionFunctions<EntityType>;
//# sourceMappingURL=create-authenticated-encryption-functions.d.ts.map