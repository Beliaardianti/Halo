import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export default defineNuxtPlugin(() => {
  // ✅ Ambil dari runtimeConfig (bukan process.env)
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseKey as string

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase config:')
    console.error('   supabaseUrl:', supabaseUrl)
    console.error('   supabaseKey:', supabaseKey)
    console.error('   Check nuxt.config.ts runtimeConfig')
    return
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseKey)
  console.log('✅ Supabase plugin loaded successfully')

  return {
    provide: {
      supabase
    }
  }
})