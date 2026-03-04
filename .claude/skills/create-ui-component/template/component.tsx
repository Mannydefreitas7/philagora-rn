/**
 * @file component.tsx — Root React component for this UI module.
 *
 * RULES (enforced, no exceptions):
 * - Use `function` declarations — never `const Component = () =>`.
 * - Export as a NAMED export (no default) — this is a library package.
 * - Component name: `<Component>` (PascalCase, no suffix).
 * - The root component wraps children with `<Component>Provider` (from `./context`).
 * - Accept and forward `className` for consumer-side styling.
 * - No inline styles — style-agnostic; consumers apply their own classes.
 * - Do NOT manage state here — all shared state lives in `<Component>Provider`.
 * - Import provider from `./context`, types from `./types`.
 *
 * PROPS SPLIT:
 * - `<Component>Props` extends `<Component>ProviderProps` + adds `className`.
 * - Pass provider-relevant props to the Provider; pass layout props to the root element.
 *
 * IMPORT ORDER:
 * 1. React (`type JSX`)
 * 2. Local files (`./context`, `./types`)
 *
 * @example
 * ```tsx
 * import type { JSX } from "react";
 * import { AccordionProvider } from "./context";
 * import type { AccordionProps } from "./types";
 *
 * export function Accordion({
 *   children,
 *   className,
 *   defaultOpenId,
 * }: AccordionProps): JSX.Element {
 *   return (
 *     <AccordionProvider defaultOpenId={defaultOpenId}>
 *       <div className={className}>{children}</div>
 *     </AccordionProvider>
 *   );
 * }
 * ```
 *
 * // Sub-component example (compound pattern):
 * ```tsx
 * import { useAccordionContext } from "./context";
 * import type { AccordionItemProps } from "./types";
 *
 * export function AccordionItem({ id, title, children }: AccordionItemProps): JSX.Element {
 *   const { openId, toggle } = useAccordionContext();
 *   const isOpen = openId === id;
 *
 *   return (
 *     <div>
 *       <button type="button" onClick={() => toggle(id)}>
 *         {title}
 *       </button>
 *       {isOpen ? <div>{children}</div> : null}
 *     </div>
 *   );
 * }
 * ```
 */
