import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export const useUserProfile = () => {
  // ✅ Create client directly (client-side only)
  const supabase = createClient<Database>(
    process.env.NUXT_PUBLIC_SUPABASE_URL || '',
    process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  const profile = ref<any>(null)

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      profile.value = data
      return data
    } catch (err) {
      console.error('Error fetching profile:', err)
      return null
    }
  }

  return { profile, fetchUserProfile }
}