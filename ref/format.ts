import type { Color } from './types';

const F_FACTORS = [1, 10, 100, 1000, 10000, 100000];

export function formatCss(
  color: Color,
  alpha?: number,
  asHex?: boolean,
  precision = 2,
): string {
  const { space, value } = color;
  const f = precision < 6 ? F_FACTORS[precision] : 10 ** precision;

  if (asHex && space === 'rgb') {
    const r = (value[0] * 255 + 0.5) | 0;
    const g = (value[1] * 255 + 0.5) | 0;
    const b = (value[2] * 255 + 0.5) | 0;

    const rgbHex = ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);

    if (alpha !== undefined && alpha < 1) {
      const a = (alpha * 255 + 0.5) | 0;
      return `#${rgbHex}${a.toString(16).padStart(2, '0')}`;
    }
    return `#${rgbHex}`;
  }

  const n1 = Math.round(value[0] * f) / f;
  const n2 = Math.round(value[1] * f) / f;
  const n3 = Math.round(value[2] * f) / f;

  const suffix =
    alpha !== undefined && alpha < 1 ? ` / ${Math.round(alpha * f) / f}` : '';

  switch (space) {
    case 'rgb': {
      const r = (value[0] * 255 + 0.5) | 0;
      const g = (value[1] * 255 + 0.5) | 0;
      const b = (value[2] * 255 + 0.5) | 0;
      return `rgb(${r} ${g} ${b}${suffix})`;
    }

    case 'hsl':
    case 'hwb':
      return `${space}(${n1}deg ${Math.round(value[1] * 100 * f) / f}% ${Math.round(value[2] * 100 * f) / f}%${suffix})`;

    case 'lab':
      return `lab(${n1}% ${n2} ${n3}${suffix})`;

    case 'lch':
      return `lch(${n1}% ${n2} ${n3}deg${suffix})`;

    case 'oklab': {
      const f4 = 10000;
      return `oklab(${Math.round(value[0] * 100 * f) / f}% ${Math.round(value[1] * f4) / f4} ${Math.round(value[2] * f4) / f4}${suffix})`;
    }

    case 'oklch': {
      const f4 = 10000;
      return `oklch(${Math.round(value[0] * 100 * f) / f}% ${Math.round(value[1] * f4) / f4} ${n3}deg${suffix})`;
    }

    case 'lrgb':
      return `color(srgb-linear ${n1} ${n2} ${n3}${suffix})`;

    case 'xyz65':
      return `color(xyz-d65 ${n1} ${n2} ${n3}${suffix})`;

    case 'xyz50':
      return `color(xyz-d50 ${n1} ${n2} ${n3}${suffix})`;

    default:
      return `color(${space} ${n1} ${n2} ${n3}${suffix})`;
  }
}
