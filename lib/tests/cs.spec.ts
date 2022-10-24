import { describe, test, expect } from 'vitest'
import { cs } from '../src'

const configWithoutIntellisense = {
  base: 'base',
  variants: {
    size: { small: 'sm', medium: 'md', large: 'lg' },
    color: { red: 'red', green: 'green', blue: 'blue' },
  },
  defaultVariants: {
    color: 'red',
  },
  compoundVariants: [{ color: 'blue', className: 'compound' }],
}

describe('Shareable Config with TypeScript Intellisense', () => {
  test('the result is unmodified', () => {
    expect(cs(configWithoutIntellisense as any)).toEqual(
      configWithoutIntellisense,
    )
  })
})
