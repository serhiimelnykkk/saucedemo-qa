import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorButton = page.getByTestId("error-button");
    this.errorMessage = page.getByTestId("error");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  private async fillForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async loginWithMouseClick(username: string, password: string) {
    await this.fillForm(username, password);
    await this.loginButton.click();
  }

  async loginWithEnterKey(username: string, password: string) {
    await this.fillForm(username, password);
    await this.passwordInput.press("Enter");
  }
}
