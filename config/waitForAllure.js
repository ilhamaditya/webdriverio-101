const axios = require('axios');

const url = 'http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html';
const maxRetries = 10;
const retryInterval = 5000;

async function checkReportAvailability() {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log('Report is ready!');
      return true;
    }
  } catch (error) {
    console.log('Report not yet available, retrying...');
  }
  return false;
}

async function waitForReport() {
  let retries = 0;

  while (retries < maxRetries) {
    const isAvailable = await checkReportAvailability();
    if (isAvailable) {
      return;
    }
    retries++;
    console.log(`Retrying... Attempt ${retries}/${maxRetries}`);
    await new Promise(resolve => setTimeout(resolve, retryInterval));
  }

  console.log('Max retries reached. Report is still not available.');
}

waitForReport();