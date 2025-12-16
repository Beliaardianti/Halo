import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const supabase = createClient<Database>(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  return {
    provide: {
      supabase
    }
  }
})
