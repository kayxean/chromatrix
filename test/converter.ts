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

const assertColor = (
  mode: ColorMode,
  a: number[],
  b: number[],
  tolerance = 1e-2,
): { pass: boolean; error?: string; actual?: string } => {
  if (a.length !== b.length) {
    return {
      pass: false,
      error: `Color vectors have different lengths: ${a.length} vs ${b.length}`,
    };
  }

  const isExpectedAchromatic = isAchromaticForMode(mode, a);

  const hueIndex =
    mode === 'hsl' || mode === 'hwb'
      ? 0
      : mode === 'lch' || mode === 'oklch'
        ? 2
        : -1;
  const saturationChromaIndex =
    mode === 'hsl' || mode === 'lch' || mode === 'oklch' ? 1 : -1;

  for (let i = 0; i < a.length; i++) {
    if (
      isExpectedAchromatic &&
      (i === hueIndex || i === saturationChromaIndex)
    ) {
      continue;
    }

    let diff = Math.abs(a[i] - b[i]);
    const activeTolerance =
      i === hueIndex && hueIndex !== -1 ? 1e-1 : tolerance;

    if (i === hueIndex && hueIndex !== -1) {
      if (diff > 180) {
        diff = 360 - diff;
      }
    }

    if (diff > activeTolerance) {
      const error = `Component mismatch at index ${i}: expected ${a[i].toPrecision(4)} but got ${b[i].toPrecision(4)}`;
      return {
        pass: false,
        error,
        actual: JSON.stringify(b.map((v) => +v.toPrecision(4))),
      };
    }
  }

  return { pass: true };
};

const testConversion = <T extends ColorMode, R extends ColorMode>(
  fromMode: T,
  toMode: R,
  value: ColorSpace<T>,
) => {
  const testName = `${fromMode} -> ${toMode} -> ${fromMode}`;

  const converted = convertColor(
    value,
    fromMode,
    toMode as Exclude<typeof toMode, typeof fromMode>,
  );
  const reverted = convertColor(
    converted,
    toMode,
    fromMode as Exclude<typeof fromMode, typeof toMode>,
  );

  const result = assertColor(fromMode, value, reverted);

  return {
    Test: testName,
    'Initial Value': JSON.stringify(value.map((v) => +v.toPrecision(4))),
    'Reverted Value':
      result.actual ?? JSON.stringify(reverted.map((v) => +v.toPrecision(4))),
    Status: result.pass ? '✅ PASSED' : '❌ FAILED',
    Error: result.error || 'None',
  };
};

const testParse = <T extends ColorMode>(mode: T, value: ColorSpace<T>) => {
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

const GENERATED_COUNT = (Date.now() % 100) + 100;

const generatePersistentColors = (): Record<string, ColorSpace<'rgb'>> => {
  const palette: Record<string, ColorSpace<'rgb'>> = {};

  for (let i = 0; i < GENERATED_COUNT; i++) {
    const hue = (i * (360 / GENERATED_COUNT)) % 360;
    const saturation = i % 2 === 0 ? 0.95 : 0.7;
    const lightness = i % 3 === 0 ? 0.45 : i % 3 === 1 ? 0.65 : 0.85;

    const name = `random_${Math.round(hue)}_${Math.round(saturation * 100)}_${Math.round(lightness * 100)}`;

    const rgb = convertColor(
      [hue, saturation, lightness] as ColorSpace<'hsl'>,
      'hsl',
      'rgb',
    );
    palette[name] = rgb as ColorSpace<'rgb'>;
  }

  return palette;
};

const COLORS = generatePersistentColors();

const useColor = (mode: Exclude<ColorMode, 'rgb'>) => {
  return Object.fromEntries(
    Object.entries(COLORS).map(([name, value]) => [
      name,
      convertColor(value, 'rgb', mode),
    ]),
  );
};

const createTest = <T extends ColorMode>(label: string, fromMode: T) => {
  console.log(`\n--- Testing ${label} ---`);

  const tests = fromMode === 'rgb' ? COLORS : useColor(fromMode);

  const conversionResults: object[] = [];
  const parseResults: object[] = [];

  const modes: ColorMode[] = [
    'rgb',
    'hsl',
    'hwb',
    'lab',
    'lch',
    'oklab',
    'oklch',
  ];
  const modesToTest = modes.filter(
    (m): m is Exclude<(typeof modes)[number], T> => m !== fromMode,
  );

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

  if (
    [...conversionResults, ...parseResults].some(
      (r: any) => r.Status === '❌ FAILED',
    )
  ) {
    throw new Error(`Some ${label} tests failed.`);
  }
};

const tasks = {
  rgb: () => createTest('RGB', 'rgb'),
  hsl: () => createTest('HSL', 'hsl'),
  hwb: () => createTest('HWB', 'hwb'),
  lab: () => createTest('LAB', 'lab'),
  lch: () => createTest('LCH', 'lch'),
  oklab: () => createTest('Oklab', 'oklab'),
  oklch: () => createTest('Oklch', 'oklch'),
} satisfies Record<ColorMode, () => void>;

const inspectColor = (modes: true | false | ColorMode[] = true): void => {
  try {
    if (modes === true) {
      console.log('Running all color tests...');
      Object.values(tasks).forEach((fn) => {
        fn();
      });
    } else if (modes === false) {
      const keys = Object.keys(tasks) as ColorMode[];
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      console.log(`Running random test: ${randomKey}`);
      tasks[randomKey]();
    } else if (Array.isArray(modes)) {
      console.log(`Running selected tests: ${modes.join(', ')}`);
      modes.forEach((mode) => {
        if (tasks[mode]) {
          tasks[mode]();
        } else {
          console.warn(`Unknown test mode: ${mode}`);
        }
      });
    } else {
      console.warn('Invalid parameter for inspectColor function.');
    }

    console.log('\nAll tests passed!');
  } catch (e) {
    console.error('\n--- A test suite failed ---');
    console.error(e);
    process.exit(1);
  }
};

inspectColor(false);
