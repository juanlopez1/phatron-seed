const dotenv = require('dotenv');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const winston = require('winston');

dotenv.config();

const config = require('./webpack.config.dev');

const {DEV_SERVER_PORT} = process.env;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

new WebpackDevServer(webpack(config), config.devServer).listen(
  DEV_SERVER_PORT,
  '127.0.0.1',
  () => logger.info(`DevServer started at port ${DEV_SERVER_PORT}`)
);
