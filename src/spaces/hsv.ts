import type { Matrix } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { lrgbToRgb, rgbToLrgb } from '../adapters/gamma';
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
  },
};
