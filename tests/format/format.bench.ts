import { bench, describe } from 'vite-plus/test';
import { formatCss } from '~/api/format';
import { createMockColor } from '../factory';

describe('format-css-hex', () => {
  const COLOR = createMockColor('rgb', [1, 0, 0.5]);
  const MIN = createMockColor('rgb', [0, 0, 0]);
  const MAX = createMockColor('rgb', [1, 1, 1]);
  const ALPHA = createMockColor('rgb', [1, 0, 0], 0.5);
  bench('format (hex)', () => {
    formatCss(COLOR, true);
  });
  bench('format (hex-min)', () => {
    formatCss(MIN, true);
  });
  bench('format (hex-max)', () => {
    formatCss(MAX, true);
  });
  bench('format (hex-alpha)', () => {
    formatCss(ALPHA, true);
  });
});

describe('format-css-rgb', () => {
  const COLOR = createMockColor('rgb', [1, 0, 0.5]);
  const MIN = createMockColor('rgb', [0, 0, 0]);
  const MAX = createMockColor('rgb', [1, 1, 1]);
  const ALPHA = createMockColor('rgb', [0, 1, 0], 0.4);
  const NONE = createMockColor('rgb', [1, NaN, 0], NaN);
  bench('format (rgb)', () => {
    formatCss(COLOR);
  });
  bench('format (rgb-min)', () => {
    formatCss(MIN);
  });
  bench('format (rgb-max)', () => {
    formatCss(MAX);
  });
  bench('format (rgb-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (rgb-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-hsl', () => {
  const COLOR = createMockColor('hsl', [200, 1, 0.5]);
  const MIN = createMockColor('hsl', [0, 0, 0]);
  const MAX = createMockColor('hsl', [360, 1, 1]);
  const ALPHA = createMockColor('hsl', [200, 0.5, 0.5], 0.1);
  const NONE = createMockColor('hsl', [NaN, 1, 0.5]);
  bench('format (hsl)', () => {
    formatCss(COLOR);
  });
  bench('format (hsl-min)', () => {
    formatCss(MIN);
  });
  bench('format (hsl-max)', () => {
    formatCss(MAX);
  });
  bench('format (hsl-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (hsl-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-hwb', () => {
  const COLOR = createMockColor('hwb', [120, 0.1, 0.1]);
  const MIN = createMockColor('hwb', [0, 0, 0]);
  const MAX = createMockColor('hwb', [360, 1, 1]);
  const ALPHA = createMockColor('hwb', [120, 0, 0], 0.5);
  const NONE = createMockColor('hwb', [120, NaN, 0]);
  bench('format (hwb)', () => {
    formatCss(COLOR);
  });
  bench('format (hwb-min)', () => {
    formatCss(MIN);
  });
  bench('format (hwb-max)', () => {
    formatCss(MAX);
  });
  bench('format (hwb-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (hwb-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-lab', () => {
  const COLOR = createMockColor('lab', [50, 40, 20]);
  const MIN = createMockColor('lab', [0, -125, -125]);
  const MAX = createMockColor('lab', [100, 125, 125]);
  const ALPHA = createMockColor('lab', [50, 0, 0], 0.5);
  const NONE = createMockColor('lab', [NaN, 0, 0]);
  bench('format (lab)', () => {
    formatCss(COLOR);
  });
  bench('format (lab-min)', () => {
    formatCss(MIN);
  });
  bench('format (lab-max)', () => {
    formatCss(MAX);
  });
  bench('format (lab-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (lab-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-lch', () => {
  const COLOR = createMockColor('lch', [50, 100, 30]);
  const MIN = createMockColor('lch', [0, 0, 0]);
  const MAX = createMockColor('lch', [100, 150, 360]);
  const ALPHA = createMockColor('lch', [50, 50, 10], 0.1);
  const NONE = createMockColor('lch', [NaN, 50, 10]);
  bench('format (lch)', () => {
    formatCss(COLOR);
  });
  bench('format (lch-min)', () => {
    formatCss(MIN);
  });
  bench('format (lch-max)', () => {
    formatCss(MAX);
  });
  bench('format (lch-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (lch-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-oklab', () => {
  const COLOR = createMockColor('oklab', [0.5, 0.1, -0.1]);
  const MIN = createMockColor('oklab', [0, -0.4, -0.4]);
  const MAX = createMockColor('oklab', [1, 0.4, 0.4]);
  const ALPHA = createMockColor('oklab', [0.5, 0, 0], 0.5);
  const NONE = createMockColor('oklab', [0.5, NaN, NaN]);
  bench('format (oklab)', () => {
    formatCss(COLOR);
  });
  bench('format (oklab-min)', () => {
    formatCss(MIN);
  });
  bench('format (oklab-max)', () => {
    formatCss(MAX);
  });
  bench('format (oklab-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (oklab-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-oklch', () => {
  const COLOR = createMockColor('oklch', [0.7, 0.1, 120]);
  const MIN = createMockColor('oklch', [0, 0, 0]);
  const MAX = createMockColor('oklch', [1, 0.4, 360]);
  const ALPHA = createMockColor('oklch', [0.5, 0.1, 0], 0.5);
  const NONE = createMockColor('oklch', [0.5, 0, NaN], NaN);
  bench('format (oklch)', () => {
    formatCss(COLOR);
  });
  bench('format (oklch-min)', () => {
    formatCss(MIN);
  });
  bench('format (oklch-max)', () => {
    formatCss(MAX);
  });
  bench('format (oklch-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (oklch-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-lrgb', () => {
  const COLOR = createMockColor('lrgb', [1, 0, 0.5]);
  const MIN = createMockColor('lrgb', [0, 0, 0]);
  const MAX = createMockColor('lrgb', [1, 1, 1]);
  const ALPHA = createMockColor('lrgb', [0, 0, 0], 0);
  const NONE = createMockColor('lrgb', [0.5, NaN, 0.5]);
  bench('format (lrgb)', () => {
    formatCss(COLOR);
  });
  bench('format (lrgb-min)', () => {
    formatCss(MIN);
  });
  bench('format (lrgb-max)', () => {
    formatCss(MAX);
  });
  bench('format (lrgb-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (lrgb-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-xyz50', () => {
  const COLOR = createMockColor('xyz50', [0.96, 1, 0.82]);
  const MIN = createMockColor('xyz50', [0, 0, 0]);
  const MAX = createMockColor('xyz50', [1, 1, 1]);
  const ALPHA = createMockColor('xyz50', [0.5, 0.5, 0.5], 0.5);
  const NONE = createMockColor('xyz50', [NaN, 1, 1], 0.5);
  bench('format (xyz50)', () => {
    formatCss(COLOR);
  });
  bench('format (xyz50-min)', () => {
    formatCss(MIN);
  });
  bench('format (xyz50-max)', () => {
    formatCss(MAX);
  });
  bench('format (xyz50-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (xyz50-none)', () => {
    formatCss(NONE);
  });
});

describe('format-css-xyz65', () => {
  const COLOR = createMockColor('xyz65', [0.95, 1, 1.08]);
  const MIN = createMockColor('xyz65', [0, 0, 0]);
  const MAX = createMockColor('xyz65', [1, 1, 1]);
  const ALPHA = createMockColor('xyz65', [0.5, 0.5, 0.5], 0.5);
  const NONE = createMockColor('xyz65', [NaN, 1, 1], 0.5);
  bench('format (xyz65)', () => {
    formatCss(COLOR);
  });
  bench('format (xyz65-min)', () => {
    formatCss(MIN);
  });
  bench('format (xyz65-max)', () => {
    formatCss(MAX);
  });
  bench('format (xyz65-alpha)', () => {
    formatCss(ALPHA);
  });
  bench('format (xyz65-none)', () => {
    formatCss(NONE);
  });
});
