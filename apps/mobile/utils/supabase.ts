import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock, SupabaseClient } from "@supabase/supabase-js";
import { configureSyncedSupabase, syncedSupabase, type SupabaseCollectionOf } from '@legendapp/state/sync-plugins/supabase';
import { observable } from "@legendapp/state";
import generatedId from "react-native-uuid"



type SyncedSupabasePropsWithSelect<T> = Omit<Parameters<typeof syncedSupabase>[0], "collection" | 'supabase'>;


class SupabaseInstance {
  private static instance: SupabaseInstance;
  // public client = supabase;
  private supabaseUrl?: string;
  private supabaseAnonKey?: string;
  private isConfigured = false;
  private supabaseClient?: SupabaseClient;
  // provide a function to generate ids locally
  private generateId = () => generatedId.v4();

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

  private setupClient<T>(): SupabaseClient<T> {

    if (!this.supabaseUrl) {
      throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL");
    }

    if (!this.supabaseAnonKey) {
      throw new Error("Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY or EXPO_PUBLIC_SUPABASE_KEY");
    }

    const supabase = createClient<T>(this.supabaseUrl, this.supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock,
        flowType: "pkce",
      },
    });
    return supabase;
  }

  public collection<T, Schema>(table: string, options?: SyncedSupabasePropsWithSelect<T>) {
    if (!this.supabaseClient) {
      throw new Error("Supabase client is not initialized");
    }
    return syncedSupabase({
      supabase: this.supabaseClient as SupabaseClient<T, '${table}', SupabaseCollectionOf<`${table}`>>,
      collection: table,
      ...options,
    });
  }


  public getClient() {
    if (!this.supabaseClient) {
      throw new Error("Supabase client is not initialized");
    }
    return this.supabaseClient;
  }

}
