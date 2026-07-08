import { test as base, expect } from "@playwright/test";
import { InventoryPage } from "@/pages/inventoryPage";
import { LoginPage } from "@/pages/loginPage";
import users from "./users.json" with { type: "json" };

type Fixtures = {
  inventoryPage: InventoryPage;
};

const test = base.extend<Fixtures>({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  }
});


for (const username of users) {
  test.describe(`Cart with ${username}`, () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.loginWithMouseClick(username, "secret_sauce");
    });

    test("Cart counter appears after adding a product", async ({
      inventoryPage,
    }) => {
      const button = inventoryPage.addToCartButtons.first();
      await button.click();

      const cartCounter = await inventoryPage.getCartCounter();

      await expect(cartCounter).toHaveText("1");
    });

    test("Cart counter disappears when all items are removed", async ({
      inventoryPage,
    }) => {
      const addButton = inventoryPage.addToCartButtons.first();
      await addButton.click();

      const removeButton = inventoryPage.removeButtons.first();
      await removeButton.click();

      const cartCounter = await inventoryPage.getCartCounter();
      await expect(cartCounter).not.toBeVisible();
    });

    test("Cart counter increases after adding a product", async ({
      inventoryPage,
    }) => {
      const backpackButton = inventoryPage.addToCartButtons.nth(0);
      const bikeLightButton = inventoryPage.addToCartButtons.nth(1);

      await backpackButton.click();
      const cartCounter = await inventoryPage.getCartCounter();
      await expect(cartCounter).toHaveText("1");

      await bikeLightButton.click();
      await expect(cartCounter).toHaveText("2");
    });

    test("Cart counter decreases after removing a product", async ({
      inventoryPage,
    }) => {
      const addButton = inventoryPage.addToCartButtons.nth(0);
      await addButton.click();
      const addButton2 = inventoryPage.addToCartButtons.nth(1);
      await addButton2.click();

      const cartCounter = await inventoryPage.getCartCounter();
      await expect(cartCounter).toHaveText("2");

      const removeButton = inventoryPage.removeButtons.first();
      await removeButton.click();

      await expect(cartCounter).toHaveText("1");
    });
  });
}
