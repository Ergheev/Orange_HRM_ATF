import {errors, Page} from "@playwright/test";

export async function waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle', {timeout: 15_000});

    const spinner = page.locator('.oxd-loading-spinner');
    if (await spinner.count().catch(() => 0)) {
        await spinner.waitFor({state: 'detached', timeout: 15_000});
    }
}

export async function waitForToastToDisappear(page: Page, appearTimeout = 2_000, disappearTimeout = 10_000): Promise<boolean> {
    const toast = page.locator('.oxd-toast').first();

    try {
        await toast.waitFor({state: 'visible', timeout: appearTimeout});
    } catch (e) {
        if (e instanceof errors.TimeoutError) {
            return false;
        }
        throw e;
    }

    await toast.waitFor({state: 'detached', timeout: disappearTimeout});
    return true;
}