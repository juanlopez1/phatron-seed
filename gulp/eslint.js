const { dest, src } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const config = require('./config.json');

const plugins = gulpLoadPlugins();

const isFixed = file => file.eslint && file.eslint.fixed;

const eslint = () => src(
  config.eslint.src
).pipe(
  plugins.eslint({ fix: true })
).pipe(
  plugins.eslint.format()
).pipe(
  plugins.if(isFixed, dest(config.eslint.dest))
).pipe(
  plugins.eslint.failAfterError()
);

eslint.displayName = config.eslint.displayName;

module.exports = eslint;
