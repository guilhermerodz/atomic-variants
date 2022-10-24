import { describe, test, expect } from 'vitest'
import { cx } from '../src'

describe('Class Aggregator', () => {
  test('concatenate strings', () => {
    const classes = cx('a', 'b', 'c')
    expect(classes).toBe('a b c')
  })
  test('flatten nested arrays of strings', () => {
    const classes = cx('a', ['b', ['c', 'd'], 'e'], ['f'])
    expect(classes).toBe('a b c d e f')
  })
  test('accept empty strings', () => {
    const classes = cx('a', '', ['b', ['c', [''], 'd'], 'e'], ['f'])
    expect(classes).toBe('a b c d e f')
  })
  test('accept undefined inside the list of arguments', () => {
    const classes = cx(
      'a',
      undefined,
      ['b', ['c', 'd']],
      ['e', ['f', 'g'], 'h'],
      undefined,
    )
    expect(classes).toBe('a b c d e f g h')
  })
})
