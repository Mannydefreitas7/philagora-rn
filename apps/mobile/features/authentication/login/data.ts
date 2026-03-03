import type { LoginItem } from "./types";

export const loginSeeds: LoginItem[] = [
  { id: "seed-login-1", email: "john@smith.com", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "seed-login-2", email: "jane@example.com", createdAt: "2024-01-02T00:00:00.000Z" },
  { id: "seed-login-3", email: "a@b.co", createdAt: "2024-01-03T00:00:00.000Z" },
];

export const loginSeedSQL = `
INSERT INTO auth.users (id, email, created_at) VALUES
  ('seed-login-1', 'john@smith.com', '2024-01-01T00:00:00.000Z'),
  ('seed-login-2', 'jane@example.com', '2024-01-02T00:00:00.000Z'),
  ('seed-login-3', 'a@b.co', '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
