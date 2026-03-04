/**
 * @file test.ts — Jest tests for the context hook and component rendering.
 *
 * RULES (enforced, no exceptions):
 * - No `jest.mock(...)` needed — `@repo/ui` has no external dependencies.
 *   If a sub-dependency must be mocked, place the mock before all imports.
 * - Always test the "outside Provider" throw — this documents the hook contract.
 * - Use `renderHook` for testing the context hook in isolation.
 * - Use `render` + `screen` for testing component rendering.
 * - Wrap `renderHook` in a `wrapper` factory function that renders the Provider.
 * - Wrap state-mutating calls in `act()`.
 * - Import seed data from `./data` — never inline raw values in assertions.
 * - Cover: outside-provider guard, initial state, at least one action, component renders children.
 *
 * TESTING LIBRARY API:
 * - `renderHook(fn, { wrapper })` — test a hook in isolation
 * - `act(() => ...)` — wrap state-mutating calls
 * - `render(<JSX />)` — render to the virtual DOM
 * - `screen.getByText(...)` — query rendered output
 *
 * IMPORT ORDER:
 * 1. `@testing-library/react` (renderHook, act, render, screen)
 * 2. Local files (./context, ./component, ./data)
 * 3. Local types (./types) — only if needed for typing test helpers
 *
 * @example
 * ```ts
 * import { renderHook, act, render, screen } from "@testing-library/react";
 * import { AccordionProvider, useAccordionContext } from "./context";
 * import { Accordion, AccordionItem } from "./component";
 * import { accordionSeeds } from "./data";
 *
 * function wrapper({ children }: { children: React.ReactNode }) {
 *   return <AccordionProvider>{children}</AccordionProvider>;
 * }
 *
 * describe("useAccordionContext", () => {
 *   it("throws when called outside AccordionProvider", () => {
 *     expect(() => renderHook(() => useAccordionContext())).toThrow(
 *       "useAccordionContext must be called within an AccordionProvider"
 *     );
 *   });
 *
 *   it("returns null openId by default", () => {
 *     const { result } = renderHook(() => useAccordionContext(), { wrapper });
 *     expect(result.current.openId).toBeNull();
 *   });
 *
 *   it("opens an item when toggle is called", () => {
 *     const { result } = renderHook(() => useAccordionContext(), { wrapper });
 *     act(() => {
 *       result.current.toggle(accordionSeeds[0].id);
 *     });
 *     expect(result.current.openId).toBe(accordionSeeds[0].id);
 *   });
 *
 *   it("closes an open item when toggle is called again", () => {
 *     const { result } = renderHook(() => useAccordionContext(), { wrapper });
 *     act(() => { result.current.toggle(accordionSeeds[0].id); });
 *     act(() => { result.current.toggle(accordionSeeds[0].id); });
 *     expect(result.current.openId).toBeNull();
 *   });
 * });
 *
 * describe("Accordion component", () => {
 *   it("renders children", () => {
 *     render(<Accordion><span>hello</span></Accordion>);
 *     expect(screen.getByText("hello")).toBeTruthy();
 *   });
 *
 *   it("renders AccordionItem with correct title", () => {
 *     render(
 *       <Accordion>
 *         <AccordionItem id={accordionSeeds[0].id} title={accordionSeeds[0].title}>
 *           {accordionSeeds[0].content}
 *         </AccordionItem>
 *       </Accordion>
 *     );
 *     expect(screen.getByText(accordionSeeds[0].title)).toBeTruthy();
 *   });
 * });
 * ```
 */
