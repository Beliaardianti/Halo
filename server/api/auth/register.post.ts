import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // ✅ Dynamic import
    const { createClient } = await import('@supabase/supabase-js')

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return {
        success: false,
        message: 'Supabase config missing'
      }
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await readBody(event)
    const { email, password, accountType } = body

    if (!email || !password) {
      return {
        success: false,
        message: 'Email dan password harus diisi'
      }
    }

    console.log('📝 Registering:', email)

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.error('Auth error:', error.message)
      return { success: false, message: error.message }
    }

    if (!data.user) {
      return {
        success: false,
        message: 'User tidak berhasil dibuat'
      }
    }

    console.log('✅ User created:', data.user.id)

    // Insert profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        first_name: '',
        account_type: accountType || 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('Profile error:', profileError.message)
    }

    return {
      success: true,
      message: 'Registrasi berhasil',
      data: {
        token: data.session?.access_token ?? null,
        user: {
          id: data.user.id,
          email: data.user.email,
          account_type: accountType
        }
      }
    }

  } catch (err) {
    console.error('❌ Register error:', err)
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Register failed'
    }
  }
})