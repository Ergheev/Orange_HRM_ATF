# Orange HRM Playwright ATF

This project is a Playwright + TypeScript automation test framework for the OrangeHRM demo application.

It follows a Page Object Model (POM) structure to keep test scenarios readable, maintainable, and easier to scale.

## What this project does

The suite covers the OrangeHRM System Users workflow, including:
- login to the application
- open Admin -> User Management -> Users
- create a user
- search for the created user
- update the user status
- delete the user
- verify the final state

The test is implemented using Playwright and TypeScript.

## Project structure

```text
.
├── .env.example              # sample environment variables
├── .gitignore                # ignores local secrets, reports, node_modules
├── config/
│   ├── credentials.ts        # default credentials / env-backed login data
│   └── environment.ts        # base URL for the app
├── fixtures/
│   └── baseFixtures.ts       # shared Playwright fixtures
├── pages/
│   ├── DashboardPage.ts      # Dashboard page actions
│   ├── LoginPage.ts          # Login page actions
│   ├── PageManager.ts        # central page object manager
│   └── SystemUsersPage.ts    # user management actions and assertions
├── tests/
│   ├── example.spec.ts       # sample Playwright example tests (optional / demo)
│   └── systemUser.spec.ts    # main end-to-end user lifecycle test
├── types/
│   └── User.ts               # user-related TS interfaces
├── utils/
│   ├── userGenerator.ts      # username generation helper
│   └── waits.ts              # wait helper(s)
├── playwright.config.ts      # Playwright configuration
├── package.json              # scripts and dependencies
├── .env                      # local env secrets (gitignored)
├── package-lock.json         # lock file
└── README.md                 # project documentation
```

## Why this structure

The framework is organized using POM so that:
- page locators live inside page classes
- test specs read like user flows, not DOM code
- actions and assertions are centralized and reusable
- test maintenance is easier when UI changes happen

This keeps the automation readable and much easier to extend.

## Prerequisites

Before running tests, make sure the machine has:
- Git
- Node.js 18+ (recommended)
- npm

If Node.js is not installed, install it first from:
https://nodejs.org/

## Install Playwright and TypeScript tooling

This project uses Playwright Test and TypeScript support through Playwright. You do not need a global TypeScript install to run it, because the project installs the necessary dependencies locally.

Run these commands from the project root:

```bash
npm install
npx playwright install --with-deps chromium
```

Notes:
- `npm install` installs the project dependencies from `package.json`
- `npx playwright install --with-deps chromium` downloads the browser binaries needed for Chromium
- On Linux, `--with-deps` installs OS dependencies automatically
- On macOS/Windows, `--with-deps` is usually not required, but it is safe to use when supported

If you want to install only the browser binary (without OS deps):

```bash
npx playwright install chromium
```

## Environment configuration

This project reads credentials from a local `.env` file.

### 1. Copy the sample env file

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 2. Fill in your credentials

Edit `.env` and set the correct OrangeHRM admin credentials:

```env
ADMIN_USERNAME=your_Admin_Username
ADMIN_PASSWORD=your_Admin_Password
```

Important:
- `.env` is gitignored and should never be committed
- `.env.example` is a template for other developers
- the project uses `dotenv` to load environment variables from `.env`

## Running tests

From the project root, use the scripts in `package.json`.

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npx playwright test tests/systemUser.spec.ts
```

### Run headed mode (browser visible)

```bash
npm run test:headed
```

### Run with a specific browser project

```bash
npx playwright test --project=chromium
```

### Run in debug mode

```bash
npx playwright test --debug
```

### Open the HTML report

```bash
npm run report
```

## How the framework works

### Playwright config

`playwright.config.ts` contains the project configuration:
- test directory
- timeout settings
- screenshot/video settings
- reporter configuration
- browser project configuration

This project is configured to use Chromium only.

### Fixtures

`fixtures/baseFixtures.ts` provides the authenticated test fixture:
- opens the login page
- logs in with configured credentials
- verifies that the dashboard loads
- gives tests a pre-authenticated `PageManager`

This reduces duplication across tests and ensures a consistent starting point.

### Page objects

Page classes encapsulate UI interactions and selectors:
- `LoginPage` handles login actions
- `DashboardPage` handles dashboard navigation
- `SystemUsersPage` handles create/search/edit/delete flows
- `PageManager` provides access to all page objects in one place

### Utilities

The `utils/` folder includes helper logic for:
- username generation (`userGenerator.ts`)
- wait strategies (`waits.ts`)

This keeps tests cleaner and avoids repeating low-level logic in each spec.

## Notes about shared demo data

OrangeHRM demo is a shared public environment. Because of that:
- test data may collide if generated values are not unique
- multiple runs in quick succession can create conflicts
- unique usernames and isolated test flows are important

This project generates usernames with a timestamp and random suffix to minimize collisions.

This reduces false positives and makes the automation more stable in real CI environments.

## Typical local workflow

```bash
# 1. install deps
npm install

# 2. install browsers
npx playwright install --with-deps chromium

# 3. create local env file
cp .env.example .env

# 4. fill in credentials in .env

# 5. run tests
npm test
```

## Troubleshooting

### Browser not found

If Playwright reports missing browsers, run:

```bash
npx playwright install chromium
```

### Env variables not loaded

If the app cannot login and the `.env` file is not picked up:
- verify `.env` exists in the project root
- verify variable names match exactly:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
