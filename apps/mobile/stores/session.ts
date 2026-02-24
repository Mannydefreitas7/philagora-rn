import { IAuthState } from "@/types/auth";
import type {} from "@repo/typings";
import { create } from "zustand";
/**
 * Create the Zustand store hook.
 */
export const useSessionStore = create<IAuthState>((set, get) => ({
  token: null,
  isLoggedIn: false,

  setToken: (token) => {
    set({
      token,
      isLoggedIn: Boolean(token),
    });
  },

  login: (user, token) => {
    set({
      token,
      isLoggedIn: true,
    });
  },

  logout: () => {
    set({
      token: null,
      isLoggedIn: false,
    });
  },
}));

export default useSessionStore;
