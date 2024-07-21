import type { UserConfig } from 'vitest/config'

export default (setupPath: string): UserConfig => {
  return {
    test: {
      globals: true, 
      environment: 'jsdom',
      setupFiles: setupPath,
      include: ['**/*.{test}.?[t]s?(x)'],
      exclude: [
        '**/node_modules/**', 
        '**/output/**', 
        '**/.{idea,git,cache,output,temp}/**', 
        '**/{vite,vitest}.config.*'
      ]
    }
  }
}