import type { ColorHub } from '../types';

export const XYZ50: ColorHub<'xyz50'> = {
  id: 'xyz50',
  hub: 'xyz50',
  polar: undefined,
  toHub: (inp, out) => {
    if (inp !== out) out.set(inp);
  },
  fromHub: (inp, out) => {
    if (inp !== out) out.set(inp);
  },
};
