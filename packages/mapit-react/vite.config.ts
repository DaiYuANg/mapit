import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { name } from './package.json'
import * as path from "node:path";
// https://vite.dev/config/
const formattedName = name.match(/[^/]+$/)?.[0] ?? name
export default defineConfig({
  plugins: [react()],
  build:{
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: formattedName,
      formats: ['es', 'umd'],
      fileName: (format) => `${formattedName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react',  'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  }
})
