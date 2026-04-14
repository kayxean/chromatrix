import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { lrgbToOklab, lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { lrgbToHsv, lrgbToRgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
import { hsvToHsl, hsvToHwb } from '../adapters/srgb';

export const LRGB: Matrix<'lrgb'> = {
  id: 'lrgb',
  hub: 'xyz65',
  polar: undefined,
  toHub: lrgbToXyz65,
  fromHub: xyz65ToLrgb,
  direct: {
    rgb: lrgbToRgb,
    hsl: (input, output) => {
      lrgbToHsv(input, output);
      hsvToHsl(output, output);
    },
    hsv: lrgbToHsv,
    hwb: (input, output) => {
      lrgbToHsv(input, output);
      hsvToHwb(output, output);
    },
    lab: lrgbToLab,
    lch: (input, output) => {
      lrgbToLab(input, output);
      labToLch(output, output);
    },
    oklab: lrgbToOklab,
    oklch: (input, output) => {
      lrgbToOklab(input, output);
      oklabToOklch(output, output);
    },
  },
};
