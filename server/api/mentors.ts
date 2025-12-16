import { supabase } from '../utils/supabaseClient'


export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    // === GET: ambil daftar mentor ===
    if (method === 'GET') {
      const query = getQuery(event)
      const { expertise } = query

      let dbQuery = supabase
        .from('mentors')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

      if (expertise) {
        dbQuery = dbQuery.contains('expertise', [expertise])
      }

      const { data, error } = await dbQuery

      if (error) throw error

      return { success: true, data }
    }

    // === POST: daftar jadi mentor ===
    if (method === 'POST') {
      const body = await readBody(event)
      const { user_id, ...mentorData } = body

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required in body'
        })
      }

      // Cek apakah user sudah pernah apply
      const { data: existing } = await supabase
        .from('mentors')
        .select('id')
        .eq('user_id', user_id)
        .single()

      if (existing) {
        throw createError({
          statusCode: 400,
          message: 'You have already applied as a mentor'
        })
      }

      // Insert data baru
      const { data, error } = await supabase
        .from('mentors')
        .insert({
          user_id,
          is_approved: false,
          ...mentorData
        })
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        message: 'Mentor application submitted successfully',
        data
      }
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
