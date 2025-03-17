import { createAddSecureSignature } from "./create-add-secure-signature-function";
import { createVerifySecureSignature } from "./create-verify-secure-signature-function";

export const createSignatureFunctions = <
  Entity extends Object,
  SignatureKey extends string = "signature"
>(
  keysToSign: Array<keyof Entity>,
  signatureKeyName: SignatureKey = "signature" as SignatureKey
) => {
  if (keysToSign.length === 0) throw new Error("No keys to sign");
  return {
    addSecureSignature: createAddSecureSignature<Entity, SignatureKey>(
      keysToSign,
      signatureKeyName
    ),
    verifySecureSignature: createVerifySecureSignature<Entity, SignatureKey>(
      keysToSign,
      signatureKeyName
    ),
  };
};
