import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: {
    esm: {
      target: ['es2022'],
    },
  },
  dts: true,
  minify: true,
  treeshake: true,
  unbundle: true,
  clean: true,
});
