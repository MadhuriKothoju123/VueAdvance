/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    poolOptions: {
      threads: {
        singleThread: true, // Ensure single thread mode
      },
    },
    coverage: {
      provider: 'istanbul',
      enabled: true,
      all: false,
      reportsDirectory: './coverage',  // Directory for reports
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.vue'],  // Files to track
      exclude: ['node_modules'],  // Exclude irrelevant files
    },
    globals : true, // Enable Jest-like global functions
    environment: 'jsdom', // Simulate browser-like environment
    exclude: ["node_modules", ...configDefaults.exclude],
  },
})
