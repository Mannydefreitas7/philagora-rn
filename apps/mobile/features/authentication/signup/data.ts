import type { SignupItem } from "./types";

export const signupSeeds: SignupItem[] = [
  { id: "seed-signup-1", email: "john@smith.com", fullName: "John Smith", createdAt: "2024-01-01T00:00:00.000Z" },
  { id: "seed-signup-2", email: "jane@example.com", fullName: "Jane Example", createdAt: "2024-01-02T00:00:00.000Z" },
  { id: "seed-signup-3", email: "a@b.co", fullName: "A B", createdAt: "2024-01-03T00:00:00.000Z" },
];

export const signupSeedSQL = `
INSERT INTO auth.users (id, email, raw_user_meta_data, created_at) VALUES
  ('seed-signup-1', 'john@smith.com', '{"full_name":"John Smith"}', '2024-01-01T00:00:00.000Z'),
  ('seed-signup-2', 'jane@example.com', '{"full_name":"Jane Example"}', '2024-01-02T00:00:00.000Z'),
  ('seed-signup-3', 'a@b.co', '{"full_name":"A B"}', '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
