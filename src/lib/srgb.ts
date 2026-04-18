export function rgbToHsv(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const v = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const c = v - m;

  let h = 0;
  const s = v === 0 ? 0 : c / v;

  if (c > 2e-5) {
    if (v === r) h = (g - b) / c + (g < b ? 6 : 0);
    else if (v === g) h = (b - r) / c + 2;
    else h = (r - g) / c + 4;
    h *= 60;
  }

  output[0] = h;
  output[1] = Math.max(0, Math.min(1, s));
  output[2] = Math.max(0, Math.min(1, v));
}

export function hsvToRgb(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const v = input[2];

  const h60 = h / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((h60 % 2) - 1));
  const m = v - c;
  const f = ((Math.trunc(h60) % 6) + 6) % 6;

  let r = 0;
  let g = 0;
  let b = 0;

  if (f === 0) {
    r = c;
    g = x;
    b = 0;
  } else if (f === 1) {
    r = x;
    g = c;
    b = 0;
  } else if (f === 2) {
    r = 0;
    g = c;
    b = x;
  } else if (f === 3) {
    r = 0;
    g = x;
    b = c;
  } else if (f === 4) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  output[0] = r + m;
  output[1] = g + m;
  output[2] = b + m;
}

export function hsvToHsl(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = Math.max(0, Math.min(1, input[1]));
  const v = Math.max(0, Math.min(1, input[2]));

  const l = v * (1 - s / 2);
  const d = Math.min(l, 1 - l);
  const sl = d > 1e-7 ? (v - l) / d : 0;

  output[0] = h;
  output[1] = Math.max(0, Math.min(1, sl));
  output[2] = l;
}

export function hslToHsv(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = input[1];
  const l = input[2];

  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  output[0] = h;
  output[1] = sv;
  output[2] = v;
}

export function hsvToHwb(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const s = Math.max(0, Math.min(1, input[1]));
  const v = Math.max(0, Math.min(1, input[2]));

  output[0] = h;
  output[1] = (1 - s) * v;
  output[2] = 1 - v;
}

export function hwbToHsv(input: Float32Array, output: Float32Array): void {
  const h = input[0];
  const w = input[1];
  const b = input[2];

  const v = 1 - b;
  const s = v === 0 ? 0 : 1 - w / v;

  output[0] = h;
  output[1] = Math.max(0, Math.min(1, s));
  output[2] = v;
}
