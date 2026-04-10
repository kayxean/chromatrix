export type Rectangular = 'rgb' | 'lrgb';
export type Cylindrical = 'hsl' | 'hsv' | 'hwb';
export type Perceptual = 'lab' | 'lch' | 'oklab' | 'oklch';
export type Reference = 'xyz50' | 'xyz65';

export type Polar = Exclude<Perceptual, 'lab' | 'oklab'> | Cylindrical;
export type Manifest = Exclude<Rectangular, 'lrgb'> | Cylindrical | Perceptual | 'hex';

export type Space = Rectangular | Cylindrical | Perceptual | Reference;

export type Color<S extends Space = Space> = {
  space: S;
  value: Float32Array;
  alpha: number;
};

export type Matrix<S extends Space = Space> = {
  readonly id: S;
  readonly hub: 'xyz50' | 'xyz65';
  readonly polar: Polar | undefined;
  readonly toHub: (input: Float32Array, output: Float32Array) => void;
  readonly fromHub: (input: Float32Array, output: Float32Array) => void;
  readonly direct?: Partial<Record<Space, (input: Float32Array, output: Float32Array) => void>>;
};
