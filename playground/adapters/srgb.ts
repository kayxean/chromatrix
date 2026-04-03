const INV_12_92 = 1 / 12.92;
const INV_1_055 = 1 / 1.055;
const GAMMA_EXP = 2.4;
const GAMMA_COMP = 1 / 2.4;
const INV_60 = 1 / 60;

export function rgbToLrgb(buffer: Float32Array, idx: number): void {
  const r = buffer[idx];
  const g = buffer[idx + 1];
  const b = buffer[idx + 2];

  buffer[idx] = r <= 0.04045 ? r * INV_12_92 : ((r + 0.055) * INV_1_055) ** GAMMA_EXP;
  buffer[idx + 1] = g <= 0.04045 ? g * INV_12_92 : ((g + 0.055) * INV_1_055) ** GAMMA_EXP;
  buffer[idx + 2] = b <= 0.04045 ? b * INV_12_92 : ((b + 0.055) * INV_1_055) ** GAMMA_EXP;
}

export function lrgbToRgb(buffer: Float32Array, idx: number): void {
  const lr = buffer[idx];
  const lg = buffer[idx + 1];
  const lb = buffer[idx + 2];

  buffer[idx] =
    lr <= 0.0031308 ? lr * 12.92 : Math.sign(lr) * (1.055 * Math.abs(lr) ** GAMMA_COMP - 0.055);
  buffer[idx + 1] =
    lg <= 0.0031308 ? lg * 12.92 : Math.sign(lg) * (1.055 * Math.abs(lg) ** GAMMA_COMP - 0.055);
  buffer[idx + 2] =
    lb <= 0.0031308 ? lb * 12.92 : Math.sign(lb) * (1.055 * Math.abs(lb) ** GAMMA_COMP - 0.055);
}

export function rgbToHsv(buffer: Float32Array, idx: number): void {
  const r = buffer[idx];
  const g = buffer[idx + 1];
  const b = buffer[idx + 2];
  const v = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const c = v - min;

  let h = 0;
  let s = 0;

  if (v !== 0) s = c / v;

  if (c !== 0) {
    const invC = 1 / c;
    if (v === r) h = (g - b) * invC;
    else if (v === g) h = (b - r) * invC + 2;
    else h = (r - g) * invC + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  buffer[idx] = h;
  buffer[idx + 1] = s;
  buffer[idx + 2] = v;
}

export function hsvToRgb(buffer: Float32Array, idx: number): void {
  const h60 = buffer[idx] * INV_60;
  const s = buffer[idx + 1];
  const v = buffer[idx + 2];

  if (s === 0) {
    buffer[idx] = buffer[idx + 1] = buffer[idx + 2] = v;
    return;
  }

  const c = v * s;
  const x = c * (1 - Math.abs((h60 % 2) - 1));
  const m = v - c;
  const f = ((Math.floor(h60) % 6) + 6) % 6;

  let r = 0,
    g = 0,
    b = 0;
  if (f === 0) {
    r = c;
    g = x;
  } else if (f === 1) {
    r = x;
    g = c;
  } else if (f === 2) {
    g = c;
    b = x;
  } else if (f === 3) {
    g = x;
    b = c;
  } else if (f === 4) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  buffer[idx] = r + m;
  buffer[idx + 1] = g + m;
  buffer[idx + 2] = b + m;
}

export function hsvToHsl(buffer: Float32Array, idx: number): void {
  const h = buffer[idx];
  const s = buffer[idx + 1];
  const v = buffer[idx + 2];
  const l = v * (1 - s * 0.5);
  let sL = 0;
  if (l > 0 && l < 1) sL = (v - l) / Math.min(l, 1 - l);
  buffer[idx] = h;
  buffer[idx + 1] = sL;
  buffer[idx + 2] = l;
}

export function hslToHsv(buffer: Float32Array, idx: number): void {
  const h = buffer[idx];
  const s = buffer[idx + 1];
  const l = buffer[idx + 2];
  const v = l + s * Math.min(l, 1 - l);
  const sV = v === 0 ? 0 : 2 * (1 - l / v);
  buffer[idx] = h;
  buffer[idx + 1] = sV;
  buffer[idx + 2] = v;
}

export function hsvToHwb(buffer: Float32Array, idx: number): void {
  const h = buffer[idx];
  const s = buffer[idx + 1];
  const v = buffer[idx + 2];
  buffer[idx] = h;
  buffer[idx + 1] = v * (1 - s);
  buffer[idx + 2] = 1 - v;
}

export function hwbToHsv(buffer: Float32Array, idx: number): void {
  const h = buffer[idx];
  const w = buffer[idx + 1];
  const b = buffer[idx + 2];
  const v = 1 - b;
  const s = v === 0 ? 0 : (v - w) / v;
  buffer[idx] = h;
  buffer[idx + 1] = s < 0 ? 0 : s;
  buffer[idx + 2] = v;
}
