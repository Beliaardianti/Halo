import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

const supabaseUrl = 'https://txznvfrytsxeclwwgtgk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4em52ZnJ5dHN4ZWNsd3dndGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NDU2MjEsImV4cCI6MjA3ODMyMTYyMX0.OuNpoiDeoOxjNl84SAFxor5UkXmcxJpOJdoTwn1uSdE'

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Subscribe ke auth changes
export const onAuthChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null)
  })
}
