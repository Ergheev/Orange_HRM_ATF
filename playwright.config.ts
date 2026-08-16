import {defineConfig, devices} from '@playwright/test';
import {environment} from "./config/environment";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    timeout: 60_000,
    expect: {timeout: 10_000},
    retries: 1,
    reporter: [['html', {open: 'never'}]],

    use: {
        baseURL: environment.baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: true,
        locale: 'en-US',
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
});
