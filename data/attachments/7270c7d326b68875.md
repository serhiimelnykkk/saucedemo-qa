# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: header.spec.ts >> Cart with problem_user >> Cart counter increases after adding a product
- Location: tests/header.spec.ts:50:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('shopping-cart-badge')
Expected: "2"
Received: "1"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('shopping-cart-badge')
    14 × locator resolved to <span class="shopping_cart_badge" data-test="shopping-cart-badge">1</span>
       - unexpected value "1"

```

```yaml
- text: "1"
```

# Test source

```ts
  1  | import { test as base, expect } from "@playwright/test";
  2  | import { InventoryPage } from "@/pages/inventoryPage";
  3  | import { LoginPage } from "@/pages/loginPage";
  4  | import users from "./users.json" with { type: "json" };
  5  | 
  6  | type Fixtures = {
  7  |   inventoryPage: InventoryPage;
  8  | };
  9  | 
  10 | const test = base.extend<Fixtures>({
  11 |   inventoryPage: async ({ page }, use) => {
  12 |     const inventoryPage = new InventoryPage(page);
  13 |     await use(inventoryPage);
  14 |   }
  15 | });
  16 | 
  17 | 
  18 | for (const username of users) {
  19 |   test.describe(`Cart with ${username}`, () => {
  20 |     test.beforeEach(async ({ page }) => {
  21 |       const loginPage = new LoginPage(page);
  22 |       await loginPage.goto();
  23 |       await loginPage.loginWithMouseClick(username, "secret_sauce");
  24 |     });
  25 | 
  26 |     test("Cart counter appears after adding a product", async ({
  27 |       inventoryPage,
  28 |     }) => {
  29 |       const button = inventoryPage.addToCartButtons.first();
  30 |       await button.click();
  31 | 
  32 |       const cartCounter = await inventoryPage.getCartCounter();
  33 | 
  34 |       await expect(cartCounter).toHaveText("1");
  35 |     });
  36 | 
  37 |     test("Cart counter disappears when all items are removed", async ({
  38 |       inventoryPage,
  39 |     }) => {
  40 |       const addButton = inventoryPage.addToCartButtons.first();
  41 |       await addButton.click();
  42 | 
  43 |       const removeButton = inventoryPage.removeButtons.first();
  44 |       await removeButton.click();
  45 | 
  46 |       const cartCounter = await inventoryPage.getCartCounter();
  47 |       await expect(cartCounter).not.toBeVisible();
  48 |     });
  49 | 
  50 |     test("Cart counter increases after adding a product", async ({
  51 |       inventoryPage,
  52 |     }) => {
  53 |       const backpackButton = inventoryPage.addToCartButtons.nth(0);
  54 |       const bikeLightButton = inventoryPage.addToCartButtons.nth(1);
  55 | 
  56 |       await backpackButton.click();
  57 |       const cartCounter = await inventoryPage.getCartCounter();
  58 |       await expect(cartCounter).toHaveText("1");
  59 | 
  60 |       await bikeLightButton.click();
> 61 |       await expect(cartCounter).toHaveText("2");
     |                                 ^ Error: expect(locator).toHaveText(expected) failed
  62 |     });
  63 | 
  64 |     test("Cart counter decreases after removing a product", async ({
  65 |       inventoryPage,
  66 |     }) => {
  67 |       const addButton = inventoryPage.addToCartButtons.nth(0);
  68 |       await addButton.click();
  69 |       const addButton2 = inventoryPage.addToCartButtons.nth(1);
  70 |       await addButton2.click();
  71 | 
  72 |       const cartCounter = await inventoryPage.getCartCounter();
  73 |       await expect(cartCounter).toHaveText("2");
  74 | 
  75 |       const removeButton = inventoryPage.removeButtons.first();
  76 |       await removeButton.click();
  77 | 
  78 |       await expect(cartCounter).toHaveText("1");
  79 |     });
  80 |   });
  81 | }
  82 | 
```