import { supabase } from '../../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const method = event.method

  try {
    if (method === 'GET') {
      const query = getQuery(event)
      const { user_id } = query

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      console.log('[Goals GET] Fetching goals for user:', user_id)

      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })

      if (error) throw error

      console.log('[Goals GET] Found:', data?.length || 0, 'goals')
      return { success: true, data }
    }

    if (method === 'POST') {
      const body = await readBody(event)
      const { user_id, title, description, category, target_date, shared_with_community } = body

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      if (!title) {
        throw createError({
          statusCode: 400,
          message: 'Title is required'
        })
      }

      console.log('[Goals POST] Creating goal:', { user_id, title })

      const { data, error } = await supabase
        .from('goals')
        .insert([{
          user_id,
          title,
          description: description || '',
          category: category || '',
          target_date: target_date || null,
          completed: false,
          shared_with_community: shared_with_community || false
        }] as any)
        .select()
        .single()

      if (error) {
        console.error('[Goals POST] Insert error:', error)
        throw error
      }

      console.log('[Goals POST] Goal created:', (data as any)?.id)
      return { success: true, data }
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('[Goals] Error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})
