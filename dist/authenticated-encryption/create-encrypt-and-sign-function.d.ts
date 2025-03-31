import { SecureEntity } from "../signature";
export declare const createEncryptAndSignFunction: <EntityType extends Object, SignatureKey extends string>(addSecureSignature: <Obj extends EntityType>(object: Obj, extraSecret?: string) => SecureEntity<Obj, SignatureKey>, encrypt: (data: SecureEntity<EntityType, SignatureKey>) => string) => (entity: EntityType, extraSecret?: string) => string;
//# sourceMappingURL=create-encrypt-and-sign-function.d.ts.map