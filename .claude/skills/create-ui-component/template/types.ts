/**
 * @file types.ts — Single source of truth for all types in this component module.
 *
 * RULES (enforced, no exceptions):
 * - All types live HERE. Never declare types inline in context.tsx or component.tsx.
 * - Use `export type` for every export (type-only imports/exports).
 * - Import these types into context.tsx and component.tsx — never re-declare locally.
 *
 * REQUIRED EXPORTS (generate all of these):
 *
 * 1. `<Component>Props`         — props accepted by the root `<Component>` element.
 *                                  Includes `children`, `className?`, and any provider seeds.
 * 2. `<Component>ProviderProps` — props for `<Component>Provider`.
 *                                  Always includes `children: ReactNode`.
 *                                  Does NOT include `className` (layout concern, not context).
 * 3. `<Component>ContextValue`  — value shape exposed by `use<Component>Context()`.
 *                                  Contains state fields + action callbacks.
 *                                  No internal setState refs or private implementation details.
 * 4. `<Component>Item`          — domain entity used in `data.ts` and tests (if applicable).
 *
 * NAMING:
 * - Props type:           `<Component>Props`
 * - Provider props type:  `<Component>ProviderProps`
 * - Context value type:   `<Component>ContextValue`
 * - Domain entity:        `<Component>Item`
 *
 * @example
 * ```ts
 * import type { ReactNode } from "react";
 *
 * // Root component props — consumed by <Accordion>
 * export type AccordionProps = {
 *   children: ReactNode;
 *   className?: string;
 *   defaultOpenId?: string | null; // seeds the Provider
 * };
 *
 * // Provider props — consumed by <AccordionProvider>
 * export type AccordionProviderProps = {
 *   children: ReactNode;
 *   defaultOpenId?: string | null;
 * };
 *
 * // Context value — returned by useAccordionContext()
 * export type AccordionContextValue = {
 *   openId: string | null;
 *   toggle: (id: string) => void;
 * };
 *
 * // Domain entity — used in data.ts and tests
 * export type AccordionItem = {
 *   id: string;
 *   title: string;
 *   content: string;
 *   createdAt: string; // ISO 8601
 * };
 * ```
 */
