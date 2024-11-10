exports.config = {
  runner: "local",
  specs: ["./features/**/*.feature"], // Updated path
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [], // Removed docker service
  framework: "cucumber",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
  cucumberOpts: {
    featureDefaultLocation: "./features/**/*.feature", // Ensure correct path
    require: ["./features/step-definitions/*.steps.js"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
