module.exports = (on, config) => {
  // https://github.com/bahmutov/cypress-watch-and-reload
  // eslint-disable-next-line global-require
  require('cypress-watch-and-reload/plugins')(config);
  // IMPORTANT: return the config object
  // because the plugin might have changed it
  return config;
};
