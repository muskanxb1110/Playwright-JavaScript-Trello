import { defineConfig, devices } from '@playwright/test'
import fs from 'fs'

const authFile = fs.existsSync('./auth.json') ? 'auth.json' : undefined

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    storageState: authFile
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})