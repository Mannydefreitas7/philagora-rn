---
name: create-feature
description: Use when creating a new feature module in the Philagora mobile app. Triggers on requests like "create a feature", "add a feature", "scaffold feature", "new feature module". Creates the full folder and file structure under apps/mobile/features/ with generated component, store, test, index, types, and data files.
---

# Create Feature

## Overview

Scaffolds a complete feature module under `apps/mobile/features/<path>/` following the Philagora feature-module pattern. Each feature has six files: `component.tsx`, `store.ts`, `test.ts`, `index.ts`, `types.ts`, `data.ts`.

## Tech Constraints (non-negotiable)

- **Styling**: Uniwind/Tailwind utility classes (`className="..."`) — no `StyleSheet.create`
- **UI components**: HeroUI Native (`heroui-native`) as primary building blocks
- **State**: Zustand-X (`createStore` + `extendActions`); enable `immer: true` always
- **Tests**: `@testing-library/react-native` with `act`; mock with `jest.fn()`
- **Imports**: `@/` alias for all internal imports

## Step-by-Step Process

### 1. Clarify feature details

Ask the user (or infer from context) before generating:
- **Feature name** — becomes the folder name (kebab-case)
- **Parent path** — where under `features/` (e.g. `authentication/`, `debate/`, or top-level)
- **Purpose** — what the feature does (informs store shape and UI)
- **Supabase interaction** — which table/auth method is called (or "none")
- **Fields/actions** — form fields, buttons, async actions

### 2. Create folder

```
apps/mobile/features/<parent>/<feature-name>/
```

### 3. Generate all six files

See templates below.

---

## File Templates

### `store.ts`

```typescript
import { createStore } from "zustand-x";
import supabase from "@/utils/supabase";
import type { <Feature>Values, <Feature>Result, <Feature>State } from "./types";

const initialValues: <Feature>Values = {
  // zero-value for each field
};

export const use<Feature>Store = createStore<<Feature>State>(
  {
    values: initialValues,
    submitting: false,
    error: null,
  },
  {
    name: "<feature-kebab>",
    immer: true,
    devtools: true,
  }
).extendActions(({ get, set }) => ({
  setField: <K extends keyof <Feature>Values>(field: K, value: <Feature>Values[K]) => {
    set("state", (draft) => {
      draft.values[field] = value;
      return draft;
    });
  },

  reset: () => {
    set("state", (draft) => {
      draft.values = initialValues;
      draft.submitting = false;
      draft.error = null;
      return draft;
    });
  },

  <action>: async (): Promise<<Feature>Result> => {
    const values = get("values");
    set("submitting", true);
    set("error", null);

    const { error } = await supabase.<target>(<payload>);

    if (error) {
      set("error", error.message);
      set("submitting", false);
      return { error };
    }

    set("submitting", false);
    return { error: null };
  },
}));

export default use<Feature>Store;
```

**Rules:**
- Use `createStore` from `"zustand-x"` — NOT `create` from `"zustand"`
- The type parameter `<Feature>State` covers STATE ONLY (no actions); import from `./types`
- Always enable `immer: true` and `devtools: true`
- Export both named (`use<Feature>Store`) and default
- `setField` mutates via immer draft — always `return draft`
- Async actions: `set("submitting", true)` before the call, always `set("submitting", false)` after
- Call actions externally: `use<Feature>Store.set("<action>")` or `use<Feature>Store.set("setField", field, value)`

---

### `component.tsx`

```typescript
import { Text, View } from "react-native";
import { useStoreValue } from "zustand-x";
import { Button } from "heroui-native";

import use<Feature>Store from "./store";

export default function <Feature>Feature() {
  const values = useStoreValue(use<Feature>Store, "values");
  const submitting = useStoreValue(use<Feature>Store, "submitting");
  const error = useStoreValue(use<Feature>Store, "error");

  const onSubmit = async () => {
    const { error: actionError } = await use<Feature>Store.set("<action>");
    if (actionError) return;
    // navigate or callback
  };

  return (
    <View className="flex-1 bg-background px-5 py-8">
      {/* fields — update via: use<Feature>Store.set("setField", "fieldName", value) */}

      {error ? <Text className="mt-3 text-sm text-danger">{error}</Text> : null}

      <View className="mt-8">
        <Button variant="solid" onPress={onSubmit} isDisabled={submitting}>
          {submitting ? "Loading..." : "Submit"}
        </Button>
      </View>
    </View>
  );
}
```

**Rules:**
- Read state via `useStoreValue(store, "key")` from `"zustand-x"` — do NOT call `use<Feature>Store()` as a hook
- Call actions via `store.set("actionName", ...args)` — no destructuring
- All layout via Tailwind utility classes (`className`)
- HeroUI Native `Button`, `Input`, etc. as primary components
- Import store from `./store` (relative)
- No inline styles unless Reanimated animated values require it
- Error message always rendered conditionally below form fields

---

### `test.ts`

```typescript
// Mock Supabase BEFORE importing the store
jest.mock("@/utils/supabase", () => ({
  supabase: {
    // mirror the exact Supabase methods used in store.ts
    auth: { signUp: jest.fn() },
    // or: from: jest.fn(() => ({ upsert: jest.fn(), select: jest.fn() })),
  },
}));

import { act } from "@testing-library/react-native";
import supabase from "@/utils/supabase";
import use<Feature>Store from "./store";
import { <feature>Seeds } from "./data";

const mock<Action> = supabase.auth.<method> as jest.Mock;
// or: const mockFrom = supabase.from as jest.Mock;

describe("<feature> feature store", () => {
  beforeEach(() => {
    mock<Action>.mockReset();
    use<Feature>Store.set("reset");
  });

  it("updates form fields via setField", () => {
    use<Feature>Store.set("setField", "<field>", <feature>Seeds[0].<field>);
    expect(use<Feature>Store.get("values").<field>).toBe(<feature>Seeds[0].<field>);
  });

  it("calls <action> and clears submitting on success", async () => {
    mock<Action>.mockResolvedValueOnce({ error: null });
    use<Feature>Store.set("setField", "<field>", <feature>Seeds[0].<field>);

    await act(async () => {
      const response = await use<Feature>Store.set("<action>");
      expect(response.error).toBeNull();
    });

    expect(use<Feature>Store.get("submitting")).toBe(false);
    expect(use<Feature>Store.get("error")).toBeNull();
  });

  it("stores error message on <action> failure", async () => {
    mock<Action>.mockResolvedValueOnce({ error: { message: "Something went wrong" } });

    await act(async () => {
      const response = await use<Feature>Store.set("<action>");
      expect(response.error).toBeTruthy();
    });

    expect(use<Feature>Store.get("error")).toBe("Something went wrong");
    expect(use<Feature>Store.get("submitting")).toBe(false);
  });
});
```

**Rules:**
- `jest.mock(...)` must appear before any import of the module being mocked
- Reset store via `use<Feature>Store.set("reset")` — NOT `.getState().reset()`
- Read state via `use<Feature>Store.get("key")` — NOT `.getState().key`
- Import seed data from `./data` — never inline raw test values
- Cover: field updates, success path, error path
- Use `await act(async () => ...)` for async actions

---

### `index.ts`

```typescript
export { default } from "./component";
export { default as <Feature>Feature } from "./component";
export { default as use<Feature>Store } from "./store";
export type { <Feature>Item, <Feature>Values } from "./types";
```

---

### `types.ts`

All TypeScript types specific to this feature. This is the single source of truth for the feature's data shape.

```typescript
// Domain entity — mirrors the Supabase table row shape
export type <Feature>Item = {
  id: string;
  // ... all columns from the relevant Supabase table
  createdAt: string;
};

// Form / input values used in the store
export type <Feature>Values = {
  // fields the user fills in
};

// Return type for every async store action
export type <Feature>Result = {
  error: Error | null;
};

// State-only shape — passed as type param to createStore<Feature>State>()
// Do NOT include actions here; zustand-x infers them from extendActions
export type <Feature>State = {
  values: <Feature>Values;
  submitting: boolean;
  error: string | null;
};
```

**Rules:**
- Use `export type` for all exports (type-only imports/exports)
- Name the domain entity `<Feature>Item` (singular, PascalCase + "Item")
- `<Feature>State` = state only (no actions); used as the `createStore<T>` type param
- Mirror Supabase column names converted to camelCase
- Import these types into `store.ts` and `component.tsx` — do not re-declare locally

---

### `data.ts`

Realistic dummy data for local development, component testing, and Supabase seeding. Must be consistent with `types.ts`.

```typescript
import type { <Feature>Item } from "./types";

// Seed data — also used in tests and Storybook/development renders
export const <feature>Seeds: <Feature>Item[] = [
  {
    id: "seed-<feature>-1",
    // ... realistic values for every field
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-<feature>-2",
    // ... varied values to cover edge cases (empty strings, long text, nulls)
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  // 3–5 entries total; enough to fill a list UI
];

// SQL seed — paste into Supabase Studio or run via supabase db seed
export const <feature>SeedSQL = `
INSERT INTO <table_name> (id, <columns>, created_at) VALUES
  ('seed-<feature>-1', <values_1>),
  ('seed-<feature>-2', <values_2>)
ON CONFLICT (id) DO NOTHING;
`;
```

**Rules:**
- Always export both a typed array (`<feature>Seeds`) and a SQL string (`<feature>SeedSQL`)
- IDs must be prefixed `seed-<feature>-` so they are easy to identify and clean up
- SQL uses `ON CONFLICT (id) DO NOTHING` to make seeds idempotent (safe to re-run)
- Include at least 3 records covering happy-path, edge-case (long text, zero counts), and optional-field-absent scenarios
- Use ISO 8601 strings for all dates
- Import `<feature>Seeds` in `test.ts` to drive test assertions instead of inlining raw values

---

## Naming Conventions

| Concept | Convention | Example |
|---|---|---|
| Folder | kebab-case | `reset-password` |
| Store hook | `use<PascalCase>Store` | `useResetPasswordStore` |
| Component | `<PascalCase>Feature` | `ResetPasswordFeature` |
| Store type | `<PascalCase>Store` | `ResetPasswordStore` |
| Values type | `<PascalCase>Values` | `ResetPasswordValues` |
| Domain entity type | `<PascalCase>Item` | `ResetPasswordItem` |
| Seed data array | `<camelCase>Seeds` | `resetPasswordSeeds` |
| Seed SQL export | `<camelCase>SeedSQL` | `resetPasswordSeedSQL` |
| Seed ID prefix | `seed-<kebab>-N` | `seed-reset-password-1` |

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `StyleSheet.create` for layout | Use Tailwind classes via `className` |
| Using `useState` for form state | Put all state in the Zustand-X store |
| Using `create` from `"zustand"` | Use `createStore` from `"zustand-x"` |
| Calling `use<Feature>Store()` as a React hook | Use `useStoreValue(store, "key")` from `"zustand-x"` |
| Resetting store in tests via `.getState().reset()` | Use `store.set("reset")` |
| Reading state in tests via `.getState().key` | Use `store.get("key")` |
| Declaring `<Feature>Store` type with actions | Use `<Feature>State` (state only); actions are inferred |
| Forgetting `return draft` in immer updater | Always `return draft` even when mutating in-place |
| Importing Supabase directly in component | Always go through the store action |
| Placing `jest.mock` after imports | Always mock before the module import |
| Skipping the error branch in tests | Always test success + error paths |
| Declaring types inline in `store.ts` or `component.tsx` | Always put types in `types.ts` and import them |
| Using sequential IDs (`1`, `2`) in seed data | Prefix IDs with `seed-<feature>-` for easy cleanup |
| Omitting the SQL seed | Always export `<feature>SeedSQL` alongside the typed array |
| Inlining raw test values in `test.ts` | Import from `data.ts` (`<feature>Seeds[0]`) for consistency |
