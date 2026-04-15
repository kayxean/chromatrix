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

export type Matrix<S extends Space> = {
  readonly id: S;
  readonly hub: Space;
  readonly source: (input: Float32Array, output: Float32Array) => void;
  readonly target: (input: Float32Array, output: Float32Array) => void;
  readonly direct?: Partial<Record<Space, (input: Float32Array, output: Float32Array) => void>>;
};
