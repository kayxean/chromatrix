import type { Color, Space } from '~/types';
import { expect } from 'vitest';

export const expectColorCloseTo = (
  actual: Float32Array,
  expected: number[],
  precision = 3,
): void => {
  const values = Array.from(actual).map((n) => Number(n.toFixed(precision + 1)));
  const tolerance = Math.pow(10, -precision) / 2;
  for (let i = 0; i < actual.length; i++) {
    if (Math.abs(actual[i] - expected[i]) > tolerance) {
      expect.fail(`[${values.join(', ')}]`, `[${expected.join(', ')}]`);
    }
  }
};

export const expectColorToBe = (actual: Float32Array, expected: number[]): void => {
  actual.forEach((val, i) => {
    expect(val).toBe(expected[i]);
  });
};

export const createMockColor = (
  space: Space,
  values: number[] | Float32Array,
  alpha = 1,
): Color => {
  return {
    space,
    value: new Float32Array(values),
    alpha,
  } as Color;
};

export const createMockArray = (values: number[]): Float32Array => {
  return new Float32Array(values);
};

export const createMockOutput = (): Float32Array => {
  return new Float32Array(3);
};
