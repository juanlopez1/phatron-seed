const {parallel, series} = require('gulp');

const config = require('./gulp/config');
const clean = require('./gulp/clean');
const dist = require('./gulp/dist');
const eslint = require('./gulp/eslint');

exports.lint = parallel(eslint);

exports.build = series(
  parallel(clean, config),
  dist
);
