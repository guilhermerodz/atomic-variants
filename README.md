# Atomic Variants

Acknowledgements:

- [joe-bell/cva](https://github.com/joe-bell/cva) for type-safe atomic class names
- [stitchesjs/stitches](https://github.com/stitchesjs/stitches) for React composability

## Usage

## styled (Composable Components)

```tsx
import { styled } from 'atomic-variants'

const Button = styled('button', {
  base: ['font-semibold', 'border', 'rounded'],
  variants: {
    intent: {
      primary: [
        'bg-blue-500',
        'text-white',
        'border-transparent',
        'hover:bg-blue-600',
      ],
      // **or**
      // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      secondary: [
        'bg-white',
        'text-gray-800',
        'border-gray-400',
        'hover:bg-gray-100',
      ],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
    },
  },
  compoundVariants: [{ intent: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

// It's ready to use. Includes a `variants` prop.
<Button variants={{ intent: 'secondary }}>

button()
// => "font-semibold border rounded bg-blue-500 text-white border-transparent hover:bg-blue-600 text-base py-2 px-4 uppercase"

button({ intent: 'secondary', size: 'small' })
// => "font-semibold border rounded bg-white text-gray-800 border
```

## cx (Class Concat & Flatten)

```ts
import { cx } from 'atomic-variants'

cx('a', 'b', 'c')
// => "a b c"

cx('a', ['b', ['c', 'd'], 'e'], ['f'])
// => "a b c d e f"

cx('a', undefined, ['b', ['c', 'd']], ['e', ['f', 'g'], 'h'])
// => "a b c d e f g h"
```

### cb (Class Builder)

```ts
import { cb } from 'atomic-variants'

const button = cb({
  base: ['font-semibold', 'border', 'rounded'],
  variants: {
    intent: {
      primary: [
        'bg-blue-500',
        'text-white',
        'border-transparent',
        'hover:bg-blue-600',
      ],
      // **or**
      // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      secondary: [
        'bg-white',
        'text-gray-800',
        'border-gray-400',
        'hover:bg-gray-100',
      ],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
    },
  },
  compoundVariants: [{ intent: 'primary', size: 'medium', class: 'uppercase' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

button()
// => "font-semibold border rounded bg-blue-500 text-white border-transparent hover:bg-blue-600 text-base py-2 px-4 uppercase"

button({ intent: 'secondary', size: 'small' })
// => "font-semibold border rounded bg-white text-gray-800 border
```
