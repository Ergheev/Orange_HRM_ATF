# Notes on the Orange HRM Automation Project

## Why the POM is structured this way

I structured the project around a Page Object Model because the automation is testing a real application workflow, and the test code should read like a user journey rather than a pile of selectors and DOM details.

The idea is simple: each page owns its own locators and actions. For example, login-related UI sits in LoginPage, dashboard navigation sits in DashboardPage, and the create/search/edit/delete user flow sits in SystemUsersPage. The tests then call intention-based methods like login(), createUser(), searchUser(), and verifyUserDeleted() instead of reaching into raw selectors.

This keeps the suite maintainable. If the UI changes, I only update the page object instead of hunting through every spec. It also makes the test logic easier to read for another QA or developer who should be able to follow the business flow without dealing with low-level Playwright plumbing.

## How waits and flaky UI were handled

The main rule in this project is: wait for a real state, not just for time.

I prefer Playwright’s built-in waiting and assertions because they are tied to actual UI behavior. The wait helper is designed to wait for the network to settle and then check whether the expected page is in the expected state, instead of using arbitrary fixed sleeps.

This is important because OrangeHRM is a dynamic application, and fixed waits often create brittle tests. If the UI is a little slow or loader timings vary, a smart wait tied to the page state is far more stable than sleeping for 2 or 3 seconds and hoping the app is ready.

The pattern I’d keep is: wait for the route or page to become stable, then assert the key UI element that proves the page is ready.

## How shared-demo data collisions were handled

This is a shared public demo environment, so uniqueness matters. If two test runs create the same username at the same time, you can get collisions and false failures.

That is why the username generator uses a more unique pattern than a simple timestamp alone. It creates values with a timestamp and a random suffix, which reduces the chance of duplicate user records during quick, repeated runs.

In other words, the automation is designed to avoid self-inflicted interference in a shared environment. This is a practical QA concern: the test should not fail just because another run used the same demo data.

## One selector I would improve if I owned the product

If I owned the product, I would add data-testid attributes to the main user-management elements and then use those in automation.

For example:
- username input
- password input
- save button
- user table rows
- delete confirmation button

Right now, the selectors rely on CSS structure and generic wrappers like .oxd-grid-item and button position. That works, but it is fragile. The UI structure can change without changing the actual function of the page, and then the tests break even though the product behavior is still correct.

A stable selector contract would make the UI easier for both developers and automation engineers to work with.

## What I would do next if I had another hour

If I had one more hour, I would focus on a few practical improvements that would increase reliability quickly:

1. Tighten the wait helper so it validates page-specific state rather than only loading conditions.
2. Improve assertions inside the page object methods after create/edit/delete actions, so each method confirms the result it triggered.
3. Replace the most fragile selectors with more stable locators or product-owned identifiers.
4. Add stronger test-level validation for login and after-action states to catch flaky behavior earlier.

That would take the project from a solid POM-based beginning to a more production-grade automation suite without changing the overall structure.
