import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { cb, cs } from '../src'

const shareableConfig = cs({
  base: ['base', ['base-two']],
  variants: {
    size: { small: 'sm', medium: 'md', large: 'lg' },
    color: { red: 'red', green: 'green', blue: 'blue' },
  },
  defaultVariants: {
    color: 'red',
  },
  compoundVariants: [{ color: 'blue', className: 'compound' }],
})

const getClasses = cb(shareableConfig)

test('Button', () => {
  render(
    <>
      <div id="1" className={getClasses()} />
    </>,
  )

  const el = document.getElementById('1')
  expect(el?.className).toBe('base base-two red')
})
