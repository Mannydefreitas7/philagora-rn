/**
 * @file data.ts — Seed data for development, testing, and Supabase seeding.
 *
 * RULES (enforced, no exceptions):
 * - Always export TWO things: a typed array and a SQL string.
 *   - `<feature>Seeds: <Feature>Item[]` — used in tests and dev renders.
 *   - `<feature>SeedSQL: string` — paste into Supabase Studio or `supabase db seed`.
 * - Import `<Feature>Item` from `./types` — never duplicate the type here.
 * - Seed IDs MUST be prefixed `seed-<feature-kebab>-N` (easy to identify & clean up).
 * - SQL uses `ON CONFLICT (id) DO NOTHING` — makes seeds idempotent (safe to re-run).
 * - Include at least 3 records covering:
 *   1. Happy-path / typical data
 *   2. Edge-case (long text, zero/max counts, optional field absent / null)
 *   3. Varied realistic values (different authors, dates, states)
 * - Use ISO 8601 strings for all dates (e.g. `"2024-01-01T00:00:00.000Z"`).
 * - Import `<feature>Seeds` in `test.ts` instead of inlining raw values in assertions.
 *
 * @example
 * ```ts
 * import type { DebateItem } from "./types";
 *
 * export const debateSeeds: DebateItem[] = [
 *   {
 *     id: "seed-debate-1",
 *     title: "Should AI replace human judges?",
 *     description: "A structured debate on automation in the justice system.",
 *     authorId: "seed-user-1",
 *     createdAt: "2024-01-01T00:00:00.000Z",
 *   },
 *   {
 *     id: "seed-debate-2",
 *     title: "A".repeat(120), // edge-case: long title
 *     description: null,      // edge-case: optional field absent
 *     authorId: "seed-user-2",
 *     createdAt: "2024-01-02T00:00:00.000Z",
 *   },
 *   {
 *     id: "seed-debate-3",
 *     title: "Universal Basic Income: Pros and Cons",
 *     description: "Economic debate covering welfare, incentives, and fiscal policy.",
 *     authorId: "seed-user-1",
 *     createdAt: "2024-01-03T00:00:00.000Z",
 *   },
 * ];
 *
 * export const debateSeedSQL = `
 * INSERT INTO debates (id, title, description, author_id, created_at) VALUES
 *   ('seed-debate-1', 'Should AI replace human judges?', 'A structured debate on automation in the justice system.', 'seed-user-1', '2024-01-01T00:00:00.000Z'),
 *   ('seed-debate-2', 'AAAAAA...', NULL, 'seed-user-2', '2024-01-02T00:00:00.000Z'),
 *   ('seed-debate-3', 'Universal Basic Income: Pros and Cons', 'Economic debate covering welfare, incentives, and fiscal policy.', 'seed-user-1', '2024-01-03T00:00:00.000Z')
 * ON CONFLICT (id) DO NOTHING;
 * `;
 * ```
 */
