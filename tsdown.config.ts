import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    converter: 'test/converter.ts',
    palette: 'test/palette.ts',
  },
  minify: true,
  treeshake: true,
});
