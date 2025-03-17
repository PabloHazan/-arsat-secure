export interface ISecureConfig {
  secret: string;
}

export type SecureEntity<Entity, SignatureKey extends string> = Entity & {
  [secureKey in SignatureKey]: string;
};

export interface ISecureFunctions<Entity, SignatureKey extends string> {
  addSecureSignature: <NewEntity extends Entity>(
    entity: NewEntity,
    extraSecret?: string
  ) => SecureEntity<NewEntity, SignatureKey>;
  verifySecureSignature: <NewEntity extends Entity>(
    entity: NewEntity,
    extraSecret?: string
  ) => void;
}
