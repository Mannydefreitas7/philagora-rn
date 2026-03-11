import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { create } from "zustand";

import supabase from "@/utils/supabase";

import type { GoogleAuthResult } from "./types";

type GoogleAuthStore = {
  submitting: boolean;
  error?: string;
  reset: () => void;
  signInWithGoogle: () => Promise<GoogleAuthResult>;
};

export const useGoogleAuthStore = create<GoogleAuthStore>((set) => ({
  submitting: false,

  reset: () => set({ submitting: false, error: undefined }),

  signInWithGoogle: async () => {
    set({ submitting: true, error: undefined });

    try {
      const redirectTo = makeRedirectUri({ scheme: "philagora" });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo, skipBrowserRedirect: true },
      });

      if (error || !data.url) {
        const err = error ?? new Error("Google OAuth did not return a URL.");
        set({ submitting: false, error: err.message });
        return { error: err };
      }

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

      // User cancelled or dismissed the browser
      if (result.type !== "success") {
        set({ submitting: false });
        return { error: null };
      }

      // Extract tokens from the URL fragment
      const url = new URL(result.url);
      const params = new URLSearchParams(url.hash.slice(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (!accessToken || !refreshToken) {
        const err = new Error("Google OAuth did not return valid tokens.");
        set({ submitting: false, error: err.message });
        return { error: err };
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        set({ submitting: false, error: sessionError.message });
        return { error: sessionError };
      }

      set({ submitting: false });
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      set({ submitting: false, error: error.message });
      return { error };
    }
  },
}));

export default useGoogleAuthStore;
