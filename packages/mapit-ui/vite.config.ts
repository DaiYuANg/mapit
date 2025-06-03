import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // 代理 /api/v1 开头的请求到后端
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // 如果后端没有额外的前缀，不需要 rewrite
        // rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
      },
    },
  },
});
