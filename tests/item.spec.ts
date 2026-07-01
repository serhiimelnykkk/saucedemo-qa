import { test as base, expect } from "@playwright/test";
import { LoginPage } from "@/pages/loginPage";
import { ProductPage } from "@/pages/productPage";
import users from "./users.json" with { type: "json" };

type Fixtures = {
  productPage: ProductPage;
};

const test = base.extend<Fixtures>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

for (const username of users) {
  test.describe(`Item page details with ${username}`, () => {
    const productId = "4";

    test.beforeEach(async ({ page, productPage }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.loginWithMouseClick(username, "secret_sauce");
      await productPage.goto(productId);
    });

    test("“Back to products” button redirects to inventory page", async ({
      page,
      productPage,
    }) => {
      await productPage.backToProductsButton.click();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("“Add to cart” button turns into “Remove” on click", async ({
      productPage,
    }) => {
      await productPage.addToCartButton.click();
      await expect(productPage.removeButton).toHaveText("Remove");
    });

    test("“Remove” button turns into “Add to cart” on click", async ({
      productPage,
    }) => {
      await productPage.addToCartButton.click();
      await expect(productPage.removeButton).toHaveText("Remove");
      await productPage.removeButton.click();
      await expect(productPage.addToCartButton).toHaveText("Add to cart");
    });
  });
}
