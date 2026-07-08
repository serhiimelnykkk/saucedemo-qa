# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Inventory with problem_user >> Z-A sorting by name works correctly
- Location: tests/inventory.spec.ts:80:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 5
+ Received  + 5

  Array [
-   "Test.allTheThings() T-Shirt (Red)",
-   "Sauce Labs Onesie",
-   "Sauce Labs Fleece Jacket",
-   "Sauce Labs Bolt T-Shirt",
-   "Sauce Labs Bike Light",
    "Sauce Labs Backpack",
+   "Sauce Labs Bike Light",
+   "Sauce Labs Bolt T-Shirt",
+   "Sauce Labs Fleece Jacket",
+   "Sauce Labs Onesie",
+   "Test.allTheThings() T-Shirt (Red)",
  ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link "Sauce Labs Backpack" [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  51  |         await expect(page).toHaveURL(
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
> 85  |       expect(names).toEqual(sortedNames);
      |                     ^ Error: expect(received).toEqual(expected) // deep equality
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