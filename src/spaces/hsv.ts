import type { ColorHub } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { rgbToLrgb, lrgbToRgb } from '../adapters/gamma';
import { hsvToRgb, rgbToHsv, hsvToHsl, hsvToHwb } from '../adapters/srgb';

export const HSV: ColorHub<'hsv'> = {
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
