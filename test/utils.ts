import type { ColorMode, ColorSpace } from '~/types';
import { convertColor } from '~/convert';
import { parseColor, parseCss } from '~/parse';

const isAchromaticForMode = (mode: ColorMode, values: number[]): boolean => {
  if (mode === 'hsl') {
    return values[1] < 1e-3 || values[2] < 1e-3 || values[2] > 0.999;
  }
  if (mode === 'hwb') {
    return values[1] + values[2] >= 0.999;
  }
  if (mode === 'lch' || mode === 'oklch') {
    return values[1] < 1e-3;
  }
  return false;
};

export const assertColor = (
  mode: ColorMode,
  a: number[],
  b: number[],
  tolerance = 1e-2,
): { pass: boolean; error?: string; actual?: string } => {
  if (a.length !== b.length) {
    return { pass: false, error: `Color vectors have different lengths: ${a.length} vs ${b.length}` };
  }

  const isExpectedAchromatic = isAchromaticForMode(mode, a);

  const hueIndex = mode === 'hsl' || mode === 'hwb' ? 0 : mode === 'lch' || mode === 'oklch' ? 2 : -1;
  const saturationChromaIndex = mode === 'hsl' || mode === 'lch' || mode === 'oklch' ? 1 : -1;

  for (let i = 0; i < a.length; i++) {
    if (isExpectedAchromatic && (i === hueIndex || i === saturationChromaIndex)) {
      continue;
    }

    let diff = Math.abs(a[i] - b[i]);
    const activeTolerance = i === hueIndex && hueIndex !== -1 ? 1e-1 : tolerance;

    if (i === hueIndex && hueIndex !== -1) {
      if (diff > 180) {
        diff = 360 - diff;
      }
    }

    if (diff > activeTolerance) {
      const error = `Component mismatch at index ${i}: expected ${a[i].toPrecision(4)} but got ${b[i].toPrecision(4)}`;
      return { pass: false, error, actual: JSON.stringify(b.map((v) => +v.toPrecision(4))) };
    }
  }

  return { pass: true };
};

export const testConversion = <T extends ColorMode, R extends ColorMode>(fromMode: T, toMode: R, value: ColorSpace<T>) => {
  const testName = `${fromMode} -> ${toMode} -> ${fromMode}`;

  const converted = convertColor(value, fromMode, toMode as Exclude<typeof toMode, typeof fromMode>);
  const reverted = convertColor(converted, toMode, fromMode as Exclude<typeof fromMode, typeof toMode>);

  const result = assertColor(fromMode, value, reverted);

  return {
    Test: testName,
    'Initial Value': JSON.stringify(value.map((v) => +v.toPrecision(4))),
    'Reverted Value': result.actual ?? JSON.stringify(reverted.map((v) => +v.toPrecision(4))),
    Status: result.pass ? '✅ PASSED' : '❌ FAILED',
    Error: result.error || 'None',
  };
};

export const testParse = <T extends ColorMode>(mode: T, value: ColorSpace<T>) => {
  const cssString = parseCss(mode, value);
  const parsed = parseColor(cssString);

  const result = assertColor(mode, value, parsed.values, 1e-2);

  return {
    'Color Mode': mode,
    'Original Value': JSON.stringify(value.map((v) => +v.toPrecision(4))),
    'CSS String': cssString,
    'Parsed Value': JSON.stringify(parsed.values.map((v) => +v.toPrecision(4))),
    Status: result.pass ? '✅ PASSED' : '❌ FAILED',
    Error: result.error || 'None',
  };
};
