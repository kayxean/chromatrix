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

### Convert

Converts color values between spaces using CIEXYZ hubs with a pathfinding algorithm to determine optimal conversion paths. Supports all 11 color spaces defined in `Space`.

```ts
export function convertColor(
  input: Float32Array,
  output: Float32Array,
  from: Space,
  to: Space,
): void;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix`.

#### convertColor()

Converts color values between spaces using CIEXYZ hubs with a pathfinding algorithm to determine optimal conversion paths.

- `input`: The source color values as a Float32Array.
- `output`: The destination buffer to write the converted values into. Can be the same as input for in-place conversion.
- `from`: The source color space (e.g., `'rgb'`, `'oklch'`, `'lab'`).
- `to`: The target color space.

```ts
const input = createMatrix();
input.set([0.5, 0.2, 0.8]);

const output = createMatrix();
convertColor(input, output, 'rgb', 'oklch');
// output now contains OKLCH values

dropMatrix(input);
dropMatrix(output);
```

---

### Format

Converts `Color` objects to CSS string representations. Supports all color spaces, configurable precision, and outputs `none` for NaN channel values (CSS Color Level 4 compliance).

> [!NOTE]
> When a channel value is `NaN`, it outputs the keyword `none` (e.g., `rgb(255 none 0 / none)`).

```ts
export function formatCss<S extends Space>(
  color: Color<S>,
  asHex?: boolean,
  precision?: number,
): string;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix`.

#### formatCss()

Converts `Color` objects to CSS string representations. Supports all color spaces, configurable precision, and outputs `none` for NaN channel values.

- `color`: The Color object to format.
- `asHex`: If true and the color is in RGB space, output as hex string instead of functional notation. Defaults to false.
- `precision`: Number of decimal places for numeric values. Defaults to 2.

```ts
const rgbColor = createColor('rgb', new Float32Array([0.62, 0.36, 0.7]));
formatCss(rgbColor, true); // "#9e5cb3"

const oklchColor = createColor('oklch', new Float32Array([0.6, 0.15, 30]));
formatCss(oklchColor); // "oklch(60% 0.15 30deg)"
formatCss(oklchColor, false, 3); // "oklch(60% 0.150 30deg)"

dropColor(rgbColor);
dropColor(oklchColor);
```

---

### Parse

Reads CSS color strings and hex values into `Color` objects. Supports hex strings, functional notation, and the `none` keyword for all supported color spaces.

```ts
export function parseColor(css: string): Color<Space>;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix`.

#### parseColor()

Parses any valid CSS color string into a `Color` object. Supports hex strings, functional notation, and the `none` keyword for missing channel values.

- `css`: The CSS color string to parse. Can be hex (#f00, #ff000080), functional (rgb(255 0 0), oklch(60% 0.15 30)), or with `none` keyword.

```ts
const color = parseColor('oklch(60% 0.15 30)');
const hexColor = parseColor('#ff000080');

dropColor(color);
dropColor(hexColor);
```

---

### Color

Creates, manages, and manipulates `Color` objects and their underlying `Float32Array` buffers using a shared object pool for performance.

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

export type Color<S extends Space> = {
  space: S;
  value: Float32Array;
  alpha: number;
};

export function createMatrix(): Float32Array;
export function dropMatrix(arr: Float32Array): void;
export function mountMatrix(size: number): void;
export function clearMatrix(): void;
export function countMatrix(): number;

export function createColor<S extends Space>(
  space: S,
  values: Float32Array,
  alpha?: number,
): Color<S>;
export function dropColor<S extends Space>(color: Color<S>): void;
export function cloneColor<S extends Space>(color: Color<S>): Color<S>;

export function mutateColor<S extends Space>(color: Color<S>, to: S): void;
export function deriveColor<S extends Space, T extends Space>(color: Color<S>, to: T): Color<T>;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix`.

#### createMatrix()

Retrieves a `Float32Array` buffer from the object pool, or creates a new one if the pool is empty.

```ts
const matrix = createMatrix();
// matrix is a Float32Array(3)
```

#### dropMatrix()

Returns a `Float32Array` buffer to the object pool for reuse.

- `arr`: The buffer to return to the pool.

```ts
const matrix = createMatrix();
// use matrix
dropMatrix(matrix);
```

#### mountMatrix()

Initializes the object pool with a specific number of pre-allocated buffers.

- `size`: Number of buffers to pre-allocate. Maximum is 2048.

```ts
mountMatrix(50); // Preallocate 50 buffers
```

#### clearMatrix()

Empties the entire object pool, freeing all pre-allocated buffers.

```ts
clearMatrix();
```

#### countMatrix()

Returns the number of buffers currently available in the pool.

```ts
countMatrix(); // e.g., 50
```

#### createColor()

Creates a full `Color` object with a space, value buffer, and optional alpha.

- `space`: The color space the color belongs to.
- `values`: A Float32Array with 3 color components.
- `alpha`: Optional alpha value from 0 to 1. Defaults to 1.

```ts
const red = createColor('rgb', new Float32Array([1, 0, 0]));
const transparentBlue = createColor('oklch', new Float32Array([0.5, 0.2, 240]), 0.5);

dropColor(red);
dropColor(transparentBlue);
```

#### dropColor()

Releases a `Color` object's underlying buffer back to the pool.

- `color`: The color object to release.

```ts
const color = createColor('rgb', new Float32Array([0.5, 0.2, 0.8]));
// use color
dropColor(color);
```

#### cloneColor()

Creates a deep copy of a `Color` object, including its value buffer and alpha.

- `color`: The color to clone.

```ts
const original = createColor('rgb', new Float32Array([0.5, 0.2, 0.8]));
const copy = cloneColor(original);
// original and copy are independent

dropColor(original);
dropColor(copy);
```

#### mutateColor()

Converts a color to a different color space in-place, modifying the original Color object.

- `color`: The color to convert. Its `space` and `value` will be overwritten.
- `to`: The target color space.

```ts
const color = createColor('rgb', new Float32Array([0.5, 0.2, 0.8]));
mutateColor(color, 'oklch');
// color is now in OKLCH space

dropColor(color);
```

#### deriveColor()

Creates a new Color in a different color space without modifying the original.

- `color`: The source color.
- `to`: The target color space.

```ts
const original = createColor('rgb', new Float32Array([0.5, 0.2, 0.8]));
const converted = deriveColor(original, 'oklch');
// original is still RGB, converted is OKLCH

dropColor(original);
dropColor(converted);
```

> [!IMPORTANT]
> **Pool Limit:** The pool has a maximum of 2048 buffers. When exhausted, new allocations fall back to standard garbage-collected `Float32Array`.

---

## Utilities

Higher-level tools built on top of the core API for color adjustment, perceptual analysis, contrast checking, gamut mapping, gradient creation, palette generation, picker controls, and vision simulation. These handle their own color object allocation — remember to `dropColor()` when done.

### Adjust

In-place color adjustments using OKLCH or RGB space for perceptual modifications.

```ts
export function lighten(color: Color<Space>, ratio: number): void;
export function darken(color: Color<Space>, ratio: number): void;
export function saturate(color: Color<Space>, ratio: number): void;
export function desaturate(color: Color<Space>, ratio: number): void;
export function whiten(color: Color<Space>, ratio: number): void;
export function blacken(color: Color<Space>, ratio: number): void;
export function rotate(color: Color<Space>, angle: number): void;
export function invert(color: Color<Space>): void;
export function matchLuminance(source: Color<Space>, target: Color<Space>): void;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/adjust`.

#### lighten()

Increases lightness in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 (no effect) to 1 (maximize lightness).

```ts
const color = createColor('oklch', new Float32Array([0.6, 0.15, 30]));
lighten(color, 0.5); // Increases lightness by 50% of remaining headroom

dropColor(color);
```

#### darken()

Decreases lightness in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 (no effect) to 1 (minimize lightness).

```ts
darken(color, 0.5); // Decreases lightness
```

#### saturate()

Increases chroma in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 (no effect) to 1 (maximize chroma).

```ts
saturate(color, 0.5); // Increases chroma
```

#### desaturate()

Decreases chroma in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 (no effect) to 1 (minimize chroma).

```ts
desaturate(color, 0.5); // Decreases chroma
```

#### whiten()

Increases lightness and decreases chroma in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 (no effect) to 1 (maximize lightness, minimize chroma).

```ts
whiten(color, 0.5); // Makes color lighter and less saturated
```

#### blacken()

Decreases lightness and chroma in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `ratio`: 0 (no effect) to 1 (minimize lightness and chroma).

```ts
blacken(color, 0.5); // Makes color darker and less saturated
```

#### rotate()

Rotates hue by `angle` degrees in OKLCH space.

- `color`: Color to adjust (mutated in-place).
- `angle`: Degrees to rotate hue (wraps around 0-360).

```ts
rotate(color, 180); // Rotates hue by 180 degrees
```

#### invert()

Inverts RGB components (1 - value) in RGB space.

- `color`: Color to adjust (mutated in-place).

```ts
invert(color); // Inverts RGB values
```

#### matchLuminance()

Copies lightness from `source` to `target` in OKLCH space.

- `source`: Color whose lightness will be copied.
- `target`: Color whose lightness will be overwritten.

```ts
matchLuminance(source, target); // target now has source's lightness
```

---

### Analyze

Perceptual color analysis, distance calculation, sorting, averaging, and chromatic adaptation.

```ts
export function getDistance(
  colorA: Color<Space>,
  colorB: Color<Space>,
  method: 'oklab' | 'deltaE2000' | 'itp' = 'oklab',
): number;
export function sortColors(
  colors: Readonly<Color<Space>[]>,
  by: 'luminance' | 'hue' | 'chroma' | 'distance',
  target?: Color<Space>,
): Color<Space>[];
export function averageColor(colors: Readonly<Color<Space>[]>): Color<Space>;
export function adaptColor(
  color: Color<Space>,
  from: 'd65' | 'd50',
  to: 'd65' | 'd50',
): Color<Space>;
export function isEqual<S extends Space, T extends Space>(
  a: Color<S>,
  b: Color<T>,
  tolerance?: number,
): boolean;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/analyze`.

#### getDistance()

Calculates perceptual distance between two colors using the specified method.

- `colorA`: First color.
- `colorB`: Second color.
- `method`: Distance metric: `oklab` (default, Euclidean in OKLAB), `deltaE2000` (CIEDE2000), `itp` (ITU-R BT.2124).

```ts
const red = createColor('rgb', new Float32Array([1, 0, 0]));
const blue = createColor('rgb', new Float32Array([0, 0, 1]));
getDistance(red, blue); // ~0.67 (oklab method)
getDistance(red, blue, 'deltaE2000'); // CIEDE2000 distance

dropColor(red);
dropColor(blue);
```

#### sortColors()

Sorts an array of colors by the specified property.

- `colors`: Array of colors to sort.
- `by`: Property to sort by: `luminance`, `hue`, `chroma`, or `distance` (requires `target`).
- `target`: Target color for `distance` sorting.

```ts
const sorted = sortColors(colors, 'luminance');
const byDistance = sortColors(colors, 'distance', targetColor);
```

#### averageColor()

Returns the average color of an array of colors in OKLAB space.

- `colors`: Array of colors to average.

```ts
const avg = averageColor([color1, color2, color3]);
```

#### adaptColor()

Chromatic adaptation between D50 and D65 illuminants using Bradford CAT.

- `color`: Color to adapt.
- `from`: Source illuminant (`'d50'` or `'d65'`).
- `to`: Target illuminant.

```ts
const color = createColor('xyz50', new Float32Array([0.5, 0.5, 0.5]));
const adapted = adaptColor(color, 'd50', 'd65'); // Convert to D65

dropColor(color);
dropColor(adapted);
```

#### isEqual()

Checks if two colors are perceptually equal, accounting for different color spaces and alpha.

- `a`: First color.
- `b`: Second color.
- `tolerance`: Maximum allowed difference per channel. Defaults to 0.001.

```ts
const a = createColor('rgb', new Float32Array([1, 0, 0]));
const b = createColor('oklch', new Float32Array([0.6, 0.2, 30]));
isEqual(a, b); // false
```

---

### Contrast

APCA contrast scoring, WCAG ratio checks, and contrast matching for accessibility.

```ts
export function getContrast(text: Color<Space>, background: Color<Space>): number;
export function getContrastRating(
  score: number,
): 'platinum' | 'gold' | 'silver' | 'bronze' | 'ui' | 'fail';
export function getContrastRatio(colorA: Color<Space>, colorB: Color<Space>): number;
export function isAccessible(
  text: Color<Space>,
  background: Color<Space>,
  level?: 'AA' | 'AAA',
  isLargeText?: boolean,
): boolean;
export function matchContrast(
  color: Color<Space>,
  background: Color<Space>,
  targetContrast: number,
): void;
export function pickContrast(
  background: Color<Space>,
  options: Readonly<Color<Space>[]>,
): Color<Space>;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/contrast`.

#### getContrast()

Calculates APCA (Advanced Perceptual Contrast Algorithm) contrast score between foreground and background.

- `text`: Foreground color.
- `background`: Background color.

```ts
const white = createColor('rgb', new Float32Array([1, 1, 1]));
const black = createColor('rgb', new Float32Array([0, 0, 0]));
getContrast(black, white); // ~33.7

dropColor(white);
dropColor(black);
```

#### getContrastRating()

Converts a raw APCA score to a human-readable rating.

- `score`: Raw APCA score from `getContrast`.

```ts
getContrastRating(95); // "platinum"
getContrastRating(80); // "gold"
getContrastRating(65); // "silver"
getContrastRating(50); // "bronze"
getContrastRating(35); // "ui"
getContrastRating(10); // "fail"
```

#### getContrastRatio()

Calculates WCAG 2.x contrast ratio between two colors.

- `colorA`: First color.
- `colorB`: Second color.

```ts
getContrastRatio(black, white); // 21
```

#### isAccessible()

Checks if a text/background pair meets WCAG accessibility standards.

- `text`: Foreground color.
- `background`: Background color.
- `level`: `'AA'` (default) or `'AAA'`.
- `isLargeText`: Whether the text is large (>= 18pt or 14pt bold). Defaults to false.

```ts
isAccessible(text, bg, 'AA', false); // true
```

#### matchContrast()

Adjusts a color's lightness to meet a target APCA contrast against a background.

- `color`: Color to adjust (mutated in-place).
- `background`: Background to contrast against.
- `targetContrast`: Desired APCA contrast score.

```ts
const color = createColor('rgb', new Float32Array([0.5, 0.2, 0.8]));
const bg = createColor('rgb', new Float32Array([1, 1, 1]));
matchContrast(color, bg, 45); // Adjusts color to meet 45 APCA contrast

dropColor(color);
dropColor(bg);
```

#### pickContrast()

Selects the color with the highest contrast from an array against a background.

- `background`: Background color.
- `options`: Array of colors to choose from.

```ts
const best = pickContrast(bg, [color1, color2, color3]);
```

---

### Gamut

Gamut checking and clamping to ensure colors are within valid ranges for their color space.

```ts
export function inGamut(color: Color<Space>, epsilon?: number): boolean;
export function toGamut(color: Color<Space>): void;
export function clampRgb(color: Color<Space>): void;
export function clampHsv(color: Color<Space>): void;
export function clampCartesian(color: Color<Space>): void;
export function clampPolar(color: Color<Space>): void;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/gamut`.

#### inGamut()

Checks if a color is within the valid sRGB gamut by converting to RGB space.

- `color`: Color to check.
- `epsilon`: Floating-point tolerance. Defaults to 0.0001.

```ts
const color = createColor('oklch', new Float32Array([1, 0.5, 300]));
inGamut(color); // false (high chroma exceeds sRGB)

dropColor(color);
```

#### toGamut()

Clamps a color's chroma in OKLCH space to fit within sRGB gamut.

- `color`: Color to clamp (mutated in-place).

```ts
const color = createColor('oklch', new Float32Array([1, 0.6, 180]));
toGamut(color); // Reduces chroma to fit sRGB

dropColor(color);
```

#### clampRgb()

Clamps RGB values to 0-1 range.

- `color`: Color to clamp (mutated in-place).

```ts
clampRgb(color); // Color value now in 0-1 range
```

#### clampHsv()

Clamps HSV values: saturation/value to 0-1, hue to 0-360.

- `color`: Color in HSV space to clamp.

```ts
clampHsv(hsvColor);
```

#### clampCartesian()

Clamps first channel to 0-1 for Cartesian spaces (lab, oklab).

- `color`: Color in lab or oklab space to clamp.

```ts
clampCartesian(labColor);
```

#### clampPolar()

Clamps polar space values: lightness to 0-1, chroma to 0+, hue to 0-360.

- `color`: Color in lch or oklch space to clamp.

```ts
clampPolar(oklchColor);
```

---

### Gradient

Generates CSS gradient strings from color stops, supporting linear, radial, and conic gradients.

```ts
export type GradientType = 'linear' | 'radial' | 'conic';
export type GradientStop = Readonly<{ color: Color<Space>; position?: number }>;

export function createLinearGradient(stops: ReadonlyArray<GradientStop>, angle?: number): string;
export function createRadialGradient(
  stops: ReadonlyArray<GradientStop>,
  shape?: 'circle' | 'ellipse',
  position?: string,
): string;
export function createConicGradient(
  stops: ReadonlyArray<GradientStop>,
  angle?: number,
  position?: string,
): string;
export function createSmoothGradient(
  start: Color<Space>,
  end: Color<Space>,
  steps: number,
  type?: GradientType,
  options?: Readonly<{ angle?: number; shape?: 'circle' | 'ellipse'; position?: string }>,
): string;
export function createMultiColorGradient(
  colors: ReadonlyArray<Color<Space>>,
  type?: GradientType,
  options?: Readonly<{ angle?: number; shape?: 'circle' | 'ellipse'; position?: string }>,
): string;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/gradient`.

#### createLinearGradient()

Creates a CSS linear gradient string.

- `stops`: Array of gradient stops with optional positions.
- `angle`: Gradient angle in degrees. Defaults to 180.

```ts
const gradient = createLinearGradient(
  [
    { color: createColor('rgb', new Float32Array([1, 0, 0])) },
    { color: createColor('rgb', new Float32Array([0, 0, 1])), position: 100 },
  ],
  45,
);
// "linear-gradient(45deg, rgb(255 0 0), rgb(0 0 255) 100%)"
```

#### createRadialGradient()

Creates a CSS radial gradient string.

- `stops`: Array of gradient stops with optional positions.
- `shape`: 'circle' or 'ellipse'. Defaults to 'ellipse'.
- `position`: CSS position. Defaults to 'center'.

```ts
const gradient = createRadialGradient(
  [
    { color: createColor('rgb', new Float32Array([1, 1, 0])) },
    { color: createColor('rgb', new Float32Array([0, 0, 1])) },
  ],
  'circle',
  'center',
);
```

#### createConicGradient()

Creates a CSS conic gradient string.

- `stops`: Array of gradient stops with optional positions.
- `angle`: Starting angle in degrees. Defaults to 0.
- `position`: CSS position. Defaults to 'center'.

```ts
const gradient = createConicGradient(
  [
    { color: createColor('rgb', new Float32Array([1, 0, 0])) },
    { color: createColor('rgb', new Float32Array([0, 1, 0])) },
  ],
  0,
  'center',
);
```

#### createSmoothGradient()

Generates a gradient with interpolated steps between two endpoints.

- `start`: Start color.
- `end`: End color.
- `steps`: Number of color stops (minimum 2).
- `type`: Gradient type. Defaults to 'linear'.
- `options`: Additional options for the gradient type.

```ts
const gradient = createSmoothGradient(startColor, endColor, 5, 'linear', { angle: 45 });
```

#### createMultiColorGradient()

Creates a gradient passing through multiple colors in sequence.

- `colors`: Array of colors to interpolate between.
- `type`: Gradient type. Defaults to 'linear'.
- `options`: Additional options for the gradient type.

```ts
const gradient = createMultiColorGradient([red, green, blue], 'linear');
```

---

### Palette

Color harmonies, scales, shades, tints, and mixing utilities.

```ts
export function mixColor(colorA: Color<Space>, colorB: Color<Space>, ratio: number): void;
export function mixSubtractive(colorA: Color<Space>, colorB: Color<Space>, ratio?: number): void;
export function createHarmony(input: Color<Space>, ratios: Readonly<number[]>): Color<Space>[];
export function createScales(stops: Readonly<Color<Space>[]>, steps: number): Color<Space>[];
export function createTints(color: Color<Space>, steps: number): Color<Space>[];
export function createShades(color: Color<Space>, steps: number): Color<Space>[];
export function createTonal(color: Color<Space>, steps?: number): Color<Space>[];
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/palette`.

#### mixColor()

Interpolates between two colors in their native polar space (handles hue shortest path).

- `colorA`: Start color (mutated in-place to the result).
- `colorB`: End color.
- `ratio`: Interpolation factor 0 (start) to 1 (end). Values outside 0-1 are clamped.

```ts
const start = createColor('oklch', new Float32Array([0.5, 0.1, 200]));
const end = createColor('oklch', new Float32Array([0.8, 0.3, 200]));
mixColor(start, end, 0.5); // start is now the mixed color

dropColor(start);
dropColor(end);
```

#### mixSubtractive()

Subtractive color mixing in linear RGB space (simulates pigment mixing).

- `colorA`: First color.
- `colorB`: Second color.
- `ratio`: Mix ratio (0.5 default, 0 = all A, 1 = all B).

```ts
mixSubtractive(colorA, colorB, 0.3);
```

#### createHarmony()

Generates colors by rotating hue around the color wheel by specified ratios (degrees).

- `input`: Base color.
- `ratios`: Array of hue rotation angles in degrees.

```ts
const base = createColor('oklch', new Float32Array([0.6, 0.15, 30]));
const harmonies = createHarmony(base, [180, 120, 240]);
// Returns array of colors with hue rotated by each ratio

dropColor(base);
```

#### createScales()

Creates a multi-stop color scale by interpolating between sequential stop pairs.

- `stops`: Array of colors defining scale endpoints.
- `steps`: Total number of colors to generate.

```ts
const scale = createScales([red, green, blue], 7);
// 7 colors transitioning red -> green -> blue
```

#### createTints()

Generates tints from the color to white in OKLCH space.

- `color`: Base color.
- `steps`: Number of tints to generate.

```ts
const tints = createTints(color, 5); // 5 tints from color to white
```

#### createShades()

Generates shades from the color to black in OKLCH space.

- `color`: Base color.
- `steps`: Number of shades to generate.

```ts
const shades = createShades(color, 5); // 5 shades from color to black
```

#### createTonal()

Generates a full tonal scale from black to color to white in OKLCH space.

- `color`: Base color.
- `steps`: Number of steps. Defaults to 9.

```ts
const tonal = createTonal(color); // 9-step tonal scale from black to color to white
```

---

### Picker

Interactive color picker state management for UI controls, using HSV space for coordinate mapping.

```ts
export type PickerFn = <S extends Space>(hsv: Color<S>) => void;

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

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/picker`.

#### createPicker()

Creates an interactive picker instance with state management and subscriber support.

- `color`: Initial color to seed the picker.

```ts
const color = createColor('rgb', new Float32Array([0.5, 0.2, 0.8]));
const picker = createPicker(color);

// Update from mouse position (saturation, value)
picker.update(0.8, 0.3, 'sv');

// Subscribe to changes
const unsubscribe = picker.subscribe((hsvColor) => {
  console.log(hsvColor);
});

// Clean up
picker.dispose();
unsubscribe();
dropColor(color);
```

> [!IMPORTANT]
> `dispose()` releases internal Color objects back to the pool.

---

### Simulate

Color vision deficiency and environmental simulation filters.

```ts
export type DeficiencyType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function simulateDeficiency(
  color: Color<Space>,
  type: DeficiencyType | 'none',
  severity?: number,
): void;
export function simulateAmbient(color: Color<Space>, intensity?: number): void;
export function simulateNightMode(color: Color<Space>, intensity?: number): void;
export function simulateLowLight(color: Color<Space>, darkness?: number): void;
export function simulateCataract(color: Color<Space>, severity?: number): void;
export function simulateSunlight(color: Color<Space>, intensity?: number): void;
```

> [!NOTE] All functions in this section are imported from `@kayxean/chromatrix/simulate`.

#### simulateDeficiency()

Applies color vision deficiency simulation in linear RGB space.

- `color`: Color to adjust (mutated in-place).
- `type`: Deficiency type or 'none' to return a copy.
- `severity`: 0 (no effect) to 1 (full deficiency). Defaults to 1.

```ts
const normal = createColor('oklch', new Float32Array([0.6, 0.15, 30]));
simulateDeficiency(normal, 'tritanopia', 1); // Applies full tritanopia simulation

dropColor(normal);
```

#### simulateAmbient()

Blends color toward white (glare/washout) in linear RGB space.

- `color`: Color to adjust (mutated in-place).
- `intensity`: 0 (no effect) to 1 (full white). Defaults to 0.4.

```ts
simulateAmbient(color, 0.4); // Mild glare
```

#### simulateNightMode()

Reduces saturation and value for night vision simulation in linear RGB space.

- `color`: Color to adjust (mutated in-place).
- `intensity`: 0 (no effect) to 1 (full night mode). Defaults to 0.5.

```ts
simulateNightMode(color, 0.5); // Moderate night vision
```

#### simulateLowLight()

Mixes color with luminance for low light condition simulation in linear RGB space.

- `color`: Color to adjust (mutated in-place).
- `darkness`: 0 (normal) to 1 (very dark). Defaults to 0.5.

```ts
simulateLowLight(color, 0.5); // Moderate low light
```

#### simulateCataract()

Reduces blue channel and adds fog for cataract simulation in linear RGB space.

- `color`: Color to adjust (mutated in-place).
- `severity`: 0 (no effect) to 1 (full cataract). Defaults to 0.5.

```ts
simulateCataract(color, 0.5); // Moderate cataract
```

#### simulateSunlight()

Blends color toward white for direct sunlight simulation in linear RGB space.

- `color`: Color to adjust (mutated in-place).
- `intensity`: 0 (no effect) to 1 (full sunlight). Defaults to 0.7.

```ts
simulateSunlight(color, 0.7); // Bright sunlight
```

> [!WARNING]
> Simulated values may exceed 0-1 range. Use `clampRgb()` or `toGamut()` before `formatCss()` to ensure valid CSS output.

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
