import type { AppleAuthenticationButtonStyle, AppleAuthenticationButtonType } from "expo-apple-authentication";

// Domain entity — mirrors the shape of an Apple-authenticated user in auth.users
export type AppleAuthItem = {
  id: string;
  email: string | null; // null when the user selects "Hide My Email"
  fullName: string | null; // null on repeat sign-ins (Apple only sends this once)
  givenName: string | null;
  familyName: string | null;
  createdAt: string;
};

// No text input fields — Apple auth is triggered via a button press only
export type AppleAuthValues = Record<string, never>;

export type AppleAuthResult = {
  error: Error | null;
};

export enum AppleAuthButtonLabel {
  SIGN_UP = "Sign up",
  SIGN_IN = "Sign in",
  CONTINUE = "Continue",

}

export type TAppleAuthFeatureProps = {
  className?: string
  label?: AppleAuthButtonLabel;
};
