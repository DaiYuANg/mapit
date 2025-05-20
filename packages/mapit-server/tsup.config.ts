import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: 'dist',
  target: 'node22',
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  bundle: true,
  external: [],
});
