import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

import { supabase } from "@/utils/supabase";
import useSignupStore from "./store";

const mockSignUp = supabase.auth.signUp as jest.Mock;

describe("signup feature store", () => {
  beforeEach(() => {
    mockSignUp.mockReset();
    useSignupStore.getState().reset();
  });

  it("updates signup form fields", () => {
    const { result } = renderHook(() => useSignupStore());

    act(() => {
      result.current.setField("email", "john@smith.com");
      result.current.setField("password", "secret123");
      result.current.setField("confirm", "secret123");
      result.current.setField("fullName", "John Smith");
    });

    expect(result.current.values).toEqual({
      email: "john@smith.com",
      password: "secret123",
      confirm: "secret123",
      fullName: "John Smith",
    });
  });

  it("calls signUp with trimmed values", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useSignupStore());

    act(() => {
      result.current.setField("email", "  john@smith.com ");
      result.current.setField("password", "secret123");
      result.current.setField("confirm", "secret123");
      result.current.setField("fullName", "  John Smith ");
    });

    await act(async () => {
      const response = await result.current.signup();
      expect(response.error).toBeNull();
    });

    expect(mockSignUp).toHaveBeenCalledWith({
      email: "john@smith.com",
      password: "secret123",
      options: {
        data: {
          full_name: "John Smith",
        },
      },
    });
    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("stores submit error from signUp", async () => {
    mockSignUp.mockResolvedValueOnce({ error: { message: "User already registered" } });
    const { result } = renderHook(() => useSignupStore());

    act(() => {
      result.current.setField("email", "john@smith.com");
      result.current.setField("password", "secret123");
      result.current.setField("confirm", "secret123");
      result.current.setField("fullName", "John Smith");
    });

    await act(async () => {
      const response = await result.current.signup();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("User already registered");
    expect(result.current.submitting).toBe(false);
  });
});
