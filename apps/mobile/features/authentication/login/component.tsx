import { UITextfield, useBottomSheetButton } from "@repo/ui";
import { useRouter } from "expo-router";
import { Button, useThemeColor } from "heroui-native";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Logo from "@/assets/logo-philagora-black.svg";
import useValidation, { validationRules } from "@/hooks/use-validation";
import ResetPasswordFeature from "../reset-password";
import useLoginStore from "./store";

export default function LoginFeature() {
  const router = useRouter();
  const foreground = useThemeColor("foreground");
  const { values, submitting, error, setField } = useLoginStore();

  const { TriggerButton } = useBottomSheetButton({
    modal: {
      title: "Forgot Password",
      description: "Enter your email address and we'll send you a link to reset your password.",
      component: <ResetPasswordFeature />,
    },
  });

  const schema = useMemo(
    () => ({
      email: [validationRules.required("Email"), validationRules.email()],
      password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
    }),
    [],
  );

  const { errors: validationErrors, validateForm } = useValidation(values, schema);

  const handleSubmit = async () => {
    // Disabling for testing purposes
    const isValid = validateForm();
    if (!isValid) return;
    // const { error } = await login();
    // if (error) return;

    router.replace("/(public)/(tabs)");
  };

  return (
    <KeyboardAwareScrollView automaticallyAdjustKeyboardInsets>
      <View className="flex-1 flex-col justify-center gap-y-4 bg-transparent px-6 py-8">
        <View className="flex-col items-center">
          <Logo stroke={foreground} strokeWidth={45} width={120} height={120} strokeLinecap="round" />
          <Text className="mt-1 text-3xl font-bold text-black dark:text-white">Philagora</Text>
          <Text className="text-md text-neutral-600 dark:text-neutral-300">Sign in to your account</Text>
        </View>

        <View className="flex gap-y-3">
          <UITextfield
            clearTextOnFocus
            autoFocus
            clearButtonMode="while-editing"
            isRequired
            placeholder="john@smith.com"
            keyboardType="email-address"
            textContentType="emailAddress"
            keyboardAppearance="default"
            inputMode="email"
            returnKeyLabel="Next"
            returnKeyType="next"
            autoCapitalize="none"
            labelProps={{ value: "Email" }}
            value={values.email}
            error={validationErrors.email}
            onChangeText={(value) => setField("email", value)}
            isInvalid={!!validationErrors.email}
          />

          <UITextfield
            isRequired
            placeholder="***************"
            keyboardType="visible-password"
            returnKeyLabel="Login"
            returnKeyType="join"
            submitBehavior="blurAndSubmit"
            onSubmitEditing={handleSubmit}
            autoCapitalize="none"
            labelProps={{ value: "Password" }}
            value={values.password}
            error={validationErrors.password}
            onChangeText={(value) => setField("password", value)}
            isInvalid={!!validationErrors.password}
          />
        </View>

        {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

        <Button
          onPress={handleSubmit}
          variant="primary"
          className="mt-3"
          isDisabled={submitting /* disabling for testing purposes.. || isSubmitDisabled */}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>

        <View className="flex-row items-center justify-between">
          <TriggerButton variant="ghost">Forgot Password?</TriggerButton>
          <Button variant="outline" className="border-accent" onPress={() => router.replace("/register")}>
            Create account
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
