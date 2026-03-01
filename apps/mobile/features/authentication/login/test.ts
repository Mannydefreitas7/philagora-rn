import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

import { supabase } from "@/utils/supabase";
import { loginSeeds } from "./data";
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
      result.current.setField("email", loginSeeds[0].email);
      result.current.setField("password", "secret123");
    });

    expect(result.current.values.email).toBe(loginSeeds[0].email);
    expect(result.current.values.password).toBe("secret123");
  });

  it("logs in with trimmed email", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useLoginStore());

    act(() => {
      result.current.setField("email", `  ${loginSeeds[0].email} `);
      result.current.setField("password", "secret123");
    });

    await act(async () => {
      const response = await result.current.login();
      expect(response.error).toBeNull();
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: loginSeeds[0].email,
      password: "secret123",
    });
    expect(result.current.error).toBeNull();
    expect(result.current.submitting).toBe(false);
  });

  it("stores submit error when supabase rejects", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: { message: "Invalid login credentials" } });
    const { result } = renderHook(() => useLoginStore());

    act(() => {
      result.current.setField("email", loginSeeds[0].email);
      result.current.setField("password", "wrong");
    });

    await act(async () => {
      const response = await result.current.login();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Invalid login credentials");
    expect(result.current.submitting).toBe(false);
  });
});
