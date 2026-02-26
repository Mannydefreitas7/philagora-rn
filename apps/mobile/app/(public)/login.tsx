import React, {useState} from "react";
import {KeyboardAvoidingView, Platform, Text, View} from "react-native";
import {useRouter} from "expo-router";
import {Button} from "heroui-native";
import {supabase} from "@/utils/supabase";
import UITextfield from "@/components/texfield";
import Logo from "../../assets/logo-philagora-black.svg";
import useValidation, {validationRules} from "@/hooks/use-validation";

import {withUniwind} from "uniwind";

const StyledLogo = withUniwind(Logo);

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
    const [values, setValues] = useState<{ email: string; password: string }>({email: "", password: ""});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const source = require("../../assets/logo-philagora-black.svg");

    const schema = {
        email: [validationRules.required("Email"), validationRules.email()],
        password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
    };

    const {errors: validationErrors, validateField, validateForm, hasErrors} = useValidation(values, schema);

    const handleSubmit = async () => {
        if (validateForm() && hasErrors) return;
        setLoading(true);

        const {error} = await supabase.auth.signInWithPassword({
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

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View className="flex-1 flex-col gap-y-4 justify-center px-6 py-8 bg-transparent">
                <View className="flex-col items-center">
                    {source &&
                        <StyledLogo className="stroke-black dark:stroke-white" width={150} height={150}/>}
                    <Text className="text-3xl font-bold mt-4 text-black dark:text-white">Philagora</Text>
                    <Text className="text-neutral-600 dark:text-neutral-300 text-lg">Sign in to your account</Text>
                </View>
                <View className=" flex gap-y-3">
                    <UITextfield
                        isRequired
                        placeholder="john@smith.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        labelProps={{value: "Email"}}
                        value={values.email}
                        error={validationErrors.email}
                        onChangeText={(value) => setValues({...values, email: value})}
                        isInvalid={!!validationErrors.email}
                    />

                    <UITextfield
                        isRequired
                        placeholder="***************"
                        keyboardType="visible-password"
                        autoCapitalize="none"
                        labelProps={{value: "Password"}}
                        value={values.password}
                        error={validationErrors.password}
                        onChangeText={(value) => setValues({...values, password: value})}
                        isInvalid={!!validationErrors.password}
                    />
                </View>
                <Button onPress={handleSubmit} variant="primary" className="mt-3" isDisabled={loading || hasErrors}>
                    {loading ? "Signing in..." : "Sign in"}
                </Button>

                <View className="flex-row justify-between items-center">
                    <Button variant="ghost" onPress={() => router.push("/forgot-password")}>
                        Forgot password?
                    </Button>

                    <Button variant="outline" className={"border-accent"} onPress={() => router.push("/register")}>
                        Create account
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
