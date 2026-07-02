import { test as base, expect } from "@playwright/test";
import { LoginPage } from "@/pages/loginPage";
import { ItemPage } from "@/pages/itemPage";
import users from "./users.json" with { type: "json" };

type Fixtures = {
  itemPage: ItemPage;
};

const test = base.extend<Fixtures>({
  itemPage: async ({ page }, use) => {
    const itemPage = new ItemPage(page);
    await use(itemPage);
  },
});

for (const username of users) {
  test.describe(`Item page details with ${username}`, () => {
    const productId = "4";

    test.beforeEach(async ({ page, itemPage }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.loginWithMouseClick(username, "secret_sauce");
      await itemPage.goto(productId);
    });

    test("“Back to products” button redirects to inventory page", async ({
      page,
      itemPage,
    }) => {
      await itemPage.backToProductsButton.click();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("“Add to cart” button turns into “Remove” on click", async ({
      itemPage,
    }) => {
      await itemPage.addToCartButton.click();
      await expect(itemPage.removeButton).toHaveText("Remove");
    });

    test("“Remove” button turns into “Add to cart” on click", async ({
      itemPage,
    }) => {
      await itemPage.addToCartButton.click();
      await expect(itemPage.removeButton).toHaveText("Remove");
      await itemPage.removeButton.click();
      await expect(itemPage.addToCartButton).toHaveText("Add to cart");
    });
  });
}
