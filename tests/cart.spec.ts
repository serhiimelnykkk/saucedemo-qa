import { test as base, expect } from "@playwright/test";
import { CartPage } from "@/pages/cartPage";
import { InventoryPage } from "@/pages/inventoryPage";
import { LoginPage } from "@/pages/loginPage";
import { ItemPage } from "@/pages/itemPage";
import users from "./users.json" with { type: "json" };

type Fixtures = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  itemPage: ItemPage;
};

const test = base.extend<Fixtures>({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  itemPage: async ({ page }, use) => {
    const itemPage = new ItemPage(page);
    await use(itemPage);
  },
});


for (const username of users) {
  test.describe(`Cart with ${username}`, () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.loginWithMouseClick(username, "secret_sauce");
    });

    test("Item added on shopping list appears in cart", async ({
      inventoryPage,
      cartPage,
    }) => {
      const expectedName = await inventoryPage.inventoryItems.first().locator("[data-test*='-title-link']").textContent();
      await inventoryPage.addToCartButtons.first().click();
      await cartPage.goto();

      const firstItem = cartPage.items.first();
      await expect(firstItem).toBeVisible();

      const actualName = await cartPage.itemNames.first().textContent();
      expect(actualName?.trim()).toBe(expectedName?.trim());
    });

    test("Item removed from shopping list disappears from cart", async ({
      inventoryPage,
      cartPage,
    }) => {
      const expectedName = await inventoryPage.inventoryItems.first().locator("[data-test*='-title-link']").textContent();
      await inventoryPage.addToCartButtons.first().click();
      await cartPage.goto();

      const cartItems = cartPage.items;
      await expect(cartItems).toBeVisible();

      const actualName = await cartPage.itemNames.first().textContent();
      expect(actualName?.trim()).toBe(expectedName?.trim());

      await cartPage.removeFirstItem();

      await expect(cartItems).not.toBeVisible();
    });

    test("Item removed from cart disappears from cart", async ({
      inventoryPage,
      cartPage,
    }) => {
      const expectedName = await inventoryPage.inventoryItems.first().locator("[data-test*='-title-link']").textContent();
      await inventoryPage.addToCartButtons.first().click();
      await cartPage.goto();

      const cartItems = cartPage.items;
      await expect(cartItems).toBeVisible();

      const actualName = await cartPage.itemNames.first().textContent();
      expect(actualName?.trim()).toBe(expectedName?.trim());

      await cartPage.removeFirstItem();

      await expect(cartItems).not.toBeVisible();
    });

    test("Continue shopping redirects to shopping list", async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addToCartButtons.first().click();
      await cartPage.goto();
      await cartPage.continueShopping();

      await expect(cartPage.page).toHaveURL(/inventory\.html/);
    });

    test("Checkout redirects to checkout step one", async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addToCartButtons.first().click();
      await cartPage.goto();
      await cartPage.checkout();

      await expect(cartPage.page).toHaveURL(/checkout-step-one\.html/);
    });

    test("Product name redirects to product page", async ({
      inventoryPage,
      cartPage,
    }) => {
      await inventoryPage.addToCartButtons.first().click();
      await cartPage.goto();
      await cartPage.itemNames.first().click();

      await expect(cartPage.page).toHaveURL(/inventory-item\.html\?id=4/);
    });

    test("Item added from a product page appears in cart", async ({
      cartPage,
      itemPage,
    }) => {
      await itemPage.goto("0");
      const expectedName = await itemPage.itemName.textContent();
      await itemPage.addToCartButton.click();
      await cartPage.goto();

      const firstItem = cartPage.items.first();
      await expect(firstItem).toBeVisible();

      const actualName = await cartPage.itemNames.first().textContent();
      expect(actualName?.trim()).toBe(expectedName?.trim());
    });

    test("Item removed from a product page disappears from cart", async ({
      itemPage,
      cartPage,
    }) => {
      await itemPage.goto("0");
      const expectedName = await itemPage.itemName.textContent();
      await itemPage.addToCartButton.click();

      await cartPage.goto();
      await expect(cartPage.items).toBeVisible();

      const actualName = await cartPage.itemNames.first().textContent();
      expect(actualName?.trim()).toBe(expectedName?.trim());

      await cartPage.removeFirstItem();

      const cartItems = cartPage.items;

      await expect(cartItems).not.toBeVisible();
    });
  });
}
