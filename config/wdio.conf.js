const fs = require("fs");
const path = require("path");

exports.config = {
  runner: "local",
  specs: ["./../features/**/*.feature"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
    },
  ],
  logLevel: "debug",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [],
  framework: "cucumber",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
  cucumberOpts: {
    require: ["./step-definitions/**/**/*.steps.js"],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  // Screenshot capture on test failure
  afterScenario: async function (world, result) {
    if (result.error) {
      const screenshotPath = path.join(
        __dirname,
        "./../screenshots",
        `${world.pickle.name.replace(/\s/g, "_")}.png`
      );
      // Ensure screenshots directory exists
      if (!fs.existsSync(path.dirname(screenshotPath))) {
        fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
      }

      // Capture screenshot on failure
      await browser.saveScreenshot(screenshotPath);
      console.log(`Screenshot saved to ${screenshotPath}`);
    }
  },

  beforeScenario: function (world, context) {
    console.log(`Running scenario: ${world.name}`);
  },
};
