import type { Color, ColorArray, ColorMatrix, ColorSpace } from './types';

const MAX_CELLS = 2048;
const DEAD_CELL = new Float32Array(3);

const CELL_CACHE: Float32Array[] = Array.from({ length: MAX_CELLS }, () => new Float32Array(3));
let HEAD: number = MAX_CELLS - 1;

export function createMatrix<S extends ColorSpace>(_space?: S): ColorMatrix<S> {
  const current = HEAD;
  if (current < 0) return DEAD_CELL as ColorMatrix<S>;

  const cell = CELL_CACHE[current];
  HEAD = current - 1;
  return cell as ColorMatrix<S>;
}

export function dropMatrix(arr: ColorArray): void {
  const current = HEAD;
  if (current < 2047) {
    const next = current + 1;
    CELL_CACHE[next] = arr as Float32Array;
    HEAD = next;
  }
}

export function createColor<S extends ColorSpace>(
  space: S,
  values: [number, number, number] | Float32Array | ColorArray,
  alpha = 1,
): Color<S> {
  const current = HEAD;
  let data: Float32Array;

  if (current < 0) {
    data = DEAD_CELL;
  } else {
    data = CELL_CACHE[current];
    HEAD = current - 1;
  }

  data[0] = values[0];
  data[1] = values[1];
  data[2] = values[2];

  return { space, value: data as ColorMatrix<S>, alpha };
}

export function dropColor(color: Color): void {
  const current = HEAD;
  if (current < 2047) {
    const next = current + 1;
    CELL_CACHE[next] = color.value as Float32Array;
    HEAD = next;
  }
}

export function cloneColor<S extends ColorSpace>(color: Color<S>): Color<S> {
  const current = HEAD;
  const src = color.value as Float32Array;
  let dst: Float32Array;

  if (current < 0) {
    dst = DEAD_CELL;
  } else {
    dst = CELL_CACHE[current];
    HEAD = current - 1;
  }

  dst[0] = src[0];
  dst[1] = src[1];
  dst[2] = src[2];

  return {
    space: color.space,
    value: dst as ColorMatrix<S>,
    alpha: color.alpha,
  };
}

export function mountMatrix(size: number): void {
  const capped = size > 2048 ? 2048 : size;
  HEAD = capped - 1;
}

export function clearMatrix(): void {
  HEAD = -1;
}

export function countMatrix(): number {
  return HEAD + 1;
}
