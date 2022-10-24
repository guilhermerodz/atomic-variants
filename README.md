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
        'bg-black',
        'text-white',
      ],
      // **or**
      // primary: "bg-black text-white",
      secondary: [
        'bg-white',
        'text-black',
      ],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
    },
  },
  compoundVariants: [{ intent: 'secondary', size: 'small', className: 'uppercase' }],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

// It's ready to use. Includes a `variants` prop.
<Button variants={{ intent: 'secondary' }}>Click me</Button>
// => className: "font-semibold border rounded bg-white text-black text-base py-2 px-4"
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
      primary: ['bg-black', 'text-white'],
      // **or**
      // primary: "bg-black text-white",
      secondary: ['bg-white', 'text-black'],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
    },
  },
  compoundVariants: [
    { intent: 'secondary', size: 'small', className: 'uppercase' },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

button()
// => "font-semibold border rounded bg-black text-white text-base py-2 px-4"

button({ intent: 'secondary', size: 'small' })
// => "font-semibold border rounded bg-white text-black text-sm py-1 px-2 uppercase"
```
