import { supabase } from '../../utils/supabaseClient'

interface Goal {
  id: string
  user_id: string
  title: string
  description?: string
  category?: string
  target_date?: string
  completed: boolean
  shared_with_community: boolean
}

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Goal ID is required'
    })
  }

  try {
    // GET: Fetch single goal
    if (method === 'GET') {
      const query = getQuery(event)
      const { user_id } = query

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      console.log('[Goals GET] Fetching goal:', id)

      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', id)
        .eq('user_id', user_id)
        .single()

      if (error || !data) {
        throw createError({
          statusCode: 404,
          message: 'Goal not found'
        })
      }

      return {
        success: true,
        data
      }
    }

    // PUT: Update goal (mark as complete, update title, etc)
    if (method === 'PUT') {
      const query = getQuery(event)
      const { user_id } = query
      const body = await readBody(event)
      const { completed, title, description } = body

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      console.log('[Goals PUT] Updating goal:', id, 'with data:', { completed, title })

      // Verify ownership
      const { data: goalData, error: fetchError } = await supabase
        .from('goals')
        .select('user_id')
        .eq('id', id)
        .single()

      if (fetchError || !goalData) {
        throw createError({
          statusCode: 404,
          message: 'Goal not found'
        })
      }

      if ((goalData as Goal).user_id !== user_id) {
        throw createError({
          statusCode: 403,
          message: 'Forbidden — you can only update your own goals'
        })
      }

      // Build update object
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      }

      if (completed !== undefined) {
        updateData.completed = completed
      }
      if (title !== undefined) {
        updateData.title = title
      }
      if (description !== undefined) {
        updateData.description = description
      }

      // Update the goal
      const { data, error } = await supabase
        .from('goals')
        .update(updateData as any)
        .eq('id', id)
        .select()
        .single() as any

      if (error) throw error

      console.log('[Goals PUT] Goal updated successfully')
      return {
        success: true,
        message: 'Goal updated successfully',
        data
      }
    }

    // DELETE: Remove goal
    if (method === 'DELETE') {
      const query = getQuery(event)
      const { user_id } = query

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      console.log('[Goals DELETE] Removing goal:', id, 'for user:', user_id)

      // Verify ownership
      const { data: goalData, error: fetchError } = await supabase
        .from('goals')
        .select('user_id')
        .eq('id', id)
        .single()

      if (fetchError || !goalData) {
        throw createError({
          statusCode: 404,
          message: 'Goal not found'
        })
      }

      if ((goalData as Goal).user_id !== user_id) {
        throw createError({
          statusCode: 403,
          message: 'Forbidden — you can only delete your own goals'
        })
      }

      // Delete the goal
      const { error: deleteError } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      console.log('[Goals DELETE] Goal deleted successfully')
      return {
        success: true,
        message: 'Goal deleted successfully'
      }
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
