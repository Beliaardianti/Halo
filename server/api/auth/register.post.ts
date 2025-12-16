import { defineEventHandler, readBody, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    // ✅ Get config
    const config = useRuntimeConfig()

    // ✅ Create Supabase client
    const supabase = createClient(
      config.public.supabaseUrl as string,
      config.public.supabaseKey as string
    )

    // ✅ Read body
    const body = await readBody(event)
    const {
      email,
      password,
      accountType,
      firstName,
      middleName,
      lastName
    } = body

    // ✅ Validate
    if (!email || !password) {
      return { 
        success: false, 
        message: 'Email dan password harus diisi' 
      }
    }

    console.log('📝 Register request:', { email, accountType })

    // ✅ Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.error('Auth error:', error.message)
      return { success: false, message: error.message }
    }

    // Check if user created
    if (!data.user) {
      return {
        success: false,
        message: 'User tidak berhasil dibuat'
      }
    }

    console.log('✅ User created:', data.user.id)

    // ✅ Create profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        first_name: firstName || '',
        middle_name: middleName || null,
        last_name: lastName || '',
        account_type: accountType || 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('❌ Profile error:', profileError)
      // Don't fail - user auth already succeeded
    } else {
      console.log('✅ Profile created')
    }

    // ✅ Return success
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
    console.error('❌ Register error:', err)
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan server'

    return { 
      success: false, 
      message 
    }
  }
})