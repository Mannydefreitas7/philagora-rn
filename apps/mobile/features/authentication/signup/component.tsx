import { Link, useRouter } from "expo-router";
import { Button, useThemeColor } from "heroui-native";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "@/assets/logo-philagora-black.svg";
import { UITextfield } from "@/components";
import useValidation, { validationRules } from "@/hooks/use-validation";
import useSignupStore from "./store";

export default function SignupFeature() {
	const router = useRouter();
	const foreground = useThemeColor("foreground");
	const { top } = useSafeAreaInsets();
	const { values, submitting, error, setField, signup } = useSignupStore();

	const schema = useMemo(
		() => ({
			email: [validationRules.required("Email"), validationRules.email()],
			password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
			fullName: [validationRules.required("Full Name"), validationRules.minLength(2, "Full Name")],
			confirm: [validationRules.required("Confirm Password"), validationRules.matchesField("password")],
		}),
		[],
	);

	const { errors: validationErrors, validateForm } = useValidation(values, schema);

	const onRegister = async () => {
		// const isValid = validateForm();
		// if (!isValid) return;

		// const { error: signupError } = await signup();
		// if (signupError) return;

		router.replace("/(public)/(tabs)");
	};

	return (
		<KeyboardAwareScrollView pinchGestureEnabled={false}>
			<View className="justify-center bg-transparent px-5 py-8">
				<View className="mb-2 flex-row items-center gap-x-3 px-3">
					<Logo stroke={foreground} strokeWidth={45} width={48} height={48} strokeLinecap="round" />
					<View className="-mt-2">
						<Text className="w-full text-left text-3xl font-bold text-black dark:text-white">Sign up</Text>
						<Text className="text-md w-full text-left text-neutral-600 dark:text-neutral-300">
							Create an account to get started.
						</Text>
					</View>
				</View>

				<View className="mt-2 gap-y-3">
					<UITextfield
						placeholder="John"
						keyboardType="name-phone-pad"
						autoCapitalize="words"
						labelProps={{ value: "Full name" }}
						value={values.fullName}
						enterKeyHint="next"
						dataDetectorTypes="all"
						returnKeyLabel="next"
						returnKeyType="next"
						textContentType="givenName"
						onChangeText={(text) => setField("fullName", text)}
						error={validationErrors.fullName}
						isInvalid={!!validationErrors.fullName}
					/>

					<UITextfield
						placeholder="you@example.com"
						keyboardType="email-address"
						textContentType="emailAddress"
						spellCheck
						autoCorrect={false}
						inputMode="email"
						importantForAutofill="yes"
						autoCapitalize="none"
						labelProps={{ value: "Email" }}
						value={values.email}
						enterKeyHint="next"
						onChangeText={(text) => setField("email", text)}
						returnKeyType="next"
						error={validationErrors.email}
						isInvalid={!!validationErrors.email}
					/>

					<UITextfield
						placeholder="Password"
						keyboardType="visible-password"
						labelProps={{ value: "Password" }}
						secureTextEntry
						enterKeyHint="next"
						value={values.password}
						onChangeText={(text) => setField("password", text)}
						error={validationErrors.password}
						isInvalid={!!validationErrors.password}
					/>

<<<<<<< Updated upstream
					<UITextfield
						placeholder="Confirm Password"
						keyboardType="visible-password"
						labelProps={{ value: "Repeat password" }}
						secureTextEntry
						enterKeyHint="next"
						value={values.confirm}
						onChangeText={(text) => setField("confirm", text)}
						returnKeyType="done"
						error={validationErrors.confirm}
						isInvalid={!!validationErrors.confirm}
					/>
				</View>
=======
          <UITextfield
            placeholder="Confirm Password"
            keyboardType="visible-password"
            secureTextEntry
            enterKeyHint="next"
            value={values.confirm}
            onChangeText={(text) => setField("confirm", text)}
            returnKeyType="done"
            error={validationErrors.confirm}
            isInvalid={!!validationErrors.confirm}
          />
        </View>
>>>>>>> Stashed changes

				{error ? <Text className="mt-3 text-red-600">{error}</Text> : null}

				<View className="mt-8">
					<Button variant="primary" onPress={onRegister} isDisabled={submitting}>
						{submitting ? "Creating..." : "Create account"}
					</Button>
				</View>

				<View className="mt-3 flex-row items-center justify-center gap-x-2">
					<Text className="text-gray-500">Already have an account?</Text>
					<Link href="/login" dismissTo replace>
						<Text className="text-accent">Sign in</Text>
					</Link>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}
