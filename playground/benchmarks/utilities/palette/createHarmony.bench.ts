import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createHarmony } from '../../../utils/palette';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('createHarmony', () => {
  bench('createHarmony', () => {
    const harmony = createHarmony(RED_COLOR, [
      { name: 'analogous', ratios: [-30, 30] },
      { name: 'complementary', ratios: [180] },
    ]);
    harmony.forEach((h) => h.colors.forEach(dropColor));
  });
});

dropColor(RED_COLOR);
