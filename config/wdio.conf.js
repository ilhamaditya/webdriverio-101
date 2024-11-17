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
  beforeScenario: function (world, context) {
    console.log(`Running scenario: ${world.name}`);
  },
};
