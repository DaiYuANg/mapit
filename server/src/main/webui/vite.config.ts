import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 1024,
        manualChunks: {
          "refine-tool": ["@refinedev/cli", "@refinedev/devtools", "@refinedev/simple-rest"],
          refine: ["@refinedev/core", "@refinedev/kbar"],
          mui: ["@mui/icons-material", "@emotion/react", "@emotion/styled", "@mui/x-data-grid"],
        },
      },
    },
  },
});
