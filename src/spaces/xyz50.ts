import type { Matrix } from '../types';

export const XYZ50: Matrix<'xyz50'> = {
  id: 'xyz50',
  hub: 'xyz50',
  polar: undefined,
  toHub: (input, output) => {
    if (input !== output) output.set(input);
  },
  fromHub: (input, output) => {
    if (input !== output) output.set(input);
  },
};
