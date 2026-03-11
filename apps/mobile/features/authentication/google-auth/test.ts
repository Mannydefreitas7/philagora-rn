import { act, renderHook } from "@testing-library/react-native";

// Mock expo-auth-session BEFORE importing the store
jest.mock("expo-auth-session", () => ({
  makeRedirectUri: jest.fn(() => "philagora://"),
}));

// Mock expo-web-browser BEFORE importing the store
jest.mock("expo-web-browser", () => ({
  openAuthSessionAsync: jest.fn(),
}));

// Mock Supabase BEFORE importing the store
jest.mock("@/utils/supabase", () => ({
  __esModule: true,
  default: {
    auth: {
      signInWithOAuth: jest.fn(),
      setSession: jest.fn(),
    },
  },
}));

import * as WebBrowser from "expo-web-browser";

import supabase from "@/utils/supabase";
import { googleAuthSeeds } from "./data";
import useGoogleAuthStore from "./store";

const mockSignInWithOAuth = supabase.auth.signInWithOAuth as jest.Mock;
const mockSetSession = supabase.auth.setSession as jest.Mock;
const mockOpenAuthSessionAsync = WebBrowser.openAuthSessionAsync as jest.Mock;

describe("google-auth feature store", () => {
  beforeEach(() => {
    mockSignInWithOAuth.mockReset();
    mockSetSession.mockReset();
    mockOpenAuthSessionAsync.mockReset();
    useGoogleAuthStore.getState().reset();
  });

  it("signs in successfully via Google OAuth", async () => {
    const seed = googleAuthSeeds[0]!;
    mockSignInWithOAuth.mockResolvedValueOnce({
      data: { url: "https://accounts.google.com/oauth/authorize" },
      error: null,
    });
    mockOpenAuthSessionAsync.mockResolvedValueOnce({
      type: "success",
      url: `philagora://#access_token=mock-access&refresh_token=mock-refresh`,
    });
    mockSetSession.mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => useGoogleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithGoogle();
      expect(response.error).toBeNull();
    });

    expect(mockSetSession).toHaveBeenCalledWith({
      access_token: "mock-access",
      refresh_token: "mock-refresh",
    });
    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();

    // Suppress unused variable warning — seed is used to document the expected user shape
    void seed;
  });

  it("clears submitting state without error when user cancels the browser", async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({
      data: { url: "https://accounts.google.com/oauth/authorize" },
      error: null,
    });
    mockOpenAuthSessionAsync.mockResolvedValueOnce({ type: "cancel" });

    const { result } = renderHook(() => useGoogleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithGoogle();
      expect(response.error).toBeNull();
    });

    expect(mockSetSession).not.toHaveBeenCalled();
    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("stores error message when Supabase OAuth initiation fails", async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({
      data: { url: null },
      error: { message: "OAuth provider error" },
    });

    const { result } = renderHook(() => useGoogleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithGoogle();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("OAuth provider error");
    expect(result.current.submitting).toBe(false);
  });

  it("stores error message when setSession fails after successful OAuth", async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({
      data: { url: "https://accounts.google.com/oauth/authorize" },
      error: null,
    });
    mockOpenAuthSessionAsync.mockResolvedValueOnce({
      type: "success",
      url: `philagora://#access_token=mock-access&refresh_token=mock-refresh`,
    });
    mockSetSession.mockResolvedValueOnce({ error: { message: "Invalid session" } });

    const { result } = renderHook(() => useGoogleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithGoogle();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Invalid session");
    expect(result.current.submitting).toBe(false);
  });

  it("stores error message when an unexpected error is thrown", async () => {
    mockSignInWithOAuth.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useGoogleAuthStore());

    await act(async () => {
      const response = await result.current.signInWithGoogle();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.submitting).toBe(false);
  });
});
