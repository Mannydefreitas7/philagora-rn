---
name: update-feature
description: Use when updating or migrating an existing feature module in apps/mobile/features/ to match the current six-file standard defined in create-feature. Triggers on requests like "update feature", "migrate feature", "bring feature up to date", "refactor feature to latest structure".
---

# Update Feature

## Overview

Audits an existing feature folder against the six-file standard from `create-feature` and brings every file into compliance — without changing business logic or breaking existing behaviour.

**REQUIRED:** Load and read the `create-feature` skill before proceeding. It defines all templates, naming conventions, and rules that this skill enforces.

Six canonical files:

| File | Purpose |
|---|---|
| `types.ts` | Single source of truth for all types |
| `data.ts` | Seed array + SQL seed |
| `store.ts` | Zustand store — imports types from `types.ts` |
| `component.tsx` | UI — Tailwind classes, HeroUI Native |
| `test.ts` | Jest — uses seeds from `data.ts` |
| `index.ts` | Re-exports component, store hook, and types |

---

## Step-by-Step Process

### 1. Identify the feature

Confirm the feature path with the user, e.g. `features/authentication/login`.

### 2. Read every existing file

Read all files currently in the folder before touching anything. Never edit blind.

### 3. Audit each file against the standard

For every file, determine its status:

| Status | Meaning |
|---|---|
| **Missing** | File does not exist — must be created from scratch |
| **Non-compliant** | File exists but violates one or more rules |
| **Compliant** | File already matches the standard — leave it alone |

Report the audit to the user before making any changes. Format:

```
types.ts    — MISSING
data.ts     — MISSING
store.ts    — Non-compliant: types declared inline (not imported from types.ts)
component.tsx — Non-compliant: uses StyleSheet.create for layout
test.ts     — Non-compliant: inlines raw values instead of importing from data.ts
index.ts    — Non-compliant: missing type re-exports
```

### 4. Update files in dependency order

Always process in this order so each file exists before it is imported:

```
1. types.ts       (no local deps)
2. data.ts        (imports from types.ts)
3. store.ts       (imports from types.ts)
4. component.tsx  (imports from store.ts)
5. test.ts        (imports from store.ts and data.ts)
6. index.ts       (imports from all)
```

### 5. Preserve business logic

When updating a non-compliant file:
- **Keep** all existing action implementations, Supabase calls, field names, validation logic
- **Only change** what violates the standard (inline types → import, `StyleSheet.create` → `className`, etc.)
- **Never rename** exported identifiers that are used outside the feature folder without checking all callers first

---

## Per-File Compliance Rules

### `types.ts` — Missing or inline types

**Create if missing.** Extract all types declared inline in `store.ts` or `component.tsx` into `types.ts`.

Checklist:
- [ ] `export type <Feature>Item` — domain entity mirroring Supabase table (camelCase columns)
- [ ] `export type <Feature>Values` — form/input fields
- [ ] `export type <Feature>Result = { error: Error | null }`
- [ ] All exports use `export type` (not `export interface` or bare `export`)

---

### `data.ts` — Missing or incomplete seed

**Create if missing.** Must be consistent with the types in `types.ts`.

Checklist:
- [ ] `import type { <Feature>Item } from "./types"`
- [ ] `export const <feature>Seeds: <Feature>Item[]` with 3–5 records
- [ ] IDs prefixed `seed-<feature>-N`
- [ ] At least one edge-case record (long text, zero counts, optional field absent)
- [ ] ISO 8601 strings for all dates
- [ ] `export const <feature>SeedSQL` with `INSERT ... ON CONFLICT (id) DO NOTHING`

---

### `store.ts` — Inline types, missing imports

Checklist:
- [ ] Imports `<Feature>Values`, `<Feature>Result` from `"./types"` — no local type declarations
- [ ] `create<<Feature>Store>(...)` — typed generic, not plain `create(...)`
- [ ] Both named export (`export const use<Feature>Store`) and `export default`
- [ ] `setField` uses generic key constraint `<K extends keyof <Feature>Values>`
- [ ] Every async action: sets `submitting: true` before call, `false` in both branches
- [ ] No Immer unless state has deeply nested objects requiring mutation

---

### `component.tsx` — Styling, imports

Checklist:
- [ ] Zero `StyleSheet.create` calls — all layout via `className`
- [ ] HeroUI Native used for interactive elements (`Button`, `Input`, etc.)
- [ ] No `useState` for field values — reads from store
- [ ] Imports store from `"./store"` (relative, not `@/features/...`)
- [ ] Error string rendered conditionally: `{error ? <Text className="...text-red-600">{error}</Text> : null}`

---

### `test.ts` — Mock order, seed usage, coverage

Checklist:
- [ ] `jest.mock("@/utils/supabase", ...)` appears before any `import` of the store
- [ ] `beforeEach` resets mocks and calls `use<Feature>Store.getState().reset()`
- [ ] Test values sourced from `<feature>Seeds` in `"./data"` — no inlined raw literals
- [ ] Covers: field updates, success path, error path (minimum 3 test cases)
- [ ] Uses `await act(async () => ...)` for async store actions

---

### `index.ts` — Exports

Checklist:
- [ ] `export { default } from "./component"`
- [ ] `export { default as <Feature>Feature } from "./component"`
- [ ] `export { default as use<Feature>Store } from "./store"`
- [ ] `export type { <Feature>Item, <Feature>Values } from "./types"`

---

## What NOT to Change

- Supabase table names, column names, query logic
- Field names in `<Feature>Values` (changing these would break the store and component in tandem)
- Any logic inside async actions beyond moving types to `types.ts`
- File names or folder path unless explicitly requested
- Existing test cases that are already passing — only add missing ones, don't rewrite passing ones

## Common Mistakes During Updates

| Mistake | Fix |
|---|---|
| Moving types to `types.ts` but leaving the old declarations in `store.ts` | Delete the originals after confirming `types.ts` exports them |
| Rewriting action logic while fixing types | Separate concerns — change types first, logic never |
| Updating `index.ts` before `types.ts` exists | Always follow dependency order |
| Adding Immer "while you're in there" | Only add Immer if the existing store actually needs nested mutation |
| Renaming `use<Feature>Store` without checking callers | Grep for usages outside the folder first |
