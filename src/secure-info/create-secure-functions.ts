import { createEncryptAndSignFunctions } from "../authenticated-encryption";
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
  const { encryptAndSign, decryptAndVerify } = createEncryptAndSignFunctions<
    // @ts-ignore
    EntityType[SensitivePropertyKey],
    SignatureKey
  >(sensitiveKeys, signatureKey);

  const securizeInfo: SecurizeFn<EntityType, SensitivePropertyKey> =
    createSecurizeInfoFn(sensitivePropertyName, encryptAndSign);

  const recoverySecureInfo: RecoveryFn<EntityType, SensitivePropertyKey> =
    createRecoverySecureInfoFn(
      sensitivePropertyName,
      signatureKey,
      decryptAndVerify
    );

  return { securizeInfo, recoverySecureInfo };
};
