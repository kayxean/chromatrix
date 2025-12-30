import type { ColorMode } from '~/types';
import { testColors } from './colors';

const tasks = testColors;

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
