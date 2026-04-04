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
      include: ['bench/**/*.bench.ts'],
    },
    pool: 'threads',
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
    plugins: ['typescript', 'unicorn', 'oxc', 'vitest'],
  },

  fmt: {
    ignorePatterns: ['dist/**'],
    singleQuote: true,
    semi: true,
    experimentalSortPackageJson: true,
    sortImports: {
      groups: [
        'type',
        'builtin',
        'external',
        ['internal', 'subpath'],
        ['parent', 'sibling', 'index'],
        'style',
        'unknown',
      ],
      newlinesBetween: false,
    },
  },

  resolve: {
    alias: {
      '~': './src',
    },
  },
});
