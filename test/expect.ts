import type { ColorArray } from '~/types';
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
