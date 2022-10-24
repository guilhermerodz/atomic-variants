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

let lastId = 0
const newId = () => `test-id-${++lastId}`

describe('React classnames', () => {
  test('class builder only', () => {
    const id = newId()

    const getClasses = cb(shareableConfig)
    render(<div id={id} className={getClasses()} />)

    const el = document.getElementById(id)
    expect(el?.className).toBe('base base-two red')
  })

  describe('Styled components', () => {
    describe('Nesting', () => {
      test('1st depth', () => {
        const id = newId()

        const Div = styled('div', shareableConfig)
        render(<Div id={id} />)

        const el = document.getElementById(id)
        expect(el?.className).toBe('base base-two red')
      })

      test('3rd depth', () => {
        const id1 = newId()
        const id2 = newId()
        const id3 = newId()

        const Div = styled('div', shareableConfig)
        const NestedDiv = styled(Div, shareableConfig)
        const NestedNestedDiv = styled(NestedDiv, shareableConfig)

        render(<Div variants={{ color: 'green' }} id={id1} />)
        render(<NestedDiv variants={{ color: 'green' }} id={id2} />)
        render(<NestedNestedDiv variants={{ color: 'blue' }} id={id3} />)

        const el1 = document.getElementById(id1)
        const el2 = document.getElementById(id2)
        const el3 = document.getElementById(id3)

        expect(el1?.className).toBe(el2?.className)
        expect(el3?.className).not.toBe(el2?.className)
      })
    })

    describe('when the final className is empty', () => {
      test('prevent empty `class` attribute in HTML element', () => {
        const id = newId()

        const Div = styled('div', { base: ['', [''], ''] })
        render(<Div id={id} />)

        const el1 = document.getElementById(id)
      })
    })
  })
})
