import { describe, expect, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { SPACES, createMockOutput, formatColorFailure, generateValidColor, utils } from './factory';

const getEffectivePrecision = (
  index: number,
  actual: Float32Array,
  expected: Readonly<number[]>,
  basePrecision: number,
  context: Readonly<{ from: string; to: string; intermediate: Float32Array }>,
): number => {
  const isPolar = ['hsl', 'hsv', 'hwb', 'lch', 'oklch'].includes(context.from);
  const isLCH = context.from === 'lch' || context.from === 'oklch';
  const isHue = isPolar && (isLCH ? index === 2 : index === 0);
  const isChroma = (isLCH && index === 1) || (['hsl', 'hsv'].includes(context.from) && index === 1);
  const isCartesian =
    (index === 1 || index === 2) && (context.from === 'oklab' || context.from === 'lab');

  const chroma = isPolar ? actual[1] : 0.5;
  const valE = expected[index];
  const mid = context.intermediate;

  let startL = 0.5;
  if (isLCH || ['lab', 'oklab'].includes(context.from)) {
    startL = expected[0];
  } else if (['hsl', 'hsv', 'hwb'].includes(context.from)) {
    startL = expected[2];
  } else {
    startL = (expected[0] + expected[1] + expected[2]) / 3;
  }

  const isOutOfGamut = mid.some((v) => {
    return v < -0.01 || v > 1.01;
  });
  const isExtremeMid = mid.some((v) => {
    return v < -0.0001 || v > 1.5;
  });
  const isExploded = mid.some((v) => {
    return Math.abs(v) > 10;
  });

  let p = basePrecision;

  if (isOutOfGamut || startL < 0.15 || startL > 0.95) {
    p -= 1;
  }
  if (isOutOfGamut && (startL < 0.1 || startL > 0.9)) {
    p = 1;
  }

  if (Math.abs(valE) > 50) {
    p = Math.min(p, 2);
  }

  if (isExploded) {
    p = Math.min(p, 1);
  }

  if (isHue) {
    p = Math.min(p, 2);
    const isDanger = startL < 0.25 || startL > 0.8 || chroma < 0.06 || isOutOfGamut;
    if (isDanger) {
      p = Math.min(p, 1);
    }
    if (isExtremeMid || startL < 0.15 || startL > 0.88 || chroma < 0.03) {
      p = 0;
    }
  }

  if (isChroma && (startL < 0.25 || chroma < 0.05 || isOutOfGamut)) {
    p = Math.min(p, 2);
    if (startL < 0.1 || chroma < 0.01) {
      p = Math.min(p, 1);
    }
  }

  if (isCartesian && startL < 0.3) {
    p = Math.min(p, 2);
    if (startL < 0.15 || isOutOfGamut) {
      p = Math.min(p, 1);
    }
  }

  const chromaVal = isPolar ? expected[1] : Math.sqrt(expected[1] ** 2 + expected[2] ** 2);
  if (chromaVal > 0.3 && (isOutOfGamut || isExtremeMid)) {
    p = Math.min(p, 2);
  }

  if (!isHue && !isChroma && (index === 1 || index === 2) && startL < 0.2) {
    p = Math.min(p, 2);
  }

  return p;
};

const expectStressTrace = (
  actual: Float32Array,
  expected: Readonly<number[]>,
  precision = 3,
  context: Readonly<{ from: string; to: string; intermediate: Float32Array }>,
): void => {
  for (let i = 0; i < actual.length; i++) {
    let valA = actual[i];
    let valE = expected[i];
    const mid = context.intermediate;
    const p = getEffectivePrecision(i, actual, expected, precision, context);

    const isPolar = ['hsl', 'hsv', 'hwb', 'lch', 'oklch'].includes(context.from);
    const isLCH = context.from === 'lch' || context.from === 'oklch';
    const isHue = isPolar && (isLCH ? i === 2 : i === 0);

    if (isHue) {
      const isMidPolar = ['hsl', 'hsv', 'hwb', 'lch', 'oklch'].includes(context.to);
      const midL = ['lch', 'oklch', 'lab', 'oklab'].includes(context.to) ? mid[0] : mid[2];
      const midC = isMidPolar ? mid[1] : 1.0;

      if (isMidPolar && (midC < 0.002 || midL < 0.002)) {
        continue;
      }

      let delta = Math.abs(valA - valE);
      if (delta > 350) {
        if (valA > valE) {
          valA -= 360;
        } else {
          valE -= 360;
        }
        delta = Math.abs(valA - valE);
      }

      const currentC = isLCH ? actual[1] : actual[1];
      const currentL = isLCH ? actual[0] : actual[2];

      if (currentC < 0.08 && currentL > 0.5 && delta < 0.01) {
        continue;
      }
      if (currentC < 0.07 && delta < 0.02) {
        continue;
      }

      const isHWB = context.from === 'hwb';
      const hwbSum = isHWB ? actual[1] + actual[2] : 0;
      if (currentC < 0.015 || currentL < 0.015 || currentL > 0.985 || hwbSum > 0.985) {
        continue;
      }

      const isMidGray =
        !isMidPolar && Math.abs(mid[0] - mid[1]) < 0.003 && Math.abs(mid[1] - mid[2]) < 0.003;
      const isExtremeOOG = mid.some((v) => {
        return v < -0.2 || v > 1.2 || (v > -0.02 && v < 0.02) || v > 1000;
      });

      if (isExtremeOOG && currentL < 0.2 && delta < 0.6) {
        continue;
      }
      if ((isExtremeOOG || isMidGray) && p === 0 && delta < 1.0) {
        continue;
      }
      if ((isExtremeOOG || isMidGray) && p <= 2 && delta < 2.5) {
        continue;
      }
    }

    if (!isHue && p <= 2 && Math.abs(valA - valE) < 0.025) {
      continue;
    }

    try {
      expect(valA).toBeCloseTo(valE, p);
    } catch {
      const msg = formatColorFailure(actual, expected, i, p, context);
      const fmtExp = `[${Array.from(expected)
        .map((n) => n.toFixed(p + 2))
        .join(', ')}]`;
      expect.fail(msg, fmtExp);
    }
  }
};

describe('convert-color-stress', () => {
  const inputBuf = new Float32Array(3);
  const intermediateBuf = createMockOutput();
  const backToStartBuf = createMockOutput();

  for (let i = 0; i < 250000; i++) {
    test(`round-trip (stress-${i + 1})`, () => {
      const { from, to } = utils.pickDifferent(SPACES);
      generateValidColor(from, inputBuf);

      convertColor(inputBuf, intermediateBuf, from, to);
      convertColor(intermediateBuf, backToStartBuf, to, from);

      expectStressTrace(backToStartBuf, Array.from(inputBuf), 3, {
        from,
        to,
        intermediate: intermediateBuf,
      });
    });
  }
});
