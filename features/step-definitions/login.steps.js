const { When, Then } = require("@cucumber/cucumber");
const LoginPage = require("../pageobjects/login.page");

When("I Visit the OrangeHRM login page", async function () {
  await LoginPage.open();
});

When("I enter username and password", async function () {
  await LoginPage.login(process.env.WEB_USERNAME, process.env.WEB_PASSWORD);
});

Then("I verify dashboard URL", async function () {
});
