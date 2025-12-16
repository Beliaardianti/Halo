import { H3Event } from 'h3'
import { createServerSupabaseClient } from '../../utils/supabaseClient'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email dan password wajib diisi'
    })
  }

  // Login melalui Supabase Auth
  const { data, error } = await createServerSupabaseClient().auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw createError({
      statusCode: 401,
      message: 'Email atau password salah'
    })
  }

  return {
    success: true,
    message: 'Login berhasil',
    data: {
      token: data.session?.access_token,
      user: {
        id: data.user?.id,
        email: data.user?.email
      }
    }
  }
})
