require("dotenv").config();

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
        webdriverLogs: "/tmp/selenium.log",
      },
      "goog:chromeOptions": {
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--remote-debugging-port=9222",
        ],
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
        image: "selenium/standalone-chrome", // Image name
        options: {
          hostname: "localhost",
          port: 4444,
          version: "latest",
        },
        debug: true,
        logging: true,
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

  onComplete: async function (exitCode) {
    console.log("onComplete hook is triggered!");

    const fs = require("fs");
    const path = require("path");
    const axios = require("axios");
    const allureResultsPath = path.join(__dirname, "../allure-results");

    // Ensure the directory exists
    if (!fs.existsSync(allureResultsPath)) {
      fs.mkdirSync(allureResultsPath);
    }

    // Executor data (in executor.json)
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
    console.log("onComplete: Allure executor.json created.");

    // Test results data (in test-results.json)
    const testResults = {
      totalTests: 0, // Replace with dynamic data from your actual results
      failedTests: 0, // Replace with dynamic data from your actual results
      errorTests: 0, // Replace with dynamic data from your actual results
      totalDuration: "0:00:00", // Replace with dynamic data from your actual results
    };

    fs.writeFileSync(
      path.join(allureResultsPath, "test-results.json"),
      JSON.stringify(testResults, null, 2)
    );
    console.log("onComplete: Test results JSON created.");

    // Send Slack Notification
    const slackWebhook = process.env.SLACK_WEBHOOK;
    const reportUrl =
      "http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html";
    const statusMessage = exitCode === 0 ? "Success" : "Failure";

    const slackMessage = {
      text: `*Summary Result Test* :white_check_mark:\n\n*Total Tests:* ${testResults.totalTests}\n*Failed Tests:* ${testResults.failedTests}\n*Error Tests:* ${testResults.errorTests}\n*Total Duration:* ${testResults.totalDuration}\n\n*Allure Report*\n[Click to view the Allure report](${reportUrl})`,
      attachments: [
        {
          title: "Allure Report",
          title_link: reportUrl,
          text: `Click to view the Allure report`,
          color: statusMessage === "Success" ? "#36a64f" : "#ff0000",
          fallback: "Click to view the Allure report",
        },
      ],
    };

    try {
      await axios.post(slackWebhook, slackMessage);
      console.log("Slack notification sent successfully.");
    } catch (error) {
      console.error("Error sending Slack notification:", error.message);
    }
  },
  // Retry Mechanism
  maxRetries: 3,
  retry: 2,
};
