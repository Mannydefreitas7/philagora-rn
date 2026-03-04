import type { ResetPasswordItem } from "./types";

export const resetPasswordSeeds: ResetPasswordItem[] = [
	{
		id: "seed-reset-password-1",
		email: "john@smith.com",
		redirectTo: "mobile://reset-password",
		createdAt: "2024-01-01T00:00:00.000Z",
	},
	{
		id: "seed-reset-password-2",
		email: "jane@example.com",
		redirectTo: "mobile://reset-password",
		createdAt: "2024-01-02T00:00:00.000Z",
	},
	{
		id: "seed-reset-password-3",
		email: "a@b.co",
		redirectTo: "mobile://reset-password",
		createdAt: "2024-01-03T00:00:00.000Z",
	},
];

export const resetPasswordSeedSQL = `
INSERT INTO auth.users (id, email, created_at) VALUES
  ('seed-reset-password-1', 'john@smith.com', '2024-01-01T00:00:00.000Z'),
  ('seed-reset-password-2', 'jane@example.com', '2024-01-02T00:00:00.000Z'),
  ('seed-reset-password-3', 'a@b.co', '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
