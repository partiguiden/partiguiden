/**
 *
 * @param {import("@babel/core").ConfigAPI} api
 */
function configure(api) {
  api.cache.forever();
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
}

module.exports = configure;
