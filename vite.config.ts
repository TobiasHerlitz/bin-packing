/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults as testDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@globalStyle': resolve(__dirname, './src/style/global.css'),
    },
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true, // Needed to run in docker
  },
  test: {
    coverage: {
      reporter: ['text'], // Only report in cli
      exclude: [...testDefaults.exclude, '**/index.ts'],
    },
  },
});
