import { defineConfig } from "tsup";

const external = [
	"react",
	"react-dom",
	"react-native",
	"react-native-reanimated",
	"react-native-svg",
	"react-native-worklets",
	"react-native-pager-view",
	"react-native-uuid",
	"expo",
	"expo-blur",
	"expo-image",
	"expo-linear-gradient",
	"expo-router",
	"heroui-native",
	"@gorhom/bottom-sheet",
	"@gorhom/portal",
	"@shopify/react-native-skia",
	"iconsax-react-nativejs",
	"lottie-react-native",
];

export default defineConfig({
	entry: {
		index: "src/index.ts",
		base: "src/base/index.ts",
		molecules: "src/molecules/index.ts",
		organisms: "src/organisms/index.ts",
	},
	format: ["esm", "cjs"],
	dts: true,
	clean: true,
	external,
});
