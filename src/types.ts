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

export type ColorMode = 'hex' | Exclude<ColorSpace, 'hsv' | 'lrgb' | 'xyz65' | 'xyz50'>;

export type ColorArray = Float32Array & { readonly __length: 3 };

export type ColorMatrix<S extends ColorSpace = ColorSpace> = ColorArray & {
  readonly __space: S;
};

export type Color<S extends ColorSpace = ColorSpace> = {
  space: S;
  value: ColorMatrix<S>;
  alpha: number;
};

export type ColorAdapter = (input: ColorArray, output: ColorArray) => void;

export type ColorHub<S extends ColorSpace = ColorSpace> = {
  readonly id: S;
  readonly hub: 'xyz50' | 'xyz65';
  readonly polar: ColorSpace | undefined;
  readonly toHub: ColorAdapter;
  readonly fromHub: ColorAdapter;
  readonly direct?: Partial<{ [K in ColorSpace]: ColorAdapter }>;
};
