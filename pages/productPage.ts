import { type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.backToProductsButton = page.getByTestId("back-to-products");
    this.productName = page.getByTestId("inventory-item-name");
  }

  async goto(productId: string) {
    await this.page.goto(
      `https://www.saucedemo.com/inventory-item.html?id=${productId}`,
    );
  }
}
