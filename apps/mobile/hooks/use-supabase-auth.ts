import { useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

import useSessionStore from "@/stores/session";
import useUserStore from "@/stores/user";
import { supabase } from "@/utils/supabase";
import type { IUser } from "@repo/typings";

function mapUser(user: User): IUser {
  return {
    id: user.id,
    email: user.email ?? undefined,
    name:
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined),
  };
}

export function useSupabaseAuth() {
  const setToken = useSessionStore((state) => state.setToken);
  const logout = useSessionStore((state) => state.logout);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

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

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        applySession(data.session ?? null);
      })
      .finally(() => {
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
      initializing,
    }),
    [initializing],
  );
}

export default useSupabaseAuth;
