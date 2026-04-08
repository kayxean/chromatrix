import type { ColorAdapter, ColorArray, ColorSpace } from './types';
import { xyz50ToXyz65, xyz65ToXyz50 } from './adapters/cat';
import { labToXyz50, xyz50ToLab } from './adapters/d50';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from './adapters/d65';
import { lrgbToRgb, rgbToLrgb } from './adapters/gamma';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from './adapters/polar';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from './adapters/srgb';
import { createMatrix, dropMatrix } from './matrix';

export const NATIVE_HUB: Partial<Record<ColorSpace, 'xyz50' | 'xyz65'>> = {
  rgb: 'xyz65',
  hsl: 'xyz65',
  hsv: 'xyz65',
  hwb: 'xyz65',
  lab: 'xyz50',
  lch: 'xyz50',
  lrgb: 'xyz65',
  oklab: 'xyz65',
  oklch: 'xyz65',
};

export const TO_HUB: Partial<Record<ColorSpace, ColorAdapter[]>> = {
  rgb: [rgbToLrgb, lrgbToXyz65],
  hsl: [hslToHsv, hsvToRgb, rgbToLrgb, lrgbToXyz65],
  hsv: [hsvToRgb, rgbToLrgb, lrgbToXyz65],
  hwb: [hwbToHsv, hsvToRgb, rgbToLrgb, lrgbToXyz65],
  lab: [labToXyz50],
  lch: [lchToLab, labToXyz50],
  lrgb: [lrgbToXyz65],
  oklab: [oklabToXyz65],
  oklch: [oklchToOklab, oklabToXyz65],
};

export const FROM_HUB: Partial<Record<ColorSpace, ColorAdapter[]>> = {
  rgb: [xyz65ToLrgb, lrgbToRgb],
  hsl: [xyz65ToLrgb, lrgbToRgb, rgbToHsv, hsvToHsl],
  hsv: [xyz65ToLrgb, lrgbToRgb, rgbToHsv],
  hwb: [xyz65ToLrgb, lrgbToRgb, rgbToHsv, hsvToHwb],
  lab: [xyz50ToLab],
  lch: [xyz50ToLab, labToLch],
  lrgb: [xyz65ToLrgb],
  oklab: [xyz65ToOklab],
  oklch: [xyz65ToOklab, oklabToOklch],
};

export const DIRECT_HUB: Partial<Record<ColorSpace, Partial<Record<ColorSpace, ColorAdapter[]>>>> =
  {
    rgb: {
      hsl: [rgbToHsv, hsvToHsl],
      hsv: [rgbToHsv],
      hwb: [rgbToHsv, hsvToHwb],
      lrgb: [rgbToLrgb],
    },
    hsl: {
      rgb: [hslToHsv, hsvToRgb],
      hsv: [hslToHsv],
      hwb: [hslToHsv, hsvToHwb],
    },
    hsv: {
      rgb: [hsvToRgb],
      hsl: [hsvToHsl],
      hwb: [hsvToHwb],
    },
    hwb: {
      rgb: [hwbToHsv, hsvToRgb],
      hsv: [hwbToHsv],
      hsl: [hwbToHsv, hsvToHsl],
    },
    lab: { lch: [labToLch] },
    lch: { lab: [lchToLab] },
    lrgb: { rgb: [lrgbToRgb] },
    oklab: { oklch: [oklabToOklch] },
    oklch: { oklab: [oklchToOklab] },
  };

export function convertColor<S extends ColorSpace, X extends ColorSpace>(
  input: ColorArray,
  output: ColorArray,
  from: S,
  to: X,
): void {
  if (from === (to as string)) {
    if (input !== output) {
      output.set(input);
    }
    return;
  }

  const directChain = DIRECT_HUB[from]?.[to as ColorSpace];
  if (directChain) {
    const len = directChain.length;
    if (len === 1) {
      directChain[0](input, output);
    } else {
      const scratch = createMatrix('rgb');
      directChain[0](input, scratch);
      for (let i = 1; i < len - 1; i++) {
        directChain[i](scratch, scratch);
      }
      directChain[len - 1](scratch, output);
      dropMatrix(scratch);
    }
    return;
  }

  const sourceHub = NATIVE_HUB[from] ?? (from as 'xyz50' | 'xyz65');
  const targetHub = NATIVE_HUB[to as ColorSpace] ?? (to as 'xyz50' | 'xyz65');
  const toHubChain = TO_HUB[from];
  const fromHubChain = FROM_HUB[to as ColorSpace];

  let scratch: ColorArray | null = null;

  if (toHubChain) {
    const len = toHubChain.length;
    if (len === 1) {
      toHubChain[0](input, output);
    } else {
      scratch = createMatrix('rgb');
      toHubChain[0](input, scratch);
      for (let i = 1; i < len - 1; i++) {
        toHubChain[i](scratch, scratch);
      }
      toHubChain[len - 1](scratch, output);
    }
  } else if (input !== output) {
    output.set(input);
  }

  if (sourceHub !== targetHub) {
    if (sourceHub === 'xyz65') {
      xyz65ToXyz50(output, output);
    } else {
      xyz50ToXyz65(output, output);
    }
  }

  if (fromHubChain) {
    const len = fromHubChain.length;
    if (len === 1) {
      fromHubChain[0](output, output);
    } else {
      if (!scratch) {
        scratch = createMatrix('rgb');
      }
      fromHubChain[0](output, scratch);
      for (let i = 1; i < len - 1; i++) {
        fromHubChain[i](scratch, scratch);
      }
      fromHubChain[len - 1](scratch, output);
    }
  }

  if (scratch) {
    dropMatrix(scratch);
  }
}

export const TO_POLAR: Partial<Record<ColorSpace, ColorSpace>> = {
  rgb: 'hsl',
  lrgb: 'hsl',
  lab: 'lch',
  oklab: 'oklch',
};

export function convertHue<S extends ColorSpace>(
  input: ColorArray,
  output: ColorArray,
  mode: S,
): void {
  const targetPolar = TO_POLAR[mode];

  if (!targetPolar) {
    if (input !== output) output.set(input);
    return;
  }

  convertColor(input, output, mode, targetPolar);
}
