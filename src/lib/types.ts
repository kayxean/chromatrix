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

export type Mutable<S extends Color<Space>> = { -readonly [K in keyof S]: S[K] };
