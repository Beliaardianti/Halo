import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'
import type { Session, User } from '@supabase/supabase-js'
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

type Tables = Database['public']['Tables']

export const useSupabaseData = () => {
  const config = useRuntimeConfig()
  
  // ✅ Create client from runtime config
  const client = createClient<Database>(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  )
  
  const user = ref<User | null>(null)

  // Get initial user
  onMounted(async () => {
    const { data: { user: currentUser } } = await client.auth.getUser()
    user.value = currentUser
  })

  // Listen for auth changes
  client.auth.onAuthStateChange((_event: string, session: Session | null) => {
    user.value = session?.user || null
  })

  const handleError = (error: unknown) => ({
    success: false,
    error: error instanceof Error ? error.message : 'Unknown error occurred',
  })

  const checkAuth = () => {
    if (!user.value?.id) {
      return { success: false, error: 'User not authenticated' }
    }
    return null
  }

  // Opportunities
  const fetchOpportunities = async (filters: {
    type?: string
    location?: string
    experience?: string
  } = {}) => {
    try {
      let query = client
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (filters.type) {
        query = query.eq('job_type', filters.type)
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters.experience) {
        query = query.eq('experience_level', filters.experience)
      }

      const { data, error } = await query

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching opportunities:', error)
      return { success: false, error }
    }
  }

  const saveOpportunity = async (opportunityId: string, notes?: string) => {
    if (!user.value?.id) return { success: false, error: 'User not authenticated' }

    try {
      const { data: existingSave, error: checkError } = await client
        .from('saved_opportunities')
        .select()
        .eq('user_id', user.value.id)
        .eq('opportunity_id', opportunityId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingSave) {
        return { success: false, error: 'Opportunity already saved' }
      }

      const { data: savedOpportunity, error: saveError } = await client
        .from('saved_opportunities')
        .insert({
          user_id: user.value.id,
          opportunity_id: opportunityId,
          notes,
        } as any)
        .select()
        .single()

      if (saveError) throw saveError
      return { success: true, data: savedOpportunity }
    } catch (error) {
      console.error('Error saving opportunity:', error)
      return handleError(error)
    }
  }

  // Goals
  const fetchGoals = async (params: { user_id: string }) => {
    try {
      const { data, error } = await client
        .from('goals')
        .select('*')
        .eq('user_id', params.user_id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching goals:', error)
      return { success: false, error }
    }
  }

  const createGoal = async (goalData: any) => {
    if (!user.value?.id) return { success: false, error: 'User not authenticated' }

    try {
      const { data, error } = await client
        .from('goals')
        .insert({
          ...goalData,
          user_id: user.value.id,
        } as any)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error creating goal:', error)
      return handleError(error)
    }
  }

  const updateGoal = async (goalId: string, updates: any) => {
    try {
      const { data, error } = await ((client as any)
        .from('goals')
        .update(updates)
        .eq('id', goalId)
        .select()
        .single())

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error updating goal:', error)
      return handleError(error)
    }
  }

  const deleteGoalById = async (goalId: string) => {
    try {
      const { data, error } = await client
        .from('goals')
        .delete()
        .eq('id', goalId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error deleting goal:', error)
      return { success: false, error }
    }
  }

  // Mentors
  const fetchMentors = async (filters: { expertise?: string } = {}) => {
    try {
      let query = client
        .from('mentors')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

      if (filters.expertise) {
        query = query.contains('expertise', [filters.expertise])
      }

      const { data, error } = await query

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching mentors:', error)
      return { success: false, error }
    }
  }

  const applyAsMentor = async (mentorData: any) => {
    if (!user.value?.id) return { success: false, error: 'User not authenticated' }

    try {
      const { data, error } = await client
        .from('mentors')
        .insert({
          ...mentorData,
          user_id: user.value.id,
          is_approved: false
        } as any)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error applying as mentor:', error)
      return handleError(error)
    }
  }

  // Applications
  const fetchApplications = async (userId: string) => {
    try {
      const { data, error } = await client
        .from('applications')
        .select('*, opportunities(*)')
        .eq('user_id', userId)
        .order('applied_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching applications:', error)
      return { success: false, error }
    }
  }

  const createApplication = async (applicationData: any) => {
    try {
      const { data, error } = await client
        .from('applications')
        .insert(applicationData as any)
        .select()
        .single()

      if (error) throw error

      const { data: opportunity } = await client
        .from('opportunities')
        .select('applications_count')
        .eq('id', applicationData.opportunity_id)
        .single()

      if (opportunity) {
        await ((client as any)
          .from('opportunities')
          .update({
            applications_count: ((opportunity as any).applications_count || 0) + 1
          })
          .eq('id', applicationData.opportunity_id)
        )
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error creating application:', error)
      return handleError(error)
    }
  }

  // User Preferences
  const fetchUserPreferences = async () => {
    if (!user.value?.id) return { success: false, error: 'User not authenticated' }

    try {
      const { data, error } = await client
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.value.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching user preferences:', error)
      return handleError(error)
    }
  }

  const updateUserPreferences = async (preferences: any) => {
    if (!user.value?.id) return { success: false, error: 'User not authenticated' }

    try {
      const { data, error } = await client
        .from('user_preferences')
        .upsert({
          user_id: user.value.id,
          ...preferences
        } as any)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error updating user preferences:', error)
      return handleError(error)
    }
  }

  return {
    user,
    fetchOpportunities,
    saveOpportunity,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoalById,
    fetchMentors,
    applyAsMentor,
    fetchApplications,
    createApplication,
    fetchUserPreferences,
    updateUserPreferences
  }
}