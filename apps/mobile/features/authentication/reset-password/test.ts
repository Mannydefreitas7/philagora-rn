import { act, renderHook } from "@testing-library/react-native";

jest.mock("expo-constants", () => ({
  expoConfig: { scheme: "mobile" },
}));

jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn(),
    },
  },
}));

import { supabase } from "@/utils/supabase";
import useResetPasswordStore from "./store";

const mockResetPasswordForEmail = supabase.auth.resetPasswordForEmail as jest.Mock;

describe("reset-password feature store", () => {
  beforeEach(() => {
    mockResetPasswordForEmail.mockReset();
    useResetPasswordStore.getState().clear();
  });

  it("rejects empty email", async () => {
    const { result } = renderHook(() => useResetPasswordStore());

    await act(async () => {
      const response = await result.current.reset();
      expect(response.error).toBeTruthy();
    });

    expect(mockResetPasswordForEmail).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Email is required.");
    expect(result.current.sent).toBe(false);
  });

  it("calls resetPasswordForEmail with normalized email and redirect", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useResetPasswordStore());

    act(() => {
      result.current.setEmail("  USER@EXAMPLE.COM ");
    });

    await act(async () => {
      const response = await result.current.reset();
      expect(response.error).toBeNull();
    });

    const redirectTo = result.current.resetPasswordRedirectTo;
    expect(redirectTo).toContain("reset-password");
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("user@example.com", {
      redirectTo,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.sent).toBe(true);
  });

  it("stores provider error on failure", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: { message: "Rate limit exceeded" } });
    const { result } = renderHook(() => useResetPasswordStore());

    act(() => {
      result.current.setEmail("user@example.com");
    });

    await act(async () => {
      const response = await result.current.reset();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Rate limit exceeded");
    expect(result.current.sent).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});
