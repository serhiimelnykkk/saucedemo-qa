import { test, expect } from "@playwright/test";

test.describe("Access control", () => {
  const protectedPages = [
    "/inventory.html",
    "/cart.html",
  ];

  for (const pagePath of protectedPages) {
    test(`Unauthorized user cannot access ${pagePath}`, async ({ page }) => {
      await page.goto(`https://www.saucedemo.com${pagePath}`);
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
  }
});
