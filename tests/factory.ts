import type { Color, Space } from '~/types';
import { expect } from 'vitest';

export const expectColorCloseTo = (actual: Float32Array, expected: number[], precision = 3) => {
  actual.forEach((val, i) => {
    expect(val).toBeCloseTo(expected[i], precision);
  });
};

export const expectColorToBe = (actual: Float32Array, expected: number[]) => {
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

export const createMockArray = (values: number[]) => {
  return new Float32Array(values);
};

export const createMockOutput = () => {
  return new Float32Array(3);
};
