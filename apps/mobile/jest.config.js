const { getNodePreset } = require("jest-expo/config/getPlatformPreset");

const nodePreset = getNodePreset();

module.exports = {
  ...nodePreset,
  testMatch: ["**/test.ts"],
  moduleNameMapper: {
    ...(nodePreset.moduleNameMapper || {}),
    "^@/(.*)$": "<rootDir>/$1",
  },
  clearMocks: true,
};
