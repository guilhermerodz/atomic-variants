export type ClassValue = string | ClassValue[]
export type ClassProp = { className?: ClassValue }

export type VariantsDefinition = {
  [VariantName: string]: {
    [VariantOption: string]: ClassValue
  }
}
export type DefaultVariants<T extends VariantsDefinition> = {
  [Variant in keyof T]?: keyof T[Variant]
}
export type VariantsConfig<T extends VariantsDefinition> = {
  base?: ClassValue
  variants?: T
  defaultVariants?: DefaultVariants<T>
  compoundVariants?: Array<DefaultVariants<T> & ClassProp>
}
