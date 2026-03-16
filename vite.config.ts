import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/**/*.ts'],
    format: ['esm'],
    target: 'es2022',
    dts: true,
    minify: true,
    treeshake: true,
    unbundle: true,
    clean: true,
  },

  test: {
    include: ['tests/**/*.test.ts'],
    benchmark: {
      include: ['tests/**/*.bench.ts'],
    },
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },

  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'oxc/erasing-op': 'off',
    },
  },

  fmt: {
    ignorePatterns: ['dist/**'],
    singleQuote: true,
    semi: true,
    experimentalSortPackageJson: true,
  },

  resolve: {
    alias: {
      '~': './src',
    },
  },
});
