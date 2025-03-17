import { createEncryptSensitiveDataFunctions } from "../encrypt";
import { createSignatureFunctions, SecureEntity } from "../signature";
import { createRecoverySecureInfoFn } from "./create-recovery-secure-info-function";
import { createSecurizeInfoFn } from "./create-securize-info-funtion";
import { RecoveryFn, SecureFunctions, SecurizeFn } from "./types";

// Definir la función createSecureFunctions con los tipos genéricos EntityType, SensitivePropertyKey y SignatureKey
export const createSecureFunctions = <
  EntityType extends Object,
  SensitivePropertyKey extends keyof EntityType,
  SignatureKey extends string = "signature"
>(
  sensitivePropertyName: SensitivePropertyKey,
  sensitiveKeys: Array<keyof EntityType[SensitivePropertyKey]>,
  signatureKey: SignatureKey = "signature" as SignatureKey
): SecureFunctions<EntityType, SensitivePropertyKey> => {
  const { addSecureSignature, verifySecureSignature } =
    createSignatureFunctions<
      // @ts-ignore
      EntityType[SensitivePropertyKey],
      SignatureKey
    >(sensitiveKeys, signatureKey);

  // Crear las funciones encrypt y decrypt con los tipos genéricos adecuados
  const { encrypt, decrypt } =
    createEncryptSensitiveDataFunctions<
      SecureEntity<EntityType[SensitivePropertyKey], SignatureKey>
    >();

  const securizeInfo: SecurizeFn<EntityType, SensitivePropertyKey> =
    createSecurizeInfoFn(sensitivePropertyName, addSecureSignature, encrypt);

  const recoverySecureInfo: RecoveryFn<EntityType, SensitivePropertyKey> =
    createRecoverySecureInfoFn(
      sensitivePropertyName,
      signatureKey,
      verifySecureSignature,
      decrypt
    );

  return { securizeInfo, recoverySecureInfo };
};
