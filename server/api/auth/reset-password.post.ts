import { createServerSupabaseClient } from '../../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password, confirmPassword } = body

  // Validasi input
  if (!password || !confirmPassword) {
    throw createError({
      statusCode: 400,
      message: 'Password dan konfirmasi password wajib diisi'
    })
  }

  // Validasi password match
  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      message: 'Password dan konfirmasi password tidak cocok'
    })
  }

  // Validasi password strength
  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      message: 'Password minimal 6 karakter'
    })
  }

  try {
    // Update password
    const { data, error } = await createServerSupabaseClient().auth.updateUser({
      password: password
    })

    if (error) {
      throw error
    }

    return {
      success: true,
      message: 'Password berhasil diubah. Silakan login dengan password baru Anda.',
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email
        }
      }
    }
  } catch (error: any) {
    console.error('Reset password error:', error)

    throw createError({
      statusCode: 500,
      message: error.message || 'Gagal mengubah password. Link mungkin sudah kadaluarsa.'
    })
  }
})
