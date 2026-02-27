import useValidation, { validationRules } from "@/hooks/use-validation";
import { useState } from "react";
import { Text, View } from "react-native";
import UITextfield from "@/components/texfield";
import useSupabaseAuth from "@/hooks/use-supabase-auth";
import { Button } from "heroui-native";

const Password = () => {
  const [email, setEmail] = useState("");
  const { hasErrors, errors, validateForm } = useValidation(
    { email },
    {
      email: [validationRules.email(), validationRules.required("Email is required")],
    },
  );

  const { resetPassword, resetPasswordError, resetPasswordLoading, resetPasswordSent } = useSupabaseAuth();

  const onResetPassword = async () => {
    const isValid = validateForm();
    if (!isValid || !email.trim()) return;
    await resetPassword(email);
  };

  return (
    <View className="flex-1 gap-y-3">
      <UITextfield
        value={email}
        onChangeText={setEmail}
        inputMode="email"
        textContentType="emailAddress"
        placeholder="Enter valid email"
        autoCapitalize="none"
        returnKeyType="send"
        keyboardType="email-address"
        enterKeyHint="send"
        onSubmitEditing={onResetPassword}
        isRequired
        isInvalid={hasErrors}
        error={errors.email}
      />

      {resetPasswordError ? <Text className="text-red-500 text-sm">{resetPasswordError}</Text> : null}
      {resetPasswordSent ? (
        <Text className="text-green-600 text-sm">
          If this email exists, we sent a reset link. Check your inbox and spam folder.
        </Text>
      ) : null}

      <Button onPress={onResetPassword} isDisabled={hasErrors || !email.trim() || resetPasswordLoading}>
        {resetPasswordLoading ? "Sending..." : "Send reset link"}
      </Button>
    </View>
  );
};

export default Password;
