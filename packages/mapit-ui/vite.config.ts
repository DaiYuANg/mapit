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
  build: {
    sourcemap: true,
    minify: 'terser', // 默认使用 esbuild 压缩，可以切换为 'terser' 进行更强的压缩
    chunkSizeWarningLimit: 1000, // 如果产物过大，警告的限制，单位 KB
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
      format: {
        comments: true, // 删除注释
      },
    },
    rollupOptions: {
      output: {
        // 配置代码分割
        manualChunks: {
          react: ['react', 'react-dom'],
          refine: [
            'antd',
            '@refinedev/antd',
            '@refinedev/core',
            '@refinedev/devtools',
            '@refinedev/kbar',
            '@refinedev/react-router',
            '@refinedev/simple-rest',
          ],
          editor: ['@uiw/react-md-editor'],
          libs: ['axios', 'i18next', 'react-i18next', 'zustand'],
        },
      },
    },
  },
});
