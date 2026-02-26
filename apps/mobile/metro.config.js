const {getDefaultConfig} = require("expo/metro-config");
const {withUniwindConfig} = require("uniwind/metro");

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
    },
}

module.exports = withUniwindConfig(config, {
    // relative path to your global.css file (from previous step)
    cssEntryFile: "./global.css",
    // (optional) path where we gonna auto-generate typings
    // defaults to project's root
    dtsFile: "./types/uniwind-types.d.ts",
});
