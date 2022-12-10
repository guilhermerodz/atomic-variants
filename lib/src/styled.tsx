import React from 'react'

import type {
  VariantsDefinition,
  DefaultVariants,
  VariantsConfig,
} from './types'
import { createVariantsMapper } from './utilities'

type AnyComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export function styled<T extends VariantsDefinition, C extends AnyComponent>(
  baseComponent: C,
  config: VariantsConfig<T>,
) {
  const getClasses = createVariantsMapper(config)

  const PolymorphicComponent: any = baseComponent
  const ComponentWithVariantsProps = React.forwardRef<
    React.ElementRef<C>,
    React.ComponentProps<C> & {
      variants?: DefaultVariants<T>
      as?: AnyComponent
    }
  >(({ className, variants, as, ...props }, forwardedRef) =>
    React.createElement(as ?? PolymorphicComponent, {
      className:
        getClasses({
          ...variants, // Populate with chosen variants
          className, // Override those variants with class names on-demand
        }) || undefined,
      ref: forwardedRef,
      ...props,
    }),
  )

  // Prevent component from showing as `Anonymous` (improves debugging)
  if (
    typeof baseComponent === 'string' &&
    !ComponentWithVariantsProps.displayName
  )
    ComponentWithVariantsProps.displayName = baseComponent

  return ComponentWithVariantsProps
}
