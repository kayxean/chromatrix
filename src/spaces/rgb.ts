import type { ColorHub } from '../types';
import { lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { rgbToLrgb, lrgbToRgb } from '../adapters/gamma';
import { rgbToHsv, hsvToHsl, hsvToHwb } from '../adapters/srgb';

export const RGB: ColorHub<'rgb'> = {
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
    lrgb: rgbToLrgb,
    hsv: rgbToHsv,
    hsl: (inp, out) => {
      rgbToHsv(inp, out);
      hsvToHsl(out, out);
    },
    hwb: (inp, out) => {
      rgbToHsv(inp, out);
      hsvToHwb(out, out);
    },
  },
};
