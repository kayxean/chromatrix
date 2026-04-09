import type { Color, ColorMatrix, ColorSpace } from './types';

const s = {
  rgb: 'rgb(',
  hsl: 'hsl(',
  hwb: 'hwb(',
  lab: 'lab(',
  lch: 'lch(',
  oklab: 'oklab(',
  oklch: 'oklch(',
  clr: 'color(',
  deg_s: 'deg ',
  deg: 'deg',
  pct_s: '% ',
  pct: '%',
  sp: ' ',
  sl: ' / ',
  e: ')',
} as const;

const map = '0123456789abcdef';

const fmts: {
  [K in ColorSpace]?: (v: ColorMatrix<K>, f: number, a: string) => string;
} = {
  rgb: (v, _, a) =>
    s.rgb +
    ((v[0] * 255 + 0.5) | 0) +
    s.sp +
    ((v[1] * 255 + 0.5) | 0) +
    s.sp +
    ((v[2] * 255 + 0.5) | 0) +
    a +
    s.e,
  hsl: (v, f, a) =>
    s.hsl +
    ((v[0] * f + 0.5) | 0) / f +
    s.deg_s +
    ((v[1] * 100 * f + 0.5) | 0) / f +
    s.pct_s +
    ((v[2] * 100 * f + 0.5) | 0) / f +
    s.pct +
    a +
    s.e,
  hwb: (v, f, a) =>
    s.hwb +
    ((v[0] * f + 0.5) | 0) / f +
    s.deg_s +
    ((v[1] * 100 * f + 0.5) | 0) / f +
    s.pct_s +
    ((v[2] * 100 * f + 0.5) | 0) / f +
    s.pct +
    a +
    s.e,
  lab: (v, f, a) =>
    s.lab +
    ((v[0] * f + 0.5) | 0) / f +
    s.pct_s +
    ((v[1] * f + 0.5) | 0) / f +
    s.sp +
    ((v[2] * f + 0.5) | 0) / f +
    a +
    s.e,
  lch: (v, f, a) =>
    s.lch +
    ((v[0] * f + 0.5) | 0) / f +
    s.pct_s +
    ((v[1] * f + 0.5) | 0) / f +
    s.sp +
    ((v[2] * f + 0.5) | 0) / f +
    s.deg +
    a +
    s.e,
  oklab: (v, f, a) =>
    s.oklab +
    ((v[0] * 100 * f + 0.5) | 0) / f +
    s.pct_s +
    ((v[1] * f + 0.5) | 0) / f +
    s.sp +
    ((v[2] * f + 0.5) | 0) / f +
    a +
    s.e,
  oklch: (v, f, a) =>
    s.oklch +
    ((v[0] * 100 * f + 0.5) | 0) / f +
    s.pct_s +
    ((v[1] * f + 0.5) | 0) / f +
    s.sp +
    ((v[2] * f + 0.5) | 0) / f +
    s.deg +
    a +
    s.e,
};

const spaces: Partial<{ [X in ColorSpace]: string }> = {
  lrgb: 'srgb-linear',
  xyz65: 'xyz-d65',
  xyz50: 'xyz-d50',
};

export function formatHex(r: number, g: number, b: number, a?: number): string {
  let res = '#' + map[r >> 4] + map[r & 15] + map[g >> 4] + map[g & 15] + map[b >> 4] + map[b & 15];
  if (a !== undefined && a < 255) res += map[a >> 4] + map[a & 15];
  return res;
}

export function formatCss(color: Color, asHex?: boolean, precision = 2): string {
  const { space, value, alpha } = color;

  if (asHex && space === 'rgb') {
    return formatHex(
      (value[0] * 255 + 0.5) | 0,
      (value[1] * 255 + 0.5) | 0,
      (value[2] * 255 + 0.5) | 0,
      alpha !== undefined ? (alpha * 255 + 0.5) | 0 : undefined,
    );
  }

  const p = precision < 0 ? 0 : precision > 15 ? 15 : precision;
  const f = 10 ** p;
  const a = alpha !== undefined && alpha < 1 ? s.sl + ((alpha * f + 0.5) | 0) / f : '';

  const fn = fmts[space as keyof typeof fmts] as
    | ((v: typeof value, f: number, a: string) => string)
    | undefined;

  if (fn) return fn(value, f, a);

  const n = spaces[space] || space;
  return (
    s.clr +
    n +
    s.sp +
    ((value[0] * f + 0.5) | 0) / f +
    s.sp +
    ((value[1] * f + 0.5) | 0) / f +
    s.sp +
    ((value[2] * f + 0.5) | 0) / f +
    a +
    s.e
  );
}
