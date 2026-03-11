// Domain entity — mirrors the shape of a Google-authenticated user in auth.users
export type GoogleAuthItem = {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
};

// No text input fields — Google auth is triggered via a button press only
export type GoogleAuthValues = Record<string, never>;

export type GoogleAuthResult = {
  error: Error | null;
};

export type TGoogleAuthFeatureProps = {
  className?: string;
};
