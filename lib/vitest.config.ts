import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      exclude: ['./vitest-setup.ts', 'src/**/*.spec.ts', 'src/**/types.ts'],
    },
  },
})
