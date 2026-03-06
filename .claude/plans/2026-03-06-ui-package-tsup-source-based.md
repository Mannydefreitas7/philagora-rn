# Design: Source-based `@repo/ui` with tsup

**Date:** 2026-03-06
**Status:** Approved

## Problem

`@repo/ui` is currently broken as an internal package:
- Build script is `tsc`, but `tsconfig.json` extends `@repo/configs/ts/expo` which has `noEmit: true` — no files are ever emitted
- `dist/` and `lib/` directories don't exist
- `package.json` points to these non-existent directories
- Single export entry (`.`) with no sub-path exports

## Approach: Source-based with optional tsup production build

Every consuming bundler (Metro, Vite, esbuild) resolves TypeScript source directly — no build step required for internal consumption. tsup is added for an optional production build and `.d.ts` generation.

## Changes

### 1. `package.json`
- `main` and `types` point to `./src/index.ts`
- `exports` map sub-paths to source files:
  - `.` → `./src/index.ts`
  - `./base` → `./src/base/index.ts`
  - `./molecules` → `./src/molecules/index.ts`
  - `./organisms` → `./src/organisms/index.ts`
- `files` contains `["src"]` (no dist in VCS)
- `scripts.build` → `tsup`
- `scripts.check-types` → `tsc --noEmit`
- Add `tsup` as devDependency

### 2. `tsup.config.ts` (new file)
- Entry points: `index`, `base`, `molecules`, `organisms`
- Format: `['esm', 'cjs']`
- `dts: true` for declaration generation
- `clean: true`
- Externalize all React Native / Expo / peer deps

### 3. `tsconfig.json`
- Remove `outDir`, `declarationDir` (no longer needed)
- Keep path aliases (`~/base/*`, `~/molecules/*`, `~/organisms/*`)
- Keep `noEmit: true` (implicit via expo base, explicit for clarity)
- Fix `module`/`moduleResolution` to be consistent

### 4. `turbo.json`
- `build` task: `cache: true`, outputs `dist/**`
- Apps consuming `@repo/ui` no longer depend on this build — Metro resolves source directly

## Non-goals
- Publishing to npm (private package)
- Supporting non-TypeScript consumers without a build step
