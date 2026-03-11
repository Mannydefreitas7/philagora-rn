import type { GoogleAuthItem } from "./types";

// Seed data — covers first sign-in (full profile), partial profile (no avatar), and minimal profile
export const googleAuthSeeds: GoogleAuthItem[] = [
  {
    id: "seed-google-auth-1",
    email: "john.smith@gmail.com",
    fullName: "John Smith",
    avatarUrl: "https://lh3.googleusercontent.com/a/seed-google-auth-1",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-google-auth-2",
    email: "jane.doe@gmail.com",
    fullName: "Jane Doe",
    avatarUrl: "https://lh3.googleusercontent.com/a/seed-google-auth-2",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-google-auth-3",
    // Minimal profile: no display name or avatar provided by the provider
    email: "user@example.com",
    fullName: null,
    avatarUrl: null,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

// SQL seed — paste into Supabase Studio or run via supabase db seed
export const googleAuthSeedSQL = `
INSERT INTO auth.users (id, email, created_at) VALUES
  ('seed-google-auth-1', 'john.smith@gmail.com', '2024-01-01T00:00:00.000Z'),
  ('seed-google-auth-2', 'jane.doe@gmail.com', '2024-01-02T00:00:00.000Z'),
  ('seed-google-auth-3', 'user@example.com', '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
