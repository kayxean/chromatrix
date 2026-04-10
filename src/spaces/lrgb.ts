import type { Matrix } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { lrgbToRgb } from '../adapters/gamma';

export const LRGB: Matrix<'lrgb'> = {
  id: 'lrgb',
  hub: 'xyz65',
  polar: undefined,
  toHub: lrgbToXyz65,
  fromHub: xyz65ToLrgb,
  direct: {
    rgb: lrgbToRgb,
  },
};
