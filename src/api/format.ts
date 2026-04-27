import type { Color, Space } from '../lib/types';

const INT = Array.from({ length: 257 }, (_, i) => String(i));
const HEX_L = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0')[0]);
const HEX_R = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0')[1]);

const BLANK = ' ';
const SLASH = ' / ';
const END = ')';
const NONE = 'none';
const DEGREE = 'deg';
const PERCENT = '%';
const EMPTY = '';

function serialize(v: number, f: number, u: string): string {
  if (Number.isNaN(v)) return NONE;

  if (v < 1e-6 && v > -1e-6) return '0' + u;

  if (v % 1 === 0 && v >= -1000 && v <= 1000) {
    if (v >= 0 && v <= 255) return INT[v] + u;
    return Math.trunc(v) + u;
  }

  const bias = v < 0 ? -0.5 : 0.5;
  return Math.trunc(v * f + bias) / f + u;
}

function rgbToHex(v: Float32Array, a: number | undefined): string {
  const r = v[0] < 0 ? 0 : v[0] > 1 ? 255 : Math.trunc(v[0] * 255 + 0.5);
  const g = v[1] < 0 ? 0 : v[1] > 1 ? 255 : Math.trunc(v[1] * 255 + 0.5);
  const b = v[2] < 0 ? 0 : v[2] > 1 ? 255 : Math.trunc(v[2] * 255 + 0.5);
  let s = '#' + HEX_L[r] + HEX_R[r] + HEX_L[g] + HEX_R[g] + HEX_L[b] + HEX_R[b];
  if (a !== undefined && a < 1) {
    const ai = a < 0 ? 0 : Math.trunc(a * 255 + 0.5);
    s += HEX_L[ai] + HEX_R[ai];
  }
  return s;
}

const rgbToCss = (v: Float32Array, _: number, a: string) =>
  'rgb(' +
  serialize(v[0] * 255, 1, EMPTY) +
  BLANK +
  serialize(v[1] * 255, 1, EMPTY) +
  BLANK +
  serialize(v[2] * 255, 1, EMPTY) +
  a +
  END;

const hslToCss = (v: Float32Array, f: number, a: string) =>
  'hsl(' +
  serialize(v[0], f, DEGREE) +
  BLANK +
  serialize(v[1] * 100, f, PERCENT) +
  BLANK +
  serialize(v[2] * 100, f, PERCENT) +
  a +
  END;

const hwbToCss = (v: Float32Array, f: number, a: string) =>
  'hwb(' +
  serialize(v[0], f, DEGREE) +
  BLANK +
  serialize(v[1] * 100, f, PERCENT) +
  BLANK +
  serialize(v[2] * 100, f, PERCENT) +
  a +
  END;

const labToCss = (v: Float32Array, f: number, a: string) =>
  'lab(' +
  serialize(v[0] * 100, f, PERCENT) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, EMPTY) +
  a +
  END;

const lchToCss = (v: Float32Array, f: number, a: string) =>
  'lch(' +
  serialize(v[0] * 100, f, PERCENT) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, DEGREE) +
  a +
  END;

const oklabToCss = (v: Float32Array, f: number, a: string) =>
  'oklab(' +
  serialize(v[0] * 100, f, PERCENT) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, EMPTY) +
  a +
  END;

const oklchToCss = (v: Float32Array, f: number, a: string) =>
  'oklch(' +
  serialize(v[0] * 100, f, PERCENT) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, DEGREE) +
  a +
  END;

const lrgbToCss = (v: Float32Array, f: number, a: string) =>
  'color(srgb-linear ' +
  serialize(v[0], f, EMPTY) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, EMPTY) +
  a +
  END;

const xyz50ToCss = (v: Float32Array, f: number, a: string) =>
  'color(xyz-d50 ' +
  serialize(v[0], f, EMPTY) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, EMPTY) +
  a +
  END;

const xyz65ToCss = (v: Float32Array, f: number, a: string) =>
  'color(xyz-d65 ' +
  serialize(v[0], f, EMPTY) +
  BLANK +
  serialize(v[1], f, EMPTY) +
  BLANK +
  serialize(v[2], f, EMPTY) +
  a +
  END;

const FORMATTERS: Record<string, (v: Float32Array, f: number, a: string) => string> = {
  rgb: rgbToCss,
  hsl: hslToCss,
  hwb: hwbToCss,
  lab: labToCss,
  lch: lchToCss,
  oklab: oklabToCss,
  oklch: oklchToCss,
  lrgb: lrgbToCss,
  xyz50: xyz50ToCss,
  xyz65: xyz65ToCss,
};

export function formatCss<S extends Space>(color: Color<S>, asHex = false, precision = 2): string {
  const { space, value, alpha } = color;

  if (asHex && space === 'rgb') {
    return rgbToHex(value, alpha);
  }

  const factor = 10 ** Math.max(0, Math.min(15, precision));
  const alphaPart =
    alpha === undefined || alpha >= 1 ? EMPTY : SLASH + serialize(alpha, factor, EMPTY);

  const fn = FORMATTERS[space];
  if (fn !== undefined) {
    return fn(value, factor, alphaPart);
  }

  return 'unknown-color';
}
