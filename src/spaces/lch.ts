import type { Matrix } from '../types';
import { labToLrgb, labToXyz50, xyz50ToLab } from '../adapters/d50';
import { lrgbToOklab } from '../adapters/d65';
import { lrgbToHsv, lrgbToRgb } from '../adapters/gamma';
import { labToLch, lchToLab, oklabToOklch } from '../adapters/polar';
import { hsvToHsl, hsvToHwb } from '../adapters/srgb';

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
    rgb: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
      lrgbToRgb(output, output);
    },
    hsl: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
      lrgbToHsv(output, output);
      hsvToHsl(output, output);
    },
    hsv: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
      lrgbToHsv(output, output);
    },
    hwb: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
      lrgbToHsv(output, output);
      hsvToHwb(output, output);
    },
    lab: lchToLab,
    oklab: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
      lrgbToOklab(output, output);
    },
    oklch: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
      lrgbToOklab(output, output);
      oklabToOklch(output, output);
    },
    lrgb: (input, output) => {
      lchToLab(input, output);
      labToLrgb(output, output);
    },
  },
};
