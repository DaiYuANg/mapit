import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: 'dist',
  target: 'es2024',
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  bundle: true,
  treeshake: true,
  minify: true,
  external: [],
});
