import type { Space } from '~/lib/types';
import { afterAll, describe, expect, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockOutput, expectColorTrace } from './factory';

const SPACES: readonly Space[] = [
  'rgb',
  'hsl',
  'hsv',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'lrgb',
  'xyz50',
  'xyz65',
];

const GAMUTS: Record<Space, { min: number[]; max: number[] }> = {
  rgb: { min: [0, 0, 0], max: [1, 1, 1] },
  hsl: { min: [0, 0, 0], max: [360, 1, 1] },
  hsv: { min: [0, 0, 0], max: [360, 1, 1] },
  hwb: { min: [0, 0, 0], max: [360, 1, 1] },
  lab: { min: [0, -125, -125], max: [100, 125, 125] },
  lch: { min: [0, 0, 0], max: [100, 150, 360] },
  oklab: { min: [0, -0.4, -0.4], max: [1, 0.4, 0.4] },
  oklch: { min: [0, 0, 0], max: [1, 0.4, 360] },
  lrgb: { min: [0, 0, 0], max: [1, 1, 1] },
  xyz50: { min: [0, 0, 0], max: [1, 1, 1] },
  xyz65: { min: [0, 0, 0], max: [1, 1, 1] },
};

const utils = {
  range: (min: number, max: number) => Math.random() * (max - min) + min,
  pickDifferent: (arr: readonly Space[]) => {
    const from = arr[Math.floor(Math.random() * arr.length)];
    let to = arr[Math.floor(Math.random() * arr.length)];
    while (to === from) to = arr[Math.floor(Math.random() * arr.length)];
    return { from, to };
  },
};

function toRgb(value: Float32Array, space: Space): Float32Array {
  const rgb = createMockOutput();
  convertColor(value, rgb, space, 'rgb');
  return rgb;
}

const clamp = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);

function formatColor(input: Float32Array, output: Float32Array, from: Space, to: Space): string {
  const inputRgb = toRgb(input, from);
  const outputRgb = toRgb(output, to);
  const [inR, inG, inB] = [clamp(inputRgb[0]), clamp(inputRgb[1]), clamp(inputRgb[2])];
  const [outR, outG, outB] = [clamp(outputRgb[0]), clamp(outputRgb[1]), clamp(outputRgb[2])];

  const inHex = `#${inR.toString(16).padStart(2, '0')}${inG.toString(16).padStart(2, '0')}${inB.toString(16).padStart(2, '0')}`;
  const outHex = `#${outR.toString(16).padStart(2, '0')}${outG.toString(16).padStart(2, '0')}${outB.toString(16).padStart(2, '0')}`;

  const inputColor = `\u001B[38;2;${inR};${inG};${inB}m${inHex}\u001B[0m`;
  const outputColor = `\u001B[38;2;${outR};${outG};${outB}m${outHex}\u001B[0m`;

  const inputArr = `\u001B[38;2;${inR};${inG};${inB}m[${input[0].toFixed(3)}, ${input[1].toFixed(3)}, ${input[2].toFixed(3)}]\u001B[0m`;
  const outputArr = `\u001B[38;2;${outR};${outG};${outB}m[${output[0].toFixed(3)}, ${output[1].toFixed(3)}, ${output[2].toFixed(3)}]\u001B[0m`;

  return `${inputColor} ${outputColor} ${from}: ${inputArr} ${to}: ${outputArr}`;
}

function generateValidColor(space: Space, target: Float32Array): void {
  const gamut = GAMUTS[space];

  for (let i = 0; i < 3; i++) {
    target[i] = utils.range(gamut.min[i], gamut.max[i]);
  }

  if (space === 'hwb') {
    const w = utils.range(gamut.min[1], gamut.max[1]);
    const b = utils.range(gamut.min[2], gamut.max[2] - w);
    target[1] = w;
    target[2] = b;
  } else if (space === 'hsl' || space === 'hsv') {
    target[1] = Math.max(0.01, target[1]);
    target[2] = utils.range(0.01, 0.99);
  } else if (space === 'lch' || space === 'oklch') {
    target[0] = Math.max(0.01, target[0]);
    target[1] = Math.max(0.01, target[1]);
  }
}

describe('convert-color-random', () => {
  const inputBuf = new Float32Array(3);
  const intermediateBuf = createMockOutput();
  const backToStartBuf = createMockOutput();
  const colorLogs: string[] = [];

  for (let i = 0; i < 100; i++) {
    test(`convert (random-color-${i + 1})`, () => {
      const { from, to } = utils.pickDifferent(SPACES);
      generateValidColor(from, inputBuf);

      convertColor(inputBuf, intermediateBuf, from, to);
      colorLogs.push(formatColor(inputBuf, intermediateBuf, from, to));

      for (let j = 0; j < 3; j++) {
        expect(Number.isFinite(intermediateBuf[j])).toBe(true);
      }
    });

    test(`convert (round-trip-${i + 1})`, () => {
      const { from, to } = utils.pickDifferent(SPACES);
      generateValidColor(from, inputBuf);

      convertColor(inputBuf, intermediateBuf, from, to);
      convertColor(intermediateBuf, backToStartBuf, to, from);

      expectColorTrace(backToStartBuf, Array.from(inputBuf), 3, {
        from,
        to,
        intermediate: intermediateBuf,
      });
    });
  }

  afterAll(() => {
    colorLogs.forEach((log) => {
      process.stdout.write(log + '\n');
    });
  });
});
