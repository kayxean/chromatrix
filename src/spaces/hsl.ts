import type { ColorHub } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { rgbToLrgb, lrgbToRgb } from '../adapters/gamma';
import { hslToHsv, hsvToHsl, hsvToRgb, rgbToHsv, hsvToHwb } from '../adapters/srgb';

export const HSL: ColorHub<'hsl'> = {
  id: 'hsl',
  hub: 'xyz65',
  polar: 'hsv',
  toHub: (input, output) => {
    hslToHsv(input, output);
    hsvToRgb(output, output);
    rgbToLrgb(output, output);
    lrgbToXyz65(output, output);
  },
  fromHub: (input, output) => {
    xyz65ToLrgb(input, output);
    lrgbToRgb(output, output);
    rgbToHsv(output, output);
    hsvToHsl(output, output);
  },
  direct: {
    hsv: hslToHsv,
    hwb: (input, output) => {
      hslToHsv(input, output);
      hsvToHwb(output, output);
    },
    rgb: (input, output) => {
      hslToHsv(input, output);
      hsvToRgb(output, output);
    },
  },
};
