import type { Matrix } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { lrgbToRgb, rgbToLrgb } from '../adapters/gamma';
import { hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from '../adapters/srgb';

export const HWB: Matrix<'hwb'> = {
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
