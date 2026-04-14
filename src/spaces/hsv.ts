import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { lrgbToOklab, lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { hsvToLrgb, lrgbToRgb, rgbToLrgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
import { hsvToHsl, hsvToHwb, hsvToRgb, rgbToHsv } from '../adapters/srgb';

export const HSV: Matrix<'hsv'> = {
  id: 'hsv',
  hub: 'xyz65',
  polar: 'hsv',
  toHub: (input, output) => {
    hsvToRgb(input, output);
    rgbToLrgb(output, output);
    lrgbToXyz65(output, output);
  },
  fromHub: (input, output) => {
    xyz65ToLrgb(input, output);
    lrgbToRgb(output, output);
    rgbToHsv(output, output);
  },
  direct: {
    rgb: hsvToRgb,
    hsl: hsvToHsl,
    hwb: hsvToHwb,
    lab: (input, output) => {
      hsvToLrgb(input, output);
      lrgbToLab(output, output);
    },
    lch: (input, output) => {
      hsvToLrgb(input, output);
      lrgbToLab(output, output);
      labToLch(output, output);
    },
    oklab: (input, output) => {
      hsvToLrgb(input, output);
      lrgbToOklab(output, output);
    },
    oklch: (input, output) => {
      hsvToLrgb(input, output);
      lrgbToOklab(output, output);
      oklabToOklch(output, output);
    },
    lrgb: hsvToLrgb,
  },
};
