import { supabase } from '../utils/supabaseClient'


export default defineEventHandler(async (event) => {
  try {
    // Cek tables yang ada di database
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (error) {
      return {
        success: false,
        message: `Error checking tables: ${error.message}`,
        tables: []
      }
    }

    return {
      success: true,
      tables: tables?.map(t => t.table_name) || [],
      count: tables?.length || 0
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      tables: []
    }
  }
})
