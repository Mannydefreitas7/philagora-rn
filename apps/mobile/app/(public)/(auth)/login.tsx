import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button, TextField, Label, FieldError, Input, Description } from "heroui-native";
import { supabase } from "@/utils/supabase";
import UITextfield from "@/components/texfield";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email) next.email = "Email is required";
    else if (!email.includes("@")) next.email = "Enter a valid email";

    if (!password) next.password = "Password is required";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters";

    setErrors(next);
    setSubmitError(null);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setSubmitError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 flex-col gap-y-4 justify-center px-6 py-8 bg-transparent">

        <View className="space-y-2">
          <UITextfield
            isRequired
            placeholder="john@smith.com"
            keyboardType="email-address"
            autoCapitalize="none"
            labelProps={{ value: "Email" }}
            value={email}
            onChangeText={setEmail}
            isInvalid={!!errors.email}
          />

          <UITextfield
            isRequired
            placeholder="***************"
            keyboardType="visible-password"
            autoCapitalize="none"
            labelProps={{ value: "Password" }}
            value={password}
            onChangeText={setPassword}
            isInvalid={!!errors.password}
          />

            </View>

            {submitError ? (
              <Text className="text-red-600">{submitError}</Text>
            ) : null}

            <Button
              onPress={handleSubmit}
              variant="primary"
              isDisabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <View className="flex-row justify-between items-center">
              <Button
                variant="ghost"
                onPress={() => router.push("/(public)/(auth)/forgot-password")}
              >
                Forgot password?
              </Button>

              <Button variant="outline" onPress={() => router.push("/(public)/(auth)/register")}>
                Create account
              </Button>
            </View>

      </View>
    </KeyboardAvoidingView>
  );
}
