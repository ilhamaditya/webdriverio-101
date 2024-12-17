require("dotenv").config();

exports.config = {
  runner: "local",
  specs: ["./../features/**/*.feature"],
  maxInstances: 3,
  capabilities: [
    {
      browserName: "chrome",
      "selenoid:options": {
        enableVnc: true,
        screenResolution: "1920x1080x24",
      },
    },
  ],
  logLevel: "info",
  connectionRetryCount: 3,
  services: [["docker"]],
  framework: "cucumber",
  reporters: [["allure", { outputDir: "allure-results" }]],

  cucumberOpts: {
    require: ["./step-definitions/**/*.steps.js"],
    timeout: 60000,
  },
  onPrepare: function () {
    console.log("Preparing test environment...");
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },

  onComplete: async function (exitCode) {
    const axios = require("axios");
    const slackWebhook = process.env.SLACK_WEBHOOK;
    const status = exitCode === 0 ? "Success" : "Failure";
    const reportUrl =
      "http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html";

    const slackMessage = {
      text: `*Test Status*: ${status}`,
      attachments: [{ title: "Allure Report", title_link: reportUrl }],
    };

    await axios.post(slackWebhook, slackMessage).catch(console.error);
  },
  // Retry Mechanism
  maxRetries: 3,
  retry: 2,
};
