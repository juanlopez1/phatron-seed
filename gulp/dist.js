/* eslint-disable no-param-reassign */
const { dest, src, series } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const config = require('./config.json');
const webpackConfig = require('../webpack.config.prod.js');

const plugins = gulpLoadPlugins();

const copy = () => src(
  config.copy.dist.src.path, { base: config.copy.dist.src.base }
).pipe(
  dest(config.copy.dist.dest)
);

copy.displayName = config.copy.dist.displayName;

const distPackage = () => src(
  config.package.dist.src
).pipe(
  plugins.jsonEditor(
    json => {
      delete json.devDependencies;
      delete json.main;
      delete json.scripts;
      return json;
    },
    { end_with_newline: true }
  )
).pipe(
  dest(config.package.dist.dest)
);

distPackage.displayName = config.package.dist.displayName;

const webpackTask = () => src(
  config.webpack.dist.src
).pipe(
  webpackStream(webpackConfig, webpack)
).pipe(
  dest(config.webpack.dist.dest)
);

webpackTask.displayName = config.webpack.dist.displayName;

module.exports = series(webpackTask, copy, distPackage);
