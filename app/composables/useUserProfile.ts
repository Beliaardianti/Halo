import { ref } from 'vue'
import { supabase } from '../../server/utils/supabaseClient'

export const useUserProfile = () => {
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