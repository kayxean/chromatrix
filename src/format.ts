import type { Color, Space } from './types';

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

const fmts: Partial<Record<Space, (v: Float32Array, f: number, a: string) => string>> = {
  rgb: (v, _, a) =>
    s.rgb +
    Math.trunc(v[0] * 255 + 0.5) +
    s.sp +
    Math.trunc(v[1] * 255 + 0.5) +
    s.sp +
    Math.trunc(v[2] * 255 + 0.5) +
    a +
    s.e,
  hsl: (v, f, a) =>
    s.hsl +
    Math.trunc(v[0] * f + 0.5) / f +
    s.deg_s +
    Math.trunc(v[1] * 100 * f + 0.5) / f +
    s.pct_s +
    Math.trunc(v[2] * 100 * f + 0.5) / f +
    s.pct +
    a +
    s.e,
  hwb: (v, f, a) =>
    s.hwb +
    Math.trunc(v[0] * f + 0.5) / f +
    s.deg_s +
    Math.trunc(v[1] * 100 * f + 0.5) / f +
    s.pct_s +
    Math.trunc(v[2] * 100 * f + 0.5) / f +
    s.pct +
    a +
    s.e,
  lab: (v, f, a) =>
    s.lab +
    Math.trunc(v[0] * f + 0.5) / f +
    s.pct_s +
    Math.trunc(v[1] * f + 0.5) / f +
    s.sp +
    Math.trunc(v[2] * f + 0.5) / f +
    a +
    s.e,
  lch: (v, f, a) =>
    s.lch +
    Math.trunc(v[0] * f + 0.5) / f +
    s.pct_s +
    Math.trunc(v[1] * f + 0.5) / f +
    s.sp +
    Math.trunc(v[2] * f + 0.5) / f +
    s.deg +
    a +
    s.e,
  oklab: (v, f, a) =>
    s.oklab +
    Math.trunc(v[0] * 100 * f + 0.5) / f +
    s.pct_s +
    Math.trunc(v[1] * f + 0.5) / f +
    s.sp +
    Math.trunc(v[2] * f + 0.5) / f +
    a +
    s.e,
  oklch: (v, f, a) =>
    s.oklch +
    Math.trunc(v[0] * 100 * f + 0.5) / f +
    s.pct_s +
    Math.trunc(v[1] * f + 0.5) / f +
    s.sp +
    Math.trunc(v[2] * f + 0.5) / f +
    s.deg +
    a +
    s.e,
};

const spaces: Partial<Record<Space, string>> = {
  lrgb: 'srgb-linear',
  xyz65: 'xyz-d65',
  xyz50: 'xyz-d50',
};

function formatHex(r: number, g: number, b: number, a?: number): string {
  let res = '#' + map[r >> 4] + map[r & 15] + map[g >> 4] + map[g & 15] + map[b >> 4] + map[b & 15];
  if (a !== undefined && a < 255) res += map[a >> 4] + map[a & 15];
  return res;
}

export function formatCss(color: Color, asHex = false, precision = 2): string {
  const { space, value, alpha } = color;

  if (asHex && space === 'rgb') {
    return formatHex(
      Math.trunc(value[0] * 255 + 0.5),
      Math.trunc(value[1] * 255 + 0.5),
      Math.trunc(value[2] * 255 + 0.5),
      alpha ? Math.trunc(alpha * 255 + 0.5) : undefined,
    );
  }

  const p = Math.max(0, Math.min(15, precision));
  const f = 10 ** p;
  const a = alpha !== undefined && alpha < 1 ? s.sl + Math.trunc(alpha * f + 0.5) / f : '';

  const fn = fmts[space] as ((v: typeof value, f: number, a: string) => string) | undefined;

  if (fn !== undefined) return fn(value, f, a);

  const n = spaces[space] ?? space;
  return (
    s.clr +
    n +
    s.sp +
    Math.trunc(value[0] * f + 0.5) / f +
    s.sp +
    Math.trunc(value[1] * f + 0.5) / f +
    s.sp +
    Math.trunc(value[2] * f + 0.5) / f +
    a +
    s.e
  );
}
