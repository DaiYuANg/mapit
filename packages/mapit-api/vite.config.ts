import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ApiClient',
      fileName: (format) => `api-client.${format}.js`,
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['axios'],
    },
  },
  plugins: [dts()],
});
