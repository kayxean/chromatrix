import type { Color, Space } from '../lib/types';

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
  none: 'none',
} as const;

const map = '0123456789abcdef';

const num = (v: number, f: number, unit = ''): string => {
  if (Number.isNaN(v)) return s.none;
  const val = Math.trunc(v * f + (v < 0 ? -0.5 : 0.5)) / f;
  return val + unit;
};

const fmts: Partial<Record<Space, (v: Float32Array, f: number, a: string) => string>> = {
  rgb: (v, _, a) =>
    s.rgb + num(v[0] * 255, 1) + s.sp + num(v[1] * 255, 1) + s.sp + num(v[2] * 255, 1) + a + s.e,

  hsl: (v, f, a) =>
    s.hsl +
    num(v[0], f, s.deg) +
    s.sp +
    num(v[1] * 100, f, s.pct) +
    s.sp +
    num(v[2] * 100, f, s.pct) +
    a +
    s.e,

  hwb: (v, f, a) =>
    s.hwb +
    num(v[0], f, s.deg) +
    s.sp +
    num(v[1] * 100, f, s.pct) +
    s.sp +
    num(v[2] * 100, f, s.pct) +
    a +
    s.e,

  lab: (v, f, a) =>
    s.lab + num(v[0], f, s.pct) + s.sp + num(v[1], f) + s.sp + num(v[2], f) + a + s.e,

  lch: (v, f, a) =>
    s.lch + num(v[0], f, s.pct) + s.sp + num(v[1], f) + s.sp + num(v[2], f, s.deg) + a + s.e,

  oklab: (v, f, a) =>
    s.oklab + num(v[0] * 100, f, s.pct) + s.sp + num(v[1], f) + s.sp + num(v[2], f) + a + s.e,

  oklch: (v, f, a) =>
    s.oklch +
    num(v[0] * 100, f, s.pct) +
    s.sp +
    num(v[1], f) +
    s.sp +
    num(v[2], f, s.deg) +
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
  if (a !== undefined && a < 255) {
    res += map[a >> 4] + map[a & 15];
  }
  return res;
}

export function formatCss<S extends Space>(color: Color<S>, asHex = false, precision = 2): string {
  const { space, value, alpha } = color;

  if (asHex && space === 'rgb') {
    return formatHex(
      Math.trunc((Number.isNaN(value[0]) ? 0 : value[0]) * 255 + 0.5),
      Math.trunc((Number.isNaN(value[1]) ? 0 : value[1]) * 255 + 0.5),
      Math.trunc((Number.isNaN(value[2]) ? 0 : value[2]) * 255 + 0.5),
      alpha === undefined ? undefined : Math.trunc(alpha * 255 + 0.5),
    );
  }

  const p = Math.max(0, Math.min(15, precision));
  const f = 10 ** p;

  const a =
    alpha === undefined || alpha >= 1
      ? ''
      : Number.isNaN(alpha)
        ? s.sl + s.none
        : s.sl + Math.trunc(alpha * f + 0.5) / f;

  const fn = fmts[space] as ((v: typeof value, f: number, a: string) => string) | undefined;

  if (fn !== undefined) {
    return fn(value, f, a);
  }

  const n = spaces[space] ?? space;
  return (
    s.clr +
    n +
    s.sp +
    num(value[0], f) +
    s.sp +
    num(value[1], f) +
    s.sp +
    num(value[2], f) +
    a +
    s.e
  );
}
