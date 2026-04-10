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
  for (let i = 0; i < 3; i++) {
    const val = input[i];
    output[i] =
      val >= 0 && val <= 1
        ? TO_LIN[Math.trunc(val * 1023 + 0.5)]
        : val > 0.04045
          ? Math.pow((val + 0.055) * INV_055, EXP)
          : val * INV_12;
  }
}

export function lrgbToRgb(input: Float32Array, output: Float32Array): void {
  for (let i = 0; i < 3; i++) {
    const val = input[i];
    output[i] =
      val >= 0 && val <= 1
        ? TO_RGB[Math.trunc(val * 1023 + 0.5)]
        : val > 0.0031308
          ? 1.055 * Math.pow(Math.abs(val), INV_EXP) - 0.055
          : val * 12.92;
  }
}
