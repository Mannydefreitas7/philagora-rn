import type { DebateCardItem } from "./types";

export const debateCardSeeds: DebateCardItem[] = [
  {
    id: "seed-debate-card-1",
    title: "Should AI replace human judges in legal proceedings?",
    description:
      "A deep dive into the ethical, legal, and practical implications of using AI systems to adjudicate court cases and determine sentencing.",
    image: "https://picsum.photos/seed/debate1/600/400",
    status: "live",
    startedAt: new Date(Date.now() - 15 * 60_000).toISOString(),
    participants: [
      { id: "user-1", name: "Alice Martin", username: "alicemartin", avatarUrl: "https://i.pravatar.cc/150?u=user-1" },
      { id: "user-2", name: "Bob Chen", username: "bobchen", avatarUrl: "https://i.pravatar.cc/150?u=user-2" },
      { id: "user-3", name: "Carla Smith", username: "carlasmith", avatarUrl: "https://i.pravatar.cc/150?u=user-3" },
    ],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-debate-card-2",
    title: "Universal Basic Income: Solution or Economic Trap?",
    description:
      "Exploring whether a universal basic income would empower citizens or disincentivize work and strain public finances.",
    image: "https://picsum.photos/seed/debate2/600/400",
    status: "starting_in",
    startsAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    participants: [
      { id: "user-4", name: "David Osei", username: "davidosei", avatarUrl: "https://i.pravatar.cc/150?u=user-4" },
      { id: "user-5", name: "Emma Rousseau", username: "emmarousseau", avatarUrl: "https://i.pravatar.cc/150?u=user-5" },
    ],
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-debate-card-3",
    title: "Is remote work damaging to team culture?",
    description:
      "A completed debate on whether distributed teams can sustain strong culture or if in-person collaboration is irreplaceable.",
    image: "https://picsum.photos/seed/debate3/600/400",
    status: "done",
    startedAt: "2024-01-03T14:00:00.000Z",
    endedAt: "2024-01-03T15:30:00.000Z",
    participants: [
      { id: "user-6", name: "Fatima Ndiaye", username: "fatimandiaye", avatarUrl: "https://i.pravatar.cc/150?u=user-6" },
      { id: "user-7", name: "George Park", username: "georgepark", avatarUrl: "https://i.pravatar.cc/150?u=user-7" },
      { id: "user-8", name: "Hannah Müller", username: "hannahmuller", avatarUrl: "" },
      { id: "user-9", name: "Ivan Torres", username: "ivantorres", avatarUrl: "https://i.pravatar.cc/150?u=user-9" },
      { id: "user-10", name: "Julia Lin", username: "julialin", avatarUrl: "https://i.pravatar.cc/150?u=user-10" },
    ],
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2024-01-03T15:30:00.000Z",
  },
  {
    id: "seed-debate-card-4",
    title: "Nuclear energy: the green solution we keep ignoring?",
    description:
      "Examining whether nuclear power deserves a larger role in the transition away from fossil fuels, given its low carbon output.",
    image: "",
    status: "starting_in",
    startsAt: new Date(Date.now() + 2 * 60 * 60_000).toISOString(),
    participants: [
      { id: "user-11", name: "Kai Nakamura", username: "kainakamura", avatarUrl: "https://i.pravatar.cc/150?u=user-11" },
    ],
    createdAt: "2024-01-04T00:00:00.000Z",
    updatedAt: "2024-01-04T00:00:00.000Z",
  },
];

// SQL seed — paste into Supabase Studio or run via supabase db seed
export const debateCardSeedSQL = `
INSERT INTO debate (id, title, description, image, status, started_at, ended_at, starts_at, created_at, updated_at) VALUES
  ('seed-debate-card-1', 'Should AI replace human judges in legal proceedings?', 'A deep dive into the ethical, legal, and practical implications of using AI systems to adjudicate court cases and determine sentencing.', 'https://picsum.photos/seed/debate1/600/400', 'live', NOW() - INTERVAL '15 minutes', NULL, NULL, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
  ('seed-debate-card-2', 'Universal Basic Income: Solution or Economic Trap?', 'Exploring whether a universal basic income would empower citizens or disincentivize work and strain public finances.', 'https://picsum.photos/seed/debate2/600/400', 'starting_in', NULL, NULL, NOW() + INTERVAL '30 minutes', '2024-01-02T00:00:00.000Z', '2024-01-02T00:00:00.000Z'),
  ('seed-debate-card-3', 'Is remote work damaging to team culture?', 'A completed debate on whether distributed teams can sustain strong culture or if in-person collaboration is irreplaceable.', 'https://picsum.photos/seed/debate3/600/400', 'done', '2024-01-03T14:00:00.000Z', '2024-01-03T15:30:00.000Z', NULL, '2024-01-03T00:00:00.000Z', '2024-01-03T15:30:00.000Z'),
  ('seed-debate-card-4', 'Nuclear energy: the green solution we keep ignoring?', 'Examining whether nuclear power deserves a larger role in the transition away from fossil fuels, given its low carbon output.', '', 'starting_in', NULL, NULL, NOW() + INTERVAL '2 hours', '2024-01-04T00:00:00.000Z', '2024-01-04T00:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
`;
