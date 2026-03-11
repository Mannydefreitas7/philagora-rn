import { act, renderHook } from "@testing-library/react-native";

// Mock expo-crypto BEFORE importing the store
jest.mock("expo-crypto", () => ({
  getRandomBytes: jest.fn(() => new Uint8Array(32).fill(1)),
  randomUUID: jest.fn(() => "test-state-uuid"),
  digestStringAsync: jest.fn(() => Promise.resolve("mock-code-challenge==")),
  CryptoDigestAlgorithm: { SHA256: "SHA-256" },
  CryptoEncoding: { BASE64: "base64" },
}));

// Mock expo-auth-session BEFORE importing the store
jest.mock("expo-auth-session", () => ({
  makeRedirectUri: jest.fn(() => "philagora://"),
}));

// Mock expo-web-browser BEFORE importing the store
jest.mock("expo-web-browser", () => ({
  openAuthSessionAsync: jest.fn(),
}));

import * as WebBrowser from "expo-web-browser";

import useTikTokAuthStore from "./store";

const mockOpenAuthSessionAsync = WebBrowser.openAuthSessionAsync as jest.Mock;

const MOCK_REDIRECT = "philagora://";
const MOCK_STATE = "test-state-uuid";
const MOCK_CODE = "tiktok_auth_code_abc123";

describe("tiktok-auth feature store", () => {
  beforeEach(() => {
    mockOpenAuthSessionAsync.mockReset();
    useTikTokAuthStore.getState().reset();
    process.env.EXPO_PUBLIC_TIKTOK_CLIENT_KEY = "test-client-key";
  });

  afterEach(() => {
    delete process.env.EXPO_PUBLIC_TIKTOK_CLIENT_KEY;
  });

  it("completes OAuth flow and returns no error on success", async () => {
    mockOpenAuthSessionAsync.mockResolvedValueOnce({
      type: "success",
      url: `${MOCK_REDIRECT}?code=${MOCK_CODE}&state=${MOCK_STATE}`,
    });

    const { result } = renderHook(() => useTikTokAuthStore());

    await act(async () => {
      const response = await result.current.signInWithTikTok();
      expect(response.error).toBeNull();
    });

    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("clears submitting state without error when user cancels the browser", async () => {
    mockOpenAuthSessionAsync.mockResolvedValueOnce({ type: "cancel" });

    const { result } = renderHook(() => useTikTokAuthStore());

    await act(async () => {
      const response = await result.current.signInWithTikTok();
      expect(response.error).toBeNull();
    });

    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("stores error when the redirect URL contains no auth code", async () => {
    mockOpenAuthSessionAsync.mockResolvedValueOnce({
      type: "success",
      url: `${MOCK_REDIRECT}?state=${MOCK_STATE}`, // missing `code`
    });

    const { result } = renderHook(() => useTikTokAuthStore());

    await act(async () => {
      const response = await result.current.signInWithTikTok();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toMatch(/authorization code/i);
    expect(result.current.submitting).toBe(false);
  });

  it("stores error when the returned state does not match (CSRF guard)", async () => {
    mockOpenAuthSessionAsync.mockResolvedValueOnce({
      type: "success",
      url: `${MOCK_REDIRECT}?code=${MOCK_CODE}&state=tampered-state`,
    });

    const { result } = renderHook(() => useTikTokAuthStore());

    await act(async () => {
      const response = await result.current.signInWithTikTok();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toMatch(/state mismatch/i);
    expect(result.current.submitting).toBe(false);
  });

  it("stores error when EXPO_PUBLIC_TIKTOK_CLIENT_KEY is missing", async () => {
    delete process.env.EXPO_PUBLIC_TIKTOK_CLIENT_KEY;

    const { result } = renderHook(() => useTikTokAuthStore());

    await act(async () => {
      const response = await result.current.signInWithTikTok();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toMatch(/TIKTOK_CLIENT_KEY/i);
    expect(result.current.submitting).toBe(false);
  });

  it("stores error message when an unexpected error is thrown", async () => {
    mockOpenAuthSessionAsync.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useTikTokAuthStore());

    await act(async () => {
      const response = await result.current.signInWithTikTok();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.submitting).toBe(false);
  });
});
