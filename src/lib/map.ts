import type { Matrix, Space } from './types';
import { xyz50ToXyz65, xyz65ToXyz50 } from './chroma';
import { labToLrgb, labToXyz50, labToXyz65, lrgbToLab, xyz50ToLab, xyz65ToLab } from './cielab';
import {
  hsvToLrgb,
  lrgbToHsv,
  lrgbToRgb,
  lrgbToXyz50,
  lrgbToXyz65,
  rgbToLrgb,
  xyz50ToLrgb,
  xyz65ToLrgb,
} from './linear';
import {
  lrgbToOklab,
  oklabToLrgb,
  oklabToXyz50,
  oklabToXyz65,
  xyz50ToOklab,
  xyz65ToOklab,
} from './oklab';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from './polar';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from './srgb';

export const RGB: Matrix<'rgb'> = {
  id: 'rgb',
  hub: 'lrgb',
  source: rgbToLrgb,
  target: lrgbToRgb,
  direct: {
    hsv: rgbToHsv,
  },
};

export const HSL: Matrix<'hsl'> = {
  id: 'hsl',
  hub: 'hsv',
  source: hslToHsv,
  target: hsvToHsl,
};

export const HSV: Matrix<'hsv'> = {
  id: 'hsv',
  hub: 'rgb',
  source: hsvToRgb,
  target: rgbToHsv,
  direct: {
    hsl: hsvToHsl,
    hwb: hsvToHwb,
    lrgb: hsvToLrgb,
  },
};

export const HWB: Matrix<'hwb'> = {
  id: 'hwb',
  hub: 'hsv',
  source: hwbToHsv,
  target: hsvToHwb,
};

export const LAB: Matrix<'lab'> = {
  id: 'lab',
  hub: 'xyz50',
  source: labToXyz50,
  target: xyz50ToLab,
  direct: {
    lch: labToLch,
    lrgb: labToLrgb,
    xyz65: labToXyz65,
  },
};

export const LCH: Matrix<'lch'> = {
  id: 'lch',
  hub: 'lab',
  source: lchToLab,
  target: labToLch,
};

export const OKLAB: Matrix<'oklab'> = {
  id: 'oklab',
  hub: 'xyz65',
  source: oklabToXyz65,
  target: xyz65ToOklab,
  direct: {
    oklch: oklabToOklch,
    lrgb: oklabToLrgb,
    xyz50: oklabToXyz50,
  },
};

export const OKLCH: Matrix<'oklch'> = {
  id: 'oklch',
  hub: 'oklab',
  source: oklchToOklab,
  target: oklabToOklch,
};

export const LRGB: Matrix<'lrgb'> = {
  id: 'lrgb',
  hub: 'xyz65',
  source: lrgbToXyz65,
  target: xyz65ToLrgb,
  direct: {
    rgb: lrgbToRgb,
    hsv: lrgbToHsv,
    lab: lrgbToLab,
    oklab: lrgbToOklab,
    xyz50: lrgbToXyz50,
  },
};

export const XYZ50: Matrix<'xyz50'> = {
  id: 'xyz50',
  hub: 'xyz65',
  source: xyz50ToXyz65,
  target: xyz65ToXyz50,
  direct: {
    lab: xyz50ToLab,
    oklab: xyz50ToOklab,
    lrgb: xyz50ToLrgb,
  },
};

export const XYZ65: Matrix<'xyz65'> = {
  id: 'xyz65',
  hub: 'xyz65',
  source: (i, o) => {
    o.set(i);
  },
  target: (i, o) => {
    o.set(i);
  },
  direct: {
    lab: xyz65ToLab,
    oklab: xyz65ToOklab,
    lrgb: xyz65ToLrgb,
  },
};

export const MATRICES: { [S in Space]: Matrix<S> } = {
  rgb: RGB,
  hsl: HSL,
  hsv: HSV,
  hwb: HWB,
  lab: LAB,
  lch: LCH,
  oklab: OKLAB,
  oklch: OKLCH,
  lrgb: LRGB,
  xyz50: XYZ50,
  xyz65: XYZ65,
} as const;
