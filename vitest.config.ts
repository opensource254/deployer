import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom', // Changed from happy-dom due to Node version incompatibility
    coverage: {
      provider: 'v8', // Changed from 'c8' due to TS error, c8 uses v8 reports
      reporter: ['text', 'json', 'html'],
    },
    // setupFiles: ['tests/setup.ts'], // Optional setup file
    alias: {
      '~/': resolve(__dirname, '.'),
      '@/': resolve(__dirname, '.'),
    }
  },
})
