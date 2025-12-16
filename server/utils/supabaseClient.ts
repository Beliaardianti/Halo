import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('DEBUG: Env vars:', {
      url: process.env.SUPABASE_URL,
      key: !!process.env.SUPABASE_ANON_KEY
    })
    throw new Error(`Missing Supabase config: url=${!!supabaseUrl}, key=${!!supabaseServiceKey}`)
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })
}