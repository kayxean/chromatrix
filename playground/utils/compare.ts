import type { Color } from '../types';
import { convertColor } from '../convert';
import { createColor, dropColor, getSharedBuffer } from '../shared';

export function isEqual(a: Color, b: Color, tolerance = 0.0001): boolean {
  if (a === b) return true;

  const alphaDiff = a.alpha - b.alpha;
  if (alphaDiff < 0 ? -alphaDiff : alphaDiff > tolerance) return false;

  const buf = getSharedBuffer();
  const idxA = a.index;
  const idxB = b.index;

  if (a.space === b.space) {
    const d0 = buf[idxA] - buf[idxB];
    const d1 = buf[idxA + 1] - buf[idxB + 1];
    const d2 = buf[idxA + 2] - buf[idxB + 2];
    return (
      (d0 < 0 ? -d0 : d0) <= tolerance &&
      (d1 < 0 ? -d1 : d1) <= tolerance &&
      (d2 < 0 ? -d2 : d2) <= tolerance
    );
  }

  const temp = createColor(a.space, [buf[idxB], buf[idxB + 1], buf[idxB + 2]]);
  (temp as { space: string }).space = b.space;
  convertColor(temp, a.space);

  const tIdx = temp.index;
  const d0 = buf[idxA] - buf[tIdx];
  const d1 = buf[idxA + 1] - buf[tIdx + 1];
  const d2 = buf[idxA + 2] - buf[tIdx + 2];

  const match =
    (d0 < 0 ? -d0 : d0) <= tolerance &&
    (d1 < 0 ? -d1 : d1) <= tolerance &&
    (d2 < 0 ? -d2 : d2) <= tolerance;

  dropColor(temp);
  return match;
}

export function getDistance(a: Color, b: Color): number {
  const buf = getSharedBuffer();

  const tempA = createColor('oklab', [buf[a.index], buf[a.index + 1], buf[a.index + 2]]);
  convertColor(tempA, 'oklab');
  const aIdx = tempA.index;

  const tempB = createColor('oklab', [buf[b.index], buf[b.index + 1], buf[b.index + 2]]);
  convertColor(tempB, 'oklab');
  const bIdx = tempB.index;

  const dL = buf[aIdx] - buf[bIdx];
  const da = buf[aIdx + 1] - buf[bIdx + 1];
  const db = buf[aIdx + 2] - buf[bIdx + 2];

  dropColor(tempA);
  dropColor(tempB);

  return Math.sqrt(dL * dL + da * da + db * db);
}
