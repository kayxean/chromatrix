import type { ColorHub } from '../types';

export const XYZ65: ColorHub<'xyz65'> = {
  id: 'xyz65',
  hub: 'xyz65',
  polar: undefined,
  toHub: (inp, out) => {
    if (inp !== out) out.set(inp);
  },
  fromHub: (inp, out) => {
    if (inp !== out) out.set(inp);
  },
};
