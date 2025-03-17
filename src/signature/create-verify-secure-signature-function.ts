import { defaults } from "./config";
import { createSignatureHash } from "./create-signature";
import { SecureEntity } from "./types";

const verifySignature = <Entity extends Object, SignatureKey extends string>(
  keysToSign: Array<keyof Entity>,
  signatureKeyName: SignatureKey,
  extraSecret: string,
  object: SecureEntity<Entity, SignatureKey>
) => {
  const secureHash = createSignatureHash(keysToSign, object, extraSecret);
  if (object[signatureKeyName] !== secureHash)
    throw new Error("Invalid signature");
};

export const createVerifySecureSignature =
  <Entity extends Object, SignatureKey extends string>(
    keysToSign: Array<keyof Entity>,
    signatureKeyName: SignatureKey
  ) =>
  <Obj extends Entity>(
    object: SecureEntity<Obj, SignatureKey>,
    extraSecret = defaults.extraSecret
  ) =>
    verifySignature(keysToSign, signatureKeyName, extraSecret, object);
