import type { IUser } from "@repo/typings";
import type { Session, User } from "@supabase/supabase-js";
import Constants from "expo-constants";
import * as ExpoLinking from "expo-linking";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSessionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import supabase from "@/utils/supabase";

function mapUser(user: User): IUser {
  return {
    id: user.id,
    email: user.email ?? undefined,
    name: (user.user_metadata?.full_name as string | undefined) ?? (user.user_metadata?.name as string | undefined),
  };
}

export function useSupabaseAuth() {
  const setToken = useSessionStore((state) => state.setToken);
  const logout = useSessionStore((state) => state.logout);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const configScheme = Constants.expoConfig?.scheme;
  const scheme = typeof configScheme === "string" ? configScheme : (configScheme?.[0] ?? "mobile");
  const resetPasswordRedirectTo = useMemo(() => ExpoLinking.createURL("reset-password", { scheme }), [scheme]);

  const [initializing, setInitializing] = useState(true);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    logout()
    clearUser();
  }, [clearUser, logout]);

  const resetPassword = useCallback(
    async (email: string) => {
      setResetPasswordError(null);
      setResetPasswordSent(false);

      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        setResetPasswordError("Email is required.");
        return { error: new Error("Email is required.") };
      }

      setResetPasswordLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: resetPasswordRedirectTo,
      });

      setResetPasswordLoading(false);

      if (error) {
        setResetPasswordError(error.message);
        return { error };
      }

      setResetPasswordSent(true);
      return { error: null };
    },
    [resetPasswordRedirectTo],
  );

  const applySession = (session: Session | null) => {
    if (session?.access_token) {
      setToken(session.access_token);
    } else {
      logout();
    }

    if (session?.user) {
      setUser(mapUser(session.user));
    } else {
      clearUser();
    }
  };

  const startSession = useCallback(async (isMounted: boolean) => {
    const { data } = await supabase.auth.getSession();
    if (!isMounted) return;
    applySession(data.session ?? null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    startSession(isMounted).finally(() => {
      if (isMounted) setInitializing(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      applySession(session ?? null);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [clearUser, logout, setToken, setUser]);

  return useMemo(
    () => ({
      signOut,
      initializing,
      resetPassword,
      resetPasswordLoading,
      resetPasswordError,
      resetPasswordSent,
      resetPasswordRedirectTo,
    }),
    [initializing, resetPassword, resetPasswordError, resetPasswordLoading, resetPasswordRedirectTo, resetPasswordSent],
  );
}

export default useSupabaseAuth;
