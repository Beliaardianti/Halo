import type { Database } from './database.types'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js'

export type Tables = Database['public']['Tables']
export type TableName = keyof Tables
export type Table<T extends TableName> = Tables[T]
export type Row<T extends TableName> = Table<T>['Row']
export type Insert<T extends TableName> = Table<T>['Insert']
export type Update<T extends TableName> = Partial<Insert<T>>

export type SupabaseClientType = SupabaseClient<Database>

export type DBQuery<T extends TableName> = PostgrestFilterBuilder<Database, T, Row<T>>
export type DBResult<T> = { data: T | null; error: Error | null }