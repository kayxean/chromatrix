const HSV_COEFFS = new Float32Array([
  1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
  0, 0, 1,
]);

export function rgbToHsv(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const v = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const c = v - m;

  let h = 0;
  const s = Math.abs(v) < 1e-9 ? 0 : c / v;

  if (c >= 1e-5) {
    if (r >= g && r >= b) h = (g - b) / c + (g < b ? 6 : 0);
    else if (g >= r && g >= b) h = (b - r) / c + 2;
    else h = (r - g) / c + 4;
    h *= 60;
  } else {
    h = 0;
  }

  output[0] = ((h % 360) + 360) % 360;
  output[1] = s;
  output[2] = v;
}

export function hsvToRgb(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  if (s <= 0) {
    output[0] = v;
    output[1] = v;
    output[2] = v;
    return;
  }

  const n = ((h % 360) + 360) % 360;
  const h60 = n / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((h60 % 2) - 1));
  const m = v - c;

  const t = ((Math.floor(h60) % 6) + 6) % 6;
  const o = t * 6;

  output[0] = HSV_COEFFS[o] * c + HSV_COEFFS[o + 1] * x + m;
  output[1] = HSV_COEFFS[o + 2] * c + HSV_COEFFS[o + 3] * x + m;
  output[2] = HSV_COEFFS[o + 4] * c + HSV_COEFFS[o + 5] * x + m;
}

export function hsvToHsl(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  const l = v * (1 - s / 2);
  const c = Math.min(Math.abs(l), Math.abs(1 - l));
  const sl = Math.abs(c) < 1e-9 ? 0 : (v - l) / c;

  output[0] = h;
  output[1] = sl;
  output[2] = l;
}

export function hslToHsv(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const l = input[2];

  const v = l + s * Math.min(Math.abs(l), Math.abs(1 - l));
  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  output[0] = h;
  output[1] = sv;
  output[2] = v;
}

export function hsvToHwb(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  const w = (1 - s) * v;
  const b = 1 - v;

  output[0] = h;
  output[1] = w;
  output[2] = b;
}

export function hwbToHsv(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const w = input[1];
  const b = input[2];

  const v = 1 - b;
  const s = Math.abs(v) < 1e-9 ? 0 : 1 - w / v;

  output[0] = h;
  output[1] = s;
  output[2] = v;
}
