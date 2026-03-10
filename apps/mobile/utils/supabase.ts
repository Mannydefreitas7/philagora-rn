import { observable } from "@legendapp/state";
import {
  configureSyncedSupabase,
  type SyncedSupabaseConfig,
  syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CompositeTypes, Database } from "@repo/typings/database";
import { createClient, processLock, type SupabaseClient } from "@supabase/supabase-js";
import generatedId from "react-native-uuid";

type TCollectionName = keyof Database["public"]["Tables"];
class SupabaseInstance {
  public static shared: SupabaseInstance = new SupabaseInstance();
  // public client = supabase;
  private supabaseUrl?: string;
  private supabaseAnonKey?: string;
  private isConfigured = false;
  private supabaseClient?: SupabaseClient<Database>;
  // provide a function to generate ids locally
  private generateId = () => generatedId.v4();

  // Authentication
  public get auth() {
    return this.client.auth;
  };

  public get client(): SupabaseClient<Database> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client is not initialized");
    }
    return this.supabaseClient;
  }

  public get listen() {
    if (!this.supabaseClient) {
      throw new Error("Supabase client is not initialized");
    }
    const $observable = observable(this.supabaseClient);
    return $observable;
  }

  private constructor() {
    this.supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
    this.supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_KEY;
    if (!this.isConfigured) this.configure();
  }

  // create an observable to store the session
  private configure() {
    configureSyncedSupabase({
      generateId: this.generateId,
    });
    this.isConfigured = true;
    this.supabaseClient = this.setupClient();
  }

  private setupClient() {
    if (!this.supabaseUrl) {
      throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL");
    }

    if (!this.supabaseAnonKey) {
      throw new Error("Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY or EXPO_PUBLIC_SUPABASE_KEY");
    }

    const supabase = createClient<Database, "public", "public">(this.supabaseUrl, this.supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock,
      },
    });
    return supabase;
  }

  public collection<T extends TCollectionName = TCollectionName>(
    table: T,
    { ...options }: SyncedSupabaseConfig<CompositeTypes<{ schema: "public" }>, Database>,
  ) {
    if (!this.supabaseClient || !this.supabaseClient.schema) {
      throw new Error("Supabase client is not initialized");
    }
    return syncedSupabase({
      supabase: this.supabaseClient,
      collection: table,
      schema: "public",
      realtime: true,
      ...options,
    });
  }

  public getClient(): SupabaseClient<Database> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client is not initialized");
    }
    return this.supabaseClient;
  }
}

const instance = SupabaseInstance.shared;
export default instance;
