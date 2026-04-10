import type { Matrix } from '../types';
import { oklabToXyz65, xyz65ToOklab } from '../adapters/d65';
import { oklabToOklch, oklchToOklab } from '../adapters/polar';

export const OKLCH: Matrix<'oklch'> = {
  id: 'oklch',
  hub: 'xyz65',
  polar: 'oklch',
  toHub: (input, output) => {
    oklchToOklab(input, output);
    oklabToXyz65(output, output);
  },
  fromHub: (input, output) => {
    xyz65ToOklab(input, output);
    oklabToOklch(output, output);
  },
  direct: {
    oklab: oklchToOklab,
  },
};
