/**
 * @file context.tsx — React Context + Provider + hook for this component's shared state.
 *
 * RULES (enforced, no exceptions):
 * - Use `function` declarations — never `const Provider = () =>`.
 * - Initialize `createContext` with `null`, NEVER with a default value object.
 * - `use<Component>Context()` MUST throw if called outside the Provider — document the contract.
 * - All actions wrapped in `useCallback` — keeps context value reference stable.
 * - Export both `<Component>Provider` and `use<Component>Context` as named exports.
 * - All types come from `./types` — never declare types inline here.
 * - Export nothing as default — this is a library file.
 *
 * CONTEXT VALUE SHAPE:
 * - `<Component>ContextValue` in `./types` defines ONLY what consumers need.
 * - State fields + action callbacks — nothing internal (e.g. raw setState refs).
 *
 * IMPORT ORDER:
 * 1. React (createContext, useContext, useState, useCallback, ReactNode, JSX)
 * 2. Local types (./types)
 *
 * @example
 * ```tsx
 * import {
 *   createContext,
 *   useContext,
 *   useState,
 *   useCallback,
 *   type ReactNode,
 *   type JSX,
 * } from "react";
 * import type { AccordionContextValue, AccordionProviderProps } from "./types";
 *
 * const AccordionContext = createContext<AccordionContextValue | null>(null);
 *
 * export function AccordionProvider({
 *   children,
 *   defaultOpenId = null,
 * }: AccordionProviderProps): JSX.Element {
 *   const [openId, setOpenId] = useState<string | null>(defaultOpenId);
 *
 *   const toggle = useCallback((id: string) => {
 *     setOpenId((prev) => (prev === id ? null : id));
 *   }, []);
 *
 *   const value: AccordionContextValue = { openId, toggle };
 *
 *   return (
 *     <AccordionContext.Provider value={value}>
 *       {children}
 *     </AccordionContext.Provider>
 *   );
 * }
 *
 * export function useAccordionContext(): AccordionContextValue {
 *   const ctx = useContext(AccordionContext);
 *   if (!ctx) {
 *     throw new Error(
 *       "useAccordionContext must be called within an AccordionProvider"
 *     );
 *   }
 *   return ctx;
 * }
 * ```
 */
