import { createMatrix, mutateColor } from '../api/color';
import type { Color, Space } from '../lib/types';

const ensurePolar = (color: Color<Space>): void => {
  const s = color.space;
  if (s === 'oklab') {
    mutateColor(color, 'oklch');
  } else if (s === 'lab') {
    mutateColor(color, 'lch');
  } else if (s !== 'oklch' && s !== 'lch' && s !== 'hsl' && s !== 'hwb') {
    mutateColor(color, 'oklch');
  }
};

export function mixColor(colorA: Color<Space>, colorB: Color<Space>, ratio: number): void {
  ensurePolar(colorA);
  ensurePolar(colorB);

  const vA = colorA.value;
  const vB = colorB.value;
  const w = ratio < 0 ? 0 : Math.min(ratio, 1);

  const { space } = colorA;
  const hIdx =
    space === 'oklch' || space === 'lch' || space === 'hsl' ? 2 : space === 'hwb' ? 0 : -1;

  for (let i = 0; i < 3; i++) {
    if (i === hIdx) {
      const dH = vB[i] - vA[i];
      const shortestHue = dH - 360 * Math.round(dH / 360);
      vA[i] = (vA[i] + shortestHue * w + 360) % 360;
    } else {
      vA[i] = vA[i] + (vB[i] - vA[i]) * w;
    }
  }

  colorA.alpha = colorA.alpha + (colorB.alpha - colorA.alpha) * w;
}

export function mixSubtractive(
  colorA: Color<Space>,
  colorB: Color<Space>,
  ratio: number = 0.5,
): void {
  mutateColor(colorA, 'lrgb');
  mutateColor(colorB, 'lrgb');

  const vA = colorA.value;
  const vB = colorB.value;
  const rB = ratio;
  const rA = 1 - ratio;

  for (let i = 0; i < 3; i++) {
    const R1 = Math.max(0.001, Math.min(0.999, vA[i]));
    const R2 = Math.max(0.001, Math.min(0.999, vB[i]));

    const ks1 = (1 - R1) ** 2 / (2 * R1);
    const ks2 = (1 - R2) ** 2 / (2 * R2);

    const mixedKS = ks1 * rA + ks2 * rB;
    vA[i] = 1 + mixedKS - Math.sqrt(mixedKS * mixedKS + 2 * mixedKS);
  }

  colorA.alpha = colorA.alpha * rA + colorB.alpha * rB;
}

export function createHarmony(input: Color<Space>, ratios: Readonly<number[]>): Color<Space>[] {
  ensurePolar(input);
  const result: Color<Space>[] = [];
  const { space, value } = input;
  const hIdx = space === 'oklch' || space === 'lch' || space === 'hsl' ? 2 : 0;

  for (let i = 0; i < ratios.length; i++) {
    const val = createMatrix();
    val.set(value);

    let h = (value[hIdx] + ratios[i]) % 360;
    if (h < 0) {
      h += 360;
    }
    val[hIdx] = h;

    result.push({
      space,
      value: val,
      alpha: input.alpha,
    });
  }

  return result;
}

export function createScales(stops: Readonly<Color<Space>[]>, steps: number): Color<Space>[] {
  const result: Color<Space>[] = [];
  if (steps <= 0) return result;

  const totalSegments = stops.length - 1;

  for (let i = 0; i < steps; i++) {
    const globalT = i / (steps - 1);
    const segmentRaw = globalT * totalSegments;
    let idx = Math.floor(segmentRaw);
    if (idx >= totalSegments) {
      idx = totalSegments - 1;
    }

    const localT = segmentRaw - idx;
    const stopA = stops[idx];
    const stopB = stops[idx + 1];

    const val = createMatrix();
    val.set(stopA.value);

    const stepColor: Color<Space> = {
      space: stopA.space,
      value: val,
      alpha: stopA.alpha,
    };

    mixColor(stepColor, stopB, localT);
    result.push(stepColor);
  }

  return result;
}

const WHITE: Color<'oklch'> = {
  space: 'oklch',
  value: new Float32Array([1, 0, 0]),
  alpha: 1,
};

const BLACK: Color<'oklch'> = {
  space: 'oklch',
  value: new Float32Array([0, 0, 0]),
  alpha: 1,
};

export function createTints(color: Color<Space>, steps: number): Color<Space>[] {
  return createScales([color, WHITE], steps);
}

export function createShades(color: Color<Space>, steps: number): Color<Space>[] {
  return createScales([color, BLACK], steps);
}

export function createTonal(color: Color<Space>, steps: number = 9): Color<Space>[] {
  return createScales([BLACK, color, WHITE], steps);
}
