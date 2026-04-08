import type { ColorHub } from '../types';
import { oklabToXyz65, xyz65ToOklab } from '../adapters/d65';
import { oklabToOklch } from '../adapters/polar';

export const OKLAB: ColorHub<'oklab'> = {
  id: 'oklab',
  hub: 'xyz65',
  polar: 'oklch',
  toHub: oklabToXyz65,
  fromHub: xyz65ToOklab,
  direct: {
    oklch: oklabToOklch,
  },
};
