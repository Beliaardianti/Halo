
import { supabase } from '../../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  // Validasi input
  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email wajib diisi'
    })
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Format email tidak valid'
    })
  }

  try {
    // Kirim email reset password
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.APP_URL || 'http://localhost:3000'}/reset-password`
    })

    if (error) {
      throw error
    }

    return {
      success: true,
      message: 'Email reset password telah dikirim. Silakan cek inbox Anda.'
    }
  } catch (error: any) {
    // Jangan expose informasi apakah email ada atau tidak (security best practice)
    // Tetap return success meskipun email tidak ditemukan
    console.error('Forgot password error:', error)

    return {
      success: true,
      message: 'Jika email terdaftar, link reset password akan dikirim ke email Anda.'
    }
  }
})
