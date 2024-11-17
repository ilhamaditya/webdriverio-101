require('dotenv').config();

module.exports = {
  WEB_URL: process.env.WEB_URL || 'http://localhost',
  WEB_USERNAME: process.env.WEB_USERNAME || 'admin',
  WEB_PASSWORD: process.env.WEB_PASSWORD || 'password',
};
