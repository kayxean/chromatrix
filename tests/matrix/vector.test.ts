import type { Space } from '~/lib/types';
import { describe, expect, it } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorTrace } from '../factory';

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

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomHwb(): Float32Array {
  const h = randomInRange(0, 360);
  const w = Math.random();
  const b = Math.random() * (1 - w);

  return createMockArray([h, w, b]);
}

function randomColor(space: Space): Float32Array {
  if (space === 'hwb') return randomHwb();

  const gamut = GAMUTS[space];
  return createMockArray([
    randomInRange(gamut.min[0], gamut.max[0]),
    randomInRange(gamut.min[1], gamut.max[1]),
    randomInRange(gamut.min[2], gamut.max[2]),
  ]);
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomDifferent<T>(arr: readonly T[]): { from: T; to: T } {
  const from = pickRandom(arr);
  let to = pickRandom(arr);
  while (to === from) {
    to = pickRandom(arr);
  }
  return { from, to };
}

const colorLogs: string[] = [];

function toRgb(value: Float32Array, space: Space): Float32Array {
  const rgb = createMockOutput();
  convertColor(value, rgb, space, 'rgb');
  return rgb;
}

function formatColor(input: Float32Array, output: Float32Array, from: Space, to: Space): string {
  const inputRgb = toRgb(input, from);
  const outputRgb = toRgb(output, to);

  const inR = Math.round(Math.max(0, Math.min(1, inputRgb[0])) * 255);
  const inG = Math.round(Math.max(0, Math.min(1, inputRgb[1])) * 255);
  const inB = Math.round(Math.max(0, Math.min(1, inputRgb[2])) * 255);

  const outR = Math.round(Math.max(0, Math.min(1, outputRgb[0])) * 255);
  const outG = Math.round(Math.max(0, Math.min(1, outputRgb[1])) * 255);
  const outB = Math.round(Math.max(0, Math.min(1, outputRgb[2])) * 255);

  const inHex = `#${inR.toString(16).padStart(2, '0')}${inG.toString(16).padStart(2, '0')}${inB.toString(16).padStart(2, '0')}`;
  const outHex = `#${outR.toString(16).padStart(2, '0')}${outG.toString(16).padStart(2, '0')}${outB.toString(16).padStart(2, '0')}`;

  const inputColor = `\u001B[38;2;${inR};${inG};${inB}m${inHex}\u001B[0m`;
  const outputColor = `\u001B[38;2;${outR};${outG};${outB}m${outHex}\u001B[0m`;

  const inputArr = `\u001B[38;2;${inR};${inG};${inB}m[${input[0].toFixed(3)}, ${input[1].toFixed(3)}, ${input[2].toFixed(3)}]\u001B[0m`;
  const outputArr = `\u001B[38;2;${outR};${outG};${outB}m[${output[0].toFixed(3)}, ${output[1].toFixed(3)}, ${output[2].toFixed(3)}]\u001B[0m`;

  return `${inputColor} ${outputColor} ${from}: ${inputArr} ${to}: ${outputArr}`;
}

describe('convertColor()', () => {
  for (let i = 0; i < 100; i++) {
    it(`should convert random-color-${i + 1}`, () => {
      const { from, to } = pickRandomDifferent(SPACES);

      const input = randomColor(from);
      const output = createMockOutput();

      convertColor(input, output, from, to);

      colorLogs.push(formatColor(input, output, from, to));

      for (let j = 0; j < 3; j++) {
        expect(Number.isFinite(output[j])).toBe(true);
      }
    });

    it(`should round-trip random-color-${i + 1}`, () => {
      const { from, to } = pickRandomDifferent(SPACES);
      const input = randomColor(from);
      const intermediate = createMockOutput();
      const backToStart = createMockOutput();

      convertColor(input, intermediate, from, to);
      convertColor(intermediate, backToStart, to, from);

      const expectedArray = Array.from(input);

      expectColorTrace(backToStart, expectedArray, 3, { from, to, intermediate });
    });
  }

  afterAll(() => {
    colorLogs.forEach((log) => process.stdout.write(log + '\n'));
  });
});
