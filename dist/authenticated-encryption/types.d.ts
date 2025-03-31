export interface AuthenticatedEncrytionFunctions<EntityType extends Object> {
    encryptAndSign: (entity: EntityType, extraSecret?: string) => string;
    decryptAndVerify: (encryptedSignedEntity: string, extraSecret?: string) => EntityType;
}
//# sourceMappingURL=types.d.ts.map