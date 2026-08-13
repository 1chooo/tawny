import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'embed-card',
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
