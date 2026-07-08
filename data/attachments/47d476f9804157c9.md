# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory with problem_user >> Clicking on a product Sauce Labs Bike Light image redirects a user to the item page
- Location: tests/inventory.spec.ts:44:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://www.saucedemo.com/inventory-item.html?id=0"
Received: "https://www.saucedemo.com/inventory-item.html?id=1"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "https://www.saucedemo.com/inventory-item.html?id=1"

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: Swag Labs
- button "Go back Back to products":
  - img "Go back"
  - text: Back to products
- img "Sauce Labs Bolt T-Shirt"
- text: Sauce Labs Bolt T-Shirt Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
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
  1   | import { test as base, expect } from "@playwright/test";
  2   | import { InventoryPage } from "@/pages/inventoryPage";
  3   | import { LoginPage } from "@/pages/loginPage";
  4   | import users from "./users.json" with { type: "json" };
  5   | 
  6   | type Fixtures = {
  7   |   inventoryPage: InventoryPage;
  8   | };
  9   | 
  10  | const test = base.extend<Fixtures>({
  11  |   inventoryPage: async ({ page }, use) => {
  12  |     const inventoryPage = new InventoryPage(page);
  13  |     await use(inventoryPage);
  14  |   },
  15  | });
  16  | 
  17  | for (const username of users) {
  18  |   test.describe(`Inventory with ${username}`, () => {
  19  |     test.beforeEach(async ({ page }) => {
  20  |       const loginPage = new LoginPage(page);
  21  |       await loginPage.goto();
  22  |       await loginPage.loginWithMouseClick(username, "secret_sauce");
  23  |     });
  24  | 
  25  |     const products = [
  26  |       { name: "Sauce Labs Backpack", price: "$29.99", id: "4" },
  27  |       { name: "Sauce Labs Bike Light", price: "$9.99", id: "0" },
  28  |       { name: "Sauce Labs Bolt T-Shirt", price: "$15.99", id: "1" },
  29  |     ];
  30  | 
  31  |     for (const product of products) {
  32  |       test(`Clicking on product "${product.name}" redirects a user to the item page`, async ({
  33  |         page,
  34  |         inventoryPage,
  35  |       }) => {
  36  |         const productLocator = await inventoryPage.getProductById(product.id);
  37  |         await productLocator.click();
  38  | 
  39  |         await expect(page).toHaveURL(
  40  |           `https://www.saucedemo.com/inventory-item.html?id=${product.id}`,
  41  |         );
  42  |       });
  43  | 
  44  |       test(`Clicking on a product ${product.name} image redirects a user to the item page`, async ({
  45  |         page,
  46  |         inventoryPage,
  47  |       }) => {
  48  |         const image = await inventoryPage.getProductImageById(product.id);
  49  |         await image.click();
  50  | 
> 51  |         await expect(page).toHaveURL(
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  52  |           `https://www.saucedemo.com/inventory-item.html?id=${product.id}`,
  53  |         );
  54  |       });
  55  |     }
  56  | 
  57  |     test("“Add to cart” button turns into “Remove” on click", async ({
  58  |       inventoryPage,
  59  |     }) => {
  60  |       const button = inventoryPage.addToCartButtons.first();
  61  |       await button.click();
  62  | 
  63  |       const removeButton = inventoryPage.removeButtons.first();
  64  |       await expect(removeButton).toHaveText("Remove");
  65  |     });
  66  | 
  67  |     test("A-Z sorting by name works correctly", async ({ inventoryPage }) => {
  68  |       // Sorting is A-Z by default. To prove A-Z sorting works, we first sort to Z-A
  69  |       // and assert that the product order actually changes to Z-A.
  70  |       await inventoryPage.sortProductsBy("za");
  71  |       const namesZA = await inventoryPage.getProductNames();
  72  |       expect(namesZA).toEqual([...namesZA].sort().reverse());
  73  | 
  74  |       // Now we sort back to A-Z and assert that it is successfully sorted A-Z.
  75  |       await inventoryPage.sortProductsBy("az");
  76  |       const namesAZ = await inventoryPage.getProductNames();
  77  |       expect(namesAZ).toEqual([...namesAZ].sort());
  78  |     });
  79  | 
  80  |     test("Z-A sorting by name works correctly", async ({ inventoryPage }) => {
  81  |       await inventoryPage.sortProductsBy("za");
  82  | 
  83  |       const names = await inventoryPage.getProductNames();
  84  |       const sortedNames = [...names].sort().reverse();
  85  |       expect(names).toEqual(sortedNames);
  86  |     });
  87  | 
  88  |     test("Low-to-High sorting by price works correctly", async ({
  89  |       inventoryPage,
  90  |     }) => {
  91  |       await inventoryPage.sortProductsBy("lohi");
  92  | 
  93  |       const prices = await inventoryPage.getProductPrices();
  94  |       const sortedPrices = [...prices].sort((a, b) => a - b);
  95  |       expect(prices).toEqual(sortedPrices);
  96  |     });
  97  | 
  98  |     test("High-to-Low sorting by price works correctly", async ({
  99  |       inventoryPage,
  100 |     }) => {
  101 |       await inventoryPage.sortProductsBy("hilo");
  102 | 
  103 |       const prices = await inventoryPage.getProductPrices();
  104 |       const sortedPrices = [...prices].sort((a, b) => b - a);
  105 |       expect(prices).toEqual(sortedPrices);
  106 |     });
  107 |   });
  108 | }
  109 | 
```