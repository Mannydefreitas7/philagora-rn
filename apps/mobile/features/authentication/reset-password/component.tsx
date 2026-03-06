import { Button } from "heroui-native";
import { Text, View } from "react-native";

import { UITextfield } from "@repo/ui";
import useValidation, { validationRules } from "@/hooks/use-validation";

import useResetPasswordStore from "./store";

export default function ResetPasswordFeature() {
  const { values, submitting, error, sent, setField, sendResetLink } = useResetPasswordStore();
  const { errors, validateForm } = useValidation(values, {
    email: [validationRules.email(), validationRules.required("Email")],
  });

  const onResetPassword = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    await sendResetLink();
  };

  return (
    <View className="flex-1 gap-y-3">
      <UITextfield
        value={values.email}
        onChangeText={(value) => setField("email", value)}
        inputMode="email"
        textContentType="emailAddress"
        placeholder="Enter valid email"
        autoCapitalize="none"
        returnKeyType="send"
        keyboardType="email-address"
        enterKeyHint="send"
        onSubmitEditing={onResetPassword}
        isRequired
        isInvalid={!!errors.email}
        error={errors.email}
      />

      {error ? <Text className="text-sm text-red-500">{error}</Text> : null}
      {sent ? (
        <Text className="text-sm text-green-600">
          If this email exists, we sent a reset link. Check your inbox and spam folder.
        </Text>
      ) : null}

      <Button onPress={onResetPassword} isDisabled={!!errors.email || !values.email.trim() || submitting}>
        {submitting ? "Sending..." : "Send reset link"}
      </Button>
    </View>
  );
}
