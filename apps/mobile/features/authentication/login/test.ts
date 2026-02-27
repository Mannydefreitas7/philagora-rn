import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

import { supabase } from "@/utils/supabase";
import useLoginStore from "./store";

const mockSignInWithPassword = supabase.auth.signInWithPassword as jest.Mock;

describe("login feature store", () => {
  beforeEach(() => {
    mockSignInWithPassword.mockReset();
    useLoginStore.getState().reset();
  });

  it("updates form fields", () => {
    const { result } = renderHook(() => useLoginStore());

    act(() => {
      result.current.setField("email", "john@smith.com");
      result.current.setField("password", "secret123");
    });

    expect(result.current.values.email).toBe("john@smith.com");
    expect(result.current.values.password).toBe("secret123");
  });

  it("logs in with trimmed email", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useLoginStore());

    act(() => {
      result.current.setField("email", "  john@smith.com ");
      result.current.setField("password", "secret123");
    });

    await act(async () => {
      const response = await result.current.login();
      expect(response.error).toBeNull();
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "john@smith.com",
      password: "secret123",
    });
    expect(result.current.submitError).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("stores submit error when supabase rejects", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: { message: "Invalid login credentials" } });
    const { result } = renderHook(() => useLoginStore());

    act(() => {
      result.current.setField("email", "john@smith.com");
      result.current.setField("password", "wrong");
    });

    await act(async () => {
      const response = await result.current.login();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.submitError).toBe("Invalid login credentials");
    expect(result.current.loading).toBe(false);
  });
});
