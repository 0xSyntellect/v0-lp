import { defineConfig } from 'vitest/config';
import 'dotenv/config';


export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'tests/setup.ts'],
    },
  },
});
