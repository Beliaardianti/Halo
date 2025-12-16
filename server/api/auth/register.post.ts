export default defineEventHandler(async (event) => {
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const config = useRuntimeConfig()

    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    )

    const body = await readBody(event)
    const {
      email,
      password,
      accountType,
      firstName,
      middleName,
      lastName
    } = body

    // ✅ Step 1: Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      return { success: false, message: error.message }
    }

    // 🔐 User bisa null jika email confirmation ON
    if (!data.user) {
      return {
        success: true,
        message: 'Registrasi berhasil, silakan cek email untuk verifikasi'
      }
    }

  
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id, // Pakai user_id sebagai id di table
        first_name: firstName,
        last_name: lastName,
        account_type: accountType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('Profile save error:', profileError)
      // Jangan return error, user auth sudah berhasil
    }

    return {
      success: true,
      message: 'Registrasi berhasil',
      data: {
        token: data.session?.access_token ?? null,
        user: {
          id: data.user.id,
          email: data.user.email,
          account_type: accountType,
          first_name: firstName,
          last_name: lastName
        }
      }
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Terjadi kesalahan server'

    return { success: false, message }
  }
})