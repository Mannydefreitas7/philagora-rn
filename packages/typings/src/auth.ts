import { IUser } from "./user";

/**
 * Auth payload shape used by authentication endpoints or client helpers.
 */
export interface IAuthPayload {
  user: IUser;
  token: string;
  expiresAt?: string | number; // ISO string or epoch ms (optional)
}
