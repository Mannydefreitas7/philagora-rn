export type LogoutItem = {
  id: string;
  userId: string;
  createdAt: string;
};

export type LogoutResult = {
  error: Error | null;
};
