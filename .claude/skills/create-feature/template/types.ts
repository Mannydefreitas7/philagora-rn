/**
 * @file types.ts — Single source of truth for all types in this feature.
 *
 * RULES (enforced, no exceptions):
 * - All types live HERE. Never declare types inline in store.ts or component.tsx.
 * - Use `export type` for every export (type-only imports/exports).
 * - Domain entity is named `<Feature>Item` (PascalCase + "Item").
 * - Mirror Supabase column names converted to camelCase (snake_case → camelCase).
 * - Import these types into store.ts and component.tsx — never re-declare locally.
 *
 * REQUIRED EXPORTS (generate all of these):
 *
 * 1. `<Feature>Item`   — domain entity that mirrors the Supabase table row.
 * 2. `<Feature>Values` — form/input values managed in the Zustand-X store.
 * 3. `<Feature>Result` — return type for all async store actions.
 * 4. `<Feature>State`  — STATE ONLY shape passed as type param to `createStore<T>`.
 *                        Does NOT include actions (zustand-x infers those from extendActions).
 *
 * WHY `<Feature>State` instead of `<Feature>Store`:
 * With zustand-x, `createStore<T>` only needs the state shape as its type parameter.
 * Actions are added via `.extendActions()` and their types are inferred automatically.
 * The old `<Feature>Store` pattern (state + actions in one type) is NOT used here.
 *
 * @example
 * ```ts
 * // Domain entity — mirrors the Supabase table row (all columns, camelCase)
 * export type DebateItem = {
 *   id: string;
 *   title: string;
 *   description: string | null;
 *   authorId: string;
 *   createdAt: string; // ISO 8601
 * };
 *
 * // Form values — fields the user fills in (subset of DebateItem, no id/createdAt)
 * export type DebateValues = {
 *   title: string;
 *   description: string;
 * };
 *
 * // Return type for every async action in the store
 * export type DebateResult = {
 *   error: Error | null;
 * };
 *
 * // State-only shape — passed as the type parameter to createStore<DebateState>()
 * // Actions are NOT included here; zustand-x infers them from extendActions.
 * export type DebateState = {
 *   values: DebateValues;
 *   submitting: boolean;
 *   error: string | null;
 * };
 * ```
 */
