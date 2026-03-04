const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer = {
	...defaultConfig.transformer,
	babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
defaultConfig.resolver = {
	...defaultConfig.resolver,
	assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
	sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
};

module.exports = withUniwindConfig(defaultConfig, {
	// relative path to your global.css file (from previous step)
	cssEntryFile: "./global.css",
	// (optional) path where we gonna auto-generate typings
	// defaults to project's root
	dtsFile: "./types/uniwind-types.d.ts",
});
