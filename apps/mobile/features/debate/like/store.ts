import { create } from "zustand";

import supabase from "@/utils/supabase";
import type { LikeKey, LikeResult } from "./types";

function buildKey(debateId: string, userId: string): LikeKey {
  return `${debateId}:${userId}`;
}

type DebateLikeStore = {
  likes: Record<LikeKey, boolean>;
  loadingByKey: Record<LikeKey, boolean>;
  errorByKey: Record<LikeKey, string | null>;
  getLike: (debateId: string, userId: string) => boolean;
  getLoading: (debateId: string, userId: string) => boolean;
  getError: (debateId: string, userId: string) => string | null;
  reset: () => void;
  setLike: (debateId: string, userId: string, like: boolean) => void;
  toggleLike: (debateId: string, userId: string) => Promise<LikeResult>;
};

export const useDebateLikeStore = create<DebateLikeStore>((set, get) => ({
  likes: {},
  loadingByKey: {},
  errorByKey: {},
  reset: () => {
    set({ likes: {}, loadingByKey: {}, errorByKey: {} });
  },
  getLike: (debateId, userId) => {
    const key = buildKey(debateId, userId);
    return get().likes[key] ?? false;
  },
  getLoading: (debateId, userId) => {
    const key = buildKey(debateId, userId);
    return get().loadingByKey[key] ?? false;
  },
  getError: (debateId, userId) => {
    const key = buildKey(debateId, userId);
    return get().errorByKey[key] ?? null;
  },
  setLike: (debateId, userId, like) => {
    const key = buildKey(debateId, userId);
    set((state) => ({
      likes: {
        ...state.likes,
        [key]: like,
      },
      errorByKey: {
        ...state.errorByKey,
        [key]: null,
      },
    }));
  },
  toggleLike: async (debateId, userId) => {
    const key = buildKey(debateId, userId);
    const currentLike = get().likes[key] ?? false;
    const nextLike = !currentLike;

    set((state) => ({
      likes: {
        ...state.likes,
        [key]: nextLike,
      },
      loadingByKey: {
        ...state.loadingByKey,
        [key]: true,
      },
      errorByKey: {
        ...state.errorByKey,
        [key]: null,
      },
    }));

    const { error } = await supabase.from("debate_likes").upsert(
      {
        debate_id: debateId,
        user_id: userId,
        like: nextLike,
      },
      {
        onConflict: "debate_id,user_id",
      },
    );

    if (error) {
      set((state) => ({
        likes: {
          ...state.likes,
          [key]: currentLike,
        },
        loadingByKey: {
          ...state.loadingByKey,
          [key]: false,
        },
        errorByKey: {
          ...state.errorByKey,
          [key]: error.message,
        },
      }));
      return { error, like: currentLike };
    }

    set((state) => ({
      loadingByKey: {
        ...state.loadingByKey,
        [key]: false,
      },
      errorByKey: {
        ...state.errorByKey,
        [key]: null,
      },
    }));

    return { error: null, like: nextLike };
  },
}));

export default useDebateLikeStore;
