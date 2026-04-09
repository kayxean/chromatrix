import type { ColorHub } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { rgbToLrgb, lrgbToRgb } from '../adapters/gamma';
import { hwbToHsv, hsvToHwb, hsvToRgb, rgbToHsv, hsvToHsl } from '../adapters/srgb';

export const HWB: ColorHub<'hwb'> = {
  id: 'hwb',
  hub: 'xyz65',
  polar: 'hwb',
  toHub: (input, output) => {
    hwbToHsv(input, output);
    hsvToRgb(output, output);
    rgbToLrgb(output, output);
    lrgbToXyz65(output, output);
  },
  fromHub: (input, output) => {
    xyz65ToLrgb(input, output);
    lrgbToRgb(output, output);
    rgbToHsv(output, output);
    hsvToHwb(output, output);
  },
  direct: {
    hsv: hwbToHsv,
    hsl: (input, output) => {
      hwbToHsv(input, output);
      hsvToHsl(output, output);
    },
    rgb: (input, output) => {
      hwbToHsv(input, output);
      hsvToRgb(output, output);
    },
  },
};
