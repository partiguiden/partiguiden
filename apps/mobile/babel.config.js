/**
 *
 * @param {import("@babel/core").ConfigAPI} api
 */
function configure(api) {
  api.cache.forever();
  return {
    presets: ["babel-preset-expo"],
  };
}

module.exports = configure;
