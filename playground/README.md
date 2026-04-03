# Chromatrix

A high-performance, heavy-duty color engine for the web. Built with a zero-allocation slot-based architecture for maximum performance, using `Float32Array` buffers and smart hub routing to ensure mathematically sound conversions without the memory overhead of typical object-heavy color libraries.

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
- **Naming**: Finds closest CSS named colors using perceptual distance.
- **Gradients**: Generates CSS gradient strings from color stops.

## Usage

Install via your preferred package manager:

```bash
# vite+
vp add @kayxean/chromatrix

# pnpm
pnnpm add @kayxean/chromatrix

# npm
npm install @kayxean/chromatrix

# yarn
yarn add @kayxean/chromatrix

# bun
bun add @kayxean/chromatrix
```

## Low-Level Color

For maximum performance, use the slot-based API with shared buffers. Colors use a growable slot allocation system that automatically grows as needed. No manual pre-allocation required.

```ts
import { createColor, convertColor, dropColor } from '@kayxean/chromatrix';

const color = createColor('rgb', [0.7, 0.1, 0.9]);

convertColor(color, 'oklab');

dropColor(color);
```

## Color Objects

Everything is built on a `Color` object backed by a shared `Float32Array`. Colors must be manually freed when finished.

```ts
import { createColor, convertColor, dropColor } from '@kayxean/chromatrix';

const color = createColor('rgb', [0.5, 0.2, 0.8]);

convertColor(color, 'oklch');

dropColor(color);
```

## Color Management

Create colors with alpha values for transparency support.

```ts
import { createColor, dropColor } from '@kayxean/chromatrix';

const red = createColor('rgb', [1, 0, 0], 0.5);

const color = createColor('hsl', [240, 0.8, 0.6]);

dropColor(red);
dropColor(color);
```

## Validation

Validate CSS color strings before parsing for safe handling.

```ts
import { isValidColor, parseColor, dropColor } from '@kayxean/chromatrix';

const input = '#ff0000';

if (isValidColor(input)) {
  const color = parseColor(input);
  dropColor(color);
}
```

## CSS Integration

Validation is separate from parsing for maximum performance. Validate the CSS string before parsing.

```ts
import { isValidColor, parseColor, formatCss, dropColor } from '@kayxean/chromatrix';

const input = 'oklch(60% 0.2 120)';

if (isValidColor(input)) {
  const color = parseColor(input);
  const css = formatCss(color);

  const hex = formatCss(color, true);

  dropColor(color);
}
```

## Color Conversion

Direct transformations are handled through a chain of adapters. The system automatically determines if it can take a direct path or if it needs to route through a CIEXYZ hub.

```ts
import { createColor, convertColor, convertHue, dropColor } from '@kayxean/chromatrix';

const rgb = createColor('rgb', [0.7, 0.1, 0.9]);

convertColor(rgb, 'oklab');

const lab = createColor('lab', [50, 20, 30]);
convertHue(lab, 'lab');

dropColor(rgb);
dropColor(lab);
```

## Contrast & Accessibility

Forget the old WCAG ratio. This uses APCA to calculate a signed _Lc_ value based on font weight and background luminance.

```ts
import { checkContrast, matchContrast } from '@kayxean/chromatrix/utils/contrast';
import { createScales } from '@kayxean/chromatrix/utils/palette';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const text = parseColor('#ffffff');
const bg = parseColor('#222222');

const score = checkContrast(text, bg);

const redText = parseColor('#ff0000');
const blackBg = parseColor('#000000');
const safeRed = matchContrast(redText, blackBg, 75);

const scale = createScales([redText, blackBg], 5);

scale.forEach(dropColor);
dropColor(redText);
dropColor(blackBg);
dropColor(text);
dropColor(bg);
dropColor(safeRed);
```

### Bulk Contrast

Check contrast for multiple colors against a single background efficiently.

```ts
import { checkContrastBulk } from '@kayxean/chromatrix/utils/contrast';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const bg = parseColor('#333333');
const colorsToCheck = [parseColor('#ffffff'), parseColor('#cccccc'), parseColor('#666666')];

const results = checkContrastBulk(bg, colorsToCheck);

colorsToCheck.forEach(dropColor);
dropColor(bg);
```

### Contrast Rating

Get a human-readable readability tier based on the absolute APCA _Lc_ score.

```ts
import { getContrastRating } from '@kayxean/chromatrix/utils/contrast';

getContrastRating(75.2);
```

### Match Scales

Generate a color scale where each step meets a target contrast against a background.

```ts
import { matchScales } from '@kayxean/chromatrix/utils/contrast';
import { parseColor, dropColor } from '@kayxean/chromatrix';

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
  createShades,
  createScales,
  mixColor,
} from '@kayxean/chromatrix/utils/palette';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const baseColor = parseColor('#007bff');
const neighbors = createHarmony(baseColor, [
  { name: 'analogous', ratios: [-30, 30] },
  { name: 'complementary', ratios: [180] },
]);

const stops = [parseColor('#ff0000'), parseColor('#00ff00'), parseColor('#0000ff')];
const ramp = createScales(stops, 5);

const startColor = parseColor('rgb(255 0 0)');
const endColor = parseColor('rgb(0 0 255)');
const shades = createShades(startColor, endColor, 5);

const mixed = mixColor(startColor, endColor, 0.5);

neighbors.forEach((harmony) => {
  harmony.colors.forEach(dropColor);
});
ramp.forEach(dropColor);
shades.forEach(dropColor);
dropColor(mixed);
dropColor(startColor);
dropColor(endColor);
dropColor(baseColor);
stops.forEach(dropColor);
```

## Safety & Comparison

Colors that look the same in different spaces are treated as equal through a perceptual tolerance threshold. Clamp color values directly in the buffer to avoid new allocations.

```ts
import { checkGamut, clampColor } from '@kayxean/chromatrix/utils/gamut';
import { isEqual, getDistance } from '@kayxean/chromatrix/utils/compare';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const wideColor = parseColor('oklch(90% 0.4 120)');

if (!checkGamut(wideColor)) {
  clampColor(wideColor);
}

const match = isEqual(parseColor('rgb(255 0 0)'), parseColor('hsl(0 100% 50%)'));
const distance = getDistance(parseColor('#ff0000'), parseColor('#ffa500'));

dropColor(wideColor);
```

## Interactive Pickers

Building a UI requires bridging flat values (like slider percentages) to complex matrices. The `createPicker` utility handles the math and the state sync.

```ts
import { createPicker, toPicker, fromPicker } from '@kayxean/chromatrix/utils/picker';
import { parseColor, dropColor } from '@kayxean/chromatrix';

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
import { simulateDeficiency } from '@kayxean/chromatrix/utils/simulate';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const original = parseColor('#ff5500');
const simulated = simulateDeficiency(original, 'deuteranopia');

dropColor(original);
dropColor(simulated);
```

## Color Naming

Find the closest CSS named color using perceptual distance.

```ts
import {
  findClosestName,
  getExactName,
  findSimilarNames,
  parseColorName,
} from '@kayxean/chromatrix/utils/naming';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const color = parseColor('#ff0000');

const { name, distance } = findClosestName(color);
const exact = getExactName(color);
const similar = findSimilarNames(color, 3);
const parsed = parseColorName('red');

dropColor(color);
if (parsed) dropColor(parsed);
```

## CSS Gradients

Generate CSS gradient strings from color stops.

```ts
import {
  createLinearGradient,
  createRadialGradient,
  createConicGradient,
  createSmoothGradient,
  createMultiColorGradient,
} from '@kayxean/chromatrix/utils/gradient';
import { parseColor, dropColor } from '@kayxean/chromatrix';

const red = parseColor('#ff0000');
const blue = parseColor('#0000ff');

const linear = createLinearGradient({ stops: [{ color: red }, { color: blue }] });
const radial = createRadialGradient({
  shape: 'circle',
  stops: [{ color: red }, { color: blue }],
});
const conic = createConicGradient({ angle: 45, stops: [{ color: red }, { color: blue }] });
const smooth = createSmoothGradient(red, blue, 5);
const multi = createMultiColorGradient([red, parseColor('#00ff00'), blue]);

dropColor(red);
dropColor(blue);
```

## The Math

Rather than writing thousands of individual conversion formulas, this library uses a _Hub_ and _Bridge_ architecture.

- **The Hubs**: Modern spaces (`rgb`, `oklab`) target **CIEXYZ D65**. Reference spaces (`lab`, `lch`) target **CIEXYZ D50**.
- **The Bridge**: When moving between hubs, we use a **Bradford CAT** (Chromatic Adaptation Transform). This prevents the "color shift" usually seen when switching between D50 and D65 standards.
- **Smart Routing**: Direct paths are used when available (e.g., rgb→hsl via hsv) for maximum performance.

By using a slot-based shared buffer system, the library performs these complex matrix multiplications without triggering the garbage collector.

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
