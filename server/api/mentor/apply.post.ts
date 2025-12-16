export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { user_id, mentor_id } = body

    // Validation
    if (!user_id || !mentor_id) {
      throw createError({
        statusCode: 400,
        message: 'user_id dan mentor_id wajib diisi'
      })
    }

    console.log('✅ User apply to mentor:', { user_id, mentor_id })

    return {
      success: true,
      message: 'Aplikasi berhasil dikirim! Mentor akan me-review request Anda.',
      data: {
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Gagal mengirim aplikasi'
    })
  }
})
