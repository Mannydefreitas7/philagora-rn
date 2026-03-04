export type LikeKey = string;

// Domain entity — mirrors the debate_likes table row shape
export type LikeItem = {
  id: string;
  debateId: string;
  userId: string;
  like: boolean;
  createdAt: string;
};

// Input values for like operations
export type LikeValues = {
  debateId: string;
  userId: string;
};

// Result type for async store actions
export type LikeResult = {
  error: Error | null;
  like: boolean;
};
