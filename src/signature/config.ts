import { ISecureConfig } from "./types";
import { copyObject } from "../utils.ts/copy-object";

export const signConfig: ISecureConfig = {
  secret: "",
};
export const defaults = {
  extraSecret: "",
  secureKey: "signature",
};

export const configSign = (config: ISecureConfig) =>
  copyObject(config, signConfig);
