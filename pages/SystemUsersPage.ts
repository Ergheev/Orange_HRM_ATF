import {expect, Locator, Page} from "@playwright/test";
import {User, UserUpdate} from "../types/User";

export class SystemUsersPage {
    private readonly addButton = this.page.getByRole('button', {name: 'Add'});

    private readonly userRoleDropdown = this.page
        .locator(".oxd-grid-item")
        .filter({hasText: "User Role"})
        .locator(".oxd-select-wrapper");

    private readonly employeeNameInput = this.page.getByPlaceholder('Type for hints...');

    private readonly statusDropdown = this.page
        .locator(".oxd-grid-item")
        .filter({hasText: "Status"})
        .locator(".oxd-select-wrapper");

    private readonly usernameInput = this.page
        .locator(".oxd-grid-item")
        .filter({hasText: "Username"})
        .locator("input");

    private readonly passwordInput = this.page
        .locator("input[type='password']").first();

    private readonly confirmPasswordInput = this.page
        .locator("input[type='password']").last();

    private readonly saveButton = this.page.getByRole('button', {name: 'Save'});

    private readonly searchButton = this.page.getByRole('button', {name: 'Search'});

    private readonly tableRows = this.page
        .locator(".oxd-table-body .oxd-table-row");

    constructor(private readonly page: Page) {
    }

    async createUser(user: User): Promise<void> {
        await this.addButton.click();
        await this.selectDropdownOption(this.userRoleDropdown, user.role);
        await this.selectEmployee("Orange Test");
        await this.selectDropdownOption(this.statusDropdown, user.status)
        await this.usernameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.saveButton.click();
    }

    async searchUser(username: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.searchButton.click();
    }

    async verifyUserExists(username: string): Promise<void> {
        const row = this.tableRows.filter({hasText: username});
        await expect(row.first()).toContainText(username, {timeout: 5000});
    }

    async editUser(username: string, updatedUser: UserUpdate): Promise<void> {
        const row = this.getRowByUsername(username);
        await expect(row).toBeVisible();
        await row.locator("button").last().click();

        for (const key of Object.keys(updatedUser) as (keyof UserUpdate)[]) {
            switch (key) {
                case "role":
                    await this.selectDropdownOption(this.userRoleDropdown, updatedUser.role);
                    break;
                case "status":
                    await this.selectDropdownOption(this.statusDropdown, updatedUser.status);
                    break;
                case "username":
                    await this.usernameInput.fill(updatedUser.username);
                    break;
                case "password":
                    await this.passwordInput.fill(updatedUser.password);
                    await this.confirmPasswordInput.fill(updatedUser.password);
                    break;
            }
        }
        await this.saveButton.click();
    }

    async verifyUserField(username: string,  expectedValue: string) {
        const row = this.getRowByUsername(username);
        await expect(row).toContainText(expectedValue);
    }

    async deleteUser(username: string): Promise<void> {
        const row = this.getRowByUsername(username);
        await row.locator("button").first().click();
        await this.page.getByRole('button', {name: 'Yes, Delete'}).click();
    }

    async verifyUserDeleted(username: string): Promise<void> {
        await expect(this.tableRows.filter({hasText: username}).first()).toHaveCount(0);
    }

    private async selectDropdownOption(
        dropdownWrapper: Locator,
        optionText: string) {
        await dropdownWrapper.click();
        await this.page
            .locator(".oxd-select-dropdown")
            .getByRole("option", {name: optionText})
            .click();
    }

    private getRowByUsername(username: string): Locator {
        return this.tableRows.filter({hasText: username});
    }

    private async selectEmployee(employeeName: string): Promise<void> {
        await this.employeeNameInput.click();
        await this.employeeNameInput.pressSequentially(employeeName);
        const option = this.page.getByRole('option', {name: employeeName});
        await expect(option).toBeVisible();
        await option.click();
    }
}

