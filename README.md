# Atomic Variants

Acknowledgements:

- [joe-bell/cva](https://github.com/joe-bell/cva) for type-safe atomic class names (strong read 👍🏻)
- [stitchesjs/stitches](https://github.com/stitchesjs/stitches) for React composability

## Get Started

```sh
npm i @rodz/atomic-variants
```

### Tailwind Intellisense for VSCode

If you're using the ["Tailwind CSS IntelliSense" Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), you can enable autocompletion for `atomic-variants` by adding the following to your [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings):

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["(?:styled|c[xsb])\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Usage

### styled (Composable Components)

It's a wrapper around [`cb`](#cb-class-builder), built for React JSX composition.

```tsx
import { styled } from '@rodz/atomic-variants'

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

### cx (Class Concat & Flatten)

A tiny utility for concatenating & flattening & cleaning class names.
Supports arrays of strings in infinite depths. Supports undefined in first depth.

```ts
import { cx } from '@rodz/atomic-variants'

cx('a', 'b', 'c')
// => "a b c"

cx('a', ['b', ['c', 'd'], 'e'], ['f'])
// => "a b c d e f"

cx('a', undefined, ['b', ['c', 'd']], ['e', ['f', 'g'], 'h'])
// => "a b c d e f g h"
```

### cb (Class Builder)

It's similar to [`styled`](#styled-composable-components), but it returns a normal function instead of of returning a React component.

The returned function will assign `{ ...props, className }` to a final class name (string).

In the following example, [`cb`](#cb-class-builder) has been called and returned `button`, which is a function.
`button` can now be called to reduce its props into a final className.

```ts
import { cb } from '@rodz/atomic-variants'

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

### cs (Config Shared)

Useful for sharing similar variants between components.
Expects the same parameters as [`cb`](#cb-class-builder).

```tsx
import { cs } from '@rodz/atomic-variants'

const sharedTableCell = cs({
  base: [
    'first:pl-6 last:pr-6',
    'group-[]/table-condensed:first:pl-4 group-[]/table-condensed:first:pr-4',
    'group-[]/table-condensed:py-2',
  ],
  variants: {
    align: {
      start: ['text-start'],
      center: ['text-center'],
      end: ['text-end'],
    },
  },
  defaultVariants: { align: 'start' },
})

export const Th = styled('th', {
  ...sharedTableCell,
  base: [sharedTableCell.base, 'py-3'],
})

export const Td = styled('td', {
  ...sharedTableCell,
  base: [sharedTableCell.base, 'py-4'],
})
```
