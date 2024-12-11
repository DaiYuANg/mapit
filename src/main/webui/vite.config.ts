import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'refine': [
            "@refinedev/cli",
            "@refinedev/core",
            "@refinedev/devtools",
            "@refinedev/kbar"
          ]
        }
      }
    }
  }
});
