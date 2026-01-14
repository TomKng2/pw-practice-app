import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();




export default defineConfig<TestOptions>({

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
    },
  ],
});
