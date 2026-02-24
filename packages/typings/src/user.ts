/**
 * Basic user shape. Extend as needed across your apps.
 */
export interface IUser {
  id: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  roles?: string[];
  // Allow extra properties for forward/third-party fields
  [key: string]: any;
}

/** A convenience alias for a partial user patch. */
export type TPartialUser = Partial<IUser>;

/**
 * Shape of the client-side user/auth store state and actions.
 *
 * This mirrors the store used in the mobile app but intentionally keeps only
 * serializable types and simple callbacks to avoid coupling with a specific
 * state manager implementation.
 */
export interface IUserState {
  // current authenticated user (null when not authenticated)
  user: IUser | null;
  // setters / actions
  setUser: (user: IUser | null) => void;
  updateUser: (patch: TPartialUser) => void;
  clearUser: () => void;
  // optional helpers that implementations may provide
  hasRole?: (role: string) => boolean;
}
