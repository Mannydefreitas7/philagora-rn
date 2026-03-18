import { act, renderHook } from "@testing-library/react-native";

// Mock expo-crypto BEFORE importing the store
jest.mock("expo-crypto", () => ({
  randomUUID: jest.fn(() => "test-raw-nonce"),
  digestStringAsync: jest.fn(() => Promise.resolve("hashed-nonce")),
  CryptoDigestAlgorithm: { SHA256: "SHA-256" },
}));

// Mock expo-apple-authentication BEFORE importing the store
jest.mock("expo-apple-authentication", () => ({
  signInAsync: jest.fn(),
  AppleAuthenticationScope: {
    FULL_NAME: "full-name",
    EMAIL: "email",
  },
}));

// Mock Supabase BEFORE importing the store
jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      signInWithIdToken: jest.fn(),
      updateUser: jest.fn(),
    },
  },
}));

import * as AppleAuthentication from "expo-apple-authentication";

import supabase from "@/utils/supabase";
import { appleAuthSeeds } from "./data";
import useAppleAuthStore from "./store";

const mockSignInAsync = AppleAuthentication.signInAsync as jest.Mock;
const mockSignInWithIdToken = supabase.auth.signInWithIdToken as jest.Mock;
const mockUpdateUser = supabase.auth.updateUser as jest.Mock;

describe("apple-auth feature store", () => {
  beforeEach(() => {
    mockSignInAsync.mockReset();
    mockSignInWithIdToken.mockReset();
    mockUpdateUser.mockReset();
    useAppleAuthStore.getState().reset();
  });

  it("signs in successfully without updating full name on repeat sign-in", async () => {
    mockSignInAsync.mockResolvedValueOnce({
      identityToken: "mock-identity-token",
      fullName: { givenName: null, familyName: null },
    });
    mockSignInWithIdToken.mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => useAppleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithApple();
      expect(response.error).toBeNull();
    });

    expect(mockSignInWithIdToken).toHaveBeenCalledWith({
      provider: "apple",
      token: "mock-identity-token",
      nonce: "test-raw-nonce",
    });
    expect(mockUpdateUser).not.toHaveBeenCalled();
    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("saves full name to user metadata on first sign-in", async () => {
    const seed = appleAuthSeeds[0];
    mockSignInAsync.mockResolvedValueOnce({
      identityToken: "mock-identity-token",
      fullName: { givenName: seed.givenName, familyName: seed.familyName },
    });
    mockSignInWithIdToken.mockResolvedValueOnce({ error: null });
    mockUpdateUser.mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => useAppleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithApple();
      expect(response.error).toBeNull();
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({
      data: {
        full_name: `${seed.givenName} ${seed.familyName}`,
        given_name: seed.givenName,
        family_name: seed.familyName,
      },
    });
    expect(result.current.submitting).toBe(false);
  });

  it("stores error message when Supabase sign-in fails", async () => {
    mockSignInAsync.mockResolvedValueOnce({
      identityToken: "mock-identity-token",
      fullName: { givenName: null, familyName: null },
    });
    mockSignInWithIdToken.mockResolvedValueOnce({
      error: { message: "Invalid identity token" },
    });

    const { result } = renderHook(() => useAppleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithApple();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Invalid identity token");
    expect(result.current.submitting).toBe(false);
  });

  it("clears submitting state without error when user cancels the Apple sign-in sheet", async () => {
    const cancelError = Object.assign(new Error("canceled"), {
      code: "ERR_CANCELED",
    });
    mockSignInAsync.mockRejectedValueOnce(cancelError);

    const { result } = renderHook(() => useAppleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithApple();
      expect(response.error).toBeNull();
    });

    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("stores error message when Apple throws an unexpected error", async () => {
    mockSignInAsync.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAppleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithApple();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.submitting).toBe(false);
  });
});
