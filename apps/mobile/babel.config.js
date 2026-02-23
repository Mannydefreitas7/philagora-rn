module.exports = function (api) {
  api.cache(true)
  // your presets and other configs
  return {
    presets: [
      "babel-preset-expo"
    ],
    plugins: [
      // other plugins
      'react-native-worklets/plugin',
    ]
  }
};
