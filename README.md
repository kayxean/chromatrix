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

Foundational API for buffer pool management, color space conversion, CSS parsing and formatting, and `Color` object lifecycle. All functions operate on `Float32Array` buffers using a shared pool for performance.

> [!CAUTION]
> Modifying the internal `value` buffer directly can bypass the library's space tracking. Always use `mutateColor()` or library utilities to ensure conversion integrity.

### Color

Creates, manages, and manipulates `Color` objects and their underlying `Float32Array` buffers.

#### createMatrix()

Retrieves a `Float32Array(3)` buffer from the object pool.

```ts
export function createMatrix(): Float32Array;
```

- This function retrieves the next available `Float32Array(3)` from the internal pre-allocated pool to avoid garbage collection.

```ts
const matrix = createMatrix();
```

> [!IMPORTANT]
> **Pool Limit:** The pool has a maximum of 2048 buffers. When exhausted, `createMatrix` returns a "dead cell" buffer.

#### dropMatrix()

Returns a `Float32Array` buffer to the object pool for reuse.

```ts
export function dropMatrix(arr: Float32Array): void;
```

- `arr`: The buffer to return to the pool.

```ts
dropMatrix(matrix);
```

> [!TIP]
> Always return buffers to the pool when finished to prevent "dead cells" caused by pool exhaustion.

#### mountMatrix()

Initializes the object pool with a specific number of pre-allocated buffers.

```ts
export function mountMatrix(size: number): void;
```

- `size`: Number of buffers to pre-allocate (max 2048).

```ts
mountMatrix(50);
```

#### clearMatrix()

Empties the entire object pool.

```ts
export function clearMatrix(): void;
```

- Resets the internal pool head to its initial state, effectively clearing all pre-allocated memory.

```ts
clearMatrix();
```

#### countMatrix()

Returns the number of buffers currently available in the pool.

```ts
export function countMatrix(): number;
```

- Returns the number of currently available (unclaimed) buffers in the internal object pool.

```ts
const count = countMatrix();
```

#### createColor()

Creates a `Color` object with a space, value buffer, and optional alpha.

```ts
export function createColor<S extends Space>(space: S, values: Float32Array, alpha = 1): Color<S>;
```

- `space`: The target color space.
- `values`: Float32Array with 3 color components.
- `alpha`: Optional alpha value (0 to 1). Defaults to `1`.

```ts
const red = createColor('rgb', new Float32Array([1, 0, 0]));
```

#### dropColor()

Releases a `Color` object's underlying buffer back to the pool.

```ts
export function dropColor<S extends Space>(color: Color<S>): void;
```

- `color`: The color object to release.

```ts
dropColor(red);
```

> [!TIP]
> Releasing colors back to the pool is critical in high-frequency operations like animations or real-time color picking.

#### cloneColor()

Creates a deep copy of a `Color` object using a new buffer from the pool.

```ts
export function cloneColor<S extends Space>(color: Color<S>): Color<S>;
```

- `color`: The color to clone.

```ts
const copy = cloneColor(original);
```

#### mutateColor()

Converts a color to a different space in-place, modifying the original object.

```ts
export function mutateColor<S extends Space>(color: Color<S>, to: S): asserts color is Color<S>;
```

- `color`: The color to convert.
- `to`: The target color space.

```ts
mutateColor(color, 'oklch');
```

> [!WARNING]
> This function performs in-place mutation. The input `color` object is modified directly and its `space` property is updated.

#### deriveColor()

Creates a new Color in a target space without modifying the original.

```ts
export function deriveColor<S extends Space, T extends Space>(color: Color<S>, to: T): Color<T>;
```

- `color`: The source color.
- `to`: The target color space.

```ts
const lch = deriveColor(rgb, 'oklch');
```

### Convert

#### convertColor()

Converts raw buffer values between spaces using CIEXYZ hubs.

```ts
export function convertColor(
  input: Float32Array,
  output: Float32Array,
  from: Space,
  to: Space,
): void;
```

- `input`: Source color values.
- `output`: Destination buffer (can be same as input).
- `from`: Source color space.
- `to`: Target color space.

```ts
convertColor(v1, v2, 'rgb', 'oklch');
```

### Format

#### formatCss()

Converts `Color` objects to CSS functional notation or hex strings.

```ts
export function formatCss<S extends Space>(color: Color<S>, asHex = false, precision = 2): string;
```

- `color`: The `Color` object to format.
- `asHex`: Output as hex string if space is 'rgb'.
- `precision`: Number of decimal places (default: 2).

```ts
formatCss(color, true); // "#ff0000"
```

### Parse

#### parseColor()

Parses any valid CSS color string into a `Color` object.

```ts
export function parseColor(s: string): Color<Space>;
```

- `s`: The CSS color string (hex, rgb, hsl, lab, lch, oklab, oklch, color()).

```ts
const color = parseColor('oklch(60% 0.15 30)');
```

> [!NOTE]
> `parseColor()` is the primary entry point for string parsing. It automatically detects and handles hex, functional notations (`rgb`, `hsl`, `lab`, `oklch`), and the `color()` function.

### Types

Core type definitions used across the library.

#### Space

The supported color spaces.

```ts
export type Space =
  | 'rgb'
  | 'hsl'
  | 'hsv'
  | 'hwb'
  | 'lab'
  | 'lch'
  | 'oklab'
  | 'oklch'
  | 'lrgb'
  | 'xyz50'
  | 'xyz65';
```

#### Color

The core color object.

```ts
export type Color<S extends Space> = {
  space: S;
  value: Float32Array;
  alpha: number;
};
```

#### Mutable

Utility type for in-place modifications.

```ts
export type Mutable<S extends Color<Space>> = { -readonly [K in keyof S]: S[K] };
```

## Utilities

Higher-level tools for color manipulation and analysis. Remember to `dropColor()` when done with generated objects.

### Adjust

In-place color adjustments using OKLCH or RGB space.

#### lighten()

Increases lightness in OKLCH space.

```ts
export function lighten(color: Color<Space>, ratio: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 to 1 (maximize lightness).

```ts
lighten(color, 0.2);
```

> [!WARNING]
> All adjustment functions (lighten, darken, saturate, etc.) mutate the input color object in-place and automatically convert it to `oklch` space for perceptual accuracy.

#### darken()

Decreases lightness in OKLCH space.

```ts
export function darken(color: Color<Space>, ratio: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 to 1 (minimize lightness).

```ts
darken(color, 0.2);
```

#### saturate()

Increases chroma in OKLCH space.

```ts
export function saturate(color: Color<Space>, ratio: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 to 1 (maximize chroma).

```ts
saturate(color, 0.2);
```

#### desaturate()

Decreases chroma in OKLCH space.

```ts
export function desaturate(color: Color<Space>, ratio: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 to 1 (minimize chroma).

```ts
desaturate(color, 0.2);
```

#### whiten()

Increases lightness and decreases chroma in OKLCH space.

```ts
export function whiten(color: Color<Space>, ratio: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 to 1 (maximize lightness, minimize chroma).

```ts
whiten(color, 0.2);
```

#### blacken()

Decreases lightness and chroma in OKLCH space.

```ts
export function blacken(color: Color<Space>, ratio: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 to 1 (minimize lightness and chroma).

```ts
blacken(color, 0.2);
```

#### rotate()

Rotates hue by specified degrees in OKLCH space.

```ts
export function rotate(color: Color<Space>, angle: number): void;
```

- `color`: Color to adjust (mutated in-place).
- `angle`: Degrees to rotate (0-360).

```ts
rotate(color, 45);
```

#### invert()

Inverts RGB components in linear RGB space.

```ts
export function invert(color: Color<Space>): void;
```

- `color`: Color to invert (mutated in-place).

```ts
invert(color);
```

#### matchLuminance()

Copies the lightness component from source to target in OKLCH space.

```ts
export function matchLuminance(source: Color<Space>, target: Color<Space>): void;
```

- `source`: Lightness source color.
- `target`: Color to overwrite (mutated in-place).

```ts
matchLuminance(source, target);
```

### Analyze

Perceptual analysis and chromatic adaptation.

#### getDistance()

Calculates perceptual distance between two colors.

```ts
export function getDistance(
  colorA: Color<Space>,
  colorB: Color<Space>,
  method: 'oklab' | 'deltaE2000' | 'itp' = 'oklab',
): number;
```

- `colorA`, `colorB`: Colors to compare.
- `method`: Distance metric (default: `'oklab'`).

```ts
const dist = getDistance(c1, c2, 'deltaE2000');
```

> [!TIP]
> `oklab` is the fastest method and recommended for most UI tasks. `itp` (ICtCp) is highly accurate for high-dynamic-range content.

#### sortColors()

Sorts an array of colors by perceptual attributes or distance.

```ts
export function sortColors(
  colors: Readonly<Color<Space>[]>,
  by: 'luminance' | 'hue' | 'chroma' | 'distance',
  target?: Color<Space>,
): Color<Space>[];
```

- `colors`: Array of colors to sort.
- `by`: Attribute to sort by.
- `target`: Reference color for `'distance'` sorting.

```ts
const sorted = sortColors(palette, 'luminance');
```

#### averageColor()

Calculates the perceptual average of an array of colors.

```ts
export function averageColor(colors: Readonly<Color<Space>[]>): Color<Space>;
```

- `colors`: Array of colors to average.

```ts
const avg = averageColor([c1, c2, c3]);
```

> [!NOTE]
> `averageColor()` performs calculation in Oklab space to ensure the resulting average is perceptually balanced and avoids hue shifts.

#### adaptColor()

Applies Chromatic Adaptation Transform (Bradford CAT).

```ts
export function adaptColor(
  color: Color<Space>,
  from: 'd65' | 'd50',
  to: 'd65' | 'd50',
): Color<Space>;
```

- `color`: Color to adapt.
- `from`, `to`: Source and target white points.

```ts
const adapted = adaptColor(color, 'd65', 'd50');
```

> [!IMPORTANT]
> `adaptColor()` utilizes the Bradford Chromatic Adaptation Transform, which is essential when mixing colors calibrated for different white points (e.g., standard sRGB D65 and print-standard D50).

#### isEqual()

Checks if two colors are perceptually identical.

```ts
export function isEqual<S extends Space, T extends Space>(
  a: Color<S>,
  b: Color<T>,
  tolerance = 0.001,
): boolean;
```

- `a`, `b`: Colors to compare.
- `tolerance`: Perceptual threshold (default: `0.001`).

```ts
const equal = isEqual(c1, c2, 0.001);
```

### Contrast

Accessibility and contrast scoring.

#### getContrast()

Calculates the APCA contrast score.

```ts
export function getContrast(text: Color<Space>, background: Color<Space>): number;
```

- `text`: Foreground color.
- `background`: Background color.

```ts
const score = getContrast(text, bg);
```

> [!NOTE]
> `getContrast()` uses the APCA (Accessible Perceptual Contrast Algorithm), which accounts for font weight and spatial frequency for more accurate accessibility scoring.

#### getContrastRating()

Converts a raw APCA score to a human-readable rating.

```ts
export function getContrastRating(
  score: number,
): 'platinum' | 'gold' | 'silver' | 'bronze' | 'ui' | 'fail';
```

- `score`: APCA contrast score.

```ts
const rating = getContrastRating(score);
```

#### getContrastRatio()

Calculates the standard WCAG 2.x contrast ratio.

```ts
export function getContrastRatio(colorA: Color<Space>, colorB: Color<Space>): number;
```

- `colorA`, `colorB`: Colors to compare.

```ts
const ratio = getContrastRatio(c1, c2);
```

#### isAccessible()

Checks if a color pair meets WCAG standards.

```ts
export function isAccessible(
  text: Color<Space>,
  background: Color<Space>,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText = false,
): boolean;
```

- `text`, `background`: Color pair to check.
- `level`: Accessibility level (default: `'AA'`).
- `isLargeText`: Whether text size is large (default: `false`).

```ts
const ok = isAccessible(text, bg, 'AAA', true);
```

#### matchContrast()

Adjusts a color's lightness to meet a target APCA contrast.

```ts
export function matchContrast(
  color: Color<Space>,
  background: Color<Space>,
  targetContrast: number,
): void;
```

- `color`: Color to adjust (mutated in-place).
- `background`: Reference background.
- `targetContrast`: Target APCA score.

```ts
matchContrast(color, bg, 75);
```

> [!WARNING]
> `matchContrast()` uses an iterative approach. If the background and target contrast range are physically impossible to reach in sRGB, the function will clamp to the closest possible value.

#### pickContrast()

Selects the color from an array with the highest contrast.

```ts
export function pickContrast(
  background: Color<Space>,
  options: Readonly<Color<Space>[]>,
): Color<Space>;
```

- `background`: Reference background.
- `options`: Array of candidate colors.

```ts
const best = pickContrast(bg, [c1, c2, c3]);
```

### Gamut

Range checking and clamping.

#### inGamut()

Checks if a color is within the valid sRGB gamut.

```ts
export function inGamut(color: Color<Space>, epsilon = 0.0001): boolean;
```

- `color`: Color to check.
- `epsilon`: Tolerance (default: `0.0001`).

```ts
if (!inGamut(color)) toGamut(color);
```

> [!IMPORTANT]
> Wide-gamut spaces like Oklab can represent colors outside the sRGB range. Use `toGamut()` before CSS formatting to ensure the color displays correctly on standard monitors.

#### toGamut()

Clamps a color's chroma in OKLCH space to fit within sRGB.

```ts
export function toGamut(color: Color<Space>): void;
```

- `color`: Color to clamp (mutated in-place).

```ts
toGamut(color);
```

#### clampRgb()

Clamps RGB values to 0-1 range.

```ts
export function clampRgb(color: Color<Space>): void;
```

- `color`: Color to clamp (mutated in-place).

```ts
clampRgb(color);
```

> [!NOTE]
> `clampRgb()` is intended for `rgb` and `lrgb` spaces. While `xyz50` and `xyz65` share a similar 0-1 range, clamping them directly with this function is not recommended as it may distort chromaticity.

#### clampHsv()

Clamps HSV values.

```ts
export function clampHsv(color: Color<Space>): void;
```

- `color`: Color to clamp (mutated in-place).

```ts
clampHsv(color);
```

> [!NOTE]
> `clampHsv()` is intended for `hsl`, `hsv`, and `hwb` spaces.

#### clampCartesian()

Clamps lightness for Cartesian spaces (lab, oklab).

```ts
export function clampCartesian(color: Color<Space>): void;
```

- `color`: Color to clamp (mutated in-place).

```ts
clampCartesian(color);
```

> [!NOTE]
> `clampCartesian()` is intended for `lab` and `oklab` spaces.

#### clampPolar()

Clamps polar space values (lightness, chroma, hue).

```ts
export function clampPolar(color: Color<Space>): void;
```

- `color`: Color to clamp (mutated in-place).

```ts
clampPolar(color);
```

> [!NOTE]
> `clampPolar()` is intended for `lch` and `oklch` spaces.

### Gradient

CSS gradient generation.

#### GradientType

Supported gradient interpolation types.

```ts
export type GradientType = 'linear' | 'radial' | 'conic';
```

#### GradientStop

Used for defining CSS gradient stops.

```ts
export type GradientStop = Readonly<{
  color: Color<Space>;
  position?: number;
}>;
```

#### createLinearGradient()

Creates a CSS linear gradient string.

```ts
export function createLinearGradient(stops: ReadonlyArray<GradientStop>, angle = 180): string;
```

- `stops`: Array of gradient stops.
- `angle`: Rotation angle (default: `180`).

```ts
const css = createLinearGradient([
  { color: c1, position: 0 },
  { color: c2, position: 100 },
]);
```

#### createRadialGradient()

Creates a CSS radial gradient string.

```ts
export function createRadialGradient(
  stops: ReadonlyArray<GradientStop>,
  shape = 'ellipse',
  position = 'center',
): string;
```

- `stops`: Array of gradient stops.
- `shape`: Gradient shape (default: `'ellipse'`).
- `position`: Origin position (default: `'center'`).

```ts
const css = createRadialGradient(stops, 'circle', 'center');
```

#### createConicGradient()

Creates a CSS conic gradient string.

```ts
export function createConicGradient(
  stops: ReadonlyArray<GradientStop>,
  angle = 0,
  position = 'center',
): string;
```

- `stops`: Array of gradient stops.
- `angle`: Starting angle (default: `0`).
- `position`: Center position (default: `'center'`).

```ts
const css = createConicGradient(stops, 0, 'center');
```

#### createSmoothGradient()

Generates a gradient with interpolated steps between two colors.

```ts
export function createSmoothGradient(
  start: Color<Space>,
  end: Color<Space>,
  steps: number,
  type: GradientType = 'linear',
  options?: Readonly<{ angle?: number; shape?: 'circle' | 'ellipse'; position?: string }>,
): string;
```

- `start`, `end`: Boundary colors.
- `steps`: Number of interpolation steps.
- `type`: Gradient type (default: `'linear'`).
- `options`: Display options (angle, shape, position).

```ts
const css = createSmoothGradient(red, blue, 10, 'linear');
```

#### createMultiColorGradient()

Creates a gradient passing through multiple colors in sequence.

```ts
export function createMultiColorGradient(
  colors: ReadonlyArray<Color<Space>>,
  type: GradientType = 'linear',
  options?: Readonly<{ angle?: number; shape?: 'circle' | 'ellipse'; position?: string }>,
): string;
```

- `colors`: Array of colors to include.
- `type`: Gradient type (default: `'linear'`).
- `options`: Display options.

```ts
const css = createMultiColorGradient([c1, c2, c3], 'conic');
```

### Palette

Color harmonies and scales.

#### mixColor()

Interpolates between two colors in polar space.

```ts
export function mixColor(colorA: Color<Space>, colorB: Color<Space>, ratio: number): void;
```

- `colorA`: Base color (mutated in-place).
- `colorB`: Target color to mix toward.
- `ratio`: Mix percentage (0 to 1).

```ts
mixColor(color, target, 0.5);
```

> [!TIP]
> `mixColor()` performs interpolation in Oklch space, which prevents the muddy gray transitions often seen in RGB-based color mixing.

#### mixSubtractive()

Subtractive color mixing in linear RGB space.

```ts
export function mixSubtractive(colorA: Color<Space>, colorB: Color<Space>, ratio = 0.5): void;
```

- `colorA`: Base color (mutated in-place).
- `colorB`: Target color.
- `ratio`: Mix percentage (default: `0.5`).

```ts
mixSubtractive(color, target, 0.5);
```

#### createHarmony()

Generates colors by rotating hue.

```ts
export function createHarmony(input: Color<Space>, ratios: Readonly<number[]>): Color<Space>[];
```

- `input`: Base color.
- `ratios`: Array of hue rotation offsets.

```ts
const triad = createHarmony(color, [120, 240]);
```

#### createScales()

Creates a multi-stop color scale.

```ts
export function createScales(stops: Readonly<Color<Space>[]>, steps: number): Color<Space>[];
```

- `stops`: Sequence of anchor colors.
- `steps`: Total colors to generate.

```ts
const scale = createScales([c1, c2, c3], 9);
```

#### createTints()

Generates tints from color to white.

```ts
export function createTints(color: Color<Space>, steps: number): Color<Space>[];
```

- `color`: Base color.
- `steps`: Number of tints to generate.

```ts
const tints = createTints(color, 5);
```

#### createShades()

Generates shades from color to black.

```ts
export function createShades(color: Color<Space>, steps: number): Color<Space>[];
```

- `color`: Base color.
- `steps`: Number of shades to generate.

```ts
const shades = createShades(color, 5);
```

#### createTonal()

Generates a full tonal scale.

```ts
export function createTonal(color: Color<Space>, steps = 9): Color<Space>[];
```

- `color`: Base color.
- `steps`: Total colors in the scale (default: `9`).

```ts
const tones = createTonal(color, 9);
```

> [!NOTE]
> By default, `createTonal()` generates a 9-step scale ranging from 0% to 100% lightness while preserving the input's hue and chroma in Oklch space.

### Picker

#### PickerFn

Callback type for interactive picker updates.

```ts
export type PickerFn = <S extends Space>(hsv: Color<S>) => void;
```

#### createPicker()

Creates an interactive picker instance with state management.

```ts
export function createPicker(color: Color<Space>): {
  update: (x: number, y: number, type: 'sv' | 'h' | 'a') => void;
  assign: (next: Color<Space>) => void;
  setHue: (h: number) => void;
  setSaturation: (s: number) => void;
  setValue: (v: number) => void;
  setAlpha: (a: number) => void;
  subscribe: (fn: PickerFn) => () => void;
  getState: () => Color<Space>;
  getValue: () => { h: number; s: number; v: number; a: number };
  getHue: () => number;
  getSaturation: () => number;
  getBrightness: () => number;
  getAlpha: () => number;
  getColor: () => Color<Space>;
  getSolid: () => Color<Space>;
  dispose: () => void;
};
```

- `color`: Initial color for the picker.

```ts
const picker = createPicker(color);
picker.subscribe((c) => console.log(formatCss(c)));
picker.update(0.5, 0.5, 'sv');
```

> [!IMPORTANT]
> You must call `.dispose()` when the picker is no longer needed (e.g., component unmount) to release its internal color buffer back to the shared pool.

### Simulate

Vision deficiency and environmental filters.

#### DeficiencyType

Supported color vision deficiency simulations.

```ts
export type DeficiencyType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
```

#### simulateDeficiency()

Applies color vision deficiency simulation.

```ts
export function simulateDeficiency(
  color: Color<Space>,
  type: DeficiencyType | 'none',
  severity: number = 1,
): void;
```

- `color`: Color to simulate (mutated in-place).
- `type`: Type of deficiency.
- `severity`: Intensity of the effect (default: `1`).

```ts
simulateDeficiency(color, 'protanopia', 1);
```

#### simulateAmbient()

Blends color toward white to simulate glare.

```ts
export function simulateAmbient(color: Color<Space>, intensity = 0.4): void;
```

- `color`: Color to simulate (mutated in-place).
- `intensity`: Glare intensity (default: `0.4`).

```ts
simulateAmbient(color, 0.4);
```

#### simulateNightMode()

Reduces saturation and value for night vision.

```ts
export function simulateNightMode(color: Color<Space>, intensity = 0.5): void;
```

- `color`: Color to simulate (mutated in-place).
- `intensity`: Filter intensity (default: `0.5`).

```ts
simulateNightMode(color, 0.5);
```

#### simulateLowLight()

Mixes color with luminance for low light simulation.

```ts
export function simulateLowLight(color: Color<Space>, darkness = 0.5): void;
```

- `color`: Color to simulate (mutated in-place).
- `darkness`: Environment darkness (default: `0.5`).

```ts
simulateLowLight(color, 0.5);
```

#### simulateCataract()

Reduces blue channel and adds fog for cataract simulation.

```ts
export function simulateCataract(color: Color<Space>, severity = 0.5): void;
```

- `color`: Color to simulate (mutated in-place).
- `severity`: Severity of cataract (default: `0.5`).

```ts
simulateCataract(color, 0.5);
```

#### simulateSunlight()

Blends color toward white for sunlight simulation.

```ts
export function simulateSunlight(color: Color<Space>, intensity = 0.7): void;
```

- `color`: Color to simulate (mutated in-place).
- `intensity`: Light intensity (default: `0.7`).

```ts
simulateSunlight(color, 0.7);
```

> [!WARNING]
> Simulated values may exceed 0-1 range. Use `clampRgb()` or `toGamut()` before formatting.

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
