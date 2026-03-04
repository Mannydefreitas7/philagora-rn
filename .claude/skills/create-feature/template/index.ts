/**
 * @file index.ts — Barrel file: the public API surface for this feature module.
 *
 * RULES (enforced, no exceptions):
 * - Every file in the feature folder MUST be re-exported from here.
 * - Default export = the React component (consumed by Expo Router or parent screens).
 * - Also re-export the component as a named export (`<Feature>Feature`) for explicit imports.
 * - Re-export the store hook as a named export (`use<Feature>Store`).
 * - Re-export all types using `export type` (type-only exports).
 * - Do NOT import or re-export from `./data` — seed data is dev/test-only, not public API.
 *
 * EXPORT CHECKLIST (generate all four lines):
 * 1. `export { default } from "./component";`              — default (component)
 * 2. `export { default as <Feature>Feature } from "./component";` — named component
 * 3. `export { default as use<Feature>Store } from "./store";`    — named store hook
 * 4. `export type { <Feature>Item, <Feature>Values } from "./types";` — public types
 *
 * @example
 * ```ts
 * export { default } from "./component";
 * export { default as DebateFeature } from "./component";
 * export { default as useDebateStore } from "./store";
 * export type { DebateItem, DebateValues } from "./types";
 * ```
 *
 * Consumers import like:
 * ```ts
 * import DebateFeature from "@/features/debate/create-debate";
 * // or explicitly:
 * import { DebateFeature, useDebateStore } from "@/features/debate/create-debate";
 * import type { DebateItem } from "@/features/debate/create-debate";
 * ```
 */
