# Color

Type-safe, blazingly-fast, and zero-dependency. Most color tools are either too heavy or too inaccurate, so I made this. It handles complex color space conversions correctly using CIEXYZ hubs, but keeps the footprint small by using `Float32Array` buffers under the hood.

## What it actually does

It uses CIEXYZ (D65/D50) and Bradford CAT to move colors around. I'm told this is the "correct" way to do it so the colors don't look weird when jumping between spaces like `oklch` and `lab`.

- **Converts stuff**: Changes colors between `rgb`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, and `oklch`.
- **Reads CSS**: You give it a string like `#ff0000` or `oklab(59% 0.22 0.12)` and it figures it out.
- **Writes CSS**: It turns color objects back into strings you can actually use in your CSS.
- **Checks contrast**: Calculates APCA contrast (the modern way) and can force a color to meet a specific target.
- **Makes palettes**: Generates harmonies, shades, and multi-color scales.
- **Validates & Fixes**: Checks if a color is "imaginary" (out of gamut) and clamps it back to reality.
- **Simulates vision**: Accurate projections into reduced color spaces for CVD (Color Vision Deficiency).

## How to use it

### Creating and Mutating

Everything uses a `Color` object. You can mutate it in-place to save memory or derive a new one. We use a matrix pool to keep things fast, so remember to `dropColor` when you're done with one.

```typescript
import { createColor, mutateColor, deriveColor, dropColor } from './shared';

const red = createColor('rgb', [1, 0, 0]);

// Move it to Oklch in-place (no new buffers created)
mutateColor(red, 'oklch');

// Or get a new copy in HSL
const redHsl = deriveColor(red, 'hsl');

// Clean up when finished to return the buffer to the pool
dropColor(red);
```

### Reading and writing CSS

`parseColor` gives you the object, `formatCss` gives you the string.

```typescript
import { parseColor } from './parse';
import { formatCss } from './format';

const color = parseColor('oklab(62% -0.07 -0.15)');
// color -> { space: 'oklab', value: Float32Array[...] }

const css = formatCss(color);
// oklab(62% -0.07 -0.15)
```

### Checking and matching contrast

It uses APCA, which is way more accurate than the old WCAG 2.1 math. It returns a signed Lc value (positive for light bg, negative for dark bg).

```typescript
import { checkContrast, matchContrast } from './utils/contrast';
import { parseColor } from './parse';

const text = parseColor('#ff0000');
const bg = parseColor('#000000');

// Get APCA contrast value (Lc)
const contrast = checkContrast(text, bg); 

// Adjust text lightness in Oklch until it hits a target of 60 Lc
const accessibleText = matchContrast(text, bg, 60);
```

### Making things look nice

`createHarmony` for matching, `createShades` for gradients, and `createScales` for interpolation.

```typescript
import { createHarmony, createShades, createScales } from './utils/palette';
import { parseColor } from './parse';

const blue = parseColor('#0000ff');

// Get analogous colors (shifts hue in polar space)
const mix = createHarmony(blue, [{ name: 'analogous', ratios: [-30, 30] }]);

// 5 steps from red to black
const shades = createShades(
  parseColor('#ff0000'), 
  parseColor('#000000'), 
  5
);

// Smooth scale between Red -> Yellow -> Green
const scale = createScales([
  parseColor('#ff0000'),
  parseColor('#ffff00'),
  parseColor('#00ff00')
], 7);
```

### Safety and Comparison

`checkGamut` tells you if your screen can actually show the color. `isEqual` compares colors even if they are in different spaces using a perceptual tolerance.

```typescript
import { checkGamut, clampColor } from './utils/gamut';
import { isEqual, getDistance } from './utils/compare';

const color = createColor('rgb', [1.2, -0.1, 0.5]);

const isSafe = checkGamut(color); // false
clampColor(color); // Fixes it in-place to [1, 0, 0.5]

// Perceptual distance (Delta E OK) using Oklab
const diff = getDistance(colorA, colorB);

// Check if RGB red is "the same" as HSL red
const same = isEqual(parseColor('rgb(255, 0, 0)'), parseColor('hsl(0, 100%, 50%)')); // true
```

### Accessibility Simulation

Accurately projects colors into reduced spaces in Linear RGB so you can see what someone with color blindness sees.

```typescript
import { simulateDeficiency } from './utils/simulate';
import { parseColor } from './parse';

const brand = parseColor('#32cd32');

// How does a person with red-blindness see this?
const protanopiaView = simulateDeficiency(brand, 'protanopia');
```

## How the math works (The "Hub" thing)

I didn't want to write a thousand different math formulas for every possible conversion. Instead, everything converts to a "Hub" first (CIEXYZ).

-   **The Hubs**: Modern spaces (`rgb`, `oklab`, etc.) go to **CIEXYZ D65**. Older ones (`lab`, `lch`) go to **CIEXYZ D50**.
-   **The Bridge**: To get between the two hubs, I used the **Bradford CAT**. It’s a translator so the colors don't shift weirdly when they change illuminants.

Basically: `Your Color` -> `Hub` -> `(Bridge if needed)` -> `New Color`. Because it uses `Float32Array` pool, it does all this math without making the Garbage Collector angry.
