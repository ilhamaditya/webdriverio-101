class LoginPage {
  get usernameInput() {
    return $('//input[@placeholder="Username"]');
  }
  get passwordInput() {
    return $('//input[@placeholder="Password"]');
  }
  get loginButton() {
    return $('//button[@type="submit"]');
  }

  async open() {
    await browser.url(process.env.WEB_URL);
  }

  async login(username, password) {
    await this.usernameInput.waitForDisplayed({ timeout: 5000 });
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async verifyDashboardURL() {
    await expect(browser).toHaveUrl('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  }
}

module.exports = new LoginPage();
