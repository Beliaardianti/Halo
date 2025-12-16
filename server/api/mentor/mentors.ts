import { supabase } from '../../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    // === POST: User apply untuk mentor ===
    if (method === 'POST') {
      const body = await readBody(event)
      const { user_id, mentor_id } = body

      // Validasi
      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      if (!mentor_id) {
        throw createError({
          statusCode: 400,
          message: 'mentor_id is required'
        })
      }

      // Cek apakah mentor exist dan approved
      const { data: mentor, error: mentorError } = await supabase
        .from('mentors')
        .select('id, full_name')
        .eq('id', mentor_id)
        .eq('is_approved', true)
        .single()

      if (mentorError || !mentor) {
        throw createError({
          statusCode: 404,
          message: 'Mentor not found or not approved'
        })
      }

      // Cek apakah sudah apply sebelumnya
      const { data: existing } = await supabase
        .from('mentor_applications')
        .select('id, status')
        .eq('mentor_id', mentor_id)
        .eq('user_id', user_id)
        .single()

      if (existing) {
        if (existing.status === 'accepted') {
          throw createError({
            statusCode: 400,
            message: 'You are already connected with this mentor'
          })
        }

        throw createError({
          statusCode: 400,
          message: 'You have already applied to this mentor'
        })
      }

      // Insert mentor application
      const { data, error } = await supabase
        .from('mentor_applications')
        .insert({
          mentor_id,
          user_id,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        message: `Application sent to ${mentor.full_name}`,
        data
      }
    }

    // === GET: ambil aplikasi user (optional) ===
    if (method === 'GET') {
      const query = getQuery(event)
      const { user_id } = query

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      const { data, error } = await supabase
        .from('mentor_applications')
        .select(`
          id,
          mentor_id,
          status,
          created_at,
          mentors (
            id,
            full_name,
            job_title,
            company
          )
        `)
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { success: true, data }
    }

    // === Method tidak diizinkan ===
    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})
