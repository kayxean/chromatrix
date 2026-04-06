# Chromatrix

A high-performance, heavy-duty color engine for the web. Designed for accuracy and efficiency, it uses `Float32Array` buffers and CIEXYZ hubs to ensure mathematically sound conversions without the memory overhead of typical object-heavy color libraries.

## Usage

Install via your preferred package manager:

```bash
# vite+
vp add @kayxean/chromatrix

# pnpm
pnpm add @kayxean/chromatrix

# npm
npm install @kayxean/chromatrix

# yarn
yarn add @kayxean/chromatrix

# bun
bun add @kayxean/chromatrix
```

## Core Library

The foundational API, exported from `@kayxean/chromatrix`. Covers buffer management, color space conversion, CSS parsing and formatting, and color object lifecycle. All functions operate on `Float32Array` buffers and managed `Color` objects using a shared pool.

### Matrix

Creates, clones, and manages `Float32Array` buffers and `Color` objects from the pool.

| Function                             | Parameters                                                       | Returns          |
| ------------------------------------ | ---------------------------------------------------------------- | ---------------- |
| `createMatrix(space?)`               | `space?: ColorSpace`                                             | `ColorMatrix<S>` |
| `dropMatrix(arr)`                    | `arr: ColorArray`                                                | `void`           |
| `createColor(space, values, alpha?)` | `space: S`, `values: [number, number, number]`, `alpha?: number` | `Color<S>`       |
| `dropColor(color)`                   | `color: Color`                                                   | `void`           |
| `cloneColor(color)`                  | `color: Color<S>`                                                | `Color<S>`       |
| `preallocatePool(size)`              | `size: number`                                                   | `void`           |
| `clearPool()`                        | —                                                                | `void`           |

```ts
const matrix = createMatrix('rgb');
const color = createColor('rgb', [0.5, 0.2, 0.8]);
dropMatrix(matrix);
dropColor(color);
```

### Convert

Transforms color values between any supported color space.

| Function                                | Parameters                                                    | Returns |
| --------------------------------------- | ------------------------------------------------------------- | ------- |
| `convertColor(input, output, from, to)` | `input: ColorArray`, `output: ColorArray`, `from: S`, `to: X` | `void`  |
| `convertHue(input, output, mode)`       | `input: ColorArray`, `output: ColorArray`, `mode: S`          | `void`  |

```ts
convertColor(input, output, 'rgb', 'oklab');
convertHue(input, output, 'lab');
```

### Format

Converts `Color` objects to CSS string representations.

| Function                               | Parameters                                                            | Returns  |
| -------------------------------------- | --------------------------------------------------------------------- | -------- |
| `formatCss(color, asHex?, precision?)` | `color: Color`, `asHex?: boolean`, `precision?: number` (default `2`) | `string` |
| `formatHex(r, g, b, a?)`               | `r: number`, `g: number`, `b: number`, `a?: number`                   | `string` |
| `roundTo(val, precision)`              | `val: number`, `precision: number`                                    | `number` |

```ts
const css = formatCss(color);
const hex = formatCss(color, true);
const hexStr = formatHex(1, 0, 0);
```

### Parse

Reads CSS color strings and hex values into `Color` objects.

| Function          | Parameters    | Returns                                          |
| ----------------- | ------------- | ------------------------------------------------ |
| `parseColor(css)` | `css: string` | `Color`                                          |
| `parseHex(hex)`   | `hex: string` | `{ r: number; g: number; b: number; a: number }` |

```ts
const color = parseColor('oklch(60% 0.15 30)');
const { r, g, b, a } = parseHex('#ff0000');
```

### Shared

Mutates or derives `Color` objects across different color spaces.

| Function                 | Parameters              | Returns               |
| ------------------------ | ----------------------- | --------------------- |
| `mutateColor(color, to)` | `color: Color`, `to: S` | `void` (in-place)     |
| `deriveColor(color, to)` | `color: Color`, `to: S` | `Color<S>` (new copy) |

```ts
mutateColor(color, 'oklch');
const converted = deriveColor(color, 'hsl');
```

## Utilities

Higher-level tools, imported from `@kayxean/chromatrix/utils/*`. Built on top of the core API for tasks like contrast checking, palette generation, gamut mapping, vision simulation, and gradient creation. These handle their own color object allocation — remember to `dropColor()` when done.

### Compare

Checks perceptual equality and calculates distance between colors.

| Function                    | Parameters                                                      | Returns   |
| --------------------------- | --------------------------------------------------------------- | --------- |
| `isEqual(a, b, tolerance?)` | `a: Color`, `b: Color`, `tolerance?: number` (default `0.0001`) | `boolean` |
| `getDistance(a, b)`         | `a: Color`, `b: Color`                                          | `number`  |

```ts
const match = isEqual(a, b);
const deltaE = getDistance(a, b);
```

### Contrast

Calculates APCA contrast scores and adjusts colors for readability.

| Function                                                | Parameters                                                                          | Returns                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `getLuminanceD65(color)`                                | `color: Color`                                                                      | `number`                                                                    |
| `checkContrast(text, background)`                       | `text: Color`, `background: Color`                                                  | `number` (APCA Lc score)                                                    |
| `getContrastRating(contrast)`                           | `contrast: number`                                                                  | `string` (`'platinum' \| 'gold' \| 'silver' \| 'bronze' \| 'ui' \| 'fail'`) |
| `matchContrast(color, background, targetContrast)`      | `color: Color<S>`, `background: Color`, `targetContrast: number`                    | `Color<S>`                                                                  |
| `checkContrastBulk(background, colors)`                 | `background: Color`, `colors: Color[]`                                              | `{ color, contrast, rating }[]`                                             |
| `matchScales(stops, background, targetContrast, steps)` | `stops: Color<S>[]`, `background: Color`, `targetContrast: number`, `steps: number` | `Color<S>[]`                                                                |

```ts
const score = checkContrast(text, bg);
const safe = matchContrast(color, bg, 75);
const rating = getContrastRating(score);
```

### Gamut

Detects out-of-gamut colors and clamps them to valid ranges.

| Function                        | Parameters                                              | Returns    |
| ------------------------------- | ------------------------------------------------------- | ---------- |
| `checkGamut(color, tolerance?)` | `color: Color`, `tolerance?: number` (default `0.0001`) | `boolean`  |
| `clampColor(color, mutate?)`    | `color: Color<S>`, `mutate?: boolean` (default `true`)  | `Color<S>` |

```ts
if (!checkGamut(color)) clampColor(color, true);
```

### Gradient

Generates CSS gradient strings from color stops.

| Function                                                   | Parameters                                                                              | Returns  |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------- |
| `createLinearGradient(options)`                            | `LinearGradientOptions`                                                                 | `string` |
| `createRadialGradient(options)`                            | `RadialGradientOptions`                                                                 | `string` |
| `createConicGradient(options)`                             | `ConicGradientOptions`                                                                  | `string` |
| `createSmoothGradient(start, end, steps, type?, options?)` | `start: Color`, `end: Color`, `steps: number`, `type?: GradientType`, `options?: {...}` | `string` |
| `createMultiColorGradient(colors, type?, options?)`        | `colors: Color[]`, `type?: GradientType`, `options?: {...}`                             | `string` |

```ts
const linear = createLinearGradient({ stops: [{ color: c1 }, { color: c2 }] });
const smooth = createSmoothGradient(red, blue, 5);
```

### Naming

Matches colors to CSS named colors by perceptual distance.

| Function                          | Parameters                           | Returns                                |
| --------------------------------- | ------------------------------------ | -------------------------------------- |
| `findClosestName(color)`          | `color: Color`                       | `{ name: string, distance: number }`   |
| `getExactName(color, tolerance?)` | `color: Color`, `tolerance?: number` | `string \| null`                       |
| `findSimilarNames(color, limit?)` | `color: Color`, `limit?: number`     | `{ name: string, distance: number }[]` |
| `parseColorName(name)`            | `name: string`                       | `Color \| null`                        |

```ts
const { name } = findClosestName(color);
const exact = getExactName(color);
```

### Palette

Generates color harmonies, scales, shades, and mixes.

| Function                          | Parameters                                                          | Returns                                  |
| --------------------------------- | ------------------------------------------------------------------- | ---------------------------------------- |
| `mixColor(start, end, t)`         | `start: Color<S>`, `end: Color<S>`, `t: number`                     | `Color<S>`                               |
| `createScales(stops, steps)`      | `stops: Color<S>[]`, `steps: number`                                | `Color<S>[]`                             |
| `createShades(start, end, steps)` | `start: Color<S>`, `end: Color<S>`, `steps: number`                 | `Color<S>[]`                             |
| `createHarmony(input, variants)`  | `input: Color<S>`, `variants: { name: string, ratios: number[] }[]` | `{ name: string, colors: Color<S>[] }[]` |

```ts
const mixed = mixColor(start, end, 0.5);
const ramp = createScales([c1, c2], 5);
```

### Picker

Maps 2D UI coordinates to color values for interactive selectors.

| Method                        | Parameters                                           | Returns                    |
| ----------------------------- | ---------------------------------------------------- | -------------------------- |
| `createPicker(init, target?)` | `init: Color`, `target?: ColorSpace`                 | `PickerInstance`           |
| `picker.update(x, y, type)`   | `x: number`, `y: number`, `type: 'sv' \| 'h' \| 'a'` | `void`                     |
| `picker.assign(next)`         | `next: Color`                                        | `void`                     |
| `picker.subscribe(fn)`        | `fn: PickerSubscriber`                               | `() => void` (unsubscribe) |
| `picker.setSpace(nextSpace)`  | `nextSpace: ColorSpace`                              | `void`                     |
| `picker.getValue()`           | —                                                    | `PickerValue`              |
| `picker.getSpace()`           | —                                                    | `ColorSpace`               |
| `picker.getHue()`             | —                                                    | `number`                   |
| `picker.getSaturation()`      | —                                                    | `number`                   |
| `picker.getBrightness()`      | —                                                    | `number`                   |
| `picker.getAlpha()`           | —                                                    | `number`                   |
| `picker.getSolid()`           | —                                                    | `Color`                    |
| `picker.getColor()`           | —                                                    | `Color`                    |
| `picker.dispose()`            | —                                                    | `void`                     |
| `toPicker(color)`             | `color: Color`                                       | `PickerValue`              |
| `fromPicker(val, space)`      | `val: PickerValue`, `space: S`                       | `Color`                    |

```ts
const picker = createPicker(color);
picker.update(0.5, 0.8, 'sv');
const coords = toPicker(color);
```

### Simulate

Projects colors into reduced spaces to simulate color vision deficiencies.

| Function                          | Parameters                                          | Returns    |
| --------------------------------- | --------------------------------------------------- | ---------- |
| `simulateDeficiency(color, type)` | `color: Color<S>`, `type: DeficiencyType \| 'none'` | `Color<S>` |

```ts
const simulated = simulateDeficiency(color, 'deuteranopia');
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
