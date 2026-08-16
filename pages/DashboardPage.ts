import {expect, Page} from "@playwright/test";
import {waitForPageLoad} from "../utils/waits";

export class DashboardPage {
    private readonly adminMenuLink = this.page.getByRole('link', {name: 'Admin'});

    constructor(private readonly page: Page) {}

    async openAdminModule() {
        await this.adminMenuLink.click();
        await waitForPageLoad(this.page);
        await expect(this.page).toHaveURL(/viewSystemUsers/);
    }
}
