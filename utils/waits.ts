import {Page} from "@playwright/test";

export async function waitForPageLoad(page: Page): Promise<void> {
    await page
        .locator(".oxd-loading-spinner")
        .waitFor({state: "detached", timeout: 15_000})
        .catch(() => {
    });
}