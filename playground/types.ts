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

export interface Color<S extends ColorSpace = ColorSpace> extends Disposable {
  readonly space: S;
  readonly index: number;
  alpha: number;

  readonly value: Float32Array;

  [Symbol.dispose](): void;
}

export type ColorAdapter = (buffer: Float32Array, idx: number) => void;

export type DeficiencyType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export type ColorMode = 'hex' | Exclude<ColorSpace, 'hsv' | 'lrgb' | 'xyz65' | 'xyz50'>;

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
