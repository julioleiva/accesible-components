import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 10000,
    environment: 'happy-dom'

  },
});
