import type { ColorArray } from '../types';

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

function toPolar(input: ColorArray, output: ColorArray): void {
  const a = input[1];
  const b = input[2];

  const hueRaw = Math.atan2(b, a) * RAD_TO_DEG;

  output[0] = input[0];
  output[1] = Math.sqrt(a * a + b * b);
  output[2] = hueRaw < 0 ? hueRaw + 360 : hueRaw;
}

function toCartesian(input: ColorArray, output: ColorArray): void {
  const h = input[2];
  const hRad = (h >= 0 && h < 360 ? h : ((h % 360) + 360) % 360) * DEG_TO_RAD;

  const chroma = input[1];
  output[0] = input[0];
  output[1] = chroma * Math.cos(hRad);
  output[2] = chroma * Math.sin(hRad);
}

export const labToLch = toPolar;
export const oklabToOklch = toPolar;
export const lchToLab = toCartesian;
export const oklchToOklab = toCartesian;
