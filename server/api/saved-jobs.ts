import { defineEventHandler, getQuery, createError, readBody } from 'h3'
import { createServerSupabaseClient } from '../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    // GET: Fetch saved jobs
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
        .from('saved_opportunities')
        .select(`
          *,
          opportunity:opportunities(*)
        `)
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        success: true,
        data: data || [],
        count: data?.length || 0
      }
    }

    // POST: Save a job
    if (method === 'POST') {
      const body = await readBody(event)
      const { user_id, opportunity_id } = body

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      if (!opportunity_id) {
        throw createError({
          statusCode: 400,
          message: 'Opportunity ID is required'
        })
      }

      // Check if already saved
      const { data: existing } = await createServerSupabaseClient()
        .from('saved_opportunities')
        .select('id')
        .eq('user_id', user_id)
        .eq('opportunity_id', opportunity_id)
        .single()

      if (existing) {
        throw createError({
          statusCode: 400,
          message: 'Job already saved'
        })
      }

      // Insert saved job
      const { data, error } = await ((createServerSupabaseClient() as any)
        .from('saved_opportunities')
        .insert({
          user_id,
          opportunity_id
        })
        .select(`
          *,
          opportunity:opportunities(*)
        `)
        .single())

      if (error) throw error

      return {
        success: true,
        message: 'Job saved successfully',
        data
      }
    }

    // DELETE: Unsave a job
    if (method === 'DELETE') {
      const body = await readBody(event)
      const { user_id, opportunity_id } = body

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      if (!opportunity_id) {
        throw createError({
          statusCode: 400,
          message: 'Opportunity ID is required'
        })
      }

      const { error } = await createServerSupabaseClient()
        .from('saved_opportunities')
        .delete()
        .eq('user_id', user_id)
        .eq('opportunity_id', opportunity_id)

      if (error) throw error

      return {
        success: true,
        message: 'Job removed from saved'
      }
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('Saved jobs API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})