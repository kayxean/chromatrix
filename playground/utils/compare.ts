import type { Color } from '../types';
import { convertColor } from '../convert';
import { createColor, dropColor, getSharedBuffer } from '../shared';

export function isEqual(a: Color, b: Color, tolerance = 0.0001): boolean {
  if (a === b) return true;

  const alphaDiff = a.alpha - b.alpha;
  if (alphaDiff < 0 ? -alphaDiff : alphaDiff > tolerance) return false;

  const spaceA = a.space;
  const valA = a.value;

  if (spaceA === b.space) {
    const valB = b.value;
    const d0 = valA[0] - valB[0];
    const d1 = valA[1] - valB[1];
    const d2 = valA[2] - valB[2];
    return (
      (d0 < 0 ? -d0 : d0) <= tolerance &&
      (d1 < 0 ? -d1 : d1) <= tolerance &&
      (d2 < 0 ? -d2 : d2) <= tolerance
    );
  }

  const buf = getSharedBuffer();
  const temp = createColor(spaceA, [b.value[0], b.value[1], b.value[2]]);
  (temp as { space: typeof spaceA }).space = b.space;
  convertColor(temp, spaceA);

  const idx = temp.index;
  const d0 = valA[0] - buf[idx];
  const d1 = valA[1] - buf[idx + 1];
  const d2 = valA[2] - buf[idx + 2];

  const match =
    (d0 < 0 ? -d0 : d0) <= tolerance &&
    (d1 < 0 ? -d1 : d1) <= tolerance &&
    (d2 < 0 ? -d2 : d2) <= tolerance;

  dropColor(temp);
  return match;
}

export function getDistance(a: Color, b: Color): number {
  const buf = getSharedBuffer();

  const tempA = createColor('oklab');
  const valA = a.value;
  tempA.value[0] = valA[0];
  tempA.value[1] = valA[1];
  tempA.value[2] = valA[2];
  convertColor(tempA, 'oklab');
  const aOklab = buf.subarray(tempA.index, tempA.index + 3);

  const tempB = createColor('oklab');
  const valB = b.value;
  tempB.value[0] = valB[0];
  tempB.value[1] = valB[1];
  tempB.value[2] = valB[2];
  convertColor(tempB, 'oklab');
  const bOklab = buf.subarray(tempB.index, tempB.index + 3);

  const dL = aOklab[0] - bOklab[0];
  const da = aOklab[1] - bOklab[1];
  const db = aOklab[2] - bOklab[2];

  dropColor(tempA);
  dropColor(tempB);

  return Math.sqrt(dL * dL + da * da + db * db);
}
