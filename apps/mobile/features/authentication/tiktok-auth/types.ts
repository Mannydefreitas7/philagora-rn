// Domain entity — mirrors the shape of a TikTok-authenticated user
export type TikTokAuthItem = {
  id: string;
  openId: string; // TikTok's unique user identifier (stable per app)
  displayName: string | null;
  avatarUrl: string | null;
  email: string | null; // only available if user grants email scope
  createdAt: string;
};

// No text input fields — TikTok auth is triggered via a button press only
export type TikTokAuthValues = Record<string, never>;

export type TikTokAuthResult = {
  error: Error | null;
};

export type TTikTokAuthFeatureProps = {
  className?: string;
};
