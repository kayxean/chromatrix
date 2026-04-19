const TO_DEG = 180 / Math.PI;
const TO_RAD = Math.PI / 180;
let _cachedAngle = NaN;
let _cachedCos = 0;
let _cachedSin = 0;

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
  const h = input[2];
  const c = input[1];
  const r = (((h % 360) + 360) % 360) * TO_RAD;

  if (r !== _cachedAngle) {
    _cachedAngle = r;
    _cachedCos = Math.cos(r);
    _cachedSin = Math.sin(r);
  }

  output[0] = input[0];
  output[1] = c * _cachedCos;
  output[2] = c * _cachedSin;
}

export const labToLch = toPolar;
export const oklabToOklch = toPolar;
export const lchToLab = toCartesian;
export const oklchToOklab = toCartesian;
