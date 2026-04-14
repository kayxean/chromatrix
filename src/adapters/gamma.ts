const INV_12 = 1 / 12.92;
const INV_055 = 1 / 1.055;
const EXP = 2.4;
const INV_EXP = 1 / 2.4;

const TO_LIN = new Float32Array(1024);
const TO_RGB = new Float32Array(1024);

for (let i = 0; i < 1024; i++) {
  const n = i / 1023;
  TO_LIN[i] = n <= 0.04045 ? n * INV_12 : Math.pow((n + 0.055) * INV_055, EXP);
  TO_RGB[i] = n <= 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, INV_EXP) - 0.055;
}

export function lrgbToRgb(input: Float32Array, output: Float32Array): void {
  const lr = input[0];
  if (lr >= 0 && lr <= 1) {
    output[0] = TO_RGB[Math.trunc(lr * 1023 + 0.5)];
  } else {
    const abs = Math.abs(lr);
    const res = abs > 0.0031308 ? 1.055 * Math.pow(abs, INV_EXP) - 0.055 : abs * 12.92;
    output[0] = lr < 0 ? -res : res;
  }

  const lg = input[1];
  if (lg >= 0 && lg <= 1) {
    output[1] = TO_RGB[Math.trunc(lg * 1023 + 0.5)];
  } else {
    const abs = Math.abs(lg);
    const res = abs > 0.0031308 ? 1.055 * Math.pow(abs, INV_EXP) - 0.055 : abs * 12.92;
    output[1] = lg < 0 ? -res : res;
  }

  const lb = input[2];
  if (lb >= 0 && lb <= 1) {
    output[2] = TO_RGB[Math.trunc(lb * 1023 + 0.5)];
  } else {
    const abs = Math.abs(lb);
    const res = abs > 0.0031308 ? 1.055 * Math.pow(abs, INV_EXP) - 0.055 : abs * 12.92;
    output[2] = lb < 0 ? -res : res;
  }
}

export function rgbToLrgb(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  if (r >= 0 && r <= 1) {
    output[0] = TO_LIN[Math.trunc(r * 1023 + 0.5)];
  } else {
    const abs = Math.abs(r);
    const res = abs > 0.04045 ? Math.pow((abs + 0.055) * INV_055, EXP) : abs * INV_12;
    output[0] = r < 0 ? -res : res;
  }

  const g = input[1];
  if (g >= 0 && g <= 1) {
    output[1] = TO_LIN[Math.trunc(g * 1023 + 0.5)];
  } else {
    const abs = Math.abs(g);
    const res = abs > 0.04045 ? Math.pow((abs + 0.055) * INV_055, EXP) : abs * INV_12;
    output[1] = g < 0 ? -res : res;
  }

  const b = input[2];
  if (b >= 0 && b <= 1) {
    output[2] = TO_LIN[Math.trunc(b * 1023 + 0.5)];
  } else {
    const abs = Math.abs(b);
    const res = abs > 0.04045 ? Math.pow((abs + 0.055) * INV_055, EXP) : abs * INV_12;
    output[2] = b < 0 ? -res : res;
  }
}

export function hsvToLrgb(input: Float32Array, output: Float32Array): void {
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
    r = c + m;
    g = x + m;
    b = m;
  } else if (f === 1) {
    r = x + m;
    g = c + m;
    b = m;
  } else if (f === 2) {
    r = m;
    g = c + m;
    b = x + m;
  } else if (f === 3) {
    r = m;
    g = x + m;
    b = c + m;
  } else if (f === 4) {
    r = x + m;
    g = m;
    b = c + m;
  } else if (f === 5) {
    r = c + m;
    g = m;
    b = x + m;
  }

  if (r >= 0 && r <= 1) output[0] = TO_LIN[Math.trunc(r * 1023 + 0.5)];
  else {
    const abs = Math.abs(r);
    const res = abs > 0.04045 ? Math.pow((abs + 0.055) * INV_055, EXP) : abs * INV_12;
    output[0] = r < 0 ? -res : res;
  }

  if (g >= 0 && g <= 1) output[1] = TO_LIN[Math.trunc(g * 1023 + 0.5)];
  else {
    const abs = Math.abs(g);
    const res = abs > 0.04045 ? Math.pow((abs + 0.055) * INV_055, EXP) : abs * INV_12;
    output[1] = g < 0 ? -res : res;
  }

  if (b >= 0 && b <= 1) output[2] = TO_LIN[Math.trunc(b * 1023 + 0.5)];
  else {
    const abs = Math.abs(b);
    const res = abs > 0.04045 ? Math.pow((abs + 0.055) * INV_055, EXP) : abs * INV_12;
    output[2] = b < 0 ? -res : res;
  }
}

export function lrgbToHsv(input: Float32Array, output: Float32Array): void {
  const lr = input[0];
  const lg = input[1];
  const lb = input[2];
  let r = 0;
  let g = 0;
  let b = 0;

  if (lr >= 0 && lr <= 1) r = TO_RGB[Math.trunc(lr * 1023 + 0.5)];
  else {
    const abs = Math.abs(lr);
    const res = abs > 0.0031308 ? 1.055 * Math.pow(abs, INV_EXP) - 0.055 : abs * 12.92;
    r = lr < 0 ? -res : res;
  }

  if (lg >= 0 && lg <= 1) g = TO_RGB[Math.trunc(lg * 1023 + 0.5)];
  else {
    const abs = Math.abs(lg);
    const res = abs > 0.0031308 ? 1.055 * Math.pow(abs, INV_EXP) - 0.055 : abs * 12.92;
    g = lg < 0 ? -res : res;
  }

  if (lb >= 0 && lb <= 1) b = TO_RGB[Math.trunc(lb * 1023 + 0.5)];
  else {
    const abs = Math.abs(lb);
    const res = abs > 0.0031308 ? 1.055 * Math.pow(abs, INV_EXP) - 0.055 : abs * 12.92;
    b = lb < 0 ? -res : res;
  }

  const v = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const c = v - m;

  let h = 0;
  const s = v === 0 ? 0 : c / v;
  if (c !== 0) {
    if (v === r) h = (g - b) / c + (g < b ? 6 : 0);
    else if (v === g) h = (b - r) / c + 2;
    else h = (r - g) / c + 4;
    h *= 60;
  }

  output[0] = h;
  output[1] = s;
  output[2] = v;
}
