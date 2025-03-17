export type SecurizeFn<
  EntityType extends Object,
  SensitivePropertyKey extends keyof EntityType
> = (
  entity: EntityType,
  extraSecret?: string
) => Omit<EntityType, SensitivePropertyKey> & {
  [x in SensitivePropertyKey]: string;
};

export type RecoveryFn<
  EntityType extends Object,
  SensitivePropertyKey extends keyof EntityType
> = (
  secureEntity: Omit<EntityType, SensitivePropertyKey> & {
    [x in SensitivePropertyKey]: string;
  },
  extraSecret?: string
) => EntityType;

export interface SecureFunctions<
  EntityType extends Object,
  SensitivePropertyKey extends keyof EntityType
> {
  securizeInfo: SecurizeFn<EntityType, SensitivePropertyKey>;
  recoverySecureInfo: RecoveryFn<EntityType, SensitivePropertyKey>;
}
