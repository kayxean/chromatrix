import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { lrgbToOklab, lrgbToXyz65, xyz65ToLrgb } from '../adapters/d65';
import { hsvToLrgb, lrgbToRgb, rgbToLrgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
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
    rgb: (input, output) => {
      hwbToHsv(input, output);
      hsvToRgb(output, output);
    },
    hsl: (input, output) => {
      hwbToHsv(input, output);
      hsvToHsl(output, output);
    },
    hsv: hwbToHsv,
    lab: (input, output) => {
      hwbToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToLab(output, output);
    },
    lch: (input, output) => {
      hwbToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToLab(output, output);
      labToLch(output, output);
    },
    oklab: (input, output) => {
      hwbToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToOklab(output, output);
    },
    oklch: (input, output) => {
      hwbToHsv(input, output);
      hsvToLrgb(output, output);
      lrgbToOklab(output, output);
      oklabToOklch(output, output);
    },
  },
};
