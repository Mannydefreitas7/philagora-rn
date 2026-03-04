import type { LikeItem } from "./types";

export const likeSeeds: LikeItem[] = [
	{
		id: "seed-like-1",
		debateId: "seed-debate-card-1",
		userId: "user-1",
		like: true,
		createdAt: "2024-01-01T00:00:00.000Z",
	},
	{
		id: "seed-like-2",
		debateId: "seed-debate-card-2",
		userId: "user-1",
		like: false,
		createdAt: "2024-01-02T00:00:00.000Z",
	},
	{
		id: "seed-like-3",
		debateId: "seed-debate-card-1",
		userId: "user-2",
		like: true,
		createdAt: "2024-01-03T00:00:00.000Z",
	},
];

export const likeSeedSQL = `
INSERT INTO debate_likes (id, debate_id, user_id, like, created_at) VALUES
  ('seed-like-1', 'seed-debate-card-1', 'user-1', true, '2024-01-01T00:00:00.000Z'),
  ('seed-like-2', 'seed-debate-card-2', 'user-1', false, '2024-01-02T00:00:00.000Z'),
  ('seed-like-3', 'seed-debate-card-1', 'user-2', true, '2024-01-03T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
