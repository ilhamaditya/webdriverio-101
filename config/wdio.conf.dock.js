exports.config = {
  runner: "local",
  specs: ["./../features/**/*.feature"],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "selenoid:options": {
        enableVnc: true,
        enableVideo: true,
        screenResolution: "1920x1080x24",
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      "docker",
      {
        containers: [
          {
            image: "selenoid/vnc:chrome_114.0",
            args: ["--shm-size=2g"], // Ensure args are defined
          },
        ],
        options: {
          healthCheck: {
            url: "http://localhost:4444/status",
            maxRetries: 3,
            inspectInterval: 1000,
          },
          protocol: "http",
          hostname: "localhost",
          port: 4444,
          path: "/wd/hub",
        },
      },
    ],
  ],
  framework: "cucumber",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results", // Make sure this points to the correct directory
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false, // Optional: You can also include screenshots
      },
    ],
  ],
  cucumberOpts: {
    require: ["./step-definitions/**/*.steps.js"],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
  onComplete: function () {
    const fs = require("fs");
    const path = require("path");
    const allureResultsPath = path.join(__dirname, "../allure-results");

    // Buat folder allure-results jika belum ada
    if (!fs.existsSync(allureResultsPath)) {
      fs.mkdirSync(allureResultsPath);
    }

    const executor = {
      name: "WebdriverIO Docker",
      type: "webdriverio",
      url: process.env.WEB_URL || "http://localhost:4444",
      buildOrder: "1",
      reportName: "WebdriverIO Allure Report",
    };

    fs.writeFileSync(
      path.join(allureResultsPath, "executor.json"),
      JSON.stringify(executor, null, 2)
    );
  },
};
