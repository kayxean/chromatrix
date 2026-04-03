const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

function toPolar(buffer: Float32Array, idx: number): void {
  const L = buffer[idx];
  const a = buffer[idx + 1];
  const b = buffer[idx + 2];

  const chroma = Math.sqrt(a * a + b * b);
  let hue = Math.atan2(b, a) * RAD_TO_DEG;

  if (hue < 0) hue += 360;

  buffer[idx] = L;
  buffer[idx + 1] = chroma;
  buffer[idx + 2] = hue;
}

function toCartesian(buffer: Float32Array, idx: number): void {
  const L = buffer[idx];
  const C = buffer[idx + 1];
  let h = buffer[idx + 2];

  if (h < 0) h += 360;
  h = h % 360;
  const hRad = h * DEG_TO_RAD;

  buffer[idx] = L;
  buffer[idx + 1] = C * Math.cos(hRad);
  buffer[idx + 2] = C * Math.sin(hRad);
}

export const labToLch = toPolar;
export const oklabToOklch = toPolar;
export const lchToLab = toCartesian;
export const oklchToOklab = toCartesian;
