/**
 * @file data.ts — Seed data for development and testing.
 *
 * RULES (enforced, no exceptions):
 * - Export a single typed array: `<component>Seeds: <Component>Item[]`.
 * - NO SQL seed export — `@repo/ui` has no database dependency.
 * - Import `<Component>Item` from `./types` — never duplicate the type here.
 * - Seed IDs MUST be prefixed `seed-<component-kebab>-N` (easy to identify & clean up).
 * - Include at least 3 records covering:
 *   1. Happy-path / typical data
 *   2. Edge-case (long text, empty optional field, min/max values)
 *   3. Varied realistic values
 * - Use ISO 8601 strings for all dates.
 * - Import `<component>Seeds` in `test.ts` — never inline raw values in test assertions.
 * - Do NOT export this from `index.ts` — seed data is dev/test-only, not public API.
 *
 * @example
 * ```ts
 * import type { AccordionItem } from "./types";
 *
 * export const accordionSeeds: AccordionItem[] = [
 *   {
 *     id: "seed-accordion-1",
 *     title: "What is Philagora?",
 *     content: "Philagora is a structured debate platform for thoughtful discourse.",
 *     createdAt: "2024-01-01T00:00:00.000Z",
 *   },
 *   {
 *     id: "seed-accordion-2",
 *     title: "A".repeat(80), // edge-case: very long title
 *     content: "",            // edge-case: empty content
 *     createdAt: "2024-01-02T00:00:00.000Z",
 *   },
 *   {
 *     id: "seed-accordion-3",
 *     title: "How are debates structured?",
 *     content: "Each debate has opening statements, rebuttals, and a closing summary.",
 *     createdAt: "2024-01-03T00:00:00.000Z",
 *   },
 * ];
 * ```
 */
