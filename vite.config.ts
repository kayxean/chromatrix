import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/**/*.ts'],
    format: ['esm'],
    target: 'es2023',
    dts: true,
    minify: true,
    treeshake: true,
    clean: true,
  },

  test: {
    include: ['tests/**/*.test.ts'],
    benchmark: {
      include: ['tests/**/*.bench.ts'],
    },
    pool: 'forks',
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
    onStackTrace(_, frame) {
      if (frame.file.includes('node_modules')) {
        return false;
      }
      return true;
    },
  },

  lint: {
    plugins: ['typescript', 'unicorn', 'oxc', 'vitest'],
    categories: {
      correctness: 'error',
      perf: 'error',
      suspicious: 'error',
      pedantic: 'warn',
    },
    rules: {
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'no-console': 'error',
      curly: ['error', 'multi-line'],
      'unicode-bom': ['error', 'never'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: false, object: true },
        },
      ],
      'typescript/consistent-indexed-object-style': ['error', 'record'],
      'typescript/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': false,
          'ts-nocheck': false,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],
      'typescript/no-explicit-any': 'error',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/prefer-module': 'error',
      'unicorn/no-process-exit': 'error',
      'max-lines-per-function': ['error', { max: 100 }],
    },
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
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
      order: 'asc',
      ignoreCase: false,
      newlinesBetween: false,
    },
  },

  resolve: {
    alias: {
      '~': './src',
    },
  },
});
