import type { ColorMode, ColorSpace } from '~/types';
import { convertColor } from '~/convert';
import { testConversion, testParse } from './utils';

const GENERATED_COUNT = (Date.now() % 100) + 100;

const generatePersistentColors = (): Record<string, ColorSpace<'rgb'>> => {
  const palette: Record<string, ColorSpace<'rgb'>> = {};

  for (let i = 0; i < GENERATED_COUNT; i++) {
    const hue = (i * (360 / GENERATED_COUNT)) % 360;
    const saturation = i % 2 === 0 ? 0.95 : 0.7;
    const lightness = i % 3 === 0 ? 0.45 : i % 3 === 1 ? 0.65 : 0.85;

    const name = `random_${Math.round(hue)}_${Math.round(saturation * 100)}_${Math.round(lightness * 100)}`;

    const rgb = convertColor([hue, saturation, lightness] as ColorSpace<'hsl'>, 'hsl', 'rgb');
    palette[name] = rgb as ColorSpace<'rgb'>;
  }

  return palette;
};

const COLORS = generatePersistentColors();

const useColor = (mode: Exclude<ColorMode, 'rgb'>) => {
  return Object.fromEntries(Object.entries(COLORS).map(([name, value]) => [name, convertColor(value, 'rgb', mode)]));
};

const createTest = <T extends ColorMode>(label: string, fromMode: T) => {
  console.log(`\n--- Testing ${label} ---`);

  const tests = fromMode === 'rgb' ? COLORS : useColor(fromMode);

  const conversionResults: object[] = [];
  const parseResults: object[] = [];

  const modes: ColorMode[] = ['rgb', 'hsl', 'hwb', 'lab', 'lch', 'oklab', 'oklch'];
  const modesToTest = modes.filter((m): m is Exclude<(typeof modes)[number], T> => m !== fromMode);

  for (const [name, color] of Object.entries(tests)) {
    conversionResults.push({ Test: `--- ${name} ---` });
    for (const toMode of modesToTest) {
      conversionResults.push(testConversion(fromMode, toMode, color));
    }
    parseResults.push(testParse(fromMode, color));
  }

  console.log(`\nConversion Round-trip tests for ${label}:`);
  console.table(conversionResults);

  console.log(`\nParse Round-trip tests for ${label}:`);
  console.table(parseResults);

  if ([...conversionResults, ...parseResults].some((r: any) => r.Status === '❌ FAILED')) {
    throw new Error(`Some ${label} tests failed.`);
  }
};

export const testColors = {
  rgb: () => createTest('RGB', 'rgb'),
  hsl: () => createTest('HSL', 'hsl'),
  hwb: () => createTest('HWB', 'hwb'),
  lab: () => createTest('LAB', 'lab'),
  lch: () => createTest('LCH', 'lch'),
  oklab: () => createTest('Oklab', 'oklab'),
  oklch: () => createTest('Oklch', 'oklch'),
} satisfies Record<ColorMode, () => void>;
