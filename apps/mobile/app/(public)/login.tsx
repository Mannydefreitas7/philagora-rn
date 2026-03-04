import { View } from "react-native";
import { GrainyGradient } from "@/components/ui/organisms/grainy-gradient";
import Login from "@/features/authentication/login";

export default function LoginPage() {
	return (
		<View className="flex-1 bg-white dark:bg-neutral-950">
			<GrainyGradient />
			<Login />
		</View>
	);
}
