import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/utils/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({ upsert: jest.fn() })),
  },
}));

import { supabase } from "@/utils/supabase";
import { likeSeeds } from "./data";
import useDebateLikeStore from "./store";

const mockFrom = supabase.from as jest.Mock;

describe("debate like feature store", () => {
  const debateId = likeSeeds[0].debateId;
  const userId = likeSeeds[0].userId;

  beforeEach(() => {
    mockFrom.mockReset();
    useDebateLikeStore.getState().reset();
  });

  it("toggles like on and persists to database", async () => {
    const upsertMock = jest.fn().mockResolvedValueOnce({ error: null });
    mockFrom.mockReturnValue({ upsert: upsertMock });
    const { result } = renderHook(() => useDebateLikeStore());

    await act(async () => {
      const response = await result.current.toggleLike(debateId, userId);
      expect(response.like).toBe(true);
      expect(response.error).toBeNull();
    });

    expect(mockFrom).toHaveBeenCalledWith("debate_likes");
    expect(upsertMock).toHaveBeenCalledWith(
      {
        debate_id: debateId,
        user_id: userId,
        like: true,
      },
      { onConflict: "debate_id,user_id" },
    );
    expect(result.current.getLike(debateId, userId)).toBe(true);
    expect(result.current.getLoading(debateId, userId)).toBe(false);
  });

  it("reverts like state when database write fails", async () => {
    const upsertMock = jest.fn().mockResolvedValueOnce({ error: { message: "write failed" } });
    mockFrom.mockReturnValue({ upsert: upsertMock });
    const { result } = renderHook(() => useDebateLikeStore());

    await act(async () => {
      const response = await result.current.toggleLike(debateId, userId);
      expect(response.like).toBe(false);
      expect(response.error).toBeTruthy();
    });

    expect(result.current.getLike(debateId, userId)).toBe(false);
    expect(result.current.getError(debateId, userId)).toBe("write failed");
    expect(result.current.getLoading(debateId, userId)).toBe(false);
  });
});
