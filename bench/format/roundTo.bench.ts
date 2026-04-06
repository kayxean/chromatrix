import { bench, describe } from 'vitest';
import { roundTo } from '~/format';

describe('roundTo()', () => {
  const PI = 3.141592653589793;

  bench('round (precision-0)', () => {
    roundTo(PI, 0);
  });

  bench('round (precision-2)', () => {
    roundTo(PI, 2);
  });

  bench('round (precision-4)', () => {
    roundTo(PI, 4);
  });

  bench('round (negative-precision)', () => {
    roundTo(3.7, -1);
  });

  bench('round (capped-precision)', () => {
    roundTo(PI, 20);
  });
});
