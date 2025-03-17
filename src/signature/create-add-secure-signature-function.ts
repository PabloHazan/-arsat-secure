import { defaults } from "./config";
import { createSignatureHash } from "./create-signature";
import { SecureEntity } from "./types";

const addSignature = <Entity extends Object, SignatureKey extends string>(
  keysToSign: Array<keyof Entity>,
  signatureKeyName: SignatureKey,
  object: Entity,
  extraSecret: string
): SecureEntity<Entity, SignatureKey> => {
  const signatureHash = createSignatureHash(keysToSign, object, extraSecret);
  const signedObj = {
    ...object,
    [signatureKeyName]: signatureHash,
  } as SecureEntity<Entity, SignatureKey>;
  return signedObj;
};

export const createAddSecureSignature =
  <Entity extends Object, SignatureKey extends string>(
    keysToSign: Array<keyof Entity>,
    signatureKeyName: SignatureKey
  ) =>
  <Obj extends Entity>(
    object: Obj,
    extraSecret: string = defaults.extraSecret
  ) =>
    addSignature(keysToSign, signatureKeyName, object, extraSecret);
