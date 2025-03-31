import { SecureEntity } from "../signature";

export const createEncryptAndSignFunction =
  <EntityType extends Object, SignatureKey extends string>(
    addSecureSignature: <Obj extends EntityType>(
      object: Obj,
      extraSecret?: string
    ) => SecureEntity<Obj, SignatureKey>,
    encrypt: (data: SecureEntity<EntityType, SignatureKey>) => string
  ) =>
  (entity: EntityType, extraSecret: string = ""): string => {
    // Create the variable signedSensitiveData by signing sensitiveData
    const signedSensitiveData = addSecureSignature(entity, extraSecret);

    // Create the variable encryptedData by encrypting signedSensitiveData
    const encryptedData = encrypt(signedSensitiveData);

    // Retornar AE
    return encryptedData;
  };
