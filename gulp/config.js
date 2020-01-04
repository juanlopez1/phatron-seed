const dotenv = require('dotenv');

const configJson = require('./config.json');

const config = cb => {
  dotenv.config({ path: configJson.config.path });
  cb();
};

config.displayName = configJson.config.displayName;

module.exports = config;
