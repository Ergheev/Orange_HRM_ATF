import {Page} from "@playwright/test";
import {LoginPage} from "./LoginPage";
import {DashboardPage} from "./DashboardPage";
import {SystemUsersPage} from "./SystemUsersPage";

export class PageManager {
    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly systemUsersPage: SystemUsersPage;

    constructor(private readonly page: Page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.systemUsersPage = new SystemUsersPage(page);
    }
}