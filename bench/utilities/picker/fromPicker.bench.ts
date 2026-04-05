import { bench, describe } from 'vitest';
import { fromPicker } from '~/utils/picker';

describe('fromPicker()', () => {
  bench('picker (from)', () => {
    fromPicker({ h: 120, s: 0.8, v: 0.7, a: 1 }, 'rgb');
  });
});
