import type { Color, ColorSpace } from './types';
import { createColor } from './shared';

const INV_255 = 1 / 255;
const INV_100 = 1 / 100;
const SPLIT_RE = /[\s,/]+/;

function parseNumber(str: string): number {
  let i = 0;
  const len = str.length;
  const neg = str.charCodeAt(0) === 45;
  if (neg) i++;

  let num = 0;
  while (i < len) {
    const char = str.charCodeAt(i);
    if (char < 48 || char > 57) break;
    num = num * 10 + (char - 48);
    i++;
  }

  if (i < len && str.charCodeAt(i) === 46) {
    let frac = 0;
    let factor = 0.1;
    i++;
    while (i < len) {
      const char = str.charCodeAt(i);
      if (char < 48 || char > 57) break;
      frac += (char - 48) * factor;
      factor *= 0.1;
      i++;
    }
    num += frac;
  }

  return neg ? -num : num;
}

function parseHex(hex: string): { r: number; g: number; b: number; a: number } {
  const len = hex.length;

  if (len === 0) {
    throw new Error(`empty color string`);
  }

  if (len !== 3 && len !== 4 && len !== 6 && len !== 8) {
    throw new Error(`invalid hex length: ${len}`);
  }

  if (len <= 4) {
    const n = Number.parseInt(hex, 16);
    const r = (len === 3 ? (n >> 8) & 0xf : (n >> 12) & 0xf) * 17;
    const g = (len === 3 ? (n >> 4) & 0xf : (n >> 8) & 0xf) * 17;
    const b = len === 3 ? n & 0xf : (n >> 4) & (0xf * 17);
    const a = len === 4 ? (n & 0xf) * 17 : 255;
    return { r, g, b, a };
  }

  const n = Number.parseInt(hex, 16) >>> 0;
  if (len === 6) {
    return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff, a: 255 };
  }
  return {
    r: (n >> 24) & 0xff,
    g: (n >> 16) & 0xff,
    b: (n >> 8) & 0xff,
    a: n & 0xff,
  };
}

export function parseColor(css: string): Color {
  const len = css.length;
  if (len === 0) throw new Error(`empty color string`);

  const firstChar = css.charCodeAt(0);

  if (firstChar === 35) {
    const hex = len === 4 || len === 7 ? css : css.trim();
    const { r, g, b, a } = parseHex(hex.slice(1));
    const color = createColor('rgb', [r * INV_255, g * INV_255, b * INV_255], a * INV_255);
    return color;
  }

  const trimmed = css.trim();
  if (trimmed.length === 0) throw new Error(`empty color string`);

  const openParen = trimmed.indexOf('(');
  if (openParen === -1) throw new Error(`invalid format`);

  const closeParen = trimmed.lastIndexOf(')');
  const name = trimmed.slice(0, openParen).toLowerCase();
  const content = trimmed.slice(openParen + 1, closeParen);

  const parts = content.split(SPLIT_RE);

  let space: ColorSpace;
  let offset = 0;

  if (name === 'color') {
    const profile = parts[0];
    offset = 1;
    if (profile === 'srgb-linear') space = 'lrgb';
    else if (profile === 'xyz' || profile === 'xyz-d65') space = 'xyz65';
    else if (profile === 'xyz-d50') space = 'xyz50';
    else space = profile as ColorSpace;
  } else {
    const baseName = name.length > 3 && name.endsWith('a') ? name.slice(0, -1) : name;
    space = baseName as ColorSpace;
  }

  let rawV0: number;
  let rawV1: number;
  let rawV2: number;
  if (offset < parts.length) {
    rawV0 = parseNumber(parts[offset]);
  } else {
    rawV0 = NaN;
  }
  if (offset + 1 < parts.length) {
    rawV1 = parseNumber(parts[offset + 1]);
  } else {
    rawV1 = NaN;
  }
  if (offset + 2 < parts.length) {
    rawV2 = parseNumber(parts[offset + 2]);
  } else {
    rawV2 = NaN;
  }
  if (Number.isNaN(rawV0) || Number.isNaN(rawV1) || Number.isNaN(rawV2)) {
    throw new Error(`invalid color: missing components`);
  }
  const rawA = parts[offset + 3];

  let v0: number, v1: number, v2: number;
  if (space === 'rgb' || space === 'lrgb') {
    v0 = rawV0 * INV_255;
    v1 = rawV1 * INV_255;
    v2 = rawV2 * INV_255;
  } else if (space === 'hsl' || space === 'hwb') {
    v0 = rawV0;
    v1 = rawV1 * INV_100;
    v2 = rawV2 * INV_100;
  } else if (space === 'lab' || space === 'lch') {
    v0 = rawV0 * INV_100;
    v1 = rawV1;
    v2 = rawV2;
  } else if (space === 'oklab' || space === 'oklch') {
    v0 = rawV0 * INV_100;
    v1 = rawV1 * INV_100;
    v2 = rawV2 * INV_100;
  } else {
    v0 = rawV0;
    v1 = rawV1;
    v2 = rawV2;
  }

  const alphaVal =
    rawA !== undefined ? (rawA.endsWith('%') ? parseNumber(rawA) * INV_100 : parseNumber(rawA)) : 1;

  const clampedAlpha = alphaVal < 0 ? 0 : alphaVal > 1 ? 1 : alphaVal;
  const color = createColor(space, [v0, v1, v2], clampedAlpha);
  return color;
}
