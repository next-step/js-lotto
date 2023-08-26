const baseConfig = require('./base.config.js');

module.exports = {
  ...baseConfig,
  entry: "./src/step1-index.js",
  target: "node",
};