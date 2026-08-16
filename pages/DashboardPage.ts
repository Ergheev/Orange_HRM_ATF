import {expect, Page} from "@playwright/test";

export class DashboardPage {
    private readonly adminMenuLink = this.page.getByRole('link', {name: 'Admin'});

    constructor(private readonly page: Page) {}

    async openAdminModule() {
        await this.adminMenuLink.click();
        await expect(this.page).toHaveURL(/viewSystemUsers/);
    }
}
