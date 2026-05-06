import { defineConfig } from 'vite-plus';

export default defineConfig({
  resolve: {
    alias: {
      '~': './src',
    },
  },
  pack: {
    entry: ['src/**/*.ts'],
    dts: {
      tsgo: true,
    },
    exports: true,
    minify: true,
    treeshake: true,
    clean: true,
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
      // Restriction - Rules that ban specific patterns or features
      'no-console': 'error',
      'unicode-bom': ['error', 'never'],
      'typescript/no-explicit-any': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/prefer-module': 'error',

      // Pedantic - Extra strict rules that may have false positives
      'max-lines-per-function': ['error', { max: 100 }],
      'typescript/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
      'typescript/prefer-readonly-parameter-types': [
        'warn',
        {
          allow: [
            { from: 'lib', name: ['Float32Array'] },
            { from: 'file', name: ['Color', 'Space'] },
          ],
          ignoreInferredTypes: true,
          treatMethodsAsReadonly: true,
        },
      ],

      // Style - Rules that help maintain idiomatic and consistent style
      curly: ['error', 'multi-line'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'typescript/consistent-indexed-object-style': ['error', 'record'],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  fmt: {
    experimentalSortPackageJson: true,
    ignorePatterns: ['dist/**'],
    semi: true,
    singleQuote: true,
    sortImports: {
      ignoreCase: false,
      newlinesBetween: false,
      order: 'asc',
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
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
      exclude: ['tests/factory.ts'],
    },
    environment: 'node',
    globals: true,
    pool: 'threads',
    onStackTrace(_, frame) {
      const ignoredFiles = ['node_modules', 'tests/factory.ts'];
      return !ignoredFiles.some((pattern) => frame.file.includes(pattern));
    },
  },
});
