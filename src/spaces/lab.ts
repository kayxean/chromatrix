import type { Matrix } from '../types';
import { labToLrgb, labToXyz50, xyz50ToLab } from '../adapters/d50';
import { lrgbToOklab } from '../adapters/d65';
import { lrgbToHsv, lrgbToRgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
import { hsvToHsl, hsvToHwb } from '../adapters/srgb';

export const LAB: Matrix<'lab'> = {
  id: 'lab',
  hub: 'xyz50',
  polar: 'lch',
  toHub: labToXyz50,
  fromHub: xyz50ToLab,
  direct: {
    rgb: (input, output) => {
      labToLrgb(input, output);
      lrgbToRgb(output, output);
    },
    hsl: (input, output) => {
      labToLrgb(input, output);
      lrgbToHsv(output, output);
      hsvToHsl(output, output);
    },
    hsv: (input, output) => {
      labToLrgb(input, output);
      lrgbToHsv(output, output);
    },
    hwb: (input, output) => {
      labToLrgb(input, output);
      lrgbToHsv(output, output);
      hsvToHwb(output, output);
    },
    lch: labToLch,
    oklab: (input, output) => {
      labToLrgb(input, output);
      lrgbToOklab(output, output);
    },
    oklch: (input, output) => {
      labToLrgb(input, output);
      lrgbToOklab(output, output);
      oklabToOklch(output, output);
    },
    lrgb: labToLrgb,
  },
};
