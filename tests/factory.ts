import type { Color, Space } from '~/lib/types';
import { expect } from 'vitest';
import { convertColor } from '~/api/convert';

export const SPACES: readonly Space[] = [
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

export const GAMUTS: Record<Space, { min: number[]; max: number[] }> = {
  rgb: { min: [0, 0, 0], max: [1, 1, 1] },
  hsl: { min: [0, 0, 0], max: [360, 1, 1] },
  hsv: { min: [0, 0, 0], max: [360, 1, 1] },
  hwb: { min: [0, 0, 0], max: [360, 1, 1] },
  lab: { min: [0, -125, -125], max: [1, 125, 125] },
  lch: { min: [0, 0, 0], max: [1, 150, 360] },
  oklab: { min: [0, -0.4, -0.4], max: [1, 0.4, 0.4] },
  oklch: { min: [0, 0, 0], max: [1, 0.4, 360] },
  lrgb: { min: [0, 0, 0], max: [1, 1, 1] },
  xyz50: { min: [0, 0, 0], max: [1, 1, 1] },
  xyz65: { min: [0, 0, 0], max: [1, 1, 1] },
};

export function generateValidColor(space: Space, target: Float32Array): void {
  const gamut = GAMUTS[space];
  for (let i = 0; i < 3; i++) {
    target[i] = utils.range(gamut.min[i], gamut.max[i], 3);
  }
  switch (space) {
    case 'rgb':
    case 'lrgb': {
      target[0] = Math.max(0.005, Math.min(0.995, target[0]));
      target[1] = Math.max(0.005, Math.min(0.995, target[1]));
      target[2] = Math.max(0.005, Math.min(0.995, target[2]));
      break;
    }
    case 'hsl':
    case 'hsv': {
      target[1] = Math.max(0.01, target[1]);
      target[2] = utils.range(0.01, 0.99, 3);
      break;
    }
    case 'hwb': {
      const w = utils.range(0, 1, 3);
      const b = utils.range(0, utils.round(1 - w, 3), 3);
      target[1] = w;
      target[2] = b;
      break;
    }
    case 'lab':
    case 'oklab': {
      target[0] = Math.max(0.01, target[0]);
      break;
    }
    case 'lch':
    case 'oklch': {
      target[0] = Math.max(0.01, target[0]);
      target[1] = Math.max(0.01, target[1]);
      break;
    }
    case 'xyz50':
    case 'xyz65': {
      target[0] = Math.max(0.001, target[0]);
      target[1] = Math.max(0.001, target[1]);
      target[2] = Math.max(0.001, target[2]);
      break;
    }
  }
  for (let i = 0; i < 3; i++) {
    target[i] = utils.round(target[i], 3);
  }
}

export const utils = {
  round: (value: number, p: number) => {
    const m = Math.pow(10, p);
    return Math.round(value * m) / m;
  },
  range: (min: number, max: number, decimals = 3) => {
    const r = Math.random();
    let val: number;
    if (r < 0.005) {
      val = min;
    } else if (r > 0.995) {
      val = max;
    } else {
      val = Math.random() * (max - min) + min;
    }
    return utils.round(val, decimals);
  },
  pickDifferent: (arr: readonly Space[]) => {
    const fromIdx = Math.floor(Math.random() * arr.length);
    const offset = 1 + Math.floor(Math.random() * (arr.length - 1));
    const toIdx = (fromIdx + offset) % arr.length;
    return {
      from: arr[fromIdx],
      to: arr[toIdx],
    };
  },
};

const clamp = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);

export function formatColorTrace(
  input: Float32Array,
  output: Float32Array,
  from: Space,
  to: Space,
): string {
  const rgbIn = new Float32Array(3);
  const rgbOut = new Float32Array(3);
  convertColor(input, rgbIn, from, 'rgb');
  convertColor(output, rgbOut, to, 'rgb');
  const [ir, ig, ib] = [clamp(rgbIn[0]), clamp(rgbIn[1]), clamp(rgbIn[2])];
  const [or, og, ob] = [clamp(rgbOut[0]), clamp(rgbOut[1]), clamp(rgbOut[2])];
  const inHex = `#${ir.toString(16).padStart(2, '0')}${ig.toString(16).padStart(2, '0')}${ib.toString(16).padStart(2, '0')}`;
  const outHex = `#${or.toString(16).padStart(2, '0')}${og.toString(16).padStart(2, '0')}${ob.toString(16).padStart(2, '0')}`;
  const inColor = `\u001B[38;2;${ir};${ig};${ib}m${inHex}\u001B[0m`;
  const outColor = `\u001B[38;2;${or};${og};${ob}m${outHex}\u001B[0m`;
  const inArr = `\u001B[38;2;${ir};${ig};${ib}m[${input[0].toFixed(3)}, ${input[1].toFixed(3)}, ${input[2].toFixed(3)}]\u001B[0m`;
  const outArr = `\u001B[38;2;${or};${og};${ob}m[${output[0].toFixed(3)}, ${output[1].toFixed(3)}, ${output[2].toFixed(3)}]\u001B[0m`;
  return `${inColor} ${outColor} ${from}: ${inArr} ${to}: ${outArr}`;
}

export function formatColorFailure(
  actual: Float32Array,
  expected: Readonly<number[]>,
  index: number,
  precision: number,
  context: Readonly<{ from: string; to: string; intermediate: Float32Array }>,
): string {
  const fmt = (arr: Float32Array | Readonly<number[]>) =>
    `[${Array.from(arr)
      .map((n) => n.toFixed(precision + 3))
      .join(', ')}]`;
  return [
    `Fail Path: ${context.from} -> ${context.to} -> ${context.from}`,
    `1. Start: ${fmt(expected)}`,
    `2. Mid:   ${fmt(context.intermediate)}`,
    `3. End:   ${fmt(actual)} (Error at index ${index} | Precision: ${precision})`,
  ].join('\n');
}

export function expectColorCloseTo(
  actual: Float32Array,
  expected: Readonly<number[]>,
  precision = 3,
): void {
  for (let i = 0; i < actual.length; i++) {
    try {
      expect(actual[i]).toBeCloseTo(expected[i], precision);
    } catch {
      const actualStr = `[${Array.from(actual)
        .map((n) => Number(n.toFixed(precision + 1)))
        .join(', ')}]`;
      const expectedStr = `[${expected.join(', ')}]`;
      expect.fail(actualStr, expectedStr);
    }
  }
}

export function expectColorToBe(actual: Float32Array, expected: Readonly<number[]>): void {
  actual.forEach((val, i) => {
    expect(val).toBe(expected[i]);
  });
}

export function createMockColor<S extends Space>(
  space: S,
  values: Float32Array | Readonly<number[]>,
  alpha = 1,
): Color<S> {
  return {
    space,
    value: new Float32Array(values),
    alpha,
  };
}

export function createMockArray(values: Readonly<number[]>): Float32Array {
  return new Float32Array(values);
}

export function createMockOutput(): Float32Array {
  return new Float32Array(3);
}
