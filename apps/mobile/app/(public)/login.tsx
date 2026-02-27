import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, useIsOnSurface, useThemeColor } from "heroui-native";
import { supabase } from "@/utils/supabase";
import UITextfield from "@/components/texfield";
import Logo from "@/assets/logo-philagora-black.svg";
import { KeyboardAwareScrollView, KeyboardToolbar } from "react-native-keyboard-controller";
import useValidation, { validationRules } from "@/hooks/use-validation";
import useSheetStore from "@/stores/sheet";
import { ISheet } from "@/types/navigation";
import { Password } from "@/components";
import { useBottomSheetButton } from "@/components/molecules/sheet-button";

/**
 * Login screen converted to use Tailwind (Uniwind) `className` instead of inline styles.
 *
 * Requirements:
 * - Assumes Uniwind is set up and HeroUI Native is installed.
 * - Uses `className` on RN and HeroUI Native components for styling.
 *
 * Behavior:
 * - Basic client-side validation for email/password
 * - Simulated sign-in delay
 * - Navigation to register / forgot-password
 */

export default function LoginScreen() {
  const router = useRouter();
  const [values, setValues] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const foreground = useThemeColor("foreground");
  const isOnSurface = useIsOnSurface();
  const toggleSheet = useSheetStore((state) => state.open);
  const { onChange, TriggerButton } = useBottomSheetButton({
    modal: {
      title: "Forgot Password",
      description: "Enter your email address and we'll send you a link to reset your password.",
      component: <Password />,
    },
  });

  useEffect(() => {}, [isOnSurface]);

  const schema = {
    email: [validationRules.required("Email"), validationRules.email()],
    password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
  };

  const { errors: validationErrors, isSubmitDisabled, validateForm, hasErrors } = useValidation(values, schema);

  const handleSubmit = async () => {
    if (validateForm() && hasErrors) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setSubmitError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/home");
  };

  const handleSheetToggle = () => {
    const sheet: ISheet = {
      id: "forgot-password",
      title: "Forgot Password",
      content: <Password />,
    };
    toggleSheet(sheet);
  };

  return (
    <KeyboardAwareScrollView bottomOffset={40} automaticallyAdjustKeyboardInsets>
      <View className="mt-safe-offset-8 flex-1 flex-col gap-y-4 justify-center px-6 py-8 bg-transparent">
        <View className="flex-col items-center">
          <Logo stroke={foreground} strokeWidth={45} width={120} height={120} strokeLinecap="round" />
          <Text className="text-3xl font-bold mt-1 text-black dark:text-white">Philagora</Text>
          <Text className="text-neutral-600 dark:text-neutral-300 text-md">Sign in to your account</Text>
        </View>
        <View className=" flex gap-y-3">
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
            onChangeText={(value) => setValues({ ...values, email: value })}
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
            onChangeText={(value) => setValues({ ...values, password: value })}
            isInvalid={!!validationErrors.password}
          />
        </View>
        <Button onPress={handleSheetToggle} variant="primary" className="mt-3" isDisabled={loading || isSubmitDisabled}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <View className="flex-row justify-between items-center">
          <TriggerButton variant="ghost">Forgot Password?</TriggerButton>
          <Button variant="outline" className={"border-accent"} onPress={() => router.replace("/register")}>
            Create account
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
