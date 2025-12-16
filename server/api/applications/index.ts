import { defineEventHandler, getQuery, createError, readBody } from 'h3'
import { createServerSupabaseClient } from '../../utils/supabaseClient'

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

      console.log('[Applications GET] Fetching applications for user:', user_id)

      const { data, error } = await createServerSupabaseClient()
        .from('applications')
        .select('*')
        .eq('user_id', user_id)
        .order('applied_at', { ascending: false })

      if (error) throw error

      console.log('[Applications GET] Found:', data?.length || 0, 'applications')
      return {
        success: true,
        data,
        count: data?.length || 0
      }
    }

    // POST: Create new application
    if (method === 'POST') {
      const body = await readBody(event)
      const { user_id, opportunityId, coverLetter, resumeUrl, portfolioUrl, notes } = body

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

      console.log('[Applications POST] Creating application:', { user_id, opportunityId })

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
      const { data, error } = await ((createServerSupabaseClient() as any)
        .from('applications')
        .insert({
          user_id,
          opportunity_id: opportunityId,
          status: 'pending',
          cover_letter: coverLetter || null,
          resume_url: resumeUrl || null,
          portfolio_url: portfolioUrl || null,
          notes: notes || null
        })
        .select()
        .single())

      if (error) {
        console.error('[Applications POST] Insert error:', error)
        throw error
      }

      console.log('[Applications POST] Application created:', (data as any)?.id)
      return {
        success: true,
        message: 'Application submitted successfully',
        data
      }
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('[Applications] Error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})