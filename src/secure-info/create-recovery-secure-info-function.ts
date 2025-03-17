import { SecureEntity } from "../signature";
import { RecoveryFn } from "./types";

// Función para desencriptar la información sensible y verificar la firma
export const createRecoverySecureInfoFn =
  <
    EntityType extends Object,
    SensitivePropertyKey extends keyof EntityType,
    SignatureKey extends string
  >(
    sensitivePropertyName: SensitivePropertyKey,
    signatureKey: SignatureKey,
    verifySecureSignature: <Obj extends EntityType[SensitivePropertyKey]>(
      object: SecureEntity<Obj, SignatureKey>,
      extraSecret?: string
    ) => void,
    decrypt: (
      encryptedData: string
    ) => SecureEntity<EntityType[SensitivePropertyKey], SignatureKey>
  ): RecoveryFn<EntityType, SensitivePropertyKey> =>
  (
    secureEntity: Omit<EntityType, SensitivePropertyKey> & {
      [x in SensitivePropertyKey]: string;
    },
    extraSecret: string = ""
  ): EntityType => {
    const encryptedSensitiveData = secureEntity[
      sensitivePropertyName
    ] as string;
    // crear la variable entityWithoutSensitiveData
    // debe ser del tipo Omit<EntityType, SensitivePropertyKey>
    // se debe obtener de secureEntity, pero sin la clave sensitivePropertyName
    // @ts-ignore
    const entityWithoutSensitiveData: Omit<EntityType, SensitivePropertyKey> =
      secureEntity;

    // Desencriptar la información sensible
    const decryptedData = decrypt(encryptedSensitiveData);

    // Verificar la firma de la información sensible
    verifySecureSignature(decryptedData, extraSecret);

    const { [signatureKey]: _, ...sensitiveData } = decryptedData;

    // Retornar un nuevo objeto idéntico al recibido pero reemplazando el valor de la clave SensitivePropertyKey
    // @ts-ignore
    return {
      ...entityWithoutSensitiveData,
      [sensitivePropertyName]: sensitiveData,
    } as EntityType;
  };
