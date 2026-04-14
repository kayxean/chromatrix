import type { Matrix } from '../types';

export const XYZ65: Matrix<'xyz65'> = {
  id: 'xyz65',
  hub: 'xyz65',
  polar: undefined,
  toHub: (input, output) => {
    if (input !== output) output.set(input);
  },
  fromHub: (input, output) => {
    if (input !== output) output.set(input);
  },
};
