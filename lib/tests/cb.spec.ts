import { describe, test, expect } from 'vitest'
import { cb } from '../src'

const getClasses = cb({
  base: 'base',
  variants: {
    size: { small: 'sm', medium: 'md', large: 'lg' },
    color: { red: 'red', green: 'green', blue: 'blue' },
  },
  defaultVariants: {
    color: 'red',
  },
  compoundVariants: [{ color: 'blue', className: 'compound' }],
})

describe('Class Builder', () => {
  test('the builder returns a function', () => {
    expect(typeof getClasses).toBe('function')
  })
})

describe('Props to Classes', () => {
  test('props should be optional', () => {
    const classes = getClasses()
    expect(classes).toBe('base red')
  })
  test('support empty object literal', () => {
    const classes = getClasses({})
    expect(classes).toBe('base red')
  })
  test('support a single variant', () => {
    const classes = getClasses({ color: 'green' })
    expect(classes).toBe('base green')
  })
  test('support a multiple variants', () => {
    const classes = getClasses({ color: 'green', size: 'large' })
    expect(classes).toBe('base green lg')
  })
  test('support compound variants with single property', () => {
    const classes = getClasses({ color: 'blue' })
    expect(classes).toBe('base blue compound')
  })
  test('support compound variants with multiple properties', () => {
    const classes = getClasses({ color: 'blue', size: 'large' })
    expect(classes).toBe('base blue lg compound')
  })
  test('append with "className" prop', () => {
    const classes = getClasses({
      color: 'blue',
      size: 'large',
      className: 'suffix',
    })
    expect(classes).toBe('base blue lg compound suffix')
  })
})

describe('Edge cases', () => {
  const getClasses = cb({
    base: 'base',
    variants: {
      className: { foo: 'bar', john: 'doe' },
    },
    defaultVariants: {
      className: 'john',
    },
    // There's no way to provide a `className`
    // other than 'john' due in this case 👇🏻
    compoundVariants: [{ className: 'john' }],
  })

  test('', () => {
    const classes = getClasses()
    expect(classes).toBe('base doe john')
  })
})
