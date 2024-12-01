exports.config = {
  runner: "local",
  specs: ["./../features/**/*.feature"],
  exclude: [],
  maxInstances: 3,
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
            args: ["--shm-size=2g"], // Ensure args are properly set here
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
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
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
  // Hooks
  onPrepare: function (config, capabilities) {
    console.log("Running onPrepare hook...");
    // Prepare tasks before tests start (e.g., clean up reports, setup databases)
  },

  beforeTest: async function (test) {
    console.log(`Starting test: ${test.title}`);
  },

  afterTest: async function (test) {
    if (test.error) {
      console.log(`Test failed: ${test.title}`);
      await browser.takeScreenshot();
    }
    console.log(`Test finished: ${test.title}`);
  },

  beforeScenario: async function (scenario) {
    console.log(`Starting scenario: ${scenario.name}`);
  },

  afterScenario: async function (scenario) {
    console.log(`Finished scenario: ${scenario.name}`);
  },

  onComplete: async function () {
    console.log("onComplete hook is triggered!");
    const fs = require("fs");
    const path = require("path");
    const allureResultsPath = path.join(__dirname, "../allure-results");

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
    console.log("onComplete: Report generated.");

    // Send Slack notification
    const axios = require("axios");
    const url =
      "https://hooks.slack.com/services/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"; // Replace with your webhook URL
    const slackMessage = {
      text: "Test execution completed! Allure report is available.",
      attachments: [
        {
          title: "Allure Report",
          title_link:
            "http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html", // Allure report URL
          color: "#36a64f",
          fallback: "Click to view Allure report",
        },
      ],
    };

    try {
      await axios.post(url, slackMessage);
      console.log("Slack notification sent!");
    } catch (error) {
      console.error("Error sending Slack notification:", error);
    }
  },
  // Retry Mechanism
  maxRetries: 3,
  retry: 2,
};
