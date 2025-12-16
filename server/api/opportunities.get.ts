import { supabase } from '../utils/supabaseClient'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { type, location, experience, search } = query

  try {
    let dbQuery = supabase
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    // Filtering
    if (type) {
      console.log('Filtering by type:', type); // Debug log
      dbQuery = dbQuery.eq('job_type', type);
    }
    if (location) {
      dbQuery = dbQuery.ilike('location', `%${location}%`)
    }
    if (experience) {
      dbQuery = dbQuery.eq('experience_level', experience)
    }
    if (search) {
      dbQuery = dbQuery.or(
        `title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`
      )
    }

    const { data, error } = await dbQuery

    if (error) throw error

    return {
      success: true,
      data: data || [],
      count: data?.length || 0
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch opportunities'
    })
  }
})
