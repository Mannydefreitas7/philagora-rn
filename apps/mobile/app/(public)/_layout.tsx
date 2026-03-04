import { Stack } from "expo-router";
import Header from "@/components/navigation/header";
import useHeaderTitle from "@/hooks/use-header-title";

export default function PublicLayout() {
	const { title } = useHeaderTitle();

	return (
		<Stack initialRouteName="login">
			<Stack.Screen
				name="login"
				options={{
					presentation: "fullScreenModal",
					animation: "fade",
					animationDuration: 200,
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					animationMatchesGesture: true,
					animation: "fade",
					animationDuration: 200,
					presentation: "fullScreenModal",
					headerStyle: {
						backgroundColor: "transparent",
					},
					headerShadowVisible: false,
					headerTitle: "",
					headerShown: true,
				}}
			/>
			<Stack.Screen name="(tabs)">
				<Stack.Header asChild>
					<Header title={title} />
				</Stack.Header>
			</Stack.Screen>
		</Stack>
	);
}
