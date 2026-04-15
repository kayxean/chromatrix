const TO_DEG = 180 / Math.PI;
const TO_RAD = Math.PI / 180;

function toPolar(input: Float32Array, output: Float32Array): void {
  const a = input[1];
  const b = input[2];
  const c = Math.sqrt(a * a + b * b);
  const h = c < 1e-7 ? 0 : Math.atan2(b, a) * TO_DEG;
  output[0] = input[0];
  output[1] = c;
  output[2] = h < 0 ? h + 360 : h;
}

function toCartesian(input: Float32Array, output: Float32Array): void {
  const c = input[1];
  const h = input[2];
  const r = (((h % 360) + 360) % 360) * TO_RAD;

  output[0] = input[0];
  output[1] = c * Math.cos(r);
  output[2] = c * Math.sin(r);
}

export const labToLch = toPolar;
export const oklabToOklch = toPolar;
export const lchToLab = toCartesian;
export const oklchToOklab = toCartesian;
