/**
 * philagora/apps/mobile/stores/userStore.ts
 *
 * Zustand user store for the mobile app.
 *
 * This store keeps the current authenticated user and token, and provides
 * small helper actions for common user-related flows.
 *
 * Usage:
 *   const user = useUserStore(state => state.user)
 *   const login = useUserStore(state => state.login)
 *
 * Notes:
 * - Keep this file dependency-free (no persistence) so it works regardless of
 *   project middleware/version differences. If you want persistence (AsyncStorage),
 *   wrap the store with `persist` from 'zustand/middleware' in a follow-up change.
 */

import type { IUser, IUserState } from "@repo/typings";
import { create } from "zustand";

/**
 * Create the Zustand store hook.
 */
export const useUserStore = create<IUserState>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  setUser: (user) => {
    const token = get().token;
    set({
      user,
      isLoggedIn: Boolean(user) || Boolean(token),
    });
  },

  updateUser: (patch) => {
    set((state) => {
      const current = state.user ?? {};
      const updated = { ...current, ...patch } as IUser;
      return {
        user: updated,
        // if we have some user object or token, consider logged-in
        isLoggedIn: Boolean(updated) || Boolean(state.token),
      };
    });
  },

  setToken: (token) => {
    const user = get().user;
    set({
      token,
      isLoggedIn: Boolean(user) || Boolean(token),
    });
  },

  login: (user, token) => {
    set({
      user,
      token,
      isLoggedIn: true,
    });
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },

  clearUser: () => {
    // alias for logout
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },
}));

export default useUserStore;
