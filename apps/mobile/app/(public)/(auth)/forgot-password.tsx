import React, { useState } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  TextField,
  Label,
  FieldError,
  Spinner,
} from "heroui-native";

/**
 * Forgot Password screen converted to Tailwind (Uniwind) `className`.
 *
 * - Uses HeroUI Native components and Uniwind utility classes.
 * - Minimal, pragmatic behavior: validate email, simulate sending reset link,
 *   show inline error or success message, navigate back to login.
 */

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value.trim());
  };

  const handleSend = async () => {
    setError(null);
    setSuccess(false);

    const trimmed = email.trim();
    if (trimmed.length === 0) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Simulate network call. Replace with real API call when integrating.
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
    } catch (e) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <KeyboardAvoidingView
        className="flex-1 p-4 justify-center"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Card className="w-full">
          <Card.Header>
            <Card.Title>Forgot password</Card.Title>
            <Card.Description>
              Enter the email associated with your account and we'll send a
              reset link.
            </Card.Description>
          </Card.Header>

          <Card.Body className="space-y-3">
            <Label htmlFor="email">Email</Label>

            <TextField
              id="email"
              placeholder="you@example.com"
              value={email}
              onChangeText={(t: string) => setEmail(t)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="send"
              onSubmitEditing={handleSend}
              disabled={loading}
            />

            {error ? <FieldError>{error}</FieldError> : null}

            {success ? (
              <Card.Description className="text-green-600">
                If that address exists, we've sent a reset link.
              </Card.Description>
            ) : null}
          </Card.Body>

          <Card.Footer className="flex-row justify-between items-center">
            <Button
              variant="tertiary"
              onPress={() => router.replace("/(auth)/login")}
              isDisabled={loading}
            >
              Back to login
            </Button>

            <Button variant="primary" onPress={handleSend} isDisabled={loading}>
              {loading ? <Spinner /> : "Send reset link"}
            </Button>
          </Card.Footer>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
