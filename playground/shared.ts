import type { Color, ColorSpace } from './types';

const SLOT_SIZE = 3;
const INITIAL_CAPACITY = 1024;

let buffer = new Float32Array(INITIAL_CAPACITY * SLOT_SIZE);
const freeSlots: number[] = Array.from(
  { length: INITIAL_CAPACITY },
  (_, i) => i * SLOT_SIZE,
).reverse();

function growStorage(): void {
  const oldBuffer = buffer;
  const newCapacity = oldBuffer.length * 2;
  buffer = new Float32Array(newCapacity);
  buffer.set(oldBuffer);

  const start = oldBuffer.length / SLOT_SIZE;
  const end = newCapacity / SLOT_SIZE;
  for (let i = end - 1; i >= start; i--) {
    freeSlots.push(i * SLOT_SIZE);
  }
}

export function createColor<S extends ColorSpace>(
  space: S,
  values?: [number, number, number] | Float32Array | number[],
  alpha = 1,
): Color<S> {
  const index = acquireSlot();
  if (values) {
    buffer[index] = values[0];
    buffer[index + 1] = values[1];
    buffer[index + 2] = values[2];
  }

  return {
    space,
    index,
    alpha,
    get value() {
      return buffer.subarray(index, index + SLOT_SIZE);
    },
    [Symbol.dispose]() {
      releaseSlot(index);
    },
  };
}

export function dropColor(color: Color): void {
  color[Symbol.dispose]();
}

function acquireSlot(): number {
  if (freeSlots.length === 0) {
    growStorage();
  }
  return freeSlots.pop()!;
}

function releaseSlot(index: number): void {
  freeSlots.push(index);
}

export function getSharedBuffer(): Float32Array {
  return buffer;
}
