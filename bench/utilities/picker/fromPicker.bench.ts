import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { fromPicker } from '~/utils/picker';

describe('fromPicker()', () => {
  bench('picker (from-rgb-opaque)', () => {
    const result = fromPicker({ h: 120, s: 0.8, v: 0.7, a: 1 }, 'rgb');
    dropColor(result);
  });

  bench('picker (from-rgb-transparent)', () => {
    const result = fromPicker({ h: 0, s: 1, v: 1, a: 0.5 }, 'rgb');
    dropColor(result);
  });

  bench('picker (from-complex-space-oklch)', () => {
    const result = fromPicker({ h: 240, s: 0.5, v: 0.5, a: 1 }, 'oklch');
    dropColor(result);
  });

  bench('picker (from-grayscale-achromatic)', () => {
    const result = fromPicker({ h: 0, s: 0, v: 0.5, a: 1 }, 'rgb');
    dropColor(result);
  });
});
