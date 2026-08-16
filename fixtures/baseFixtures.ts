import {test as base} from "@playwright/test";
import {PageManager} from "../pages/PageManager";
import {credentials} from "../config/credentials";

type Fixtures = {
    authenticatedPages: PageManager;
};

export const test = base.extend<Fixtures>({
    authenticatedPages: async ({page}, use) => {
        const pages = new PageManager(page);
        await pages.loginPage.navigate();
        await pages.loginPage.login(credentials.username, credentials.password);
        await pages.loginPage.verifyLoginSuccess();
        await use(pages);
    }
}
);

export {expect} from "@playwright/test";