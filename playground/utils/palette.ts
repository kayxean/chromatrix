import type { Color, ColorSpace } from '../types';
import { convertColor } from '../convert';
import { createColor, dropColor, getSharedBuffer } from '../shared';

function getHueIndex(space: ColorSpace): number {
  if (space === 'oklch' || space === 'oklab') return 2;
  if (space === 'lch' || space === 'lab') return 2;
  if (space === 'hsl' || space === 'hwb') return 0;
  return -1;
}

export function createHarmony<S extends ColorSpace>(
  input: Color<S>,
  variants: { name: string; ratios: number[] }[],
): { name: string; colors: Color<S>[] }[] {
  const { space, alpha, index } = input;
  const buf = getSharedBuffer();

  let polarSpace: ColorSpace;
  const hIdx = getHueIndex(space);

  if (space === 'oklch' || space === 'oklab') polarSpace = 'oklch';
  else if (space === 'lch' || space === 'lab') polarSpace = 'lch';
  else polarSpace = 'hsl';

  const polarColor = createColor(polarSpace, [buf[index], buf[index + 1], buf[index + 2]]);
  const tempInput = createColor(space, [0, 0, 0], alpha);

  convertColor(tempInput, polarSpace);

  const pIdx = polarColor.index;
  const baseH = buf[pIdx + hIdx];

  const results: { name: string; colors: Color<S>[] }[] = [];
  const vLen = variants.length;

  for (let i = 0; i < vLen; i++) {
    const { name, ratios } = variants[i];
    const colors: Color<S>[] = [];
    const rLen = ratios.length;

    for (let j = 0; j < rLen; j++) {
      let h = baseH + ratios[j];
      if (h >= 360) h -= 360;
      else if (h < 0) h += 360;

      buf[pIdx + hIdx] = h;
      convertColor(polarColor, space);

      colors.push(createColor(space, [buf[pIdx], buf[pIdx + 1], buf[pIdx + 2]], alpha));
    }

    results.push({ name, colors });
  }

  dropColor(polarColor);
  dropColor(tempInput);
  return results;
}

export function mixColor<S extends ColorSpace>(
  start: Color<S>,
  end: Color<S>,
  t: number,
): Color<S> {
  const space = start.space;
  const w = t <= 0 ? 0 : t >= 1 ? 1 : t;

  const hIdx = getHueIndex(space);
  const buf = getSharedBuffer();

  const sIdx = start.index;
  const eIdx = end.index;

  const s0 = buf[sIdx];
  const s1 = buf[sIdx + 1];
  const s2 = buf[sIdx + 2];
  const e0 = buf[eIdx];
  const e1 = buf[eIdx + 1];
  const e2 = buf[eIdx + 2];

  let c0 = s0 + (e0 - s0) * w;
  let c1 = s1 + (e1 - s1) * w;
  let c2 = s2 + (e2 - s2) * w;

  if (hIdx >= 0) {
    const diff = e2 - s2;
    if (diff > 180) c2 -= 360;
    else if (diff < -180) c2 += 360;

    if (c2 >= 360) c2 -= 360;
    else if (c2 < 0) c2 += 360;
  }

  return createColor(space, [c0, c1, c2], start.alpha + (end.alpha - start.alpha) * w);
}

export function createShades<S extends ColorSpace>(
  start: Color<S>,
  end: Color<S>,
  steps: number,
): Color<S>[] {
  if (steps <= 0) return [];
  if (steps === 1) {
    const buf = getSharedBuffer();
    const idx = start.index;
    return [createColor(start.space, [buf[idx], buf[idx + 1], buf[idx + 2]], start.alpha)];
  }

  const shades: Color<S>[] = [];
  const invTotal = 1 / (steps - 1);

  for (let i = 0; i < steps; i++) {
    shades.push(mixColor(start, end, i * invTotal));
  }

  return shades;
}

export function createScales<S extends ColorSpace>(stops: Color<S>[], steps: number): Color<S>[] {
  if (steps <= 0) return [];
  if (stops.length < 2) {
    const buf = getSharedBuffer();
    const sLen = stops.length;
    const result: Color<S>[] = [];
    for (let i = 0; i < sLen; i++) {
      const idx = stops[i].index;
      result.push(
        createColor(stops[i].space, [buf[idx], buf[idx + 1], buf[idx + 2]], stops[i].alpha),
      );
    }
    return result;
  }

  const scale: Color<S>[] = [];
  const totalSegments = stops.length - 1;
  const stepInterval = 1 / (steps - 1);

  for (let i = 0; i < steps; i++) {
    const segmentRaw = i * stepInterval * totalSegments;
    let idx = segmentRaw | 0;
    if (idx >= totalSegments) idx = totalSegments - 1;
    scale.push(mixColor(stops[idx], stops[idx + 1], segmentRaw - idx));
  }

  return scale;
}
