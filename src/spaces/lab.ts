import type { Matrix } from '../types';
import { labToXyz50, xyz50ToLab } from '../adapters/d50';
import { labToLch } from '../adapters/polar';

export const LAB: Matrix<'lab'> = {
  id: 'lab',
  hub: 'xyz50',
  polar: 'lch',
  toHub: labToXyz50,
  fromHub: xyz50ToLab,
  direct: {
    lch: labToLch,
  },
};
