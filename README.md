# Saucedemo E2E Test Suite

Automated test suite for [saucedemo.com](https://www.saucedemo.com) built with Playwright and TypeScript.

[![Playwright Tests](https://github.com/serhiimelnykkk/saucedemo-qa/actions/workflows/playwright.yml/badge.svg)](https://github.com/serhiimelnykkk/saucedemo-qa/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-HTML-blue.svg)](https://serhiimelnykkk.github.io/saucedemo-qa/)

---

## Tech Stack

*   **Playwright** — E2E automation framework
*   **TypeScript** — Language for type-safety and modern features
*   **Allure** — Test reporting framework
*   **GitHub Actions** — CI/CD pipeline automation

---

## Test Coverage

This suite covers key features and user flows on [saucedemo.com](https://www.saucedemo.com) using the Page Object Model (POM) pattern. Data-driven tests are used to run scenarios across multiple user profiles (`standard_user` and `problem_user`).

**Total Test Cases:** **65**

### Summary of Covered Scenarios

| Area | Specs & Features Covered | Test Cases |
| :--- | :--- | :---: |
| **Access Control** | Verifies that unauthorized users are blocked and redirected to the login page when attempting to access internal URLs (`/inventory.html`, `/cart.html`). | **2** |
| **Authentication** | Validates the login form, including successful login, error handling for locked out or invalid users, required fields, case-sensitivity checks, and form submission methods (mouse click and Enter key). | **11** |
| **Inventory** | Covers navigation to product details via title and image links, "Add to cart"/"Remove" button toggling, and product sorting options (A-Z, Z-A, Price Low-to-High, Price High-to-Low). | **22** |
| **Item Details** | Validates details page navigation, the "Back to products" button, and toggling cart actions from the individual item view. | **6** |
| **Shopping Cart** | Verifies adding/removing items to/from the cart, cart persistence, checking out redirects, and navigating back to continue shopping. | **16** |
| **Header Badge** | Asserts correctness of the cart counter badge, ensuring it increments, decrements, and updates in real-time as items are added/removed. | **8** |

---

## Project Structure

```text
saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline running Playwright tests & deploying Allure reports
├── pages/                      # Page Object Model (POM) classes
│   ├── loginPage.ts            # Selectors and actions for the login page
│   ├── inventoryPage.ts        # Selectors and actions for the inventory page
│   ├── itemPage.ts             # Selectors and actions for the product details page
│   └── cartPage.ts             # Selectors and actions for the shopping cart page
├── tests/                      # Test specifications
│   ├── access_control.spec.ts  # Unauthorized access scenarios
│   ├── login.spec.ts           # Login form validations
│   ├── inventory.spec.ts       # Products and sorting validations
│   ├── item.spec.ts            # Individual item detail validations
│   ├── cart.spec.ts            # Cart items and checkout flow validations
│   ├── header.spec.ts          # Cart badge and header element validations
│   └── users.json              # Test data for data-driven test scenarios
├── playwright.config.ts        # Playwright configurations
├── package.json                # Project dependencies and script runner configurations
└── tsconfig.json               # TypeScript compiler configurations
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [pnpm](https://pnpm.io/) (package manager used in this project)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/repo.git
   cd saucedemo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Install Playwright browsers and system dependencies:
   ```bash
   pnpm exec playwright install --with-deps
   ```

### Running Tests

*   **Run all tests in headless mode (Chromium only):**
    ```bash
    pnpm test
    ```

*   **Run tests in Playwright UI Mode:**
    ```bash
    pnpm ui
    ```

*   **Run specific test file:**
    ```bash
    pnpm playwright test tests/login.spec.ts
    ```

### Generating Test Reports

This project is integrated with Allure Report for rich HTML reporting.

*   Generate and open the Allure report locally:
    ```bash
    pnpm report
    ```

---

## CI/CD Pipeline

On every push and pull request to the `main` or `master` branches, a GitHub Actions workflow runs:
1. Checks out the repository.
2. Installs `pnpm` and dependencies.
3. Installs Playwright browsers.
4. Executes the automated tests on Chromium.
5. Generates the Allure HTML report.
6. Publishes the report to GitHub Pages.

---

## Test Documentation

*   [Allure Report](https://serhiimelnykkk.github.io/saucedemo-qa/) — latest test results
*   [Test Cases](https://liluzivert.notion.site/saucedemo-com-38a47b39835a807fbd94d39f9f4d94c6) — test cases in Notion
*   [Bug Reports](https://github.com/serhiimelnykkk/saucedemo-qa/issues) — found bugs
