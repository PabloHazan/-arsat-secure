import { SecureEntity } from "../signature";

export const createDecryptAndVerifyFunction =
  <EntityType extends Object, SignatureKey extends string>(
    signatureKey: SignatureKey,
    verifySecureSignature: <Obj extends EntityType>(
      object: SecureEntity<Obj, SignatureKey>,
      extraSecret?: string
    ) => void,
    decrypt: (encryptedData: string) => SecureEntity<EntityType, SignatureKey>
  ) =>
  (encryptedSignedEntity: string, extraSecret: string = ""): EntityType => {
    // Desencriptar la información sensible
    const signedEntity = decrypt(encryptedSignedEntity);

    // Verificar la firma de la información sensible
    verifySecureSignature(signedEntity, extraSecret);

    const { [signatureKey]: _, ...entity } = signedEntity;

    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return entity;
  };
