# Color

Type-safe, blazingly-fast, and zero-dependency. Most color tools are either too heavy or too inaccurate, so I made this. It handles complex color space conversions correctly using CIEXYZ, but keeps the footprint small and the performance high.

## What it actually does

It uses CIEXYZ (D65/D50) and Bradford CAT to move colors around. I'm told this is the "correct" way to do it so the colors don't look weird.

- **Converts stuff**: Changes colors between color spaces.
- **Reads CSS**: You give it a string like `#ff0000` or `rgb(255, 0, 0)` and it figures it out.
- **Writes CSS**: It turns the color objects back into strings you can actually use in your CSS.
- **Makes palettes**: It can generate harmonies, shades, and scales.

## How to use it

### Changing color modes

Use `convertColor`. You tell it what you have and what you want.

```typescript
import type { ColorSpace } from './types';
import { convertColor } from './convert';
import { parseCss } from './parse';

const redRgb = [1, 0, 0] as ColorSpace<'rgb'>;

// Move it to HSL
const redHsl = convertColor(redRgb, 'rgb', 'hsl');

// Now make it a string so CSS understands it
const css = parseCss('hsl', redHsl);
```

### Reading and writing CSS

`parseColor` turns a string into an array of values. `parseCss` does the opposite.

```typescript
import { parseColor, parseCss } from './parse';

const color = parseColor('hsl(120, 100%, 50%)');

const backToString = parseCss('rgb', [1, 0, 0]);
```

### Making things look nice

`createHarmony` for matching colors, `createShades` for a simple gradient, and `createScales` for when you have a bunch of colors and want a smooth line between them.

```typescript
import { createHarmony, createShades, createScales } from './interpolate';

// Get a complementary color
const mix = createHarmony([1, 0, 0], 'rgb', [{ name: 'comp', ratios: [180] }]);

// 5 steps from white to black
const shades = createShades([1, 1, 1], [0, 0, 0], 'rgb', 5);

// Scale between Red -> Yellow -> Green
const scale = createScales([[1,0,0], [1,1,0], [0,1,0]], 'rgb', 7);
```

## How the math works (The "Hub" thing)

I didn't want to write a thousand different math formulas for every possible conversion. Instead, everything converts to a "Hub" first (CIEXYZ).

- `The Hubs`: Most things (sRGB, Oklab) go to **D65**. Old-school stuff (LAB) goes to **D50**.
- `The Bridge`: To get between the two hubs, I used something called **Bradford CAT**. It’s like a translator so the colors don't shift weirdly when they change systems.

Basically: *Your Color* -> Hub -> *(Bridge if needed)* -> New Color.

## Commands

If you want to build it or check if I broke something:

```bash
# Build the project
pnpm build

# Run specific tests
just test {name}

# Run the color conversion test
just converter

# Run the color palette test
just palette
```
