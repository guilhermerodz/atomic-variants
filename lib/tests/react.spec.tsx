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

let lastId = 0
const newId = () => `test-id-${++lastId}`

describe('React classnames', () => {
  test('class builder only', () => {
    const id = newId()

    render(<div id={id} className={getClasses()} />)

    const el = document.getElementById(id)
    expect(el?.className).toBe('base base-two red')
  })

  describe('Styled components', () => {
    test('single component', () => {
      const id = newId()

      const Div = styled('div', shareableConfig)
      render(<Div id={id} />)

      const el = document.getElementById(id)
      expect(el?.className).toBe('base base-two red')
    })

    test('single component using `as` prop', () => {
      const id = newId()

      const Div = styled('div', shareableConfig)
      render(<Div as="main" id={id} />)

      const el = document.getElementById(id)
      expect(el?.className).toBe('base base-two red')
      expect(el?.tagName).toBe('MAIN')
    })

    test('nested components', () => {
      const id1 = newId()
      const id2 = newId()
      const id3 = newId()

      const Div = styled('div', shareableConfig)
      const NestedDiv = styled(Div, shareableConfig)
      const NestedNestedDiv = styled(NestedDiv, shareableConfig)

      render(<Div variants={{ color: 'green' }} id={id1} />)
      render(<NestedDiv variants={{ color: 'green' }} id={id2} />)
      render(<NestedNestedDiv variants={{ color: 'green' }} id={id3} />)

      const variantClasses = getClasses({ color: 'green' })
      const defaultClasses = getClasses()

      expect(document.getElementById(id1)?.className).toBe(variantClasses)
      expect(document.getElementById(id2)?.className).toBe(
        [defaultClasses, variantClasses].join(' '),
      )
      expect(document.getElementById(id3)?.className).toBe(
        [defaultClasses, defaultClasses, variantClasses].join(' '),
      )
    })

    test('intrinsic JSX className works', () => {
      const id = newId()

      const Div = styled('div', shareableConfig)
      render(<Div id={id} className="final-suffix" />)

      const el = document.getElementById(id)
      expect(el?.className.endsWith('final-suffix')).toBe(true)
    })
  })
})
