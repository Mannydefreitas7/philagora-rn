/**
 * @file test.ts — Jest unit tests for this feature's Zustand-X store.
 *
 * RULES (enforced, no exceptions):
 * - `jest.mock(...)` calls MUST appear before any import of the mocked module.
 *   Hoisting order: jest.mock → imports → test code.
 * - Always reset mocks AND store state in `beforeEach` — tests must be independent.
 * - Reset store via `use<Feature>Store.set("reset")` (zustand-x action call).
 * - Cover all three paths for every async action: field update, success, error.
 * - Use `await act(async () => ...)` for async store actions.
 * - Import seed data from `./data` (`<feature>Seeds[0]`) — never inline raw values in tests.
 * - Mirror the exact Supabase method chain used in store.ts when setting up mocks.
 *
 * ZUSTAND-X STORE ACCESS IN TESTS:
 * - Read current state:  `use<Feature>Store.get("values")`
 * - Call an action:      `use<Feature>Store.set("setField", "title", "value")`
 * - Reset state:         `use<Feature>Store.set("reset")`
 * - Vanilla store:       `use<Feature>Store.store.getState()` (if needed)
 * - In renderHook: use `useStoreValue` / `useStoreState` hooks from "zustand-x"
 *   instead of a single `use<Feature>Store()` hook call.
 *
 * MOCK PATTERNS:
 *
 * Auth actions (e.g. signUp, signInWithPassword):
 *   supabase.auth.<method> as jest.Mock
 *
 * Database actions (e.g. insert, upsert, select):
 *   supabase.from as jest.Mock  →  mockFrom.mockReturnValue({ insert: jest.fn(), ... })
 *
 * REQUIRED TEST CASES (generate all three):
 * 1. "updates form fields via setField" — field update is reflected in store state
 * 2. "calls <action> and clears submitting on success" — happy path
 * 3. "stores error message on <action> failure" — error path
 *
 * @example
 * ```ts
 * // 1. Mock BEFORE imports
 * jest.mock("@/utils/supabase", () => ({
 *   supabase: {
 *     from: jest.fn(),
 *   },
 * }));
 *
 * // 2. Imports
 * import { act, renderHook } from "@testing-library/react-native";
 * import { useStoreValue } from "zustand-x";
 * import { supabase } from "@/utils/supabase";
 * import useDebateStore from "./store";
 * import { debateSeeds } from "./data";
 *
 * // 3. Typed mock reference
 * const mockFrom = supabase.from as jest.Mock;
 *
 * describe("debate feature store", () => {
 *   beforeEach(() => {
 *     mockFrom.mockReset();
 *     useDebateStore.set("reset");
 *   });
 *
 *   it("updates form fields via setField", () => {
 *     useDebateStore.set("setField", "title", debateSeeds[0].title);
 *     expect(useDebateStore.get("values").title).toBe(debateSeeds[0].title);
 *   });
 *
 *   it("calls createDebate and clears submitting on success", async () => {
 *     mockFrom.mockReturnValue({ insert: jest.fn().mockResolvedValueOnce({ error: null }) });
 *
 *     useDebateStore.set("setField", "title", debateSeeds[0].title);
 *
 *     await act(async () => {
 *       const response = await useDebateStore.set("createDebate");
 *       expect(response.error).toBeNull();
 *     });
 *
 *     expect(useDebateStore.get("submitting")).toBe(false);
 *     expect(useDebateStore.get("error")).toBeNull();
 *   });
 *
 *   it("stores error message on createDebate failure", async () => {
 *     mockFrom.mockReturnValue({
 *       insert: jest.fn().mockResolvedValueOnce({ error: { message: "Insert failed" } }),
 *     });
 *
 *     await act(async () => {
 *       const response = await useDebateStore.set("createDebate");
 *       expect(response.error).toBeTruthy();
 *     });
 *
 *     expect(useDebateStore.get("error")).toBe("Insert failed");
 *     expect(useDebateStore.get("submitting")).toBe(false);
 *   });
 * });
 * ```
 */
