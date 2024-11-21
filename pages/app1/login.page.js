const BasePage = require('./../../pages/base.page');

class LoginPage extends BasePage {
  get usernameInput() {
    return $('//input[@placeholder="username"]');
  }
  get passwordInput() {
    return $('//input[@placeholder="password"]');
  }
  get loginButton() {
    return $('//button[@type="submit"]');
  }

  async login(username, password) {
    await this.usernameInput.waitForDisplayed({ timeout: 5000 });
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async verifyDashboardURL(expectedURL) {
    await expect(browser).toHaveUrl(expectedURL);
  }
}

module.exports = new LoginPage();
