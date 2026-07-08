# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> Cart with problem_user >> Product name redirects to product page
- Location: tests/cart.spec.ts:113:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /inventory-item\.html\?id=4/
Received string:  "https://www.saucedemo.com/inventory-item.html?id=5"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "https://www.saucedemo.com/inventory-item.html?id=5"

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: Swag Labs 1
- button "Go back Back to products":
  - img "Go back"
  - text: Back to products
- img "Sauce Labs Fleece Jacket"
- text: Sauce Labs Fleece Jacket It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
- button "Add to cart"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  21  |     await use(cartPage);
  22  |   },
  23  |   itemPage: async ({ page }, use) => {
  24  |     const itemPage = new ItemPage(page);
  25  |     await use(itemPage);
  26  |   },
  27  | });
  28  | 
  29  | 
  30  | for (const username of users) {
  31  |   test.describe(`Cart with ${username}`, () => {
  32  |     test.beforeEach(async ({ page }) => {
  33  |       const loginPage = new LoginPage(page);
  34  |       await loginPage.goto();
  35  |       await loginPage.loginWithMouseClick(username, "secret_sauce");
  36  |     });
  37  | 
  38  |     test("Item added on shopping list appears in cart", async ({
  39  |       inventoryPage,
  40  |       cartPage,
  41  |     }) => {
  42  |       const expectedName = await inventoryPage.inventoryItems.first().locator("[data-test*='-title-link']").textContent();
  43  |       await inventoryPage.addToCartButtons.first().click();
  44  |       await cartPage.goto();
  45  | 
  46  |       const firstItem = cartPage.items.first();
  47  |       await expect(firstItem).toBeVisible();
  48  | 
  49  |       const actualName = await cartPage.itemNames.first().textContent();
  50  |       expect(actualName?.trim()).toBe(expectedName?.trim());
  51  |     });
  52  | 
  53  |     test("Item removed from shopping list disappears from cart", async ({
  54  |       inventoryPage,
  55  |       cartPage,
  56  |     }) => {
  57  |       const expectedName = await inventoryPage.inventoryItems.first().locator("[data-test*='-title-link']").textContent();
  58  |       await inventoryPage.addToCartButtons.first().click();
  59  |       await cartPage.goto();
  60  | 
  61  |       const cartItems = cartPage.items;
  62  |       await expect(cartItems).toBeVisible();
  63  | 
  64  |       const actualName = await cartPage.itemNames.first().textContent();
  65  |       expect(actualName?.trim()).toBe(expectedName?.trim());
  66  | 
  67  |       await cartPage.removeFirstItem();
  68  | 
  69  |       await expect(cartItems).not.toBeVisible();
  70  |     });
  71  | 
  72  |     test("Item removed from cart disappears from cart", async ({
  73  |       inventoryPage,
  74  |       cartPage,
  75  |     }) => {
  76  |       const expectedName = await inventoryPage.inventoryItems.first().locator("[data-test*='-title-link']").textContent();
  77  |       await inventoryPage.addToCartButtons.first().click();
  78  |       await cartPage.goto();
  79  | 
  80  |       const cartItems = cartPage.items;
  81  |       await expect(cartItems).toBeVisible();
  82  | 
  83  |       const actualName = await cartPage.itemNames.first().textContent();
  84  |       expect(actualName?.trim()).toBe(expectedName?.trim());
  85  | 
  86  |       await cartPage.removeFirstItem();
  87  | 
  88  |       await expect(cartItems).not.toBeVisible();
  89  |     });
  90  | 
  91  |     test("Continue shopping redirects to shopping list", async ({
  92  |       inventoryPage,
  93  |       cartPage,
  94  |     }) => {
  95  |       await inventoryPage.addToCartButtons.first().click();
  96  |       await cartPage.goto();
  97  |       await cartPage.continueShopping();
  98  | 
  99  |       await expect(cartPage.page).toHaveURL(/inventory\.html/);
  100 |     });
  101 | 
  102 |     test("Checkout redirects to checkout step one", async ({
  103 |       inventoryPage,
  104 |       cartPage,
  105 |     }) => {
  106 |       await inventoryPage.addToCartButtons.first().click();
  107 |       await cartPage.goto();
  108 |       await cartPage.checkout();
  109 | 
  110 |       await expect(cartPage.page).toHaveURL(/checkout-step-one\.html/);
  111 |     });
  112 | 
  113 |     test("Product name redirects to product page", async ({
  114 |       inventoryPage,
  115 |       cartPage,
  116 |     }) => {
  117 |       await inventoryPage.addToCartButtons.first().click();
  118 |       await cartPage.goto();
  119 |       await cartPage.itemNames.first().click();
  120 | 
> 121 |       await expect(cartPage.page).toHaveURL(/inventory-item\.html\?id=4/);
      |                                   ^ Error: expect(page).toHaveURL(expected) failed
  122 |     });
  123 | 
  124 |     test("Item added from a product page appears in cart", async ({
  125 |       cartPage,
  126 |       itemPage,
  127 |     }) => {
  128 |       await itemPage.goto("0");
  129 |       const expectedName = await itemPage.itemName.textContent();
  130 |       await itemPage.addToCartButton.click();
  131 |       await cartPage.goto();
  132 | 
  133 |       const firstItem = cartPage.items.first();
  134 |       await expect(firstItem).toBeVisible();
  135 | 
  136 |       const actualName = await cartPage.itemNames.first().textContent();
  137 |       expect(actualName?.trim()).toBe(expectedName?.trim());
  138 |     });
  139 | 
  140 |     test("Item removed from a product page disappears from cart", async ({
  141 |       itemPage,
  142 |       cartPage,
  143 |     }) => {
  144 |       await itemPage.goto("0");
  145 |       const expectedName = await itemPage.itemName.textContent();
  146 |       await itemPage.addToCartButton.click();
  147 | 
  148 |       await cartPage.goto();
  149 |       await expect(cartPage.items).toBeVisible();
  150 | 
  151 |       const actualName = await cartPage.itemNames.first().textContent();
  152 |       expect(actualName?.trim()).toBe(expectedName?.trim());
  153 | 
  154 |       await cartPage.removeFirstItem();
  155 | 
  156 |       const cartItems = cartPage.items;
  157 | 
  158 |       await expect(cartItems).not.toBeVisible();
  159 |     });
  160 |   });
  161 | }
  162 | 
```