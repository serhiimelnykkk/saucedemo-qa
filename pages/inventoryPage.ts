import { type Page, type Locator } from "@playwright/test";

type SortingOptions = "az" | "za" | "lohi" | "hilo";

export class InventoryPage {
  readonly page: Page;
  readonly sortingSelector: Locator;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly productsHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortingSelector = page.getByTestId("product-sort-container");
    this.inventoryItems = page.getByTestId("inventory-item");
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this.removeButtons = page.locator('[data-test^="remove-"]');
    this.productsHeader = page.getByText("Products");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async sortProductsBy(option: SortingOptions) {
    await this.sortingSelector.selectOption(option);
  }

  async getProductByName(name: string): Promise<Locator> {
    const product = await this.page.getByText(name);
    return product;
  }

  async getProductById(id: string): Promise<Locator> {
    const product = await this.page.getByTestId(`item-${id}-title-link`);
    return product;
  }

  async getProductImageById(id: string): Promise<Locator> {
    const image = await this.page.getByTestId(`item-${id}-img-link`);
    return image;
  }

  async getCartCounter(): Promise<Locator> {
    const counter = await this.page.getByTestId("shopping-cart-badge");
    return counter;
  }

  async getProductNames(): Promise<(string | null)[]> {
    const items = await this.inventoryItems.all();
    return Promise.all(
      items.map((item) =>
        item.locator("[data-test*='-title-link']").textContent(),
      ),
    );
  }

  async getProductPrices(): Promise<number[]> {
    const items = await this.inventoryItems.all();
    return Promise.all(
      items.map((item) =>
        item
          .locator(".inventory_item_price")
          .textContent()
          .then((text) => parseFloat(text?.replace("$", "") || "0")),
      ),
    );
  }
}
