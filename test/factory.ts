import type { Color, ColorArray, ColorSpace } from '~/types';
import { expect } from 'vitest';

export const expectColorCloseTo = (actual: ColorArray, expected: number[], precision = 3) => {
  actual.forEach((val, i) => {
    expect(val).toBeCloseTo(expected[i], precision);
  });
};

export const expectColorToBe = (actual: ColorArray, expected: number[]) => {
  actual.forEach((val, i) => {
    expect(val).toBe(expected[i]);
  });
};

export const createMockColor = (
  space: ColorSpace,
  values: number[] | Float32Array,
  alpha = 1,
): Color => {
  return {
    space,
    value: new Float32Array(values) as ColorArray,
    alpha,
  } as Color;
};

export const createMockArray = (values: number[]): ColorArray => {
  return new Float32Array(values) as ColorArray;
};

export const createMockOutput = (): ColorArray => {
  return new Float32Array(3) as ColorArray;
};
