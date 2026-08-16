import {test} from "../fixtures/baseFixtures";
import {generateUser} from "../utils/userGenerator";
import {User} from "../types/User";

test.describe("System Users full lifecycle", () => {
    let createdUser: User;

    test("create -> search -> edit -> delete system user", async ({authenticatedPages,}) => {
        const {dashboardPage, systemUsersPage} = authenticatedPages;

        createdUser = generateUser();
        const updatedStatus = "Disabled";

        await test.step("Navigate to Admin -> User Management -> Users", async () => {
            await dashboardPage.openAdminModule();
        });

        await test.step("Create a new system user", async () => {
            await systemUsersPage.createUser(createdUser);
        });

        await test.step("Search for the created user", async () => {
            await systemUsersPage.searchUser(createdUser.username);
            await systemUsersPage.verifyUserExists(createdUser.username);
        });

        await test.step(`Edit the created user status to "${updatedStatus}" `, async () => {
            await systemUsersPage.editUser(createdUser.username, {status: updatedStatus});
        });

        await test.step("Search and Verify the user status is updated", async () => {
            await systemUsersPage.searchUser(createdUser.username);
            await systemUsersPage.verifyUserExists(createdUser.username);
            await systemUsersPage.verifyUserField(createdUser.username, updatedStatus);
        });

        await test.step("Delete the created user", async () => {
            await systemUsersPage.deleteUser(createdUser.username);
        });

        await test.step("Search and Verify the user is deleted", async () => {
            await systemUsersPage.searchUser(createdUser.username);
            await systemUsersPage.verifyUserDeleted(createdUser.username);
        });

    });

});