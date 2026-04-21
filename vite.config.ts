import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    clean: true,
    dts: true,
    entry: ['src/**/*.ts'],
    format: ['esm'],
    minify: true,
    target: 'es2023',
    treeshake: true,
  },

  resolve: {
    alias: {
      '~': './src',
    },
  },

  fmt: {
    experimentalSortPackageJson: true,
    ignorePatterns: ['dist/**'],
    semi: true,
    singleQuote: true,
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
      ignoreCase: false,
      newlinesBetween: false,
      order: 'asc',
    },
  },

  lint: {
    categories: {
      correctness: 'error',
      pedantic: 'warn',
      perf: 'error',
      suspicious: 'error',
    },
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['oxc', 'typescript', 'unicorn', 'vitest'],
    rules: {
      curly: ['error', 'multi-line'],
      'max-lines-per-function': ['error', { max: 100 }],
      'no-console': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-destructuring': [
        'error',
        {
          AssignmentExpression: { array: false, object: true },
          VariableDeclarator: { array: false, object: true },
        },
      ],
      'unicode-bom': ['error', 'never'],

      'typescript/ban-ts-comment': [
        'error',
        {
          minimumDescriptionLength: 3,
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': false,
          'ts-nocheck': false,
        },
      ],
      'typescript/consistent-indexed-object-style': ['error', 'record'],
      'typescript/no-explicit-any': 'error',
      'typescript/prefer-readonly-parameter-types': [
        'error',
        {
          allow: [
            { from: 'lib', name: ['Float32Array'] },
            { from: 'file', name: ['Color', 'Space'] },
          ],
          checkParameterProperties: true,
          ignoreInferredTypes: true,
          treatMethodsAsReadonly: true,
        },
      ],

      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/no-process-exit': 'error',
      'unicorn/prefer-module': 'error',
    },
  },

  test: {
    benchmark: {
      include: ['tests/**/*.bench.ts'],
    },
    coverage: {
      provider: 'v8',
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    pool: 'threads',
    onStackTrace(_, frame) {
      const ignoredFiles = ['node_modules', 'tests/factory.ts'];
      return !ignoredFiles.some((pattern) => frame.file.includes(pattern));
    },
  },
});
