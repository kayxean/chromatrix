import type { Color, Space } from '~/lib/types';
import { expect } from 'vitest';

export const expectColorCloseTo = (
  actual: Float32Array,
  expected: Readonly<number[]>,
  precision = 3,
): void => {
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
};

export const expectColorToBe = (actual: Float32Array, expected: Readonly<number[]>): void => {
  actual.forEach((val, i) => {
    expect(val).toBe(expected[i]);
  });
};

export const expectColorTrace = (
  actual: Float32Array,
  expected: Readonly<number[]>,
  precision = 3,
  context: Readonly<{ from: string; to: string; intermediate: Float32Array }>,
): void => {
  for (let i = 0; i < actual.length; i++) {
    try {
      expect(actual[i]).toBeCloseTo(expected[i], precision);
    } catch {
      const fmt = (arr: Float32Array | Readonly<number[]>) =>
        `[${Array.from(arr)
          .map((n) => n.toFixed(precision + 2))
          .join(', ')}]`;

      const errorMessage = [
        `Fail Path: ${context.from} -> ${context.to} -> ${context.from}`,
        `1. Start: ${fmt(expected)}`,
        `2. Mid:   ${fmt(context.intermediate)}`,
        `3. End:   ${fmt(actual)} (Error at index ${i})`,
      ].join('\n');

      expect.fail(errorMessage, fmt(expected));
    }
  }
};

export const createMockColor = <S extends Space>(
  space: S,
  values: Float32Array | Readonly<number[]>,
  alpha = 1,
): Color<S> => {
  return {
    space,
    value: new Float32Array(values),
    alpha,
  };
};

export const createMockArray = (values: Readonly<number[]>): Float32Array => {
  return new Float32Array(values);
};

export const createMockOutput = (): Float32Array => {
  return new Float32Array(3);
};
