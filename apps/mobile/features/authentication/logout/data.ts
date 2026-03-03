import type { LogoutItem } from "./types";

export const logoutSeeds: LogoutItem[] = [
  { id: "seed-logout-1", userId: "user-1", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "seed-logout-2", userId: "user-2", createdAt: "2024-01-02T00:00:00.000Z" },
  { id: "seed-logout-3", userId: "user-3", createdAt: "2024-01-03T00:00:00.000Z" },
];

export const logoutSeedSQL = `
INSERT INTO auth.sessions (id, user_id, created_at) VALUES
  ('seed-logout-1', 'user-1', '2024-01-01T00:00:00.000Z'),
  ('seed-logout-2', 'user-2', '2024-01-02T00:00:00.000Z'),
  ('seed-logout-3', 'user-3', '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
