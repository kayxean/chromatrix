import type { Color, ColorSpace } from './types';

const MAX_INITIAL_SLOTS = 4096;
const SLOT_SIZE = 4;

let buffer = new Float32Array(MAX_INITIAL_SLOTS * SLOT_SIZE);
let freeSlots = new Uint32Array(MAX_INITIAL_SLOTS);
let allocPtr = 0;
let freeCount = MAX_INITIAL_SLOTS;
let maxSlots = MAX_INITIAL_SLOTS;

const DEBUG = false;

function validateSlotAccess(index: number): void {
  if (DEBUG) {
    if (index < 0 || index >= buffer.length) {
      throw new Error(`Slot index ${index} out of bounds [0, ${buffer.length})`);
    }
    if (index % SLOT_SIZE !== 0) {
      throw new Error(`Slot index ${index} not aligned to SLOT_SIZE ${SLOT_SIZE}`);
    }
  }
}

function growStorage(): void {
  const oldMaxSlots = maxSlots;
  const newMaxSlots = maxSlots * 2;
  const oldFreeCount = freeCount;

  const newBuffer = new Float32Array(newMaxSlots * SLOT_SIZE);
  newBuffer.set(buffer);
  buffer = newBuffer;

  const newFreeSlots = new Uint32Array(newMaxSlots);

  for (let i = 0; i < oldFreeCount; i++) {
    const idx = (allocPtr + i) & (oldMaxSlots - 1);
    newFreeSlots[i] = freeSlots[idx];
  }

  for (let i = oldMaxSlots; i < newMaxSlots; i++) {
    newFreeSlots[oldFreeCount + (i - oldMaxSlots)] = i * SLOT_SIZE;
  }

  maxSlots = newMaxSlots;
  freeCount = oldFreeCount + (newMaxSlots - oldMaxSlots);
  freeSlots = newFreeSlots;
}

function acquireSlot(): number {
  if (freeCount === 0) {
    growStorage();
  }

  const slotIndex = allocPtr & (maxSlots - 1);
  const slot = freeSlots[slotIndex];
  allocPtr++;
  freeCount--;

  if (DEBUG) validateSlotAccess(slot);
  return slot;
}

function releaseSlot(index: number): void {
  if (DEBUG) validateSlotAccess(index);

  const slotIndex = (allocPtr + freeCount) & (maxSlots - 1);
  freeSlots[slotIndex] = index;
  freeCount++;
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
  } else {
    buffer[index] = 0;
    buffer[index + 1] = 0;
    buffer[index + 2] = 0;
  }

  buffer[index + 3] = alpha;

  return {
    space,
    index,
    alpha,
    [Symbol.dispose]() {
      releaseSlot(index);
    },
  };
}

export function dropColor(color: Color): void {
  color[Symbol.dispose]();
}

export function getSharedBuffer(): Float32Array {
  return buffer;
}

export function getSlotIndex(color: Color): number {
  return color.index;
}

export function getSlotCount(): number {
  return maxSlots;
}

export function getAllocatedCount(): number {
  return maxSlots - freeCount;
}
