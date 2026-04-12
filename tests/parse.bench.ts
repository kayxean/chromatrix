import { bench, describe } from 'vitest';
import { parseColor } from '~/parse';

describe('parseColor(HEX)', () => {
  bench('parse (hex)', () => {
    parseColor('#ff0080');
  });
  bench('parse (hex-min)', () => {
    parseColor('#000000');
  });
  bench('parse (hex-max)', () => {
    parseColor('#ffffff');
  });
  bench('parse (hex-alpha)', () => {
    parseColor('#ff000080');
  });
});

describe('parseColor(RGB)', () => {
  bench('parse (rgb)', () => {
    parseColor('rgb(255 0 128)');
  });
  bench('parse (rgb-min)', () => {
    parseColor('rgb(0 0 0)');
  });
  bench('parse (rgb-max)', () => {
    parseColor('rgb(255 255 255)');
  });
  bench('parse (rgb-alpha)', () => {
    parseColor('rgb(0 255 0 / 0.4)');
  });
  bench('parse (rgb-none)', () => {
    parseColor('rgb(255 none 0 / none)');
  });
});

describe('parseColor(HSL)', () => {
  bench('parse (hsl)', () => {
    parseColor('hsl(200deg 100% 50%)');
  });
  bench('parse (hsl-min)', () => {
    parseColor('hsl(0deg 0% 0%)');
  });
  bench('parse (hsl-max)', () => {
    parseColor('hsl(360deg 100% 100%)');
  });
  bench('parse (hsl-alpha)', () => {
    parseColor('hsl(200deg 50% 50% / 0.1)');
  });
  bench('parse (hsl-none)', () => {
    parseColor('hsl(none 100% 50%)');
  });
});

describe('parseColor(HWB)', () => {
  bench('parse (hwb)', () => {
    parseColor('hwb(120deg 10% 10%)');
  });
  bench('parse (hwb-min)', () => {
    parseColor('hwb(0deg 0% 0%)');
  });
  bench('parse (hwb-max)', () => {
    parseColor('hwb(360deg 100% 100%)');
  });
  bench('parse (hwb-alpha)', () => {
    parseColor('hwb(120deg 0% 0% / 0.5)');
  });
  bench('parse (hwb-none)', () => {
    parseColor('hwb(120deg none 0%)');
  });
});

describe('parseColor(LAB)', () => {
  bench('parse (lab)', () => {
    parseColor('lab(50% 40 20)');
  });
  bench('parse (lab-min)', () => {
    parseColor('lab(0% -125 -125)');
  });
  bench('parse (lab-max)', () => {
    parseColor('lab(100% 125 125)');
  });
  bench('parse (lab-alpha)', () => {
    parseColor('lab(50% 0 0 / 0.5)');
  });
  bench('parse (lab-none)', () => {
    parseColor('lab(none 0 0)');
  });
});

describe('parseColor(LCH)', () => {
  bench('parse (lch)', () => {
    parseColor('lch(50% 100 30deg)');
  });
  bench('parse (lch-min)', () => {
    parseColor('lch(0% 0 0deg)');
  });
  bench('parse (lch-max)', () => {
    parseColor('lch(100% 150 360deg)');
  });
  bench('parse (lch-alpha)', () => {
    parseColor('lch(50% 50 10deg / 0.1)');
  });
  bench('parse (lch-none)', () => {
    parseColor('lch(none 50 10deg)');
  });
});

describe('parseColor(OKLAB)', () => {
  bench('parse (oklab)', () => {
    parseColor('oklab(50% 0.1 -0.1)');
  });
  bench('parse (oklab-min)', () => {
    parseColor('oklab(0% -0.4 -0.4)');
  });
  bench('parse (oklab-max)', () => {
    parseColor('oklab(100% 0.4 0.4)');
  });
  bench('parse (oklab-alpha)', () => {
    parseColor('oklab(50% 0 0 / 0.5)');
  });
  bench('parse (oklab-none)', () => {
    parseColor('oklab(50% none none)');
  });
});

describe('parseColor(OKLCH)', () => {
  bench('parse (oklch)', () => {
    parseColor('oklch(70% 0.1 120deg)');
  });
  bench('parse (oklch-min)', () => {
    parseColor('oklch(0% 0 0deg)');
  });
  bench('parse (oklch-max)', () => {
    parseColor('oklch(100% 0.4 360deg)');
  });
  bench('parse (oklch-alpha)', () => {
    parseColor('oklch(50% 0.1 0deg / 0.5)');
  });
  bench('parse (oklch-none)', () => {
    parseColor('oklch(50% 0 none / none)');
  });
});

describe('parseColor(LRGB)', () => {
  bench('parse (lrgb)', () => {
    parseColor('color(srgb-linear 1 0 0.5)');
  });
  bench('parse (lrgb-min)', () => {
    parseColor('color(srgb-linear 0 0 0)');
  });
  bench('parse (lrgb-max)', () => {
    parseColor('color(srgb-linear 1 1 1)');
  });
  bench('parse (lrgb-alpha)', () => {
    parseColor('color(srgb-linear 0 0 0 / 0)');
  });
  bench('parse (lrgb-none)', () => {
    parseColor('color(srgb-linear 0.5 none 0.5)');
  });
});

describe('parseColor(XYZ50)', () => {
  bench('parse (xyz50)', () => {
    parseColor('color(xyz-d50 0.96 1 0.82)');
  });
  bench('parse (xyz50-min)', () => {
    parseColor('color(xyz-d50 0 0 0)');
  });
  bench('parse (xyz50-max)', () => {
    parseColor('color(xyz-d50 1 1 1)');
  });
  bench('parse (xyz50-alpha)', () => {
    parseColor('color(xyz-d50 0.5 0.5 0.5 / 0.5)');
  });
  bench('parse (xyz50-none)', () => {
    parseColor('color(xyz-d50 none 1 1 / 0.5)');
  });
});

describe('parseColor(XYZ65)', () => {
  bench('parse (xyz65)', () => {
    parseColor('color(xyz-d65 0.95 1 1.08)');
  });
  bench('parse (xyz65-min)', () => {
    parseColor('color(xyz-d65 0 0 0)');
  });
  bench('parse (xyz65-max)', () => {
    parseColor('color(xyz-d65 1 1 1)');
  });
  bench('parse (xyz65-alpha)', () => {
    parseColor('color(xyz-d65 0.5 0.5 0.5 / 0.5)');
  });
  bench('parse (xyz65-none)', () => {
    parseColor('color(xyz-d65 none 1 1 / 0.5)');
  });
});
