import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import { cb, cs, styled } from '../src'

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

describe('React', () => {
  test('Without Styled', () => {
    render(<div id="1" className={getClasses()} />)

    const el = document.getElementById('1')
    expect(el?.className).toBe('base base-two red')
  })

  test('With Styled', () => {
    const Div = styled('div', shareableConfig)
    render(<Div id="2" />)

    const el = document.getElementById('2')
    expect(el?.className).toBe('base base-two red')
  })
})
