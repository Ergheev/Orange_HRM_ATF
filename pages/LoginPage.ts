import {expect, Page} from "@playwright/test";

export class LoginPage {
    private readonly usernameInput = this.page.getByPlaceholder('Username');
    private readonly passwordInput = this.page.getByPlaceholder('Password');
    private readonly loginButton = this.page.getByRole('button', {name: 'Login'});

    constructor(private readonly page: Page) {}

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/dashboard/);
        await expect(this.page.getByRole("heading", {name: "Dashboard"})).toBeVisible();
    }

    async navigate(): Promise<void>{
        await this.page.goto('web/index.php/auth/login');
    }
}
