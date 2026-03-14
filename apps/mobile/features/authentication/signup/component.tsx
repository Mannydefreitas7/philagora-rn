import { AnimatePresence, Motion } from "@legendapp/motion";
import { UITextfield } from "@repo/ui";
import { randomUUID } from "expo-crypto";
import { Link, useRouter } from "expo-router";
import { Button, useThemeColor } from "heroui-native";
import { useCallback, useMemo, useState } from "react";
import { Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Logo from "@/assets/logo-philagora-black.svg";
import AppleButton from "@/features/authentication/apple-auth";
import GoogleButton from "@/features/authentication/google-auth";
import TikTokButton from "@/features/authentication/tiktok-auth";
import useToast from "@/hooks/use-toast";
import useValidation, { validationRules } from "@/hooks/use-validation";
import useSignupStore from "./store";

export default function SignupFeature() {
  const router = useRouter();
  const foreground = useThemeColor("foreground");
  const { values, submitting, error, setField, signup } = useSignupStore();
  const { show } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(
    () => ({
      email: [validationRules.required("Email"), validationRules.email()],
      password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
      fullName: [validationRules.required("Full Name"), validationRules.minLength(2, "Full Name")],
      confirm: [validationRules.required("Confirm Password"), validationRules.matchesField("password")],
    }),
    [],
  );

  const { errors: validationErrors, validateForm, isSubmitDisabled, getFieldValidity, validateField } = useValidation(values, schema);

  const onRegister = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    const { error: signupError } = await signup();
    if (signupError) {
      show({ title: "Signup Failed", type: "danger", description: signupError.message });
      return;
    }

    if (error) {
      show({ title: "Signup Failed", type: "danger", description: error });
      return;
    }

    router.replace("/(public)/(tabs)");
  };

  const showConfirmPassword = useMemo(
    () => values.password.length > 0 && getFieldValidity("password") === true,
    [values.password, getFieldValidity],
  );

  const isFirstNameValid = getFieldValidity("fullName");

  const renderConditionalPassword = useMemo(
    () => (
      <AnimatePresence>
        {showConfirmPassword ? (
          <Motion.View
            key={randomUUID()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              default: {
                type: "spring",
              },
              opacity: {
                type: "spring",
              },
            }}
            exit={{ opacity: 0, y: -20 }}>
            <UITextfield
              placeholder="Confirm Password"
              keyboardType="visible-password"
              secureTextEntry={!showPassword}
              enterKeyHint="next"
              autoComplete="current-password"
              value={values.confirm}
              prefix="Lock"
              valid={getFieldValidity('confirm')}
              onChangeText={handleOnConfirmChange}
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
              autoCapitalize={"none"}
              autoCorrect={false}
              spellCheck={false}
              error={validationErrors.confirm}
              isInvalid={!!validationErrors.confirm}
            />
          </Motion.View>
        ) : null}
      </AnimatePresence>
    ),
    [showConfirmPassword],
  );

  const handleOnConfirmChange = useCallback(async (text: string) => {
    setField("confirm", text);
    if (text.toLowerCase() === values.password.toLowerCase()) {
      await onRegister();
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      pinchGestureEnabled={false}
      keyboardDismissMode="on-drag"
      snapToAlignment="center"
      keyboardShouldPersistTaps="handled">
      <View
        className="justify-center bg-transparent px-5 pt-safe-offset-6">
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
            placeholder="John Smith"
            keyboardType="name-phone-pad"
            autoCapitalize="words"
            value={values.fullName}
            enterKeyHint="next"
            autoComplete="family-name"
            returnKeyLabel="next"
            clearButtonMode="unless-editing"
            returnKeyType="next"
            valid={isFirstNameValid}
            textContentType="name"
            onChangeText={(text) => setField("fullName", text)}
            error={validationErrors.fullName}
            isInvalid={!!validationErrors.fullName}
            prefix={isFirstNameValid ? "TickCircle" : "Personalcard"}
          />

          <UITextfield
            placeholder="username@example.com"
            keyboardType="email-address"
            textContentType="emailAddress"
            spellCheck={false}
            autoCorrect={false}
            valid={getFieldValidity("email")}
            inputMode="email"
            autoComplete="email"
            importantForAutofill="yes"
            clearButtonMode="always"
            autoCapitalize="none"
            value={values.email}
            enterKeyHint="next"
            onChangeText={(text) => setField("email", text.toLowerCase())}
            returnKeyType="next"
            error={validationErrors.email}
            isInvalid={!!validationErrors.email}
            prefix={getFieldValidity("email") ? "TickCircle" : "Sms"}
          />

          <UITextfield
            placeholder="Password"
            keyboardType="visible-password"
            secureTextEntry={!showPassword}
            enterKeyHint="next"
            returnKeyType="none"
            isRequired
            textContentType="newPassword"
            valid={showConfirmPassword}
            autoComplete="current-password"
            autoCapitalize={"none"}
            autoCorrect={false}
            spellCheck={false}
            value={values.password}
            prefix={showConfirmPassword ? "TickCircle" : "Lock"}
            onChangeText={(text) => setField("password", text)}
            error={validationErrors.password}
            isInvalid={!!validationErrors.password}
            suffix={showPassword ? "Eye" : "EyeSlash"}
            onSuffixPress={() => setShowPassword(!showPassword)}
          />
          {renderConditionalPassword}
        </View>

        <View className="mt-8">
          <Button variant="primary" onPress={onRegister} isDisabled={isSubmitDisabled || submitting}>
            {submitting ? "Creating..." : "Create account"}
          </Button>
        </View>
        <View className="flex-row items-center justify-items-stretch gap-x-2 mt-3">
          {Platform.OS === "ios" && <AppleButton />}
          <GoogleButton />
          <TikTokButton />
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
