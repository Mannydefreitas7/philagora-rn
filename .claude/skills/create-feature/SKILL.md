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
- **State**: Zustand (no Immer unless complex nested updates required)
- **Tests**: `@testing-library/react-native` with `renderHook` + `act`; mock with `jest.fn()`
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
import { create } from "zustand";
import { supabase } from "@/utils/supabase";

// 1. Define value/param types
type <Feature>Values = {
  // fields the user fills in or the feature tracks
};

// 2. Define result type for async actions
type <Feature>Result = {
  error: Error | null;
};

// 3. Define the store interface
type <Feature>Store = {
  values: <Feature>Values;
  submitting: boolean;
  error: string | null;
  setField: <K extends keyof <Feature>Values>(field: K, value: <Feature>Values[K]) => void;
  reset: () => void;
  <action>: () => Promise<<Feature>Result>;
};

const initialValues: <Feature>Values = {
  // zero-value for each field
};

export const use<Feature>Store = create<<Feature>Store>((set, get) => ({
  values: initialValues,
  submitting: false,
  error: null,

  setField: (field, value) => {
    set((state) => ({ values: { ...state.values, [field]: value } }));
  },

  reset: () => {
    set({ values: initialValues, submitting: false, error: null });
  },

  <action>: async () => {
    const { values } = get();
    set({ submitting: true, error: null });

    const { error } = await supabase.<target>(<payload>);

    if (error) {
      set({ error: error.message, submitting: false });
      return { error };
    }

    set({ submitting: false });
    return { error: null };
  },
}));

export default use<Feature>Store;
```

**Rules:**
- Export both named (`use<Feature>Store`) and default
- `setField` uses a generic key constraint for type safety
- Async actions set `submitting: true` before the call and `false` after (success or error)
- Never use Immer unless the state shape has deeply nested objects that need mutation

---

### `component.tsx`

```typescript
import { Text, View } from "react-native";
import { Button } from "heroui-native";

import use<Feature>Store from "./store";

export default function <Feature>Feature() {
  const { values, submitting, error, setField, <action> } = use<Feature>Store();

  const onSubmit = async () => {
    const { error: actionError } = await <action>();
    if (actionError) return;
    // navigate or callback
  };

  return (
    <View className="flex-1 bg-background px-5 py-8">
      {/* fields */}

      {error ? <Text className="mt-3 text-red-600">{error}</Text> : null}

      <View className="mt-8">
        <Button variant="primary" onPress={onSubmit} isDisabled={submitting}>
          {submitting ? "Loading..." : "Submit"}
        </Button>
      </View>
    </View>
  );
}
```

**Rules:**
- All layout via Tailwind utility classes (`className`)
- HeroUI Native `Button`, `Input`, etc. as primary components
- Import store from `./store` (relative)
- No inline styles unless Reanimated animated values require it
- Error message always rendered conditionally below form fields

---

### `test.ts`

```typescript
import { act, renderHook } from "@testing-library/react-native";

// Mock Supabase BEFORE importing the store
jest.mock("@/utils/supabase", () => ({
  supabase: {
    // mirror the exact Supabase methods used in store.ts
    auth: { signUp: jest.fn() },
    // or: from: jest.fn(() => ({ upsert: jest.fn(), select: jest.fn() })),
  },
}));

import { supabase } from "@/utils/supabase";
import use<Feature>Store from "./store";

const mock<Action> = supabase.auth.<method> as jest.Mock;
// or: const mockFrom = supabase.from as jest.Mock;

describe("<feature> feature store", () => {
  beforeEach(() => {
    mock<Action>.mockReset();
    use<Feature>Store.getState().reset();
  });

  it("updates form fields", () => {
    const { result } = renderHook(() => use<Feature>Store());

    act(() => {
      result.current.setField("<field>", "<value>");
    });

    expect(result.current.values.<field>).toBe("<value>");
  });

  it("calls <action> and clears submitting on success", async () => {
    mock<Action>.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => use<Feature>Store());

    act(() => {
      result.current.setField("<field>", "<value>");
    });

    await act(async () => {
      const response = await result.current.<action>();
      expect(response.error).toBeNull();
    });

    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("stores error message on <action> failure", async () => {
    mock<Action>.mockResolvedValueOnce({ error: { message: "Something went wrong" } });
    const { result } = renderHook(() => use<Feature>Store());

    await act(async () => {
      const response = await result.current.<action>();
      expect(response.error).toBeTruthy();
    });

    expect(result.current.error).toBe("Something went wrong");
    expect(result.current.submitting).toBe(false);
  });
});
```

**Rules:**
- `jest.mock(...)` must appear before any import of the module being mocked
- Always reset mocks and store state in `beforeEach`
- Cover: field updates, success path, error path
- Use `act()` for state changes; `await act(async () => ...)` for async actions

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

// Result type for async store actions
export type <Feature>Result = {
  error: Error | null;
};
```

**Rules:**
- Use `export type` for all exports (type-only imports/exports)
- Name the domain entity `<Feature>Item` (singular, PascalCase + "Item")
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
| Using `useState` for form state | Put all state in the Zustand store |
| Using `immer` when not needed | Only use Immer for nested object mutations |
| Importing Supabase directly in component | Always go through the store action |
| Placing `jest.mock` after imports | Always mock before the module import |
| Skipping the error branch in tests | Always test success + error paths |
| Using plain `create` without type param | `create<StoreName>(...)` for strict types |
| Declaring types inline in `store.ts` or `component.tsx` | Always put types in `types.ts` and import them |
| Using sequential IDs (`1`, `2`) in seed data | Prefix IDs with `seed-<feature>-` for easy cleanup |
| Omitting the SQL seed | Always export `<feature>SeedSQL` alongside the typed array |
| Inlining raw test values in `test.ts` | Import from `data.ts` (`<feature>Seeds[0]`) for consistency |
