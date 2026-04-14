import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { lrgbToOklab, lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { lrgbToRgb, rgbToLrgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
import { hsvToHsl, hsvToHwb, rgbToHsv } from '../adapters/srgb';

export const RGB: Matrix<'rgb'> = {
  id: 'rgb',
  hub: 'xyz65',
  polar: 'hsl',
  toHub: (input, output) => {
    rgbToLrgb(input, output);
    lrgbToXyz65(output, output);
  },
  fromHub: (input, output) => {
    xyz65ToLrgb(input, output);
    lrgbToRgb(output, output);
  },
  direct: {
    hsv: rgbToHsv,
    hsl: (input, output) => {
      rgbToHsv(input, output);
      hsvToHsl(output, output);
    },
    hwb: (input, output) => {
      rgbToHsv(input, output);
      hsvToHwb(output, output);
    },
    lab: (input, output) => {
      rgbToLrgb(input, output);
      lrgbToLab(output, output);
    },
    lch: (input, output) => {
      rgbToLrgb(input, output);
      lrgbToLab(output, output);
      labToLch(output, output);
    },
    oklab: (input, output) => {
      rgbToLrgb(input, output);
      lrgbToOklab(output, output);
    },
    oklch: (input, output) => {
      rgbToLrgb(input, output);
      lrgbToOklab(output, output);
      oklabToOklch(output, output);
    },
    lrgb: rgbToLrgb,
  },
};
