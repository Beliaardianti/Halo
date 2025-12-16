import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, accountType } = body

    if (!email || !password) {
      return {
        success: false,
        message: 'Email dan password harus diisi'
      }
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return {
        success: false,
        message: 'Supabase config missing'
      }
    }

    console.log('📝 Registering:', email)

    // ✅ Call Supabase Auth REST API
    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Auth error:', data.message)
      return {
        success: false,
        message: data.message || 'Registrasi gagal'
      }
    }

    console.log('✅ User created:', data.user.id)

    // ✅ Insert profile via REST API
    await fetch(`${supabaseUrl}/rest/v1/user_profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        id: data.user.id,
        account_type: accountType || 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })

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
    console.error('❌ Error:', err)
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Error'
    }
  }
})