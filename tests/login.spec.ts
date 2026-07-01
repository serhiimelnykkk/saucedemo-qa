import { test as base, expect } from "@playwright/test";
import { LoginPage } from "@/pages/loginPage";
import { InventoryPage } from "@/pages/inventoryPage";

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

test.describe("Login form", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("Login with valid credentials", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.loginWithMouseClick("standard_user", "secret_sauce");

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.productsHeader).toBeVisible();
  });

  test("Locked out user cannot login", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("locked_out_user", "secret_sauce");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Non-existent user can’t log in", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("123", "123");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Existing user who entered wrong password can’t log in", async ({
    page,
    loginPage,
  }) => {
    await loginPage.loginWithMouseClick("standard_user", "123");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("User who left username field empty can’t log in", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("", "secret_sauce");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("User who left password field empty can’t log in", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("standard_user", "");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Password is required",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("User who left both fields empty can’t log in", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("", "");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Username field is case-sensitive", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("Standard_User", "secret_sauce");

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Password field is case-sensitive", async ({ page, loginPage }) => {
    await loginPage.loginWithMouseClick("standard_user", "Secret_Sauce");
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Error window closes when clicking the X button", async ({ loginPage }) => {
    await loginPage.loginWithMouseClick("", "");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    );

    await loginPage.errorButton.click();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

  test("Form can be submitted by pressing Enter key", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.loginWithEnterKey("standard_user", "secret_sauce");

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(inventoryPage.productsHeader).toBeVisible();
  });
});
