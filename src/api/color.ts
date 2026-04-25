import type { Color, Space } from '../lib/types';
import { convertColor } from './convert';

const MAX_CELLS = 2048;
const MAX_INDEX = 2047;
const CHANNELS = 3;

const MATRIX_BUFFER = new Float32Array(MAX_CELLS * CHANNELS);

const CACHE: Float32Array[] = Array.from({ length: MAX_CELLS }, (_, i) =>
  MATRIX_BUFFER.subarray(i * CHANNELS, (i + 1) * CHANNELS),
);

export const DEAD_CELL = new Float32Array(CHANNELS);
let HEAD: number = MAX_INDEX;

export function createMatrix(): Float32Array {
  const h = HEAD;
  if (h < 0) return DEAD_CELL;
  const cell = CACHE[h];
  HEAD = h - 1;
  return cell;
}

export function dropMatrix(arr: Float32Array): void {
  const h = HEAD;
  if (h < MAX_INDEX && arr !== DEAD_CELL) {
    const next = h + 1;
    HEAD = next;
    CACHE[next] = arr;
  }
}

export function createColor<S extends Space>(space: S, values: Float32Array, alpha = 1): Color<S> {
  const h = HEAD;

  if (h >= 0) {
    const data = CACHE[h];
    HEAD = h - 1;

    data[0] = values[0];
    data[1] = values[1];
    data[2] = values[2];

    return { space, value: data, alpha };
  }

  return { space, value: DEAD_CELL, alpha };
}

export function dropColor<S extends Space>(color: Color<S>): void {
  const h = HEAD;
  const v = color.value;
  if (h < MAX_INDEX && v !== DEAD_CELL) {
    const next = h + 1;
    HEAD = next;
    CACHE[next] = v;
  }
}

export function cloneColor<S extends Space>(color: Color<S>): Color<S> {
  const h = HEAD;

  if (h >= 0) {
    const dst = CACHE[h];
    const src = color.value;
    HEAD = h - 1;

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];

    return {
      space: color.space,
      value: dst,
      alpha: color.alpha,
    };
  }

  return {
    space: color.space,
    value: DEAD_CELL,
    alpha: color.alpha,
  };
}

export function deriveColor<S extends Space, T extends Space>(color: Color<S>, to: T): Color<T> {
  const newValue = createMatrix();

  if (color.space === (to as string)) {
    newValue[0] = color.value[0];
    newValue[1] = color.value[1];
    newValue[2] = color.value[2];
  } else {
    convertColor(color.value, newValue, color.space, to);
  }

  return {
    space: to,
    value: newValue,
    alpha: color.alpha,
  };
}

export function mutateColor<S extends Space>(color: Color<S>, to: S): asserts color is Color<S> {
  const from = color.space;
  if (from === (to as string)) return;

  convertColor(color.value, color.value, from, to);

  const ref = color as { -readonly [K in keyof Color<Space>]: Color<Space>[K] };
  ref.space = to;
}

export function mountMatrix(size: number): void {
  HEAD = (size > MAX_CELLS ? MAX_CELLS : size) - 1;
}

export function clearMatrix(): void {
  HEAD = -1;
}

export function countMatrix(): number {
  return HEAD + 1;
}
