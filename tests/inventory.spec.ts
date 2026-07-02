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
  },
});

for (const username of users) {
  test.describe(`Inventory with ${username}`, () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.loginWithMouseClick(username, "secret_sauce");
    });

    const products = [
      { name: "Sauce Labs Backpack", price: "$29.99", id: "4" },
      { name: "Sauce Labs Bike Light", price: "$9.99", id: "0" },
      { name: "Sauce Labs Bolt T-Shirt", price: "$15.99", id: "1" },
    ];

    for (const product of products) {
      test(`Clicking on product "${product.name}" redirects a user to the item page`, async ({
        page,
        inventoryPage,
      }) => {
        const productLocator = await inventoryPage.getProductById(product.id);
        await productLocator.click();

        await expect(page).toHaveURL(
          `https://www.saucedemo.com/inventory-item.html?id=${product.id}`,
        );
      });

      test(`Clicking on a product ${product.name} image redirects a user to the item page`, async ({
        page,
        inventoryPage,
      }) => {
        const image = await inventoryPage.getProductImageById(product.id);
        await image.click();

        await expect(page).toHaveURL(
          `https://www.saucedemo.com/inventory-item.html?id=${product.id}`,
        );
      });
    }

    test("“Add to cart” button turns into “Remove” on click", async ({
      inventoryPage,
    }) => {
      const button = inventoryPage.addToCartButtons.first();
      await button.click();

      const removeButton = inventoryPage.removeButtons.first();
      await expect(removeButton).toHaveText("Remove");
    });

    test("A-Z sorting by name works correctly", async ({ inventoryPage }) => {
      // Sorting is A-Z by default. To prove A-Z sorting works, we first sort to Z-A
      // and assert that the product order actually changes to Z-A.
      await inventoryPage.sortProductsBy("za");
      const namesZA = await inventoryPage.getProductNames();
      expect(namesZA).toEqual([...namesZA].sort().reverse());

      // Now we sort back to A-Z and assert that it is successfully sorted A-Z.
      await inventoryPage.sortProductsBy("az");
      const namesAZ = await inventoryPage.getProductNames();
      expect(namesAZ).toEqual([...namesAZ].sort());
    });

    test("Z-A sorting by name works correctly", async ({ inventoryPage }) => {
      await inventoryPage.sortProductsBy("za");

      const names = await inventoryPage.getProductNames();
      const sortedNames = [...names].sort().reverse();
      expect(names).toEqual(sortedNames);
    });

    test("Low-to-High sorting by price works correctly", async ({
      inventoryPage,
    }) => {
      await inventoryPage.sortProductsBy("lohi");

      const prices = await inventoryPage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });

    test("High-to-Low sorting by price works correctly", async ({
      inventoryPage,
    }) => {
      await inventoryPage.sortProductsBy("hilo");

      const prices = await inventoryPage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    });
  });
}
