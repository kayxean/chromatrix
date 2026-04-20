const LUT_SIZE = 65536;
const MAX_LUT = LUT_SIZE - 1;
const LIN_LUT = new Float32Array(LUT_SIZE + 1);
const RGB_LUT = new Float32Array(LUT_SIZE + 1);

for (let i = 0; i < LUT_SIZE; i++) {
  const v = i / MAX_LUT;
  LIN_LUT[i] = v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  RGB_LUT[i] = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

LIN_LUT[LUT_SIZE] = LIN_LUT[MAX_LUT];
RGB_LUT[LUT_SIZE] = RGB_LUT[MAX_LUT];

function toLin(v: number): number {
  if (v < 0 || v > 1) {
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }
  const s = v * MAX_LUT;
  const i = Math.trunc(s);
  const t = s - i;
  return LIN_LUT[i] + t * (LIN_LUT[i + 1] - LIN_LUT[i]);
}

function toRgb(v: number): number {
  if (v < 0 || v > 1) {
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  }
  const s = v * MAX_LUT;
  const i = Math.trunc(s);
  const t = s - i;
  return RGB_LUT[i] + t * (RGB_LUT[i + 1] - RGB_LUT[i]);
}

export function rgbToLrgb(input: Float32Array, output: Float32Array): void {
  output[0] = toLin(input[0]);
  output[1] = toLin(input[1]);
  output[2] = toLin(input[2]);
}

export function lrgbToRgb(input: Float32Array, output: Float32Array): void {
  output[0] = toRgb(input[0]);
  output[1] = toRgb(input[1]);
  output[2] = toRgb(input[2]);
}

export function lrgbToXyz65(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];
  output[0] = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  output[1] = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  output[2] = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
}

export function lrgbToXyz50(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];
  output[0] = 0.4360747 * r + 0.3850648 * g + 0.1430804 * b;
  output[1] = 0.2225045 * r + 0.7168786 * g + 0.0606169 * b;
  output[2] = 0.0139322 * r + 0.0971045 * g + 0.7141733 * b;
}

export function xyz65ToLrgb(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];
  output[0] = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  output[1] = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
  output[2] = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
}

export function xyz50ToLrgb(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];
  output[0] = 3.1338561 * x - 1.6168667 * y - 0.4906146 * z;
  output[1] = -0.9787684 * x + 1.9161415 * y + 0.033454 * z;
  output[2] = 0.0719453 * x - 0.2289914 * y + 1.4052427 * z;
}
