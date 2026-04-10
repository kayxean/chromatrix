import type { Color, Space } from './types';
import { createColor } from './matrix';

const I255 = 1 / 255;
const I100 = 1 / 100;
const BUF = new Float32Array(4);
const PTR = { i: 0 };

function parseChar(c: number): number {
  if (c >= 48 && c <= 57) return c - 48;
  if (c >= 65 && c <= 70) return c - 55;
  if (c >= 97 && c <= 102) return c - 87;
  return 0;
}

function parseNumber(s: string, i: number, l: number): number {
  let v = 0;
  let n = 1;
  let d = 0;
  let m = 0.1;
  const f = s.codePointAt(i) ?? 0;

  if (f === 45) {
    n = -1;
    i++;
  } else if (f === 43) i++;

  while (i < l) {
    const c = s.codePointAt(i) ?? 0;
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

function parseSpace(s: string, b: number, e: number): Space | 'color' | null {
  const l = e - b;
  if (l < 3) return null;

  const c0 = (s.codePointAt(b) ?? 0) | 32,
    c1 = (s.codePointAt(b + 1) ?? 0) | 32,
    c2 = (s.codePointAt(b + 2) ?? 0) | 32;

  if (l === 3 || l === 4) {
    if (c0 === 114) return 'rgb';
    if (c0 === 104) return c1 === 115 ? 'hsl' : 'hwb';
    if (c0 === 108) return c1 === 97 ? 'lab' : 'lch';
  }
  if (l === 5) {
    if (c0 === 111 && c1 === 107) {
      const c3 = (s.codePointAt(b + 3) ?? 0) | 32;
      return c2 === 108 && c3 === 97 ? 'oklab' : 'oklch';
    }
    const c4 = (s.codePointAt(b + 4) ?? 0) | 32;
    if (c0 === 99 && c4 === 114) return 'color';
  }
  if (l >= 3 && c0 === 120 && c1 === 121 && c2 === 122) return 'xyz65';
  return null;
}

function parseHex(s: string, i = 0): { r: number; g: number; b: number; a: number } {
  const l = s.length;
  const t = (s.codePointAt(i) ?? 0) === 35 ? i + 1 : i;
  const n = l - t;

  if (n === 0) throw new Error('empty hex');
  if (!((1 << n) & 344)) throw new Error(`invalid hex length: ${n}`);

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 255;

  if (n >= 6) {
    r = (parseChar(s.codePointAt(t) ?? 0) << 4) | parseChar(s.codePointAt(t + 1) ?? 0);
    g = (parseChar(s.codePointAt(t + 2) ?? 0) << 4) | parseChar(s.codePointAt(t + 3) ?? 0);
    b = (parseChar(s.codePointAt(t + 4) ?? 0) << 4) | parseChar(s.codePointAt(t + 5) ?? 0);
    if (n === 8) {
      a = (parseChar(s.codePointAt(t + 6) ?? 0) << 4) | parseChar(s.codePointAt(t + 7) ?? 0);
    }
  } else {
    r = parseChar(s.codePointAt(t) ?? 0);
    r = (r << 4) | r;
    g = parseChar(s.codePointAt(t + 1) ?? 0);
    g = (g << 4) | g;
    b = parseChar(s.codePointAt(t + 2) ?? 0);
    b = (b << 4) | b;
    if (n === 4) {
      a = parseChar(s.codePointAt(t + 3) ?? 0);
      a = (a << 4) | a;
    }
  }
  return { r, g, b, a };
}

function skipParse(s: string, i: number, l: number): number {
  while (i < l) {
    const c = s.codePointAt(i) ?? 0;
    if (c <= 32 || c === 44 || c === 47) i++;
    else break;
  }
  return i;
}

function parseValues(s: string, i: number, l: number): number {
  let k = 0;
  let c = i;
  BUF.fill(0);
  BUF[3] = 1;
  while (c < l && k < 4) {
    c = skipParse(s, c, l);
    if ((s.codePointAt(c) ?? 0) === 41) {
      break;
    }
    let v = parseNumber(s, c, l);
    const { i: d } = PTR;
    c = d;
    if ((s.codePointAt(c) ?? 0) === 37) {
      v *= I100;
      c++;
    } else {
      while (
        c < l &&
        ((s.codePointAt(c) ?? 0) | 32) >= 97 &&
        ((s.codePointAt(c) ?? 0) | 32) <= 122
      ) {
        c++;
      }
    }
    BUF[k] = v;
    k++;
  }
  return c;
}

function normalize(sp: string, v: Float32Array): [number, number, number] {
  let v0 = v[0],
    v1 = v[1],
    v2 = v[2];
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
  return [v0, v1, v2];
}

export function parseColor(s: string): Color {
  const l = s.length;
  if (l === 0) throw new Error('empty');
  let i = skipParse(s, 0, l);

  if ((s.codePointAt(i) ?? 0) === 35) {
    const { r, g, b, a } = parseHex(s, i);
    const c = createColor('rgb', [r * I255, g * I255, b * I255]);
    c.alpha = a * I255;
    return c;
  }

  const ns = i;
  while (i < l && (s.codePointAt(i) ?? 0) !== 40 && (s.codePointAt(i) ?? 0) > 32) i++;
  let sp = parseSpace(s, ns, i);
  if (!sp) throw new Error('format');

  if (sp === 'color') {
    i = skipParse(s, i + 1, l);
    const ps = i;
    while (i < l && (s.codePointAt(i) ?? 0) > 32) i++;
    const p = s.slice(ps, i);
    if (p === 'srgb-linear' || p === 'xyz-d65' || p === 'xyz-d50') {
      sp = p === 'srgb-linear' ? 'lrgb' : p === 'xyz-d65' ? 'xyz65' : 'xyz50';
    } else {
      throw new Error('format');
    }
  } else i++;

  parseValues(s, i, l);
  const res = createColor(sp, normalize(sp, BUF));
  res.alpha = BUF[3];
  return res;
}
