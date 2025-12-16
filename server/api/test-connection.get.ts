import { supabase } from '../utils/supabaseClient'


export default defineEventHandler(async () => {
  try {
    // Ambil data dari tabel 'opportunities'
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10)

    // Jika Supabase kirim error
    if (error) {
      console.error('Supabase query error:', error.message)
      throw createError({
        statusCode: 500,
        statusMessage: `Supabase query failed: ${error.message}`,
      })
    }

    // Jika tidak ada data
    if (!data || data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No opportunities found',
      })
    }

    // Sukses
    return {
      success: true,
      data,
      count: data.length,
    }
  } catch (err: any) {
    console.error('Unexpected server error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Internal Server Error',
    })
  }
})
