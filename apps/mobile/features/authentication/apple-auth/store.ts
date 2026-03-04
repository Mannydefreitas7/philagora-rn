import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

import { supabase } from "@/utils/supabase";

import type { AppleAuthResult } from "./types";

type AppleAuthStore = {
	submitting: boolean;
	error: string | null;
	reset: () => void;
	signInWithApple: () => Promise<AppleAuthResult>;
};

export const useAppleAuthStore = create<AppleAuthStore>((set) => ({
	submitting: false,
	error: null,

	reset: () => set({ submitting: false, error: null }),

	signInWithApple: async () => {
		set({ submitting: true, error: null });

		try {
			// Generate a nonce — raw nonce is sent to Supabase, hashed nonce is sent to Apple
			const rawNonce = Crypto.randomUUID();
			const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, rawNonce);

			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
				nonce: hashedNonce,
			});

			if (!credential.identityToken) {
				const error = new Error("Apple did not return an identity token.");
				set({ submitting: false, error: error.message });
				return { error };
			}

			const { error } = await supabase.auth.signInWithIdToken({
				provider: "apple",
				token: credential.identityToken,
				nonce: rawNonce,
			});

			if (error) {
				set({ submitting: false, error: error.message });
				return { error };
			}

			// Apple only provides the full name on the very first sign-in
			if (credential.fullName?.givenName || credential.fullName?.familyName) {
				await supabase.auth.updateUser({
					data: {
						full_name: [credential.fullName.givenName, credential.fullName.familyName].filter(Boolean).join(" "),
						given_name: credential.fullName.givenName,
						family_name: credential.fullName.familyName,
					},
				});
			}

			set({ submitting: false });
			return { error: null };
		} catch (err) {
			// ERR_CANCELED is thrown when the user dismisses the native Apple sign-in sheet
			if ((err as { code?: string }).code === "ERR_CANCELED") {
				set({ submitting: false });
				return { error: null };
			}

			const error = err instanceof Error ? err : new Error(String(err));
			set({ submitting: false, error: error.message });
			return { error };
		}
	},
}));

export default useAppleAuthStore;
