import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    convert: 'src/convert.ts',
    parse: 'src/parse.ts',
    interpolate: 'src/interpolate.ts',
    index: 'test/index.ts',
    palette: 'test/palette.ts',
  },
  minify: true,
  treeshake: true,
});
