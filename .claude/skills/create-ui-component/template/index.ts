/**
 * @file index.ts — Public API surface for this UI component module.
 *
 * RULES (enforced, no exceptions):
 * - Named exports ONLY — no default export (this is a library package).
 * - Export the component(s), Provider, hook, and all public types.
 * - Do NOT re-export from `./data` — seed data is dev/test-only, not public API.
 * - Use `export type` for type-only re-exports.
 *
 * EXPORT CHECKLIST (generate all lines):
 * 1. Component(s):  `export { <Component> } from "./component";`
 * 2. Provider:      `export { <Component>Provider } from "./context";`
 * 3. Hook:          `export { use<Component>Context } from "./context";`
 * 4. Types:         `export type { <Component>Props, <Component>ContextValue, <Component>Item } from "./types";`
 *
 * CONSUMER IMPORT (after package.json export entry is added):
 * ```ts
 * import { Accordion, useAccordionContext } from "@repo/ui/accordion";
 * import type { AccordionItem } from "@repo/ui/accordion";
 * ```
 *
 * @example
 * ```ts
 * export { Accordion, AccordionItem } from "./component";
 * export { AccordionProvider, useAccordionContext } from "./context";
 * export type {
 *   AccordionProps,
 *   AccordionProviderProps,
 *   AccordionContextValue,
 *   AccordionItem,
 * } from "./types";
 * ```
 */
