# Chromatrix

A high-performance, heavy-duty color engine for the web. Designed for accuracy and efficiency, it uses `Float32Array` buffers and CIEXYZ hubs to ensure mathematically sound conversions without the memory overhead of typical object-heavy color libraries.

## The Core Logic

Color math is messy because different spaces use different reference points. To solve this, every conversion passes through a central hub.

- **Conversion**: Moves data between `rgb`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, and `oklch`.
- **Parsing**: Reads CSS strings (hex, functional notation, and modern spaces).
- **Formatting**: Outputs color objects as standard CSS strings.
- **Contrast**: Calculates APCA _Lc_ values for text and background pairs.
- **Palettes**: Generates harmonies and scales using perceptual interpolation.
- **Gamut**: Detects out-of-bounds colors and clamps them to a valid range.
- **Pickers**: Maps 2D UI coordinates to HSVA values for color selection.
- **Vision**: Simulates color-blindness by projecting into reduced color spaces.

## Usage

Install via your preferred package manager:

```bash
# pnpm
pnpm add @kayxean/chromatrix

# npm
npm add @kayxean/chromatrix

# yarn
yarn add @kayxean/chromatrix

# bun
bun add @kayxean/chromatrix
```

## Low-Level Matrix

For animations or bulk processing, use the low-level matrix API to avoid garbage collection. These use a `Float32Array` buffer pool.

```ts
import { createMatrix, convertColor, dropMatrix } from '@kayxean/chromatrix';

const input = createMatrix('rgb');
const output = createMatrix('oklab');
input.set([0.7, 0.1, 0.9]);

convertColor(input, output, 'rgb', 'oklab');

dropMatrix(input);
dropMatrix(output);
```

### Pool Management

Warming up the pool improves performance by reducing initial allocations.

```ts
import { preallocatePool, clearPool } from '@kayxean/chromatrix';

preallocatePool(100);

clearPool();
```

## Matrix Management

Everything is built on a `Color` object containing a `Float32Array`. To keep performance high, we use a pool. You can either mutate in-place or derive new copies, but you must manually free them when finished.

```ts
import { createColor, mutateColor, deriveColor, cloneColor, dropColor } from '@kayxean/chromatrix';

const color = createColor('rgb', [0.5, 0.2, 0.8]);
const copy = cloneColor(color);

mutateColor(color, 'oklch');

const converted = deriveColor(color, 'hsl');

dropColor(color);
dropColor(copy);
dropColor(converted);
```

## CSS Integration

Parsing returns a managed color object. Formatting returns a standard string.

```ts
import { parseColor, formatCss, dropColor } from '@kayxean/chromatrix';

const color = parseColor('oklch(60% 0.15 30)');
const css = formatCss(color);

const hex = formatCss(color, true);

dropColor(color);
```

## Color Conversion

Direct transformations are handled through a chain of adapters. The system automatically determines if it can take a direct path or if it needs to route through a CIEXYZ hub.

```ts
import { createMatrix, convertColor, convertHue, dropMatrix } from '@kayxean/chromatrix';

const rgbArray = createMatrix('rgb');
const oklabArray = createMatrix('oklab');
rgbArray.set([0.7, 0.1, 0.9]);

convertColor(rgbArray, oklabArray, 'rgb', 'oklab');

const labArray = createMatrix('lab');
const lchArray = createMatrix('lch');
labArray.set([50, 20, 30]);
convertHue(labArray, lchArray, 'lab');

dropMatrix(rgbArray);
dropMatrix(oklabArray);
dropMatrix(labArray);
dropMatrix(lchArray);
```

## Contrast & Accessibility

Forget the old WCAG ratio. This uses APCA to calculate a signed _Lc_ value based on font weight and background luminance.

```ts
import {
  parseColor,
  checkContrast,
  matchContrast,
  createScales,
  dropColor,
} from '@kayxean/chromatrix';

const brand = parseColor('#007bff');
const bg = parseColor('#ffffff');

const score = checkContrast(brand, bg);

const safeColor = matchContrast(brand, bg, 75);

const scale = createScales([brand, bg], 5);

scale.forEach(dropColor);
dropColor(brand);
dropColor(bg);
dropColor(safeColor);
```

### Bulk Contrast

Check contrast for multiple colors against a single background efficiently.

```ts
import { parseColor, checkContrastBulk, dropColor } from '@kayxean/chromatrix';

const bg = parseColor('#333333');
const colors = [parseColor('#ffffff'), parseColor('#cccccc'), parseColor('#666666')];

const results = checkContrastBulk(bg, colors);

colors.forEach(dropColor);
dropColor(bg);
```

### Contrast Rating

Get a human-readable readability tier based on the absolute APCA _Lc_ score.

```ts
import { getContrastRating } from '@kayxean/chromatrix';

getContrastRating(75.2);
```

### Match Scales

Generate a color scale where each step meets a target contrast against a background.

```ts
import { parseColor, matchScales, dropColor } from '@kayxean/chromatrix';

const stops = [parseColor('#007bff'), parseColor('#ffc107')];
const whiteBg = parseColor('#ffffff');

const adjustedScale = matchScales(stops, whiteBg, 60, 5);

adjustedScale.forEach(dropColor);
stops.forEach(dropColor);
dropColor(whiteBg);
```

## Generative Tools

Interpolation happens in polar space for smoother, more "natural" color shifts.

```ts
import {
  createHarmony,
  createScales,
  createShades,
  mixColor,
  dropColor,
} from '@kayxean/chromatrix';

const base = parseColor('#007bff');
const neighbors = createHarmony(base, [
  { name: 'analogous', ratios: [-30, 30] },
  { name: 'complementary', ratios: [180] },
]);

const ramp = createScales([parseColor('#ff0000'), parseColor('#0000ff')], 5);

const start = parseColor('rgb(255 0 0)');
const end = parseColor('rgb(0 0 255)');
const shades = createShades(start, end, 5);

const mixed = mixColor(start, end, 0.5);

neighbors.forEach((h) => h.colors.forEach(dropColor));
ramp.forEach(dropColor);
shades.forEach(dropColor);
dropColor(mixed);
dropColor(start);
dropColor(end);
dropColor(base);
```

## Safety & Comparison

Colors that look the same in different spaces are treated as equal through a perceptual tolerance threshold.

```ts
import {
  parseColor,
  checkGamut,
  clampColor,
  isEqual,
  getDistance,
  dropColor,
} from '@kayxean/chromatrix';

const wideColor = parseColor('oklch(90% 0.4 120)');

if (!checkGamut(wideColor)) {
  clampColor(wideColor);
}

const match = isEqual(parseColor('#f00'), parseColor('hsl(0, 100%, 50%)'));
const distance = getDistance(parseColor('#ff0000'), parseColor('#ffa500'));

dropColor(wideColor);
```

### Clamp In-Place

You can also mutate in-place to avoid new allocations.

```ts
import { parseColor, clampColor, dropColor } from '@kayxean/chromatrix';

const mutable = parseColor('oklch(90% 0.4 120)');
clampColor(mutable, true);

dropColor(mutable);
```

## Interactive Pickers

Building a UI requires bridging flat values (like slider percentages) to complex matrices. The `createPicker` utility handles the math and the state sync.

```ts
import { createPicker, toPicker, fromPicker, dropColor } from '@kayxean/chromatrix';

const picker = createPicker(parseColor('#32cd32'));

picker.update(0.5, 0.8, 'sv');
picker.update(0.75, 0, 'h');

const value = toPicker(parseColor('#ff00ff'));

const color = fromPicker({ h: 120, s: 0.8, v: 0.7, a: 1 }, 'rgb');

picker.dispose();
dropColor(color);
```

## Vision Simulation

Simulates how colors appear under Protanopia, Deuteranopia, or Tritanopia by projecting matrices into reduced color spaces.

```ts
import { parseColor, simulateDeficiency, dropColor } from '@kayxean/chromatrix';

const original = parseColor('#ff5500');
const simulated = simulateDeficiency(original, 'deuteranopia');

dropColor(original);
dropColor(simulated);
```

## The Math

Rather than writing thousands of individual conversion formulas, this library uses a _Hub_ and _Bridge_ architecture.

- **The Hubs**: Modern spaces (`rgb`, `oklab`) target **CIEXYZ D65**. Reference spaces (`lab`, `lch`) target **CIEXYZ D50**.
- **The Bridge**: When moving between hubs, we use a **Bradford CAT** (Chromatic Adaptation Transform). This prevents the "color shift" usually seen when switching between D50 and D65 standards.

By using a `Float32Array` pool, the library performs these complex matrix multiplications without triggering the garbage collector.

## Development

This project uses [Vite+](https://github.com/voidzero-dev/vite-plus) for building, testing, and development tooling.

| Command              | Description                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `vp pack`            | Transpiles and bundles the library into `dist/` using the Rolldown engine. |
| `vp pack --watch`    | Rebuilds your color utilities in real-time as you save changes.            |
| `vp test`            | Test the Vitest suite using the integrated test runner.                    |
| `vp test --coverage` | Runs tests and generates a 100% threshold V8 coverage report.              |
| `vp test bench`      | Runs performance benchmarks for matrix and color operations.               |
| `vp check`           | Analyzes the codebase for errors and style issues using Oxlint.            |
| `vp check --fix`     | Automatically fixes linting errors and formats code via Oxfmt.             |
