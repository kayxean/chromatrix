import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { lrgbToOklab, lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { hsvToLrgb, lrgbToRgb, rgbToLrgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, rgbToHsv } from '../adapters/srgb';

export const HSL: Matrix<'hsl'> = {
  id: 'hsl',
  hub: 'xyz65',
  polar: 'hsl',
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
    rgb: (input, output) => {
      hslToHsv(input, output);
      hsvToRgb(output, output);
    },
    hsv: hslToHsv,
    hwb: (input, output) => {
      hslToHsv(input, output);
      hsvToHwb(output, output);
    },
    lab: (input, output) => {
      hslToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToLab(output, output);
    },
    lch: (input, output) => {
      hslToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToLab(output, output);
      labToLch(output, output);
    },
    oklab: (input, output) => {
      hslToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToOklab(output, output);
    },
    oklch: (input, output) => {
      hslToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToOklab(output, output);
      oklabToOklch(output, output);
    },
    lrgb: (input, output) => {
      hslToHsv(input, output);
      hsvToLrgb(output, output);
    },
  },
};
