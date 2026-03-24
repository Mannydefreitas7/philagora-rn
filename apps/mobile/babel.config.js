module.exports = (api) => {
	api.cache(true);
	return {
		// babel-preset-expo auto-adds react-native-worklets/plugin when the package is present
		presets: ["babel-preset-expo"],
		// @repo/hana is a pre-built ESM bundle; skip Babel transformation to avoid parse errors
		ignore: [(filename) => !!filename && /packages[\\/]hana/.test(filename)],
	};
};
