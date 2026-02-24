import React, { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Button, Card, TextField } from "heroui-native";
import { supabase } from "@/utils/supabase";
import UITextfield from "@/components/texfield";

/**
 * Register screen using Tailwind (Uniwind) `className`.
 *
 * - Kept minimal and pragmatic.
 * - Uses HeroUI Native components and Uniwind className utilities.
 */

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
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
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    router.replace("/");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={{ flex: 1 }}>
      <View className="flex-1 px-5 py-8 justify-center bg-transparent">
        <View className="space-y-3 mt-2">
          <UITextfield
            placeholder="John"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            labelProps={{ value: "Full name" }}
            value={fullName}
            onChangeText={setFullName}
          />

          <UITextfield
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            labelProps={{ value: "Email" }}
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
          />

          <UITextfield
            placeholder="Password"
            keyboardType="visible-password"
            labelProps={{ value: "Password" }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <UITextfield
            placeholder="Confirm Password"
            keyboardType="visible-password"
            labelProps={{ value: "Repeat password" }}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
            returnKeyType="done"
          />
        </View>

        {error ? <Text className="text-red-600 mt-3">{error}</Text> : null}

        <View className="mt-4">
          <Button variant="primary" onPress={onRegister} isDisabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </Button>
        </View>

        <View>
          <View className="mt-3 flex-row justify-center items-center">
            <Text className="text-gray-500">Already have an account?</Text>
            <TouchableOpacity className="ml-2" onPress={() => router.push("/(public)/(auth)/login")}>
              <Text className="text-blue-600">Sign in</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3 items-center">
            <TouchableOpacity onPress={() => router.push("/(public)/(auth)/forgot-password")}>
              <Text className="text-gray-500">Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
