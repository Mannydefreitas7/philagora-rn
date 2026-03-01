export type DebateStatus = "live" | "done" | "starting_in";

export type DebateCardParticipant = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
};

// Domain entity — mirrors the debate table row shape enriched with status
export type DebateCardItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: DebateStatus;
  startsAt?: string;   // ISO 8601 — set when status is "starting_in"
  startedAt?: string;  // ISO 8601 — set when status is "live" or "done"
  endedAt?: string;    // ISO 8601 — set when status is "done"
  participants: DebateCardParticipant[];
  createdAt: string;
  updatedAt: string;
};

export type DebateCardValues = {
  selectedId: string | null;
};

export type DebateCardResult = {
  error: Error | null;
};
