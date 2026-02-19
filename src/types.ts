/**
 * Supported color spaces for parsing and conversion.
 */
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

/**
 * A Float32Array restricted to 3 components (e.g., [R, G, B] or [L, a, b]).
 */
export type ColorArray = Float32Array & { readonly __length: 3 };

/**
 * A ColorArray tagged with its specific color space for type safety.
 */
export type ColorMatrix<S extends ColorSpace = ColorSpace> = ColorArray & {
  readonly __space: S;
};

/**
 * The primary color object holding the space identifier, values, and alpha.
 */
export type Color<S extends ColorSpace = ColorSpace> = {
  space: S;
  value: ColorMatrix<S>;
  alpha?: number;
};

/**
 * A function that transforms data from one ColorArray to another.
 */
export type ColorAdapter = (input: ColorArray, output: ColorArray) => void;

/**
 * Types of color vision deficiency for simulation.
 */
export type DeficiencyType =
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia';
