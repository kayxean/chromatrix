import type { Color, Space } from './types';

export const MAX_CELLS = 2048;
export const DEAD_CELL = new Float32Array(3);

const CELL_CACHE: Float32Array[] = Array.from({ length: MAX_CELLS }, () => new Float32Array(3));
let HEAD: number = MAX_CELLS - 1;

export function createMatrix(): Float32Array {
  if (HEAD < 0) return DEAD_CELL;

  const cell = CELL_CACHE[HEAD];
  HEAD = HEAD - 1;
  return cell;
}

export function dropMatrix(arr: Float32Array): void {
  if (HEAD < MAX_CELLS - 1) {
    HEAD = HEAD + 1;
    CELL_CACHE[HEAD] = arr;
  }
}

export function createColor<S extends Space>(
  space: S,
  values: [number, number, number] | Float32Array,
  alpha = 1,
): Color<S> {
  const data = HEAD >= 0 ? CELL_CACHE[HEAD] : DEAD_CELL;
  HEAD = Math.max(HEAD - 1, -1);

  data[0] = values[0];
  data[1] = values[1];
  data[2] = values[2];

  return { space, value: data, alpha };
}

export function dropColor(color: Color): void {
  if (HEAD < MAX_CELLS - 1) {
    HEAD = HEAD + 1;
    CELL_CACHE[HEAD] = color.value;
  }
}

export function cloneColor<S extends Space>(color: Color<S>): Color<S> {
  const src = color.value;
  const dst = HEAD >= 0 ? CELL_CACHE[HEAD] : DEAD_CELL;
  HEAD = Math.max(HEAD - 1, -1);

  dst[0] = src[0];
  dst[1] = src[1];
  dst[2] = src[2];

  return {
    space: color.space,
    value: dst,
    alpha: color.alpha,
  };
}

export function mountMatrix(size: number): void {
  HEAD = Math.min(size, MAX_CELLS) - 1;
}

export function clearMatrix(): void {
  HEAD = -1;
}

export function countMatrix(): number {
  return HEAD + 1;
}
