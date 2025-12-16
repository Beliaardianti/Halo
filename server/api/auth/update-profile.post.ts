import { readBody, createError, defineEventHandler } from 'h3'
import { createServerSupabaseClient } from '../../utils/supabaseClient'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('📥 API received:', JSON.stringify(body, null, 2))

    const { user_id, account_type, first_name, middle_name, last_name, phone } = body

    // Validasi
    if (!user_id) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      })
    }

    if (!account_type) {
      throw createError({
        statusCode: 400,
        message: 'Account type is required'
      })
    }

    if (!first_name || !last_name || !phone) {
      throw createError({
        statusCode: 400,
        message: 'First name, last name, and phone are required'
      })
    }

    // Pastikan account_type hanya 'user' atau 'employer'
    if (!['user', 'employer'].includes(account_type)) {
      throw createError({
        statusCode: 400,
        message: 'Account type must be either "user" or "employer"'
      })
    }

    console.log('✅ Validation passed')
    console.log('📝 User ID:', user_id)
    console.log('📝 Account Type:', account_type)

    // Update profile dengan service role (bypass RLS)
    const supabase = createServerSupabaseClient()

    // Check if profile exists
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user_id)
      .maybeSingle()

    console.log('🔍 Profile exists:', existing ? 'YES' : 'NO')

    const updateData = {
      account_type: account_type,
      first_name: first_name,
      middle_name: middle_name || null,
      last_name: last_name,
      phone: phone,
      updated_at: new Date().toISOString()
    }

    console.log('📤 Data to save:', JSON.stringify(updateData, null, 2))

    let result

    if (existing) {
      // UPDATE existing profile
      result = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user_id)
        .select()
        .single()
    } else {
      // INSERT new profile
      result = await supabase
        .from('user_profiles')
        .insert({
          id: user_id,
          ...updateData
        } as any) // Type assertion
        .select()
        .single()
    }

    if (result.error) {
      console.error('❌ Database error:', result.error)
      throw createError({
        statusCode: 500,
        message: result.error.message || 'Failed to save profile'
      })
    }

    console.log('✅ Profile saved successfully:', result.data)

    return {
      success: true,
      data: result.data,
      message: 'Profile saved successfully'
    }

  } catch (error: any) {
    console.error('❌ API Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to save profile'
    })
  }
})