import { SecureEntity } from "../signature";
import { SecurizeFn } from "./types";

// Función para encriptar la información sensible y agregar la firma
export const createSecurizeInfoFn =
  <
    EntityType extends Object,
    SensitivePropertyKey extends keyof EntityType,
    SignatureKey extends string
  >(
    sensitivePropertyName: SensitivePropertyKey,
    addSecureSignature: <Obj extends EntityType[SensitivePropertyKey]>(
      object: Obj,
      extraSecret?: string
    ) => SecureEntity<Obj, SignatureKey>,
    encrypt: (
      data: SecureEntity<EntityType[SensitivePropertyKey], SignatureKey>
    ) => string
  ): SecurizeFn<EntityType, SensitivePropertyKey> =>
  (
    entity: EntityType,
    extraSecret: string = ""
  ): Omit<EntityType, SensitivePropertyKey> & {
    [x in SensitivePropertyKey]: string;
  } => {
    // Separar el valor de la clave SensitivePropertyKey
    const {
      [sensitivePropertyName]: sensitiveData,
      ...entityWithoutSensitiveData
    } = entity;

    // Create the variable signedSensitiveData by signing sensitiveData
    const signedSensitiveData = addSecureSignature(sensitiveData, extraSecret);

    // Create the variable encryptedData by encrypting signedSensitiveData
    const encryptedData = encrypt(signedSensitiveData);

    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return {
      ...entityWithoutSensitiveData,
      [sensitivePropertyName]: encryptedData,
    };
  };
