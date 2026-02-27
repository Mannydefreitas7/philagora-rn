import React, { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, Card, TextField, useThemeColor } from "heroui-native";
import { supabase } from "@/utils/supabase";
import UITextfield from "@/components/texfield";
import useValidation, { validationRules } from "@/hooks/use-validation";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Logo from "@/assets/logo-philagora-black.svg";

/**
 * Register screen using Tailwind (Uniwind) `className`.
 *
 * - Kept minimal and pragmatic.
 * - Uses HeroUI Native components and Uniwind className utilities.
 */

export default function Register() {
  const router = useRouter();
  const schema = {
    email: [validationRules.required("Email"), validationRules.email()],
    password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
    fullName: [validationRules.required("Full Name"), validationRules.minLength(2, "Full Name")],
    confirm: [validationRules.required("Confirm Password"), validationRules.minLength(8, "Confirm Password")],
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<{ email: string; password: string; confirm: string; fullName: string }>({
    email: "",
    password: "",
    confirm: "",
    fullName: "",
  });
  const { errors: validationErrors, validateField, validateForm, hasErrors } = useValidation(values, schema);
  const foreground = useThemeColor("foreground");
  function validate() {
    if (!values.fullName.trim()) return "Please enter your full name.";
    if (!values.email.includes("@")) return "Please enter a valid email.";
    if (values.password.length < 6) return "Password must be at least 6 characters.";
    if (values.password !== values.confirm) return "Passwords do not match.";
    return null;
  }

  async function onRegister() {
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    router.replace("/home");
  }

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 h-screen px-5 py-8 justify-center bg-transparent">
        <View className="flex-row justify-items-start items-center px-3 mb-2 gap-x-3">
          <Logo stroke={foreground} strokeWidth={45} width={48} height={48} strokeLinecap="round" />
          <View className="-mt-2">
            <Text className="text-3xl font-bold  text-black dark:text-white text-left w-full">Sign up</Text>
            <Text className="text-neutral-600 dark:text-neutral-300 text-md text-left w-full">
              Create an account to get started.
            </Text>
          </View>
        </View>
        <View className="gap-y-3 mt-2">
          <UITextfield
            placeholder="John"
            keyboardType="name-phone-pad"
            autoCapitalize="words"
            labelProps={{ value: "Full name" }}
            value={values.fullName}
            enterKeyHint="next"
            dataDetectorTypes={"all"}
            returnKeyLabel="next"
            returnKeyType="next"
            textContentType="givenName"
            onChangeText={(text) => setValues({ ...values, fullName: text })}
            error={validationErrors.fullName}
          />

          <UITextfield
            placeholder="you@example.com"
            keyboardType="email-address"
            textContentType="emailAddress"
            spellCheck={true}
            autoCorrect={false}
            inputMode="email"
            importantForAutofill="yes"
            autoCapitalize="none"
            labelProps={{ value: "Email" }}
            value={values.email}
            enterKeyHint="next"
            onChangeText={(text) => setValues({ ...values, email: text })}
            returnKeyType="next"
          />

          <UITextfield
            placeholder="Password"
            keyboardType="visible-password"
            labelProps={{ value: "Password" }}
            secureTextEntry
            enterKeyHint="next"
            value={values.password}
            onChangeText={(text) => setValues({ ...values, password: text })}
          />

          <UITextfield
            placeholder="Confirm Password"
            keyboardType="visible-password"
            labelProps={{ value: "Repeat password" }}
            secureTextEntry
            enterKeyHint="next"
            value={values.confirm}
            onChangeText={(text) => setValues({ ...values, confirm: text })}
            returnKeyType="done"
          />
        </View>

        {error ? <Text className="text-red-600 mt-3">{error}</Text> : null}

        <View className="mt-8">
          <Button variant="primary" onPress={onRegister} isDisabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </Button>
        </View>

        <View>
          <View className="mt-3 flex-row gap-x-2 justify-center items-center">
            <Text className="text-gray-500">Already have an account?</Text>
            <Link href="/login">
              <Text className="text-accent">Sign in</Text>
            </Link>
          </View>

          <View className="mt-3 items-center">
            {/*<Link href="/forgot-password">
              <Text className="text-accent">Forgot password?</Text>
            </Link>*/}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
