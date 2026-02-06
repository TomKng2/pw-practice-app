import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();




export default defineConfig<TestOptions>({
  timeout: 10000,
  // globalTimeout: 60000,

  expect: {
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 200}
  },


  /* Retry on CI only */
  retries: 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', {  outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    //['allure-playwright'],
    ['html']
  
  ],



  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201'
      : process.env.STAGING === '1' ? 'http://localhost:4202'
        : 'http://localhost:4200',


    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 10000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201'
      },

      fullyParallel: true,
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      },
    },

  ],

  webServer: {
    command: 'npm run start',
    url : 'http://localhost:4200/'
  }
});
