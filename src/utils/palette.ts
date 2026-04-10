import type { Color, Space } from '../types';
import { convertColor } from '../convert';
import { createMatrix, dropMatrix } from '../matrix';

export function createHarmony<S extends Space>(
  input: Color<S>,
  variants: { name: string; ratios: number[] }[],
): { name: string; colors: Color<S>[] }[] {
  const { space, value, alpha = 1 } = input;
  let polarSpace: Space;
  let hIdx: number;
  if (space === 'oklch' || space === 'oklab') {
    polarSpace = 'oklch';
    hIdx = 2;
  } else if (space === 'lch' || space === 'lab') {
    polarSpace = 'lch';
    hIdx = 2;
  } else {
    polarSpace = 'hsl';
    hIdx = 0;
  }

  const polarMat = createMatrix();
  const results: { name: string; colors: Color<S>[] }[] = [];
  try {
    convertColor(value, polarMat, space, polarSpace);
    const baseH = polarMat[hIdx];

    for (let i = 0; i < variants.length; i++) {
      const { name, ratios } = variants[i];
      const colors: Color<S>[] = [];

      for (let j = 0; j < ratios.length; j++) {
        let h = (baseH + ratios[j]) % 360;
        if (h < 0) h += 360;

        const newMat = createMatrix();
        const originalH = polarMat[hIdx];

        polarMat[hIdx] = h;
        convertColor(polarMat, newMat, polarSpace, space);
        polarMat[hIdx] = originalH;

        colors.push({ space, value: newMat, alpha });
      }
      results.push({ name, colors });
    }
  } finally {
    dropMatrix(polarMat);
  }
  return results;
}

export function mixColor<S extends Space>(start: Color<S>, end: Color<S>, t: number): Color<S> {
  const { space } = start;
  const w = Math.min(Math.max(t, 0), 1);

  const hIdx =
    space === 'hsl' || space === 'hwb' ? 0 : space === 'lch' || space === 'oklch' ? 2 : -1;

  const sV = start.value;
  const eV = end.value;
  const res = createMatrix();

  for (let c = 0; c < 3; c++) {
    const a = sV[c];
    let b = eV[c];

    if (c === hIdx) {
      const diff = b - a;
      if (diff > 180) b -= 360;
      else if (diff < -180) b += 360;

      const h = a + (b - a) * w;
      res[c] = ((h % 360) + 360) % 360;
    } else {
      res[c] = a + (b - a) * w;
    }
  }

  const sA = start.alpha ?? 1;
  const eA = end.alpha ?? 1;

  return {
    space,
    value: res,
    alpha: sA + (eA - sA) * w,
  };
}

export function createShades<S extends Space>(
  start: Color<S>,
  end: Color<S>,
  steps: number,
): Color<S>[] {
  if (steps <= 0) return [];

  if (steps === 1) {
    const val = createMatrix();
    val.set(start.value);
    return [{ space: start.space, value: val, alpha: start.alpha }];
  }

  return Array.from({ length: steps }, (_, i) => mixColor(start, end, i / (steps - 1)));
}

export function createScales<S extends Space>(stops: Color<S>[], steps: number): Color<S>[] {
  if (steps <= 0) return [];
  const stopCount = stops.length;

  if (stopCount < 2) {
    return stops.map((s) => {
      const val = createMatrix();
      val.set(s.value);
      return { space: s.space, value: val, alpha: s.alpha };
    });
  }

  const totalSegments = stopCount - 1;
  const stepInterval = 1 / (steps - 1);

  return Array.from({ length: steps }, (_, i) => {
    const segmentRaw = i * stepInterval * totalSegments;
    let idx = Math.trunc(segmentRaw);
    if (idx >= totalSegments) idx = totalSegments - 1;

    return mixColor(stops[idx], stops[idx + 1], segmentRaw - idx);
  });
}
