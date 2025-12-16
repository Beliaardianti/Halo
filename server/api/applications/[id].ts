import { supabase } from '../../utils/supabaseClient'

interface Application {
  id: string
  user_id: string
  opportunity_id: string
  status: string
}

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Application ID is required'
    })
  }

  try {
    // DELETE: Remove application
    if (method === 'DELETE') {
      const query = getQuery(event)
      const { user_id } = query

      if (!user_id) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized — user_id is required'
        })
      }

      console.log('[Applications DELETE] Removing application:', id, 'for user:', user_id)

      // Verify ownership - only user who applied can delete
      const { data: appData, error: fetchError } = await supabase
        .from('applications')
        .select('user_id')
        .eq('id', id)
        .single()

      if (fetchError || !appData) {
        throw createError({
          statusCode: 404,
          message: 'Application not found'
        })
      }

      if ((appData as Application).user_id !== user_id) {
        throw createError({
          statusCode: 403,
          message: 'Forbidden — you can only delete your own applications'
        })
      }

      // Delete the application
      const { error: deleteError } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      console.log('[Applications DELETE] Application deleted successfully')
      return {
        success: true,
        message: 'Application deleted successfully'
      }
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('[Applications DELETE] Error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})
