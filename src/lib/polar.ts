const TO_DEG = 180 / Math.PI;
const TO_RAD = Math.PI / 180;

function toPolar(input: Float32Array, output: Float32Array): void {
  const a = input[1];
  const b = input[2];
  const c = Math.sqrt(a * a + b * b);
  const h = Math.abs(c) < 1e-4 ? 0 : Math.atan2(b, a) * TO_DEG;
  output[0] = input[0];
  output[1] = c;
  output[2] = h < 0 ? h + 360 : h;
}

function toCartesian(input: Float32Array, output: Float32Array): void {
  const r = (((input[2] % 360) + 360) % 360) * TO_RAD;
  output[0] = input[0];
  output[1] = input[1] * Math.cos(r);
  output[2] = input[1] * Math.sin(r);
}

export const labToLch: typeof toPolar = toPolar;
export const lchToLab: typeof toCartesian = toCartesian;
export const oklabToOklch: typeof toPolar = toPolar;
export const oklchToOklab: typeof toCartesian = toCartesian;
