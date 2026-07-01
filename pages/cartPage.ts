import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;
  readonly itemNames: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
    this.removeButtons = page.getByRole("button", { name: "Remove" });
    this.itemNames = page.locator(".cart_item_label .inventory_item_name");
    this.items = page.locator(".cart_item");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async getItemNames(): Promise<string[]> {
    return (await this.itemNames.allTextContents()).map((name) => name.trim());
  }
}
