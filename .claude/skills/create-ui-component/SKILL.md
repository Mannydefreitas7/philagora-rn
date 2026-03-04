---
name: create-ui-component
description: Use when creating a new shared UI component in the @repo/ui package. Triggers on requests like "create a UI component", "add a component to ui package", "scaffold shared component", "new ui component". Creates the full folder and file structure under packages/ui/src/ with generated component, context, test, index, types, and data files. Exposes the component via package.json exports.
---

# Create UI Component

## Overview

Scaffolds a shared UI component under `packages/ui/src/<category>/<component-name>/` following the Philagora UI-package pattern. The component is placed in a category subfolder (atom / molecule / organism) and exposed via `packages/ui/package.json` so any app can import it as `@repo/ui/<component-name>`.

Three generation modes are supported: **hero-native** (wrap a HeroUI Native component), **reactix** (scaffold via CLI), and **custom** (full six-file generation).

---

## Step-by-Step Process

### 1. Ask two clarifying questions (always ask both before proceeding)

**Question A — Source type:**
> "What is the component source?
> 1. `hero-native` — wrap a HeroUI Native component
> 2. `reactix` — scaffold via `bunx --bun reacticx add`
> 3. `custom` — generate from scratch"

**Question B — Category:**
> "What category is this component?
> - `atom` — primitive, single-responsibility element (Icon, Row, Control, Text, Badge, …)
> - `molecule` — composed from atoms, may have local state (ButtonWithIcon, Field, Card, ListItem, …)
> - `organism` — full UI block composed of molecules (Form, Nav, Header, Menu, DataTable, …)"

Also confirm (or infer from context):
- **Component name** — PascalCase (e.g. `Accordion`, `IconButton`, `SearchForm`)
- **Purpose** — what the component renders and manages (inform context shape)

---

### 2. Create folder

```
packages/ui/src/<category>/<component-kebab>/
```

Examples:
- `packages/ui/src/atoms/icon/`
- `packages/ui/src/molecules/button-with-icon/`
- `packages/ui/src/organisms/search-form/`

---

### 3. Generate files — by source type

#### Mode A: `hero-native`

Ask: "Which HeroUI Native component are you wrapping? (e.g. `Button`, `Input`, `Card`)"

Generate all six files. In `component.tsx`, import from `heroui-native` and re-export a typed wrapper with extended props and context. The context carries any additional state layered on top of the base HeroUI component.

```tsx
// component.tsx (hero-native mode)
import type { JSX } from "react";
import { <HeroComponent> } from "heroui-native";
import { <Component>Provider } from "./context";
import type { <Component>Props } from "./types";

export function <Component>({ children, className, ...providerProps }: <Component>Props): JSX.Element {
  return (
    <<Component>Provider {...providerProps}>
      <<HeroComponent> className={className}>
        {children}
      </<HeroComponent>>
    </<Component>Provider>
  );
}
```

In `types.ts`, extend or compose the HeroUI Native prop types:
```ts
import type { <HeroComponent>Props as Base<HeroComponent>Props } from "heroui-native";

export type <Component>Props = Base<HeroComponent>Props & {
  // additional props layered on top
};
```

---

#### Mode B: `reactix`

Ask: "What is the component name to pass to reactix? (e.g. `accordion`, `tabs`)"

Then run the CLI from the `packages/ui` directory:

```bash
cd packages/ui && bunx --bun reacticx add <component-name>
```

After the CLI completes:
1. Inspect the generated files to understand the component's props and behaviour.
2. If a context/hook is not already generated, create `context.tsx` following the custom template below.
3. Ensure an `index.ts` barrel exists and exports all public symbols.
4. Add or update `types.ts` with all types used in the generated files.
5. Add or update `test.ts` to cover the context guard, initial state, and at least one action.
6. Add or update `data.ts` with typed seed data.
7. Move files into the `<category>/<component-kebab>/` subfolder if reactix placed them elsewhere.

---

#### Mode C: `custom`

Generate all six files from scratch. See **File Templates** section below.

---

### 4. Register the export in `packages/ui/package.json`

Add an explicit entry to `exports` (the glob `"./*"` only resolves flat files, not subfolders):

```json
{
  "exports": {
    "./*": "./src/*.tsx",
    "./<component-kebab>": "./src/<category>/<component-kebab>/index.tsx"
  }
}
```

Consumer import (in any app):
```tsx
import { <Component>, use<Component>Context } from "@repo/ui/<component-kebab>";
```

---

## File Templates (custom & hero-native modes)

### `context.tsx`

```tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type JSX,
} from "react";
import type { <Component>ContextValue, <Component>ProviderProps } from "./types";

const <Component>Context = createContext<<Component>ContextValue | null>(null);

export function <Component>Provider({
  children,
}: <Component>ProviderProps): JSX.Element {
  const [<state>, set<State>] = useState(<initialValue>);

  const <action> = useCallback((<args>) => {
    // implement action
  }, [/* deps */]);

  const value: <Component>ContextValue = { <state>, <action> };

  return (
    <<Component>Context.Provider value={value}>
      {children}
    </<Component>Context.Provider>
  );
}

export function use<Component>Context(): <Component>ContextValue {
  const ctx = useContext(<Component>Context);
  if (!ctx) {
    throw new Error(
      "use<Component>Context must be called within a <Component>Provider"
    );
  }
  return ctx;
}
```

**Rules:**
- Always initialize `createContext` with `null` — never provide a default value object
- `use<Component>Context` throws if called outside Provider — this is the enforced contract
- Use `useCallback` for every action to keep the context value reference stable
- Named exports only (`<Component>Provider`, `use<Component>Context`)

---

### `component.tsx`

```tsx
import type { JSX } from "react";
import { <Component>Provider } from "./context";
import type { <Component>Props } from "./types";

export function <Component>({ children, className, ...providerProps }: <Component>Props): JSX.Element {
  return (
    <<Component>Provider {...providerProps}>
      <div className={className}>{children}</div>
    </<Component>Provider>
  );
}
```

**Rules:**
- `function` declarations — never `const Component = () =>`
- Root component wraps children in the Provider
- Accept and forward `className` — `@repo/ui` is style-agnostic
- No inline styles
- For `hero-native` mode, replace the `<div>` with the relevant HeroUI Native component

---

### `types.ts`

```typescript
import type { ReactNode } from "react";

export type <Component>Props = {
  children: ReactNode;
  className?: string;
  // ... props that also seed the provider
};

export type <Component>ProviderProps = {
  children: ReactNode;
  // ... initial-state seeds (no className — layout concern, not context)
};

export type <Component>ContextValue = {
  <state>: <Type>;
  <action>: (<args>) => void;
};

export type <Component>Item = {
  id: string;
  // ... domain fields
  createdAt: string; // ISO 8601
};
```

---

### `test.ts`

```typescript
import { renderHook, act, render, screen } from "@testing-library/react";
import { <Component>Provider, use<Component>Context } from "./context";
import { <Component> } from "./component";
import { <component>Seeds } from "./data";

function wrapper({ children }: { children: React.ReactNode }) {
  return <<Component>Provider>{children}</<Component>Provider>;
}

describe("use<Component>Context", () => {
  it("throws when called outside <Component>Provider", () => {
    expect(() => renderHook(() => use<Component>Context())).toThrow(
      "use<Component>Context must be called within a <Component>Provider"
    );
  });

  it("exposes initial state", () => {
    const { result } = renderHook(() => use<Component>Context(), { wrapper });
    expect(result.current.<state>).toEqual(<expectedInitialValue>);
  });

  it("updates state via <action>", () => {
    const { result } = renderHook(() => use<Component>Context(), { wrapper });
    act(() => { result.current.<action>(<component>Seeds[0].<field>); });
    expect(result.current.<state>).toBe(<component>Seeds[0].<field>);
  });
});

describe("<Component> component", () => {
  it("renders children", () => {
    render(<<Component>><span>content</span></<Component>>);
    expect(screen.getByText("content")).toBeTruthy();
  });
});
```

---

### `index.ts`

```typescript
export { <Component> } from "./component";
export { <Component>Provider, use<Component>Context } from "./context";
export type { <Component>Props, <Component>ContextValue, <Component>Item } from "./types";
```

**Rules:**
- Named exports only — no default export
- Do NOT re-export from `./data`

---

### `data.ts`

```typescript
import type { <Component>Item } from "./types";

export const <component>Seeds: <Component>Item[] = [
  {
    id: "seed-<component-kebab>-1",
    // typical data
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-<component-kebab>-2",
    // edge-case (long text, null optional field)
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-<component-kebab>-3",
    // varied realistic values
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];
```

**Rules:**
- Typed array only — no SQL seed (`@repo/ui` has no DB dependency)
- IDs prefixed `seed-<component-kebab>-N`
- At least 3 records; import in `test.ts` — never inline raw values

---

## Category Guide

| Category | Folder | Description | Examples |
|---|---|---|---|
| `atom` | `src/atoms/` | Single-responsibility primitives, no composed children | Icon, Row, Control, Text, Badge, Divider |
| `molecule` | `src/molecules/` | Composed from atoms; may carry local context | ButtonWithIcon, Field, Card, ListItem, Tag |
| `organism` | `src/organisms/` | Full UI blocks composed of molecules | Form, Nav, Header, Menu, DataTable, Sidebar |

---

## Naming Conventions

| Concept | Convention | Example |
|---|---|---|
| Folder path | `src/<category>/<kebab-case>/` | `src/molecules/button-with-icon/` |
| Component function | `<PascalCase>` | `ButtonWithIcon` |
| Provider function | `<PascalCase>Provider` | `ButtonWithIconProvider` |
| Hook | `use<PascalCase>Context` | `useButtonWithIconContext` |
| Context value type | `<PascalCase>ContextValue` | `ButtonWithIconContextValue` |
| Provider props type | `<PascalCase>ProviderProps` | `ButtonWithIconProviderProps` |
| Component props type | `<PascalCase>Props` | `ButtonWithIconProps` |
| Domain entity type | `<PascalCase>Item` | `ButtonWithIconItem` |
| Seed data array | `<camelCase>Seeds` | `buttonWithIconSeeds` |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `const Component = () =>` | Use `function Component()` declarations |
| Providing a non-null default to `createContext` | Always initialize with `null`, guard in the hook |
| Putting `className` in `<Component>ProviderProps` | `className` belongs on root element props only |
| Exporting a default from `index.ts` | Named exports only — this is a library package |
| Importing from `@repo/ui` inside `@repo/ui` | Never self-import; use relative paths |
| Declaring types inline in `context.tsx` or `component.tsx` | All types go in `types.ts` |
| Forgetting to update `package.json` exports | Always add the explicit entry for the new subfolder path |
| Skipping category subfolder | Files must live in `src/<category>/<component-kebab>/` |
| Skipping the outside-Provider throw test | Always test the contract guard |
| Inlining raw test values | Import from `data.ts` (`<component>Seeds[0]`) |
| Running `reactix` from the wrong directory | Always `cd packages/ui` before running `bunx --bun reacticx add` |
