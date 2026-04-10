import type { Matrix } from '../types';
import { labToXyz50, xyz50ToLab } from '../adapters/d50';
import { labToLch, lchToLab } from '../adapters/polar';

export const LCH: Matrix<'lch'> = {
  id: 'lch',
  hub: 'xyz50',
  polar: 'lch',
  toHub: (input, output) => {
    lchToLab(input, output);
    labToXyz50(output, output);
  },
  fromHub: (input, output) => {
    xyz50ToLab(input, output);
    labToLch(output, output);
  },
  direct: {
    lab: lchToLab,
  },
};
