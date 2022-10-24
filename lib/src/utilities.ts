import type {
  ClassValue,
  VariantsDefinition,
  VariantsConfig,
  DefaultVariants,
  ClassProp,
} from './types'

export function concatFlattenClasses(
  ...classes: Array<ClassValue | undefined>
) {
  return classes
    .flat(Infinity as -1)
    .filter(Boolean)
    .join(' ')
}

export function createVariantsMapper<T extends VariantsDefinition>({
  base,
  compoundVariants,
  defaultVariants,
  variants,
}: VariantsConfig<T>) {
  return function propsToClasses(props: DefaultVariants<T> & ClassProp = {}) {
    if (!variants) return concatFlattenClasses(base, props.className)

    const { className, ...propsWithoutClasses } = props

    const mergedOptions = Object.assign(
      {},
      defaultVariants,
      propsWithoutClasses,
    )

    const classes: ClassValue[] = Object.keys(mergedOptions).map(
      (key: keyof typeof mergedOptions) => {
        const value = mergedOptions[key] as keyof typeof variants[typeof key]

        const classes = variants?.[key]?.[value]

        return classes
      },
    )

    const compoundClasses =
      compoundVariants?.map(compound => {
        const { className, ...conditionedOptions } = compound

        const matches = Object.keys(conditionedOptions).every(
          key => mergedOptions[key] === conditionedOptions[key],
        )
        if (!matches) return

        return className
      }) || []

    return concatFlattenClasses(
      base,
      classes,
      ...compoundClasses,
      props.className,
    )
  }
}

export function createShareableConfig<T extends VariantsDefinition>(
  cfg: VariantsConfig<T>,
) {
  return cfg
}
