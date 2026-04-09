import type { Color, ColorSpace } from './types';
import { createColor } from './matrix';

const I255 = 1 / 255;
const I100 = 1 / 100;
const BUF = new Float32Array(4);
export const PTR = { i: 0 };

export function parseChar(c: number): number {
  if (c >= 48 && c <= 57) return c - 48;
  if (c >= 65 && c <= 70) return c - 55;
  if (c >= 97 && c <= 102) return c - 87;
  return 0;
}

export function parseNumber(s: string, i: number, l: number): number {
  let v = 0,
    n = 1,
    d = 0,
    m = 0.1;
  const f = s.charCodeAt(i);
  if (f === 45) {
    n = -1;
    i++;
  } else if (f === 43) i++;

  while (i < l) {
    const c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) {
      if (d === 0) v = v * 10 + (c - 48);
      else {
        v += (c - 48) * m;
        m *= 0.1;
      }
      i++;
    } else if (c === 46) {
      d = 1;
      i++;
    } else break;
  }
  PTR.i = i;
  return v * n;
}

export function parseSpace(s: string, b: number, e: number): ColorSpace | 'color' | null {
  const l = e - b;
  if (l < 3) return null;
  const c0 = s.charCodeAt(b) | 32,
    c1 = s.charCodeAt(b + 1) | 32,
    c2 = s.charCodeAt(b + 2) | 32;

  if (l === 3 || l === 4) {
    if (c0 === 114) return 'rgb';
    if (c0 === 104) return c1 === 115 ? 'hsl' : 'hwb';
    if (c0 === 108) return c1 === 97 ? 'lab' : 'lch';
  }
  if (l === 5) {
    if (c0 === 111 && c1 === 107)
      return c2 === 108 && (s.charCodeAt(b + 3) | 32) === 97 ? 'oklab' : 'oklch';
    if (c0 === 99 && (s.charCodeAt(b + 4) | 32) === 114) return 'color';
  }
  if (l >= 3 && c0 === 120 && c1 === 121 && c2 === 122) return 'xyz65';
  return null;
}

export function parseHex(s: string, i = 0): { r: number; g: number; b: number; a: number } {
  const l = s.length;
  let t = s.charCodeAt(i) === 35 ? i + 1 : i;
  const n = l - t;
  if (n === 0) throw new Error('empty hex');
  if (!((1 << n) & 344)) {
    throw new Error(`invalid hex length: ${n}`);
  }

  let r = 0,
    g = 0,
    b = 0,
    a = 255;
  if (n >= 6) {
    r = (parseChar(s.charCodeAt(t)) << 4) | parseChar(s.charCodeAt(t + 1));
    g = (parseChar(s.charCodeAt(t + 2)) << 4) | parseChar(s.charCodeAt(t + 3));
    b = (parseChar(s.charCodeAt(t + 4)) << 4) | parseChar(s.charCodeAt(t + 5));
    if (n === 8) a = (parseChar(s.charCodeAt(t + 6)) << 4) | parseChar(s.charCodeAt(t + 7));
  } else {
    r = parseChar(s.charCodeAt(t));
    r = (r << 4) | r;
    g = parseChar(s.charCodeAt(t + 1));
    g = (g << 4) | g;
    b = parseChar(s.charCodeAt(t + 2));
    b = (b << 4) | b;
    if (n === 4) {
      a = parseChar(s.charCodeAt(t + 3));
      a = (a << 4) | a;
    }
  }
  return { r, g, b, a };
}

export function parseColor(s: string): Color {
  const l = s.length;
  if (l === 0) throw new Error('empty');
  let i = 0;
  while (i < l && s.charCodeAt(i) <= 32) i++;

  if (s.charCodeAt(i) === 35) {
    const { r, g, b, a } = parseHex(s, i);
    const c = createColor('rgb', [r * I255, g * I255, b * I255]);
    c.alpha = a * I255;
    return c;
  }

  const ns = i;
  while (i < l && s.charCodeAt(i) !== 40 && s.charCodeAt(i) > 32) i++;
  const ne = i;

  let sp = parseSpace(s, ns, ne);
  if (!sp) throw new Error('format');

  i++;
  if (sp === 'color') {
    while (i < l && s.charCodeAt(i) <= 32) i++;
    const ps = i;
    while (i < l && s.charCodeAt(i) > 32) i++;
    const p = s.slice(ps, i);
    sp = (
      p === 'srgb-linear' ? 'lrgb' : p === 'xyz-d65' ? 'xyz65' : p === 'xyz-d50' ? 'xyz50' : p
    ) as ColorSpace;
    while (i < l && s.charCodeAt(i) <= 32) i++;
  }

  let k = 0;
  BUF[0] = 0;
  BUF[1] = 0;
  BUF[2] = 0;
  BUF[3] = 1;

  while (i < l && k < 4) {
    const c = s.charCodeAt(i);
    if (c === 41) break;
    if (c <= 32 || c === 44 || c === 47) {
      i++;
      continue;
    }

    let v = parseNumber(s, i, l);
    i = PTR.i;

    if (s.charCodeAt(i) === 37) {
      v *= I100;
      i++;
    } else {
      while (i < l) {
        const char = s.charCodeAt(i) | 32;
        if (char >= 97 && char <= 122) i++;
        else break;
      }
    }
    BUF[k++] = v;
  }

  let v0 = BUF[0],
    v1 = BUF[1],
    v2 = BUF[2];
  if (sp === 'rgb') {
    if (v0 > 1 || v1 > 1 || v2 > 1) {
      v0 *= I255;
      v1 *= I255;
      v2 *= I255;
    }
  } else if (sp === 'oklab' || sp === 'oklch') {
    if (v0 > 1) v0 *= I100;
    v1 *= I100;
    v2 *= I100;
  } else if (v0 > 1 && (sp === 'lab' || sp === 'lch')) {
    v0 *= I100;
  }

  const res = createColor(sp as ColorSpace, [v0, v1, v2]);
  res.alpha = BUF[3];
  return res;
}
