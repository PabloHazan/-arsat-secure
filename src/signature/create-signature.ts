import crypto from "crypto";
import { signConfig } from "./config";

const createPartialObject = <Entity extends Object>(
  keysToSign: Array<keyof Entity>,
  object: Entity
) =>
  keysToSign.sort().reduce((acu, key) => ({ ...acu, [key]: object[key] }), {});

const encodeObject = <Entity extends Object>(partialObject: Partial<Entity>) =>
  Buffer.from(JSON.stringify(partialObject)).toString("base64");

const createHash = (str: string, extraSecret: string): string => {
  const cryptoHash = crypto.createHmac(
    "sha256",
    signConfig.secret + extraSecret
  );
  cryptoHash.update(str);
  return cryptoHash.digest("hex");
};

export const createSignatureHash = <Entity extends Object>(
  keysToSign: Array<keyof Entity>,
  object: Entity,
  extraSecret: string
) => {
  const partialObject: Partial<Entity> = createPartialObject(
    keysToSign,
    object
  );
  const encodedObject: string = encodeObject(partialObject);
  return createHash(encodedObject, extraSecret);
};
