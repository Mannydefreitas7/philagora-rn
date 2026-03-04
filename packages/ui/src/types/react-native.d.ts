import "react-native";

// Augment React Native component props to support className (Uniwind/NativeWind)
declare module "react-native" {
	interface ViewProps {
		className?: string;
	}
	interface TextProps {
		className?: string;
	}
	interface ImageProps {
		className?: string;
	}
	interface ScrollViewProps {
		className?: string;
	}
	interface FlatListProps<ItemT> {
		className?: string;
		contentContainerClassName?: string;
	}
	interface PressableProps {
		className?: string;
	}
}
