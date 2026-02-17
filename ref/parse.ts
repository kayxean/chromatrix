import type { Color, ColorSpace } from './types';
import { createColor } from './shared';

function parseHex(hex: string, start: number, length: number): number {
  const str =
    length === 1 ? hex[start] + hex[start] : hex.slice(start, start + 2);
  return Number.parseInt(str, 16);
}

export function parseColor(css: string): Color {
  const trimmed = css.trim();

  if (trimmed[0] === '#') {
    const hex = trimmed.slice(1);
    const len = hex.length;
    let r = 0,
      g = 0,
      b = 0,
      a = 255;

    if (len === 3 || len === 4) {
      r = parseHex(hex, 0, 1);
      g = parseHex(hex, 1, 1);
      b = parseHex(hex, 2, 1);
      if (len === 4) a = parseHex(hex, 3, 1);
    } else if (len === 6 || len === 8) {
      r = parseHex(hex, 0, 2);
      g = parseHex(hex, 2, 2);
      b = parseHex(hex, 4, 2);
      if (len === 8) a = parseHex(hex, 6, 2);
    } else {
      throw new Error(`Invalid Hex: ${css}`);
    }

    const color = createColor('rgb', [r / 255, g / 255, b / 255]);
    return { ...color, alpha: a / 255 };
  }

  const openParen = trimmed.indexOf('(');
  const closeParen = trimmed.lastIndexOf(')');

  if (openParen !== -1 && closeParen !== -1) {
    let spaceName = trimmed.slice(0, openParen).toLowerCase();
    const content = trimmed.slice(openParen + 1, closeParen);

    const parts = content.split(/[,\s/]+/).filter((p) => p.length > 0);

    let space: ColorSpace;
    let offset = 0;

    if (spaceName === 'color') {
      const profile = parts[0];
      offset = 1;
      if (profile === 'srgb-linear') space = 'lrgb';
      else if (profile === 'xyz' || profile === 'xyz-d65') space = 'xyz65';
      else if (profile === 'xyz-d50') space = 'xyz50';
      else space = profile as ColorSpace;
    } else {
      if (spaceName.length > 3 && spaceName.endsWith('a')) {
        spaceName = spaceName.slice(0, -1);
      }
      space = spaceName as ColorSpace;
    }

    const v0 = Number.parseFloat(parts[offset]);
    const v1 = Number.parseFloat(parts[offset + 1]);
    const v2 = Number.parseFloat(parts[offset + 2]);
    const rawA = parts[offset + 3];

    const color = createColor(space, [v0, v1, v2]);
    const val = color.value;

    if (space === 'rgb') {
      val[0] /= 255;
      val[1] /= 255;
      val[2] /= 255;
    } else if (space === 'hsl' || space === 'hwb') {
      val[1] /= 100;
      val[2] /= 100;
    } else if (
      space === 'lab' ||
      space === 'lch' ||
      space === 'oklab' ||
      space === 'oklch'
    ) {
      val[0] /= 100;
    }

    let alpha = 1;
    if (rawA !== undefined) {
      alpha = rawA.endsWith('%')
        ? Number.parseFloat(rawA) / 100
        : Number.parseFloat(rawA);
    }

    return {
      ...color,
      alpha: alpha < 0 ? 0 : alpha > 1 ? 1 : alpha,
    };
  }

  throw new Error(`Invalid format: ${css}`);
}
