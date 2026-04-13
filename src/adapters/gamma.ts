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
