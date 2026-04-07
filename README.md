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

```ts
export type ColorSpace =
  | 'rgb'
  | 'hsl'
  | 'hsv'
  | 'hwb'
  | 'lab'
  | 'lch'
  | 'lrgb'
  | 'oklab'
  | 'oklch'
  | 'xyz50'
  | 'xyz65';

export type ColorArray = Float32Array & { readonly __length: 3 };

export type ColorMatrix<S extends ColorSpace = ColorSpace> = ColorArray & {
  readonly __space: S;
};

export type Color<S extends ColorSpace = ColorSpace> = {
  space: S;
  value: ColorMatrix<S>;
  alpha?: number;
};
```

#### createMatrix()

Retrieves a `Float32Array` buffer from the object pool, or creates a new one if the pool is empty. These buffers are the underlying storage for color values throughout the library.

```ts
function createMatrix<S extends ColorSpace>(space?: S): ColorMatrix<S>;
```

- `space` — The color space to initialize the matrix for. If not provided, defaults to `'rgb'`. This determines how the buffer will be interpreted when used in conversions.

```ts
const matrix = createMatrix('rgb');
// matrix is a Float32Array(3) with __space: 'rgb'

const oklabMatrix = createMatrix('oklab');
// matrix is a Float32Array(3) with __space: 'oklab'

dropMatrix(matrix); // Required to return buffer to pool
dropMatrix(oklabMatrix);
```

---

#### dropMatrix()

Returns a `Float32Array` buffer to the object pool for reuse. This is critical for performance — always return buffers when you're done to avoid allocations.

```ts
function dropMatrix(arr: ColorArray): void;
```

- `arr` — The buffer to return to the pool. Must have been obtained from `createMatrix`.

```ts
const matrix = createMatrix('rgb');
// ... use the matrix ...
dropMatrix(matrix); // Required to return buffer to pool
```

---

#### createColor()

Creates a full `Color` object with a space, value buffer, and optional alpha. This is the primary way to instantiate colors for use with the library. The color's value buffer is obtained from the pool.

```ts
function createColor<S extends ColorSpace>(
  space: S,
  values: [number, number, number] | Float32Array | ColorArray,
  alpha?: number,
): Color<S>;
```

- `space` — The color space the color belongs to (e.g., `'rgb'`, `'oklch'`, `'lab'`).
- `values` — An array or tuple of three numbers representing the color components. The expected range depends on the space (e.g., RGB expects 0-1, OKLCH expects L in 0-1, C in 0-0.4, H in 0-360).
- `alpha` — Optional alpha value from 0 to 1. Defaults to 1 (fully opaque).

```ts
const red = createColor('rgb', [1, 0, 0]);
const transparentBlue = createColor('oklch', [0.5, 0.2, 240], 0.5);

dropColor(red); // Required to return buffer to pool
dropColor(transparentBlue);
```

---

#### dropColor()

Releases a `Color` object's underlying buffer back to the pool. Always call this when you're done with a color to prevent memory leaks.

```ts
function dropColor(color: Color): void;
```

- `color` — The color object to release. Its internal buffer is returned to the pool.

```ts
const color = createColor('rgb', [0.5, 0.2, 0.8]);
// ... use the color ...
dropColor(color); // Required to return buffer to pool
```

---

#### cloneColor()

Creates a deep copy of a `Color` object, including its value buffer and alpha. Both the new color and its buffer are obtained from the pool — the original is not modified.

```ts
function cloneColor<S extends ColorSpace>(color: Color<S>): Color<S>;
```

- `color` — The color to clone.

```ts
const original = createColor('rgb', [0.5, 0.2, 0.8]);
const copy = cloneColor(original);
// original and copy are independent Color objects

dropColor(original); // Required to return buffers to pool
dropColor(copy);
```

---

#### preallocatePool()

Pre-warms the object pool by allocating a specific number of `Float32Array` buffers upfront. Useful if you know you'll create many colors in a burst and want to avoid allocations during the intensive phase.

```ts
function preallocatePool(size: number): void;
```

- `size` — The number of buffers to pre-allocate. Maximum is 256; requests beyond this are clamped.

```ts
// Allocate 50 buffers ahead of time
preallocatePool(50);
```

---

#### clearPool()

Empties the entire object pool, freeing all pre-allocated buffers. Call this when you want to release memory explicitly, such as at the end of a processing batch.

```ts
function clearPool(): void;
```

```ts
// After processing is done
clearPool();
```

> [!IMPORTANT]
> **Pool Limit:** The pool has a maximum of 256 buffers. When exhausted, new allocations fall back to standard garbage-collected `Float32Array`.

---

### Convert

Converts color values between spaces using CIEXYZ hubs.

```ts
export type ColorAdapter = (input: ColorArray, output: ColorArray) => void;
```

#### convertColor()

Converts a color from one color space to another by routing through the appropriate hub (CIEXYZ D50 or D65) with a Bradford chromatic adaptation transform when needed. This is the core conversion engine that powers all higher-level operations.

```ts
function convertColor<S extends ColorSpace, X extends ColorSpace>(
  input: ColorArray,
  output: ColorArray,
  from: S,
  to: X,
): void;
```

- `input` — The source color values as a Float32Array.
- `output` — The destination buffer to write the converted values into. Can be the same as input for in-place conversion.
- `from` — The source color space (e.g., `'rgb'`, `'oklch'`, `'lab'`).
- `to` — The target color space.

```ts
const input = createMatrix('rgb');
input.set([0.5, 0.2, 0.8]);

const output = createMatrix('oklch');
convertColor(input, output, 'rgb', 'oklch');
// output now contains OKLCH values
```

---

#### convertHue()

Converts a color to its polar representation (HSL, LCH, or OKLCH) to access or manipulate the hue component. Useful when you need to work with hue angles regardless of the original color space.

```ts
function convertHue<S extends ColorSpace>(input: ColorArray, output: ColorArray, mode: S): void;
```

- `input` — The source color values.
- `output` — The destination buffer for the polar-space representation.
- `mode` — The target polar space. Must be one of `'rgb'`, `'hsl'`, `'lab'`, `'lch'`, `'lrgb'`, `'oklab'`, or `'oklch'`.

```ts
const input = createMatrix('rgb');
input.set([1, 0, 0]);

const polar = createMatrix('hsl');
convertHue(input, polar, 'rgb');
// polar now contains HSL values where polar[0] is the hue angle
```

---

### Format

Converts `Color` objects to CSS string representations.

```ts
export type ColorMode = 'hex' | Exclude<ColorSpace, 'hsv' | 'lrgb' | 'xyz65' | 'xyz50'>;
```

#### formatCss()

Formats a `Color` object as a CSS color string. Supports all color spaces and can output as hex on demand. Uses configurable precision for numeric values.

```ts
function formatCss(color: Color, asHex?: boolean, precision?: number): string;
```

- `color` — The Color object to format.
- `asHex` — If true and the color is in RGB space, output as hex string instead of functional notation. Defaults to false.
- `precision` — Number of decimal places for numeric values. Defaults to 2.

```ts
const color = createColor('oklch', [0.6, 0.15, 30]);
formatCss(color); // "oklch(60% 0.15 30deg)"
formatCss(color, true); // "#9e5cb3"
formatCss(color, false, 3); // "oklch(60% 0.150 30deg)"
```

---

#### formatHex()

Formats raw RGB values as a hex color string. Low-level utility that operates on 0-255 integers rather than Color objects.

```ts
function formatHex(r: number, g: number, b: number, a?: number): string;
```

- `r` — Red component (0-255).
- `g` — Green component (0-255).
- `b` — Blue component (0-255).
- `a` — Optional alpha component (0-255). If provided and less than 255, outputs 8-digit hex with alpha.

```ts
formatHex(255, 0, 0); // "#ff0000"
formatHex(255, 0, 0, 128); // "#ff000080"
```

---

#### roundTo()

Rounds a number to a specific number of decimal places without the floating-point artifacts of `toFixed`. Used internally for consistent CSS output.

```ts
function roundTo(val: number, precision: number): number;
```

- `val` — The number to round.
- `precision` — Number of decimal places (0-15).

```ts
roundTo(0.1566666666, 2); // 0.16
roundTo(0.9999999, 3); // 1
```

---

### Parse

Reads CSS color strings and hex values into `Color` objects.

#### parseColor()

Parses any valid CSS color string — hex, named colors, or functional notation — into a `Color` object. Supports spaces like rgb, hsl, hwb, lab, lch, oklab, oklch, and xyz-d50/d65.

```ts
function parseColor(css: string): Color;
```

- `css` — The CSS color string to parse. Can be hex (#f00, #ff000080), named (red), or functional (rgb(255 0 0), oklch(60% 0.15 30)).

```ts
const color = parseColor('oklch(60% 0.15 30)');
const hexColor = parseColor('#ff000080');

dropColor(color); // Required to return buffer to pool
dropColor(hexColor);
```

---

#### parseHex()

Parses a hex color string into its RGBA components. Low-level parser that handles 3, 4, 6, and 8-digit hex strings.

```ts
function parseHex(hex: string): { r: number; g: number; b: number; a: number };
```

- `hex` — The hex string (with or without the # prefix).

```ts
parseHex('#ff0000'); // { r: 255, g: 0, b: 0, a: 255 }
parseHex('f00'); // { r: 255, g: 0, b: 0, a: 255 }
parseHex('#ff000080'); // { r: 255, g: 0, b: 0, a: 128 }
```

---

### Shared

Mutates or derives `Color` objects across different color spaces.

#### mutateColor()

Converts a color to a different color space in-place, modifying the original Color object. More efficient than `deriveColor` when you don't need to preserve the original.

```ts
function mutateColor<S extends ColorSpace>(color: Color, to: S): void;
```

- `color` — The color to convert. Its `space` and `value` will be overwritten.
- `to` — The target color space.

```ts
const color = createColor('rgb', [0.5, 0.2, 0.8]);
mutateColor(color, 'oklch');
// color is now in OKLCH space
```

---

#### deriveColor()

Creates a new Color in a different color space without modifying the original. Use this when you need to keep the source color intact.

```ts
function deriveColor<S extends ColorSpace>(color: Color, to: S): Color<S>;
```

- `color` — The source color.
- `to` — The target color space.

```ts
const original = createColor('rgb', [0.5, 0.2, 0.8]);
const converted = deriveColor(original, 'oklch');
// original is still RGB, converted is OKLCH

dropColor(original); // Required to return buffers to pool
dropColor(converted);
```

---

## Utilities

Higher-level tools, imported from `@kayxean/chromatrix/utils/*`. Built on top of the core API for tasks like contrast checking, palette generation, gamut mapping, vision simulation, and gradient creation. These handle their own color object allocation — remember to `dropColor()` when done.

### Compare

Checks perceptual equality and calculates distance between colors.

#### isEqual()

Checks if two colors are perceptually equal, accounting for different color spaces and alpha. Converts to a common space internally if needed. The tolerance defaults to 0.0001 which is suitable for most use cases.

```ts
function isEqual(a: Color, b: Color, tolerance?: number): boolean;
```

- `a` — First color to compare.
- `b` — Second color to compare.
- `tolerance` — Maximum allowed difference. Defaults to 0.0001.

> [!NOTE]
> Tolerance applies per-channel, comparing absolute difference against the threshold.

```ts
const a = createColor('rgb', [1, 0, 0]);
const b = createColor('oklch', [0.6, 0.2, 30]);
isEqual(a, b); // false — they're different colors
```

---

#### getDistance()

Calculates the perceptual distance between two colors using OKLAB as the reference space. Returns a Delta-E-like metric where 0 means identical and larger values indicate greater difference.

```ts
function getDistance(a: Color, b: Color): number;
```

- `a` — First color.
- `b` — Second color.

```ts
const red = createColor('rgb', [1, 0, 0]);
const blue = createColor('rgb', [0, 0, 1]);
getDistance(red, blue); // Returns a value like 0.67
```

---

### Contrast

Calculates APCA contrast scores and adjusts colors for readability.

#### getLuminanceD65()

Extracts the relative luminance of a color in CIEXYZ D65 space. The Y component represents luminance. Used as the basis for contrast calculations.

```ts
function getLuminanceD65(color: Color): number;
```

- `color` — The color to measure.

```ts
const white = createColor('rgb', [1, 1, 1]);
getLuminanceD65(white); // 1
const black = createColor('rgb', [0, 0, 0]);
getLuminanceD65(black); // 0
```

---

#### checkContrast()

Calculates the APCA (Advanced Perceptual Contrast Algorithm) contrast score between a foreground and background color. Returns a signed value where positive is light-on-dark and negative is dark-on-light.

```ts
function checkContrast(text: Color, background: Color): number;
```

- `text` — The foreground color (e.g., text).
- `background` — The background color.

```ts
const text = createColor('rgb', [0, 0, 0]);
const bg = createColor('rgb', [1, 1, 1]);
checkContrast(text, bg); // Returns ~106 (platinum)
```

---

#### getContrastRating()

Converts a raw APCA contrast score into a human-readable rating. Useful for accessibility compliance checks.

```ts
function getContrastRating(contrast: number): string;
```

- `contrast` — The raw contrast score from `checkContrast`.

```ts
getContrastRating(106); // "platinum"
getContrastRating(75); // "gold"
getContrastRating(45); // "bronze"
getContrastRating(20); // "fail"
```

---

#### matchContrast()

Adjusts a color's lightness to achieve a target contrast against a background. Maintains the hue and chroma while only modifying the L component in OKLCH.

```ts
function matchContrast<S extends ColorSpace>(
  color: Color<S>,
  background: Color,
  targetContrast: number,
): Color<S>;
```

- `color` — The color to adjust.
- `background` — The background to contrast against.
- `targetContrast` — The desired contrast score (e.g., 45 for AA compliance).

```ts
const color = createColor('rgb', [0.5, 0.2, 0.8]);
const bg = createColor('rgb', [1, 1, 1]);
const adjusted = matchContrast(color, bg, 45);
// adjusted now meets WCAG AA against white
```

---

#### checkContrastBulk()

Batch processes multiple colors against a single background, returning contrast scores and ratings for each. More efficient than calling `checkContrast` and `getContrastRating` separately.

```ts
function checkContrastBulk(
  background: Color,
  colors: Color[],
): { color: Color; contrast: number; rating: string }[];
```

- `background` — The background color to compare against.
- `colors` — An array of colors to check.

```ts
const bg = createColor('rgb', [1, 1, 1]);
const palette = [
  createColor('rgb', [0, 0, 0]),
  createColor('rgb', [0.5, 0.5, 0.5]),
  createColor('rgb', [1, 0, 0]),
];
checkContrastBulk(bg, palette);
// Returns array with contrast and rating for each
```

---

#### matchScales()

Generates a color scale and adjusts each step to meet a target contrast against a background. Useful for creating accessible color palettes.

```ts
function matchScales<S extends ColorSpace>(
  stops: Color<S>[],
  background: Color,
  targetContrast: number,
  steps: number,
): Color<S>[];
```

- `stops` — Endpoint colors for the scale.
- `background` — The background to contrast against.
- `targetContrast` — Desired contrast score.
- `steps` — Number of colors to generate.

```ts
const stops = [createColor('rgb', [0.1, 0.1, 0.1]), createColor('rgb', [0.9, 0.9, 0.9])];
const scale = matchScales(stops, createColor('rgb', [1, 1, 1]), 45, 5);
// Returns 5 colors that each meet 45 contrast on white
```

---

### Gamut

Detects out-of-gamut colors and clamps them to valid ranges.

#### checkGamut()

Checks whether a color is within the valid range for its color space. For RGB-related spaces, this effectively checks sRGB gamut. Useful for detecting colors that can't be accurately represented in a target space.

```ts
function checkGamut(color: Color, tolerance?: number): boolean;
```

- `color` — The color to check.
- `tolerance` — Small buffer for floating-point comparison. Defaults to 0.0001.

```ts
const inGamut = createColor('oklch', [1, 0.5, 300]);
checkGamut(inGamut); // true or false depending on whether it's in sRGB

const outOfGamut = createColor('oklch', [1, 0.4, 0]);
checkGamut(outOfGamut); // false — high chroma in LCH can exceed sRGB
```

---

#### clampColor()

Clamps a color's values to the valid range for its color space. Useful for colors that have been converted from a wider gamut space and now contain invalid values. Can operate in-place or return a new color.

```ts
function clampColor<S extends ColorSpace>(color: Color<S>, mutate?: boolean): Color<S>;
```

- `color` — The color to clamp.
- `mutate` — If true, modifies the color in-place. If false (default), returns a new color. Defaults to true.

```ts
const color = createColor('oklch', [1, 0.6, 180]);
// If chroma exceeds sRGB, it gets reduced:
const clamped = clampColor(color, false);
```

---

### Gradient

Generates CSS gradient strings from color stops.

```ts
export type GradientType = 'linear' | 'radial' | 'conic';

export type GradientStop = {
  color: Color;
  position?: number;
};

export type LinearGradientOptions = {
  angle?: number;
  stops: GradientStop[];
};

export type RadialGradientOptions = {
  shape?: 'circle' | 'ellipse';
  position?: string;
  stops: GradientStop[];
};

export type ConicGradientOptions = {
  angle?: number;
  position?: string;
  stops: GradientStop[];
};
```

#### createLinearGradient()

Creates a CSS linear gradient string from a set of color stops.

```ts
function createLinearGradient(options: LinearGradientOptions): string;
```

- `options` — An object with `angle` (degrees, defaults to 180) and `stops` (array of colors with optional positions).

```ts
const gradient = createLinearGradient({
  angle: 45,
  stops: [
    { color: createColor('rgb', [1, 0, 0]) },
    { color: createColor('rgb', [0, 0, 1]), position: 100 },
  ],
});
// "linear-gradient(45deg, rgb(255 0 0), rgb(0 0 255) 100%)"
```

---

#### createRadialGradient()

Creates a CSS radial gradient string.

```ts
function createRadialGradient(options: RadialGradientOptions): string;
```

- `options` — An object with `shape` ('circle' or 'ellipse'), `position` (CSS position), and `stops`.

```ts
const gradient = createRadialGradient({
  shape: 'circle',
  position: 'center',
  stops: [{ color: createColor('rgb', [1, 1, 0]) }, { color: createColor('rgb', [0, 0, 1]) }],
});
```

---

#### createConicGradient()

Creates a CSS conic gradient string.

```ts
function createConicGradient(options: ConicGradientOptions): string;
```

- `options` — An object with `angle` (starting angle), `position`, and `stops`.

```ts
const gradient = createConicGradient({
  angle: 0,
  position: 'center',
  stops: [{ color: createColor('rgb', [1, 0, 0]) }, { color: createColor('rgb', [0, 1, 0]) }],
});
```

---

#### createSmoothGradient()

Generates a gradient with interpolated color steps between two endpoints. Automatically handles color mixing and generates the appropriate CSS gradient string. Internally creates colors that must be dropped.

```ts
function createSmoothGradient(
  start: Color,
  end: Color,
  steps: number,
  type?: GradientType,
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string;
```

- `start` — Starting color.
- `end` — Ending color.
- `steps` — Number of color stops (minimum 2).
- `type` — Type of gradient: 'linear', 'radial', or 'conic'. Defaults to 'linear'.
- `options` — Additional options for the gradient type.

```ts
const start = createColor('rgb', [1, 0, 0]);
const end = createColor('rgb', [0, 0, 1]);
const gradient = createSmoothGradient(start, end, 5);
```

---

#### createMultiColorGradient()

Creates a gradient that passes through multiple colors in sequence. Each color is evenly spaced by default.

```ts
function createMultiColorGradient(
  colors: Color[],
  type?: GradientType,
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string;
```

- `colors` — Array of colors to interpolate between.
- `type` — Type of gradient. Defaults to 'linear'.
- `options` — Additional options for the gradient.

```ts
const colors = [
  createColor('rgb', [1, 0, 0]),
  createColor('rgb', [0, 1, 0]),
  createColor('rgb', [0, 0, 1]),
];
const gradient = createMultiColorGradient(colors);
```

---

### Naming

Matches colors to CSS named colors by perceptual distance.

#### findClosestName()

Finds the closest CSS named color (like 'red', 'steelblue', 'wheat') to a given color using perceptual distance in OKLAB space.

```ts
function findClosestName(color: Color): { name: string; distance: number };
```

- `color` — The color to match.

```ts
const color = createColor('rgb', [0.9, 0.1, 0.1]);
findClosestName(color); // { name: "crimson", distance: 0.12 }
```

---

#### getExactName()

Returns a CSS color name only if the color is an exact perceptual match within the tolerance. More strict than `findClosestName`.

```ts
function getExactName(color: Color, tolerance?: number): string | null;
```

- `color` — The color to match.
- `tolerance` — Maximum allowed distance. Defaults to 0.001.

```ts
const red = createColor('rgb', [1, 0, 0]);
getExactName(red); // "red"

const slightlyOff = createColor('rgb', [0.99, 0.01, 0.01]);
getExactName(slightlyOff); // null — not close enough
```

---

#### findSimilarNames()

Finds multiple similar CSS named colors sorted by perceptual distance. Useful for showing "did you mean" suggestions.

```ts
function findSimilarNames(color: Color, limit?: number): { name: string; distance: number }[];
```

- `color` — The color to match.
- `limit` — Maximum number of results. Defaults to 5.

```ts
const color = createColor('rgb', [0.3, 0.5, 0.8]);
findSimilarNames(color, 3);
// Returns like: [{ name: "steelblue", distance: 0.1 }, ...]
```

---

#### parseColorName()

Parses a CSS named color string into a Color object. The reverse of `getExactName` — takes 'red' and returns a Color in RGB space.

```ts
function parseColorName(name: string): Color | null;
```

- `name` — The named color (case-insensitive).

```ts
const color = parseColorName('cornflowerblue');
// Returns Color in RGB space with RGB values
```

---

### Palette

Generates color harmonies, scales, shades, and mixes.

#### mixColor()

Interpolates between two colors in their native color space. Handles hue correctly for polar spaces (LCH, OKLCH) by taking the shortest path around the hue wheel.

> [!IMPORTANT]
> Interpolation occurs in the native space of the `start` color.

```ts
function mixColor<S extends ColorSpace>(start: Color<S>, end: Color<S>, t: number): Color<S>;
```

- `start` — Starting color.
- `end` — Ending color.
- `t` — Interpolation factor from 0 (start) to 1 (end). Values outside 0-1 are clamped.

```ts
const start = createColor('oklch', [0.5, 0.1, 200]);
const end = createColor('oklch', [0.8, 0.3, 200]);
const mid = mixColor(start, end, 0.5);
// Returns a color halfway between

dropColor(start); // Required to return buffers to pool
dropColor(end);
dropColor(mid);
```

---

#### createScales()

Creates a multi-stop color scale by interpolating between sequential stop pairs. If you provide 3 colors and request 9 steps, you'll get a scale that smoothly transitions through all three.

```ts
function createScales<S extends ColorSpace>(stops: Color<S>[], steps: number): Color<S>[];
```

- `stops` — Array of colors defining the scale endpoints.
- `steps` — Total number of colors to generate.

```ts
const stops = [
  createColor('rgb', [1, 0, 0]),
  createColor('rgb', [0, 1, 0]),
  createColor('rgb', [0, 0, 1]),
];
const scale = createScales(stops, 7);
// Returns 7 colors transitioning red -> green -> blue
```

---

#### createShades()

Creates a simple two-stop shade scale between a dark and light endpoint. Unlike `createScales`, this only interpolates between exactly two colors.

```ts
function createShades<S extends ColorSpace>(
  start: Color<S>,
  end: Color<S>,
  steps: number,
): Color<S>[];
```

- `start` — The darker color.
- `end` — The lighter color.
- `steps` — Number of shades to generate.

```ts
const dark = createColor('oklch', [0.1, 0.05, 200]);
const light = createColor('oklch', [0.95, 0.1, 200]);
const shades = createShades(dark, light, 5);
// Returns 5 colors from dark to light
```

---

#### createHarmony()

Generates color harmonies by rotating the hue around the color wheel. You specify variant names and hue rotation ratios (in degrees), and it returns colors for each variant.

```ts
function createHarmony<S extends ColorSpace>(
  input: Color<S>,
  variants: { name: string; ratios: number[] }[],
): { name: string; colors: Color<S>[] }[];
```

- `input` — The base color to create harmonies from.
- `variants` — Array of harmony definitions, each with a name and array of hue ratios.

```ts
const base = createColor('oklch', [0.6, 0.15, 30]);
const harmonies = createHarmony(base, [
  { name: 'complementary', ratios: [180] },
  { name: 'triadic', ratios: [120, 240] },
  { name: 'analogous', ratios: [-30, 30] },
]);
// Returns array of harmony groups with colors
```

---

### Picker

Maps 2D UI coordinates to color values for interactive selectors.

```ts
export type PickerValue = {
  h: number; // hue (0-360)
  s: number; // saturation (0-1)
  v: number; // value/brightness (0-1)
  a: number; // alpha (0-1)
};

export type PickerSubscriber = (val: PickerValue, color: Color) => void;
```

#### createPicker()

Creates an interactive picker instance for building color UI controls. Maintains internal state for hue, saturation, value, and alpha that can be updated via mouse/touch events.

```ts
function createPicker(init: Color, target?: ColorSpace): PickerInstance;
```

- `init` — Initial color to seed the picker.
- `target` — Optional target color space for output.

```ts
const color = createColor('rgb', [0.5, 0.2, 0.8]);
const picker = createPicker(color);

// Update saturation/value from mouse position
picker.update(0.8, 0.3, 'sv');

// Subscribe to changes
const unsubscribe = picker.subscribe((val, color) => {
  console.log(color); // Current Color object
});

// Clean up when done
picker.dispose();
```

> [!IMPORTANT]
> `dispose()` releases internal Color objects back to the pool.

---

#### toPicker()

Converts a Color object to HSV picker coordinates. Useful for reading a color into picker-style values.

```ts
function toPicker(color: Color): PickerValue;
```

- `color` — The color to convert.

```ts
const color = createColor('rgb', [0.5, 0.2, 0.8]);
const pickerValue = toPicker(color);
// { h: 262, s: 0.6, v: 0.8, a: 1 }
```

---

#### fromPicker()

Creates a Color from picker HSV coordinates. The inverse of `toPicker`.

```ts
function fromPicker<S extends ColorSpace>(val: PickerValue, space: S): Color;
```

- `val` — The picker value with h, s, v, a.
- `space` — The target color space for the output color.

```ts
const pickerValue = { h: 180, s: 0.5, v: 1, a: 1 };
const color = fromPicker(pickerValue, 'oklch');
// Returns Color in OKLCH space
```

---

### Simulate

Projects colors into reduced spaces to simulate color vision deficiencies.

#### simulateDeficiency()

Applies a color vision deficiency simulation matrix to project how colors appear to people with different types of color blindness. Uses scientifically-accurate transformation matrices.

```ts
function simulateDeficiency<S extends ColorSpace>(
  color: Color<S>,
  type: DeficiencyType | 'none',
): Color<S>;

export type DeficiencyType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
```

- `color` — The color to simulate.
- `type` — The type of deficiency: `'protanopia'` (red-blind), `'deuteranopia'` (green-blind), `'tritanopia'` (blue-blind), `'achromatopsia'` (total color blindness), or `'none'` to return a copy.

```ts
const normal = createColor('oklch', [0.6, 0.15, 30]);
const protanopia = simulateDeficiency(normal, 'tritanopia');
// Returns a Color showing how it looks to someone with tritanopia

dropColor(normal); // Required to return buffers to pool
dropColor(protanopia);
```

> [!WARNING]
> Values may exceed 0-1 range. Use `clampColor()` before `formatCss()` to ensure valid CSS output.

---

#### simulateAnomaly()

Applies a partial color vision deficiency simulation with variable severity. Blends between the original color and a full deficiency simulation based on the severity factor.

```ts
function simulateAnomaly<S extends ColorSpace>(
  color: Color<S>,
  type: Exclude<DeficiencyType, 'achromatopsia'>,
  severity: number,
): Color<S>;
```

- `color` — The color to simulate.
- `type` — The type of deficiency: `'protanopia'`, `'deuteranopia'`, or `'tritanopia'`. Note: Does not support `'achromatopsia'`.
- `severity` — The severity of the deficiency from 0 (no effect) to 1 (full deficiency). Defaults to 0.5.

```ts
const normal = createColor('oklch', [0.6, 0.15, 30]);
const mildProtanopia = simulateAnomaly(normal, 'protanopia', 0.25);
const fullProtanopia = simulateAnomaly(normal, 'protanopia', 1);

dropColor(normal); // Required to return buffers to pool
dropColor(mildProtanopia);
dropColor(fullProtanopia);
```

> [!WARNING]
> Values may exceed 0-1 range. Use `clampColor()` before `formatCss()` to ensure valid CSS output.

---

#### simulateAmbient()

Simulates ambient glare or washout effect by blending the color toward white based on intensity. Useful for accessibility and readability testing.

```ts
function simulateAmbient<S extends ColorSpace>(color: Color<S>, glareIntensity: number): Color<S>;
```

- `color` — The color to simulate.
- `glareIntensity` — The intensity of the glare from 0 (no effect/passthrough) to 1 (full washout/white). Defaults to 0.4.

```ts
const normal = createColor('oklch', [0.6, 0.15, 30]);
const mildGlare = simulateAmbient(normal, 0.4);
const intenseGlare = simulateAmbient(normal, 0.9);

dropColor(normal); // Required to return buffers to pool
dropColor(mildGlare);
dropColor(intenseGlare);
```

> [!WARNING]
> Values may exceed 0-1 range. Use `clampColor()` before `formatCss()` to ensure valid CSS output.

---

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
