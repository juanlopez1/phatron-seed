const del = require('del');

const config = require('./config.json');

const clean = () => del(config.clean.dist);

clean.displayName = config.clean.displayName;

module.exports = clean;
