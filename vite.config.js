import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    testTimeout: 10000,
    environment: 'happy-dom'

  },

  build: {
    lib: {
      entry: 'src/components/index.js',
      formats: ['es']
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
