import { createEncryptSensitiveDataFunctions } from "../encrypt";
import { SecureEntity, createSignatureFunctions } from "../signature";
import { createDecryptAndVerifyFunction } from "./create-decrypt-and-verify-function";
import { createEncryptAndSignFunction } from "./create-encrypt-and-sign-function";
import { AuthenticatedEncrytionFunctions } from "./types";

export const createEncryptAndSignFunctions = <
  EntityType extends Object,
  SignatureKey extends string = "signature"
>(
  sensitiveKeys: Array<keyof EntityType>,
  signatureKey: SignatureKey = "signature" as SignatureKey
): AuthenticatedEncrytionFunctions<EntityType> => {
  const { addSecureSignature, verifySecureSignature } =
    createSignatureFunctions<EntityType, SignatureKey>(
      sensitiveKeys,
      signatureKey
    );

  // Crear las funciones encrypt y decrypt con los tipos genéricos adecuados
  const { encrypt, decrypt } =
    createEncryptSensitiveDataFunctions<
      SecureEntity<EntityType, SignatureKey>
    >();

  const encryptAndSign = createEncryptAndSignFunction<EntityType, SignatureKey>(
    addSecureSignature,
    encrypt
  );

  const decryptAndVerify = createDecryptAndVerifyFunction<
    EntityType,
    SignatureKey
  >(signatureKey, verifySecureSignature, decrypt);

  return {
    encryptAndSign,
    decryptAndVerify,
  };
};
