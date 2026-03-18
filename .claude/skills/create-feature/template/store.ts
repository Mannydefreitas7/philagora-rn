/**
 * @file store.ts — Zustand-X store for this feature's state and async actions.
 *
 * RULES (enforced, no exceptions):
 * - Use `createStore` from "zustand-x" — NOT `create` from plain "zustand".
 * - The type parameter passed to `createStore<T>` covers STATE ONLY (no actions).
 *   Actions are added via `.extendActions()` and are inferred automatically.
 * - Always enable `immer: true` and `devtools: true` in options.
 * - All state types come from `./types` — do not declare types inline here.
 * - Export both named (`use<Feature>Store`) and default.
 * - Every async action must: `set("submitting", true)` before the Supabase call,
 *   then always `set("submitting", false)` after (success or error).
 * - Call Supabase via the shared client from `@/utils/supabase` — never instantiate it here.
 * - `setField` uses a generic key constraint for compile-time type safety.
 * - `reset` restores all state to initial values (called between tests).
 *
 * STATE TYPE:
 * - Import a `<Feature>State` type from `./types` that contains ONLY state fields
 *   (values, submitting, error). Do NOT include actions in this type.
 * - The full store type (state + actions) is inferred by zustand-x automatically.
 *
 * CALLING ACTIONS (in components and tests):
 * - Read state:   `useStoreValue(use<Feature>Store, "values")`
 * - Bind inputs:  `useStoreState(use<Feature>Store, "values")`
 * - Call action:  `use<Feature>Store.set("setField", "title", newValue)`
 * - Call action:  `use<Feature>Store.set("createDebate")`
 * - Reset (test): `use<Feature>Store.set("reset")`
 *
 * IMPORT ORDER:
 * 1. Third-party (zustand-x)
 * 2. Internal utilities (@/utils/supabase)
 * 3. Local types (./types)
 *
 * @example
 * ```ts
 * import { createStore } from "zustand-x";
 * import supabase from "@/utils/supabase";
 * import type { DebateValues, DebateResult, DebateState } from "./types";
 *
 * const initialValues: DebateValues = {
 *   title: "",
 *   description: "",
 * };
 *
 * export const useDebateStore = createStore<DebateState>(
 *   {
 *     values: initialValues,
 *     submitting: false,
 *     error: null,
 *   },
 *   {
 *     name: "debate",
 *     immer: true,
 *     devtools: true,
 *   }
 * ).extendActions(({ get, set }) => ({
 *   setField: <K extends keyof DebateValues>(field: K, value: DebateValues[K]) => {
 *     set("state", (draft) => {
 *       draft.values[field] = value;
 *       return draft;
 *     });
 *   },
 *
 *   reset: () => {
 *     set("state", (draft) => {
 *       draft.values = initialValues;
 *       draft.submitting = false;
 *       draft.error = null;
 *       return draft;
 *     });
 *   },
 *
 *   createDebate: async (): Promise<DebateResult> => {
 *     const values = get("values");
 *     set("submitting", true);
 *     set("error", null);
 *
 *     const { error } = await supabase.from("debates").insert(values);
 *
 *     if (error) {
 *       set("error", error.message);
 *       set("submitting", false);
 *       return { error };
 *     }
 *
 *     set("submitting", false);
 *     return { error: null };
 *   },
 * }));
 *
 * export default useDebateStore;
 * ```
 *
 * // In types.ts, add a DebateState type for the state shape:
 * // export type DebateState = {
 * //   values: DebateValues;
 * //   submitting: boolean;
 * //   error: string | null;
 * // };
 */
