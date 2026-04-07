import type { Color, ColorArray, ColorSpace } from '~/types';

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
