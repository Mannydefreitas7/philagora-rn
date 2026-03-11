import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { create } from "zustand";

import type { TikTokAuthResult } from "./types";

const TIKTOK_AUTH_URL = "https://www.tiktok.com/v2/auth/authorize";
const TIKTOK_SCOPE = "user.info.basic,user.info.profile";

type TikTokAuthStore = {
  submitting: boolean;
  error?: string;
  reset: () => void;
  signInWithTikTok: () => Promise<TikTokAuthResult>;
};

/** Base64-URL encode a Uint8Array without padding. */
function base64UrlEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Generate a PKCE code verifier (43–128 random chars). */
function generateCodeVerifier(): string {
  const bytes = Crypto.getRandomBytes(32);
  return base64UrlEncode(bytes);
}

/** Derive the PKCE code challenge (S256) from a verifier. */
async function generateCodeChallenge(verifier: string): Promise<string> {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    verifier,
    { encoding: Crypto.CryptoEncoding.BASE64 },
  );
  // digestStringAsync returns standard base64; convert to base64url
  return hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export const useTikTokAuthStore = create<TikTokAuthStore>((set) => ({
  submitting: false,

  reset: () => set({ submitting: false, error: undefined }),

  signInWithTikTok: async () => {
    set({ submitting: true, error: undefined });

    try {
      const redirectTo = makeRedirectUri({ scheme: "philagora" });
      const state = Crypto.randomUUID();
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const clientKey = process.env.EXPO_PUBLIC_TIKTOK_CLIENT_KEY;
      if (!clientKey) {
        const err = new Error("Missing EXPO_PUBLIC_TIKTOK_CLIENT_KEY.");
        set({ submitting: false, error: err.message });
        return { error: err };
      }

      const params = new URLSearchParams({
        client_key: clientKey,
        scope: TIKTOK_SCOPE,
        response_type: "code",
        redirect_uri: redirectTo,
        state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      });

      const authUrl = `${TIKTOK_AUTH_URL}?${params.toString()}`;
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectTo);

      // User cancelled or dismissed the browser
      if (result.type !== "success") {
        set({ submitting: false });
        return { error: null };
      }

      const url = new URL(result.url);
      const code = url.searchParams.get("code");
      const returnedState = url.searchParams.get("state");

      if (!code) {
        const err = new Error("TikTok OAuth did not return an authorization code.");
        set({ submitting: false, error: err.message });
        return { error: err };
      }

      if (returnedState !== state) {
        const err = new Error("TikTok OAuth state mismatch. Possible CSRF attack.");
        set({ submitting: false, error: err.message });
        return { error: err };
      }

      // TODO: exchange `code` + `codeVerifier` for an access token via a
      // server-side endpoint (Supabase Edge Function or custom API) because
      // the TikTok token exchange requires the client secret which must not
      // be embedded in the app bundle.
      // Example:
      //   const { error } = await supabase.functions.invoke("tiktok-token-exchange", {
      //     body: { code, codeVerifier, redirectUri: redirectTo },
      //   });

      set({ submitting: false });
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      set({ submitting: false, error: error.message });
      return { error };
    }
  },
}));

export default useTikTokAuthStore;
