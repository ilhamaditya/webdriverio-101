const { When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/app1/login.page');
const env = require('../../helpers/environment');
const logger = require('../../helpers/logger');

When('I Visit the OrangeHRM login page', async function () {
  logger('Opening the OrangeHRM login page');
  await LoginPage.open(env.WEB_URL);
});

When('I enter username and password', async function () {
  logger('Logging in with provided credentials');
  await LoginPage.login(env.WEB_USERNAME, env.WEB_PASSWORD);
});

Then('I verify dashboard URL', async function () {
  logger('Verifying the dashboard URL');
  await LoginPage.verifyDashboardURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});
