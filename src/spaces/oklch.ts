import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { oklabToLrgb, oklabToXyz65, xyz65ToOklab } from '../adapters/d65';
import { lrgbToHsv, lrgbToRgb } from '../adapters/gamma';
import { labToLch, oklabToOklch, oklchToOklab } from '../adapters/polar';
import { hsvToHsl, hsvToHwb } from '../adapters/srgb';

export const OKLCH: Matrix<'oklch'> = {
  id: 'oklch',
  hub: 'xyz65',
  polar: 'oklch',
  toHub: (input, output) => {
    oklchToOklab(input, output);
    oklabToXyz65(output, output);
  },
  fromHub: (input, output) => {
    xyz65ToOklab(input, output);
    oklabToOklch(output, output);
  },
  direct: {
    rgb: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
      lrgbToRgb(output, output);
    },
    hsl: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
      lrgbToHsv(output, output);
      hsvToHsl(output, output);
    },
    hsv: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
      lrgbToHsv(output, output);
    },
    hwb: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
      lrgbToHsv(output, output);
      hsvToHwb(output, output);
    },
    lab: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
      lrgbToLab(output, output);
    },
    lch: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
      lrgbToLab(output, output);
      labToLch(output, output);
    },
    oklab: oklchToOklab,
    lrgb: (input, output) => {
      oklchToOklab(input, output);
      oklabToLrgb(output, output);
    },
  },
};
