import type { AppleAuthItem } from "./types";

// Seed data — covers first sign-in (name provided), repeat sign-in (name null), and hidden email
export const appleAuthSeeds: AppleAuthItem[] = [
  {
    id: "seed-apple-auth-1",
    email: "john@privaterelay.appleid.com",
    fullName: "John Smith",
    givenName: "John",
    familyName: "Smith",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-apple-auth-2",
    email: "jane@privaterelay.appleid.com",
    fullName: "Jane Doe",
    givenName: "Jane",
    familyName: "Doe",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-apple-auth-3",
    // Repeat sign-in: Apple does not re-send name or email after the first authorization
    email: null,
    fullName: null,
    givenName: null,
    familyName: null,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

// SQL seed — paste into Supabase Studio or run via supabase db seed
export const appleAuthSeedSQL = `
INSERT INTO auth.users (id, email, created_at) VALUES
  ('seed-apple-auth-1', 'john@privaterelay.appleid.com', '2024-01-01T00:00:00.000Z'),
  ('seed-apple-auth-2', 'jane@privaterelay.appleid.com', '2024-01-02T00:00:00.000Z'),
  ('seed-apple-auth-3', NULL, '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
