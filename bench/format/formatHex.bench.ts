import { bench, describe } from 'vitest';
import { formatHex } from '~/format';

describe('formatHex()', () => {
  bench('format (rgb-to-hex)', () => {
    formatHex(255, 128, 0);
  });

  bench('format (black)', () => {
    formatHex(0, 0, 0);
  });

  bench('format (white)', () => {
    formatHex(255, 255, 255);
  });

  bench('format (with-alpha)', () => {
    formatHex(255, 0, 0, 128);
  });

  bench('format (opaque-alpha)', () => {
    formatHex(255, 0, 0, 255);
  });
});
