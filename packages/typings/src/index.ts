/**
 * philagora/packages/typings/src/index.ts
 *
 * Shared TypeScript interfaces for the Philagora monorepo.
 *
 * Purpose:
 * - Centralize common types used across apps/packages (mobile, web, api, etc.)
 * - Keep these types minimal and dependency-free so this package can be consumed
 *   by any part of the monorepo.
 *
 * Add or extend types here as your domain grows. Keep this file focused on
 * serializable shapes and simple function signatures (avoid framework-specific
 * runtime types).
 */
import { IUser, IUserState } from "./user";
import { IAuthPayload } from "./auth";
/**
 * Export a small namespace of types that might be helpful when consuming
 * the typings package from JavaScript (e.g. for runtime validation).
 */
export type { IUser, IUserState, IAuthPayload };
