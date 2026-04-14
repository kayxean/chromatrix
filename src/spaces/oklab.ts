import type { Matrix } from '../types';
import { lrgbToLab } from '../adapters/d50';
import { oklabToLrgb, oklabToXyz65, xyz65ToOklab } from '../adapters/d65';
import { lrgbToHsv, lrgbToRgb } from '../adapters/gamma';
import { labToLch, oklabToOklch } from '../adapters/polar';
import { hsvToHsl, hsvToHwb } from '../adapters/srgb';

export const OKLAB: Matrix<'oklab'> = {
  id: 'oklab',
  hub: 'xyz65',
  polar: 'oklch',
  toHub: oklabToXyz65,
  fromHub: xyz65ToOklab,
  direct: {
    rgb: (input, output) => {
      oklabToLrgb(input, output);
      lrgbToRgb(output, output);
    },
    hsl: (input, output) => {
      oklabToLrgb(input, output);
      lrgbToHsv(output, output);
      hsvToHsl(output, output);
    },
    hsv: (input, output) => {
      oklabToLrgb(input, output);
      lrgbToHsv(output, output);
    },
    hwb: (input, output) => {
      oklabToLrgb(input, output);
      lrgbToHsv(output, output);
      hsvToHwb(output, output);
    },
    lab: (input, output) => {
      oklabToLrgb(input, output);
      lrgbToLab(output, output);
    },
    lch: (input, output) => {
      oklabToLrgb(input, output);
      lrgbToLab(output, output);
      labToLch(output, output);
    },
    oklch: oklabToOklch,
    lrgb: oklabToLrgb,
  },
};
