import type { Matrix, Space } from './types';
import { xyz50ToXyz65, xyz65ToXyz50 } from './chroma';
import { labToXyz50, xyz50ToLab } from './cielab';
import { lrgbToRgb, rgbToLrgb } from './linear';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from './oklab';
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
  },
};

export const XYZ50: Matrix<'xyz50'> = {
  id: 'xyz50',
  hub: 'xyz65',
  source: xyz50ToXyz65,
  target: xyz65ToXyz50,
  direct: {
    lab: xyz50ToLab,
  },
};

export const XYZ65: Matrix<'xyz65'> = {
  id: 'xyz65',
  hub: 'xyz50',
  source: xyz65ToXyz50,
  target: xyz50ToXyz65,
  direct: {
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
};
