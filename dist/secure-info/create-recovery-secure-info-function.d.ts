import { SecureEntity } from "../signature";
import { RecoveryFn } from "./types";
export declare const createRecoverySecureInfoFn: <EntityType extends Object, SensitivePropertyKey extends keyof EntityType, SignatureKey extends string>(sensitivePropertyName: SensitivePropertyKey, signatureKey: SignatureKey, verifySecureSignature: <Obj extends EntityType[SensitivePropertyKey]>(object: SecureEntity<Obj, SignatureKey>, extraSecret?: string) => void, decrypt: (encryptedData: string) => SecureEntity<EntityType[SensitivePropertyKey], SignatureKey>) => RecoveryFn<EntityType, SensitivePropertyKey>;
//# sourceMappingURL=create-recovery-secure-info-function.d.ts.map