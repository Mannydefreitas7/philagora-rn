# @repo/ui Source-based Package with tsup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix `@repo/ui` so it is consumable by any app in the monorepo without a build step, using TypeScript source exports and tsup for an optional production build.

**Architecture:** `package.json` exports point directly to `.ts`/`.tsx` source files so consuming bundlers (Metro, Vite, esbuild) resolve TypeScript natively. tsup is installed as an optional build tool that produces dual ESM+CJS output with `.d.ts` declarations when `bun run build` is called. Internal consumers never need to run the build.

**Tech Stack:** tsup (esbuild wrapper), TypeScript 5.9, Bun workspaces, Turborepo

---

## Context to read before starting

- Design doc: `docs/plans/2026-03-06-ui-package-tsup-source-based.md`
- Current broken config: `packages/ui/package.json`, `packages/ui/tsconfig.json`, `packages/ui/turbo.json`
- All peer deps to externalize are in `packages/ui/package.json` under `dependencies`

---

### Task 1: Install tsup

**Files:**
- Modify: `packages/ui/package.json`

**Step 1: Add tsup as devDependency**

Run from `packages/ui/`:
```bash
cd packages/ui && bun add -D tsup
```

**Step 2: Verify it was added**

Check `packages/ui/package.json` has `"tsup"` in `devDependencies`.

**Step 3: Commit**

```bash
git add packages/ui/package.json bun.lock
git commit -m "chore(ui): add tsup as devDependency"
```

---

### Task 2: Create `tsup.config.ts`

**Files:**
- Create: `packages/ui/tsup.config.ts`

**Step 1: Create the config**

Create `packages/ui/tsup.config.ts` with this exact content:

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    base: "src/base/index.ts",
    molecules: "src/molecules/index.ts",
    organisms: "src/organisms/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react-native",
    "expo",
    "expo-router",
    "expo-blur",
    "expo-image",
    "expo-linear-gradient",
    "react-native-reanimated",
    "react-native-worklets",
    "react-native-svg",
    "react-native-pager-view",
    "@shopify/react-native-skia",
    "lottie-react-native",
    "@gorhom/bottom-sheet",
    "@gorhom/portal",
    "heroui-native",
    "iconsax-react-nativejs",
    "react-native-uuid",
  ],
});
```

**Step 2: Verify tsup can parse the config**

Run from `packages/ui/`:
```bash
cd packages/ui && bunx tsup --help
```
Expected: tsup help output (not an error).

**Step 3: Commit**

```bash
git add packages/ui/tsup.config.ts
git commit -m "chore(ui): add tsup.config.ts with dual esm/cjs output"
```

---

### Task 3: Fix `tsconfig.json`

**Files:**
- Modify: `packages/ui/tsconfig.json`

**Context:** The current config extends `@repo/configs/ts/expo` which has `noEmit: true`. It also sets `outDir` and `declarationDir` which conflict with `noEmit`. Since we're source-based, we don't need these emit options — tsup handles output, not tsc. We need `noEmit: true` explicitly plus the path aliases intact.

**Step 1: Replace the content of `packages/ui/tsconfig.json`**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@repo/configs/ts/base",
  "compilerOptions": {
    "noEmit": true,
    "jsx": "react-jsx",
    "lib": ["DOM", "ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "~/base/*": ["./src/base/*"],
      "~/molecules/*": ["./src/molecules/*"],
      "~/organisms/*": ["./src/organisms/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["dist", "node_modules"]
}
```

**Note:** We switch from `@repo/configs/ts/expo` (which had `noEmit: true` AND was designed for app-level, not library configs) to `@repo/configs/ts/base` and add only what the library needs.

**Step 2: Run type-check to verify no regressions**

```bash
cd packages/ui && bun run check-types
```

Expected: Exits with 0 errors (or review and fix any pre-existing errors).

**Step 3: Commit**

```bash
git add packages/ui/tsconfig.json
git commit -m "fix(ui): fix tsconfig to use base config with noEmit, remove broken outDir"
```

---

### Task 4: Fix `package.json` exports and scripts

**Files:**
- Modify: `packages/ui/package.json`

**Step 1: Update `package.json` to this exact content** (preserve all dependency fields as-is, only change the top-level fields shown below):

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./base": "./src/base/index.ts",
    "./molecules": "./src/molecules/index.ts",
    "./organisms": "./src/organisms/index.ts"
  },
  "files": ["src", "dist"],
  "scripts": {
    "build": "tsup",
    "generate:component": "turbo gen react-component",
    "check-types": "tsc --noEmit",
    "clean": "rm -rf dist .turbo node_modules"
  }
}
```

Keep all `dependencies` and `devDependencies` fields unchanged.

Note: `"lib"` is removed from `files` (we no longer use `declarationDir`). `"dist"` stays in `files` for when tsup builds are published.

**Step 2: Verify the mobile app can still resolve the package**

```bash
cd apps/mobile && bun run check-types
```

Expected: Resolves `@repo/ui` imports without "module not found" errors.

**Step 3: Commit**

```bash
git add packages/ui/package.json
git commit -m "fix(ui): point exports to source .ts files, fix scripts"
```

---

### Task 5: Fix `turbo.json`

**Files:**
- Modify: `packages/ui/turbo.json`

**Step 1: Update to cache the tsup build output**

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "extends": ["//"],
  "tasks": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "start": {
      "cache": false,
      "persistent": false,
      "dependsOn": ["build"]
    }
  }
}
```

**Step 2: Commit**

```bash
git add packages/ui/turbo.json
git commit -m "chore(ui): enable turbo cache for tsup dist output"
```

---

### Task 6: Verify end-to-end

**Step 1: Type-check the entire workspace from root**

```bash
bun run check-types
```

Expected: 0 errors.

**Step 2: Run tsup build to verify it produces output**

```bash
cd packages/ui && bun run build
```

Expected: `dist/index.js`, `dist/index.mjs`, `dist/base.js`, `dist/molecules.js`, `dist/organisms.js`, and corresponding `.d.ts` files are created.

**Step 3: Verify the mobile app imports resolve correctly**

```bash
cd apps/mobile && bun run check-types
```

Expected: No `@repo/ui` import errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(ui): source-based exports with tsup build — package fully consumable"
```
