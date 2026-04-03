import type { Color, ColorSpace, ColorAdapter } from './types';
import { xyz50ToXyz65, xyz65ToXyz50 } from './adapters/cat';
import { labToXyz50, xyz50ToLab } from './adapters/d50';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from './adapters/d65';
import { lrgbToRgb, rgbToLrgb } from './adapters/gamma';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from './adapters/polar';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from './adapters/srgb';
import { getSharedBuffer } from './shared';

export const NATIVE_HUB: Partial<Record<ColorSpace, 'xyz50' | 'xyz65'>> = {
  rgb: 'xyz65',
  lrgb: 'xyz65',
  hsl: 'xyz65',
  hsv: 'xyz65',
  hwb: 'xyz65',
  oklab: 'xyz65',
  oklch: 'xyz65',
  lab: 'xyz50',
  lch: 'xyz50',
};

export const TO_HUB: Partial<Record<ColorSpace, ColorAdapter[]>> = {
  rgb: [rgbToLrgb, lrgbToXyz65],
  lrgb: [lrgbToXyz65],
  hsv: [hsvToRgb, rgbToLrgb, lrgbToXyz65],
  hsl: [hslToHsv, hsvToRgb, rgbToLrgb, lrgbToXyz65],
  hwb: [hwbToHsv, hsvToRgb, rgbToLrgb, lrgbToXyz65],
  oklab: [oklabToXyz65],
  oklch: [oklchToOklab, oklabToXyz65],
  lab: [labToXyz50],
  lch: [lchToLab, labToXyz50],
  xyz50: [xyz50ToXyz65],
};

export const FROM_HUB: Partial<Record<ColorSpace, ColorAdapter[]>> = {
  rgb: [xyz65ToLrgb, lrgbToRgb],
  lrgb: [xyz65ToLrgb],
  hsv: [xyz65ToLrgb, lrgbToRgb, rgbToHsv],
  hsl: [xyz65ToLrgb, lrgbToRgb, rgbToHsv, hsvToHsl],
  hwb: [xyz65ToLrgb, lrgbToRgb, rgbToHsv, hsvToHwb],
  oklab: [xyz65ToOklab],
  oklch: [xyz65ToOklab, oklabToOklch],
  lab: [xyz50ToLab],
  lch: [xyz50ToLab, labToLch],
  xyz50: [xyz65ToXyz50],
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
    },
    hsv: {
      rgb: [hsvToRgb],
      hsl: [hsvToHsl],
      hwb: [hsvToHwb],
    },
    hwb: {
      rgb: [hwbToHsv, hsvToRgb],
      hsv: [hwbToHsv],
    },
    lab: { lch: [labToLch] },
    lch: { lab: [lchToLab] },
    lrgb: { rgb: [lrgbToRgb] },
    oklab: { oklch: [oklabToOklch] },
    oklch: { oklab: [oklchToOklab] },
  };

export function applyAdapter(chain: ColorAdapter[], buffer: Float32Array, idx: number): void {
  const len = chain.length;
  for (let i = 0; i < len; i++) {
    chain[i](buffer, idx);
  }
}

export function convertColor<S extends ColorSpace, T extends ColorSpace>(
  color: Color<S>,
  to: T,
): void {
  const from = color.space;
  if (from === (to as string)) return;

  const buffer = getSharedBuffer();
  const idx = color.index;

  const directChain = DIRECT_HUB[from]?.[to as ColorSpace];
  const hubPathLength = (TO_HUB[from]?.length ?? 0) + (FROM_HUB[to as ColorSpace]?.length ?? 0);

  if (directChain && directChain.length <= hubPathLength) {
    applyAdapter(directChain, buffer, idx);
  } else {
    const toHubChain = TO_HUB[from];
    if (toHubChain) applyAdapter(toHubChain, buffer, idx);

    const sourceHub = NATIVE_HUB[from] ?? from;
    const targetHub = NATIVE_HUB[to as ColorSpace] ?? (to as ColorSpace);

    if (sourceHub === 'xyz50' && targetHub === 'xyz65') {
      xyz50ToXyz65(buffer, idx);
    } else if (sourceHub === 'xyz65' && targetHub === 'xyz50') {
      xyz65ToXyz50(buffer, idx);
    }

    const fromHubChain = FROM_HUB[to as ColorSpace];
    if (fromHubChain) applyAdapter(fromHubChain, buffer, idx);
  }

  (color as { space: ColorSpace }).space = to;
}

export const TO_POLAR: Partial<Record<ColorSpace, ColorSpace>> = {
  rgb: 'hsl',
  lrgb: 'hsl',
  lab: 'lch',
  oklab: 'oklch',
};

export function convertHue<S extends ColorSpace>(color: Color<S>, mode: S): void {
  const targetPolar = TO_POLAR[mode];

  if (!targetPolar) return;

  convertColor(color, targetPolar);
}
