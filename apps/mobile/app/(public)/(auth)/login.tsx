import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Button, Card, TextField, Label, FieldError } from "heroui-native";

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
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email) next.email = "Email is required";
    else if (!email.includes("@")) next.email = "Enter a valid email";

    if (!password) next.password = "Password is required";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);

    // Simulate auth call
    setTimeout(() => {
      setLoading(false);
      // Navigate to app root on success; adjust as needed for your app
      router.push("/");
    }, 900);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 justify-center px-6 py-8 bg-transparent">
        <Card className="w-full">
          <Card.Header>
            <Card.Title>Sign in</Card.Title>
            <Card.Description>
              Welcome back — please sign in to continue
            </Card.Description>
          </Card.Header>

          <Card.Body className="space-y-4">
            <View className="space-y-2">
              <Label>Email</Label>
              <TextField
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? <FieldError>{errors.email}</FieldError> : null}
            </View>

            <View className="space-y-2">
              <Label>Password</Label>
              <TextField
                value={password}
                onChangeText={setPassword}
                placeholder="●●●●●●●"
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.password ? (
                <FieldError>{errors.password}</FieldError>
              ) : null}
            </View>
          </Card.Body>

          <Card.Footer className="space-y-3">
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
                onPress={() => router.push("forgot-password")}
              >
                Forgot password?
              </Button>

              <Button variant="outline" onPress={() => router.push("register")}>
                Create account
              </Button>
            </View>
          </Card.Footer>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
