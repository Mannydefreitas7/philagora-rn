import type { TikTokAuthItem } from "./types";

// Seed data — covers full profile, no avatar, and no email (scope not granted)
export const tikTokAuthSeeds: TikTokAuthItem[] = [
  {
    id: "seed-tiktok-auth-1",
    openId: "tiktok_open_id_seed_1",
    displayName: "John Smith",
    avatarUrl: "https://p16-sign.tiktokcdn-us.com/avatars/seed-tiktok-auth-1",
    email: "john.smith@example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-tiktok-auth-2",
    openId: "tiktok_open_id_seed_2",
    displayName: "Jane Doe",
    avatarUrl: "https://p16-sign.tiktokcdn-us.com/avatars/seed-tiktok-auth-2",
    email: null, // user did not grant email scope
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-tiktok-auth-3",
    openId: "tiktok_open_id_seed_3",
    displayName: null, // no display name set on TikTok account
    avatarUrl: null,
    email: null,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

// SQL seed — paste into Supabase Studio or run via supabase db seed
export const tikTokAuthSeedSQL = `
INSERT INTO auth.users (id, email, created_at) VALUES
  ('seed-tiktok-auth-1', 'john.smith@example.com', '2024-01-01T00:00:00.000Z'),
  ('seed-tiktok-auth-2', NULL, '2024-01-02T00:00:00.000Z'),
  ('seed-tiktok-auth-3', NULL, '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
