import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: {
    esm: {
      target: ['es2022'],
    },
    cjs: {
      target: ['node20'],
    },
  },
  dts: true,
  minify: true,
  treeshake: true,
});
