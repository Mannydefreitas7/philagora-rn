import { IUser } from "./user";

/**
 * Auth payload shape used by authentication endpoints or client helpers.
 */
export interface IAuthState {
  // authentication token (if any)
  token: string | null;
  // convenience flows
  login: (user: IUser, token: string) => void;
  logout: () => void;
  expiresAt?: string | number; // ISO string or epoch ms (optional)
  setToken: (token: string | null) => void;
  // derived boolean indicating whether the session is considered logged in
  isLoggedIn: boolean;
}
