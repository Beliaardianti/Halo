import { createServerSupabaseClient } from '../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    // GET: Fetch applications
    if (method === 'GET') {
      const query = getQuery(event)
      const { user_id } = query

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required in query'
        })
      }

      const { data, error } = await createServerSupabaseClient()
        .from('applications')
        .select(`
          *,
          opportunity:opportunities(*)
        `)
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        data,
        count: data?.length || 0
      }
    }

    // POST: Create new application
    if (method === 'POST') {
      const body = await readBody(event)
      const { user_id, opportunityId, coverLetter, resumeUrl } = body

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required in body'
        })
      }

      if (!opportunityId) {
        throw createError({
          statusCode: 400,
          message: 'Opportunity ID is required'
        })
      }

      // Check if already applied
      const { data: existing } = await createServerSupabaseClient()
        .from('applications')
        .select('id')
        .eq('user_id', user_id)
        .eq('opportunity_id', opportunityId)
        .single()

      if (existing) {
        throw createError({
          statusCode: 400,
          message: 'You have already applied to this opportunity'
        })
      }

     // Insert application
const { data, error } = await createServerSupabaseClient()
  .from('applications')
  .insert({
    user_id,
    opportunity_id: opportunityId,
    status: 'pending',
    cover_letter: coverLetter || null,
    resume_url: resumeUrl || null
  } as any) // Type assertion to bypass the error
  .select(`
    *,
    opportunity:opportunities(*)
  `)
  .single()

      if (error) throw error

      return {
        success: true,
        message: 'Application submitted successfully',
        data
      }
    }

    // Method not allowed
    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('Applications API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})
