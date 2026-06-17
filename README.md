# Trello Playwright Automation Framework

## Description
This repository contains an end-to-end test automation framework built with Playwright and JavaScript, testing real-world Trello scenarios including user authentication, board management, list creation, and card creation.

## Tech Stack
- **Playwright** — end-to-end test automation framework
- **JavaScript** — programming language
- **Node.js** — runtime environment
- **VS Code** — recommended IDE
- **GitHub Actions** — CI/CD pipeline (configured)

## Project Structure
```
trello-playwright-tests/
├── pages/              # Contains loginPage and boardPage classes with reusable methods
├── pageobjects/        # Contains selector definitions for selectors in loginPage and boardPage
├── tests/              # Contains TC for user authentication, board management, list creation, and card creation
├── testFixtures/       # Custom Playwright fixtures wiring up page objects
├── data/               # Test data (gitignored for security)
├── .github/workflows/  # GitHub Actions CI/CD configuration
└── playwright.config.js # Playwright configuration
```

## Prerequisites
- **Node.js** (v18 or higher) — [download here](https://nodejs.org)
- **Git** — [download here](https://git-scm.com)
- **VS Code** (recommended) — [download here](https://code.visualstudio.com)

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/muskanxb1110/trello-playwright-tests.git
cd trello-playwright-tests
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install Playwright browsers:**
```bash
npx playwright install
```

4. **Set up authentication:**

This project uses Trello's `storageState` for authentication. Run the following command and log in manually:
```bash
npx playwright codegen --save-storage=auth.json https://trello.com
```

> ⚠️ `auth.json` is gitignored for security — you must generate it locally before running tests.

5. **Run the tests:**
```bash
# Run all tests
npx playwright test --project=chromium

# Run a specific test file
npx playwright test TC_01_login.test.js --project=chromium

# View the HTML report
npx playwright show-report
```

## Test Coverage

### UI Tests

| Test File | Description |
|-----------|-------------|
| `TC_01_login.test.js` | Verifies successful login and user is redirected to home page |
| `TC_02_createBoard.test.js` | Creates a board and verifies it exists, cleans up |
| `TC_03_createList.test.js` | Creates a board, adds a list, verifies list exists, cleans up |
| `TC_04_createCard.test.js` | Creates a board, adds a list, adds a card, verifies card exists, cleans up |

### API Tests
| Test File | Description |
|-----------|-------------|
| `TC_05_apiCreateBoard.test.js` | Creates a board and verifies it exists, cleans up using API |
| `TC_06_apiCreateList.test.js` | Creates a board, adds a list, verifies list exists, cleans up using API|
| `TC_07_apiCreateCard.test.js` | Creates a board, adds a list, adds a card, verifies card exists, cleans up using API|

## Authentication

This project uses Playwright's `storageState` to handle Trello's authentication, which includes two-factor authentication and bot detection that cannot be automated directly.

`auth.json` is **not included in this repository** to protect account security. You must generate it locally before running tests.

**To regenerate when expired:**
```bash
npx playwright codegen --save-storage=auth.json https://trello.com
```

> 💡 Log in manually in the browser that opens, wait until you land on your boards page, then close the browser. The session is saved automatically.

API tests require a Trello API key and token stored in `data/users.json` (gitignored). 
See [Trello Power-Up Admin Portal](https://trello.com/power-ups/admin) to generate credentials.